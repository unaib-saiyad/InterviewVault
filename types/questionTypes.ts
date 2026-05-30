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