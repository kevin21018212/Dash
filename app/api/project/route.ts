import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/prisma";
import { findUserByGoogleId } from "@/app/utils/userHelper";

async function getSessionAndUser(req: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return { error: "Unauthorized", status: 401, user: null };
  }

  const google_id = session.user?.email as string;
  const user = await findUserByGoogleId(google_id);

  if (!user) {
    return { error: "User not found", status: 404, user: null };
  }

  return { error: null, status: 200, user };
}

export async function POST(req: NextRequest) {
  const { error, status, user } = await getSessionAndUser(req);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const body = await req.json();
  const { title, link, description, image_url } = body;

  if (!description) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    );
  }

  try {
    const newProject = await prisma.project.create({
      data: { title, link, description, image_url, user_id: user.user_id },
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

export async function PUT(req: NextRequest) {
  const { error, status, user } = await getSessionAndUser(req);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") as string;
  const { title, link, description, image_url } = await req.json();

  try {
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

export async function DELETE(req: NextRequest) {
  const { error, status, user } = await getSessionAndUser(req);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId") as string;

  try {
    await prisma.project.delete({
      where: { project_id: parseInt(projectId) },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { error, status, user } = await getSessionAndUser(req);
  if (error) {
    return NextResponse.json({ error }, { status });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { user_id: user.user_id },
      include: { features: true },
    });

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
