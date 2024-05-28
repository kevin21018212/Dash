import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/prisma/prisma";

import { findUserByGoogleId } from "@/app/utils/userHelper";

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;

  const body = await req.json();
  const { title, description, type, size, feature_id } = body;

  if (!title || !type || !size) {
    return NextResponse.json(
      { error: "Title, type, and size are required" },
      { status: 400 }
    );
  }

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(feature_id);
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        type,
        size,
        user_id: user.user_id,
        feature_id: feature_id,
      },
    });

    return NextResponse.json(
      { message: "Task created", task: newTask },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
