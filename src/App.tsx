import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Code, Copy, List, Moon, Play, Sun, TextAlignLeft } from "@phosphor-icons/react";
import { lessons, ui, type Lesson, type Locale } from "./data";

const read = (value: { zh: string; en: string }, locale: Locale) => value[locale];
const localeOf = (value?: string): Locale => value === "en" ? "en" : "zh";

function useProgress() {
  const [done, setDone] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("layout-lab-progress") || "[]"); } catch { return []; }
  });
  const toggle = (id: string) => setDone((current) => {
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try { localStorage.setItem("layout-lab-progress", JSON.stringify(next)); } catch { /* course still works */ }
    return next;
  });
  return { done, toggle };
}

function Shell({ children }: { children: React.ReactNode }) {
  const { locale: raw } = useParams();
  const locale = localeOf(raw);
  const location = useLocation();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem("layout-lab-theme") === "dark");

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en-US";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.title = locale === "zh" ? "Layout Lab - 前端布局实验室" : "Layout Lab - Interactive CSS Course";
    document.querySelector('meta[name="description"]')?.setAttribute("content", locale === "zh" ? "按难度递进、每个知识点都能运行的前端布局课程。" : "A progressive front-end layout course where every concept is runnable.");
    localStorage.setItem("layout-lab-locale", locale);
    localStorage.setItem("layout-lab-theme", dark ? "dark" : "light");
  }, [locale, dark]);

  const switchLocale = () => {
    const next = locale === "zh" ? "en" : "zh";
    navigate(location.pathname.replace(/^\/(zh|en)/, `/${next}`) + location.search);
  };

  return <>
    <header className="site-nav">
      <Link className="brand" to={`/${locale}`} aria-label="Layout Lab home"><span className="brand-mark"><i /><i /><i /></span>Layout Lab</Link>
      <nav aria-label={locale === "zh" ? "主导航" : "Main navigation"}>
        <Link to={`/${locale}/course`}>{read(ui.navCourse, locale)}</Link>
        <Link to={`/${locale}/challenge`}>{read(ui.navChallenge, locale)}</Link>
        <Link to={`/${locale}/about`}>{read(ui.navAbout, locale)}</Link>
      </nav>
      <div className="nav-actions">
        <details className="mobile-menu"><summary aria-label={locale === "zh" ? "打开菜单" : "Open menu"}><List /></summary><div><Link to={`/${locale}/course`}>{read(ui.navCourse, locale)}</Link><Link to={`/${locale}/challenge`}>{read(ui.navChallenge, locale)}</Link><Link to={`/${locale}/about`}>{read(ui.navAbout, locale)}</Link></div></details>
        <button className="icon-button language" onClick={switchLocale} aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}>{locale === "zh" ? "中 / EN" : "EN / 中"}</button>
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? "Use light theme" : "Use dark theme"}>{dark ? <Sun /> : <Moon />}</button>
        <Link className="button compact" to={`/${locale}/lesson/flexbox`}>{read(ui.continue, locale)}</Link>
      </div>
    </header>
    {children}
  </>;
}

type DemoState = { direction: string; justify: string; gap: number; columns: number; padding: number };
const initialDemo: DemoState = { direction: "row", justify: "center", gap: 24, columns: 2, padding: 24 };

function Playground({ lesson, locale, compact = false }: { lesson: Lesson; locale: Locale; compact?: boolean }) {
  const [state, setState] = useState(initialDemo);
  const [copied, setCopied] = useState(false);
  const isGrid = lesson.id === "grid" || lesson.id === "responsive" || lesson.id === "final-challenge";
  const generated = isGrid
    ? `display: grid;\ngrid-template-columns: repeat(${state.columns}, 1fr);\ngap: ${state.gap}px;\npadding: ${state.padding}px;`
    : lesson.id === "flexbox"
      ? `display: flex;\nflex-direction: ${state.direction};\njustify-content: ${state.justify};\ngap: ${state.gap}px;`
      : `box-sizing: border-box;\npadding: ${state.padding}px;`;
  const style = isGrid
    ? { display: "grid", gridTemplateColumns: `repeat(${state.columns}, 1fr)`, gap: state.gap, padding: state.padding }
    : lesson.id === "flexbox"
      ? { display: "flex", flexDirection: state.direction as "row" | "column", justifyContent: state.justify, gap: state.gap }
      : { padding: state.padding };

  const copy = async () => {
    try { await navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { setCopied(false); }
  };

  return <div className={`playground ${compact ? "playground-compact" : ""}`}>
    <div className="preview-head"><span>{locale === "zh" ? "实时预览" : "Live preview"}</span><span className="viewport-label">{locale === "zh" ? "桌面" : "Desktop"}</span></div>
    <div className="preview-stage" style={style}>
      {[1, 2, 3, 4].slice(0, compact ? 3 : 4).map((item) => <div className="demo-item" key={item}>{String(item).padStart(2, "0")}</div>)}
    </div>
    <div className="controls">
      {lesson.controls.includes("direction") && <label>flex-direction<select value={state.direction} onChange={(e) => setState({ ...state, direction: e.target.value })}><option>row</option><option>column</option><option>row-reverse</option></select></label>}
      {lesson.controls.includes("justify") && <label>justify-content<select value={state.justify} onChange={(e) => setState({ ...state, justify: e.target.value })}><option>center</option><option>flex-start</option><option>flex-end</option><option>space-between</option><option>space-around</option></select></label>}
      {lesson.controls.includes("columns") && <label>{locale === "zh" ? "列数" : "Columns"}<input type="range" min="1" max="4" value={state.columns} onChange={(e) => setState({ ...state, columns: Number(e.target.value) })} /><output>{state.columns}</output></label>}
      {lesson.controls.includes("gap") && <label>gap<input type="range" min="0" max="48" value={state.gap} onChange={(e) => setState({ ...state, gap: Number(e.target.value) })} /><output>{state.gap}px</output></label>}
      {lesson.controls.includes("padding") && <label>padding<input type="range" min="0" max="56" value={state.padding} onChange={(e) => setState({ ...state, padding: Number(e.target.value) })} /><output>{state.padding}px</output></label>}
    </div>
    {!compact && <><pre className="generated"><code>{generated}</code></pre><div className="control-actions"><button className="text-button" onClick={copy}><Copy />{copied ? read(ui.copied, locale) : read(ui.copy, locale)}</button><button className="text-button" onClick={() => setState(initialDemo)}>{read(ui.reset, locale)}</button></div></>}
  </div>;
}

function Home() {
  const locale = localeOf(useParams().locale);
  return <Shell>
    <main>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">INTERACTIVE CSS COURSE</p><h1>{locale === "zh" ? <>学会布局，<br />不靠背属性。</> : <>Learn layout.<br />Skip memorizing.</>}</h1><p>{read(ui.heroSub, locale)}</p><div className="hero-actions"><Link className="button" to={`/${locale}/lesson/page-structure`}>{read(ui.start, locale)}<ArrowRight /></Link><Link className="text-link" to={`/${locale}/course`}>{read(ui.map, locale)}</Link></div></div>
        <Playground lesson={lessons[2]} locale={locale} compact />
      </section>
      <section className="path-section"><h2>{read(ui.path, locale)}</h2><div className="learning-path">{[["入门", "Starter", "看懂页面结构", "Read page structure"], ["基础", "Foundation", "控制元素排列", "Control arrangement"], ["进阶", "Advanced", "适配复杂页面", "Adapt complex pages"], ["实战", "Practice", "独立完成布局", "Build independently"]].map((item, index) => <div key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item[locale === "zh" ? 0 : 1]}</strong><p>{item[locale === "zh" ? 2 : 3]}</p></div>)}</div></section>
      <ChapterGrid locale={locale} limit={6} />
      <section className="build-story"><div><h2>{locale === "zh" ? "布局是逐步构建的" : "Layouts are built in layers"}</h2><p>{locale === "zh" ? "先建立结构，再定义轨道、间距和响应式规则。每一步都能在实验区看到结果。" : "Start with structure, then add tracks, spacing and responsive rules. See every step in the lab."}</p><Link className="text-link" to={`/${locale}/lesson/grid`}>{locale === "zh" ? "打开 Grid 实验" : "Open the Grid lab"}<ArrowRight /></Link></div><ol><li><Code />display: grid</li><li>grid-template-columns</li><li>gap</li><li>@media</li></ol></section>
    </main>
    <Footer locale={locale} />
  </Shell>;
}

function ChapterGrid({ locale, limit }: { locale: Locale; limit?: number }) {
  const items = limit ? lessons.slice(0, limit) : lessons;
  return <section className="chapter-section"><div className="section-heading"><h2>{read(ui.chapters, locale)}</h2><p>{locale === "zh" ? "按顺序学习，或直接进入需要的主题。" : "Follow the path or jump directly to the topic you need."}</p></div><div className="chapter-grid">{items.map((lesson, index) => <Link className={`chapter-card card-${index + 1}`} key={lesson.id} to={`/${locale}/lesson/${lesson.id}`}><span>{read(lesson.level, locale)}</span><h3>{read(lesson.title, locale)}</h3><p>{read(lesson.summary, locale)}</p><small>{locale === "zh" ? "进入章节" : "Open chapter"}<ArrowRight /></small></Link>)}</div></section>;
}

function Course() { const locale = localeOf(useParams().locale); return <Shell><main className="page-main"><header className="page-header"><p className="eyebrow">LAYOUT CURRICULUM</p><h1>{read(ui.navCourse, locale)}</h1><p>{locale === "zh" ? "从页面骨架到完整响应式项目，八章逐级推进。" : "Eight chapters from page structure to a complete responsive project."}</p></header><ChapterGrid locale={locale} /></main><Footer locale={locale} /></Shell>; }

function LessonPage() {
  const { locale: raw, lessonId } = useParams();
  const locale = localeOf(raw);
  const lesson = lessons.find((item) => item.id === lessonId);
  const { done, toggle } = useProgress();
  const [tab, setTab] = useState<"theory" | "code" | "demo">("theory");
  if (!lesson) return <Navigate to={`/${locale}/course`} replace />;
  const index = lessons.indexOf(lesson);
  return <Shell><main className="lesson-shell">
    <aside className="lesson-nav"><Link className="back-link" to={`/${locale}/course`}><ArrowLeft />{read(ui.back, locale)}</Link><h2>{read(lesson.title, locale)}</h2><p>{read(lesson.summary, locale)}</p><div className="lesson-list">{lessons.map((item, i) => <Link className={item.id === lesson.id ? "active" : ""} key={item.id} to={`/${locale}/lesson/${item.id}`}><span>{String(i + 1).padStart(2, "0")}</span>{read(item.title, locale)}{done.includes(item.id) && <Check weight="bold" />}</Link>)}</div></aside>
    <article className="lesson-content"><div className="lesson-title"><span>{read(lesson.level, locale)}</span><h1>{read(lesson.title, locale)}</h1><p>{read(lesson.goal, locale)}</p></div><div className="lesson-tabs" role="tablist">{(["theory", "code", "demo"] as const).map((item) => <button role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>{item === "theory" ? <TextAlignLeft /> : item === "code" ? <Code /> : <Play />}{read(ui[item], locale)}</button>)}</div>
      {tab === "theory" && <section className="prose"><h2>{locale === "zh" ? "先建立直觉" : "Build intuition first"}</h2>{lesson.theory.map((paragraph) => <p key={paragraph.zh}>{read(paragraph, locale)}</p>)}<div className="mistake"><strong>{locale === "zh" ? "常见误区" : "Common mistake"}</strong><p>{read(lesson.mistake, locale)}</p></div></section>}
      {tab === "code" && <section className="code-section"><h2>{locale === "zh" ? "只看关键部分" : "Focus on the key lines"}</h2><p>{locale === "zh" ? "HTML 建立结构，CSS 决定这一节关注的布局行为。" : "HTML creates structure. CSS controls the layout behavior in focus."}</p><div className="code-block"><div>HTML</div><pre><code>{lesson.html}</code></pre></div><div className="code-block accent-code"><div>CSS</div><pre><code>{lesson.css}</code></pre></div></section>}
      {tab === "demo" && <section className="inline-demo"><h2>{locale === "zh" ? "动手改变属性" : "Change the properties"}</h2><Playground lesson={lesson} locale={locale} /></section>}
      <section className="challenge-box"><span>{read(ui.practice, locale)}</span><h2>{read(lesson.challenge, locale)}</h2><button className={done.includes(lesson.id) ? "button done" : "button"} onClick={() => toggle(lesson.id)}>{done.includes(lesson.id) ? <Check weight="bold" /> : <Play />}{done.includes(lesson.id) ? read(ui.completed, locale) : read(ui.complete, locale)}</button></section>
      <nav className="lesson-pagination">{index > 0 ? <Link to={`/${locale}/lesson/${lessons[index - 1].id}`}><ArrowLeft />{read(lessons[index - 1].title, locale)}</Link> : <span />}{index < lessons.length - 1 && <Link to={`/${locale}/lesson/${lessons[index + 1].id}`}>{read(lessons[index + 1].title, locale)}<ArrowRight /></Link>}</nav>
    </article>
    <aside className="lesson-preview"><Playground lesson={lesson} locale={locale} /></aside>
  </main></Shell>;
}

function ChallengePage() { const locale = localeOf(useParams().locale); const final = lessons[7]; return <Shell><main className="page-main"><header className="page-header"><p className="eyebrow">LAYOUT PRACTICE</p><h1>{read(ui.navChallenge, locale)}</h1><p>{read(final.summary, locale)}</p></header><section className="standalone-challenge"><div><span>{read(final.level, locale)}</span><h2>{read(final.challenge, locale)}</h2><p>{locale === "zh" ? "先搭建语义结构，再决定哪些区域使用 Grid，哪些组件使用 Flexbox。" : "Start with semantic structure, then decide which regions need Grid and which components need Flexbox."}</p><Link className="button" to={`/${locale}/lesson/final-challenge`}>{locale === "zh" ? "开始挑战" : "Start challenge"}<ArrowRight /></Link></div><Playground lesson={final} locale={locale} /></section></main><Footer locale={locale} /></Shell>; }

function About() { const locale = localeOf(useParams().locale); return <Shell><main className="page-main"><header className="page-header"><p className="eyebrow">ABOUT THE COURSE</p><h1>{read(ui.navAbout, locale)}</h1><p>{locale === "zh" ? "这个项目用可运行的小实验解释前端布局，不要求注册，也不收集个人数据。" : "This project explains front-end layout through runnable experiments. No account or personal data is required."}</p></header><section className="about-grid"><div><h2>{locale === "zh" ? "如何学习" : "How to learn"}</h2><p>{locale === "zh" ? "建议按章节前进。已有基础时，也可以直接打开 Flexbox、Grid 或响应式布局。" : "Follow the chapters in order, or jump directly to Flexbox, Grid or responsive layout."}</p></div><div><h2>{locale === "zh" ? "数据说明" : "Data"}</h2><p>{locale === "zh" ? "完成状态和偏好只保存在当前浏览器的 localStorage 中。" : "Completion state and preferences stay in this browser's localStorage."}</p></div><div><h2>{locale === "zh" ? "开放部署" : "Open deployment"}</h2><p>{locale === "zh" ? "项目完全静态，可构建后部署到 GitHub Pages。" : "The project is fully static and can be deployed to GitHub Pages after building."}</p></div></section></main><Footer locale={locale} /></Shell>; }

function Footer({ locale }: { locale: Locale }) { return <footer><strong>Layout Lab</strong><p>{locale === "zh" ? "用实验理解前端布局。" : "Understand front-end layout through experiments."}</p><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></footer>; }

export default function App() {
  const preferred = useMemo(() => localStorage.getItem("layout-lab-locale") === "en" || navigator.language.startsWith("en") ? "en" : "zh", []);
  return <Routes><Route path="/" element={<Navigate to={`/${preferred}`} replace />} /><Route path="/:locale" element={<Home />} /><Route path="/:locale/course" element={<Course />} /><Route path="/:locale/lesson/:lessonId" element={<LessonPage />} /><Route path="/:locale/challenge" element={<ChallengePage />} /><Route path="/:locale/about" element={<About />} /><Route path="*" element={<Navigate to={`/${preferred}`} replace />} /></Routes>;
}
