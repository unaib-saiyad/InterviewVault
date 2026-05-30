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

    sequence: {
      type: String,
      required: true
    },

    question: {
      type: String,
      required: true
    },

    questionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionType",
      required: true
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

    confidenceScore: {
      type: Number,
      min: 1,
      max: 5,
      default: 3
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
  sequence: 1
});

questionSchema.index({
  parentQuestion: 1,
  sequence: 1
});

questionSchema.index({
  questionType: 1
});

export default mongoose.model(
  "Question",
  questionSchema
);