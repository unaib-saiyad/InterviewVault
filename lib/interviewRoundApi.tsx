import api from "./api";

export const createInterviewRound = async (interviewId: string, roundData: any) => {
    const response = await api.post(`/interviews/rounds/${interviewId}`, roundData);
    return response.data.data;
}

export const updateInterviewRound = async (roundId: string, roundData: any) => {
    const response = await api.put(`/interviews/rounds/${roundId}`, roundData);
    return response.data.data;
}

export const deleteInterviewRound = async (roundId: string) => {
    await api.delete(`/interviews/rounds/${roundId}`);
}

export const fetchInterviewRounds = async (interviewId: string) => {
    const response = await api.get(`/interviews/${interviewId}`);
    return response.data.data;
}