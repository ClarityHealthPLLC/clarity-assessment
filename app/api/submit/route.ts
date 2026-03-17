import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, dass, asrs, overlapFlag } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    // 1 — Save to Supabase
    const { error: dbError } = await supabaseAdmin
      .from('assessment_submissions')
      .insert({
        email,
        consent: true,
        asrs_inattention_score: asrs.inattentionScore,
        asrs_hyperactivity_score: asrs.hyperactivityScore,
        asrs_total_score: asrs.totalScore,
        asrs_severity: asrs.severity,
        asrs_screener_positive: asrs.screenerPositive,
        dass_depression_score: dass.depression.score,
        dass_depression_severity: dass.depression.severity,
        dass_anxiety_score: dass.anxiety.score,
        dass_anxiety_severity: dass.anxiety.severity,
        dass_stress_score: dass.stress.score,
        dass_stress_severity: dass.stress.severity,
        overlap_flag: overlapFlag,
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // 2 — Add to Blastable "Assessment Profile" list
    const blastableRes = await fetch(
      `${process.env.BLASTABLE_API_URL}/lists/${process.env.BLASTABLE_LIST_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.BLASTABLE_API_KEY!,
        },
        body: JSON.stringify({
          EMAIL: email,
          status: 'subscribed',
        }),
      }
    )

    if (!blastableRes.ok) {
      // Log but don't fail — Supabase save already succeeded
      const blastableErr = await blastableRes.text()
      console.warn('Blastable subscription warning:', blastableErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 })
  }
}
