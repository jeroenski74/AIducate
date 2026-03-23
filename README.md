# AIducate 🎓

> **Use AI to let everybody learn everything**

AIducate is a cross-platform mobile learning app (Android & iOS) built with React Native and Expo. It functions as a learning platform featuring multiple mini-apps powered by AI, enabling the best ways to educate yourself.

## Features

- 🤖 **AI-Powered Content** — Uses OpenAI to generate personalized quiz questions, flashcards, and math problems
- 🧠 **Multiple Learning Modules** — 10 different learning mini-apps across subjects
- 📱 **Cross-Platform** — Works on both Android and iOS
- 🎮 **Interactive Learning** — Quizzes, flashcards, language tutoring, and math practice
- 🌙 **Beautiful Dark UI** — Modern design with gradient cards

## Learning Modules

| Category | Modules |
|----------|---------|
| 🏛️ Quiz | History Quiz, Science Quiz, Geography Quiz |
| 📚 Flashcards | Vocabulary Builder, Concept Cards |
| 🗣️ Language | Spanish Tutor, French Tutor |
| ✏️ Math | Algebra Practice, Calculus Helper |
| 💻 Coding | Coding Basics |

## Tech Stack

- **React Native** + **Expo** (SDK 55)
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **OpenAI API** for AI-generated content
- **expo-linear-gradient** for beautiful gradients
- **AsyncStorage** for local data persistence

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your phone (for testing)

### Installation

```bash
# Clone the repository
git clone https://github.com/jeroenski74/AIducate.git
cd AIducate

# Install dependencies
npm install

# Start the development server
npm start
```

### Running on Device

```bash
# Android
npm run android

# iOS (macOS only)
npm run ios

# Web browser (for quick preview)
npm run web
```

### Setting Up AI Features

1. Open the app and tap the **⚙️ Settings** button
2. Enter your [OpenAI API key](https://platform.openai.com/api-keys)
3. Save the key — it's stored securely on your device
4. All modules will now use AI-generated content!

> **Note:** Without an API key, the app runs in **Demo Mode** with pre-built content. All core features work in demo mode.

## Project Structure

```
AIducate/
├── App.tsx                  # Root app with navigation
├── app.json                 # Expo configuration
├── babel.config.js          # Babel configuration
├── src/
│   ├── screens/             # App screens
│   │   ├── HomeScreen.tsx       # Main learning hub
│   │   ├── ModuleDetailScreen.tsx  # Module overview
│   │   ├── QuizScreen.tsx       # AI quiz app
│   │   ├── FlashcardsScreen.tsx # Flashcard learner
│   │   ├── LanguageTutorScreen.tsx # AI language tutor
│   │   ├── MathPracticeScreen.tsx  # Math problem solver
│   │   └── SettingsScreen.tsx   # API key & settings
│   ├── services/            # Business logic
│   │   ├── aiService.ts         # OpenAI integration
│   │   └── storageService.ts    # Local storage
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── utils/               # Utilities
│       ├── theme.ts             # Colors, spacing, typography
│       └── moduleData.ts        # Learning module definitions
└── assets/                  # App icons and images
```

## Contributing

Contributions are welcome! Please open an issue or pull request.

## License

MIT
