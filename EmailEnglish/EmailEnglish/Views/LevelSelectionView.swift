import SwiftUI

struct LevelSelectionView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                Text("Kies je niveau")
                    .font(.title2.bold())
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)
                    .padding(.top, 8)

                Text("Elk niveau heeft eigen opdrachten met bijpassende hulp.")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.horizontal)

                ForEach(Level.allCases) { level in
                    NavigationLink {
                        ScenarioListView(level: level)
                    } label: {
                        LevelCard(level: level)
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal)
                }

                Spacer().frame(height: 24)
            }
        }
        .navigationTitle("Niveaus")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Level card

private struct LevelCard: View {
    let level: Level

    var body: some View {
        HStack(spacing: 16) {
            Circle()
                .fill(level.fallbackColor.opacity(0.15))
                .frame(width: 56, height: 56)
                .overlay {
                    Text(levelEmoji)
                        .font(.title2)
                }

            VStack(alignment: .leading, spacing: 4) {
                Text(level.rawValue)
                    .font(.headline)
                    .foregroundStyle(.primary)
                Text(level.subtitle)
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
                .overlay(
                    RoundedRectangle(cornerRadius: 16)
                        .stroke(level.fallbackColor.opacity(0.4), lineWidth: 1.5)
                )
        )
    }

    private var levelEmoji: String {
        switch level {
        case .vmboBasisKader: return "🌱"
        case .vmboGT:         return "📚"
        case .havo:           return "🎯"
        case .vwo:            return "🏆"
        }
    }
}

#Preview {
    NavigationStack {
        LevelSelectionView()
    }
}
