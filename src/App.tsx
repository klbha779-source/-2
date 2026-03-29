import React, { useState, useEffect } from 'react';
import { literatureData } from './data';
import { grammarData } from './grammarData';
import { BookOpen, FileText, User, Mic, Book, Star, ChevronRight, CheckCircle2, AlertCircle, Moon, Sun, Library, Dumbbell, GraduationCap, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const iconMap: Record<string, React.ElementType> = {
  FileText,
  User,
  BookOpen,
  Mic,
  Book,
  Sparkles: Star,
  MessageSquare: AlertCircle,
  AlertTriangle: AlertCircle,
};

export default function App() {
  const [mainSection, setMainSection] = useState<'literature' | 'grammar'>('grammar');
  const [activeLitTab, setActiveLitTab] = useState(literatureData[0].id);
  const [activeGrammarTab, setActiveGrammarTab] = useState(grammarData[0].id);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const activeLitData = literatureData.find((d) => d.id === activeLitTab) || literatureData[0];
  const activeGrammarData = grammarData.find((d) => d.id === activeGrammarTab) || grammarData[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200" dir="rtl">
      {/* Header */}
      <header className="bg-indigo-600 dark:bg-indigo-900 text-white shadow-md sticky top-0 z-20 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-2xl font-bold tracking-tight">المراجعة المركزة</h1>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="sm:hidden p-2 rounded-full bg-indigo-500/50 dark:bg-indigo-800/50 hover:bg-indigo-500 dark:hover:bg-indigo-700 transition-colors"
              aria-label="تبديل الوضع الليلي والنهاري"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Main Section Toggle */}
          <div className="flex bg-indigo-800/50 dark:bg-indigo-950/50 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setMainSection('grammar')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                mainSection === 'grammar' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:bg-indigo-500/50'
              }`}
            >
              <Library className="w-4 h-4" />
              القواعد
            </button>
            <button
              onClick={() => setMainSection('literature')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                mainSection === 'literature' ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-100 hover:bg-indigo-500/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              الأدب والنصوص
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="text-sm bg-indigo-500/50 dark:bg-indigo-800/50 px-3 py-1.5 rounded-full flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>ضمان الدرجة الكاملة</span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-indigo-500/50 dark:bg-indigo-800/50 hover:bg-indigo-500 dark:hover:bg-indigo-700 transition-colors"
              aria-label="تبديل الوضع الليلي والنهاري"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden sticky top-28 transition-colors duration-200">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
              <h2 className="font-semibold text-slate-700 dark:text-slate-200">
                {mainSection === 'literature' ? 'مواضيع الأدب' : 'مواضيع القواعد'}
              </h2>
            </div>
            <nav className="p-2 flex flex-col gap-1">
              {mainSection === 'literature' ? (
                literatureData.map((topic) => {
                  const Icon = iconMap[topic.icon] || FileText;
                  const isActive = activeLitTab === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setActiveLitTab(topic.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-right ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span>{topic.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 mr-auto text-indigo-400 dark:text-indigo-500" />}
                    </button>
                  );
                })
              ) : (
                grammarData.map((topic) => {
                  const Icon = iconMap[topic.icon] || BookOpen;
                  const isActive = activeGrammarTab === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setActiveGrammarTab(topic.id)}
                      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all text-right ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                      <span>{topic.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 mr-auto text-indigo-400 dark:text-indigo-500" />}
                    </button>
                  );
                })
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {mainSection === 'literature' ? (
              <motion.div
                key={`lit-${activeLitTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Topic Header */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">{activeLitData.title}</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{activeLitData.summary}</p>
                </div>

                {/* Mind Map / Visual Summary */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">1</span>
                    المخطط الشجري (للفهم السريع)
                  </h3>
                  <div className="bg-indigo-50 dark:bg-slate-800/50 rounded-3xl p-6 border border-indigo-100 dark:border-slate-700 transition-colors duration-200">
                    <div className="text-center mb-8">
                      <span className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-full font-bold shadow-md">
                        {activeLitData.mindmap.root}
                      </span>
                      <div className="w-px h-8 bg-indigo-300 dark:bg-indigo-700 mx-auto mt-2"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {activeLitData.mindmap.children.map((child, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-indigo-50 dark:border-slate-700 relative transition-colors duration-200">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full border-4 border-white dark:border-slate-800"></div>
                          <h4 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2 text-center mt-2">{child.title}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 text-center leading-relaxed">{child.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Q&A Section */}
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">2</span>
                    الأسئلة والأجوبة النموذجية
                  </h3>
                  <div className="space-y-4">
                    {activeLitData.questions.map((q, idx) => (
                      <div
                        key={idx}
                        className={`bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border transition-all hover:shadow-md duration-200 ${
                          q.isImportant ? 'border-amber-200 dark:border-amber-500/30' : 'border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 mt-1 flex flex-col gap-2">
                            {q.isImportant ? (
                              <div className="bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 p-2 rounded-lg flex flex-col items-center justify-center gap-1" title="سؤال أساسي ومهم جداً">
                                <Star className="w-5 h-5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                                <span className="text-[10px] font-bold">مهم جداً</span>
                              </div>
                            ) : (
                              <div className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 p-2 rounded-lg flex items-center justify-center">
                                <AlertCircle className="w-5 h-5" />
                              </div>
                            )}
                            {q.years && (
                              <div className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-[10px] font-bold text-center border border-indigo-200 dark:border-indigo-500/30">
                                {q.years}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 leading-snug">{q.q}</h4>
                            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700 transition-colors duration-200">
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span>{q.a}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`grammar-${activeGrammarTab}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Topic Header */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{activeGrammarData.title}</h2>
                  <p className="text-slate-500 dark:text-slate-400">رحلة الفهم والاحتراف في 3 مراحل</p>
                </div>

                {/* Stage 1: Understanding */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-800/30">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-500/30">
                      <Dumbbell className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                      {activeGrammarData.stages.understanding.title}
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                        ⚽ الربط بكرة القدم (لكي لا تنسى أبداً):
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg">
                        {activeGrammarData.stages.understanding.footballAnalogy}
                      </p>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/30">
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                        💡 الزبدة النحوية:
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg font-medium">
                        {activeGrammarData.stages.understanding.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stage 2: Curriculum */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-indigo-500 text-white p-3 rounded-2xl shadow-lg shadow-indigo-500/30">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {activeGrammarData.stages.curriculum.title}
                    </h3>
                  </div>
                  <div className="space-y-8">
                    {activeGrammarData.stages.curriculum.sections.map((section, idx) => (
                      <div key={idx} className="border-r-4 border-indigo-500 pr-6 pl-2 py-2">
                        <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-3">{section.subtitle}</h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 whitespace-pre-line text-lg">
                          {section.content}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {section.examples.map((ex, exIdx) => (
                            <div key={exIdx} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
                              <div className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2 font-serif">"{ex.text}"</div>
                              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                <span>{ex.explanation}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage 3: Ministerial */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-amber-200 dark:border-amber-800/30">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-amber-500 text-white p-3 rounded-2xl shadow-lg shadow-amber-500/30">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                      {activeGrammarData.stages.ministerial.title}
                    </h3>
                  </div>
                  <div className="space-y-6">
                    {activeGrammarData.stages.ministerial.questions.map((q, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-amber-100 dark:border-amber-900/50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                          <div className="flex items-center gap-2">
                            <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm font-bold">
                              سؤال وزاري
                            </span>
                            {q.isImportant && (
                              <span className="flex items-center gap-1 text-red-500 text-sm font-bold">
                                <Star className="w-4 h-4 fill-red-500" /> مكرر ومهم
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 dark:text-slate-400 text-sm font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg">
                            {q.years}
                          </span>
                        </div>
                        
                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-relaxed font-serif">
                          {q.q}
                        </h4>
                        
                        <div className="space-y-3">
                          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30">
                            <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5" /> الجواب النموذجي:
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg">
                              {q.a}
                            </p>
                          </div>
                          
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800/30">
                            <div className="font-bold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                              <Sparkles className="w-5 h-5" /> طريقة الحل السحرية:
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                              {q.steps}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

