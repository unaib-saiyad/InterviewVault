import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  {
    title: 'Log Your Interviews',
    description: 'Record company-wise interview experiences and what was asked.'
  },
  {
    title: 'Save Key Questions',
    description: 'Build your personal question bank for revision and preparation.'
  },
  {
    title: 'Track & Improve',
    description: 'Identify weak areas and prepare smarter for your next opportunity.'
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Process"
          title="How It Works"
          description="A clean workflow designed to keep your interview preparation efficient, repeatable, and directly aligned with your goals."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.08}
              className="group rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-50 text-brand-700 text-lg font-semibold group-hover:bg-brand-700 group-hover:text-brand-50">
                {index + 1}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
