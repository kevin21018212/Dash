import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { findUserByGoogleId } from "@/app/utils/userHelper";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;

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
