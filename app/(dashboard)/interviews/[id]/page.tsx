import { InterviewDetailsClient } from '@/components/interview/InterviewDetailsClient';

export default async function InterviewDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InterviewDetailsClient interviewId={id} />;
}