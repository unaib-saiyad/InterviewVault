export type Company = {
  _id?: string;
  name: string;
  tempName?: string;
};
export type CompanyOption =
  | {
      type: "existing";
      _id: string;
      name: string;
      logo?: string;
    }
  | {
      type: "new";
      name: string;
    };

export type RoleOption =
  | {
      type: 'existing';
      _id: string;
      title: string;
      slug: string;
      category?: string;
    }
  | {
      type: 'new';
      title: string;
    };

export enum ExperienceLevel {
  Internship = "internship",
  Fresher = "fresher",
  Junior = "junior",
  Mid = "mid",
  Senior = "senior"
};

export enum InterviewStatus {
  Applied = "applied",
  Shortlisted = "shortlisted",
  InterviewScheduled = "interview_scheduled",
  Rejected = "rejected",
  Selected = "selected",
  OfferReceived = "offer_received"
};

export type SourceOption =
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

export type OverallRating = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type InterviewData = {
    _id?: string;
    company: CompanyOption | null;
    role: RoleOption | null;
    experienceLevel: ExperienceLevel;
    status: InterviewStatus;
    overallFeedback: string;
    overallRating: OverallRating;
    source: SourceOption | null;
    dateOfApplication?: Date | null;
  };

  export type CompanyDetails = {
    _id: string;
    name: string;
    logo?: string;
    website?: string;
    location?: string;
    industry?: string;
  };

  
  export type InterviewDetails = {
    _id: string;
    company: CompanyDetails;
    dateOfApplication: string;
    experienceLevel: string;
    status: string;
    overallFeedback: string;
    overallRating: number;
    role: {
      _id: string;
      title: string;
      slug: string;
    } | null;
    source: {
      _id: string;
      name: string;
    } | null;
  }
  export type QuestionStats = {
  difficulty: string;
  rootQuestions: number;
  solvedQuestions: number;
  totalQuestions: number;
  totalRounds: number;
};

export type InterviewRoundDetails = {
  _id: string;
  interviewId: string;
  roundNumber: number;
  roundType: string;
  interviewerName: string;
  durationInMinutes: number;
  interviewDate: string;
  result: string;
  feedback: string;
  difficulty: string;
};
