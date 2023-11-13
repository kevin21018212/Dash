import { NextResponse } from "next/server";
import connect from "../../utils/db";
import Todo from "@/app/models/todo";

export const GET = async (request) => {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");

  console.log("AAA", email);

  try {
    await connect();

    const todos = await Todo.find(email && { email });

    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newTodo = new Todo({ ...body });

  try {
    await connect();

    await newTodo.save();

    return new NextResponse("Todo Created", { status: 201 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};
