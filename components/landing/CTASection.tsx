import { Reveal } from '@/components/ui/Reveal';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="bg-brand-600 py-16 sm:py-20 lg:py-24">
      <Reveal className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-100">Ready to level up your interview prep?</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Start organizing your interview journey and prepare with clarity.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-brand-100/90">
          Get started with a system built for candidates who want smart preparation, consistent growth, and confidence in every interview.
        </p>
        <Link
          id="get-started"
          href="/auth/signup"
          className="mt-10 inline-flex rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 shadow-lg shadow-brand-500/20 transition duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-600"
        >
          Get Started for Free
        </Link>
      </Reveal>
    </section>
  );
}
