import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ModuleDetailScreen from './src/screens/ModuleDetailScreen';
import QuizScreen from './src/screens/QuizScreen';
import FlashcardsScreen from './src/screens/FlashcardsScreen';
import LanguageTutorScreen from './src/screens/LanguageTutorScreen';
import MathPracticeScreen from './src/screens/MathPracticeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { RootStackParamList } from './src/types';
import { loadApiKey } from './src/services/storageService';
import { initializeAI } from './src/services/aiService';
import { colors } from './src/utils/theme';

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): React.JSX.Element {
  useEffect(() => {
    // Load saved API key on startup
    (async () => {
      const key = await loadApiKey();
      if (key) {
        initializeAI(key);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={colors.background} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Flashcards" component={FlashcardsScreen} />
        <Stack.Screen name="LanguageTutor" component={LanguageTutorScreen} />
        <Stack.Screen name="MathPractice" component={MathPracticeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
