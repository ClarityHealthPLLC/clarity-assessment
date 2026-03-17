'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { SECTIONS } from '@/lib/questions'
import { scoreAll } from '@/lib/scoring'
import type { Answers } from '@/lib/scoring'

function AssessmentContent() {
  const router = useRouter()
  const params = useSearchParams()
  const emailParam = params.get('email') || ''
  const dataParam = params.get('data') || ''

  const [sectionIndex, setSectionIndex] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [transitioning, setTransitioning] = useState(false)

  // Restore answers if coming back from transition page
  useEffect(() => {
    if (dataParam) {
      try {
        const restored = JSON.parse(decodeURIComponent(dataParam))
        setAnswers(restored)
        setSectionIndex(1)
        setQuestionIndex(0)
      } catch {}
    }
  }, [dataParam])

  // Redirect to /start if no email provided
  useEffect(() => {
    if (!emailParam && !dataParam) {
      router.replace('/start')
    }
  }, [emailParam, dataParam, router])

  const currentSection = SECTIONS[sectionIndex]
  const currentQuestion = currentSection.questions[questionIndex]
  const totalQuestions = SECTIONS.reduce((sum, s) => sum + s.questions.length, 0)
  const globalQuestionNumber = SECTIONS
    .slice(0, sectionIndex)
    .reduce((sum, s) => sum + s.questions.length, 0) + questionIndex + 1

  async function handleAnswer(value: number) {
    if (transitioning) return
    setTransitioning(true)
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    setTimeout(async () => {
      const isLastQuestionInSection = questionIndex === currentSection.questions.length - 1
      const isLastSection = sectionIndex === SECTIONS.length - 1

      if (isLastQuestionInSection && isLastSection) {
        // All done — score, submit, then go to results
        const results = scoreAll(newAnswers)
        const email = decodeURIComponent(emailParam)

        // Fire and forget — don't await, go to results immediately
        fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            answers: newAnswers,
            dass: results.dass,
            asrs: results.asrs,
            overlapFlag: results.overlapFlag,
          }),
        }).catch(console.error)

        // Go to results
        const encoded = encodeURIComponent(JSON.stringify(newAnswers))
        router.push(`/results?data=${encoded}`)
      } else if (isLastQuestionInSection) {
        // End of ASRS — go to transition page, carry email + answers
        const encodedAnswers = encodeURIComponent(JSON.stringify(newAnswers))
        const encodedEmail = emailParam
        router.push(`/assessment/transition?data=${encodedAnswers}&email=${encodedEmail}`)
      } else {
        setQuestionIndex(questionIndex + 1)
      }
      setTransitioning(false)
    }, 300)
  }

  if (!emailParam && !dataParam) return null

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-offWhite pt-16">
        <div className="bg-brand-navy text-white px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-xl font-bold mb-1">{currentSection.title}</h1>
            <p className="text-white/60 text-sm mb-6">{currentSection.subtitle}</p>
            <ProgressBar
              current={globalQuestionNumber - 1}
              total={totalQuestions}
              sectionLabel={`Section ${sectionIndex + 1} of ${SECTIONS.length}`}
            />
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-12">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={globalQuestionNumber}
              totalQuestions={totalQuestions}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </div>
        <div className="max-w-2xl mx-auto px-4 pb-12 flex justify-center gap-1.5 flex-wrap">
          {currentSection.questions.map((q, i) => (
            <div
              key={q.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i < questionIndex
                  ? 'w-4 bg-brand-teal'
                  : i === questionIndex
                  ? 'w-6 bg-brand-accent'
                  : 'w-1.5 bg-brand-border'
              }`}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand-muted">Loading...</div>}>
      <AssessmentContent />
    </Suspense>
  )
}
