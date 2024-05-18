import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.user.findMany();
    res.json(users);
  } else if (req.method === "POST") {
    const { username, google_id } = req.body;
    const newUser = await prisma.user.create({
      data: { username, google_id },
    });
    res.json(newUser);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
