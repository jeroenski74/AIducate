# AIducate
Use AI to let everybody learn everything

---

## EmailEnglish – Leer e-mails schrijven in het Engels 📧

Een iPhone-app (SwiftUI, iOS 16+) voor Nederlandse leerlingen die willen leren om e-mails te schrijven in het Engels.

### Functies

| Functie | Beschrijving |
|---|---|
| **Niveaus** | VMBO Basis/Kader · VMBO GT · HAVO · VWO |
| **Opdrachten** | 3 realistische e-mailscenario's per niveau (12 in totaal) |
| **Woordenlijst** | Nederlandstalige uitleg met Engelse vertalingen en voorbeeldzinnen |
| **Zinshulp** | Kant-en-klare zinsstarters die je kunt kopiëren |
| **Sjabloon** | Ingevuld sjabloon voor VMBO Basis/Kader en VMBO GT |
| **Voorbeeldantwoord** | Model-e-mail die je kunt vergelijken met je eigen tekst |
| **Kopieerknop** | Kopieer je e-mail met één tik |

### Niveaus en inhoud

#### 🌱 VMBO Basis/Kader
- Je bent ziek (brief aan leraar)
- Verjaardag feestje (uitnodiging aan vriend)
- Online bestelling (verkeerde maat ontvangen)

#### 📚 VMBO GT
- Hotelkamer reserveren (Londen)
- Product klacht (defecte koptelefoon)
- Stageplek vragen (dierenartspraktijk)

#### 🎯 HAVO
- Sollicitatie bijbaantje (kassamedewerker)
- Formele klacht aan gemeente (speelplein)
- Informatievraag universiteit (Bristol)

#### 🏆 VWO
- Zakelijke samenwerking voorstellen (uitwisseling scholen)
- Motivatiebrief universiteit (King's College)
- Ethische kwestie aankaarten (AI-surveillance)

### Aan de slag

1. Open `EmailEnglish/EmailEnglish.xcodeproj` in Xcode 15+
2. Kies een iPhone simulator (iOS 16+)
3. Druk op **Run** (⌘R)

> **Vereisten:** Xcode 15 · Swift 5.9 · iOS 16.0+

### Projectstructuur

```
EmailEnglish/
├── EmailEnglish.xcodeproj/
└── EmailEnglish/
    ├── EmailEnglishApp.swift      # App entry point
    ├── Models/
    │   ├── Level.swift            # Enum voor niveaus
    │   └── EmailScenario.swift    # Datamodel scenario's
    ├── Views/
    │   ├── HomeView.swift         # Welkomstscherm
    │   ├── LevelSelectionView.swift
    │   ├── ScenarioListView.swift
    │   ├── EmailEditorView.swift  # Schrijfscherm + hulp
    │   ├── VocabularyHelpView.swift
    │   └── SentenceStartersView.swift
    ├── Data/
    │   └── AppContent.swift       # Alle scenario's en woordenlijsten
    └── Assets.xcassets/
```
