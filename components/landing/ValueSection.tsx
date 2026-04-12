import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const values = [
  'Remember what companies actually ask',
  'Convert interview mistakes into future preparation',
  'Track weak areas instead of studying blindly',
  'Build a repeatable system for interview growth'
];

export function ValueSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionHeading
            eyebrow="Why it matters"
            title="More Than Notes. A Smarter Interview Prep System."
            description="InterviewVault helps you move beyond scattered notes by turning every interview into a source of insight, progress, and clarity."
            center={false}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((item, index) => (
              <Reveal key={item} delay={index * 0.06} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <p className="text-base font-medium text-slate-900">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
