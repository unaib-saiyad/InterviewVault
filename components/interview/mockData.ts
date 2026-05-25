export type QuestionType = 'technical' | 'behavioral' | 'system_design' | 'coding' | 'hr' | 'dsa';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type RoundType = 'technical' | 'hr' | 'managerial' | 'coding' | 'system_design' | 'behavioral' | 'dsa';

export type FollowUpQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  difficulty: Difficulty;
  answer?: string;
  notes?: string;
  solved: boolean;
  createdDate: string;
  children: FollowUpQuestion[];
};

export type RoundQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  difficulty: Difficulty;
  answer?: string;
  notes?: string;
  solved: boolean;
  createdDate: string;
  followUps: FollowUpQuestion[];
};

export type Round = {
  id: string;
  roundNumber: number;
  type: RoundType;
  interviewDate: string;
  duration: string;
  difficulty: Difficulty;
  result: 'cleared' | 'failed' | 'pending' | 'partial';
  interviewerName: string;
  feedback?: string;
  quickNotes?: string;
  questions: RoundQuestion[];
};

export type Interview = {
  id: string;
  companyName: string;
  roleName: string;
  experienceLevel: string;
  status: string;
  source: string;
  createdDate: string;
  overallRating: number;
  rounds: Round[];
};

export const mockInterview: Interview = {
  id: '1',
  companyName: 'Google',
  roleName: 'React Developer',
  experienceLevel: 'Senior',
  status: 'selected',
  source: 'LinkedIn',
  createdDate: '2025-03-15',
  overallRating: 8,
  rounds: [
    {
      id: 'r1',
      roundNumber: 1,
      type: 'technical',
      interviewDate: '2025-03-20',
      duration: '60 min',
      difficulty: 'hard',
      result: 'cleared',
      interviewerName: 'Sarah Chen',
      feedback: 'Strong problem-solving skills. Excellent React fundamentals and system design thinking.',
      quickNotes: 'Candidate showed deep understanding of React internals and state management.',
      questions: [
        {
          id: 'q1',
          question: 'Explain the React reconciliation algorithm and how keys impact performance.',
          type: 'technical',
          difficulty: 'hard',
          answer: 'React uses a diffing algorithm based on heuristics: (1) Different element types produce different trees, (2) Keys help identify children stability. Keys should be stable, predictable, and unique among siblings.',
          notes: 'Discussed fiber architecture briefly',
          solved: true,
          createdDate: '2025-03-20',
          followUps: [
            {
              id: 'fq1',
              question: 'How does React Fiber improve upon the stack reconciler?',
              type: 'technical',
              difficulty: 'hard',
              answer: 'Fiber enables incremental rendering, splitting work into chunks and prioritizing updates. It allows pausing, aborting, or reusing work.',
              solved: true,
              createdDate: '2025-03-20',
              children: [
                {
                  id: 'fq2',
                  question: 'What are lanes in React 18?',
                  type: 'technical',
                  difficulty: 'hard',
                  answer: 'Lanes are a mechanism for prioritizing different updates. Higher priority lanes like transitions vs urgent updates.',
                  solved: false,
                  createdDate: '2025-03-20',
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 'q2',
          question: 'How would you optimize a React app with 10,000+ list items?',
          type: 'coding',
          difficulty: 'hard',
          answer: 'Virtualization (react-window), memoization (useMemo, React.memo), windowing, and efficient key management.',
          notes: 'Suggested react-window and proper memoization strategies',
          solved: true,
          createdDate: '2025-03-20',
          followUps: [
            {
              id: 'fq3',
              question: 'Compare react-window vs react-virtualized',
              type: 'technical',
              difficulty: 'medium',
              answer: 'react-window is lighter, faster, and simpler. react-virtualized has more features but is heavier.',
              solved: true,
              createdDate: '2025-03-20',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'r2',
      roundNumber: 2,
      type: 'dsa',
      interviewDate: '2025-03-23',
      duration: '45 min',
      difficulty: 'hard',
      result: 'cleared',
      interviewerName: 'Mike Johnson',
      feedback: 'Excellent algorithmic thinking. Solved all problems optimally with clean code.',
      quickNotes: 'Strong on time/space complexity analysis',
      questions: [
        {
          id: 'q3',
          question: 'Given two strings, determine if one is a permutation of the other.',
          type: 'dsa',
          difficulty: 'medium',
          answer: 'Two approaches: sort and compare O(n log n), or character count map O(n).',
          notes: 'Used hash map approach with O(n) time and O(1) space for ASCII',
          solved: true,
          createdDate: '2025-03-23',
          followUps: [
            {
              id: 'fq4',
              question: 'What if the strings are very large and Unicode?',
              type: 'dsa',
              difficulty: 'medium',
              answer: 'Use a HashMap instead of array, handle surrogate pairs in UTF-16.',
              solved: true,
              createdDate: '2025-03-23',
              children: [],
            },
          ],
        },
        {
          id: 'q4',
          question: 'Implement LRU Cache with O(1) get and put operations.',
          type: 'dsa',
          difficulty: 'hard',
          answer: 'Use HashMap + Doubly Linked List. Map stores nodes, list maintains order. Head is MRU, tail is LRU.',
          notes: 'Implemented from scratch with proper edge cases',
          solved: true,
          createdDate: '2025-03-23',
          followUps: [],
        },
      ],
    },
    {
      id: 'r3',
      roundNumber: 3,
      type: 'system_design',
      interviewDate: '2025-03-26',
      duration: '75 min',
      difficulty: 'hard',
      result: 'cleared',
      interviewerName: 'Alex Rivera',
      feedback: 'Very thorough system design approach. Good balance of high-level architecture and deep dives.',
      quickNotes: 'Covered scalability, database sharding, and caching strategies',
      questions: [
        {
          id: 'q5',
          question: 'Design a real-time collaborative document editing system like Google Docs.',
          type: 'system_design',
          difficulty: 'hard',
          answer: 'Use CRDT (Conflict-free Replicated Data Types) or OT (Operational Transform). WebSocket for real-time sync. Microservices for document, presence, and notification services.',
          notes: 'Discussed CRDT vs OT tradeoffs extensively',
          solved: true,
          createdDate: '2025-03-26',
          followUps: [
            {
              id: 'fq5',
              question: 'How would you handle offline edits and conflict resolution?',
              type: 'system_design',
              difficulty: 'hard',
              answer: 'Local-first architecture with CRDTs. Each client works on local copy, syncs when online. Conflicts resolved automatically via CRDT merge semantics.',
              solved: true,
              createdDate: '2025-03-26',
              children: [
                {
                  id: 'fq6',
                  question: 'What database would you choose for document storage and why?',
                  type: 'system_design',
                  difficulty: 'hard',
                  answer: 'PostgreSQL for document metadata (ACID compliance) + S3/object storage for document blobs + Redis for real-time sessions.',
                  solved: false,
                  createdDate: '2025-03-26',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'r4',
      roundNumber: 4,
      type: 'hr',
      interviewDate: '2025-03-30',
      duration: '45 min',
      difficulty: 'easy',
      result: 'cleared',
      interviewerName: 'Emily Parker',
      feedback: 'Great cultural fit. Excellent communication and leadership qualities.',
      quickNotes: 'Discussed team collaboration and conflict resolution',
      questions: [
        {
          id: 'q6',
          question: 'Tell me about a time you had a conflict with a team member.',
          type: 'behavioral',
          difficulty: 'medium',
          answer: 'Used STAR method: Situation, Task, Action, Result. Described a specific incident with constructive resolution.',
          notes: 'Good use of the STAR framework',
          solved: true,
          createdDate: '2025-03-30',
          followUps: [],
        },
      ],
    },
  ],
};