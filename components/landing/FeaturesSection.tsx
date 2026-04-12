import { Archive, BarChart3, CalendarDays, Layers, Search, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const features = [
  {
    title: 'Interview Experience Tracker',
    description: 'Log and review all your interview experiences company-wise.',
    icon: ShieldCheck
  },
  {
    title: 'Question Vault',
    description: 'Save and organize important interview questions and answers.',
    icon: Archive
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your strengths, weak areas, and preparation growth.',
    icon: BarChart3
  },
  {
    title: 'Revision Planner',
    description: 'Plan your study and revision schedule with clarity.',
    icon: CalendarDays
  },
  {
    title: 'Smart Search & Filters',
    description: 'Quickly find topics, companies, or weak questions.',
    icon: Search
  },
  {
    title: 'Dashboard Analytics',
    description: 'Get a clear overview of your interview preparation journey.',
    icon: Layers
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core functionality"
          title="Key Features"
          description="A balanced set of tools designed to help you capture, review, and improve your interview preparation with real focus."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal
                key={feature.title}
                delay={index * 0.06}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 shadow-sm transition group-hover:bg-brand-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
