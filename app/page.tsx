import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
export default function HomePage() {
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
              Finally Understand
              <br />
              <span className="text-brand-accent">Your Brain</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              Answer 39 clinically-validated questions and discover your personal profile across
              ADHD, depression, anxiety, and stress — in about 5 minutes.
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-3 bg-brand-teal hover:bg-brand-tealDark text-white text-lg font-bold px-10 py-5 rounded-xl transition-colors shadow-lg"
            >
              Start Your Free Assessment →
            </Link>
            <p className="text-white/40 text-sm mt-5">
              No account required. 100% confidential.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-14 pt-10 border-t border-white/10">
              {['Clinically Validated', 'DASS-21 Screener', 'ASRS v1.1', 'Instant Results', 'HIPAA Mindful'].map(item => (
                <div key={item} className="flex items-center gap-2 text-white/60 text-sm">
                  <span className="text-brand-accent">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* What you'll learn */}
        <section className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest text-center mb-3">What You&apos;ll Discover</p>
            <h2 className="text-3xl sm:text-4xl font-black text-brand-text text-center mb-12">
              A Complete Picture of How Your Brain Works
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🧠', title: 'ADHD Profile', desc: 'Inattention and hyperactivity/impulsivity patterns across 18 clinical questions.' },
                { icon: '😔', title: 'Depression', desc: 'How your mood, motivation, and sense of self are being affected right now.' },
                { icon: '😰', title: 'Anxiety', desc: 'Physical and psychological anxiety symptoms across the past week.' },
                { icon: '😤', title: 'Stress', desc: "Your current stress load and how it's impacting your daily functioning." },
              ].map(card => (
                <div key={card.title} className="bg-brand-offWhite rounded-2xl p-6 border border-brand-border shadow-card">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-bold text-brand-text mb-2">{card.title}</h3>
                  <p className="text-sm text-brand-muted leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* CTA */}
        <section className="bg-brand-teal py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to Get Clarity?</h2>
            <p className="text-white/80 text-lg mb-8">Join thousands who have taken the first step toward understanding their mental health.</p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 bg-white text-brand-teal font-bold text-lg px-10 py-5 rounded-xl hover:bg-brand-offWhite transition-colors shadow-lg"
            >
              Take the Free Assessment →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
