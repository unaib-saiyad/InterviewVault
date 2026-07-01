export type QuestionTypeValue =
  | "technical"
  | "behavioral"
  | "system_design"
  | "coding"
  | "hr"
  | "dsa"
  | "situational"
  | "cultural"
  | "brain_storming"
  | "others";

export type InterviewQuestionDetails = {
  _id: string;
  answer: string;
  confidenceScore: number;
  depth: number;
  difficulty: string;
  notes: string;
  parentQuestion: string | null;
  question: string;
  questionType: string;
  round: string;
  sequence: string;
  solved: boolean;
  followUps: InterviewQuestionDetails[];
  createdAt?: string;
  updatedAt?: string;
  topic: {
    _id: string;
    name: string;
    description?: string;
  },
  subTopic: {
    _id: string;
    name: string;
    description?: string;
  }
}

export type TopicOption =
  | {
      type: "existing";
      _id: string;
      name: string;
      description?: string;
    }
  | {
      type: "new";
      name: string;
    };

export type SubTopicOption =
  | {
      type: "existing";
      _id: string;
      name: string;
      description?: string;
    }
  | {
      type: "new";
      name: string;
    };