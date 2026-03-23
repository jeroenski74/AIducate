import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationStack {
            ZStack {
                // Background gradient
                LinearGradient(
                    colors: [Color(.systemBlue).opacity(0.15), Color(.systemBackground)],
                    startPoint: .top,
                    endPoint: .bottom
                )
                .ignoresSafeArea()

                VStack(spacing: 32) {
                    Spacer()

                    // Logo / header
                    VStack(spacing: 12) {
                        Image(systemName: "envelope.open.fill")
                            .font(.system(size: 72))
                            .foregroundStyle(.blue)
                            .symbolEffect(.bounce, options: .repeating.speed(0.3))

                        Text("Email in het Engels")
                            .font(.largeTitle.bold())
                            .multilineTextAlignment(.center)

                        Text("Leer e-mails schrijven in het Engels")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.horizontal)

                    // Feature highlights
                    VStack(spacing: 12) {
                        FeatureRow(icon: "list.bullet.clipboard",
                                   text: "Echte situaties om te oefenen")
                        FeatureRow(icon: "text.book.closed",
                                   text: "Woordenschat en zinshulp per niveau")
                        FeatureRow(icon: "checkmark.seal",
                                   text: "Voorbeeldantwoord bekijken")
                    }
                    .padding(.horizontal, 32)

                    Spacer()

                    // Start button
                    NavigationLink {
                        LevelSelectionView()
                    } label: {
                        Text("Kies je niveau")
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(.blue)
                            .foregroundStyle(.white)
                            .clipShape(RoundedRectangle(cornerRadius: 16))
                    }
                    .padding(.horizontal, 24)

                    Text("🇳🇱 Instructies in het Nederlands")
                        .font(.caption)
                        .foregroundStyle(.secondary)

                    Spacer().frame(height: 16)
                }
            }
            .navigationBarHidden(true)
        }
    }
}

// MARK: - Feature row

private struct FeatureRow: View {
    let icon: String
    let text: String

    var body: some View {
        HStack(spacing: 14) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(.blue)
                .frame(width: 32)
            Text(text)
                .font(.subheadline)
            Spacer()
        }
    }
}

#Preview {
    HomeView()
}
