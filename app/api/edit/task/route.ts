import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { findUserByGoogleId } from "@/app/utils/userHelper";

export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId") as string;
  const { title, size, description } = await req.json();

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { task_id: parseInt(taskId) },
      data: { title, size, description },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}