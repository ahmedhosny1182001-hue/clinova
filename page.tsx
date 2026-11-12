"use client";

import { useState } from "react";
import {
  Activity, ArrowLeft, ArrowUpLeft, BookOpen, BrainCircuit, CalendarDays,
  CheckCircle2, ChevronLeft, CircleHelp, Clock3, FlaskConical, GraduationCap,
  HeartPulse, Languages, LayoutDashboard, Library, Menu, MessageCircle,
  Search, Settings, ShieldCheck, Stethoscope, Target, TrendingUp, Users, X,
  Zap, Play, Sparkles, Bell, Plus
} from "lucide-react";

const content = {
  ar: {
    greeting: "مرحباً بك في CLINOVA", subtitle: "مساحتك الذكية للتعلّم الطبي والتفكير السريري.",
    search: "ابحث عن مرض، دواء، حالة سريرية...", overview: "نظرة عامة",
    dashboard: "لوحة التحكم", tutor: "المعلّم الذكي", simulation: "المحاكاة السريرية",
    questionBank: "بنك الأسئلة", library: "المكتبة الطبية", community: "المجتمع",
    progress: "تقدّمك الدراسي", seeAll: "عرض الكل", continue: "أكمل التعلّم",
    welcome: "طوّر تفكيرك السريري، حالة بعد حالة", welcomeSub: "تدرّب على اتخاذ القرارات الطبية في بيئة تعليمية تفاعلية مدعومة بالذكاء الاصطناعي.",
    startCase: "ابدأ حالة سريرية", askAI: "اسأل المعلّم الذكي",
    studyHours: "ساعات الدراسة", casesSolved: "حالات مكتملة", quizScore: "متوسط الاختبارات", streak: "أيام متتالية",
    recommended: "مقترح لك", caseTitle: "ألم صدري حاد في قسم الطوارئ", caseDesc: "رجل يبلغ 58 عاماً حضر إلى الطوارئ بسبب ألم ضاغط في منتصف الصدر بدأ منذ 45 دقيقة.",
    intermediate: "متوسط", minutes: "15 دقيقة", featured: "حالة اليوم", weekly: "خطة هذا الأسبوع",
    weakAreas: "مواضيع تحتاج مراجعة", quickAccess: "وصول سريع", new: "جديد",
    aiTitle: "المعلّم الطبي الذكي", aiDesc: "اشرح مفهوماً طبياً أو ناقش تشخيصاً تفريقياً مع مساعدك التعليمي.",
    simulationDesc: "اتخذ القرارات، اطلب الفحوصات، وراقب تطور حالة المريض.",
    questionDesc: "اختبر معلوماتك بأسئلة سريرية وتفسيرات تعليمية.",
    libraryDesc: "ملخصات، إرشادات، خوارزميات، ومراجع طبية.",
    viewDashboard: "لوحة الطالب", language: "English", notifications: "الإشعارات",
    footer: "منصة تعليمية — لا تستبدل التقييم أو الإشراف الطبي المباشر.",
    planned: "قريباً", profile: "طالب طب", semester: "السنة السادسة",
    progressLabel: "إنجاز خطتك", weeklyTarget: "هدفك الأسبوعي"
  },
  en: {
    greeting: "Welcome to CLINOVA", subtitle: "Your intelligent space for medical learning and clinical thinking.",
    search: "Search a disease, drug, clinical case...", overview: "Overview",
    dashboard: "Dashboard", tutor: "AI Tutor", simulation: "Clinical Simulation",
    questionBank: "Question Bank", library: "Medical Library", community: "Community",
    progress: "Your learning progress", seeAll: "View all", continue: "Continue learning",
    welcome: "Build your clinical thinking, one case at a time", welcomeSub: "Practice medical decisions in an interactive learning environment powered by AI.",
    startCase: "Start a clinical case", askAI: "Ask AI Tutor",
    studyHours: "Study hours", casesSolved: "Cases completed", quizScore: "Average quiz score", streak: "Day streak",
    recommended: "Recommended for you", caseTitle: "Acute chest pain in the ED", caseDesc: "A 58-year-old man presents to the emergency department with 45 minutes of central crushing chest pain.",
    intermediate: "Intermediate", minutes: "15 min", featured: "Case of the day", weekly: "This week's plan",
    weakAreas: "Topics to review", quickAccess: "Quick access", new: "New",
    aiTitle: "AI Medical Tutor", aiDesc: "Explore a medical concept or discuss a differential diagnosis with your learning assistant.",
    simulationDesc: "Make decisions, request investigations, and monitor the patient's progress.",
    questionDesc: "Test your knowledge with clinical questions and explanations.",
    libraryDesc: "Summaries, guidelines, algorithms, and medical references.",
    viewDashboard: "Student dashboard", language: "العربية", notifications: "Notifications",
    footer: "Educational platform — not a substitute for direct medical assessment or supervision.",
    planned: "Coming soon", profile: "Medical student", semester: "Year 6",
    progressLabel: "Plan completion", weeklyTarget: "Weekly target"
  }
};

export default function Home() {
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [showAI, setShowAI] = useState(false);
  const t = content[lang];
  const isAr = lang === "ar";

  const nav = [
    { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { id: "tutor", label: t.tutor, icon: BrainCircuit, badge: t.new },
    { id: "simulation", label: t.simulation, icon: Activity },
    { id: "questionBank", label: t.questionBank, icon: CircleHelp },
    { id: "library", label: t.library, icon: Library },
    { id: "community", label: t.community, icon: Users },
  ];

  const quick = [
    { title: t.aiTitle, desc: t.aiDesc, icon: BrainCircuit, tone: "violet", action: () => setShowAI(true) },
    { title: t.simulation, desc: t.simulationDesc, icon: HeartPulse, tone: "mint", action: () => setActive("simulation") },
    { title: t.questionBank, desc: t.questionDesc, icon: GraduationCap, tone: "blue", action: () => setActive("questionBank") },
    { title: t.library, desc: t.libraryDesc, icon: BookOpen, tone: "amber", action: () => setActive("library") },
  ];

  return (
    <main className={`app-shell ${isAr ? "rtl" : "ltr"}`}>
      {mobileOpen && <button className="mobile-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={22} strokeWidth={2.7} /></div>
          <div><div className="brand-name">CLINOVA<span>®</span></div><div className="brand-tag">CLINICAL LEARNING, REIMAGINED</div></div>
          <button className="close-menu" onClick={() => setMobileOpen(false)}><X size={19}/></button>
        </div>
        <div className="profile-mini">
          <div className="avatar">A</div>
          <div className="profile-copy"><strong>{t.profile}</strong><span>{t.semester}</span></div>
          <span className="online-dot" />
        </div>
        <div className="nav-label">{t.overview}</div>
        <nav className="side-nav">
          {nav.map(item => {
            const Icon = item.icon;
            return <button key={item.id} onClick={() => {setActive(item.id); setMobileOpen(false);}} className={`nav-item ${active === item.id ? "active" : ""}`}>
              <Icon size={18}/><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}
            </button>;
          })}
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={17}/></div><strong>{isAr ? "ارتقِ بتجربتك التعليمية" : "Level up your learning"}</strong><p>{isAr ? "اكتشف أدوات تساعدك على التعلّم بذكاء." : "Discover tools to help you learn smarter."}</p><button onClick={() => setShowAI(true)}>{isAr ? "جرّب المعلّم الذكي" : "Try AI Tutor"} <ArrowLeft size={14}/></button></div>
          <button className="nav-item muted"><Settings size={18}/><span>{isAr ? "الإعدادات" : "Settings"}</span></button>
          <div className="sidebar-foot">CLINOVA © 2026</div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div className="topbar-start">
            <button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={21}/></button>
            <div className="crumb">{t.dashboard}<ChevronLeft size={15}/><strong>{active === "dashboard" ? t.overview : nav.find(n => n.id === active)?.label}</strong></div>
          </div>
          <div className="topbar-actions">
            <label className="searchbox"><Search size={17}/><input placeholder={t.search}/><kbd>⌘ K</kbd></label>
            <button className="icon-btn" aria-label={t.notifications}><Bell size={18}/><i/></button>
            <button className="language-btn" onClick={() => setLang(isAr ? "en" : "ar")}><Languages size={17}/>{t.language}</button>
            <div className="top-avatar">A</div>
          </div>
        </header>

        {active === "dashboard" ? <div className="content">
          <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> {isAr ? "مساحة التعلّم الخاصة بك" : "YOUR LEARNING SPACE"}</div><h1>{t.greeting}</h1><p>{t.subtitle}</p></div><button className="date-chip"><CalendarDays size={16}/>{isAr ? "الخميس، 12 نوفمبر 2026" : "Thursday, November 12, 2026"}</button></div>

          <section className="hero">
            <div className="hero-copy"><div className="hero-kicker"><Sparkles size={14}/> {isAr ? "تعلّم أذكى. ممارسة أفضل." : "SMARTER LEARNING. BETTER PRACTICE."}</div><h2>{t.welcome}</h2><p>{t.welcomeSub}</p><div className="hero-actions"><button className="btn-white" onClick={() => setActive("simulation")}><Play size={16} fill="currentColor"/>{t.startCase}</button><button className="btn-ghost" onClick={() => setShowAI(true)}><MessageCircle size={16}/>{t.askAI}</button></div></div>
            <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-glow"/><div className="medical-cross"><Plus size={58} strokeWidth={1.3}/></div><div className="float-card float-top"><Activity size={17}/><span>Clinical AI</span><b>●</b></div><div className="float-card float-bottom"><HeartPulse size={18}/><span>Patient stable</span><strong>98%</strong></div><div className="pulse-line"/></div>
          </section>

          <section className="stats-grid">
            {[
              {label:t.studyHours,value:"24.5",unit:isAr?"ساعة":"hrs",icon:Clock3,delta:"+12%",tone:"blue"},
              {label:t.casesSolved,value:"18",unit:isAr?"حالة":"cases",icon:Stethoscope,delta:"+4",tone:"mint"},
              {label:t.quizScore,value:"86",unit:"%",icon:Target,delta:"+6%",tone:"violet"},
              {label:t.streak,value:"7",unit:isAr?"أيام":"days",icon:Zap,delta:isAr?"ممتاز":"Great",tone:"amber"},
            ].map((s,i)=>{const Icon=s.icon;return <div className="stat-card" key={i}><div className={`stat-icon ${s.tone}`}><Icon size={19}/></div><span className="stat-label">{s.label}</span><div className="stat-bottom"><strong>{s.value}<small>{s.unit}</small></strong><em><TrendingUp size={12}/>{s.delta}</em></div></div>;})}
          </section>

          <div className="section-head"><div><h3>{t.quickAccess}</h3><p>{isAr ? "الأدوات الأساسية في مكان واحد" : "Your essential tools in one place"}</p></div><button className="text-link" onClick={() => setActive("library")}>{t.seeAll}<ArrowLeft size={15}/></button></div>
          <section className="quick-grid">
            {quick.map((q,i)=>{const Icon=q.icon;return <button className="quick-card" key={i} onClick={q.action}><div className={`quick-icon ${q.tone}`}><Icon size={21}/></div><div className="quick-text"><strong>{q.title}</strong><p>{q.desc}</p></div><span className="quick-arrow"><ArrowUpLeft size={17}/></span></button>;})}
          </section>

          <div className="lower-grid">
            <section className="case-panel">
              <div className="section-head compact"><div><div className="eyebrow"><span className="eyebrow-line"/> {t.recommended}</div><h3>{t.featured}</h3></div><span className="case-count">01 / 12</span></div>
              <div className="case-card"><div className="case-visual"><div className="ecg-label"><Activity size={15}/> ECG • EMERGENCY</div><div className="ecg-wave">⌁⌁╱╲___╱╲___╱╲⌁⌁</div><div className="case-orb"><HeartPulse size={38}/></div></div><div className="case-info"><div className="case-tags"><span>{t.intermediate}</span><span><Clock3 size={12}/> {t.minutes}</span><span>Cardiology</span></div><h4>{t.caseTitle}</h4><p>{t.caseDesc}</p><button className="btn-primary" onClick={() => setActive("simulation")}>{t.continue}<ArrowLeft size={15}/></button></div></div>
            </section>
            <section className="progress-panel"><div className="section-head compact"><div><h3>{t.progress}</h3><p>{isAr ? "استمر، أنت تحرز تقدماً رائعاً" : "Keep going, you're making progress"}</p></div><button className="dots">•••</button></div><div className="progress-ring-wrap"><div className="progress-ring"><div><strong>72%</strong><span>{t.progressLabel}</span></div></div></div><div className="progress-meta"><span>{t.weeklyTarget}</span><strong>18 / 25 {isAr ? "ساعة" : "hrs"}</strong></div><div className="progress-track"><span/></div><div className="weak-area"><div className="weak-icon"><FlaskConical size={16}/></div><div><strong>{t.weakAreas}</strong><p>{isAr ? "راجع: Electrolytes · ECG interpretation" : "Review: Electrolytes · ECG interpretation"}</p></div><ChevronLeft size={17}/></div></section>
          </div>
          <footer className="disclaimer"><ShieldCheck size={15}/>{t.footer}</footer>
        </div> : <div className="placeholder-page"><div className="placeholder-icon"><BrainCircuit size={30}/></div><span className="eyebrow">CLINOVA MODULE</span><h1>{nav.find(n=>n.id===active)?.label}</h1><p>{isAr ? "هذا القسم ضمن خطة التطوير. الواجهة الأساسية جاهزة، وسنربط هذه الوحدة بقاعدة البيانات والخدمات المطلوبة في الخطوات التالية." : "This module is on the development roadmap. The core interface is ready; database and service integration will follow."}</p><button className="btn-primary" onClick={()=>setActive("dashboard")}>{isAr ? "العودة إلى لوحة التحكم" : "Back to dashboard"}<ArrowLeft size={15}/></button></div>}
      </section>

      {showAI && <div className="modal-backdrop" onClick={() => setShowAI(false)}><div className="ai-modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div className="modal-icon"><BrainCircuit size={21}/></div><div><strong>{t.aiTitle}</strong><p>{isAr ? "مساعدك التعليمي الطبي" : "Your medical learning assistant"}</p></div><button onClick={()=>setShowAI(false)}><X size={19}/></button></div><div className="modal-body"><div className="assistant-message"><Sparkles size={16}/><p>{isAr ? "أهلاً بك! يمكنني مساعدتك في فهم المفاهيم الطبية، بناء التشخيص التفريقي، ومراجعة الحالات التعليمية. ما الموضوع الذي تريد دراسته؟" : "Hello! I can help explain medical concepts, build differentials, and review educational cases. What would you like to study?"}</p></div><div className="demo-note">{isAr ? "واجهة تجريبية — سيتم تفعيل الاتصال بنموذج الذكاء الاصطناعي بعد إعداد مفتاح API." : "Preview interface — AI connection will be enabled after configuring an API key."}</div></div><form className="ai-input" onSubmit={e=>{e.preventDefault(); if(aiPrompt.trim()) {alert(isAr ? "تم حفظ سؤالك في النموذج التجريبي. سيتم تفعيل الإجابة عند ربط AI API." : "Your prompt was captured in this preview. AI replies will work after API setup.");setAiPrompt("");}}}><input value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)} placeholder={isAr ? "اكتب سؤالك الطبي هنا..." : "Type your medical question..."}/><button type="submit"><ArrowLeft size={17}/></button></form></div></div>}
    </main>
  );
}
