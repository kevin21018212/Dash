import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { findUserByGoogleId } from "@/app/utils/userHelper";

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const google_id = session.user?.email as string;
  const { searchParams } = new URL(req.url);
  const featureId = searchParams.get("featureId") as string;

  console.log("Ran");

  try {
    const user = await findUserByGoogleId(google_id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("Ran");
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
