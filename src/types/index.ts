export interface LearningModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: [string, string];
  category: 'quiz' | 'flashcard' | 'language' | 'math' | 'science' | 'coding';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
}

export interface UserProgress {
  moduleId: string;
  completedSessions: number;
  correctAnswers: number;
  totalAnswers: number;
  lastStudied: Date;
}

export type RootStackParamList = {
  Home: undefined;
  Quiz: { topic: string };
  Flashcards: { topic: string };
  LanguageTutor: undefined;
  MathPractice: undefined;
  ModuleDetail: { module: LearningModule };
  Settings: undefined;
};
