import mongoose from "mongoose";

const questionTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  normalizedName: {
    type: String,
    required: true,
    unique: true
  },

  description: String,

  icon: String,
});

questionTypeSchema.pre("validate", async function () {
    if (this.name) {
        this.normalizedName = this.name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");
    }
});

export default mongoose.model(
  "QuestionType",
  questionTypeSchema
);