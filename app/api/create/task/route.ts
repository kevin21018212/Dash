import prisma from "@/prisma/prisma";
import { getSession } from "next-auth/react";

export async function POST(request) {
  const session = await getSession({ req: request });

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const google_id = session?.user?.email; // using email as google_id
  const user = await prisma.user.findUnique({ where: { google_id } });
  const { title, description, size, type, image_url, project_id } =
    await request.json();

  try {
    const feature = await prisma.feature.create({
      data: {
        title,
        description,
        size,
        type,
        image_url,
        project: {
          connect: { project_id },
        },
        user: {
          connect: { user_id: user.user_id },
        },
      },
    });
    return new Response(JSON.stringify(feature), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
}
