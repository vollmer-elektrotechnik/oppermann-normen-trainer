import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Flame,
  Wind,
  AlertTriangle,
  Zap,
  Search,
  BookOpen,
  HelpCircle,
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  Cpu,
  BookmarkCheck,
  Building2,
  Gauge,
  Target,
  BriefcaseBusiness,
  Stars
} from 'lucide-react';

const STANDARDS_DATA = [
  {
    id: 'en54-7',
    code: 'EN 54-7',
    title: 'Punktförmige Rauchmelder (Streulicht / Durchlicht)',
    category: 'brandschutz',
    categoryName: 'Brandschutz & Rauch',
    badge: 'Kernaussage R&D',
    summary: 'Spezifiziert Prüfverfahren, Leistungsmerkmale und Anforderungen für optische Punktrauchmelder.',
    keyPoints: [
      {
        title: 'Prüfeffekte & Testbrände (TF1 bis TF5)',
        desc: 'Der Sensor muss auf verschiedene Brandarten reagieren: TF2 (Schwelbrand Holz), TF3 (Schwelbrand Baumwolle), TF4 (Polystyrolbrände / starker Ruß), TF5 (Flüssigkeitsbrand n-Heptan).'
      },
      {
        title: 'Ansprechschwelle & Empfindlichkeit',
        desc: 'Signal-/Rauschabstand muss stabil sein. Typischer Messbereich des Extinktionskoeffizienten m = 0.05 bis 0.2 dB/m. Der TIA (Transimpedanzverstärker) muss Temperaturtrift kompensieren.'
      },
      {
        title: 'Verschmutzungskompensation',
        desc: 'Langzeitdrift des Ruhestroms durch Verstaubung muss vom Algorithmus nachgeführt werden, ohne echten Rauch zu ignorieren.'
      },
      {
        title: 'Eigenüberwachung & Störung',
        desc: 'Ausfall der Sender-LED oder Photodiode muss innerhalb von 100s als Störung signalisiert werden.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Wie unterscheidet EN 54-7 zwischen Verschmutzung und langsamem Schwelbrand?',
        a: 'Durch adaptive Ruhewertnachführung (Driftkompensation) mit zeitlicher Auswertung: Eine sehr langsame Anstiegskurve (über Tage/Wochen) führt den Nullpunkt nach. Ein Schwelbrand (Anstieg über Minuten) überschreitet die absolute Schwelle und löst Alarm aus.'
      },
      {
        q: 'Warum ist die optische Messkammer-Geometrie für EN 54-7 kritisch?',
        a: 'Sie muss Fremdlicht perfekt abschirmen (Labyrinth) und gleichzeitig aerodynamisch so geformt sein, dass Rauchpartikel leicht eindringen können. Zudem bestimmt der Streuwinkel (Vorwärts- vs. Rückwärtsstreuung) die Empfindlichkeit auf helle/dunkle Partikel.'
      }
    ]
  },
  {
    id: 'en54-27',
    code: 'EN 54-27',
    title: 'Kanalrauchmelder (Duct Smoke Detectors)',
    category: 'brandschutz',
    categoryName: 'Brandschutz & Rauch',
    badge: 'Oppermann Kern-Kompetenz',
    summary: 'Regelt Anforderungen und Prüfverfahren für Rauchmelder in Lüftungsleitungssystemen (z.B. KRM-X).',
    keyPoints: [
      {
        title: 'Strömungsdynamik & Venturirohr',
        desc: 'Stellt sicher, dass das Entnahmerohr (Sampling Tube) auch bei geringen Luftgeschwindigkeiten (z.B. 1 m/s bis 20 m/s) ausreichend Luftstrom zur Messkammer leitet.'
      },
      {
        title: 'Druckdifferenzüberwachung',
        desc: 'Der Melder muss erkennen, wenn das Entnahmerohr verstopft oder abgerissen ist (Strömungsfehler-Detektion).'
      },
      {
        title: 'Verhältnis zu EN 54-7',
        desc: 'Die im Kanalmelder verbaute Sensorik basiert meist auf EN 54-7, aber die aerodynamische Entnahmeeinheit und das Gesamtverhalten fallen unter EN 54-27.'
      },
      {
        title: 'Kondensat & Verschmutzung im Lüftungskanal',
        desc: 'Hohe Luftströmung transportiert viel Staub. Robustes Labyrinth & Gehäusedesign nach IP54 notwendig.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Was unterscheidet die Zulassung eines KRM-X nach EN 54-27 von einem normalen Deckenmelder nach EN 54-7?',
        a: 'EN 54-27 testet das Gesamtsystem im Lüftungskanal inklusive Strömungsüberwachung, Rohrentnahme und Verhalten bei unterschiedlichen Strömungsgeschwindigkeiten. EN 54-7 prüft nur den optischen Sensorkopf in ruhiger Umgebungsluft.'
      },
      {
        q: 'Wie funktioniert die Strömungsüberwachung in einem Oppermann Kanalrauchmelder?',
        a: 'Typischerweise über einen differentiellen Strömungssensor oder Mikro-Drucksensor im Entnahmerohr, der den dynamischen Druckunterschied misst und bei Luftstillstand oder Rohrverstopfung Störung meldet.'
      }
    ]
  },
  {
    id: 'iso7240-7',
    code: 'ISO 7240-7',
    title: 'Internationaler Standard für Punktrauchmelder',
    category: 'brandschutz',
    categoryName: 'Brandschutz & Rauch',
    badge: 'Global Standard',
    summary: 'Internationale Harmonisierung der Punktrauchmelder-Anforderungen analog zur europäischen EN 54-7.',
    keyPoints: [
      {
        title: 'Globale Kompatibilität',
        desc: 'Sehr ähnlich zu EN 54-7, bildet die Basis für Märkte außerhalb der EU (z.B. Australien, Teile Asiens).'
      },
      {
        title: 'Optische Prüfkriterien',
        desc: 'Exakte Vorgaben zur Optikprüfkammer und Einsatz von IR-LEDs (850–880 nm).'
      }
    ],
    interviewQuestions: [
      {
        q: 'Muss man für den Weltmarkt EN 54-7 oder ISO 7240-7 beachten?',
        a: 'Für die EU gilt zwingend die EN 54-7 (CPR-Bauproduktenverordnung). Für den globalen Export ist die Abstimmung mit ISO 7240-7 essenziell, da die Testaufbauten sehr ähnlich, aber nicht identisch sind.'
      }
    ]
  },
  {
    id: 'en14604',
    code: 'EN 14604',
    title: 'Rauchwarnmelder für Wohnhäuser',
    category: 'brandschutz',
    categoryName: 'Brandschutz & Rauch',
    badge: 'Abgrenzung Gewerbe',
    summary: 'Spezifiziert autarke Heim-Rauchwarnmelder mit integriertem Akustikgeber.',
    keyPoints: [
      {
        title: 'Stand-alone Geräte',
        desc: 'Integrierte Batterie (oft 10 Jahre) und eingebauter Piezo-Summtongeber (≥ 85 dB(A) in 3m).'
      },
      {
        title: 'Abgrenzung zur EN 54',
        desc: 'EN 14604 ist für den Heimbereich. Gewerbliche Gebäude / Lüftungsanlagen fordern zwingend EN 54 (BMA-Anbindung).'
      }
    ],
    interviewQuestions: [
      {
        q: 'Warum darf ein Oppermann KRM-X nicht nach EN 14604 zugelassen werden?',
        a: 'Weil EN 14604 für Heim-Rauchwarnmelder bestimmt ist. Für gewerbliche Brandmeldeanlagen und Gebäudeautomation in Lüftungsanlagen schreibt das Baurecht zertifizierte Melder nach EN 54-27 bzw. EN 54-7 vor.'
      }
    ]
  },
  {
    id: 'mluear',
    code: 'M-LüAR',
    title: 'Muster-Lüftungsanlagen-Richtlinie',
    category: 'lueftung',
    categoryName: 'Lüftung & Baurecht',
    badge: 'Baurecht BaWü / D',
    summary: 'Baurechtliche Vorgabe für Aufstellung, Brandschutz und Rauchschutz in Lüftungsanlagen.',
    keyPoints: [
      {
        title: 'Abschaltung bei Rauchübertragung',
        desc: 'Lüftungsanlagen müssen bei Raucheintritt automatisch abgeschaltet werden oder auf Entrauchung umschalten.'
      },
      {
        title: 'Steuerung von Brandschutzklappen (BSK)',
        desc: 'Kanalrauchmelder wie der KRM-X liefern das Auslösesignal zum Schließen thermischer oder motorischer Brandschutzklappen.'
      },
      {
        title: 'Vermeidung von Rauchweiterleitung',
        desc: 'Verhindert, dass Giftgase über Lüftungsrohre in andere Brandabschnitte geblasen werden.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Welche zentrale Aufgabe hat ein Kanalrauchmelder laut M-LüAR im Brandfall?',
        a: 'Er muss Rauch in den Lüftungsleitungen frühestmöglich erkennen, die Ventilationsventilatoren sofort abschalten und/oder das Schließen der Brandschutzklappen auslösen, um die Rauchausbreitung in Nachbarräume zu stoppen.'
      }
    ]
  },
  {
    id: 'din18232',
    code: 'DIN 18232',
    title: 'Rauch- und Wärmefreihaltung (RWA)',
    category: 'lueftung',
    categoryName: 'Lüftung & Baurecht',
    badge: 'Entrauchung & RWA',
    summary: 'Regelt Bemessung, Einbau und Betrieb von natürlichen & maschinellen Rauch- und Wärmeabzugsanlagen.',
    keyPoints: [
      {
        title: 'Maschinelle Entrauchung (MRA)',
        desc: 'Erfordert temperaturbeständige Ventilatoren und fehlerfreie Übertragung von Alarm- und Auslösesignalen.'
      },
      {
        title: 'Raucharme Schicht',
        desc: 'Ziel ist die Schaffung einer rauchfreien Schicht im unteren Raumbereich zur Personenrettung.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Wie unterscheidet sich die Ansteuerung der Lüftung bei normalem Brandschutz vs. RWA?',
        a: 'Im normalen Brandschutz (M-LüAR) wird die Lüftung meist gestoppt, um Übertragung zu verhindern. Bei RWA (DIN 18232) werden spezielle Entrauchungsventilatoren gezielt angetrieben, um Rauch aktiv ins Freie zu fördern.'
      }
    ]
  },
  {
    id: 'vde0833',
    code: 'DIN VDE 0833-2',
    title: 'Gefahrenmeldeanlagen für Brand, Einbruch und Überfall',
    category: 'lueftung',
    categoryName: 'Lüftung & Baurecht',
    badge: 'VDE Norm',
    summary: 'Festlegungen für das Planen, Errichten, Erweitern und Ändern von Brandmeldeanlagen (BMA).',
    keyPoints: [
      {
        title: 'Projektierungsgrenzen',
        desc: 'Maximal zu überwachende Fläche pro Melder, Einbauabstände zur Decke und zu Lüftungsauslässen.'
      },
      {
        title: 'Leitungsausführung & Ausfallsicherheit',
        desc: 'Kurzschlussisolatoren in Ringsystemen, Ringbus-Protokoll-Integrität.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Warum schreibt DIN VDE 0833-2 Mindestabstände von Deckenmeldern zu Lüftungsauslässen vor?',
        a: 'Weil ein starker Luftstrom aus der Lüftung den Rauch vom Punktrauchmelder wegpusten würde. Dadurch würde der Melder zu spät oder gar nicht ansprechen.'
      }
    ]
  },
  {
    id: 'en50545-1',
    code: 'EN 50545-1',
    title: 'Gaswarngeräte für Tiefgaragen & Parkgaragen',
    category: 'gaswarn',
    categoryName: 'Gaswarn & Sensorik',
    badge: 'Oppermann OPP-SOR',
    summary: 'Regelt Detektion von Kohlenmonoxid (CO), Stickstoffmonoxid (NO) und Stickstoffdioxid (NO2) in Tiefgaragen.',
    keyPoints: [
      {
        title: 'Schwellenwerte & Alarmstufen',
        desc: 'CO-Grenzwerte (z.B. 30 ppm Voralarm, 60 ppm Hauptalarm). Direkte Ansteuerung der Abluftventilatoren.'
      },
      {
        title: 'Elektrochemische Sensoren vs. Halbleiter',
        desc: 'Elektrochemische Sensoren bieten hohe Selektivität und Nullpunktstabilität, erfordern jedoch Lebensdauer-Überwachung.'
      },
      {
        title: 'Ausfallsicherheit & Kalibrierung',
        desc: 'Sensorköpfe müssen vorort austauschbar (Plug-and-Play) oder einfach neu kalibrierbar sein.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Welche Gase müssen nach EN 50545-1 in modernen Tiefgaragen gemessen werden und warum?',
        a: 'CO (Kohlenmonoxid) für Benzinfahrzeuge und NO/NO2 (Stickoxide) für Dieselfahrzeuge. Beide Gase sind hochgiftig und erfordern gestufte Lüftungsalarme.'
      },
      {
        q: 'Wie baut Oppermann die Sensorüberwachung in OPP-SOR Gasdetektoren auf?',
        a: 'Mit vorkalibrierten Wechsel-Sensormodulen, digitalen Modbus/BACnet Schnittstellen und kontinuierlicher Eigendiagnose der elektrochemischen Zelle.'
      }
    ]
  },
  {
    id: 'en60079-29-1',
    code: 'EN 60079-29-1',
    title: 'Gassensoren für brennbare Gase (ATEX)',
    category: 'gaswarn',
    categoryName: 'Gaswarn & Sensorik',
    badge: 'Ex-Gaswarnung',
    summary: 'Anforderungen an das Betriebsverhalten von Geräten für die Messung brennbarer Gase (UEG / LEL).',
    keyPoints: [
      {
        title: 'Untere Explosionsgrenze (UEG / LEL)',
        desc: 'Messung von Methan, Propan, Wasserstoff im Bereich 0–100% UEG.'
      },
      {
        title: 'Pellistor & Wärmetönung',
        desc: 'Katalytische Sensorelemente benötigen Sauerstoff zur Verbrennung; Vergiftungsschutz gegen Silikone erforderlich.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Was bedeutet die Messung in "% UEG" bei brennbaren Gasen?',
        a: 'UEG steht für Untere Explosionsgrenze. 100% UEG ist die Mindestkonzentration des Gases in Luft, bei der eine Zündung möglich ist. Ein Gaswarngerät schlägt meist schon bei 10% oder 20% UEG Alarm.'
      }
    ]
  },
  {
    id: 'en61000-6-2',
    code: 'EN 61000-6-2 / 6-3',
    title: 'EMV Fachgrundnormen (Störfestigkeit & Aussendung)',
    category: 'emv',
    categoryName: 'Hardware, EMV & Ex',
    badge: 'Elektronik-Design',
    summary: 'Bestimmt die Elektromagnetische Verträglichkeit im Industrie- und Zweckbau-Bereich.',
    keyPoints: [
      {
        title: 'ESD (IEC 61000-4-2)',
        desc: 'Festigkeit gegen elektrostatische Entladung (Kontakt 4kV/8kV, Luft 8kV/15kV) an Gehäuse & Klemmen.'
      },
      {
        title: 'Burst & Surge (IEC 61000-4-4 / 4-5)',
        desc: 'Schutz von Sensorleitungen (24V, Modbus) gegen schnelle Transienten und Überspannungen durch Schaltschütze/Blitze.'
      },
      {
        title: 'HF-Einstrahlung & TIA-Frontend',
        desc: 'Der Transimpedanzverstärker misst Ströme im Nanoampere-Bereich (pA..nA). HF-Einstrahlung durch Handfunke/Mobilfunk darf KEINE Fehlalarme auslösen (Differenzverstärkung + Tiefpassfilterung).'
      }
    ],
    interviewQuestions: [
      {
        q: 'Warum ist EMV nach EN 61000-6-2 bei optischen Rauchmeldern eine besondere Herausforderung?',
        a: 'Weil das Optik-Frontend (Photodiode) extrem schwache Photoströme (nA) verstärken muss. HF-Einstrahlung wird sonst an Halbleiter-Übergängen gleichgerichtet und erzeugt Scheinsignale, die als Rauch interpretiert werden könnten.'
      }
    ]
  },
  {
    id: 'atex',
    code: 'ATEX 2014/34/EU',
    title: 'Explosionsschutz für Geräte & Schutzsysteme',
    category: 'emv',
    categoryName: 'Hardware, EMV & Ex',
    badge: 'Ex-Schutz Zonen',
    summary: 'Vorschriften für das Inverkehrbringen von Geräten in explosionsgefährdeten Bereichen (Zone 1, 2, 21, 22).',
    keyPoints: [
      {
        title: 'Eigensicherheit Ex-i (EN 60079-11)',
        desc: 'Begrenzung der elektrischen Energie (Strom, Spannung, Induktivität, Kapazität), sodass keine Zündfunken oder heißen Oberflächen entstehen.'
      },
      {
        title: 'Druckfeste Kapselung Ex-d',
        desc: 'Gehäuse hält einer internen Explosion stand und verhindert Übertragung nach außen.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Was ist der Unterschied zwischen Ex-i (Eigensicherheit) und Ex-d (Druckfeste Kapselung)?',
        a: 'Ex-i begrenzt Spannung und Strom auf Platine und Kabel so stark, dass physikalisch nie genug Energie für einen Funken entsteht. Ex-d lässt eine Zündung im Gehäuse zu, stellt aber sicher, dass das Gehäuse der Explosion standhält und keine Flamme nach außen dringt.'
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Welche Norm regelt speziell das Gesamtsystem eines Kanalrauchmelders (Entnahmerohr, Strömung, Melder)?',
    options: ['EN 54-7', 'EN 54-27', 'EN 14604', 'DIN VDE 0833'],
    correct: 1,
    explanation: 'EN 54-27 ist die europäische Produktnorm speziell für Kanalrauchmelder. EN 54-7 deckt nur punktförmige Rauchmelder ab.'
  },
  {
    id: 2,
    question: 'Ein Kunde fragt, ob ein Oppermann KRM-X für ein Einfamilienhaus nach EN 14604 eingesetzt werden sollte. Was antwortest du?',
    options: [
      'Ja, EN 14604 ist höherwertig als EN 54.',
      'Nein, EN 14604 gilt für Heim-Stand-Alone-Warnmelder. KRM-X ist ein zertifizierter Kanalrauchmelder nach EN 54-27 für gewerbliche HVAC-Anlagen.',
      'Ja, aber nur mit Batteriebetrieb.',
      'Nein, EN 14604 schließt optische Melder aus.'
    ],
    correct: 1,
    explanation: 'EN 14604 gilt für Heimbereich-Rauchwarnmelder (Stand-Alone mit Piezo). Kanalrauchmelder in Gebäuden fallen unter EN 54-27.'
  },
  {
    id: 3,
    question: 'Warum ist bei der Schaltungsentwicklung des TIA-Frontends (Photodiode) die EMV-Norm EN 61000-6-2 besonders kritisch?',
    options: [
      'Weil die Netzspannung auf 400V ansteigt.',
      'Weil der Fotostrom im nA-Bereich liegt und HF-Einstrahlung sonst Fehlalarme induzieren kann.',
      'Weil der Sensor sonst zu viel Strom verbraucht.',
      'Weil der Mikrokontroller den Speichertakt verliert.'
    ],
    correct: 1,
    explanation: 'Die Transimpedanzverstärkung wandelt winzige Fotoströme (nA). Hohe EMV-Einstrahlung koppelt leicht ein und fälscht das Rauchsignal.'
  },
  {
    id: 4,
    question: 'Welche Gase stehen bei der Gebäudeüberwachung von Tiefgaragen nach EN 50545-1 im Fokus?',
    options: [
      'Methan und Propan',
      'CO (Kohlenmonoxid) & NO/NO2 (Stickoxide)',
      'SF6 und F-Gase',
      'Rein nur Sauerstoff O2'
    ],
    correct: 1,
    explanation: 'EN 50545-1 schreibt die Überwachung von CO (Benziner) und NO/NO2 (Diesel) in Parkgaragen vor, um Lüftungsstufen zu steuern.'
  },
  {
    id: 5,
    question: 'Was unterscheidet eine optische Ruhewertnachführung (Driftkompensation) von einem echten Alarmsignal?',
    options: [
      'Driftkompensation reagiert schnell (Sekunden), Rauch langsam (Tage).',
      'Driftkompensation gleicht langsame Verstaubung über Tage/Wochen aus; Rauch erzeugt einen schnellen Signalanstieg in Minuten.',
      'Die Kompensation schaltet die IR-LED im Brandfall komplett aus.',
      'Es gibt keinen Unterschied.'
    ],
    correct: 1,
    explanation: 'Staub sammelt sich langsam (Drift wird nachgeführt). Rauch steigt innerhalb kurzer Zeit an und überschreitet die Dynamikschwelle.'
  },
  {
    id: 6,
    question: 'Welche Aufgabe übernimmt das Venturirohr / Entnahmerohr im KRM-X nach EN 54-27?',
    options: [
      'Es kühlt die Luft auf 0°C ab.',
      'Es leitet über Druckunterschiede kontinuierlich einen repräsentativen Teilstrom der Kanalluft zur Messkammer.',
      'Es filtert jeglichen Ruß komplett heraus.',
      'Es erhöht die Feuchtigkeit in der Messkammer.'
    ],
    correct: 1,
    explanation: 'Das Doppelrohr/Venturi-Prinzip erzeugt durch die Luftströmung im Kanal eine Druckdifferenz, die Luft durch den externen Sensorkopf saugt.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);

  const [learnedStandards, setLearnedStandards] = useState(() => {
    try {
      const saved = localStorage.getItem('opp_normen_learned');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const toggleLearned = (id) => {
    setLearnedStandards((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('opp_normen_learned', JSON.stringify(next));
      } catch (error) {
        // no-op if localStorage is unavailable
      }
      return next;
    });
  };

  const filteredStandards = useMemo(() => {
    return STANDARDS_DATA.filter((std) => {
      const matchesCat = selectedCategory === 'all' || std.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        std.code.toLowerCase().includes(q) ||
        std.title.toLowerCase().includes(q) ||
        std.summary.toLowerCase().includes(q) ||
        std.keyPoints.some((kp) => kp.title.toLowerCase().includes(q) || kp.desc.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOptionSelect = (idx) => {
    if (quizSubmitted) return;
    setSelectedOption(idx);
  };

  const handleQuizNext = () => {
    if (!quizSubmitted) {
      if (selectedOption === null) return;
      if (selectedOption === QUIZ_QUESTIONS[currentQuizIdx].correct) {
        setScore((prev) => prev + 1);
      }
      setQuizSubmitted(true);
    } else {
      if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuizIdx((prev) => prev + 1);
        setSelectedOption(null);
        setQuizSubmitted(false);
      } else {
        setQuizFinished(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setQuizSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-orange-500 selection:text-white pb-12">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-white">Oppermann</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Normen-Trainer
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">F&amp;E Vorbereitung: EN 54, Gaswarn, Lüftungsbaurecht &amp; EMV</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <BookmarkCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-slate-300">
                Gelernt: <strong className="text-emerald-400">{learnedStandards.length}</strong> / {STANDARDS_DATA.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="kpi-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                <Stars className="w-5 h-5 text-orange-300" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Focus</span>
            </div>
            <p className="text-2xl font-bold text-white">12+</p>
            <p className="text-xs text-slate-300 mt-1">Schlüsselnormen mit Interview-Antworten</p>
          </div>

          <div className="kpi-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                <Target className="w-5 h-5 text-sky-300" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Prüfung</span>
            </div>
            <p className="text-2xl font-bold text-white">6</p>
            <p className="text-xs text-slate-300 mt-1">Fragen im Quiz-Format für Repetition</p>
          </div>

          <div className="kpi-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <BriefcaseBusiness className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Interview</span>
            </div>
            <p className="text-2xl font-bold text-white">EN 54</p>
            <p className="text-xs text-slate-300 mt-1">Punkt- vs. Kanalrauchmelder im Fokus</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 bg-slate-900/60 p-2 rounded-2xl border border-slate-800/80 glass-panel">
          <div className="flex items-center space-x-1 w-full sm:w-auto overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Essenz &amp; Deep Dive</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Quiz &amp; Prüfmodus</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'compare'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>EN 54-7 vs. EN 54-27</span>
            </button>
          </div>

          {activeTab === 'flashcards' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Norm, Stichwort (z.B. TIA, CO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700/70 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>
          )}
        </div>

        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-slate-200 text-slate-900'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                Alle Normen ({STANDARDS_DATA.length})
              </button>
              <button
                onClick={() => setSelectedCategory('brandschutz')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'brandschutz'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Brandschutz &amp; Rauch</span>
              </button>
              <button
                onClick={() => setSelectedCategory('lueftung')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'lueftung'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Wind className="w-3.5 h-3.5 text-sky-400" />
                <span>Lüftung &amp; Baurecht</span>
              </button>
              <button
                onClick={() => setSelectedCategory('gaswarn')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'gaswarn'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Gaswarn &amp; Sensorik</span>
              </button>
              <button
                onClick={() => setSelectedCategory('emv')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'emv'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Hardware, EMV &amp; Ex</span>
              </button>
            </div>

            {filteredStandards.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
                <Search className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-medium text-slate-300">Keine Normen gefunden</h3>
                <p className="text-xs text-slate-500 mt-1">Versuche einen anderen Suchbegriff oder Filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredStandards.map((std) => {
                  const isLearned = learnedStandards.includes(std.id);
                  const isExpanded = expandedCardId === std.id;

                  return (
                    <div
                      key={std.id}
                      className={`bg-slate-900/80 border transition-all rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:border-slate-600 ${
                        isLearned ? 'border-emerald-500/30 bg-slate-900/40' : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                                {std.code}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                {std.categoryName}
                              </span>
                            </div>
                            <h3 className="font-bold text-base text-white leading-snug">{std.title}</h3>
                          </div>
                          <button
                            onClick={() => toggleLearned(std.id)}
                            className={`p-2 rounded-xl transition-all ${
                              isLearned
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                            }`}
                            title={isLearned ? 'Als wiederholen markieren' : 'Als gelernt markieren'}
                          >
                            <BookmarkCheck className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">{std.summary}</p>

                        <div className="space-y-2 mb-4">
                          <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-orange-400" />
                            <span>Essentielle F&amp;E Schlüsselpunkte:</span>
                          </h4>
                          <div className="space-y-2">
                            {std.keyPoints.map((kp, idx) => (
                              <div key={idx} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                                <div className="text-xs font-semibold text-orange-300 mb-0.5">{kp.title}</div>
                                <div className="text-[11px] text-slate-300 leading-normal">{kp.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {std.interviewQuestions && std.interviewQuestions.length > 0 && (
                          <div className="mt-4 border-t border-slate-800/80 pt-3">
                            <button
                              onClick={() => setExpandedCardId(isExpanded ? null : std.id)}
                              className="w-full flex items-center justify-between text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors py-1"
                            >
                              <span className="flex items-center space-x-1.5">
                                <HelpCircle className="w-3.5 h-3.5" />
                                <span>Interview-Praxisfragen ({std.interviewQuestions.length})</span>
                              </span>
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {isExpanded && (
                              <div className="mt-3 space-y-3 bg-slate-950/90 p-3 rounded-xl border border-sky-500/20">
                                {std.interviewQuestions.map((iq, idx) => (
                                  <div key={idx} className="space-y-1">
                                    <div className="text-xs font-medium text-amber-300 flex items-start space-x-1.5">
                                      <span className="font-bold">F:</span>
                                      <span>{iq.q}</span>
                                    </div>
                                    <div className="text-[11px] text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800 leading-relaxed pl-4">
                                      <strong className="text-emerald-400">Antwort-Fokus: </strong>
                                      {iq.a}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono">{std.badge}</span>
                        {isLearned ? (
                          <span className="text-emerald-400 font-medium flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Gelernt</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">Offen</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {!quizFinished ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Prüfmodus</span>
                    <h2 className="text-xl font-bold text-white">Frage {currentQuizIdx + 1} von {QUIZ_QUESTIONS.length}</h2>
                  </div>
                  <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-slate-300 border border-slate-700">
                    Punkte: {score}
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
                  <div
                    className="bg-orange-500 h-full transition-all duration-300"
                    style={{ width: `${((currentQuizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-6 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuizIdx].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {QUIZ_QUESTIONS[currentQuizIdx].options.map((option, idx) => {
                    let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';

                    if (selectedOption === idx) {
                      btnStyle = 'bg-orange-500/20 border-orange-500 text-orange-200';
                    }

                    if (quizSubmitted) {
                      if (idx === QUIZ_QUESTIONS[currentQuizIdx].correct) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (selectedOption === idx) {
                        btnStyle = 'bg-red-500/20 border-red-500 text-red-200';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={quizSubmitted}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start justify-between ${btnStyle}`}
                      >
                        <span className="leading-relaxed">{option}</span>
                        {quizSubmitted && idx === QUIZ_QUESTIONS[currentQuizIdx].correct && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                        )}
                        {quizSubmitted && selectedOption === idx && idx !== QUIZ_QUESTIONS[currentQuizIdx].correct && (
                          <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 space-y-1">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                      <span>Erklärung:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                    </p>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleQuizNext}
                    disabled={selectedOption === null && !quizSubmitted}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                      selectedOption === null && !quizSubmitted
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                    }`}
                  >
                    <span>{quizSubmitted ? (currentQuizIdx === QUIZ_QUESTIONS.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Frage') : 'Antwort prüfen'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-orange-500/20">
                  <Award className="w-8 h-8 text-white" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white">Quiz Abgeschlossen!</h2>
                  <p className="text-sm text-slate-400 mt-1">Du hast dein Wissen zu den Oppermann Normen getestet.</p>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 inline-block min-w-[200px]">
                  <div className="text-3xl font-extrabold text-orange-400 mb-1">
                    {score} / {QUIZ_QUESTIONS.length}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% Richtig beantwortet
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm mx-auto transition-all border border-slate-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Quiz erneut starten</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl">
              <div className="flex items-center space-x-3 mb-2">
                <Cpu className="w-6 h-6 text-orange-400" />
                <h2 className="text-lg font-bold text-white">Vergleich: Punkt-Rauchmelder vs. Kanal-Rauchmelder (KRM-X)</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Im Oppermann-Vorstellungsgespräch wird oft geprüft, ob der Kandidat den entscheidenden Unterschied zwischen der optischen Rauchsensorik an der Decke (EN 54-7) und der Strömungs-Entnahmelogik in Lüftungskanälen (EN 54-27) versteht.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      EN 54-7
                    </span>
                    <h3 className="font-bold text-base text-white mt-1">Punktförmige Rauchmelder</h3>
                  </div>
                  <Building2 className="w-6 h-6 text-blue-400 opacity-60" />
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span><strong>Einsatzort:</strong> Direkt an der Decke in Räumen mit weitgehend ruhender Raumluft.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span><strong>Messprinzip:</strong> Thermisch aufsteigender Rauch dringt direkt über das Labyrinth in die Messkammer ein.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span><strong>Prüfung:</strong> Fokus liegt auf optischer Empfindlichkeit (m dB/m) und Störgrößen (Windstillstand, Staub).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span><strong>Kritische Hürde:</strong> In Lüftungskanälen wirkungslos, da der starke Luftstrom den Rauch am Melder vorbeibläst.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/80 border border-orange-500/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      EN 54-27
                    </span>
                    <h3 className="font-bold text-base text-white mt-1">Kanalrauchmelder (Oppermann KRM-X)</h3>
                  </div>
                  <Gauge className="w-6 h-6 text-orange-400 opacity-80" />
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Einsatzort:</strong> Direkt an Lüftungskanälen montiert (Entnahmerohr im Kanal, Gehäuse außen).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Messprinzip:</strong> Venturi-Prinzip saugt aktiv Kanal-Luft durch das Rohr über den externen Sensorkopf zurück in den Kanal.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Prüfung:</strong> Zwingende Prüfung des Gesamtgeräts (Rohr + Gehäuse + Strömungssensor) bei 1 bis 20 m/s Luftgeschwindigkeit.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                    <span><strong>Kritische Hürde:</strong> Strömungsausfall-Erkennung &amp; Ausfallsicherheit bei schnellen Druckschwankungen im Kanal.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Typische Interview-Frage im Oppermann R&amp;D Team:</span>
              </h4>
              <p className="text-xs text-slate-200 font-medium">
                "Kann man einfach einen EN 54-7 Deckenrauchmelder in ein Gehäuse bauen und als Kanalrauchmelder verkaufen?"
              </p>
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                <p>
                  <strong className="text-emerald-400">Perfekte Antwort:</strong> "Nein. Gemäß EN 54-27 muss die Gesamtfunktion aus Entnahmerohr, aerodynamischer Luftzuführung, Drucküberwachung und Sensorkopf zertifiziert werden."
                </p>
                <p>
                  "In einem Lüftungskanalherrschen hohe Luftgeschwindigkeiten und Turbulenzen. Ein Deckenmelder würde ohne Venturirohr von der Luft umströmt werden, ohne dass Rauch in die Messkammer gelangt. Zudem fordert EN 54-27 die kontinuierliche Strömungsüberwachung (Rohrabriss-/Verstopfungserkennung)."
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
