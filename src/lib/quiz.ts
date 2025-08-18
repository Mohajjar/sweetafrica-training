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

/** Final quiz for the "fundamentals" module */
export const fundamentalsQuiz: QuizQuestion[] = [
  {
    id: "f1",
    prompt: "What is the primary purpose of 'sanitizing' a surface?",
    options: [
      "To remove visible dirt and debris",
      "To reduce the number of germs to a safe level",
      "To kill all pathogens, including viruses",
      "To add a protective coating to the surface",
    ],
    answerIndex: 1,
  },
  {
    id: "f2",
    prompt:
      "Which type of cleaning product is best for cutting grease and food residues?",
    options: [
      "Acidic cleaners",
      "Neutral cleaners",
      "Alkaline cleaners",
      "Abrasive cleaners",
    ],
    answerIndex: 2,
  },
  {
    id: "f3",
    prompt: "What is the core principle of a systematic cleaning flow?",
    options: [
      "Bottom to top, right to left",
      "Wet before dry",
      "Top to bottom, left to right",
      "In any order that feels efficient",
    ],
    answerIndex: 2,
  },
  {
    id: "f4",
    prompt: "What is 'dwell time' in the context of cleaning?",
    options: [
      "The time it takes to complete a room",
      "The time a cleaning product must sit on a surface to be effective",
      "The time it takes for a surface to dry",
      "The time spent inspecting a room after cleaning",
    ],
    answerIndex: 1,
  },
  {
    id: "f5",
    prompt:
      "What is the first step you should take when cleaning upholstered furniture?",
    options: [
      "Spot clean any stains",
      "Apply a fabric protector",
      "Shampoo the entire piece",
      "Vacuum the surface to remove loose dirt and debris",
    ],
    answerIndex: 3,
  },
];

/** Final quiz for the "professionalism" module */
export const professionalismQuiz: QuizQuestion[] = [
  {
    id: "p1",
    prompt:
      "What is the main difference between a standard clean and a deep clean?",
    options: [
      "The products used",
      "The time of day the cleaning is done",
      "Deep cleaning is more thorough and includes areas not covered in a standard clean",
      "Standard cleaning is only for commercial properties",
    ],
    answerIndex: 2,
  },
  {
    id: "p2",
    prompt: "What is the first step in a short-term rental turnover?",
    options: [
      "Restocking amenities",
      "Cleaning the bathroom",
      "Entry and assessment for damage",
      "Making the beds",
    ],
    answerIndex: 2,
  },
  {
    id: "p3",
    prompt: "Which of the following is a key part of a move-in/move-out clean?",
    options: [
      "Watering the plants",
      "Cleaning inside cabinets and appliances",
      "Organizing the client's personal belongings",
      "Doing the laundry",
    ],
    answerIndex: 1,
  },
  {
    id: "p4",
    prompt: "What is a key priority in commercial cleaning?",
    options: [
      "Making the space look nice for photos",
      "Cleaning without disrupting the business's operations",
      "Using the strongest possible chemicals",
      "Cleaning only during business hours",
    ],
    answerIndex: 1,
  },
  {
    id: "p5",
    prompt:
      "When cleaning around pets and children, what is the most important consideration?",
    options: [
      "Finishing the job as quickly as possible",
      "Using products that are non-toxic and safe",
      "Making sure the pets and children are in another room",
      "Using scented products to cover up pet odors",
    ],
    answerIndex: 1,
  },
];
