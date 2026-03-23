import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { generateMathProblem } from '../services/aiService';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

type Difficulty = 'easy' | 'medium' | 'hard';
const TOPICS = ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Arithmetic'];
const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

type Problem = {
  problem: string;
  answer: number;
  steps: string[];
};

export default function MathPracticeScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [selectedTopic, setSelectedTopic] = useState('Algebra');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [problem, setProblem] = useState<Problem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [streak, setStreak] = useState(0);

  const loadProblem = useCallback(async () => {
    setIsLoading(true);
    setUserAnswer('');
    setIsChecked(false);
    setShowSteps(false);
    setIsCorrect(false);
    try {
      const p = await generateMathProblem(difficulty, selectedTopic);
      setProblem(p);
    } finally {
      setIsLoading(false);
    }
  }, [difficulty, selectedTopic]);

  const handleCheck = useCallback(() => {
    if (!problem || !userAnswer.trim()) return;
    const numAnswer = parseFloat(userAnswer.trim());
    const correct = Math.abs(numAnswer - problem.answer) < 0.01;
    setIsCorrect(correct);
    setIsChecked(true);
    if (correct) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  }, [problem, userAnswer]);

  const difficultyColor: Record<Difficulty, string> = {
    easy: colors.success,
    medium: colors.warning,
    hard: colors.error,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Math Practice</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🔥 {streak}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Topic</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.chipRow}>
                {TOPICS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={[styles.chip, selectedTopic === t && styles.chipActive]}
                    onPress={() => setSelectedTopic(t)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selectedTopic === t && styles.chipTextActive,
                      ]}
                    >
                      {t}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Difficulty</Text>
            <View style={styles.chipRow}>
              {DIFFICULTIES.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[
                    styles.chip,
                    difficulty === d && {
                      backgroundColor: difficultyColor[d] + '33',
                      borderColor: difficultyColor[d],
                    },
                  ]}
                  onPress={() => setDifficulty(d)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      difficulty === d && { color: difficultyColor[d], fontWeight: '600' },
                    ]}
                  >
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.85} onPress={loadProblem} disabled={isLoading}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.generateButton}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.generateButtonText}>
                  {problem ? '🔄 New Problem' : '✨ Generate Problem'}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {problem && !isLoading && (
            <View style={styles.problemContainer}>
              <View style={styles.problemCard}>
                <Text style={styles.problemLabel}>Problem</Text>
                <Text style={styles.problemText}>{problem.problem}</Text>
              </View>

              <View style={styles.answerSection}>
                <Text style={styles.answerLabel}>Your Answer</Text>
                <View style={styles.answerRow}>
                  <TextInput
                    style={[
                      styles.answerInput,
                      isChecked && (isCorrect ? styles.answerCorrect : styles.answerWrong),
                    ]}
                    value={userAnswer}
                    onChangeText={setUserAnswer}
                    placeholder="Enter your answer..."
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    editable={!isChecked}
                  />
                  {!isChecked && (
                    <TouchableOpacity
                      style={[styles.checkButton, !userAnswer.trim() && styles.checkButtonDisabled]}
                      onPress={handleCheck}
                      disabled={!userAnswer.trim()}
                    >
                      <LinearGradient
                        colors={[colors.accent, colors.primary]}
                        style={styles.checkButtonGradient}
                      >
                        <Text style={styles.checkButtonText}>Check</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {isChecked && (
                <View
                  style={[
                    styles.resultCard,
                    isCorrect ? styles.resultCorrect : styles.resultWrong,
                  ]}
                >
                  <Text style={styles.resultEmoji}>{isCorrect ? '🎉' : '💡'}</Text>
                  <Text style={styles.resultText}>
                    {isCorrect
                      ? `Correct! The answer is ${problem.answer}`
                      : `Not quite. The correct answer is ${problem.answer}`}
                  </Text>
                </View>
              )}

              {isChecked && (
                <TouchableOpacity
                  style={styles.stepsButton}
                  onPress={() => setShowSteps(!showSteps)}
                >
                  <Text style={styles.stepsButtonText}>
                    {showSteps ? '▲ Hide Steps' : '▼ Show Solution Steps'}
                  </Text>
                </TouchableOpacity>
              )}

              {showSteps && (
                <View style={styles.stepsContainer}>
                  <Text style={styles.stepsTitle}>Step-by-Step Solution</Text>
                  {problem.steps.map((step, index) => (
                    <View key={index} style={styles.stepRow}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.stepText}>{step}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButtonText: { ...typography.body, color: colors.primary },
  title: { ...typography.h3, color: colors.text },
  streakBadge: {
    backgroundColor: colors.accent + '33',
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  streakText: { ...typography.body, color: colors.accent, fontWeight: '700' },
  content: { flex: 1 },
  section: { paddingHorizontal: spacing.lg, marginBottom: spacing.md },
  sectionTitle: { ...typography.body, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  chipRow: { flexDirection: 'row', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { ...typography.bodySmall, color: colors.textSecondary },
  chipTextActive: { color: colors.white, fontWeight: '600' },
  generateButton: {
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  generateButtonText: { ...typography.button, color: colors.white },
  problemContainer: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  problemCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  problemLabel: {
    ...typography.caption,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  problemText: { ...typography.h3, color: colors.text, lineHeight: 28 },
  answerSection: { marginBottom: spacing.md },
  answerLabel: { ...typography.body, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  answerRow: { flexDirection: 'row', gap: spacing.sm },
  answerInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text,
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
  },
  answerCorrect: { borderColor: colors.success, backgroundColor: colors.success + '1A' },
  answerWrong: { borderColor: colors.error, backgroundColor: colors.error + '1A' },
  checkButton: { borderRadius: borderRadius.md, overflow: 'hidden' },
  checkButtonDisabled: { opacity: 0.5 },
  checkButtonGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonText: { ...typography.button, color: colors.white },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  resultCorrect: { backgroundColor: colors.success + '33', borderWidth: 1, borderColor: colors.success },
  resultWrong: { backgroundColor: colors.error + '33', borderWidth: 1, borderColor: colors.error },
  resultEmoji: { fontSize: 24 },
  resultText: { ...typography.body, color: colors.text, flex: 1 },
  stepsButton: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepsButtonText: { ...typography.body, color: colors.primary },
  stepsContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepsTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.sm, gap: spacing.sm },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { ...typography.caption, color: colors.white, fontWeight: '700' },
  stepText: { ...typography.body, color: colors.textSecondary, flex: 1, lineHeight: 24 },
});
