'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { SECTIONS, ALL_QUESTIONS } from '@/lib/questions'
import type { Answers } from '@/lib/scoring'

export default function AssessmentPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Answers>({})
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const currentSection = SECTIONS[currentSectionIndex]
  const currentQuestion = currentSection.questions[currentQuestionIndex]
  const totalAnswered = Object.keys(answers).length
  const totalQuestions = ALL_QUESTIONS.length

  const handleAnswer = useCallback((value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value }
    setAnswers(newAnswers)

    const nextQIndex = currentQuestionIndex + 1
    if (nextQIndex < currentSection.questions.length) {
      setCurrentQuestionIndex(nextQIndex)
    } else {
      const nextSIndex = currentSectionIndex + 1
      if (nextSIndex < SECTIONS.length) {
        setCurrentSectionIndex(nextSIndex)
        setCurrentQuestionIndex(0)
      } else {
        // Done — store answers and navigate to results
        sessionStorage.setItem('clarity_answers', JSON.stringify(newAnswers))
        router.push('/results')
      }
    }
  }, [answers, currentQuestion, currentQuestionIndex, currentSection, currentSectionIndex, router])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-offWhite pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Section header */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-brand-navy mb-1">{currentSection.title}</h1>
            <p className="text-sm text-brand-muted">{currentSection.subtitle}</p>
          </div>
          {/* Progress */}
          <div className="mb-10">
            <ProgressBar
              current={totalAnswered}
              total={totalQuestions}
              sectionLabel={`Section ${currentSectionIndex + 1} of ${SECTIONS.length}`}
            />
          </div>
          {/* Question */}
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            questionNumber={totalAnswered + 1}
            totalQuestions={totalQuestions}
            onAnswer={handleAnswer}
          />
        </div>
      </main>
    </>
  )
}
