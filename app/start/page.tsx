'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function StartPage() {
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
    const encoded = encodeURIComponent(email)
    router.push(`/assessment?email=${encoded}`)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-navy flex flex-col justify-center px-4 pt-16">
        <div className="max-w-lg mx-auto w-full py-20">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-brand-accent text-sm font-semibold uppercase tracking-widest mb-4">
              Almost There
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Where Should We Send<br />
              <span className="text-brand-accent">Your Brain Snapshot Report?</span>
            </h1>
            <p className="text-white/70 leading-relaxed">
              Your free personalised report will be emailed to you automatically
              the moment you complete the assessment — with your scores, severity
              ratings, and plain-language explanations across all four domains.
            </p>
          </div>

          {/* Value bullets */}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-4 rounded-xl text-brand-text text-base focus:outline-none focus:ring-2 focus:ring-brand-teal placeholder:text-brand-muted"
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded accent-brand-teal flex-shrink-0"
              />
              <span className="text-white/60 text-xs leading-relaxed group-hover:text-white/80 transition-colors">
                I agree to receive my Brain Snapshot Report and occasional information about
                ADHD and mental health care from Clarity Health PLLC. I understand this is
                voluntary and I can unsubscribe at any time.
              </span>
            </label>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-teal hover:bg-brand-tealDark disabled:opacity-60 text-white font-bold text-lg px-8 py-5 rounded-xl transition-colors shadow-lg"
            >
              {loading ? 'Starting...' : 'Begin My Assessment →'}
            </button>
          </form>

          <p className="text-white/30 text-xs text-center mt-6">
            🔒 Your information is confidential and will never be sold or shared with third parties.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
