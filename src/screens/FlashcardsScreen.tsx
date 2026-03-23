import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList, Flashcard } from '../types';
import { generateFlashcards } from '../services/aiService';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

type FlashcardsRouteProp = RouteProp<RootStackParamList, 'Flashcards'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function FlashcardsScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<FlashcardsRouteProp>();
  const { topic } = route.params;

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [isFinished, setIsFinished] = useState(false);

  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadCards();
  }, [topic]);

  const loadCards = async () => {
    setIsLoading(true);
    try {
      const fc = await generateFlashcards(topic, 8);
      setCards(fc);
    } finally {
      setIsLoading(false);
    }
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const handleFlip = useCallback(() => {
    const toValue = isFlipped ? 0 : 180;
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  }, [isFlipped, flipAnim]);

  const handleKnow = useCallback(() => {
    setKnownCards((prev) => new Set([...prev, cards[currentIndex].id]));
    goToNext();
  }, [cards, currentIndex]);

  const handleStudyMore = useCallback(() => {
    goToNext();
  }, []);

  const goToNext = useCallback(() => {
    if (currentIndex + 1 >= cards.length) {
      setIsFinished(true);
      return;
    }
    flipAnim.setValue(0);
    setIsFlipped(false);
    setCurrentIndex((i) => i + 1);
  }, [currentIndex, cards.length, flipAnim]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCards(new Set());
    setIsFinished(false);
    flipAnim.setValue(0);
    loadCards();
  }, [flipAnim, topic]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Creating flashcards with AI...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isFinished) {
    const knownCount = knownCards.size;
    const studyCount = cards.length - knownCount;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultEmoji}>🎉</Text>
          <Text style={styles.resultTitle}>Session Complete!</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{knownCount}</Text>
              <Text style={styles.statLabel}>Known ✅</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{studyCount}</Text>
              <Text style={styles.statLabel}>To Study 📖</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={0.85} onPress={handleRestart}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Study Again</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back to Modules</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const card = cards[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.topicLabel}>{topic} Flashcards</Text>
        <Text style={styles.counter}>
          {currentIndex + 1}/{cards.length}
        </Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentIndex + 1) / cards.length) * 100}%` },
          ]}
        />
      </View>

      <TouchableOpacity style={styles.cardContainer} onPress={handleFlip} activeOpacity={0.95}>
        <Animated.View
          style={[
            styles.card,
            styles.cardFront,
            { transform: [{ rotateY: frontInterpolate }] },
          ]}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.cardGradient}
          >
            <Text style={styles.cardSide}>FRONT</Text>
            <Text style={styles.cardText}>{card.front}</Text>
            <Text style={styles.tapHint}>Tap to reveal answer</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
        >
          <LinearGradient
            colors={[colors.secondary, colors.primary]}
            style={styles.cardGradient}
          >
            <Text style={styles.cardSide}>BACK</Text>
            <Text style={styles.cardText}>{card.back}</Text>
            <Text style={styles.tapHint}>Tap to flip back</Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>

      {isFlipped && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.studyMoreButton]}
            onPress={handleStudyMore}
          >
            <Text style={styles.actionButtonText}>📖 Study More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.knowButton]}
            onPress={handleKnow}
          >
            <Text style={styles.actionButtonText}>✅ I Know It</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.knownBadge}>
        <Text style={styles.knownBadgeText}>Known: {knownCards.size}</Text>
      </View>
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
  },
  counter: { ...typography.bodySmall, color: colors.textSecondary },
  backButtonText: { ...typography.body, color: colors.primary },
  progressBar: {
    height: 4,
    backgroundColor: colors.card,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.round,
    marginBottom: spacing.xl,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.round,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    width: SCREEN_WIDTH - spacing.lg * 2,
    height: 300,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardFront: {},
  cardBack: {},
  cardGradient: {
    flex: 1,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSide: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.lg,
  },
  cardText: {
    ...typography.h2,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 32,
  },
  tapHint: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
    marginTop: spacing.lg,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  studyMoreButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  knowButton: {
    backgroundColor: colors.success,
  },
  actionButtonText: { ...typography.button, color: colors.white },
  knownBadge: {
    alignSelf: 'center',
    marginBottom: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: borderRadius.round,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  knownBadgeText: { ...typography.caption, color: colors.textSecondary },
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  resultEmoji: { fontSize: 80, marginBottom: spacing.md },
  resultTitle: { ...typography.h1, color: colors.text, marginBottom: spacing.xl },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: { fontSize: 48, fontWeight: '700', color: colors.primary },
  statLabel: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs },
  button: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
  },
  buttonText: { ...typography.button, color: colors.white },
  backButton: { marginTop: spacing.md },
});
