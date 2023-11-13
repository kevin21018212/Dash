// Import necessary modules and models
import { NextResponse } from "next/server";
import connect from "../../utils/connect";
import Todo from "../../models/todo";
import Project from "../../models/project";

export const GET = async (request) => {
  const url = new URL(request.url);

  const email = url.searchParams.get("email");

  try {
    await connect();

    let todosQuery = {};

    if (email) {
      todosQuery = { email };
    }

    // Populate the 'project' field in the result with project details
    const todos = await Todo.find(todosQuery).populate("project");

    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  try {
    await connect();

    if (body.project) {
      const project = await Project.findById(body.project);
      if (!project) {
        return new NextResponse("Project not found", { status: 400 });
      }
    }

    const newTodo = new Todo({ ...body });

    await newTodo.save();

    return new NextResponse("Todo Created", { status: 201 });
  } catch (err) {
    return new NextResponse("Db Error", { status: 500 });
  }
};
