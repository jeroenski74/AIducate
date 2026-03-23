import SwiftUI

struct VocabularyHelpView: View {
    let vocabulary: [VocabularyItem]
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List(vocabulary) { item in
                VStack(alignment: .leading, spacing: 6) {
                    HStack {
                        Text(item.dutch)
                            .font(.subheadline.bold())
                            .foregroundStyle(.primary)
                        Spacer()
                        Text(item.english)
                            .font(.subheadline)
                            .foregroundStyle(.blue)
                    }
                    if let example = item.example {
                        Text("✏️ \(example)")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
                .padding(.vertical, 4)
            }
            .navigationTitle("Woordenlijst")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Klaar") { dismiss() }
                }
            }
        }
    }
}

#Preview {
    VocabularyHelpView(vocabulary: AppContent.vmboBasisKaderScenarios[0].vocabulary)
}
