import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/prisma";

import { findUserByGoogleId } from "@/app/utils/userHelper";
import { authOptions } from "@/app/utils/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;

  const body = await req.json();
  const { title, link, description, image_url } = body;

  if (!description) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    );
  }

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        link,
        description,
        image_url,
        user_id: user.user_id,
      },
    });

    return NextResponse.json(
      { message: "Project created", project: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
