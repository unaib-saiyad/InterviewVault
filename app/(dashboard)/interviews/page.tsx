import { SectionCard } from '@/components/dashboard/SectionCard';
import { InterviewList } from '@/components/interview/InterviewList';
import InterviewActions from '@/components/interview/InterviewActions';

export default function Interviews() {
  return (
    <>
        <div className="space-y-8">
          <InterviewActions />
        </div>

        <SectionCard title="All Interviews">
            <InterviewList/>
        </SectionCard>
      </>
  )
}
