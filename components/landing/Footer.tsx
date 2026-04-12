import React from 'react'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-slate-200 bg-slate-100/80 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-sm">
            <p className="text-xl font-semibold text-slate-900">InterviewVault</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A reliable interview preparation workspace for thoughtful candidates and hiring teams.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Product</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="#features" className="transition hover:text-slate-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="transition hover:text-slate-900">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Company</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="#footer" className="transition hover:text-slate-900">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#get-started" className="transition hover:text-slate-900">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} InterviewVault. Built for serious interview preparation.
        </div>
      </div>
    </footer>
  )
}
