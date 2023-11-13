import { NextResponse } from "next/server";
import connect from "../../../utils/connect";
import Todo from "../../../models/todo";

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

    // Find the Todo by ID
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
