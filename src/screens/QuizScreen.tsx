import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, QuizQuestion } from '../types';
import { generateQuizQuestions } from '../services/aiService';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

export default function QuizScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<QuizRouteProp>();
  const { topic } = route.params;

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    loadQuestions();
  }, [topic]);

  const loadQuestions = async () => {
    setIsLoading(true);
    try {
      const qs = await generateQuizQuestions(topic, 5);
      setQuestions(qs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = useCallback(
    (index: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(index);
      setShowExplanation(true);
      if (index === questions[currentIndex].correctIndex) {
        setScore((s) => s + 1);
      }
    },
    [selectedAnswer, questions, currentIndex]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
      return;
    }
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentIndex((i) => i + 1);
  }, [currentIndex, questions.length, fadeAnim]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
    setShowExplanation(false);
    loadQuestions();
  }, [topic]);

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) return styles.option;
    const q = questions[currentIndex];
    if (index === q.correctIndex) return [styles.option, styles.optionCorrect];
    if (index === selectedAnswer) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDisabled];
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Generating quiz with AI...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '📚';
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={[colors.surface, colors.background]} style={styles.resultsContainer}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            {score}/{questions.length}
          </Text>
          <Text style={styles.resultPercentage}>{percentage}% correct</Text>
          <Text style={styles.resultMessage}>
            {percentage >= 80
              ? 'Excellent work! You have a strong grasp of this topic.'
              : percentage >= 60
              ? 'Good job! Keep practicing to improve further.'
              : 'Keep studying! Every attempt helps you learn.'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleRestart}>
            <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Try Again</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back to Modules</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const question = questions[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.topicLabel}>{topic}</Text>
        <Text style={styles.progress}>
          {currentIndex + 1}/{questions.length}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentIndex + 1) / questions.length) * 100}%` },
          ]}
        />
      </View>

      <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
        <Text style={styles.questionLabel}>Question {currentIndex + 1}</Text>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(index)}
              onPress={() => handleAnswer(index)}
              activeOpacity={0.8}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionLetter}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {showExplanation && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationTitle}>
              {selectedAnswer === question.correctIndex ? '✅ Correct!' : '❌ Incorrect'}
            </Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        {selectedAnswer !== null && (
          <TouchableOpacity activeOpacity={0.85} onPress={handleNext}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>
                {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: { ...typography.body, color: colors.textSecondary },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  topicLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: spacing.sm,
  },
  progress: { ...typography.bodySmall, color: colors.textSecondary },
  backButtonText: { ...typography.body, color: colors.primary },
  progressBar: {
    height: 4,
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.round,
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  questionLabel: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  questionText: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.xl,
    lineHeight: 32,
  },
  optionsContainer: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionCorrect: { backgroundColor: colors.success + '33', borderColor: colors.success },
  optionWrong: { backgroundColor: colors.error + '33', borderColor: colors.error },
  optionDisabled: { opacity: 0.5 },
  optionLetter: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
    marginRight: spacing.md,
    width: 24,
    textAlign: 'center',
  },
  optionText: { ...typography.body, color: colors.text, flex: 1 },
  explanationCard: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  explanationTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  explanationText: { ...typography.bodySmall, color: colors.textSecondary },
  nextButton: {
    marginTop: spacing.lg,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  nextButtonText: { ...typography.button, color: colors.white },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  resultEmoji: { fontSize: 80, marginBottom: spacing.md },
  resultTitle: { ...typography.h1, color: colors.text, marginBottom: spacing.md },
  resultScore: { fontSize: 64, fontWeight: '700', color: colors.primary, lineHeight: 72 },
  resultPercentage: { ...typography.h3, color: colors.textSecondary, marginBottom: spacing.md },
  resultMessage: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: { width: '100%', marginBottom: spacing.md },
  buttonGradient: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  buttonText: { ...typography.button, color: colors.white },
  backButton: { marginTop: spacing.sm },
});
