export type QuestionTypeOption =
  | {
      type: 'existing';
        _id: string;
        name: string;
        description?: string;
    }
  | {
      type: 'new';
        name: string;
    };

export type InterviewQuestionDetails = {
  _id: string;
  answer: string;
  confidenceLevel: number;
  depth: number;
  difficulty: string;
  notes: string;
  parentQuestion: string | null;
  question: string;
  questionType: {
    _id: string;
    name: string;
    description?: string;
  };
  round: string;
  sequence: string;
  solved: boolean;
  followUps: InterviewQuestionDetails[];
  createdAt?: string;
  updatedAt?: string;
}