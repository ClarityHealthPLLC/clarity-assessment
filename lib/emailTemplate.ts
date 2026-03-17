import type { DASSResult, ASRSResult } from './scoring'

type EmailProps = {
  email: string
  dass: DASSResult
  asrs: ASRSResult
  overlapFlag: boolean
}

const SEVERITY_COLOR: Record<string, string> = {
  'Normal':           '#22c55e',
  'Minimal':          '#22c55e',
  'Mild':             '#eab308',
  'Moderate':         '#f97316',
  'Severe':           '#ef4444',
  'Extremely Severe': '#7f1d1d',
}

const SEVERITY_BG: Record<string, string> = {
  'Normal':           '#f0fdf4',
  'Minimal':          '#f0fdf4',
  'Mild':             '#fefce8',
  'Moderate':         '#fff7ed',
  'Severe':           '#fef2f2',
  'Extremely Severe': '#fef2f2',
}

function scoreBar(score: number, max: number, color: string): string {
  const pct = Math.min(100, Math.round((score / max) * 100))
  return `
    <div style="background:#e5e7eb;border-radius:999px;height:10px;width:100%;margin:8px 0 4px;">
      <div style="background:${color};border-radius:999px;height:10px;width:${pct}%;"></div>
    </div>
  `
}

function scoreCard(
  label: string,
  score: number,
  max: number,
  severity: string,
  description: string
): string {
  const color = SEVERITY_COLOR[severity] ?? '#1a8a8a'
  const bg = SEVERITY_BG[severity] ?? '#e6f5f5'
  return `
    <div style="background:${bg};border:1px solid ${color}40;border-radius:16px;padding:20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;">
        <div>
          <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#5a6a7a;">${label}</p>
          <p style="margin:4px 0 0;font-size:28px;font-weight:900;color:${color};">${score}</p>
        </div>
        <span style="background:${color};color:white;font-size:11px;font-weight:700;padding:4px 12px;border-radius:999px;margin-top:4px;">${severity}</span>
      </div>
      ${scoreBar(score, max, color)}
      <p style="margin:8px 0 0;font-size:13px;color:#5a6a7a;line-height:1.5;">${description}</p>
    </div>
  `
}

const dassDescriptions: Record<string, Record<string, string>> = {
  depression: {
    Normal:           'Your depression score is in the normal range. You appear to be managing your mood and motivation well.',
    Mild:             "You're showing some mild signs of low mood. This is worth monitoring but is manageable with the right support.",
    Moderate:         'Your results suggest moderate depression symptoms that may be impacting your daily life. Speaking with a provider is recommended.',
    Severe:           'Your score indicates significant depression symptoms. Speaking with a qualified healthcare provider is strongly recommended.',
    'Extremely Severe': 'Your score is in the extremely severe range for depression. Please reach out to a healthcare provider as soon as possible.',
  },
  anxiety: {
    Normal:           'Your anxiety score is in the normal range. No significant anxiety symptoms are indicated at this time.',
    Mild:             "You're experiencing some mild anxiety symptoms — common and manageable with the right strategies and support.",
    Moderate:         'Moderate anxiety symptoms are present that may be affecting your comfort and daily functioning.',
    Severe:           'Your anxiety score is in the severe range. A clinical evaluation would be very beneficial.',
    'Extremely Severe': 'Extremely severe anxiety symptoms are indicated. Please consider reaching out to a healthcare provider.',
  },
  stress: {
    Normal:           'Your stress levels appear to be within a normal, manageable range.',
    Mild:             "You're carrying some mild stress. Building in regular recovery time and stress management strategies can help.",
    Moderate:         'Moderate stress is evident. This level of sustained stress can affect both mental and physical health over time.',
    Severe:           'Your stress score is high. Identifying and actively addressing sources of stress is important for your wellbeing.',
    'Extremely Severe': 'Extremely high stress levels are indicated. This warrants serious attention and professional support.',
  },
}

export function buildResultsEmail({ email, dass, asrs, overlapFlag }: EmailProps): string {
  const adhdDescription = asrs.screenerPositive
    ? `Your Part A screener score (${asrs.screenerScore}/6 threshold hits) is consistent with adult ADHD symptoms. Inattention and/or hyperactivity/impulsivity patterns that meet clinical screening thresholds are present. A formal evaluation is recommended.`
    : `Your Part A screener score (${asrs.screenerScore}/6 threshold hits) does not meet the ADHD screening threshold. Some symptoms may still be present worth discussing with a provider.`

  const overlapSection = overlapFlag ? `
    <div style="background:#fffbeb;border:1px solid #fbbf24;border-radius:16px;padding:20px;margin:24px 0;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <span style="font-size:24px;flex-shrink:0;">🔗</span>
        <div>
          <p style="margin:0 0 6px;font-weight:700;color:#1a2332;font-size:15px;">Important: ADHD + Mood Symptoms Often Co-Occur</p>
          <p style="margin:0;font-size:13px;color:#5a6a7a;line-height:1.6;">Your results show both a positive ADHD screen and significant depression or anxiety symptoms. This is very common — ADHD frequently occurs alongside mood disorders, and each condition can make the other worse. A comprehensive clinical evaluation that addresses all of these together is particularly important in your case.</p>
        </div>
      </div>
    </div>
  ` : ''

  const depDesc = dassDescriptions.depression[dass.depression.severity] ?? ''
  const anxDesc = dassDescriptions.anxiety[dass.anxiety.severity] ?? ''
  const strDesc = dassDescriptions.stress[dass.stress.severity] ?? ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Brain Snapshot Report — Clarity Health PLLC</title>
</head>
<body style="margin:0;padding:0;background:#f7f9f9;font-family:'Inter',system-ui,Arial,sans-serif;color:#1a2332;">

  <!-- Header -->
  <div style="background:#0d1b2a;padding:20px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td>
          <p style="margin:0;font-size:20px;font-weight:900;color:white;">
            Clarity<span style="color:#2cb5b5;">Health</span>
            <span style="color:rgba(255,255,255,0.45);font-size:13px;font-weight:400;margin-left:6px;">PLLC</span>
          </p>
        </td>
        <td align="right">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.08em;">Brain Snapshot Report</p>
        </td>
      </tr>
    </table>
  </div>

  <!-- Hero banner -->
  <div style="background:#0d1b2a;padding:32px 32px 48px;text-align:center;border-bottom:3px solid #1a8a8a;">
    <p style="margin:0 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#2cb5b5;">Your Results Are Ready</p>
    <h1 style="margin:0 0 10px;font-size:30px;font-weight:900;color:white;line-height:1.2;">
      Your <span style="color:#2cb5b5;">Brain Snapshot Report</span>
    </h1>
    <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.6);max-width:480px;margin-left:auto;margin-right:auto;line-height:1.5;">
      Based on your responses to the ASRS v1.1 and DASS-21, here is your personalised
      mental health and attention profile.
    </p>
  </div>

  <!-- Body -->
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">

    <!-- ADHD Section -->
    <h2 style="margin:0 0 4px;font-size:18px;font-weight:900;color:#1a2332;">Attention &amp; Focus (ASRS v1.1)</h2>
    <p style="margin:0 0 16px;font-size:13px;color:#5a6a7a;">Based on your behaviour over the past 6 months</p>

    ${scoreCard('Inattention', asrs.inattentionScore, 18, asrs.inattentionSeverity,
      'Difficulty sustaining focus, following through on tasks, and staying organised.')}
    ${scoreCard('Hyperactivity / Impulsivity', asrs.hyperactivityScore, 18, asrs.hyperactivitySeverity,
      'Restlessness, impulsive speech or actions, and difficulty staying seated or calm.')}

    <!-- ADHD Screener callout -->
    <div style="background:${asrs.screenerPositive ? '#fff7ed' : '#f0fdf4'};border:1px solid ${asrs.screenerPositive ? '#fed7aa' : '#bbf7d0'};border-radius:14px;padding:18px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-weight:700;font-size:14px;color:#1a2332;">ADHD Screener (Part A)</p>
      <p style="margin:0;font-size:13px;color:#5a6a7a;line-height:1.5;">${adhdDescription}</p>
    </div>

    ${overlapSection}

    <!-- DASS-21 Section -->
    <h2 style="margin:24px 0 4px;font-size:18px;font-weight:900;color:#1a2332;">Emotional Wellbeing (DASS-21)</h2>
    <p style="margin:0 0 16px;font-size:13px;color:#5a6a7a;">Based on how you felt over the past 7 days</p>

    ${scoreCard('Depression', dass.depression.score, 42, dass.depression.severity, depDesc)}
    ${scoreCard('Anxiety',    dass.anxiety.score,    42, dass.anxiety.severity,    anxDesc)}
    ${scoreCard('Stress',     dass.stress.score,     42, dass.stress.severity,     strDesc)}

    <!-- Next step CTA -->
    <div style="background:#0d1b2a;border-radius:16px;padding:28px 24px;text-align:center;margin:32px 0;">
      <p style="margin:0 0 6px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#2cb5b5;">Next Step</p>
      <h3 style="margin:0 0 10px;font-size:22px;font-weight:900;color:white;">Ready to Talk to a Provider?</h3>
      <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.5;">
        Book a consultation with Thomas Stewart, MSN, FNP-C to review your results
        and create a personalised care plan.
      </p>
      <a
        href="https://clarityhealth.vip/lander#contact-section"
        style="display:inline-block;background:#1a8a8a;color:white;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none;"
      >
        Book Your Consultation →
      </a>
    </div>

    <!-- Disclaimer -->
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:14px;padding:18px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-weight:700;font-size:13px;color:#92400e;">⚠ Important Disclaimer</p>
      <p style="margin:0;font-size:12px;color:#78350f;line-height:1.6;">
        This screening tool is for informational purposes only and does not constitute a medical diagnosis.
        A formal diagnosis can only be made following a comprehensive clinical evaluation by a qualified
        licensed healthcare provider. Results should be used as a starting point for a conversation with
        your provider. If you are in crisis, call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline)
        or go to your nearest emergency room immediately.
      </p>
    </div>

  </div>

  <!-- Footer -->
  <div style="background:#0d1b2a;padding:24px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.08);">
    <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:white;">
      Clarity<span style="color:#2cb5b5;">Health</span> PLLC
    </p>
    <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,255,0.45);">
      Thomas Stewart, MSN, FNP-C · Licensed Nurse Practitioner · State of Illinois
    </p>
    <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);line-height:1.6;">
      This email was sent to ${email} because you completed the Clarity Health free assessment.<br />
      © ${new Date().getFullYear()} Clarity Health PLLC · All rights reserved ·
      <a href="https://clarityhealth.vip/lander" style="color:rgba(255,255,255,0.4);">clarityhealth.vip</a>
    </p>
  </div>

</body>
</html>`
}
