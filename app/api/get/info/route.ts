import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import prisma from "@/prisma/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId || isNaN(Number(projectId))) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  try {
    const project = await prisma.project.findUnique({
      where: { project_id: parseInt(projectId, 10) },
      include: {
        features: {
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
