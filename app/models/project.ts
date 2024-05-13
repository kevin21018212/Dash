import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    link: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default Project;
