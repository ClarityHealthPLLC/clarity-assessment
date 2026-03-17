export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white/70 py-10 px-4 mt-16">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-bold text-white mb-1">
          Clarity<span className="text-brand-accent">Health</span> PLLC
        </p>
        <p className="text-sm mb-4">Thomas Stewart, MSN, FNP-C · Licensed Nurse Practitioner · State of Illinois</p>
        <p className="text-xs leading-relaxed max-w-2xl mx-auto text-white/50">
          This screening tool is for informational purposes only and does not constitute a medical diagnosis.
          Results are not a substitute for a comprehensive clinical evaluation by a qualified healthcare provider.
          If you are in crisis or experiencing a mental health emergency, please call 988 (Suicide & Crisis Lifeline)
          or go to your nearest emergency room.
        </p>
        <p className="text-xs mt-4 text-white/40">
          © {new Date().getFullYear()} Clarity Health PLLC · All rights reserved ·{' '}
          <a href="https://clarityhealth.vip/lander" className="underline hover:text-white/70">clarityhealth.vip</a>
        </p>
      </div>
    </footer>
  )
}
