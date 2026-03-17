'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HomePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (!consent) {
      setError('Please check the consent box to continue.')
      return
    }
    setError('')
    setLoading(true)
    sessionStorage.setItem('assessment_email', email)
    router.push('/assessment')
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-brand-navy min-h-screen flex flex-col justify-center px-4 pt-16">
          <div className="max-w-3xl mx-auto text-center py-20">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-5">
              Free · 5 Minutes · Confidential
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Get a Free Snapshot of<br />
              <span className="text-brand-accent">How Your Brain Is Really Working</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              In about 5 minutes, discover where you stand across four key domains — attention &amp; focus, depression, anxiety, and stress — using the same validated clinical screening tools used by healthcare providers. This isn&apos;t a personality quiz. It&apos;s a real clinical snapshot that could finally explain patterns you&apos;ve been living with for years.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center gap-3 bg-brand-teal hover:bg-brand-tealDark text-white text-lg font-bold px-10 py-5 rounded-xl transition-colors shadow-lg"
            >
              Get My Free Brain Snapshot →
            </a>
            <p className="text-white/40 text-sm mt-5">
              Free. No account required. Results emailed to you instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-14 pt-10 border-t border-white/10">
              {['Clinically Validated', 'DASS-21 Screener', 'ASRS v1.1', 'Instant Results', 'HIPAA Mindful'].map(item => (
                <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="text-brand-accent">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you'll discover */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest text-center mb-3">Your Brain Snapshot Covers</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text text-center mb-12">
              Four Key Domains — Assessed Together
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[
                { icon: '🧠', title: 'ADHD & Attention', desc: 'Inattention and hyperactivity/impulsivity patterns using the WHO-developed ASRS v1.1 — 18 questions covering the past 6 months.' },
                { icon: '😔', title: 'Depression', desc: 'How your mood, motivation, and sense of self have been affected over the past week.' },
                { icon: '😰', title: 'Anxiety', desc: 'Physical and psychological anxiety symptoms scored against published clinical thresholds.' },
                { icon: '😤', title: 'Stress', desc: "Your current stress load and how it's impacting your daily functioning right now." },
              ].map(card => (
                <div key={card.title} className="bg-brand-offWhite rounded-2xl p-6 border border-brand-border shadow-card text-center">
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <h3 className="font-bold text-brand-text mb-2">{card.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The two instruments */}
        <section className="bg-brand-offWhite py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest text-center mb-3">The Science Behind It</p>
            <h2 className="text-3xl font-black text-brand-text text-center mb-12">Two Validated Clinical Tools</h2>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-brand-border shadow-card">
                <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">Part 1 of 2 · 18 Questions</p>
                <h3 className="text-xl font-black text-brand-text mb-3">ASRS v1.1</h3>
                <p className="text-sm font-semibold text-brand-muted mb-4">Adult ADHD Self-Report Scale</p>
                <ul className="space-y-2 text-sm text-brand-muted">
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Developed by the World Health Organization</li>
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Covers inattention &amp; hyperactivity/impulsivity</li>
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Asks about behaviour over the past 6 months</li>
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Includes validated 6-question Part A screener</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-brand-border shadow-card">
                <p className="text-brand-teal text-xs font-bold uppercase tracking-widest mb-2">Part 2 of 2 · 21 Questions</p>
                <h3 className="text-xl font-black text-brand-text mb-3">DASS-21</h3>
                <p className="text-sm font-semibold text-brand-muted mb-4">Depression Anxiety Stress Scales</p>
                <ul className="space-y-2 text-sm text-brand-muted">
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Developed by Lovibond &amp; Lovibond, UNSW (1995)</li>
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Three independently scored subscales</li>
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Asks about how you felt over the past week</li>
                  <li className="flex gap-2"><span className="text-brand-teal">✓</span> Scored against published normative data</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How scoring works */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl font-black text-brand-text mb-6">Plain-Language Results You Can Actually Use</h2>
            <p className="text-brand-muted leading-relaxed mb-10">
              Each response is scored numerically, totalled per subscale, and compared against published clinical thresholds. Your results are shown as severity bands — from Normal through to Extremely Severe — so you get a clear, honest picture rather than a vague percentage.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { label: 'Normal / Minimal', color: '#22c55e' },
                { label: 'Mild', color: '#eab308' },
                { label: 'Moderate', color: '#f97316' },
                { label: 'Severe', color: '#ef4444' },
                { label: 'Extremely Severe', color: '#7f1d1d' },
              ].map(band => (
                <span key={band.label} className="px-4 py-2 rounded-full text-white text-sm font-semibold" style={{ backgroundColor: band.color }}>
                  {band.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-brand-offWhite py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
              <div className="flex gap-4">
                <span className="text-3xl flex-shrink-0">⚠️</span>
                <div>
                  <h3 className="font-bold text-brand-text mb-3">Important: This is a screening tool, not a clinical diagnosis</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li>• Screening tools identify people who <em>may</em> benefit from further evaluation — a high score does not confirm a diagnosis.</li>
                    <li>• A formal diagnosis requires a comprehensive clinical evaluation by a qualified licensed healthcare provider.</li>
                    <li>• Results should be used as a starting point for a conversation with your provider, not as a standalone conclusion.</li>
                    <li>• This tool is intended for adults aged 18 and over.</li>
                  </ul>
                  <p className="mt-4 text-sm font-semibold text-red-700">
                    🆘 If you are in crisis, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) or go to your nearest emergency room.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA — Email Gate (merged from /start) */}
        <section id="get-started" className="bg-brand-navy py-20 px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-4">
                Ready to Get Clarity?
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Where Should We Send<br />
                <span className="text-brand-accent">Your Brain Snapshot Report?</span>
              </h2>
              <p className="text-white/70 leading-relaxed">
                Takes about 5 minutes. Your personalised report is emailed to you automatically the moment you finish — with your scores, severity ratings, and plain-language explanations across all four domains.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 mb-8 space-y-3">
              {[
                'Your full Brain Snapshot Report — free',
                'Scores across ADHD, depression, anxiety & stress',
                'Plain-language explanation of what your scores mean',
                'Yours to keep, reference, and share with your provider',
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-white/80 text-sm">
                  <span className="text-brand-accent font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 rounded-xl text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-teal placeholder:text-brand-muted"
              />
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded accent-brand-teal flex-shrink-0"
                />
                <span className="text-white/60 text-xs leading-relaxed group-hover:text-white/80 transition-colors">
                  I agree to receive my Brain Snapshot Report and occasional information about ADHD and mental health care from Clarity Health PLLC. I understand this is voluntary and I can unsubscribe at any time.
                </span>
              </label>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-teal hover:bg-brand-tealDark disabled:opacity-60 text-white font-bold text-lg px-8 py-5 rounded-xl transition-colors shadow-lg"
              >
                {loading ? 'Starting...' : 'Begin My Assessment →'}
              </button>
            </form>
            <p className="text-white/30 text-xs text-center mt-6">
              🔒 Free · 5 minutes · Your information is confidential and will never be sold or shared with third parties.
            </p>
            <p className="text-white/40 text-xs text-center mt-2">
              📬 Results are emailed instantly — if you don&apos;t see them, check your Junk or Spam folder.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
