import OpenAI from 'openai';
import { QuizQuestion, Flashcard } from '../types';

let openaiClient: OpenAI | null = null;

export function initializeAI(apiKey: string): void {
  openaiClient = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
}

export function isAIInitialized(): boolean {
  return openaiClient !== null;
}

export async function generateQuizQuestions(
  topic: string,
  count: number = 5
): Promise<QuizQuestion[]> {
  if (!openaiClient) {
    return getMockQuizQuestions(topic, count);
  }

  const prompt = `Generate ${count} multiple choice quiz questions about "${topic}".
Return a JSON array with this exact structure:
[
  {
    "id": "q1",
    "question": "Question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of why the answer is correct"
  }
]
Only return the JSON array, nothing else.`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content ?? '';
    const parsed = JSON.parse(content) as QuizQuestion[];
    return parsed.map((q, i) => ({ ...q, id: `q${i + 1}` }));
  } catch {
    return getMockQuizQuestions(topic, count);
  }
}

export async function generateFlashcards(
  topic: string,
  count: number = 8
): Promise<Flashcard[]> {
  if (!openaiClient) {
    return getMockFlashcards(topic, count);
  }

  const prompt = `Generate ${count} flashcards for studying "${topic}".
Return a JSON array with this exact structure:
[
  {
    "id": "f1",
    "front": "Question or term",
    "back": "Answer or definition",
    "topic": "${topic}"
  }
]
Only return the JSON array, nothing else.`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content ?? '';
    const parsed = JSON.parse(content) as Flashcard[];
    return parsed.map((f, i) => ({ ...f, id: `f${i + 1}`, topic }));
  } catch {
    return getMockFlashcards(topic, count);
  }
}

export async function getLanguageTutorResponse(
  userMessage: string,
  targetLanguage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  if (!openaiClient) {
    return getMockLanguageResponse(userMessage, targetLanguage);
  }

  const systemPrompt = `You are a friendly and encouraging language tutor helping the user learn ${targetLanguage}.
- Respond in both English and ${targetLanguage}
- Correct mistakes gently and explain why
- Provide example sentences
- Keep responses concise and educational
- Encourage the user`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage },
      ],
      temperature: 0.8,
    });

    return response.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.';
  } catch {
    return getMockLanguageResponse(userMessage, targetLanguage);
  }
}

export async function generateMathProblem(
  difficulty: 'easy' | 'medium' | 'hard',
  topic: string
): Promise<{ problem: string; answer: number; steps: string[] }> {
  if (!openaiClient) {
    return getMockMathProblem(difficulty, topic);
  }

  const prompt = `Generate a ${difficulty} ${topic} math problem.
Return JSON with this exact structure:
{
  "problem": "The math problem text",
  "answer": 42,
  "steps": ["Step 1: ...", "Step 2: ...", "Step 3: ..."]
}
Only return the JSON, nothing else.`;

  try {
    const response = await openaiClient.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const content = response.choices[0]?.message?.content ?? '';
    return JSON.parse(content) as { problem: string; answer: number; steps: string[] };
  } catch {
    return getMockMathProblem(difficulty, topic);
  }
}

// Mock data for demo mode (no API key needed)
function getMockQuizQuestions(topic: string, count: number): QuizQuestion[] {
  const mockQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      question: `What is a key concept in ${topic}?`,
      options: ['Concept A', 'Concept B', 'Concept C', 'Concept D'],
      correctIndex: 0,
      explanation: `Concept A is fundamental to understanding ${topic}.`,
    },
    {
      id: 'q2',
      question: `Which of the following best describes ${topic}?`,
      options: ['Description 1', 'Description 2', 'Description 3', 'Description 4'],
      correctIndex: 1,
      explanation: `Description 2 most accurately captures the essence of ${topic}.`,
    },
    {
      id: 'q3',
      question: `What is the primary purpose of ${topic}?`,
      options: ['Purpose A', 'Purpose B', 'Purpose C', 'Purpose D'],
      correctIndex: 2,
      explanation: `Purpose C represents the main goal of ${topic}.`,
    },
    {
      id: 'q4',
      question: `Who is associated with ${topic}?`,
      options: ['Person A', 'Person B', 'Person C', 'Person D'],
      correctIndex: 0,
      explanation: `Person A made significant contributions to ${topic}.`,
    },
    {
      id: 'q5',
      question: `When was ${topic} first introduced?`,
      options: ['19th century', '20th century', '21st century', 'Ancient times'],
      correctIndex: 1,
      explanation: `${topic} emerged primarily in the 20th century.`,
    },
  ];
  return mockQuestions.slice(0, count);
}

function getMockFlashcards(topic: string, count: number): Flashcard[] {
  const cards = Array.from({ length: count }, (_, i) => ({
    id: `f${i + 1}`,
    front: `${topic} term ${i + 1}`,
    back: `Definition of ${topic} term ${i + 1}: This is a key concept that helps understand the broader field.`,
    topic,
  }));
  return cards;
}

function getMockLanguageResponse(message: string, language: string): string {
  return `Great attempt! In ${language}, you might say: "[${language} translation]"\n\nKeep practicing! 🌟 You're doing wonderfully. Try forming a sentence using what you've learned.`;
}

function getMockMathProblem(
  difficulty: 'easy' | 'medium' | 'hard',
  topic: string
): { problem: string; answer: number; steps: string[] } {
  const problems = {
    easy: {
      problem: `Solve: 15 + 27 = ?`,
      answer: 42,
      steps: ['Start with 15', 'Add 27', '15 + 27 = 42'],
    },
    medium: {
      problem: `If x² + 5x + 6 = 0, find the smaller value of x.`,
      answer: -3,
      steps: ['Factor the equation: (x + 2)(x + 3) = 0', 'x + 2 = 0 → x = -2', 'x + 3 = 0 → x = -3', 'The smaller value is -3'],
    },
    hard: {
      problem: `Find the derivative of f(x) = 3x³ - 2x² + 5x - 1 at x = 2.`,
      answer: 29,
      steps: ["f'(x) = 9x² - 4x + 5", "f'(2) = 9(4) - 4(2) + 5", "f'(2) = 36 - 8 + 5", "f'(2) = 33"],
    },
  };
  return { ...problems[difficulty], problem: `[${topic}] ${problems[difficulty].problem}` };
}
