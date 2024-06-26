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

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        type,
        size,
        user_id: user.user_id,
        feature_id: feature_id ? parseInt(feature_id, 10) : null,
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

export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId") as string;
  const { title, size, description, type, status } = await req.json();

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  console.log(status);
  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { task_id: parseInt(taskId, 10) },
      data: { title, size, description, type, status },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId") as string;

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: { task_id: parseInt(taskId, 10) },
    });

    return NextResponse.json(
      { message: "Task deleted successfully" },
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
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;
  const { searchParams } = new URL(req.url);
  const featureId = searchParams.get("feature_id") as string;

  if (!featureId) {
    return NextResponse.json(
      { error: "Feature ID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        feature_id: parseInt(featureId, 10),
        user_id: user.user_id,
      },
    });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
