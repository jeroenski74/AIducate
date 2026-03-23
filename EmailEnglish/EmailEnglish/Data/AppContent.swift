import Foundation

// MARK: - All app content

/// Central store of email-writing scenarios for every level.
struct AppContent {

    static let scenarios: [EmailScenario] = vmboBasisKaderScenarios + vmboGTScenarios + havoScenarios + vwoScenarios

    // MARK: - VMBO Basis / Kader

    static let vmboBasisKaderScenarios: [EmailScenario] = [

        EmailScenario(
            level: .vmboBasisKader,
            dutchTitle: "Je bent ziek",
            dutchInstructions: """
            Je kunt vandaag niet naar school omdat je ziek bent.
            Schrijf een e-mail aan je leraar Engels, meneer/mevrouw Smith.
            Vertel dat je ziek bent en wanneer je hoopt terug te zijn.
            Vraag ook of hij/zij je huiswerk kan sturen.
            """,
            suggestedSubject: "Absent today – feeling ill",
            vocabulary: [
                VocabularyItem(dutch: "ziek", english: "ill / sick", example: "I am ill today."),
                VocabularyItem(dutch: "afwezig", english: "absent", example: "I will be absent."),
                VocabularyItem(dutch: "koorts", english: "fever", example: "I have a fever."),
                VocabularyItem(dutch: "keelpijn", english: "sore throat", example: "I have a sore throat."),
                VocabularyItem(dutch: "morgen", english: "tomorrow", example: "I hope to be back tomorrow."),
                VocabularyItem(dutch: "huiswerk", english: "homework", example: "Can you send me the homework?"),
                VocabularyItem(dutch: "sturen", english: "to send", example: "Please send me..."),
                VocabularyItem(dutch: "hopen", english: "to hope", example: "I hope to be better soon."),
                VocabularyItem(dutch: "beter", english: "better", example: "I feel better."),
                VocabularyItem(dutch: "spoedig", english: "soon", example: "I will be back soon."),
                VocabularyItem(dutch: "sorry", english: "I am sorry", example: "I am sorry for any inconvenience."),
                VocabularyItem(dutch: "met vriendelijke groet", english: "Kind regards", example: nil),
            ],
            sentenceStarters: [
                "Dear Mr / Ms Smith,",
                "I am writing to let you know that...",
                "I am ill today because...",
                "I hope to be back at school...",
                "Could you please send me...",
                "I am sorry for...",
                "Kind regards,",
            ],
            emailTemplate: """
            Dear ________,

            I am writing to let you know that I ________ today.
            I have a ________ and I do not feel well.

            I hope to be back at school ________.
            Could you please send me the ________ for today?

            I am sorry for any ________.

            Kind regards,
            ________
            """,
            exampleAnswer: """
            Dear Mr Smith,

            I am writing to let you know that I am ill today.
            I have a fever and a sore throat and I do not feel well.

            I hope to be back at school tomorrow.
            Could you please send me the homework for today?

            I am sorry for any inconvenience.

            Kind regards,
            [Your name]
            """,
            iconName: "thermometer"
        ),

        EmailScenario(
            level: .vmboBasisKader,
            dutchTitle: "Verjaardag feestje",
            dutchInstructions: """
            Je hebt volgende week je verjaardag en je wilt een feestje organiseren.
            Schrijf een e-mail aan je vriend(in) Sam om hem/haar uit te nodigen.
            Vertel waar en wanneer het feestje is en wat hij/zij mee moet nemen.
            """,
            suggestedSubject: "You're invited to my birthday party!",
            vocabulary: [
                VocabularyItem(dutch: "verjaardag", english: "birthday", example: "It is my birthday next week."),
                VocabularyItem(dutch: "uitnodigen", english: "to invite", example: "I want to invite you."),
                VocabularyItem(dutch: "feestje", english: "party", example: "I am having a party."),
                VocabularyItem(dutch: "adres", english: "address", example: "The address is..."),
                VocabularyItem(dutch: "tijd", english: "time", example: "The party starts at..."),
                VocabularyItem(dutch: "meenemen", english: "to bring", example: "Please bring..."),
                VocabularyItem(dutch: "leuk", english: "fun / nice", example: "It will be fun!"),
                VocabularyItem(dutch: "antwoorden", english: "to reply", example: "Please reply by..."),
                VocabularyItem(dutch: "aanwezig", english: "present / attending", example: "Are you able to attend?"),
                VocabularyItem(dutch: "hopelijk", english: "hopefully", example: "Hopefully you can come!"),
                VocabularyItem(dutch: "cadeau", english: "gift / present", example: nil),
                VocabularyItem(dutch: "vriendelijk groeten", english: "Best wishes", example: nil),
            ],
            sentenceStarters: [
                "Hi Sam,",
                "I am having a birthday party on...",
                "The party will be at...",
                "It starts at... and ends at...",
                "Please bring...",
                "I hope you can come!",
                "Please let me know if...",
                "See you there!",
            ],
            emailTemplate: """
            Hi ________,

            I am having a ________ party on ________ at ________.
            The ________ is at [your address].

            The party starts at ________ and ends at ________.
            Please bring ________.

            I hope you can ________!
            Please let me know if you can ________.

            See you there!
            ________
            """,
            exampleAnswer: """
            Hi Sam,

            I am having a birthday party on Saturday at my house.
            The address is [your address].

            The party starts at 3 pm and ends at 7 pm.
            Please bring something to drink.

            I hope you can come!
            Please let me know if you can attend.

            See you there!
            [Your name]
            """,
            iconName: "birthday.cake"
        ),

        EmailScenario(
            level: .vmboBasisKader,
            dutchTitle: "Online bestelling",
            dutchInstructions: """
            Je hebt online een T-shirt besteld, maar de verkeerde maat gekregen.
            Je hebt maat M besteld maar maat S ontvangen.
            Schrijf een e-mail aan de webshop (ShopOnline) om dit te melden.
            Vraag om de juiste maat of je geld terug.
            """,
            suggestedSubject: "Wrong size received – order #12345",
            vocabulary: [
                VocabularyItem(dutch: "bestelling", english: "order", example: "My order number is..."),
                VocabularyItem(dutch: "verkeerde maat", english: "wrong size", example: "I received the wrong size."),
                VocabularyItem(dutch: "ontvangen", english: "to receive", example: "I received..."),
                VocabularyItem(dutch: "ruilen", english: "to exchange", example: "I would like to exchange it."),
                VocabularyItem(dutch: "terugsturen", english: "to return", example: "I will return the item."),
                VocabularyItem(dutch: "geld terug", english: "refund", example: "I would like a refund."),
                VocabularyItem(dutch: "klant", english: "customer", example: "I am a customer."),
                VocabularyItem(dutch: "zo snel mogelijk", english: "as soon as possible", example: nil),
                VocabularyItem(dutch: "helaas", english: "unfortunately", example: "Unfortunately, I..."),
                VocabularyItem(dutch: "dringend", english: "urgent", example: nil),
                VocabularyItem(dutch: "bestelnummer", english: "order number", example: nil),
                VocabularyItem(dutch: "met vriendelijke groet", english: "Kind regards", example: nil),
            ],
            sentenceStarters: [
                "Dear Customer Service,",
                "I am writing about my order number...",
                "Unfortunately, I received the wrong...",
                "I ordered size... but I received size...",
                "I would like to...",
                "Could you please...",
                "I hope to hear from you soon.",
                "Kind regards,",
            ],
            emailTemplate: """
            Dear Customer Service,

            I am writing about my ________ number ________.
            Unfortunately, I received the ________ size.

            I ordered size ________ but I received size ________.
            I would like to ________ for the correct size.

            Could you please let me know how I can ________ the item?

            I hope to hear from you ________.

            Kind regards,
            ________
            """,
            exampleAnswer: """
            Dear Customer Service,

            I am writing about my order number 12345.
            Unfortunately, I received the wrong size.

            I ordered size M but I received size S.
            I would like to exchange it for the correct size.

            Could you please let me know how I can return the item?

            I hope to hear from you soon.

            Kind regards,
            [Your name]
            """,
            iconName: "shippingbox"
        ),
    ]

    // MARK: - VMBO GT

    static let vmboGTScenarios: [EmailScenario] = [

        EmailScenario(
            level: .vmboGT,
            dutchTitle: "Hotelkamer reserveren",
            dutchInstructions: """
            Je gaat met je familie op vakantie naar Londen.
            Schrijf een e-mail aan Hotel Victoria om een kamer te reserveren.
            Vermeld: de data (3–7 augustus), het aantal personen (2 volwassenen, 1 kind),
            je wensen (ontbijt inbegrepen) en vraag naar de prijs.
            """,
            suggestedSubject: "Room reservation – 3 to 7 August",
            vocabulary: [
                VocabularyItem(dutch: "reserveren", english: "to book / to reserve", example: "I would like to book a room."),
                VocabularyItem(dutch: "kamer", english: "room", example: "a double room"),
                VocabularyItem(dutch: "check-in / check-out", english: "check-in / check-out", example: nil),
                VocabularyItem(dutch: "ontbijt inbegrepen", english: "breakfast included", example: nil),
                VocabularyItem(dutch: "prijs per nacht", english: "price per night", example: nil),
                VocabularyItem(dutch: "beschikbaar", english: "available", example: "Is the room available?"),
                VocabularyItem(dutch: "bevestigen", english: "to confirm", example: "Please confirm my booking."),
                VocabularyItem(dutch: "parkeerplaats", english: "parking", example: nil),
                VocabularyItem(dutch: "annuleren", english: "to cancel", example: nil),
            ],
            sentenceStarters: [
                "Dear Sir/Madam,",
                "I am writing to enquire about / to book...",
                "We would like to reserve a room for...",
                "Our check-in date is... and check-out is...",
                "Could you please let me know the price per night?",
                "We would prefer breakfast to be included.",
                "I look forward to your reply.",
                "Yours faithfully,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Sir/Madam,

            I am writing to enquire about a room reservation at your hotel.
            We would like to reserve a double room and a single room for 4 nights,
            from 3 August to 7 August.

            Our group consists of 2 adults and 1 child.
            We would prefer breakfast to be included in the price.

            Could you please let me know the price per night and whether the rooms are available?
            We would also like to know if parking is available.

            I look forward to your reply.

            Yours faithfully,
            [Your name]
            """,
            iconName: "bed.double"
        ),

        EmailScenario(
            level: .vmboGT,
            dutchTitle: "Product klacht",
            dutchInstructions: """
            Je hebt drie weken geleden een koptelefoon gekocht bij TechShop.
            Na twee weken werkte het linker oortje niet meer.
            Schrijf een formele klacht-e-mail. Beschrijf het probleem,
            vermeld de aankoopgegevens en vraag om reparatie of vervanging.
            """,
            suggestedSubject: "Complaint: defective headphones – receipt #98765",
            vocabulary: [
                VocabularyItem(dutch: "klacht", english: "complaint", example: "I am writing to make a complaint."),
                VocabularyItem(dutch: "defect", english: "defective / faulty", example: "The product is defective."),
                VocabularyItem(dutch: "aankoopbewijs", english: "receipt / proof of purchase", example: nil),
                VocabularyItem(dutch: "garantie", english: "warranty", example: "Is this covered by warranty?"),
                VocabularyItem(dutch: "reparatie", english: "repair", example: "I would like it repaired."),
                VocabularyItem(dutch: "vervanging", english: "replacement", example: "I would like a replacement."),
                VocabularyItem(dutch: "teleurgesteld", english: "disappointed", example: "I am very disappointed."),
                VocabularyItem(dutch: "verwachten", english: "to expect", example: "I expected better quality."),
            ],
            sentenceStarters: [
                "Dear Customer Service,",
                "I am writing to complain about...",
                "I purchased a... on... at your store.",
                "Unfortunately, after only... the product...",
                "I am very disappointed with...",
                "I would like you to...",
                "I expect a response within...",
                "Yours sincerely,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Customer Service,

            I am writing to complain about a pair of headphones that I purchased at your store
            three weeks ago. My receipt number is 98765.

            Unfortunately, after only two weeks, the left earphone stopped working completely.
            I am very disappointed with the quality of this product, as I expected it to last
            much longer.

            I would like you to either repair the headphones or provide a replacement.
            I also expect this to be covered under the warranty.

            I look forward to your response within the next five working days.

            Yours sincerely,
            [Your name]
            """,
            iconName: "headphones"
        ),

        EmailScenario(
            level: .vmboGT,
            dutchTitle: "Stageplek vragen",
            dutchInstructions: """
            Je zoekt een stageplek bij een dierenarts voor twee weken in juli.
            Schrijf een e-mail aan Dierenartspraktijk 'Happy Paws' in Engeland.
            Stel jezelf voor, leg uit waarom je geïnteresseerd bent
            en vraag of er een stageplek beschikbaar is.
            """,
            suggestedSubject: "Internship request – July",
            vocabulary: [
                VocabularyItem(dutch: "stage", english: "internship / work experience", example: nil),
                VocabularyItem(dutch: "dierenarts", english: "vet / veterinarian", example: nil),
                VocabularyItem(dutch: "geïnteresseerd in", english: "interested in", example: "I am very interested in animals."),
                VocabularyItem(dutch: "jezelf voorstellen", english: "to introduce yourself", example: "My name is... and I am..."),
                VocabularyItem(dutch: "beschikbaar", english: "available", example: "I am available in July."),
                VocabularyItem(dutch: "ervaring", english: "experience", example: "I have experience with..."),
                VocabularyItem(dutch: "bereid om", english: "willing to", example: "I am willing to learn."),
                VocabularyItem(dutch: "curriculum vitae", english: "CV / résumé", example: nil),
            ],
            sentenceStarters: [
                "Dear Sir/Madam,",
                "My name is... and I am a ... student at...",
                "I am writing to enquire about a work-experience placement.",
                "I am very interested in animals because...",
                "I am available from... to...",
                "I am willing to...",
                "Please find my CV attached.",
                "I look forward to hearing from you.",
                "Yours faithfully,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Sir/Madam,

            My name is [Your name] and I am a 15-year-old student at [School name] in the Netherlands.
            I am writing to enquire about a work-experience placement at your practice in July.

            I am very interested in animals and I would love to work with a vet.
            I have a dog and two cats at home, and I always help to take care of them.
            I am available from 7 July to 18 July.

            I am hardworking, enthusiastic and willing to learn new things.
            Please find my CV attached to this email.

            I look forward to hearing from you.

            Yours faithfully,
            [Your name]
            """,
            iconName: "pawprint"
        ),
    ]

    // MARK: - HAVO

    static let havoScenarios: [EmailScenario] = [

        EmailScenario(
            level: .havo,
            dutchTitle: "Sollicitatie bijbaantje",
            dutchInstructions: """
            Je hebt een advertentie gezien voor een bijbaantje als kassamedewerker
            bij supermarkt 'Fresh & Go' in Engeland (je bent op uitwisseling).
            Schrijf een formele sollicitatie-e-mail.
            Noem je relevante vaardigheden en motivatie.
            Voeg een verwijzing naar je CV toe.
            """,
            suggestedSubject: "Application for Part-time Cashier Position",
            vocabulary: [
                VocabularyItem(dutch: "sollicitatie", english: "application", example: nil),
                VocabularyItem(dutch: "vacature", english: "vacancy / job advertisement", example: nil),
                VocabularyItem(dutch: "ervaren", english: "experienced", example: nil),
                VocabularyItem(dutch: "betrouwbaar", english: "reliable", example: nil),
                VocabularyItem(dutch: "klantgericht", english: "customer-oriented", example: nil),
                VocabularyItem(dutch: "flexibel", english: "flexible", example: nil),
                VocabularyItem(dutch: "beschikbaar", english: "available", example: nil),
                VocabularyItem(dutch: "motivatie", english: "motivation", example: nil),
            ],
            sentenceStarters: [
                "Dear Hiring Manager,",
                "I am writing to apply for the position of...",
                "I am a... student currently on an exchange programme.",
                "I believe I am a suitable candidate because...",
                "I have experience in...",
                "I am available... hours per week.",
                "Please find my CV attached.",
                "I would welcome the opportunity to discuss my application.",
                "Yours sincerely,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Hiring Manager,

            I am writing to apply for the part-time cashier position advertised on your website.
            I am a 17-year-old student currently on an exchange programme at St. Mary's School.

            I believe I am a suitable candidate for this role. I am reliable, punctual and
            customer-oriented. Although I do not have formal cashier experience, I have worked
            as a volunteer at a local charity shop in the Netherlands, where I handled transactions
            and assisted customers on a regular basis.

            I am available to work 12 hours per week, including weekends.
            Please find my CV attached to this email.

            I would welcome the opportunity to discuss my application further at your convenience.

            Yours sincerely,
            [Your name]
            """,
            iconName: "briefcase"
        ),

        EmailScenario(
            level: .havo,
            dutchTitle: "Formele klacht aan gemeente",
            dutchInstructions: """
            In je woonplaats is een populair speelplein gesloten vanwege 'bezuinigingen'.
            Schrijf een formele klacht-e-mail aan de wethouder (Councillor Johnson)
            van de gemeente. Leg het probleem uit, beschrijf de impact op de buurt
            en doe een voorstel voor een oplossing.
            """,
            suggestedSubject: "Formal Complaint: Closure of Riverside Playground",
            vocabulary: [
                VocabularyItem(dutch: "bezuinigingen", english: "budget cuts", example: nil),
                VocabularyItem(dutch: "wethouder", english: "councillor", example: nil),
                VocabularyItem(dutch: "gemeente", english: "municipality / local council", example: nil),
                VocabularyItem(dutch: "bezorgd", english: "concerned", example: nil),
                VocabularyItem(dutch: "impact", english: "impact", example: nil),
                VocabularyItem(dutch: "bewoners", english: "residents", example: nil),
                VocabularyItem(dutch: "oplossing voorstellen", english: "to propose a solution", example: nil),
            ],
            sentenceStarters: [
                "Dear Councillor Johnson,",
                "I am writing on behalf of the residents of...",
                "We are deeply concerned about...",
                "The closure of... has had a significant impact on...",
                "We strongly believe that...",
                "We therefore propose that...",
                "We urge you to reconsider...",
                "We look forward to a prompt response.",
                "Yours faithfully,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Councillor Johnson,

            I am writing on behalf of the residents of Riverside Street regarding the recent
            closure of the Riverside Playground due to budget cuts.

            We are deeply concerned about this decision. The playground has been an important
            gathering place for children and families in our neighbourhood for over twenty years.
            Since its closure, children have nowhere safe to play outdoors, which has had a
            significant negative impact on the well-being of local families.

            We strongly believe that this decision was made without adequately considering
            the social value of the playground. We therefore propose that the council explores
            alternative funding options, such as local sponsorship or community fundraising,
            to reopen and maintain the facility.

            We urge you to reconsider this decision and to meet with local residents to discuss
            possible solutions. We look forward to a prompt response.

            Yours faithfully,
            [Your name]
            On behalf of the Riverside Street Residents
            """,
            iconName: "person.3"
        ),

        EmailScenario(
            level: .havo,
            dutchTitle: "Informatievraag universiteit",
            dutchInstructions: """
            Je overweegt om na je eindexamen een jaar in Engeland te studeren.
            Schrijf een e-mail aan de admissions office van University of Bristol
            om informatie op te vragen over het toelatingsproces, de beschikbare
            studieprogramma's en de mogelijkheden voor beurzen.
            """,
            suggestedSubject: "Enquiry: Undergraduate Admissions and Scholarships",
            vocabulary: [
                VocabularyItem(dutch: "toelating", english: "admission", example: nil),
                VocabularyItem(dutch: "beurs", english: "scholarship / grant", example: nil),
                VocabularyItem(dutch: "studiegids", english: "prospectus / course guide", example: nil),
                VocabularyItem(dutch: "inschrijven", english: "to enrol / to apply", example: nil),
                VocabularyItem(dutch: "vereisten", english: "requirements", example: nil),
                VocabularyItem(dutch: "deadline", english: "deadline / closing date", example: nil),
            ],
            sentenceStarters: [
                "Dear Admissions Officer,",
                "I am a Dutch student currently in my final year of secondary school.",
                "I am writing to request information about...",
                "I would be grateful if you could send me details regarding...",
                "I am particularly interested in...",
                "Could you also inform me about any available scholarships?",
                "I look forward to receiving your reply.",
                "Yours faithfully,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Admissions Officer,

            I am a Dutch student currently in my final year of secondary school (HAVO).
            I am writing to request information about the undergraduate admissions process at
            the University of Bristol.

            I am particularly interested in studying Psychology or Sociology, and I would be
            grateful if you could send me details regarding the available programmes, entry
            requirements for international students and application deadlines.

            Could you also inform me about any scholarships or financial support that may be
            available to international students from the Netherlands?

            I look forward to receiving your reply and would be happy to provide any additional
            information required.

            Yours faithfully,
            [Your name]
            """,
            iconName: "graduationcap"
        ),
    ]

    // MARK: - VWO

    static let vwoScenarios: [EmailScenario] = [

        EmailScenario(
            level: .vwo,
            dutchTitle: "Zakelijke samenwerking voorstellen",
            dutchInstructions: """
            Jouw school wil een uitwisselingsprogramma opzetten met een school in het VK.
            Jij bent aangesteld als leerlingambassadeur.
            Schrijf een professionele e-mail aan de head teacher van
            Westbridge Academy (Ms. Harper) om het voorstel te introduceren.
            Verwerk: doelstellingen, voordelen voor beide scholen,
            en een verzoek voor een kennismakingsgesprek.
            """,
            suggestedSubject: "Proposal: Student Exchange Partnership – De Vries College & Westbridge Academy",
            vocabulary: [
                VocabularyItem(dutch: "partnerschap", english: "partnership", example: nil),
                VocabularyItem(dutch: "uitwisseling", english: "exchange programme", example: nil),
                VocabularyItem(dutch: "doelstellingen", english: "objectives", example: nil),
                VocabularyItem(dutch: "wederzijds voordeel", english: "mutual benefit", example: nil),
                VocabularyItem(dutch: "integratie", english: "integration", example: nil),
                VocabularyItem(dutch: "intercultureel begrip", english: "intercultural understanding", example: nil),
            ],
            sentenceStarters: [
                "Dear Ms. Harper,",
                "I am writing on behalf of... to propose...",
                "Our school has a strong tradition of...",
                "We believe this partnership would offer significant benefits to both institutions.",
                "The key objectives of this programme are...",
                "We would be delighted to arrange an introductory meeting at your earliest convenience.",
                "Please do not hesitate to contact me should you require further information.",
                "Yours sincerely,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Ms. Harper,

            I am writing on behalf of De Vries College in the Netherlands to propose an exciting
            student exchange partnership between our two schools.

            De Vries College has a strong tradition of international collaboration and we believe
            that a partnership with Westbridge Academy would offer significant educational and
            cultural benefits to students on both sides.

            The key objectives of this programme would be to foster intercultural understanding,
            improve language skills and create lasting connections between young people in our
            two countries. We envision a two-week exchange for students aged 15–17, with host
            family accommodation and a structured school programme.

            We would be delighted to arrange an introductory video call at your earliest
            convenience to discuss the proposal in greater detail. Please do not hesitate
            to contact me should you require any further information.

            I look forward to the possibility of working together.

            Yours sincerely,
            [Your name]
            Student Ambassador, De Vries College
            """,
            iconName: "globe.europe.africa"
        ),

        EmailScenario(
            level: .vwo,
            dutchTitle: "Motivatiebrief universiteit",
            dutchInstructions: """
            Je solliciteert naar een plek op het internationale programma
            'Global Leadership' aan King's College London.
            Schrijf een overtuigende motivatiebrief per e-mail.
            Beschrijf je academische prestaties, leiderschapservaring,
            motivatie voor het programma en toekomstplannen.
            """,
            suggestedSubject: "Application: Global Leadership Programme – [Your Name]",
            vocabulary: [
                VocabularyItem(dutch: "leiderschapservaring", english: "leadership experience", example: nil),
                VocabularyItem(dutch: "academische prestaties", english: "academic achievements", example: nil),
                VocabularyItem(dutch: "ambitieus", english: "ambitious", example: nil),
                VocabularyItem(dutch: "bijdragen aan", english: "to contribute to", example: nil),
                VocabularyItem(dutch: "toekomstplannen", english: "future aspirations", example: nil),
                VocabularyItem(dutch: "overtuigend", english: "compelling", example: nil),
            ],
            sentenceStarters: [
                "Dear Admissions Committee,",
                "I am writing to express my strong interest in...",
                "Throughout my academic career, I have...",
                "My passion for... was ignited when...",
                "As captain/president of..., I developed...",
                "I am particularly drawn to this programme because...",
                "My future aspiration is to...",
                "I would be honoured to be considered for a place on this programme.",
                "Yours sincerely,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Admissions Committee,

            I am writing to express my strong interest in the Global Leadership Programme
            at King's College London. Having followed the programme's impact closely, I am
            convinced that it perfectly aligns with my academic ambitions and personal values.

            Throughout my secondary education at [School name], I have consistently achieved
            top grades, particularly in English, History and Economics. Beyond academics, I
            have served as student council president for two consecutive years, an experience
            that has honed my ability to lead diverse teams, mediate conflict and drive
            meaningful change within an institution.

            My passion for global issues was ignited during a Model United Nations conference
            last year, where I represented the Netherlands on a panel addressing climate
            justice. That experience solidified my conviction that young people must be
            equipped with the tools to engage constructively with complex global challenges.

            I am particularly drawn to this programme because of its interdisciplinary
            approach and its emphasis on practical leadership. My future aspiration is to
            pursue a career in international policy, and I am confident that this programme
            would provide an invaluable foundation.

            I would be honoured to be considered for a place on the Global Leadership
            Programme. Please find my full CV and academic transcripts attached.

            Yours sincerely,
            [Your name]
            """,
            iconName: "star.circle"
        ),

        EmailScenario(
            level: .vwo,
            dutchTitle: "Ethische kwestie aankaarten",
            dutchInstructions: """
            Je hebt gelezen dat een groot technologiebedrijf (NovaTech) van plan is
            een AI-systeem in te zetten dat werknemers continu monitort.
            Schrijf als vertegenwoordiger van een jongerenorganisatie
            een formele e-mail aan de CEO (Mr. Davies) om bezorgdheid uit te spreken
            over privacy en werknemersrechten, onderbouwd met argumenten.
            """,
            suggestedSubject: "Concerns Regarding AI Employee Surveillance – Open Letter from Youth for Digital Rights",
            vocabulary: [
                VocabularyItem(dutch: "surveillance", english: "surveillance / monitoring", example: nil),
                VocabularyItem(dutch: "privacy", english: "privacy", example: nil),
                VocabularyItem(dutch: "werknemersrechten", english: "employee rights", example: nil),
                VocabularyItem(dutch: "ethisch", english: "ethical", example: nil),
                VocabularyItem(dutch: "verantwoording afleggen", english: "to be accountable", example: nil),
                VocabularyItem(dutch: "transparantie", english: "transparency", example: nil),
            ],
            sentenceStarters: [
                "Dear Mr. Davies,",
                "I am writing on behalf of Youth for Digital Rights to raise serious concerns about...",
                "We firmly believe that continuous employee surveillance is ethically problematic because...",
                "Research suggests that...",
                "We urge NovaTech to...",
                "We call upon you to demonstrate transparency by...",
                "We trust that NovaTech will take these concerns seriously.",
                "Yours faithfully,",
            ],
            emailTemplate: nil,
            exampleAnswer: """
            Dear Mr. Davies,

            I am writing on behalf of Youth for Digital Rights to raise serious concerns
            regarding NovaTech's announced plans to implement continuous AI-based employee
            monitoring.

            While we appreciate that productivity and security are legitimate business concerns,
            we firmly believe that pervasive workplace surveillance is ethically problematic.
            Research consistently shows that constant monitoring erodes trust between employers
            and employees, increases anxiety and ultimately reduces productivity — the very
            outcome it purports to prevent. Furthermore, indiscriminate data collection raises
            profound questions about consent, data ownership and the right to privacy in the
            workplace.

            We urge NovaTech to engage in transparent dialogue with employees and independent
            ethicists before proceeding. We also call upon you to publish a clear data governance
            policy that outlines what is collected, how it is stored and who has access to it.

            As a company with a global reputation and a stated commitment to responsible
            innovation, NovaTech has both the opportunity and the obligation to set a positive
            industry precedent.

            We trust that NovaTech will take these concerns seriously and look forward to
            an open and constructive response.

            Yours faithfully,
            [Your name]
            Representative, Youth for Digital Rights
            """,
            iconName: "lock.shield"
        ),
    ]
}
