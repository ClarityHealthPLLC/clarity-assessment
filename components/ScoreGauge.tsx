import { SEVERITY_COLOUR, SEVERITY_BG } from '@/lib/scoring'
type Props = {
  label: string
  score: number
  maxScore: number
  severity: string
  description?: string
}
export default function ScoreGauge({ label, score, maxScore, severity, description }: Props) {
  const pct = Math.min(100, Math.round((score / maxScore) * 100))
  const colour = SEVERITY_COLOUR[severity] ?? '#1a8a8a'
  const bg = SEVERITY_BG[severity] ?? '#e6f5f5'
  return (
    <div
      className="rounded-2xl border p-5 shadow-card"
      style={{ backgroundColor: bg, borderColor: colour + '40' }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm font-semibold text-brand-muted uppercase tracking-wide">{label}</p>
          <p className="text-3xl font-black mt-1" style={{ color: colour }}>{score}</p>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full text-white mt-1"
          style={{ backgroundColor: colour }}
        >
          {severity}
        </span>
      </div>
      <div className="h-2.5 bg-black/10 rounded-full overflow-hidden mb-3">
        <div
          className="gauge-bar"
          style={{ width: `${pct}%`, backgroundColor: colour }}
        />
      </div>
      {description && (
        <p className="text-sm text-brand-muted leading-relaxed">{description}</p>
      )}
    </div>
  )
}
