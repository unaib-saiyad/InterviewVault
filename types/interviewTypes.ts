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
    company: CompanyOption | null;
    role: RoleOption | null;
    experienceLevel: ExperienceLevel;
    status: InterviewStatus;
    overallFeedback: string;
    overallRating: OverallRating;
    source: SourceOption | null;
  };