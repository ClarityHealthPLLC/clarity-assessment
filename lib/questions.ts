export type ResponseOption = {
  label: string
  value: number
}
export type Question = {
  id: number
  text: string
  subscale: string
  form: 'DASS21' | 'ASRS'
  options: ResponseOption[]
}
const DASS_OPTIONS: ResponseOption[] = [
  { label: 'Did not apply to me at all',                                    value: 0 },
  { label: 'Applied to me to some degree, or some of the time',             value: 1 },
  { label: 'Applied to me to a considerable degree, or a good part of the time', value: 2 },
  { label: 'Applied to me very much, or most of the time',                  value: 3 },
]
const ASRS_OPTIONS: ResponseOption[] = [
  { label: 'Never',      value: 0 },
  { label: 'Rarely',     value: 1 },
  { label: 'Sometimes',  value: 2 },
  { label: 'Often',      value: 3 },
  { label: 'Very Often', value: 4 },
]
export const DASS21_QUESTIONS: Question[] = [
  { id: 1,  form: 'DASS21', subscale: 'Stress',     text: 'I found it hard to wind down.',                                                                                       options: DASS_OPTIONS },
  { id: 2,  form: 'DASS21', subscale: 'Anxiety',    text: 'I was aware of dryness of my mouth.',                                                                                 options: DASS_OPTIONS },
  { id: 3,  form: 'DASS21', subscale: 'Depression', text: "I couldn't seem to experience any positive feeling at all.",                                                          options: DASS_OPTIONS },
  { id: 4,  form: 'DASS21', subscale: 'Anxiety',    text: 'I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion).', options: DASS_OPTIONS },
  { id: 5,  form: 'DASS21', subscale: 'Depression', text: 'I found it difficult to work up the initiative to do things.',                                                         options: DASS_OPTIONS },
  { id: 6,  form: 'DASS21', subscale: 'Stress',     text: 'I tended to over-react to situations.',                                                                               options: DASS_OPTIONS },
  { id: 7,  form: 'DASS21', subscale: 'Anxiety',    text: 'I experienced trembling (e.g. in the hands).',                                                                        options: DASS_OPTIONS },
  { id: 8,  form: 'DASS21', subscale: 'Stress',     text: 'I felt that I was using a lot of nervous energy.',                                                                    options: DASS_OPTIONS },
  { id: 9,  form: 'DASS21', subscale: 'Anxiety',    text: 'I was worried about situations in which I might panic and make a fool of myself.',                                     options: DASS_OPTIONS },
  { id: 10, form: 'DASS21', subscale: 'Depression', text: 'I felt that I had nothing to look forward to.',                                                                       options: DASS_OPTIONS },
  { id: 11, form: 'DASS21', subscale: 'Stress',     text: 'I found myself getting agitated.',                                                                                    options: DASS_OPTIONS },
  { id: 12, form: 'DASS21', subscale: 'Stress',     text: 'I found it difficult to relax.',                                                                                      options: DASS_OPTIONS },
  { id: 13, form: 'DASS21', subscale: 'Depression', text: 'I felt down-hearted and blue.',                                                                                       options: DASS_OPTIONS },
  { id: 14, form: 'DASS21', subscale: 'Stress',     text: 'I was intolerant of anything that kept me from getting on with what I was doing.',                                    options: DASS_OPTIONS },
  { id: 15, form: 'DASS21', subscale: 'Anxiety',    text: 'I felt I was close to panic.',                                                                                        options: DASS_OPTIONS },
  { id: 16, form: 'DASS21', subscale: 'Depression', text: 'I was unable to become enthusiastic about anything.',                                                                 options: DASS_OPTIONS },
  { id: 17, form: 'DASS21', subscale: 'Depression', text: "I felt I wasn't worth much as a person.",                                                                            options: DASS_OPTIONS },
  { id: 18, form: 'DASS21', subscale: 'Stress',     text: 'I felt that I was rather touchy.',                                                                                    options: DASS_OPTIONS },
  { id: 19, form: 'DASS21', subscale: 'Anxiety',    text: 'I was aware of the action of my heart in the absence of physical exertion (e.g. sense of heart rate increase, heart missing a beat).', options: DASS_OPTIONS },
  { id: 20, form: 'DASS21', subscale: 'Anxiety',    text: 'I felt scared without any good reason.',                                                                              options: DASS_OPTIONS },
  { id: 21, form: 'DASS21', subscale: 'Depression', text: 'I felt that life was meaningless.',                                                                                   options: DASS_OPTIONS },
]
export const ASRS_QUESTIONS: Question[] = [
  { id: 22, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?',                                      options: ASRS_OPTIONS },
  { id: 23, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?',                                            options: ASRS_OPTIONS },
  { id: 24, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you have problems remembering appointments or obligations?',                                                                                    options: ASRS_OPTIONS },
  { id: 25, form: 'ASRS', subscale: 'Inattention',   text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?',                                                      options: ASRS_OPTIONS },
  { id: 26, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?',                                                      options: ASRS_OPTIONS },
  { id: 27, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?',                                                          options: ASRS_OPTIONS },
  { id: 28, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?',                                                            options: ASRS_OPTIONS },
  { id: 29, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?',                                                      options: ASRS_OPTIONS },
  { id: 30, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?',                                     options: ASRS_OPTIONS },
  { id: 31, form: 'ASRS', subscale: 'Inattention',   text: 'How often do you misplace or have difficulty finding things at home or at work?',                                                                            options: ASRS_OPTIONS },
  { id: 32, form: 'ASRS', subscale: 'Inattention',   text: 'How often are you distracted by activity or noise around you?',                                                                                              options: ASRS_OPTIONS },
  { id: 33, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?',                                               options: ASRS_OPTIONS },
  { id: 34, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you feel restless or fidgety?',                                                                                                                 options: ASRS_OPTIONS },
  { id: 35, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?',                                                                    options: ASRS_OPTIONS },
  { id: 36, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you find yourself talking too much when you are in social situations?',                                                                         options: ASRS_OPTIONS },
  { id: 37, form: 'ASRS', subscale: 'Hyperactivity', text: "When you're in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?", options: ASRS_OPTIONS },
  { id: 38, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you have difficulty waiting your turn in situations when turn taking is required?',                                                             options: ASRS_OPTIONS },
  { id: 39, form: 'ASRS', subscale: 'Hyperactivity', text: 'How often do you interrupt others when they are busy?',                                                                                                      options: ASRS_OPTIONS },
]
export const ALL_QUESTIONS: Question[] = [...ASRS_QUESTIONS, ...DASS21_QUESTIONS]
export const SECTIONS = [
  {
    key: 'ASRS',
    title: 'Part 1 of 2: Attention & Focus',
    subtitle: 'The following questions ask about how you have felt and conducted yourself over the past 6 months.',
    questions: ASRS_QUESTIONS,
  },
  {
    key: 'DASS21',
    title: 'Part 2 of 2: Emotional Wellbeing',
    subtitle: 'The following questions ask about how you have felt over the past week — this is a different timeframe from the previous section.',
    questions: DASS21_QUESTIONS,
  },
]
