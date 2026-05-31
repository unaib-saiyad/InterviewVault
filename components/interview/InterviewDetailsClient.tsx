'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, X, ArrowLeft, MessageSquare, ChevronDown } from 'lucide-react';
import { InterviewHeader } from './InterviewHeader';
import { InterviewStats, RoundTimeline } from './InterviewStats';
import { RoundCard } from './RoundCard';
import { QuestionCard } from './QuestionCard';
import { AddQuestionModal } from './AddQuestionModal';
import { AddRoundModal } from './AddRoundModal';
import type { RoundQuestion, FollowUpQuestion } from './mockData';
import type { QuestionFormData } from './AddQuestionModal';
import type { RoundFormData } from './AddRoundModal';
import api from '@/lib/api';
import { ApiError } from '@/types/apiTypes';
import type { InterviewDetails, QuestionStats, InterviewRoundDetails } from '@/types/interviewTypes';
import type { InterviewQuestionDetails } from '@/types/questionTypes';

export function InterviewDetailsClient( {interviewId}: { interviewId: string }) {
  const [interview, setInterview] = useState<InterviewDetails>({
    id: '',
    company: {
      _id: '',
      name: '',
    },
    dateOfApplication: '',
    experienceLevel: '',
    status: '',
    overallFeedback: '',
    overallRating: 0,
    role: null,
    source: null,
  });
  const [questionStats, setQuestionStats] = useState<QuestionStats>({
    difficulty: 'easy',
    rootQuestions: 0,
    solvedQuestions: 0,
    totalQuestions: 0,
    totalRounds: 0,
  });
  const [interviewRounds, setInterviewRounds] = useState<InterviewRoundDetails[]>([]);
  const [selectedRound, setSelectedRound] = useState<InterviewRoundDetails | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showAddRoundModal, setShowAddRoundModal] = useState(false);
  const [parentQuestionId, setParentQuestionId] = useState<string | null>(null);
  const [parentQuestionText, setParentQuestionText] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentQuestions, setCurrentQuestions] = useState<InterviewQuestionDetails[]>([]);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await api.get(`/interviews/${interviewId}`);
        console.log('Fetched interview:', response.data.data);
        const {interview, interviewRounds, questionStats } = response.data.data;
        setInterview(interview);
        setQuestionStats(questionStats as QuestionStats);
        setInterviewRounds(interviewRounds);
      } catch (error) {
        const apiError = error as ApiError;
        console.error('Failed to fetch interview:', apiError.message);
      }
    };
    fetchInterview();
  }, [interviewId]);

  const handleViewQuestions = async (round: InterviewRoundDetails) => {
    setSelectedRound(round);
    try{
      const response = await api.get(`/interviews/questions/round/${round._id}`);
      console.log('Fetched questions for round:', response.data.data);
      setCurrentQuestions(response.data.data);
      setShowQuestions(true);
    }
    catch(error){
      alert("Failed to fetch questions for this round. Please try again.");
      console.error('Failed to fetch questions for round:', error);
      setSelectedRound(null);
    }
  };

  const handleBackToRounds = () => { 
    setShowQuestions(false);
    setSelectedRound(null);
    setCurrentQuestions([]);
  };

  const handleAddQuestionClick = (round: InterviewRoundDetails) => {
    setSelectedRound(round);
    setParentQuestionId(null);
    setParentQuestionText(undefined);
    setShowAddQuestionModal(true);
  };

  const handleAddFollowUpQuestion = (questionId: string) => {
    // setParentQuestionId(questionId);
    // // Find the question text from the current questions
    // const findQuestionText = (questions: (RoundQuestion | FollowUpQuestion)[], id: string): string | undefined => {
    //   for (const q of questions) {
    //     if (q.id === id) return q.question;
    //     const children = 'followUps' in q ? (q as RoundQuestion).followUps : (q as FollowUpQuestion).children;
    //     if (children) {
    //       const found = findQuestionText(children as (RoundQuestion | FollowUpQuestion)[], id);
    //       if (found) return found;
    //     }
    //   }
    //   return undefined;
    // };
    // const text = findQuestionText(currentQuestions, questionId);
    // setParentQuestionText(text);
    // setShowAddQuestionModal(true);
  };

  const handleAddQuestionSubmit = async (data: QuestionFormData) => {
    
    try{
      const response = await api.post("/interviews/questions", {
        ...data,
        parentQuestion: parentQuestionId,
        round: selectedRound?._id,
      });
      const newQuestion = response.data.data;
      if(showQuestions){
        // if (parentQuestionId) {
        //   // Adding a follow-up question
        //   const addFollowUpToTree = (questions: (RoundQuestion | FollowUpQuestion)[]): (RoundQuestion | FollowUpQuestion)[] => {
        //     return questions.map((q) => {
        //       if (q.id === parentQuestionId) {
        //         if ('followUps' in q) {
        //           const updatedFollowUps = [...(q as RoundQuestion).followUps, newQuestion];
        //           return { ...q, followUps: updatedFollowUps } as RoundQuestion;
        //         } else {
        //           const updatedChildren = [...(q as FollowUpQuestion).children, newQuestion];
        //           return { ...q, children: updatedChildren } as FollowUpQuestion;
        //         }
        //       }
        //       const children = 'followUps' in q
        //         ? addFollowUpToTree((q as RoundQuestion).followUps as unknown as (RoundQuestion | FollowUpQuestion)[])
        //         : addFollowUpToTree((q as FollowUpQuestion).children as unknown as (RoundQuestion | FollowUpQuestion)[]);
        //     });
        //   };
        //   setCurrentQuestions((prev) => addFollowUpToTree(prev));
        // }
        // else {
        //   // Adding a root question
          setCurrentQuestions((prev) => [...prev, newQuestion]);
        // }
      }
    }
    catch(error){
      alert("Failed to add question. Please try again.");
      console.error('Failed to add question:', error);
    }

    console.log('New question:', { ...data, parentQuestion: parentQuestionId, round: selectedRound?._id });
    setShowAddQuestionModal(false);
    setParentQuestionId(null);
    setParentQuestionText(undefined);
  };

  const handleAddRoundSubmit = async (data: RoundFormData) => {
    try {
      const response = await api.post(`/interviews/rounds/${interviewId}`, data);
      setInterviewRounds((prev) => [...prev, response.data.data]);
      alert("Round added successfully!");
      setShowAddRoundModal(false);
    } catch (error) {
      alert("Failed to add round. Please try again.");
      console.error('Failed to add interview round:', error);
    }
  };

  const handleEditQuestion = (question: any) => {
    console.log('Edit question:', question);
  };

  const handleDeleteQuestion = (questionId: string) => {
    console.log('Delete question:', questionId);
  };

  const handleToggleSolved = (questionId: string) => {
    const toggleInTree = (questions: InterviewQuestionDetails[]): InterviewQuestionDetails[] => {
      return questions.map((q) => {
        if (q._id === questionId) {
          return { ...q, solved: !q.solved };
        }
        const updatedFollowUps = toggleInTree(q.followUps);
        return { ...q, followUps: updatedFollowUps };
      });
    };
    setCurrentQuestions(toggleInTree(currentQuestions));
  };

  const handleEditRound = (round: InterviewRoundDetails) => {
    console.log('Edit round:', round);
  };

  const filteredQuestions = currentQuestions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || q.questionType.name === filterType;
    return matchesSearch && matchesFilter;
  });

  const questionTypes = ['all', ...new Set(currentQuestions.map((q) => q.questionType.name))];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Interview Header */}
      <InterviewHeader interview={interview} />
      {/* Stats */}
      <InterviewStats statistics={questionStats} />

      {/* Timeline */}
      <RoundTimeline rounds={interviewRounds} />

      {/* Questions Section or Rounds Section */}
      <AnimatePresence mode="wait">
        {showQuestions && selectedRound ? (
          <motion.div
            key="questions-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Questions Header */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="px-5 py-4 sm:px-6 sm:py-5">
                {/* Breadcrumb + Round info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleBackToRounds}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-brand-600 transition-all duration-200"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <div className="h-5 w-px bg-gray-200" />
                    <span className="text-sm font-medium text-gray-700">
                      Round {selectedRound.roundNumber} - {selectedRound.roundType.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Add Root Question button (desktop) */}
                  <button
                    onClick={() => {
                      setParentQuestionId(null);
                      setParentQuestionText(undefined);
                      setShowAddQuestionModal(true);
                    }}
                    className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    Add Question
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search questions..."
                      className="w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-10 py-2.5 text-sm text-gray-900 shadow-xs focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all duration-200 min-w-[140px]"
                    >
                      {questionTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === 'all' ? 'All Types' : type.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Mobile add button */}
                  <button
                    onClick={() => {
                      setParentQuestionId(null);
                      setParentQuestionText(undefined);
                      setShowAddQuestionModal(true);
                    }}
                    className="sm:hidden inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Question List */}
            <div className="mt-4 space-y-3">
              {filteredQuestions.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 mb-4">
                    <MessageSquare className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-1">No questions found</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {searchQuery || filterType !== 'all'
                      ? 'Try adjusting your search or filter'
                      : 'Start by adding your first question'}
                  </p>
                  {!searchQuery && filterType === 'all' && (
                    <button
                      onClick={() => {
                        setParentQuestionId(null);
                        setParentQuestionText(undefined);
                        setShowAddQuestionModal(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 transition-all duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      Add First Question
                    </button>
                  )}
                </motion.div>
              ) : (
                <div className="space-y-3">
                  {filteredQuestions.map((question) => (
                    <QuestionCard
                      key={question._id}
                      question={question}
                      onAddFollowUp={handleAddFollowUpQuestion}
                      onEdit={handleEditQuestion}
                      onDelete={handleDeleteQuestion}
                      onToggleSolved={handleToggleSolved}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Floating add button for many questions */}
            {filteredQuestions.length > 3 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setParentQuestionId(null);
                  setParentQuestionText(undefined);
                  setShowAddQuestionModal(true);
                }}
                className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-sm font-medium text-white shadow-lg hover:bg-brand-700 transition-all duration-200 lg:bottom-8 lg:right-8"
              >
                <Plus className="h-5 w-5" />
                Add Question
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="rounds-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Rounds Section */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Interview Rounds</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {interviewRounds.length} round{interviewRounds.length !== 1 ? 's' : ''} completed
                  </p>
                </div>
                <button
                  onClick={() => setShowAddRoundModal(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-brand-700 transition-all duration-200"
                >
                  <Plus className="h-4 w-4" />
                  Add Round
                </button>
              </div>
              <div className="px-5 py-5 sm:px-6 sm:py-6 space-y-3 sm:space-y-4">
                {interviewRounds.map((round) => (
                  <RoundCard
                    key={round._id}
                    round={round}
                    onViewQuestions={handleViewQuestions}
                    onAddQuestion={handleAddQuestionClick}
                    onEditRound={handleEditRound}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */} 
      <AddQuestionModal
        isOpen={showAddQuestionModal}
        onClose={() => {
          setShowAddQuestionModal(false);
          setParentQuestionId(null);
          setParentQuestionText(undefined);
        }}
        onSubmit={handleAddQuestionSubmit}
        parentQuestionText={parentQuestionText}
      />

      <AddRoundModal
        isOpen={showAddRoundModal}
        onClose={() => setShowAddRoundModal(false)}
        roundNumber={ questionStats.totalRounds + 1 }
        onSubmit={handleAddRoundSubmit}
      />
    </div>
  );
}