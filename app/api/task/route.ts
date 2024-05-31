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
    case "DELETE":
      return await handleDelete(req, google_id);
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

async function handlePut(req: NextRequest, google_id: string) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId") as string;
  const { title, size, description, type } = await req.json();

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { task_id: parseInt(taskId) },
      data: { title, size, description, type },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function handleDelete(req: NextRequest, google_id: string) {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId") as string;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.task.delete({
      where: { task_id: parseInt(taskId) },
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

async function handleGet(req: NextRequest, google_id: string) {
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

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
