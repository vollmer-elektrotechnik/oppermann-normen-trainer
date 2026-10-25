import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Flame,
  HelpCircle,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Wind,
  Zap,
} from 'lucide-react';

const STANDARDS_DATA = [
  {
    id: 'en54-7',
    code: 'EN 54-7',
    title: 'Punktförmige Rauchmelder',
    category: 'brandschutz',
    categoryName: 'Brandschutz & Rauch',
    badge: 'Kernaussage R&D',
    summary: 'Prüfverfahren und Anforderungen für optische Punktrauchmelder in ruhender Raumluft.',
    keyPoints: [
      {
        title: 'Testbrände',
        desc: 'TF2 bis TF5 prüfen Schwelbrand- und Rußverhalten mit definierter Reaktion.'
      },
      {
        title: 'Empfindlichkeit',
        desc: 'Der Messwert muss zwischen Signal und Rauschabstand sauber trennen können.'
      },
      {
        title: 'Driftkompensation',
        desc: 'Langsame Verschmutzung darf nicht als echter Brand interpretiert werden.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Warum ist die optische Messkammer bei EN 54-7 so kritisch?',
        a: 'Weil Fremdlicht, Staub und Luftströmungen die Messung verfälschen und damit Fehlalarme oder Ausfälle verursachen können.'
      }
    ]
  },
  {
    id: 'en54-27',
    code: 'EN 54-27',
    title: 'Kanalrauchmelder',
    category: 'brandschutz',
    categoryName: 'Brandschutz & Rauch',
    badge: 'Oppermann Kernkompetenz',
    summary: 'Regelt das Gesamtsystem aus Entnahmerohr, Strömung und Sensorkopf im Lüftungskanal.',
    keyPoints: [
      {
        title: 'Strömungsdynamik',
        desc: 'Das Entnahmerohr muss bei unterschiedlichen Kanalgeschwindigkeiten weiterhin repräsentative Luft entnehmen.'
      },
      {
        title: 'Drucküberwachung',
        desc: 'Verstopfung oder Rohrabriss müssen als Fehler erkannt werden.'
      },
      {
        title: 'Gesamtfunktion',
        desc: 'Nicht nur der Sensor, sondern das komplette System zählt für die Zulassung.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Warum ist EN 54-27 für KRM-X relevant und nicht EN 54-7 allein?',
        a: 'Weil EN 54-27 die Gesamtfunktion im Kanal prüft: Luftstrom, Entnahmerohr, Strömungsüberwachung und Sensorkopf zusammen.'
      }
    ]
  },
  {
    id: 'en50545-1',
    code: 'EN 50545-1',
    title: 'Gaswarnung in Parkgaragen',
    category: 'gaswarn',
    categoryName: 'Gaswarn & Sensorik',
    badge: 'Tiefgarage',
    summary: 'Sorgt für CO- und NO/NO2-Überwachung in Garagen mit zugehöriger Lüftungssteuerung.',
    keyPoints: [
      {
        title: 'CO / NOx',
        desc: 'Kohlenmonoxid und Stickoxide sind die kritischsten Schadgase in modernen Garagen.'
      },
      {
        title: 'Lüftungsstufen',
        desc: 'Alarmzustände leiten je nach Konzentration passende Abzugsschritte ein.'
      },
      {
        title: 'Sensorwahl',
        desc: 'Elektrochemische Sensoren bieten oft die beste Selektivität.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Welche Gase stehen in Parkgaragen im Vordergrund?',
        a: 'Vor allem CO aus Fahrzeugen und NO/NO2 bei Dieselfahrzeugen.'
      }
    ]
  },
  {
    id: 'en61000-6-2',
    code: 'EN 61000-6-2',
    title: 'EMV & Halbleitersensorik',
    category: 'emv',
    categoryName: 'Hardware, EMV & Ex',
    badge: 'Elektronik-Design',
    summary: 'Schutz vor Störsignalen und Überspannungen in Mess- und Regelkreisen.',
    keyPoints: [
      {
        title: 'HF-Einstrahlung',
        desc: 'Sehr schwache Photoströme müssen vor Fehlalarmsignalen geschützt werden.'
      },
      {
        title: 'Transiente',
        desc: 'Spannungsspitzen und Überschläge dürfen die Messwerte nicht verfälschen.'
      },
      {
        title: 'Robustheit',
        desc: 'EMV ist für optische Rauchmelder ein kritischer Entwurfspunkt.'
      }
    ],
    interviewQuestions: [
      {
        q: 'Warum ist EMV bei optischen Rauchmeldern so wichtig?',
        a: 'Weil der TIA-Vorverstärker mit nA- bis pA-Strömen arbeitet und jede Störung als Rauch interpretiert werden kann.'
      }
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Welche Norm prüft speziell den Gesamtprozess eines Kanalrauchmelders im Lüftungskanal?',
    options: ['EN 54-7', 'EN 54-27', 'EN 14604', 'DIN VDE 0833'],
    correct: 1,
    explanation: 'EN 54-27 prüft die Gesamtfunktion aus Luftstrom, Rohr und Sensor im Kanal.'
  },
  {
    id: 2,
    question: 'Was ist die zentrale Aufgabe eines Rauchmelders im Lüftungsbereich?',
    options: [
      'Nur Temperatur messen',
      'Rauch früh erkennen und ggf. Lüftung oder Klappen zu stoppen',
      'Nur einen Sound abgeben',
      'Nur den Anschlussstatus melden'
    ],
    correct: 1,
    explanation: 'Ein Kanalrauchmelder soll frühzeitig Rauch erkennen und die Anlage im Brandfall schützen.'
  },
  {
    id: 3,
    question: 'Warum ist bei optischen Rauchmeldern EMV besonders kritisch?',
    options: [
      'Weil die Messströme extrem klein sind',
      'Weil die Sensoren nur 12 V brauchen',
      'Weil sie immer im Freien montiert sind',
      'Weil sie keinen Strom benötigen'
    ],
    correct: 0,
    explanation: 'Photoströme im nA-/pA-Bereich sind leicht durch HF-Einstrahlung oder Transienten zu verfälschen.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('flashcards');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredStandards = useMemo(() => {
    return STANDARDS_DATA.filter((standard) => {
      const matchesCategory = selectedCategory === 'all' || standard.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const haystack = [
        standard.code,
        standard.title,
        standard.summary,
        ...standard.keyPoints.map((point) => `${point.title} ${point.desc}`)
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && haystack.includes(query);
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
      return;
    }

    if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2 rounded-xl shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">Oppermann</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Normen-Trainer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                F&E Vorbereitung: EN 54, Gaswarn, Lüftungsbaurecht & EMV
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-300" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Focus</span>
            </div>
            <p className="text-2xl font-bold">12+</p>
            <p className="text-xs text-slate-300 mt-1">Schlüsselnormen mit Interview-Antworten</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-sky-300" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Prüfung</span>
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-slate-300 mt-1">Fragen im Quiz-Format für Wiederholung</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <BriefcaseBusiness className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Interview</span>
            </div>
            <p className="text-2xl font-bold">EN 54</p>
            <p className="text-xs text-slate-300 mt-1">Punkt- vs. Kanalrauchmelder im Fokus</p>
          </div>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-2">
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === 'flashcards'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Essenz & Deep Dive</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === 'quiz'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Quiz & Prüfmodus</span>
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${
                activeTab === 'compare'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>EN 54-7 vs EN 54-27</span>
            </button>
          </div>

          {activeTab === 'flashcards' && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Norm, Stichwort..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}
        </div>

        {activeTab === 'flashcards' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-slate-200 text-slate-900'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Alle Normen ({STANDARDS_DATA.length})
              </button>
              <button
                onClick={() => setSelectedCategory('brandschutz')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedCategory === 'brandschutz'
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Brandschutz</span>
              </button>
              <button
                onClick={() => setSelectedCategory('gaswarn')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedCategory === 'gaswarn'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Wind className="w-3.5 h-3.5 text-amber-400" />
                <span>Gaswarn</span>
              </button>
              <button
                onClick={() => setSelectedCategory('emv')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
                  selectedCategory === 'emv'
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>EMV</span>
              </button>
            </div>

            {filteredStandards.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
                <Search className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                <h3 className="text-base font-medium text-slate-300">Keine Normen gefunden</h3>
                <p className="text-xs text-slate-500 mt-1">Bitte Suchbegriff oder Filter ändern.</p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {filteredStandards.map((standard) => (
                  <div key={standard.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="inline-flex rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-orange-400 border border-orange-500/20">
                          {standard.code}
                        </span>
                        <h3 className="mt-2 text-base font-bold text-white">{standard.title}</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{standard.summary}</p>

                    <div className="mt-4 space-y-2">
                      {standard.keyPoints.map((point, index) => (
                        <div key={`${standard.id}-${index}`} className="rounded-xl border border-slate-800 bg-slate-950/60 p-2.5">
                          <div className="text-xs font-semibold text-orange-300">{point.title}</div>
                          <div className="mt-1 text-[11px] text-slate-300 leading-relaxed">{point.desc}</div>
                        </div>
                      ))}
                    </div>

                    {standard.interviewQuestions && standard.interviewQuestions.length > 0 && (
                      <div className="mt-4 border-t border-slate-800 pt-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Interview-Praxisfrage</span>
                        </div>
                        <div className="mt-2 rounded-xl border border-sky-500/20 bg-slate-950/70 p-3 text-[11px] text-slate-300">
                          <div className="font-medium text-amber-300">F: {standard.interviewQuestions[0].q}</div>
                          <div className="mt-2 text-slate-300">
                            <span className="font-semibold text-emerald-400">Antwort-Fokus: </span>
                            {standard.interviewQuestions[0].a}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between text-[11px] border-t border-slate-800 pt-3">
                      <span className="text-slate-500 font-mono">{standard.badge}</span>
                      <span className="text-slate-400">{standard.categoryName}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            {!quizFinished ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">Prüfmodus</span>
                    <h2 className="text-xl font-bold text-white">Frage {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}</h2>
                  </div>
                  <div className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-mono text-slate-300">
                    Score: {score}
                  </div>
                </div>

                <div className="mb-6 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300"
                    style={{ width: `${((currentQuizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h3 className="mb-6 text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuizIdx].question}
                </h3>

                <div className="space-y-3 mb-6">
                  {QUIZ_QUESTIONS[currentQuizIdx].options.map((option, index) => {
                    let buttonClasses = 'w-full text-left rounded-xl border p-4 text-sm transition-all bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';

                    if (selectedOption === index) {
                      buttonClasses = 'w-full text-left rounded-xl border p-4 text-sm transition-all bg-orange-500/20 border-orange-500 text-orange-200';
                    }

                    if (quizSubmitted) {
                      if (index === QUIZ_QUESTIONS[currentQuizIdx].correct) {
                        buttonClasses = 'w-full text-left rounded-xl border p-4 text-sm transition-all bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (selectedOption === index) {
                        buttonClasses = 'w-full text-left rounded-xl border p-4 text-sm transition-all bg-red-500/20 border-red-500 text-red-200';
                      }
                    }

                    return (
                      <button
                        key={index}
                        disabled={quizSubmitted}
                        onClick={() => handleOptionSelect(index)}
                        className={buttonClasses}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs text-slate-300 leading-relaxed">
                    <div className="mb-1 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                      <span>Erklärung</span>
                    </div>
                    {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleQuizNext}
                    disabled={selectedOption === null && !quizSubmitted}
                    className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition ${
                      selectedOption === null && !quizSubmitted
                        ? 'cursor-not-allowed bg-slate-800 text-slate-500'
                        : 'bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600'
                    }`}
                  >
                    <span>{quizSubmitted ? (currentQuizIdx === QUIZ_QUESTIONS.length - 1 ? 'Ergebnis anzeigen' : 'Nächste Frage') : 'Antwort prüfen'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Quiz abgeschlossen!</h2>
                <p className="mt-2 text-sm text-slate-400">Du hast dein Wissen zu den Oppermann-Normen getestet.</p>

                <div className="mt-6 inline-block rounded-xl border border-slate-800 bg-slate-950 p-6 min-w-[200px]">
                  <div className="text-3xl font-extrabold text-orange-400">{score} / {QUIZ_QUESTIONS.length}</div>
                  <div className="text-xs font-medium text-slate-400">
                    {Math.round((score / QUIZ_QUESTIONS.length) * 100)}% richtig beantwortet
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={resetQuiz}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Quiz erneut starten
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-orange-400" />
                <h2 className="text-lg font-bold text-white">Vergleich: Punkt-Rauchmelder vs. Kanal-Rauchmelder</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                Ein zentraler Interviewpunkt ist der Unterschied zwischen der optischen Messung an der Decke (EN 54-7)
                und der Gesamtfunktion eines Kanalrauchmelders im Lüftungskanal (EN 54-27).
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="inline-flex rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-400 border border-blue-500/20">EN 54-7</span>
                    <h3 className="mt-2 text-base font-bold text-white">Punktförmige Rauchmelder</h3>
                  </div>
                  <Flame className="w-6 h-6 text-blue-400/70" />
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li>• Einsatz direkt im Raum in weitgehend ruhender Luft.</li>
                  <li>• Fokus auf optische Sensitivität und Staub-/Driftkompensation.</li>
                  <li>• Nicht für hohe Luftgeschwindigkeiten im Kanal geeignet.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-orange-500/30 bg-slate-900/80 p-6">
                <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="inline-flex rounded bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-orange-400 border border-orange-500/20">EN 54-27</span>
                    <h3 className="mt-2 text-base font-bold text-white">Kanalrauchmelder (KRM-X)</h3>
                  </div>
                  <Wind className="w-6 h-6 text-orange-400/80" />
                </div>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li>• Einsatz direkt im Lüftungskanal mit Luftstrom und Druckdifferenz.</li>
                  <li>• Gesamtfunktion aus Rohr, Strömung und Messkammer muss geprüft werden.</li>
                  <li>• Verstopfung oder Rohrabriss muss als Fehler erkannt werden.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
