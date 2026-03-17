import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About This Assessment | Clarity Health PLLC',
  description:
    'Learn how the Clarity Health free mental health and ADHD screening works — the clinical tools used, how scores are calculated, and what the results mean.',
}

const severityRows = [
  { band: 'Normal / Minimal', colour: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200' },
  { band: 'Mild',             colour: 'bg-yellow-400', text: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  { band: 'Moderate',         colour: 'bg-orange-400', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
  { band: 'Severe',           colour: 'bg-red-500',    text: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200' },
  { band: 'Extremely Severe', colour: 'bg-red-900',    text: 'text-red-900',    bg: 'bg-red-100',   border: 'border-red-300' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="bg-brand-navy pt-16 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center py-16">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-4">
              Transparency &amp; Trust
            </p>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
              Understanding Your Assessment
            </h1>
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              What this screening measures and why it matters
            </p>
          </div>
        </section>

        {/* ── Section 1: What This Assessment Covers ────────────── */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">Section 1</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text mb-8">
              What This Assessment Covers
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed mb-10">
              This free screening uses two clinically-validated tools that are widely used in both
              research and clinical practice. Together they give you a comprehensive picture of your
              mental health across four dimensions.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* ASRS card */}
              <div className="rounded-2xl border border-brand-teal/30 bg-brand-tealLight p-7 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🧠</span>
                  <div>
                    <p className="text-xs font-bold text-brand-teal uppercase tracking-wide">Part 1 of 2</p>
                    <h3 className="text-lg font-black text-brand-navy">ASRS v1.1</h3>
                  </div>
                </div>
                <p className="text-brand-text font-semibold mb-2">Adult ADHD Self-Report Scale</p>
                <ul className="text-brand-muted text-sm space-y-1.5">
                  <li>· Developed by the World Health Organization (WHO)</li>
                  <li>· 18 questions covering inattention &amp; hyperactivity/impulsivity</li>
                  <li>· Asks about behaviour over the <strong className="text-brand-text">past 6 months</strong></li>
                  <li>· Includes a 6-question Part A screener validated for ADHD detection</li>
                </ul>
              </div>

              {/* DASS-21 card */}
              <div className="rounded-2xl border border-brand-border bg-brand-offWhite p-7 shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="text-xs font-bold text-brand-muted uppercase tracking-wide">Part 2 of 2</p>
                    <h3 className="text-lg font-black text-brand-navy">DASS-21</h3>
                  </div>
                </div>
                <p className="text-brand-text font-semibold mb-2">Depression Anxiety Stress Scales</p>
                <ul className="text-brand-muted text-sm space-y-1.5">
                  <li>· Developed by Lovibond &amp; Lovibond (1995), UNSW</li>
                  <li>· 21 questions covering three subscales: depression, anxiety, and stress</li>
                  <li>· Asks about how you felt over the <strong className="text-brand-text">past week</strong></li>
                  <li>· Each subscale scored independently against published norms</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: How Scoring Works ──────────────────────── */}
        <section className="bg-brand-offWhite py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">Section 2</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text mb-8">
              How Scoring Works
            </h2>
            <p className="text-brand-muted text-lg leading-relaxed mb-8">
              Each of your responses is assigned a number, those numbers are added up for each
              subscale, and the total is compared against published clinical thresholds. Your results
              fall into one of the severity bands below.
            </p>

            <div className="space-y-3 mb-10">
              {severityRows.map(({ band, colour, text, bg, border }) => (
                <div
                  key={band}
                  className={`flex items-center gap-4 rounded-xl border px-5 py-3 ${bg} ${border}`}
                >
                  <span className={`w-3 h-3 rounded-full flex-shrink-0 ${colour}`} />
                  <span className={`font-semibold text-sm ${text}`}>{band}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 text-sm text-brand-muted">
              <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
                <p className="font-bold text-brand-text mb-2">DASS-21 bands</p>
                <p className="leading-relaxed">
                  Depression, anxiety, and stress are each scored from 0–42 and rated across five
                  bands: Normal, Mild, Moderate, Severe, and Extremely Severe. Thresholds differ
                  for each subscale based on the original normative data.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-brand-border p-5 shadow-card">
                <p className="font-bold text-brand-text mb-2">ASRS bands</p>
                <p className="leading-relaxed">
                  ADHD total score is rated across four bands: Minimal, Mild, Moderate, and Severe.
                  The Part A screener (6 questions) uses a separate threshold model — 4 or more
                  threshold hits is considered a positive screener result.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Important Disclaimer ───────────────────── */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">Section 3</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text mb-8">
              Important Disclaimer
            </h2>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7 mb-8">
              <div className="flex gap-4">
                <span className="text-amber-500 text-2xl flex-shrink-0 mt-0.5">⚠</span>
                <div>
                  <p className="font-bold text-amber-800 text-lg mb-3">This is a screening tool — not a clinical diagnosis</p>
                  <ul className="text-amber-700 text-sm space-y-2 leading-relaxed">
                    <li>· Screening tools identify people who <em>may</em> benefit from further evaluation. A high score does not confirm a diagnosis; a low score does not rule one out.</li>
                    <li>· A formal diagnosis can only be made following a comprehensive clinical evaluation by a qualified licensed healthcare provider.</li>
                    <li>· Results from this tool should be used as a starting point for a conversation with your provider, not as a standalone conclusion.</li>
                    <li>· This tool is intended for adults aged 18 and over.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
              <div className="flex gap-4">
                <span className="text-red-500 text-2xl flex-shrink-0 mt-0.5">🆘</span>
                <div>
                  <p className="font-bold text-red-800 text-lg mb-2">If you are in crisis</p>
                  <p className="text-red-700 text-sm leading-relaxed">
                    If you are experiencing a mental health emergency, are having thoughts of harming
                    yourself or others, or are in immediate distress, please call or text{' '}
                    <strong>988</strong> (Suicide &amp; Crisis Lifeline) or go to your nearest
                    emergency room immediately. This screening tool is not monitored and cannot
                    provide emergency support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="bg-brand-navy py-20 px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to Take the Assessment?
            </h2>
            <p className="text-white/60 mb-8">
              Free · 5 minutes · No account required.
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-3 bg-brand-teal hover:bg-brand-tealDark text-white text-lg font-bold px-10 py-5 rounded-xl transition-colors shadow-lg"
            >
              Start Your Free Assessment →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
