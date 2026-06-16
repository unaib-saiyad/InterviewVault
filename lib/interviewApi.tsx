import api from "./api";

export const fetchInterviews = async () => {
    const response = await api.get('/interviews');
    return response.data.data;
  
};

export const createInterview = async (interviewData: any) => {
    const response = await api.post('/interviews', interviewData);
    return response.data.data;
};

export const deleteInterview = async (interviewId: string) => {
    await api.delete(`/interviews/${interviewId}`);
}

export const updateInterviewAPI = async (interviewId: string, interviewData: any) => {
    const response = await api.put(`/interviews/${interviewId}`, interviewData);
    return response.data.data;
}