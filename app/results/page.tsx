'use client'
import { useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScoreGauge from '@/components/ScoreGauge'
import { scoreAll } from '@/lib/scoring'
import type { Answers } from '@/lib/scoring'
import Link from 'next/link'

const DASS_MAX = 42
const ASRS_MAX = 18

function ResultsContent() {
  const params = useSearchParams()
  const dataParam = params.get('data') || ''

  const result = useMemo(() => {
    if (!dataParam) return null
    try {
      const answers: Answers = JSON.parse(decodeURIComponent(dataParam))
      return scoreAll(answers)
    } catch {
      return null
    }
  }, [dataParam])

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-offWhite px-4 text-center">
        <p className="text-brand-muted text-lg mb-4">No results found.</p>
        <Link href="/start" className="text-brand-teal font-semibold hover:underline">
          ← Start the assessment
        </Link>
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
            <h1 className="text-4xl font-black text-brand-navy mb-3">Your Brain Snapshot Report</h1>
            <p className="text-brand-muted text-lg max-w-xl mx-auto">
              Based on your responses, here is your personalised mental health and attention profile.
            </p>
          </div>

          {/* Email sent confirmation */}
          <div className="bg-brand-teal/10 border border-brand-teal/40 rounded-2xl p-5 mb-6 flex items-center gap-4">
            <span className="text-2xl flex-shrink-0">📬</span>
            <div>
              <p className="font-semibold text-brand-teal text-sm">Your report is on its way!</p>
              <p className="text-brand-muted text-sm leading-relaxed">
                A copy of this Brain Snapshot Report has been emailed to you — check your inbox in the next few minutes.
              </p>
            </div>
          </div>
          <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl p-5 mb-10 flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="font-bold text-amber-800 text-sm mb-1">Don&apos;t see the email? Check your Junk or Spam folder.</p>
              <p className="text-amber-700 text-sm leading-relaxed">
                Results emails from <strong>results@send.clarityhealth.vip</strong> are sometimes filtered by email providers. If you find it in spam, please mark it as <strong>&ldquo;Not Spam&rdquo;</strong> so future emails reach your inbox.
              </p>
            </div>
          </div>

          {/* DASS Results */}
          <h2 className="text-xl font-bold text-brand-text mb-4">Emotional Wellbeing (DASS-21)</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <ScoreGauge label="Depression" score={dass.depression.score} maxScore={DASS_MAX} severity={dass.depression.severity} />
            <ScoreGauge label="Anxiety"    score={dass.anxiety.score}    maxScore={DASS_MAX} severity={dass.anxiety.severity} />
            <ScoreGauge label="Stress"     score={dass.stress.score}     maxScore={DASS_MAX} severity={dass.stress.severity} />
          </div>

          {/* ASRS Results */}
          <h2 className="text-xl font-bold text-brand-text mb-4">Attention &amp; Focus (ASRS v1.1)</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <ScoreGauge label="Inattention"                score={asrs.inattentionScore}   maxScore={ASRS_MAX} severity={asrs.inattentionSeverity} />
            <ScoreGauge label="Hyperactivity / Impulsivity" score={asrs.hyperactivityScore} maxScore={ASRS_MAX} severity={asrs.hyperactivitySeverity} />
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

          {/* CTA */}
          <div className="bg-brand-navy rounded-2xl p-8 text-center mb-8">
            <h2 className="text-2xl font-black text-white mb-3">Ready to Take the Next Step?</h2>
            <p className="text-white/70 mb-6 max-w-sm mx-auto">
              Book a consultation with Thomas Stewart, MSN, FNP-C to discuss your results
              and create a personalised care plan.
            </p>
            <a
              href="https://clarityhealth.vip/lander#contact-section"
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              Book Your Consultation →
            </a>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-sm text-amber-800 leading-relaxed">
            <p className="font-bold mb-2">⚠ Important</p>
            <p>
              This screening tool is for informational purposes only and does not constitute a medical diagnosis.
              Results should be used as a starting point for a conversation with a qualified healthcare provider.
              If you are in crisis, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline).
            </p>
          </div>

          <div className="text-center">
            <Link href="/start" className="text-brand-teal text-sm font-medium hover:underline">
              ← Retake the Assessment
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-offWhite">
        <div className="text-brand-muted text-lg">Calculating your results…</div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
