type Props = {
  current: number
  total: number
  sectionLabel: string
}
export default function ProgressBar({ current, total, sectionLabel }: Props) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-brand-muted font-medium">{sectionLabel}</span>
        <span className="text-sm text-brand-teal font-semibold">{current} / {total}</span>
      </div>
      <div className="h-2 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
