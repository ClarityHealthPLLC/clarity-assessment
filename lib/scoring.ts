export type Answers = Record<number, number>
const DASS_DEPRESSION_IDS = [3, 5, 10, 13, 16, 17, 21]
const DASS_ANXIETY_IDS    = [2, 4, 7, 9, 15, 19, 20]
const DASS_STRESS_IDS     = [1, 6, 8, 11, 12, 14, 18]
export type SeverityLabel = 'Normal' | 'Mild' | 'Moderate' | 'Severe' | 'Extremely Severe'
function dassSubscaleScore(ids: number[], answers: Answers): number {
  return ids.reduce((sum, id) => sum + (answers[id] ?? 0), 0) * 2
}
function dassSeverity(score: number, type: 'depression' | 'anxiety' | 'stress'): SeverityLabel {
  const bands: Record<string, [number, number, SeverityLabel][]> = {
    depression: [[0,9,'Normal'],[10,13,'Mild'],[14,20,'Moderate'],[21,27,'Severe'],[28,999,'Extremely Severe']],
    anxiety:    [[0,7,'Normal'],[8,9,'Mild'],[10,14,'Moderate'],[15,19,'Severe'],[20,999,'Extremely Severe']],
    stress:     [[0,14,'Normal'],[15,18,'Mild'],[19,25,'Moderate'],[26,33,'Severe'],[34,999,'Extremely Severe']],
  }
  for (const [min, max, label] of bands[type]) {
    if (score >= min && score <= max) return label
  }
  return 'Extremely Severe'
}
export type DASSResult = {
  depression: { score: number; severity: SeverityLabel }
  anxiety:    { score: number; severity: SeverityLabel }
  stress:     { score: number; severity: SeverityLabel }
}
export function scoreDASS(answers: Answers): DASSResult {
  const dep = dassSubscaleScore(DASS_DEPRESSION_IDS, answers)
  const anx = dassSubscaleScore(DASS_ANXIETY_IDS, answers)
  const str = dassSubscaleScore(DASS_STRESS_IDS, answers)
  return {
    depression: { score: dep, severity: dassSeverity(dep, 'depression') },
    anxiety:    { score: anx, severity: dassSeverity(anx, 'anxiety') },
    stress:     { score: str, severity: dassSeverity(str, 'stress') },
  }
}
const ASRS_INATTENTION_IDS    = [22, 23, 24, 25, 28, 29, 30, 31, 32]
const ASRS_HYPERACTIVITY_IDS  = [26, 27, 33, 34, 35, 36, 37, 38, 39]
const SCREENER_SOMETIMES_IDS = [22, 23, 24]
const SCREENER_OFTEN_IDS     = [25, 26, 27]
export type ASRSSeverityLabel = 'Minimal' | 'Mild' | 'Moderate' | 'Severe'
function asrsSeverity(score: number): ASRSSeverityLabel {
  if (score <= 23) return 'Minimal'
  if (score <= 35) return 'Mild'
  if (score <= 47) return 'Moderate'
  return 'Severe'
}
export type ASRSResult = {
  inattentionScore:   number
  hyperactivityScore: number
  totalScore:         number
  severity:           ASRSSeverityLabel
  screenerPositive:   boolean
  screenerScore:      number
  inattentionSeverity: ASRSSeverityLabel
  hyperactivitySeverity: ASRSSeverityLabel
}
export function scoreASRS(answers: Answers): ASRSResult {
  const inattentionScore  = ASRS_INATTENTION_IDS.reduce((s, id) => s + (answers[id] ?? 0), 0)
  const hyperactivityScore = ASRS_HYPERACTIVITY_IDS.reduce((s, id) => s + (answers[id] ?? 0), 0)
  const totalScore = inattentionScore + hyperactivityScore
  let screenerScore = 0
  for (const id of SCREENER_SOMETIMES_IDS) {
    if ((answers[id] ?? 0) >= 2) screenerScore++
  }
  for (const id of SCREENER_OFTEN_IDS) {
    if ((answers[id] ?? 0) >= 3) screenerScore++
  }
  return {
    inattentionScore,
    hyperactivityScore,
    totalScore,
    severity: asrsSeverity(totalScore),
    screenerPositive: screenerScore >= 4,
    screenerScore,
    inattentionSeverity: asrsSeverity(inattentionScore * 2),
    hyperactivitySeverity: asrsSeverity(hyperactivityScore * 2),
  }
}
export type FullResult = {
  dass: DASSResult
  asrs: ASRSResult
  overlapFlag: boolean
}
export function scoreAll(answers: Answers): FullResult {
  const dass = scoreDASS(answers)
  const asrs = scoreASRS(answers)
  const hasSignificantDep = ['Moderate','Severe','Extremely Severe'].includes(dass.depression.severity)
  const hasSignificantAnx = ['Moderate','Severe','Extremely Severe'].includes(dass.anxiety.severity)
  const overlapFlag = asrs.screenerPositive && (hasSignificantDep || hasSignificantAnx)
  return { dass, asrs, overlapFlag }
}
export const SEVERITY_COLOUR: Record<string, string> = {
  'Normal':           '#22c55e',
  'Minimal':          '#22c55e',
  'Mild':             '#eab308',
  'Moderate':         '#f97316',
  'Severe':           '#ef4444',
  'Extremely Severe': '#7f1d1d',
}
export const SEVERITY_BG: Record<string, string> = {
  'Normal':           '#f0fdf4',
  'Minimal':          '#f0fdf4',
  'Mild':             '#fefce8',
  'Moderate':         '#fff7ed',
  'Severe':           '#fef2f2',
  'Extremely Severe': '#fef2f2',
}
