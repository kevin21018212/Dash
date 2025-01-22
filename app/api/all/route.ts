// app/api/all/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [games, movies, tv, books, music] = await Promise.all([
      prisma.game.findMany(),
      prisma.movie.findMany(),
      prisma.tV.findMany(),
      prisma.book.findMany(),
      prisma.music.findMany(),
    ]);

    return NextResponse.json({
      games,
      movies,
      tv,
      books,
      music,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
