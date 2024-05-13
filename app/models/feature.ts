import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    user: {
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
      type: String, // Add a description field
    },
    type: {
      type: String, // Add a description field
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project", // Reference to the Project model
    },
  },
  { timestamps: true }
);

const Todo = mongoose.models.Todo || mongoose.model("Feature", todoSchema);
export default Todo;
