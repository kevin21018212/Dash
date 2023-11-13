import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // Add a description field
    },
    complete: {
      type: Boolean,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project", // Reference to the Project model
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
