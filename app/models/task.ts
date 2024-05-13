import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // Add a description field
    },
    size: {
      type: TaskSize, // Add a description field
    },
    type: {
      type: TaskType, // Add a description field
    },
    feature: {
      type: Schema.Types.ObjectId,
      ref: "Feature", // Reference to the Project model
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Task", todoSchema);
export default Todo;
