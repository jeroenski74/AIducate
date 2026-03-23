import SwiftUI

/// The Dutch education levels supported by the app.
enum Level: String, CaseIterable, Identifiable, Codable {
    case vmboBasisKader = "VMBO Basis/Kader"
    case vmboGT         = "VMBO GT"
    case havo           = "HAVO"
    case vwo            = "VWO"

    var id: String { rawValue }

    /// Short description shown in level cards.
    var subtitle: String {
        switch self {
        case .vmboBasisKader:
            return "Veel hulp, eenvoudige zinnen"
        case .vmboGT:
            return "Enige hulp, iets langere zinnen"
        case .havo:
            return "Beperkte hulp, gevarieerde zinnen"
        case .vwo:
            return "Minimale hulp, formeel Engels"
        }
    }

    /// Accent colour for each level.
    var fallbackColor: Color {
        switch self {
        case .vmboBasisKader: return .green
        case .vmboGT:         return .blue
        case .havo:           return .orange
        case .vwo:            return .purple
        }
    }

    /// How many vocabulary hints to show by default.
    var defaultVocabCount: Int {
        switch self {
        case .vmboBasisKader: return 12
        case .vmboGT:         return 8
        case .havo:           return 5
        case .vwo:            return 3
        }
    }

    /// Whether to show a partially filled-in email template.
    var showTemplate: Bool {
        switch self {
        case .vmboBasisKader, .vmboGT: return true
        default:                       return false
        }
    }
}
