import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    round: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewRound",
      required: true
    },

    parentQuestion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      default: null
    },

    question: {
      type: String,
      required: true
    },

    questionType: {
      type: String,
      enum: [
        "dsa",
        "javascript",
        "react",
        "nodejs",
        "mongodb",
        "system_design",
        "hr",
        "behavioral"
      ]
    },

    difficulty: {
      type: String,
      enum: [
        "easy",
        "medium",
        "hard"
      ],
      default: "medium"
    },

    answer: String,

    notes: String,

    solved: {
      type: Boolean,
      default: false
    },

    depth: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

questionSchema.index({
  round: 1,
  parentQuestion: 1
});

questionSchema.index({
  questionType: 1
});

export default mongoose.model(
  "Question",
  questionSchema
);