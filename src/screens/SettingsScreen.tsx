import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { initializeAI, isAIInitialized } from '../services/aiService';
import { saveApiKey, loadApiKey, clearApiKey } from '../services/storageService';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

export default function SettingsScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    (async () => {
      const key = await loadApiKey();
      setSavedKey(key);
      setIsConnected(isAIInitialized());
      if (key) {
        initializeAI(key);
        setIsConnected(true);
      }
    })();
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;
    await saveApiKey(apiKey.trim());
    initializeAI(apiKey.trim());
    setSavedKey(apiKey.trim());
    setIsConnected(true);
    setApiKey('');
    Alert.alert('Success', 'API key saved! AI features are now enabled.');
  };

  const handleClearKey = async () => {
    Alert.alert('Remove API Key', 'Are you sure you want to remove your API key?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          await clearApiKey();
          setSavedKey(null);
          setIsConnected(false);
          setApiKey('');
        },
      },
    ]);
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[colors.primary + '33', colors.surface]}
          style={styles.aiStatusCard}
        >
          <View style={styles.aiStatusRow}>
            <Text style={styles.aiStatusIcon}>{isConnected ? '🤖' : '🔌'}</Text>
            <View style={styles.aiStatusInfo}>
              <Text style={styles.aiStatusTitle}>AI Status</Text>
              <Text
                style={[
                  styles.aiStatusSubtitle,
                  { color: isConnected ? colors.success : colors.warning },
                ]}
              >
                {isConnected ? '✅ Connected - Full AI Mode' : '⚠️ Demo Mode (No API Key)'}
              </Text>
            </View>
          </View>
          <Text style={styles.aiStatusDescription}>
            {isConnected
              ? 'AI-generated content is enabled. You\'ll get personalized, dynamic questions and explanations.'
              : 'Using pre-built demo content. Add your OpenAI API key to unlock fully personalized AI-generated learning content.'}
          </Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OpenAI API Key</Text>

          {savedKey ? (
            <View style={styles.savedKeyContainer}>
              <View style={styles.savedKeyRow}>
                <Text style={styles.savedKeyText}>
                  {showKey ? savedKey : maskKey(savedKey)}
                </Text>
                <Switch
                  value={showKey}
                  onValueChange={setShowKey}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
              <Text style={styles.savedKeyLabel}>Show key</Text>
              <TouchableOpacity style={styles.dangerButton} onPress={handleClearKey}>
                <Text style={styles.dangerButtonText}>🗑️ Remove API Key</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text style={styles.helperText}>
                Enter your OpenAI API key to enable AI-powered content generation.
                Your key is stored securely on your device.
              </Text>
              <TextInput
                style={styles.input}
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="sk-..."
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!showKey}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <View style={styles.showKeyRow}>
                <Text style={styles.showKeyLabel}>Show key while typing</Text>
                <Switch
                  value={showKey}
                  onValueChange={setShowKey}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSaveKey}
                disabled={!apiKey.trim()}
              >
                <LinearGradient
                  colors={apiKey.trim() ? [colors.primary, colors.secondary] : [colors.card, colors.card]}
                  style={styles.saveButton}
                >
                  <Text style={styles.saveButtonText}>Save API Key</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Get an API Key</Text>
          <View style={styles.instructionCard}>
            {[
              '1. Visit platform.openai.com',
              '2. Create or log in to your account',
              '3. Navigate to API Keys section',
              '4. Click "Create new secret key"',
              '5. Copy and paste it here',
            ].map((step, i) => (
              <Text key={i} style={styles.instructionText}>
                {step}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About AIducate</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>🎓 AIducate v1.0.0</Text>
            <Text style={styles.aboutText}>
              A cross-platform learning app powered by AI. Create personalized quizzes,
              flashcards, language lessons, and math practice with the power of AI.
            </Text>
            <Text style={styles.aboutText}>Available for Android and iOS.</Text>
          </View>
        </View>
      </ScrollView>
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
  content: { flex: 1, paddingHorizontal: spacing.lg },
  aiStatusCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.primary + '44',
  },
  aiStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  aiStatusIcon: { fontSize: 40 },
  aiStatusInfo: { flex: 1 },
  aiStatusTitle: { ...typography.h3, color: colors.text },
  aiStatusSubtitle: { ...typography.bodySmall, marginTop: 2 },
  aiStatusDescription: { ...typography.bodySmall, color: colors.textSecondary },
  section: { marginBottom: spacing.xl },
  sectionTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.md },
  savedKeyContainer: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  savedKeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  savedKeyText: {
    ...typography.body,
    color: colors.text,
    fontFamily: 'monospace',
    flex: 1,
    marginRight: spacing.sm,
  },
  savedKeyLabel: { ...typography.caption, color: colors.textSecondary, marginBottom: spacing.md },
  dangerButton: {
    backgroundColor: colors.error + '1A',
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  dangerButtonText: { ...typography.body, color: colors.error },
  helperText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text,
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: 'monospace',
    marginBottom: spacing.sm,
  },
  showKeyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  showKeyLabel: { ...typography.bodySmall, color: colors.textSecondary },
  saveButton: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  saveButtonText: { ...typography.button, color: colors.white },
  instructionCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  instructionText: { ...typography.body, color: colors.textSecondary },
  aboutCard: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aboutTitle: { ...typography.h3, color: colors.text, marginBottom: spacing.sm },
  aboutText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
});
