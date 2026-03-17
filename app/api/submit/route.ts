import { NextRequest, NextResponse } from 'next/server'
import { scoreAll } from '@/lib/scoring'
import type { Answers } from '@/lib/scoring'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const answers: Answers = body.answers

    if (!answers || typeof answers !== 'object') {
      return NextResponse.json({ error: 'Invalid answers payload' }, { status: 400 })
    }

    const result = scoreAll(answers)

    // TODO: persist to Supabase
    // TODO: send results email via Resend

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('[submit] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
