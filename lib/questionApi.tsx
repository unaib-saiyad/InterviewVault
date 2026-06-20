import api from "./api";

export const createQuestion = async ({ data, parentQuestionId, selectedRoundId }: { data: any; parentQuestionId: string; selectedRoundId: string }) => {
  const response = await api.post(`/interviews/questions`, {
        ...data,
        parentQuestion: parentQuestionId,
        round: selectedRoundId,
      });
  return response.data.data;
}

export const fetchQuestions = async (roundId: string | undefined) => {
  const response = await api.get(`/interviews/questions/round/${roundId}`);
  return response.data.data;
}

export const deleteQuestion = async (questionId: string) => {
  await api.delete(`/interviews/questions/${questionId}`);
}

export const updateQuestion = async ({questionId, data}: {questionId: string, data: any}) => {
  await api.put(`/interviews/questions/${questionId}`, data);
}