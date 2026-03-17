'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScoreGauge from '@/components/ScoreGauge'
import { scoreAll } from '@/lib/scoring'
import type { FullResult, Answers } from '@/lib/scoring'
import Link from 'next/link'

const DASS_MAX = 42
const ASRS_MAX = 36

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<FullResult | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('clarity_answers')
    if (!raw) { router.push('/'); return }
    const answers: Answers = JSON.parse(raw)
    setResult(scoreAll(answers))
  }, [router])

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, dass: result!.dass, asrs: result!.asrs, overlapFlag: result!.overlapFlag }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-offWhite">
        <div className="text-brand-muted text-lg">Calculating your results…</div>
      </div>
    )
  }

  const { dass, asrs, overlapFlag } = result

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-offWhite pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-2">Your Results</p>
            <h1 className="text-4xl font-black text-brand-navy mb-3">Your Clarity Assessment</h1>
            <p className="text-brand-muted text-lg max-w-xl mx-auto">
              Based on your responses, here is your personalised mental health and attention profile.
            </p>
          </div>

          {/* DASS Results */}
          <h2 className="text-xl font-bold text-brand-text mb-4">Emotional Wellbeing (DASS-21)</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <ScoreGauge label="Depression" score={dass.depression.score} maxScore={DASS_MAX} severity={dass.depression.severity} />
            <ScoreGauge label="Anxiety" score={dass.anxiety.score} maxScore={DASS_MAX} severity={dass.anxiety.severity} />
            <ScoreGauge label="Stress" score={dass.stress.score} maxScore={DASS_MAX} severity={dass.stress.severity} />
          </div>

          {/* ASRS Results */}
          <h2 className="text-xl font-bold text-brand-text mb-4">Attention & Focus (ASRS v1.1)</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <ScoreGauge label="Inattention" score={asrs.inattentionScore} maxScore={ASRS_MAX / 2} severity={asrs.inattentionSeverity} />
            <ScoreGauge label="Hyperactivity / Impulsivity" score={asrs.hyperactivityScore} maxScore={ASRS_MAX / 2} severity={asrs.hyperactivitySeverity} />
          </div>

          {/* ADHD Screener */}
          <div className={`rounded-2xl p-6 mb-8 border ${asrs.screenerPositive ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}>
            <h3 className="font-bold text-brand-text mb-1">ADHD Screener (Part A)</h3>
            <p className="text-sm text-brand-muted">
              {asrs.screenerPositive
                ? `Your Part A screener score (${asrs.screenerScore}/6 threshold hits) is consistent with ADHD symptoms. A formal evaluation is recommended.`
                : `Your Part A screener score (${asrs.screenerScore}/6 threshold hits) does not meet the ADHD screening threshold.`}
            </p>
          </div>

          {/* Overlap flag */}
          {overlapFlag && (
            <div className="rounded-2xl p-6 mb-8 bg-yellow-50 border border-yellow-200">
              <h3 className="font-bold text-brand-text mb-1">Clinical Note: ADHD + Mood Symptom Overlap</h3>
              <p className="text-sm text-brand-muted">
                Your results show a pattern consistent with co-occurring ADHD and mood symptoms (depression or anxiety).
                This overlap is common and important to discuss with a clinician for accurate diagnosis and treatment planning.
              </p>
            </div>
          )}

          {/* Email capture */}
          <div className="bg-brand-navy rounded-2xl p-8 text-center mb-8">
            {submitted ? (
              <>
                <p className="text-3xl mb-3">✓</p>
                <h2 className="text-2xl font-black text-white mb-2">Report on its way!</h2>
                <p className="text-white/70">Check your inbox at <span className="text-brand-accent font-semibold">{email}</span> for your personalised results summary.</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-black text-white mb-2">Save & Share Your Results</h2>
                <p className="text-white/70 mb-6 max-w-sm mx-auto">
                  Enter your email and we'll send you a copy of your results to keep or share with your provider.
                </p>
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-1 px-5 py-4 rounded-xl text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-brand-teal hover:bg-brand-tealDark text-white font-bold px-6 py-4 rounded-xl transition-colors whitespace-nowrap disabled:opacity-60"
                    >
                      {loading ? 'Sending...' : 'Send My Report →'}
                    </button>
                  </div>
                  <label className="flex items-start gap-3 text-left cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 w-4 h-4 rounded accent-brand-teal flex-shrink-0"
                    />
                    <span className="text-white/60 text-xs leading-relaxed">
                      I agree to share my results with Clarity Health PLLC and receive my personalised report
                      and occasional information about ADHD and mental health care. I can unsubscribe at any time.
                    </span>
                  </label>
                </form>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="bg-brand-slate rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-3">Ready to Take the Next Step?</h2>
            <p className="text-white/70 mb-6">Book a consultation with Thomas Stewart, MSN, FNP-C to discuss your results and create a personalised care plan.</p>
            <a
              href="https://clarityhealth.vip/lander#contact-section"
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Book Your Consultation →
            </a>
          </div>

          <div className="text-center mt-8">
            <Link href="/assessment" className="text-brand-teal text-sm font-medium hover:underline">
              ← Retake the Assessment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
