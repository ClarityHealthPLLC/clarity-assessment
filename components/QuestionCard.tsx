'use client'
import { useState } from 'react'
import type { Question } from '@/lib/questions'
import { motion } from 'framer-motion'
type Props = {
  question: Question
  questionNumber: number
  totalQuestions: number
  onAnswer: (value: number) => void
}
export default function QuestionCard({ question, questionNumber, totalQuestions, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  function handleSelect(value: number) {
    setSelected(value)
    setTimeout(() => onAnswer(value), 300)
  }
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
      className="w-full max-w-2xl mx-auto"
    >
      <p className="text-xs font-semibold text-brand-teal uppercase tracking-widest mb-3">
        Question {questionNumber} of {totalQuestions}
      </p>
      <h2 className="text-xl sm:text-2xl font-semibold text-brand-text leading-snug mb-8">
        {question.text}
      </h2>
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={`answer-option flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl border-2 bg-white shadow-card ${
              selected === opt.value
                ? 'selected border-brand-teal bg-brand-tealLight'
                : 'border-brand-border hover:border-brand-teal hover:bg-brand-tealLight'
            }`}
          >
            <span className={`option-dot flex-shrink-0 w-5 h-5 rounded-full border-2 ${
              selected === opt.value
                ? 'bg-brand-teal border-brand-teal'
                : 'border-brand-border bg-white'
            }`} />
            <span className="text-sm sm:text-base font-medium text-brand-text">{opt.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
