// src/lib/quiz.ts
export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number; // 0-based
};

/** Final quiz for the "welcome" module */
export const welcomeQuiz: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "What best reflects Sweet Africa Global’s approach to quality?",
    options: [
      "Perfection at any cost on every job",
      "Consistency through clear routines and systems",
      "Doing things differently every time to stay creative",
      "Only focusing on visible areas to save time",
    ],
    answerIndex: 1,
  },
  {
    id: "q2",
    prompt: "Which statement aligns with our communication standard?",
    options: [
      "Wait until the end of the day to report issues",
      "Speak up early if something is unclear or wrong",
      "Only leads should communicate with clients",
      "Avoid documenting issues to reduce paperwork",
    ],
    answerIndex: 1,
  },
  {
    id: "q3",
    prompt: "What does “Respect for the Space, Respect for the People” mean?",
    options: [
      "Treat every space with care, discretion, and professionalism",
      "Only respect long-term clients",
      "Take photos for marketing without permission",
      "Clean quickly; details don’t matter",
    ],
    answerIndex: 0,
  },
  {
    id: "q4",
    prompt: "When is PPE required?",
    options: [
      "Only when it’s convenient",
      "Never, it slows us down",
      "Whenever the task or policy requires it",
      "Only on commercial jobs, not residential",
    ],
    answerIndex: 2,
  },
  {
    id: "q5",
    prompt: "“Speak Up, Show Up” means:",
    options: [
      "Keep quiet to avoid conflict",
      "Tell someone else to handle problems",
      "Take initiative and communicate directly",
      "Wait for a supervisor to notice",
    ],
    answerIndex: 2,
  },
];
