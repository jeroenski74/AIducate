import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getLanguageTutorResponse } from '../services/aiService';
import { colors, spacing, borderRadius, typography } from '../utils/theme';

const LANGUAGES = ['Spanish', 'French', 'German', 'Italian', 'Japanese', 'Portuguese'];

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function LanguageTutorScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSelectLanguage = useCallback(async (lang: string) => {
    setSelectedLanguage(lang);
    const welcomeMessage: Message = {
      role: 'assistant',
      content: `¡Hola! Welcome to your ${lang} tutor! 🎉\n\nI'm here to help you learn ${lang} through conversation. Feel free to practice sentences, ask questions about grammar, or just chat!\n\nWhat would you like to start with?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSend = useCallback(async () => {
    if (!inputText.trim() || !selectedLanguage) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await getLanguageTutorResponse(
        inputText.trim(),
        selectedLanguage,
        history
      );
      const aiMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [inputText, selectedLanguage, messages]);

  if (!selectedLanguage) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.languageSelectContainer}>
          <Text style={styles.selectTitle}>Choose a Language</Text>
          <Text style={styles.selectSubtitle}>
            Pick a language to practice with your AI tutor
          </Text>
          <View style={styles.languageGrid}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={styles.languageCard}
                onPress={() => handleSelectLanguage(lang)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[colors.primary, colors.secondary]}
                  style={styles.languageCardGradient}
                >
                  <Text style={styles.languageFlag}>{getFlag(lang)}</Text>
                  <Text style={styles.languageName}>{lang}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSelectedLanguage(null)}>
          <Text style={styles.backButtonText}>← Languages</Text>
        </TouchableOpacity>
        <Text style={styles.languageHeader}>
          {getFlag(selectedLanguage)} {selectedLanguage} Tutor
        </Text>
        <View style={{ width: 80 }} />
      </View>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              {msg.role === 'assistant' && (
                <Text style={styles.aiLabel}>🤖 AI Tutor</Text>
              )}
              <Text
                style={[
                  styles.messageText,
                  msg.role === 'user' ? styles.userText : styles.aiText,
                ]}
              >
                {msg.content}
              </Text>
            </View>
          ))}
          {isTyping && (
            <View style={[styles.messageBubble, styles.aiBubble]}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.typingText}>Tutor is typing...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.messageInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={`Type in English or ${selectedLanguage}...`}
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!inputText.trim() || isTyping}
          >
            <LinearGradient
              colors={inputText.trim() ? [colors.primary, colors.secondary] : [colors.card, colors.card]}
              style={styles.sendButtonGradient}
            >
              <Text style={styles.sendButtonText}>→</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function getFlag(language: string): string {
  const flags: Record<string, string> = {
    Spanish: '🇪🇸',
    French: '🇫🇷',
    German: '🇩🇪',
    Italian: '🇮🇹',
    Japanese: '🇯🇵',
    Portuguese: '🇧🇷',
  };
  return flags[language] ?? '🌍';
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
  languageHeader: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  languageSelectContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  selectTitle: {
    ...typography.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  selectSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  languageCard: {
    width: '47%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  languageCardGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  languageFlag: { fontSize: 40, marginBottom: spacing.sm },
  languageName: { ...typography.body, fontWeight: '600', color: colors.white },
  chatContainer: { flex: 1 },
  messageList: { flex: 1 },
  messageListContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  aiLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  messageText: { ...typography.body },
  userText: { color: colors.white },
  aiText: { color: colors.text, lineHeight: 24 },
  typingText: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.xs },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.text,
    ...typography.body,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  sendButtonDisabled: { opacity: 0.6 },
  sendButtonGradient: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: { fontSize: 20, color: colors.white, fontWeight: '700' },
});
