'use client';

import { ArrowRight, Briefcase, ClipboardList, Clock3, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

const stats = [
  { label: 'Interviews Attempted', value: '28', icon: Briefcase },
  { label: 'Questions Saved', value: '124', icon: ClipboardList },
  { label: 'Weak Topics', value: '7', icon: ShieldCheck },
  { label: 'Next Revision', value: 'Today', icon: Clock3 }
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-10 sm:pt-14 lg:pt-16">
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal className="max-w-2xl">
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
              Your interview prep system
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Turn Every Interview Into Your Next Advantage
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Track interview experiences, save asked questions, identify weak areas, and prepare smarter — all in one place.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#get-started"
                className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-500/10 transition duration-200 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-center justify-between gap-3 rounded-3xl bg-slate-100/85 p-5">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">InterviewVault Dashboard</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">At a glance preparation insights</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-3xl bg-slate-50 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>Live score review</span>
                <span>Updated 2 min ago</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {stats.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Preparation progress</p>
                    <p className="mt-1 text-sm text-slate-500">Weekly goal status and focus drills.</p>
                  </div>
                  <span className="inline-flex rounded-full bg-brand-600/10 px-3 py-1 text-sm font-semibold text-brand-700">72%</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <motion.div
                    className="h-full rounded-full bg-brand-600"
                    initial={{ width: 0 }}
                    animate={{ width: '72%' }}
                    transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                  />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Weak topics</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">System design</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Next review</p>
                    <p className="mt-3 text-xl font-semibold text-slate-900">Behavioral notes</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-8 right-6 hidden h-24 w-24 rounded-full bg-brand-100/70 blur-2xl sm:block" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
