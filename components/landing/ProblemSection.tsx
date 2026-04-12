import { BookOpen, Clock, Target, Zap } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const problems = [
  {
    title: 'Forget what was asked',
    description: 'Interview details fade quickly without a reliable record.',
    icon: BookOpen
  },
  {
    title: 'Study without focus',
    description: 'Preparation becomes scattered without a clear plan.',
    icon: Target
  },
  {
    title: 'Lose track of weak areas',
    description: 'It is hard to improve if you can’t measure your gaps.',
    icon: Zap
  },
  {
    title: 'Repeat mistakes',
    description: 'Candidates often miss the same issues across interviews.',
    icon: Clock
  }
];

export function ProblemSection() {
  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Interview challenges"
          title="Are You Preparing Randomly?"
          description="InterviewVault helps you capture the true value from every experience so your future preparation is structured and purposeful."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.08} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-700 border border-slate-200 group-hover:bg-brand-700 group-hover:text-brand-50">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
