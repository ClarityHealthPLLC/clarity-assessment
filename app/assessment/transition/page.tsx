'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

function TransitionContent() {
  const params = useSearchParams()
  const data = params.get('data') || ''

  // data is already decoded by useSearchParams — re-encode it for the next URL
  // email stays in sessionStorage, no need to pass it through the URL
  const continueUrl = `/assessment?data=${encodeURIComponent(data)}`

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-navy flex flex-col justify-center px-4 pt-16">
        <div className="max-w-2xl mx-auto w-full py-20 text-center">
          <div className="text-5xl mb-6">🎉</div>
          <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-4">
            Section 1 Complete
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Great work — you&apos;re halfway there!
          </h1>

          {/* Two column status */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-brand-teal/20 border border-brand-teal rounded-2xl p-5 text-left">
              <p className="text-brand-accent font-bold text-sm mb-1">✓ Section 1 Complete</p>
              <p className="text-white font-semibold">ADHD &amp; Attention</p>
              <p className="text-white/60 text-sm">Past 6 months</p>
            </div>
            <div className="bg-amber-500/20 border border-amber-400 rounded-2xl p-5 text-left">
              <p className="text-amber-400 font-bold text-sm mb-1">→ Section 2 Starting</p>
              <p className="text-white font-semibold">Emotional Wellbeing</p>
              <p className="text-white/60 text-sm">Past 7 days</p>
            </div>
          </div>

          {/* Timeframe warning */}
          <div className="bg-amber-500/10 border border-amber-400/40 rounded-2xl p-6 mb-10 text-left">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">⏱️</span>
              <div>
                <p className="text-amber-400 font-bold mb-2">Important: Different timeframe ahead</p>
                <p className="text-white/70 text-sm leading-relaxed">
                  The next 21 questions ask about how you have been feeling over the{' '}
                  <strong className="text-white">past 7 days only</strong> — not the past 6 months.
                  Please re-read each question carefully with this timeframe in mind before answering.
                </p>
              </div>
            </div>
          </div>

          <Link
            href={continueUrl}
            className="inline-flex items-center gap-3 bg-brand-teal hover:bg-brand-tealDark text-white text-lg font-bold px-10 py-5 rounded-xl transition-colors shadow-lg"
          >
            Continue to Part 2 →
          </Link>
          <p className="text-white/40 text-sm mt-4">21 questions remaining · About 2 minutes</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function TransitionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand-muted">Loading...</div>}>
      <TransitionContent />
    </Suspense>
  )
}
