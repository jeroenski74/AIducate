import SwiftUI

struct ScenarioListView: View {
    let level: Level

    private var scenarios: [EmailScenario] {
        AppContent.scenarios.filter { $0.level == level }
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 14) {
                // Level header
                HStack(spacing: 12) {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(level.fallbackColor.opacity(0.15))
                        .frame(width: 48, height: 48)
                        .overlay {
                            Image(systemName: "envelope")
                                .foregroundStyle(level.fallbackColor)
                        }

                    VStack(alignment: .leading, spacing: 2) {
                        Text(level.rawValue)
                            .font(.headline)
                        Text(level.subtitle)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
                }
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 16)
                        .fill(Color(.secondarySystemBackground))
                )
                .padding(.horizontal)
                .padding(.top, 8)

                Text("Kies een opdracht")
                    .font(.subheadline.bold())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .foregroundStyle(.secondary)

                ForEach(scenarios) { scenario in
                    NavigationLink {
                        EmailEditorView(scenario: scenario)
                    } label: {
                        ScenarioCard(scenario: scenario)
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal)
                }

                Spacer().frame(height: 24)
            }
        }
        .navigationTitle(level.rawValue)
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Scenario card

private struct ScenarioCard: View {
    let scenario: EmailScenario

    var body: some View {
        HStack(spacing: 14) {
            RoundedRectangle(cornerRadius: 10)
                .fill(scenario.level.fallbackColor.opacity(0.15))
                .frame(width: 48, height: 48)
                .overlay {
                    Image(systemName: scenario.iconName)
                        .foregroundStyle(scenario.level.fallbackColor)
                }

            VStack(alignment: .leading, spacing: 4) {
                Text(scenario.dutchTitle)
                    .font(.headline)
                    .foregroundStyle(.primary)
                Text(scenario.dutchInstructions
                    .components(separatedBy: "\n")
                    .first?
                    .trimmingCharacters(in: .whitespaces) ?? "")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }

            Spacer()

            Image(systemName: "chevron.right")
                .font(.caption.bold())
                .foregroundStyle(.secondary)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(Color(.secondarySystemBackground))
        )
    }
}

#Preview {
    NavigationStack {
        ScenarioListView(level: .vmboBasisKader)
    }
}
