import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/prisma";
import { findUserByGoogleId } from "@/app/utils/userHelper";
import { authOptions } from "@/app/utils/authOptions";

export async function handler(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;

  switch (req.method) {
    case "POST":
      return await handlePost(req, google_id);
    case "PUT":
      return await handlePut(req, google_id);
    case "GET":
      return await handleGet(req, google_id);
    default:
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
  }
}

async function handlePost(req: NextRequest, google_id: string) {
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

async function handlePut(req: NextRequest, google_id: string) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") as string;
  const { title, link, description, image_url } = await req.json();

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedProject = await prisma.project.update({
      where: { project_id: parseInt(projectId) },
      data: { title, link, description, image_url },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function handleGet(req: NextRequest, google_id: string) {
  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const projects = await prisma.project.findMany({
      where: {
        user_id: user.user_id,
      },
      include: {
        features: true,
      },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT };
