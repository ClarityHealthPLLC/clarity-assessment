'use client'
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Inner component isolates useSearchParams so the page can be Suspense-wrapped
function TransitionInner() {
  const searchParams = useSearchParams()
  const data = searchParams.get('data') ?? ''

  const continueHref = data
    ? `/assessment?data=${encodeURIComponent(data)}`
    : '/assessment'

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-navy flex flex-col pt-16">
        {/* Hero */}
        <section className="flex-1 flex flex-col justify-center px-4 py-20">
          <div className="max-w-2xl mx-auto w-full text-center">
            <div className="inline-flex items-center gap-2 bg-brand-teal/20 border border-brand-teal/40 text-brand-accent text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span>✓</span> Section 1 Complete
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Great work — you&apos;re halfway there!
            </h1>
            <p className="text-white/70 text-lg mb-12">
              Take a breath before continuing to Part 2.
            </p>

            {/* Two-column progress panel */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
              {/* Left — completed */}
              <div className="bg-brand-teal/10 border border-brand-teal/40 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                  <span className="text-brand-accent font-bold text-sm uppercase tracking-wide">Section 1 Complete</span>
                </div>
                <p className="text-white font-semibold text-lg leading-snug mb-1">ADHD &amp; Attention</p>
                <p className="text-white/60 text-sm">18 questions · Based on the past <strong className="text-brand-accent">6 months</strong></p>
              </div>

              {/* Right — upcoming */}
              <div className="bg-amber-500/10 border border-amber-400/40 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-brand-navy text-xs font-bold flex-shrink-0">2</span>
                  <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">Section 2 Starting</span>
                </div>
                <p className="text-white font-semibold text-lg leading-snug mb-1">Emotional Wellbeing</p>
                <p className="text-white/60 text-sm">21 questions · Based on the past <strong className="text-amber-400">7 days</strong></p>
              </div>
            </div>

            {/* Timeframe warning */}
            <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl px-6 py-5 mb-10 text-left">
              <div className="flex gap-3">
                <span className="text-amber-400 text-xl flex-shrink-0 mt-0.5">⚠</span>
                <div>
                  <p className="text-amber-300 font-semibold mb-1">Important: Different timeframe ahead</p>
                  <p className="text-white/70 text-sm leading-relaxed">
                    The next set of questions asks about how you have been feeling over the{' '}
                    <strong className="text-amber-400">past 7 days only</strong> — not the past 6 months.
                    Please re-read each question carefully with this timeframe in mind.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={continueHref}
              className="inline-flex items-center gap-3 bg-brand-teal hover:bg-brand-tealDark text-white text-lg font-bold px-10 py-5 rounded-xl transition-colors shadow-lg"
            >
              Continue to Part 2 →
            </Link>
            <p className="text-white/40 text-sm mt-4">Your progress is saved — no need to start over.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function TransitionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-navy">
        <div className="text-white/60 text-lg">Loading…</div>
      </div>
    }>
      <TransitionInner />
    </Suspense>
  )
}
