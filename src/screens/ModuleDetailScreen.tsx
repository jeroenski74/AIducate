import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { MODULE_TOPICS } from '../utils/moduleData';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

type ModuleDetailRouteProp = RouteProp<RootStackParamList, 'ModuleDetail'>;
type ModuleDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ModuleDetail'>;

export default function ModuleDetailScreen(): React.JSX.Element {
  const route = useRoute<ModuleDetailRouteProp>();
  const navigation = useNavigation<ModuleDetailNavigationProp>();
  const { module } = route.params;
  const topic = MODULE_TOPICS[module.id] ?? module.title;

  const handleStart = useCallback(() => {
    switch (module.category) {
      case 'quiz':
        navigation.navigate('Quiz', { topic });
        break;
      case 'flashcard':
        navigation.navigate('Flashcards', { topic });
        break;
      case 'language':
        navigation.navigate('LanguageTutor');
        break;
      case 'math':
        navigation.navigate('MathPractice');
        break;
      case 'coding':
        navigation.navigate('Quiz', { topic });
        break;
      default:
        navigation.navigate('Quiz', { topic });
    }
  }, [module.category, navigation, topic]);

  const getActivityDescription = () => {
    switch (module.category) {
      case 'quiz':
        return 'AI-generated quiz questions tailored to your level';
      case 'flashcard':
        return 'Smart flashcards with spaced repetition';
      case 'language':
        return 'Conversational practice with your AI tutor';
      case 'math':
        return 'Step-by-step problem solving with explanations';
      case 'coding':
        return 'Interactive coding challenges and exercises';
      default:
        return 'Interactive AI-powered learning';
    }
  };

  const features = [
    { icon: '🤖', text: 'AI-powered content generation' },
    { icon: '📈', text: 'Adaptive difficulty based on performance' },
    { icon: '💡', text: 'Instant explanations and feedback' },
    { icon: '🎯', text: 'Focused learning objectives' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={module.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.heroIcon}>{module.icon}</Text>
        <Text style={styles.heroTitle}>{module.title}</Text>
        <Text style={styles.heroDescription}>{module.description}</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you'll do</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityText}>{getActivityDescription()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topic</Text>
          <View style={styles.topicBadge}>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.85} onPress={handleStart}>
          <LinearGradient
            colors={module.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.startButton}
          >
            <Text style={styles.startButtonText}>Start Learning →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  backButtonText: {
    color: 'rgba(255,255,255,0.85)',
    ...typography.body,
  },
  heroIcon: {
    fontSize: 64,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  heroDescription: {
    ...typography.body,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  activityCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activityText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  featureText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  topicBadge: {
    backgroundColor: colors.primary + '33',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  topicText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  startButton: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  startButtonText: {
    ...typography.button,
    color: colors.white,
    fontSize: 18,
  },
});
