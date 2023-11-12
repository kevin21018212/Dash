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
    complete: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
export default Todo;
