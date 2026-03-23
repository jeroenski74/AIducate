import SwiftUI

// MARK: - Email editor

struct EmailEditorView: View {

    let scenario: EmailScenario

    // Editor state
    @State private var emailText: String = ""
    @State private var subjectText: String = ""
    @FocusState private var focusedField: Field?

    // UI toggles
    @State private var showInstructions   = true
    @State private var showVocabulary     = false
    @State private var showStarters       = false
    @State private var showExampleAnswer  = false
    @State private var showClearConfirm   = false
    @State private var showCopiedHint     = false

    private enum Field { case subject, body }

    // Derived
    private var wordCount: Int {
        emailText.split { $0.isWhitespace }.count
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {

                // MARK: Instructions card
                InstructionsCard(
                    scenario: scenario,
                    isExpanded: $showInstructions
                )

                // MARK: Help buttons
                HelpButtonRow(
                    scenario: scenario,
                    showVocabulary: $showVocabulary,
                    showStarters: $showStarters
                )

                // MARK: Template helper (lower levels)
                if scenario.level.showTemplate, let template = scenario.emailTemplate {
                    TemplateCard(template: template) {
                        if emailText.isEmpty {
                            emailText = template
                        }
                    }
                }

                // MARK: Subject field
                VStack(alignment: .leading, spacing: 6) {
                    Label("Onderwerp (Subject)", systemImage: "envelope")
                        .font(.caption.bold())
                        .foregroundStyle(.secondary)
                    TextField(scenario.suggestedSubject, text: $subjectText)
                        .font(.subheadline)
                        .padding(10)
                        .background(Color(.secondarySystemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                        .focused($focusedField, equals: .subject)
                }

                // MARK: Body editor
                VStack(alignment: .leading, spacing: 6) {
                    Label("Jouw e-mail", systemImage: "pencil")
                        .font(.caption.bold())
                        .foregroundStyle(.secondary)

                    TextEditor(text: $emailText)
                        .font(.body)
                        .frame(minHeight: 240)
                        .padding(8)
                        .background(Color(.secondarySystemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                        .focused($focusedField, equals: .body)
                        .overlay(
                            // Placeholder
                            Group {
                                if emailText.isEmpty {
                                    Text("Begin hier met schrijven…")
                                        .foregroundStyle(.tertiaryLabel)
                                        .padding(14)
                                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                                        .allowsHitTesting(false)
                                }
                            }
                        )

                    HStack {
                        Text("\(wordCount) woorden")
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                        Spacer()
                        if showCopiedHint {
                            Text("Gekopieerd!")
                                .font(.caption2)
                                .foregroundStyle(.green)
                                .transition(.opacity)
                        }
                        Button {
                            UIPasteboard.general.string = emailText
                            withAnimation { showCopiedHint = true }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                                withAnimation { showCopiedHint = false }
                            }
                        } label: {
                            Label("Kopieer", systemImage: "doc.on.doc")
                                .font(.caption)
                        }
                        .disabled(emailText.isEmpty)

                        Button(role: .destructive) {
                            showClearConfirm = true
                        } label: {
                            Label("Wissen", systemImage: "trash")
                                .font(.caption)
                        }
                        .disabled(emailText.isEmpty)
                    }
                }

                // MARK: Example answer toggle
                VStack(alignment: .leading, spacing: 10) {
                    Button {
                        withAnimation(.spring(duration: 0.3)) {
                            showExampleAnswer.toggle()
                        }
                    } label: {
                        HStack {
                            Label(
                                showExampleAnswer ? "Verberg voorbeeldantwoord" : "Bekijk voorbeeldantwoord",
                                systemImage: showExampleAnswer ? "eye.slash" : "eye"
                            )
                            .font(.subheadline.bold())
                            Spacer()
                            Image(systemName: "chevron.down")
                                .rotationEffect(.degrees(showExampleAnswer ? 180 : 0))
                                .font(.caption)
                        }
                        .padding()
                        .background(Color(.secondarySystemBackground))
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                    }
                    .foregroundStyle(.primary)

                    if showExampleAnswer {
                        ExampleAnswerCard(text: scenario.exampleAnswer)
                            .transition(.opacity.combined(with: .move(edge: .top)))
                    }
                }

                Spacer().frame(height: 32)
            }
            .padding()
        }
        .navigationTitle(scenario.dutchTitle)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showVocabulary) {
            VocabularyHelpView(vocabulary: scenario.vocabulary)
        }
        .sheet(isPresented: $showStarters) {
            SentenceStartersView(starters: scenario.sentenceStarters)
        }
        .confirmationDialog(
            "Weet je zeker dat je de e-mail wilt wissen?",
            isPresented: $showClearConfirm,
            titleVisibility: .visible
        ) {
            Button("Wissen", role: .destructive) {
                emailText = ""
                subjectText = ""
            }
        }
        .toolbar {
            ToolbarItemGroup(placement: .keyboard) {
                Spacer()
                Button("Klaar") { focusedField = nil }
            }
        }
    }
}

// MARK: - Instructions card

private struct InstructionsCard: View {
    let scenario: EmailScenario
    @Binding var isExpanded: Bool

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Button {
                withAnimation(.spring(duration: 0.3)) {
                    isExpanded.toggle()
                }
            } label: {
                HStack {
                    Label("Opdracht", systemImage: "doc.text")
                        .font(.headline)
                    Spacer()
                    Image(systemName: "chevron.down")
                        .rotationEffect(.degrees(isExpanded ? 180 : 0))
                        .font(.caption)
                }
                .foregroundStyle(.primary)
            }

            if isExpanded {
                Text(scenario.dutchInstructions)
                    .font(.subheadline)
                    .foregroundStyle(.primary)
                    .lineSpacing(4)
                    .transition(.opacity.combined(with: .move(edge: .top)))

                HStack(spacing: 4) {
                    Image(systemName: "envelope.badge")
                        .font(.caption2)
                    Text("Suggestie onderwerp: \(scenario.suggestedSubject)")
                        .font(.caption)
                        .italic()
                }
                .foregroundStyle(.secondary)
                .transition(.opacity)
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 14)
                .fill(scenario.level.fallbackColor.opacity(0.08))
                .overlay(
                    RoundedRectangle(cornerRadius: 14)
                        .stroke(scenario.level.fallbackColor.opacity(0.3), lineWidth: 1)
                )
        )
    }
}

// MARK: - Help button row

private struct HelpButtonRow: View {
    let scenario: EmailScenario
    @Binding var showVocabulary: Bool
    @Binding var showStarters: Bool

    var body: some View {
        HStack(spacing: 10) {
            HelpButton(
                title: "Woordenlijst",
                subtitle: "\(scenario.vocabulary.count) woorden",
                icon: "character.book.closed",
                color: scenario.level.fallbackColor
            ) {
                showVocabulary = true
            }

            HelpButton(
                title: "Zinshulp",
                subtitle: "\(scenario.sentenceStarters.count) zinnen",
                icon: "text.quote",
                color: scenario.level.fallbackColor
            ) {
                showStarters = true
            }
        }
    }
}

private struct HelpButton: View {
    let title: String
    let subtitle: String
    let icon: String
    let color: Color
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 10) {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundStyle(color)
                    .frame(width: 30)
                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.subheadline.bold())
                        .foregroundStyle(.primary)
                    Text(subtitle)
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
                Spacer()
            }
            .padding(12)
            .frame(maxWidth: .infinity)
            .background(Color(.secondarySystemBackground))
            .clipShape(RoundedRectangle(cornerRadius: 12))
        }
        .buttonStyle(.plain)
    }
}

// MARK: - Template card

private struct TemplateCard: View {
    let template: String
    let onUse: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Label("Sjabloon", systemImage: "doc.on.clipboard")
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
                Spacer()
                Button("Gebruik sjabloon", action: onUse)
                    .font(.caption.bold())
                    .foregroundStyle(.blue)
            }

            Text(template)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineSpacing(4)
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .padding(12)
        .background(Color(.secondarySystemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 14))
    }
}

// MARK: - Example answer card

private struct ExampleAnswerCard: View {
    let text: String
    @State private var copied = false

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Label("Voorbeeldantwoord", systemImage: "checkmark.seal.fill")
                    .font(.caption.bold())
                    .foregroundStyle(.green)
                Spacer()
                Button {
                    UIPasteboard.general.string = text
                    copied = true
                    DispatchQueue.main.asyncAfter(deadline: .now() + 2) { copied = false }
                } label: {
                    Image(systemName: copied ? "checkmark" : "doc.on.doc")
                        .font(.caption)
                }
                .foregroundStyle(.secondary)
            }

            Text(text)
                .font(.callout)
                .lineSpacing(5)
                .padding(10)
                .frame(maxWidth: .infinity, alignment: .leading)
                .background(Color(.systemBackground))
                .clipShape(RoundedRectangle(cornerRadius: 8))
        }
        .padding(12)
        .background(Color.green.opacity(0.06))
        .clipShape(RoundedRectangle(cornerRadius: 14))
        .overlay(
            RoundedRectangle(cornerRadius: 14)
                .stroke(Color.green.opacity(0.2), lineWidth: 1)
        )
    }
}

#Preview {
    NavigationStack {
        EmailEditorView(scenario: AppContent.vmboBasisKaderScenarios[0])
    }
}
