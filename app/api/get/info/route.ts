// pages/api/getProjectInfo.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { projectId } = req.query;

  if (!projectId || typeof projectId !== "string") {
    return res.status(400).json({ error: "Project ID is required" });
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
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
