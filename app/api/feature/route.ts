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
  const { title, description, image_url, project_id } = body;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newFeature = await prisma.feature.create({
      data: {
        title,
        description,
        image_url,
        project_id: parseInt(project_id, 10),
        user_id: user.user_id,
      },
    });

    return NextResponse.json(
      { message: "Feature created", feature: newFeature },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating feature:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function handlePut(req: NextRequest, google_id: string) {
  const { searchParams } = new URL(req.url);
  const featureId = searchParams.get("featureId") as string;
  const { title, type, description } = await req.json();

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedFeature = await prisma.feature.update({
      where: { feature_id: parseInt(featureId) },
      data: { title, description },
    });

    return NextResponse.json(updatedFeature, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

async function handleDelete(req: NextRequest, google_id: string) {
  const { searchParams } = new URL(req.url);
  const featureId = searchParams.get("featureId") as string;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.feature.delete({
      where: { feature_id: parseInt(featureId) },
    });

    return NextResponse.json(
      { message: "Feature deleted successfully" },
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
  const projectId = searchParams.get("project_id") as string;

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const features = await prisma.feature.findMany({
      where: {
        user_id: user.user_id,
        project_id: parseInt(projectId),
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json({ features }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
