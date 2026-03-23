import SwiftUI

struct SentenceStartersView: View {
    let starters: [String]
    @Environment(\.dismiss) private var dismiss
    @State private var copiedIndex: Int? = nil

    var body: some View {
        NavigationStack {
            List(Array(starters.enumerated()), id: \.offset) { index, starter in
                Button {
                    UIPasteboard.general.string = starter
                    copiedIndex = index
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
                        if copiedIndex == index { copiedIndex = nil }
                    }
                } label: {
                    HStack {
                        Text(starter)
                            .font(.body)
                            .foregroundStyle(.primary)
                            .lineLimit(3)
                            .multilineTextAlignment(.leading)
                        Spacer()
                        Image(systemName: copiedIndex == index ? "checkmark" : "doc.on.doc")
                            .font(.caption)
                            .foregroundStyle(copiedIndex == index ? .green : .secondary)
                    }
                    .padding(.vertical, 4)
                }
                .buttonStyle(.plain)
            }
            .navigationTitle("Zinshulp")
            .navigationBarTitleDisplayMode(.inline)
            .safeAreaInset(edge: .bottom) {
                Text("Tik een zin om hem te kopiëren")
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .padding()
            }
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Klaar") { dismiss() }
                }
            }
        }
    }
}

#Preview {
    SentenceStartersView(starters: AppContent.vmboBasisKaderScenarios[0].sentenceStarters)
}
