import { NextResponse } from "next/server";
import Todo from "../../../models/todo";
import connect from "../../../utils/db";
export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Todo.findByIdAndDelete(id);

    return new NextResponse("Deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const todo = await Todo.findById(id);

    if (!todo) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const newCompleted = !todo.complete;

    await Todo.findByIdAndUpdate(
      id,
      { complete: newCompleted },
      {
        new: true,
      }
    );

    return new NextResponse("Updated", { status: 200 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};
