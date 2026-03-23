import Foundation

// MARK: - Vocabulary item

struct VocabularyItem: Identifiable {
    let id = UUID()
    let dutch: String
    let english: String
    let example: String?
}

// MARK: - Email scenario

struct EmailScenario: Identifiable {
    let id = UUID()
    let level: Level

    // Shown in Dutch to the learner
    let dutchTitle: String
    let dutchInstructions: String

    // Email metadata
    let suggestedSubject: String

    // Support material
    let vocabulary: [VocabularyItem]
    let sentenceStarters: [String]

    /// Pre-filled template for lower levels (nil = blank canvas for higher levels).
    let emailTemplate: String?

    /// Model answer the learner can reveal.
    let exampleAnswer: String

    // Category icon (SF Symbol name)
    let iconName: String
}
