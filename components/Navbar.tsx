export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="https://clarityhealth.vip/lander" className="flex items-center gap-1 text-white font-bold text-lg tracking-tight">
          Clarity<span className="text-brand-accent">Health</span>
          <span className="text-white/60 text-sm font-normal ml-1">PLLC</span>
        </a>
        <a
          href="https://clarityhealth.vip/lander#contact-section"
          className="hidden sm:inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-tealDark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Book Consultation
        </a>
      </div>
    </nav>
  )
}
