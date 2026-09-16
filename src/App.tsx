import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Code, Copy, Lightbulb, List, LockKey, Moon, Play, Sun, TextAlignLeft, X } from "@phosphor-icons/react";
import { lessons, stageOf, stages, t, ui, type Copy as LocalizedCopy, type DemoKind, type Lesson, type Locale } from "./data";
import { chapterQuizzes, stageQuizzes, type Quiz, type QuizQuestion } from "./quizData";

const read = (value: { zh: string; en: string }, locale: Locale) => value[locale];
const localeOf = (value?: string): Locale => (value === "en" ? "en" : "zh");

const sectionId = (lesson: Lesson) => `${lesson.id}:complete`;
const allSectionIds = lessons.map(sectionId);

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem("layout-lab-section-progress") || "[]");
    if (Array.isArray(saved) && saved.length) return lessons.filter((lesson) => saved.includes(sectionId(lesson)) || lesson.theory.every((_, index) => saved.includes(`${lesson.id}:${index + 1}`))).map(sectionId);
    const legacy = JSON.parse(localStorage.getItem("layout-lab-progress") || "[]");
    if (!Array.isArray(legacy)) return [];
    return lessons.filter((lesson) => legacy.includes(lesson.id)).map(sectionId);
  } catch { return []; }
}

function readPracticed() {
  try {
    const saved = JSON.parse(localStorage.getItem("layout-lab-practice-progress") || "[]");
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
}

function readStringList(key: string) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(saved) ? saved.filter((id): id is string => typeof id === "string") : [];
  } catch { return []; }
}

type LessonEvidence = { predicted: boolean; practiced: boolean; instantCheckPassed: boolean };

function readEvidence() {
  try {
    const saved = JSON.parse(localStorage.getItem("layout-lab-evidence") || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved) && Object.keys(saved).length) return saved as Record<string, LessonEvidence>;
  } catch { /* fall through to migration */ }
  return Object.fromEntries(readProgress().map((id) => [id.split(":")[0], { predicted: true, practiced: true, instantCheckPassed: true }]));
}

function useProgress() {
  const [sections, setSections] = useState<string[]>(readProgress);
  const [practiced, setPracticed] = useState<string[]>(readPracticed);
  const [evidence, setEvidence] = useState<Record<string, LessonEvidence>>(readEvidence);
  const [chapterPassed, setChapterPassed] = useState<string[]>(() => readStringList("layout-lab-chapter-quizzes"));
  const [stagePassed, setStagePassed] = useState<string[]>(() => readStringList("layout-lab-stage-tests"));
  useEffect(() => {
    const sync = () => {
      setSections(readProgress());
      setPracticed(readPracticed());
      setEvidence(readEvidence());
      setChapterPassed(readStringList("layout-lab-chapter-quizzes"));
      setStagePassed(readStringList("layout-lab-stage-tests"));
    };
    window.addEventListener("layout-progress", sync);
    return () => window.removeEventListener("layout-progress", sync);
  }, []);
  const complete = (id: string) => {
    if (sections.includes(id)) return;
    const next = [...sections, id];
    setSections(next);
    try { localStorage.setItem("layout-lab-section-progress", JSON.stringify(next)); } catch { /* course still works */ }
    window.dispatchEvent(new Event("layout-progress"));
  };
  const markPracticed = (lessonId: string) => {
    if (practiced.includes(lessonId)) return;
    const next = [...practiced, lessonId];
    setPracticed(next);
    try { localStorage.setItem("layout-lab-practice-progress", JSON.stringify(next)); } catch { /* course still works */ }
    window.dispatchEvent(new Event("layout-progress"));
  };
  const recordEvidence = (lessonId: string, patch: Partial<LessonEvidence>) => {
    const current = evidence[lessonId] ?? { predicted: false, practiced: false, instantCheckPassed: false };
    const next = { ...evidence, [lessonId]: { ...current, ...patch } };
    setEvidence(next);
    try { localStorage.setItem("layout-lab-evidence", JSON.stringify(next)); } catch { /* course still works */ }
    window.dispatchEvent(new Event("layout-progress"));
  };
  const markPassed = (key: "layout-lab-chapter-quizzes" | "layout-lab-stage-tests", id: string) => {
    const current = key === "layout-lab-chapter-quizzes" ? chapterPassed : stagePassed;
    if (current.includes(id)) return;
    const next = [...current, id];
    if (key === "layout-lab-chapter-quizzes") setChapterPassed(next); else setStagePassed(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* course still works */ }
    window.dispatchEvent(new Event("layout-progress"));
  };
  const toggle = (lessonId: string) => {
    if (lessonId.includes(":")) {
      const next = sections.includes(lessonId) ? sections.filter((id) => id !== lessonId) : [...sections, lessonId];
      setSections(next);
      try { localStorage.setItem("layout-lab-section-progress", JSON.stringify(next)); } catch { /* course still works */ }
      window.dispatchEvent(new Event("layout-progress"));
      return;
    }
    const lesson = lessons.find((item) => item.id === lessonId);
    if (!lesson) return;
    const ids = [sectionId(lesson)];
    const next = ids.every((id) => sections.includes(id)) ? sections.filter((id) => !ids.includes(id)) : [...new Set([...sections, ...ids])];
    setSections(next);
    try { localStorage.setItem("layout-lab-section-progress", JSON.stringify(next)); } catch { /* course still works */ }
    window.dispatchEvent(new Event("layout-progress"));
  };
  const done = lessons.filter((lesson) => sections.includes(sectionId(lesson))).map((lesson) => lesson.id);
  const nextLesson = lessons.find((lesson) => !chapterPassed.includes(lesson.id)) ?? lessons[lessons.length - 1];
  return {
    sections, done, practiced, evidence, chapterPassed, stagePassed, complete, toggle, markPracticed, recordEvidence,
    passChapter: (lessonId: string) => markPassed("layout-lab-chapter-quizzes", lessonId),
    passStage: (stageId: string) => markPassed("layout-lab-stage-tests", stageId),
    nextHref: `/lesson/${nextLesson.id}`,
    completedCount: chapterPassed.length,
    learnedCount: sections.length,
    totalCount: allSectionIds.length,
  };
}

function Shell({ children }: { children: ReactNode }) {
  const locale = localeOf(useParams().locale);
  const location = useLocation();
  const navigate = useNavigate();
  const { completedCount, totalCount, nextHref } = useProgress();
  const [dark, setDark] = useState(() => localStorage.getItem("layout-lab-theme") === "dark");

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en-US";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.title = locale === "zh" ? "Layout Lab - 前端布局实验室" : "Layout Lab - Interactive CSS Course";
    document.querySelector('meta[name="description"]')?.setAttribute("content", locale === "zh" ? "按阶段递进、每个知识点都能运行的前端布局课程。" : "A staged front-end layout course where every concept is runnable.");
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
        <Link className="nav-progress" title={read(ui.progress, locale)} to={`/${locale}${nextHref}`}>{completedCount}/{totalCount}</Link>
        <details className="mobile-menu"><summary aria-label={locale === "zh" ? "打开菜单" : "Open menu"}><List /></summary><div><Link to={`/${locale}/course`}>{read(ui.navCourse, locale)}</Link><Link to={`/${locale}/challenge`}>{read(ui.navChallenge, locale)}</Link><Link to={`/${locale}/about`}>{read(ui.navAbout, locale)}</Link></div></details>
        <button className="icon-button language" onClick={switchLocale} aria-label={locale === "zh" ? "Switch to English" : "切换到中文"}>{locale === "zh" ? "中 / EN" : "EN / 中"}</button>
        <button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? "Use light theme" : "Use dark theme"}>{dark ? <Sun /> : <Moon />}</button>
      </div>
    </header>
    {children}
  </>;
}
type DemoState = { direction: string; justify: string; gap: number; columns: number; padding: number };
const initialDemo: DemoState = { direction: "row", justify: "space-between", gap: 24, columns: 2, padding: 24 };
type TaskCondition = { label: LocalizedCopy; test: (state: DemoState) => boolean };
type DemoTask = { title: LocalizedCopy; brief: LocalizedCopy; target: DemoState; conditions: TaskCondition[]; hint: LocalizedCopy };

function taskFor(lesson: Lesson): DemoTask {
  const target = { ...initialDemo };
  if (lesson.id === "page-structure") {
    target.padding = 40;
    return { title: t("给文章留下清楚的安全边距", "Give the article a clear safe inset"), brief: t("保持四个语义区域的阅读顺序，把容器内边距调整到 40px。", "Keep the semantic reading order and set the container padding to 40px."), target, conditions: [{ label: t("padding 为 40px", "padding is 40px"), test: (s) => s.padding === 40 }], hint: t("改变容器内部留白应该使用 padding。", "Use padding to change space inside the container.") };
  }
  if (lesson.id === "box-model") {
    target.padding = 48;
    return { title: t("扩大内边距但保持卡片宽度", "Increase inner space without widening the card"), brief: t("把卡片内边距调到 48px，同时让外侧标记仍保持 280px。", "Set card padding to 48px while keeping the outer measure at 280px."), target, conditions: [{ label: t("padding 为 48px", "padding is 48px"), test: (s) => s.padding === 48 }, { label: t("总宽度仍为 280px", "total width remains 280px"), test: () => true }], hint: t("宽度能够保持，是因为示例使用了 border-box。", "The width stays fixed because the example uses border-box.") };
  }
  if (lesson.id === "flexbox") {
    Object.assign(target, { direction: "column", justify: "center", gap: 32 });
    return { title: t("把三个项目改成垂直居中的一列", "Make a centered vertical stack"), brief: t("让 A、B、C 沿垂直主轴排列，在主轴居中，并保持 32px 间距。", "Arrange A, B and C on a vertical main axis, center them, and keep a 32px gap."), target, conditions: [{ label: t("主轴为垂直方向", "main axis is vertical"), test: (s) => s.direction === "column" }, { label: t("沿主轴居中", "centered on the main axis"), test: (s) => s.justify === "center" }, { label: t("项目间距为 32px", "item gap is 32px"), test: (s) => s.gap === 32 }], hint: t("先确定主轴方向，再分别处理分布方式和固定间距。", "Set the main axis first, then handle distribution and fixed spacing.") };
  }
  if (lesson.id === "positioning") {
    target.padding = 12;
    return { title: t("把角标钉在父容器内侧", "Pin the badge inside its parent"), brief: t("让角标距离已定位父容器四边 12px，并保持在最上层。", "Place the badge 12px from its positioned parent and keep it on top."), target, conditions: [{ label: t("inset 为 12px", "inset is 12px"), test: (s) => s.padding === 12 }, { label: t("角标位于第 3 层", "badge is on layer 3"), test: () => true }], hint: t("这里的滑块对应 inset，它同时表示四个方向的偏移。", "The slider controls inset, the shorthand for four offsets.") };
  }
  if (lesson.id === "grid") {
    Object.assign(target, { columns: 3, gap: 16 });
    return { title: t("把六个项目排成两行三列", "Arrange six items in two rows of three"), brief: t("建立 3 条等宽列轨道，并把轨道间距设为 16px。", "Create three equal column tracks with a 16px gap."), target, conditions: [{ label: t("列数为 3", "three columns"), test: (s) => s.columns === 3 }, { label: t("轨道间距为 16px", "track gap is 16px"), test: (s) => s.gap === 16 }], hint: t("列数决定一行容纳几个项目，gap 只决定轨道之间的距离。", "Columns decide capacity per row; gap only controls the gutters.") };
  }
  if (lesson.id === "responsive") {
    Object.assign(target, { columns: 1, gap: 16 });
    return { title: t("把双栏内容重排为窄屏单列", "Reflow a split layout into one column"), brief: t("模拟空间不足：改成单列，并保留 16px 内容间距。", "Simulate limited space: switch to one column and keep a 16px content gap."), target, conditions: [{ label: t("内容为单列", "content uses one column"), test: (s) => s.columns === 1 }, { label: t("内容间距为 16px", "content gap is 16px"), test: (s) => s.gap === 16 }], hint: t("响应式布局优先重排内容关系，而不是把所有东西缩小。", "Responsive layout should reflow relationships before shrinking everything.") };
  }
  if (lesson.id === "patterns") {
    Object.assign(target, { padding: 32, gap: 16 });
    return { title: t("统一页面边缘与内容节奏", "Create consistent edge and content rhythm"), brief: t("把页面安全边距设为 32px，内容块之间的间距设为 16px。", "Set a 32px page inset and a 16px gap between content blocks."), target, conditions: [{ label: t("页面边距为 32px", "page inset is 32px"), test: (s) => s.padding === 32 }, { label: t("内容间距为 16px", "content gap is 16px"), test: (s) => s.gap === 16 }], hint: t("padding 管容器边缘，gap 管相邻内容块。", "Padding controls container edges; gap controls neighbouring blocks.") };
  }
  Object.assign(target, { columns: 3, gap: 32, padding: 32 });
  return { title: t("完成响应式页面骨架", "Complete the responsive page shell"), brief: t("把区域组织为 3 列，使用 32px 间距和 32px 安全边距。", "Organize the regions into three columns with a 32px gap and 32px safe inset."), target, conditions: [{ label: t("列数为 3", "three columns"), test: (s) => s.columns === 3 }, { label: t("区域间距为 32px", "region gap is 32px"), test: (s) => s.gap === 32 }, { label: t("安全边距为 32px", "safe inset is 32px"), test: (s) => s.padding === 32 }], hint: t("先保证区域关系，再统一间距尺度。", "Establish region relationships before standardizing spacing.") };
}

const DEMO_STATS = [
  { label: { zh: "访问量", en: "Visits" }, value: "12.4k", tone: "tone-1" },
  { label: { zh: "转化率", en: "Conversion" }, value: "3.8%", tone: "tone-2" },
  { label: { zh: "订单", en: "Orders" }, value: "1,204", tone: "tone-3" },
  { label: { zh: "退款", en: "Refunds" }, value: "12", tone: "tone-4" },
];

const DEMO_PROJECTS = [
  { zh: "设计系统", en: "Design system", noteZh: "组件与样式令牌", noteEn: "Components and tokens", tone: "tone-1" },
  { zh: "数据看板", en: "Analytics board", noteZh: "图表与筛选器", noteEn: "Charts and filters", tone: "tone-2" },
  { zh: "内容站点", en: "Content site", noteZh: "文章与目录", noteEn: "Articles and table of contents", tone: "tone-3" },
];

function DemoContent({ kind, locale, style }: { kind: DemoKind; locale: Locale; style?: CSSProperties }) {
  const zh = locale === "zh";
  switch (kind) {
    case "navbar":
      return <>
        <span className="demo-logo">Layout Lab</span>
        <span className="demo-link is-active">{zh ? "课程" : "Course"}</span>
        <span className="demo-link">{zh ? "挑战" : "Challenge"}</span>
        <span className="demo-link">{zh ? "说明" : "About"}</span>
        <span className="demo-cta">{zh ? "继续学习" : "Resume"}</span>
      </>;
    case "dashboard":
      return <>
        {DEMO_STATS.map((stat) => <article className={`demo-stat ${stat.tone}`} key={stat.value}>
          <span>{read(stat.label, locale)}</span>
          <strong>{stat.value}</strong>
          <i />
        </article>)}
      </>;
    case "split":
      return <>
        <section className="demo-panel demo-panel-main">
          <strong>{zh ? "主要内容" : "Main content"}</strong>
          <p>{zh ? "正文、图表和列表放在这里，窄屏下优先展示。" : "Body text, charts and lists live here and stay first on narrow screens."}</p>
        </section>
        <aside className="demo-panel demo-panel-aside">
          <strong>{zh ? "辅助内容" : "Aside"}</strong>
          <p>{zh ? "目录、推荐和筛选，空间不足时自动换到下方。" : "Table of contents, related links and filters drop below when space runs out."}</p>
        </aside>
      </>;
    case "landing":
      return <>
        <section className="demo-hero">
          <strong>{zh ? "你好，我是一名前端工程师" : "Hi, I am a front-end engineer"}</strong>
          <p>{zh ? "专注布局、可访问性与性能。" : "Focused on layout, accessibility and performance."}</p>
          <span className="demo-cta">{zh ? "查看作品" : "View work"}</span>
        </section>
        {DEMO_PROJECTS.map((project, index) => <article className={`demo-project ${project.tone}`} key={project.zh}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{zh ? project.zh : project.en}</strong>
          <p>{zh ? project.noteZh : project.noteEn}</p>
        </article>)}
      </>;
    case "project":
      return <>
        <nav className="demo-page-nav">{zh ? "项目导航" : "Project nav"}</nav>
        <section className="demo-panel demo-panel-main">
          <strong>{zh ? "项目内容" : "Project content"}</strong>
          <p>{zh ? "用 Grid 划分页面骨架，内容区自适应剩余高度。" : "Grid divides the shell while the content area takes the leftover height."}</p>
        </section>
        <footer className="demo-page-foot">{zh ? "联系方式" : "Contact"}</footer>
      </>;
    case "overlay":
      return <div className="demo-panel demo-panel-rel" style={style}>
        <span className="demo-badge">{zh ? "新" : "New"}</span>
        <strong>{zh ? "内容面板" : "Content panel"}</strong>
        <p>{zh ? "角标以这个面板为参照，而不是整个页面。" : "The badge references this panel, not the whole page."}</p>
      </div>;
    case "card":
      return <article className="demo-card" style={style}>
        <span className="demo-chip">{zh ? "组件" : "Component"}</span>
        <strong>{zh ? "内容卡片" : "Content card"}</strong>
        <p>{zh ? "改变内边距，观察内容与边框之间的空间。" : "Change the padding to see the space between content and border."}</p>
        <span className="demo-foot">{zh ? "固定宽度 280px" : "Fixed width 280px"}</span>
      </article>;
    default:
      return <article className="demo-article" style={style}>
        <header>
          <span className="demo-chip">{zh ? "入门" : "Starter"}</span>
          <strong>{zh ? "如何理解文档流" : "Understanding normal flow"}</strong>
          <em>{zh ? "8 分钟阅读" : "8 min read"}</em>
        </header>
        <p>{zh ? "块级元素默认独占一行，从页面顶部向底部依次排列。" : "Block elements take a full row and stack from the top of the page downwards."}</p>
        <aside className="demo-aside">
          <span>{zh ? "相关：盒模型" : "Related: Box model"}</span>
          <span>{zh ? "相关：Flexbox" : "Related: Flexbox"}</span>
        </aside>
      </article>;
  }
}
function Playground({ lesson, locale, compact = false }: { lesson: Lesson; locale: Locale; compact?: boolean }) {
  const [state, setState] = useState(initialDemo);
  const [copied, setCopied] = useState(false);
  const zh = locale === "zh";

  const stageStyle: CSSProperties | undefined = (() => {
    switch (lesson.demo) {
      case "navbar":
        return { display: "flex", alignItems: "center", flexDirection: state.direction as "row" | "column", justifyContent: state.justify, gap: state.gap };
      case "dashboard":
      case "split":
        return { display: "grid", gridTemplateColumns: `repeat(${state.columns}, minmax(0, 1fr))`, gap: state.gap };
      case "landing":
        return { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: state.gap, padding: state.padding };
      case "project":
        return { display: "grid", gridTemplateColumns: `repeat(${state.columns}, minmax(0, 1fr))`, gap: state.gap, padding: state.padding };
      default:
        return undefined;
    }
  })();

  const innerStyle: CSSProperties | undefined =
    lesson.demo === "article" || lesson.demo === "card" || lesson.demo === "overlay" ? { padding: state.padding } : undefined;

  const generated = useMemo(() => {
    const lines: string[] = [];
    if (lesson.demo === "navbar") {
      lines.push("display: flex;", "align-items: center;", `flex-direction: ${state.direction};`, `justify-content: ${state.justify};`, `gap: ${state.gap}px;`);
    } else if (lesson.demo === "dashboard" || lesson.demo === "split" || lesson.demo === "project") {
      lines.push("display: grid;", `grid-template-columns: repeat(${state.columns}, minmax(0, 1fr));`, `gap: ${state.gap}px;`);
      if (lesson.demo === "project") lines.push(`padding: ${state.padding}px;`);
    } else if (lesson.demo === "landing") {
      lines.push("display: grid;", "grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));", `gap: ${state.gap}px;`, `padding: ${state.padding}px;`);
    } else {
      lines.push("box-sizing: border-box;", `padding: ${state.padding}px;`);
    }
    return lines.join("\n");
  }, [lesson.demo, state]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { setCopied(false); }
  };

  return <div className={`playground ${compact ? "playground-compact" : ""}`}>
    <div className="preview-head"><span>{zh ? "实时预览" : "Live preview"}</span><span className="viewport-label">{lesson.demo === "navbar" ? (zh ? "组件" : "Component") : (zh ? "容器" : "Container")}</span></div>
    <div className="preview-stage" style={stageStyle}><DemoContent kind={lesson.demo} locale={locale} style={innerStyle} /></div>
    <div className="controls">
      {lesson.controls.includes("direction") && <label>flex-direction<select value={state.direction} onChange={(e) => setState({ ...state, direction: e.target.value })}><option>row</option><option>column</option><option>row-reverse</option><option>column-reverse</option></select></label>}
      {lesson.controls.includes("justify") && <label>justify-content<select value={state.justify} onChange={(e) => setState({ ...state, justify: e.target.value })}><option>center</option><option>flex-start</option><option>flex-end</option><option>space-between</option><option>space-around</option></select></label>}
      {lesson.controls.includes("columns") && <label>{zh ? "列数" : "Columns"}<input type="range" min="1" max="4" value={state.columns} onChange={(e) => setState({ ...state, columns: Number(e.target.value) })} /><output>{state.columns}</output></label>}
      {lesson.controls.includes("gap") && <label>gap<input type="range" min="0" max="48" value={state.gap} onChange={(e) => setState({ ...state, gap: Number(e.target.value) })} /><output>{state.gap}px</output></label>}
      {lesson.controls.includes("padding") && <label>padding<input type="range" min="0" max="56" value={state.padding} onChange={(e) => setState({ ...state, padding: Number(e.target.value) })} /><output>{state.padding}px</output></label>}
    </div>
    {!compact && <><pre className="generated"><code>{generated}</code></pre><div className="control-actions"><button className="text-button" onClick={copy}><Copy />{copied ? read(ui.copied, locale) : read(ui.copy, locale)}</button><button className="text-button" onClick={() => setState(initialDemo)}>{read(ui.reset, locale)}</button></div></>}
  </div>;
}

function Diagram({ kind, state }: { kind: DemoKind; state: DemoState }) {
  const cells = ["A", "B", "C", "D", "E", "F"];
  if (kind === "navbar") return <div className={`diagram-flex ${state.direction.includes("column") ? "is-column" : ""}`} style={{ flexDirection: state.direction as CSSProperties["flexDirection"], justifyContent: state.justify, gap: state.gap }}><span className="axis axis-main">main axis</span><span className="axis axis-cross">cross axis</span>{cells.slice(0, 3).map((cell) => <i key={cell}>{cell}</i>)}</div>;
  if (kind === "dashboard") return <div className="diagram-grid" style={{ gridTemplateColumns: `repeat(${state.columns}, minmax(0, 1fr))`, gap: state.gap }}>{cells.map((cell) => <i key={cell}>{cell}</i>)}</div>;
  if (kind === "split") return <div className="diagram-viewport" style={{ paddingInline: state.padding }}><span className="viewport-ruler">{Math.max(320, 760 - state.padding * 8)}px</span><div className="diagram-split" style={{ gridTemplateColumns: state.columns === 1 ? "1fr" : "2fr 1fr", gap: state.gap }}><i>A</i><i>B</i></div></div>;
  if (kind === "landing") return <div className="diagram-pattern" style={{ padding: state.padding, gap: state.gap }}><i className="wide">A</i>{cells.slice(1, 5).map((cell) => <i key={cell}>{cell}</i>)}</div>;
  if (kind === "project") {
    const projectStyle = state.columns === 1 ? { gridTemplateAreas: '"head" "main" "side" "foot"', gridTemplateColumns: "1fr" } : state.columns >= 3 ? { gridTemplateAreas: '"head head head" "main main side" "foot foot foot"', gridTemplateColumns: "repeat(3, 1fr)" } : undefined;
    return <div className="diagram-project" style={{ padding: state.padding, gap: state.gap, ...projectStyle }}><i className="project-head">A</i><i className="project-main">B</i><i className="project-side">C</i><i className="project-foot">D</i></div>;
  }
  if (kind === "overlay") return <div className="diagram-position"><span className="reference-line">positioned parent</span><i className="layer layer-one">1</i><i className="layer layer-two">2</i><i className="layer layer-three">3</i><b style={{ inset: state.padding }}>{state.padding}px</b></div>;
  if (kind === "card") return <div className="box-measure"><span>280px</span><div className="box-margin"><small>margin</small><div className="box-border"><small>border</small><div className="box-padding" style={{ padding: Math.max(10, state.padding / 2) }}><small>padding {state.padding}px</small><i>content</i></div></div></div></div>;
  return <div className="diagram-document" style={{ padding: state.padding }}><i>HEADER</i><i className="document-main">MAIN</i><i>ASIDE</i><i>FOOTER</i></div>;
}

function demoExplanation(lesson: Lesson, state: DemoState, locale: Locale) {
  const zh = locale === "zh";
  if (lesson.demo === "navbar") return zh ? `主轴为${state.direction.includes("column") ? "垂直" : "水平"}方向，项目按 ${state.justify} 分配空间，间距为 ${state.gap}px。` : `The main axis is ${state.direction.includes("column") ? "vertical" : "horizontal"}; items use ${state.justify} with a ${state.gap}px gap.`;
  if (lesson.demo === "dashboard") return zh ? `${state.columns} 条等宽轨道承载 6 个项目，轨道间距为 ${state.gap}px。` : `${state.columns} equal tracks hold six items with a ${state.gap}px gap.`;
  if (lesson.demo === "split") return zh ? `当前示意为 ${state.columns === 1 ? "单列" : "2:1 双列"}，缩窄时辅助区应移到主内容下方。` : `The diagram is ${state.columns === 1 ? "one column" : "a 2:1 split"}; the aside should drop below when narrow.`;
  if (lesson.demo === "landing") return zh ? `统一的 ${state.padding}px 安全边距和 ${state.gap}px 间距建立页面节奏。` : `A shared ${state.padding}px inset and ${state.gap}px gap create the page rhythm.`;
  if (lesson.demo === "project") return zh ? "页面被拆成导航、主内容、侧栏和页脚四个区域，再分别选择布局工具。" : "The page is split into navigation, main, aside and footer before choosing a layout tool.";
  if (lesson.demo === "overlay") return zh ? `角标以实线父容器为参照，距离四边 ${state.padding}px；编号越大越靠上。` : `The badge references the solid parent at ${state.padding}px; larger layer numbers sit on top.`;
  if (lesson.demo === "card") return zh ? `border-box 把 ${state.padding}px 内边距计入声明的 280px 宽度，盒子不会继续变宽。` : `border-box includes ${state.padding}px padding inside the declared 280px width.`;
  return zh ? `四个语义区域保持正常文档流，容器内侧保留 ${state.padding}px 安全边距。` : `Four semantic regions stay in normal flow with a ${state.padding}px safe inset.`;
}

function ConceptPlayground({ lesson, locale, onChange }: { lesson: Lesson; locale: Locale; onChange?: (state: DemoState) => void }) {
  const [state, setState] = useState(initialDemo);
  const [copied, setCopied] = useState(false);
  const zh = locale === "zh";
  const task = taskFor(lesson);
  const passed = task.conditions.every((condition) => condition.test(state));
  const firstMissing = task.conditions.find((condition) => !condition.test(state));
  const generated = useMemo(() => {
    if (lesson.demo === "navbar") return `display: flex;\nflex-direction: ${state.direction};\njustify-content: ${state.justify};\ngap: ${state.gap}px;`;
    if (lesson.demo === "dashboard") return `display: grid;\ngrid-template-columns: repeat(${state.columns}, minmax(0, 1fr));\ngap: ${state.gap}px;`;
    if (lesson.demo === "split") return `display: grid;\ngrid-template-columns: ${state.columns === 1 ? "1fr" : "2fr 1fr"};\ngap: ${state.gap}px;`;
    if (lesson.demo === "landing") return `display: grid;\ngrid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\ngap: ${state.gap}px;\npadding: ${state.padding}px;`;
    if (lesson.demo === "project") return `display: grid;\ngrid-template-columns: repeat(${state.columns}, minmax(0, 1fr));\ngrid-template-areas: "head head head" "main main side" "foot foot foot";\ngap: ${state.gap}px;\npadding: ${state.padding}px;`;
    if (lesson.demo === "overlay") return `position: absolute;\ninset: ${state.padding}px;\nz-index: 3;`;
    if (lesson.demo === "card") return `box-sizing: border-box;\nwidth: 280px;\npadding: ${state.padding}px;`;
    return `max-width: 720px;\nmargin-inline: auto;\npadding: ${state.padding}px;`;
  }, [lesson.demo, state]);
  const copy = async () => {
    try { await navigator.clipboard.writeText(generated); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch { setCopied(false); }
  };
  const update = (next: DemoState) => { setState(next); onChange?.(next); };
  return <div className="playground concept-playground">
    <div className="preview-head"><span>{zh ? "目标与当前结果" : "Target and current result"}</span><span className="viewport-label">{read(lesson.title, locale)}</span></div>
    <div className="compare-board"><div className="compare-pane"><span>{zh ? "目标效果" : "Target"}</span><div className={`preview-stage board-${lesson.demo}`}><Diagram kind={lesson.demo} state={task.target} /></div></div><div className="compare-pane"><span>{zh ? "当前效果" : "Current"}</span><div className={`preview-stage board-${lesson.demo}`}><Diagram kind={lesson.demo} state={state} /></div></div></div>
    <div className="controls">
      {lesson.controls.includes("direction") && <label>flex-direction<select value={state.direction} onChange={(e) => update({ ...state, direction: e.target.value })}><option>row</option><option>column</option><option>row-reverse</option><option>column-reverse</option></select></label>}
      {lesson.controls.includes("justify") && <label>justify-content<select value={state.justify} onChange={(e) => update({ ...state, justify: e.target.value })}><option>center</option><option>flex-start</option><option>flex-end</option><option>space-between</option><option>space-around</option></select></label>}
      {lesson.controls.includes("columns") && <label>{zh ? "列数 columns" : "Columns"}<input type="range" min="1" max="4" value={state.columns} onChange={(e) => update({ ...state, columns: Number(e.target.value) })} /><output>{state.columns}</output></label>}
      {lesson.controls.includes("gap") && <label>gap<input type="range" min="0" max="48" value={state.gap} onChange={(e) => update({ ...state, gap: Number(e.target.value) })} /><output>{state.gap}px</output></label>}
      {lesson.controls.includes("padding") && <label>{lesson.demo === "overlay" ? "inset" : "padding"}<input type="range" min="0" max="56" value={state.padding} onChange={(e) => update({ ...state, padding: Number(e.target.value) })} /><output>{state.padding}px</output></label>}
    </div>
    <div className={`task-result ${passed ? "passed" : ""}`} aria-live="polite"><strong>{passed ? (zh ? "目标已达到" : "Target reached") : (zh ? "还差一步" : "One step remains")}</strong><p>{passed ? (zh ? "当前布局满足全部条件，可以进入解释题。" : "The current layout meets every condition. Continue to the explanation check.") : `${zh ? "当前未满足：" : "Still missing: "}${read(firstMissing?.label ?? task.conditions[0].label, locale)}`}</p><ul>{task.conditions.map((condition) => <li className={condition.test(state) ? "met" : ""} key={condition.label.zh}>{condition.test(state) && <Check />}{read(condition.label, locale)}</li>)}</ul><details><summary>{zh ? "需要提示" : "Need a hint"}</summary><p>{read(task.hint, locale)}</p></details></div>
    <p className="change-explanation" aria-live="polite">{demoExplanation(lesson, state, locale)}</p>
    <details className="generated-details"><summary>{zh ? "查看对应 CSS" : "View the CSS"}</summary><pre className="generated"><code>{generated}</code></pre></details>
    <div className="control-actions"><button className="text-button" onClick={() => update(initialDemo)}>{read(ui.reset, locale)}</button><button className="text-button" onClick={copy}><Copy />{copied ? read(ui.copied, locale) : read(ui.copy, locale)}</button></div>
  </div>;
}
function Home() {
  const locale = localeOf(useParams().locale);
  const zh = locale === "zh";
  const { done, practiced, chapterPassed, stagePassed, completedCount, totalCount, nextHref } = useProgress();
  const nextParts = nextHref.match(/\/lesson\/([^?]+)/);
  const nextLesson = lessons.find((item) => item.id === nextParts?.[1]) ?? lessons[0];

  return <Shell>
    <main className="dashboard-home">
      <section className="learning-dashboard">
        <div className="dashboard-summary">
          <p>{zh ? "前端布局学习路径" : "Front-end layout path"}</p>
          <h1>{zh ? "接着上次的位置继续" : "Continue where you left off"}</h1>
          <span>{zh ? `已完成 ${completedCount} / ${totalCount} 章` : `${completedCount} of ${totalCount} lessons complete`}</span>
        </div>
        <div className="next-task">
          <span>{completedCount ? (zh ? "继续学习" : "Continue") : (zh ? "从这里开始" : "Start here")}</span>
          <strong>{String(nextLesson.order).padStart(2, "0")} · {read(nextLesson.title, locale)}</strong>
          <p>{read(nextLesson.summary, locale)}</p>
          <small>{read(nextLesson.duration, locale)}</small>
          <Link className="button" to={`/${locale}${nextHref}`}>{completedCount ? read(ui.continue, locale) : read(ui.start, locale)}<ArrowRight /></Link>
        </div>
      </section>

      <section className="chapter-section home-path">
        <div className="section-heading"><h2>{read(ui.path, locale)}</h2><p>{zh ? "按顺序学习，也可以直接进入需要复习的章节。" : "Follow the path or jump directly to a topic you need to review."}</p></div>
        <ChapterList locale={locale} done={done} practiced={practiced} chapterPassed={chapterPassed} stagePassed={stagePassed} />
      </section>
    </main>
    <Footer locale={locale} />
  </Shell>;
}

function ChapterList({ locale, done, practiced, chapterPassed, stagePassed }: { locale: Locale; done: string[]; practiced: string[]; chapterPassed: string[]; stagePassed: string[] }) {
  return <div className="chapter-groups">
    {stages.map((stage) => {
      const items = lessons.filter((item) => item.stage === stage.key);
      if (items.length === 0) return null;
      return <section className="chapter-group" key={stage.key}>
        <header className="chapter-group-head">
          <span className="stage-index">{String(stages.indexOf(stage) + 1).padStart(2, "0")}</span>
          <h3>{read(stage.name, locale)}</h3>
          <p>{read(stage.desc, locale)}</p>
          <span className="stage-count">{locale === "zh" ? `${items.filter((item) => chapterPassed.includes(item.id)).length} / ${items.length} 章通过` : `${items.filter((item) => chapterPassed.includes(item.id)).length} / ${items.length} passed`}</span>
        </header>
        <ol className="chapter-rows">
          {items.map((lesson) => <li key={lesson.id}>
            <Link className={`chapter-row ${chapterPassed.includes(lesson.id) ? "is-done" : done.includes(lesson.id) ? "is-learned" : ""}`} to={`/${locale}/lesson/${lesson.id}`}>
              <span className="chapter-num">{String(lesson.order).padStart(2, "0")}</span>
              <span className="chapter-main">
                <strong>{read(lesson.title, locale)}</strong>
                <em>{read(lesson.summary, locale)}</em>
              </span>
              <span className="chapter-meta">
                <span>{lesson.keyPoints.length} {read(ui.pointsCount, locale)}</span>
                <span>{read(lesson.duration, locale)}</span>
              </span>
              <span className="chapter-state">{chapterPassed.includes(lesson.id) ? <><Check weight="bold" />{locale === "zh" ? "小测通过" : "Quiz passed"}</> : done.includes(lesson.id) ? (locale === "zh" ? "待完成小测" : "Quiz next") : practiced.includes(lesson.id) ? (locale === "zh" ? "学习中" : "Learning") : <ArrowRight />}</span>
            </Link>
          </li>)}
        </ol>
        <Link className={`stage-test-link ${stagePassed.includes(stage.key) ? "is-passed" : ""} ${items.every((item) => chapterPassed.includes(item.id)) ? "is-unlocked" : ""}`} to={`/${locale}/stage/${stage.key}/test`}><span>{stagePassed.includes(stage.key) ? <Check weight="bold" /> : <LockKey />}</span><div><strong>{locale === "zh" ? `${read(stage.name, locale)}阶段综合测试` : `${read(stage.name, locale)} stage test`}</strong><small>{stagePassed.includes(stage.key) ? (locale === "zh" ? "已通过 · 可重新练习" : "Passed · practise again") : items.every((item) => chapterPassed.includes(item.id)) ? (locale === "zh" ? "已开放 · 约 10 题" : "Unlocked · about 10 questions") : (locale === "zh" ? "通过本阶段章末小测后开放" : "Unlocks after both chapter quizzes")}</small></div><ArrowRight /></Link>
      </section>;
    })}
  </div>;
}

function Course() {
  const locale = localeOf(useParams().locale);
  const { done, practiced, chapterPassed, stagePassed } = useProgress();
  return <Shell><main className="page-main">
    <header className="page-header">
      <p className="eyebrow">LAYOUT CURRICULUM</p>
      <h1>{read(ui.navCourse, locale)}</h1>
      <p>{locale === "zh" ? "8 个章节按四个阶段推进，从页面结构一直到完整的响应式项目。" : "Eight chapters across four stages, from page structure to a complete responsive project."}</p>
    </header>
    <ChapterList locale={locale} done={done} practiced={practiced} chapterPassed={chapterPassed} stagePassed={stagePassed} />
  </main><Footer locale={locale} /></Shell>;
}
function LessonPage() {
  const { locale: raw, lessonId } = useParams();
  const locale = localeOf(raw);
  const zh = locale === "zh";
  const lesson = lessons.find((item) => item.id === lessonId);
  const { done, toggle } = useProgress();
  const [tab, setTab] = useState<"theory" | "code" | "demo">("theory");

  if (!lesson) {
    return <Shell><main className="page-main"><header className="page-header">
      <h1>{read(ui.notFound, locale)}</h1>
      <Link className="button" to={`/${locale}/course`}>{read(ui.backToCourse, locale)}</Link>
    </header></main><Footer locale={locale} /></Shell>;
  }

  const index = lessons.indexOf(lesson);
  const prev = index > 0 ? lessons[index - 1] : undefined;
  const next = index < lessons.length - 1 ? lessons[index + 1] : undefined;
  const stage = stageOf(lesson.stage);

  return <Shell><main className="lesson-shell">
    <aside className="lesson-nav">
      <Link className="back-link" to={`/${locale}/course`}><ArrowLeft />{read(ui.back, locale)}</Link>
      <div className="lesson-progress"><span>{read(ui.progress, locale)}</span><strong>{done.length} / {lessons.length}</strong></div>
      <nav className="lesson-list">
        {stages.map((item) => {
          const group = lessons.filter((entry) => entry.stage === item.key);
          return <div className="lesson-list-group" key={item.key}>
            <p>{read(item.name, locale)}</p>
            {group.map((entry) => <Link className={entry.id === lesson.id ? "active" : ""} key={entry.id} to={`/${locale}/lesson/${entry.id}`}>
              <span>{String(entry.order).padStart(2, "0")}</span>{read(entry.title, locale)}{done.includes(entry.id) && <Check weight="bold" />}
            </Link>)}
          </div>;
        })}
      </nav>
    </aside>

    <article className="lesson-content">
      <div className="lesson-title">
        <div className="lesson-meta">
          <span className="tag">{read(stage.name, locale)}</span>
          <span>{lesson.order} / {lessons.length} {read(ui.chapter, locale)}</span>
          <span>{read(lesson.duration, locale)}</span>
          <span>{lesson.keyPoints.length} {read(ui.pointsCount, locale)}</span>
        </div>
        <h1>{read(lesson.title, locale)}</h1>
        <p className="lesson-goal"><strong>{read(ui.goalLabel, locale)}</strong>{read(lesson.goal, locale)}</p>
      </div>

      <div className="lesson-tabs" role="tablist">
        {(["theory", "code", "demo"] as const).map((item) => <button role="tab" aria-selected={tab === item} className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>
          {item === "theory" ? <TextAlignLeft /> : item === "code" ? <Code /> : <Play />}{read(ui[item], locale)}
        </button>)}
      </div>

      {tab === "theory" && <section className="prose">
        <div className="objectives">
          <h2>{read(ui.objectives, locale)}</h2>
          <ul>{lesson.objectives.map((item) => <li key={item.zh}>{read(item, locale)}</li>)}</ul>
        </div>
        <div className="theory-blocks">
          {lesson.theory.map((block, blockIndex) => <section key={block.heading.zh}>
            <h3><span>{String(blockIndex + 1).padStart(2, "0")}</span>{read(block.heading, locale)}</h3>
            <p>{read(block.body, locale)}</p>
          </section>)}
        </div>
        <div className="keypoints">
          <h2>{read(ui.keyPoints, locale)}</h2>
          <p>{read(ui.keyPointsHint, locale)}</p>
          <dl>{lesson.keyPoints.map((point) => <div key={point.term}>
            <dt><code>{point.term}</code></dt>
            <dd>{read(point.desc, locale)}</dd>
          </div>)}</dl>
        </div>
        <div className="mistakes">
          <h2>{read(ui.mistakes, locale)}</h2>
          <ul>{lesson.mistakes.map((item) => <li key={item.zh}>{read(item, locale)}</li>)}</ul>
        </div>
      </section>}
      {tab === "code" && <section className="code-section">
        <h2>{read(ui.code, locale)}</h2>
        <p>{zh ? "HTML 建立结构，CSS 决定这一章关注的布局行为。先整体读一遍，再对照下面的练习逐步动手。" : "HTML builds the structure; CSS drives the layout behaviour this chapter focuses on. Read it once, then work through the practice steps below."}</p>
        <div className="code-block">
          <div>HTML</div>
          <pre><code>{lesson.html}</code></pre>
        </div>
        <div className="code-block accent-code">
          <div>CSS</div>
          <pre><code>{lesson.css}</code></pre>
        </div>
        <div className="practice-steps">
          <h2>{read(ui.practice, locale)}</h2>
          <ol>{lesson.practice.map((item, stepIndex) => <li key={item.zh}>
            <span>{String(stepIndex + 1).padStart(2, "0")}</span>
            <p>{read(item, locale)}</p>
          </li>)}</ol>
        </div>
      </section>}

      {tab === "demo" && <section className="inline-demo">
        <h2>{read(ui.demo, locale)}</h2>
        <p>{read(ui.demoHint, locale)}</p>
        <Playground lesson={lesson} locale={locale} />
      </section>}

      <section className="challenge-box">
        <span>{read(ui.tryIt, locale)}</span>
        <h2>{read(lesson.challenge, locale)}</h2>
        <button className={done.includes(lesson.id) ? "button done" : "button"} onClick={() => toggle(lesson.id)}>
          {done.includes(lesson.id) ? <Check weight="bold" /> : <Play />}
          {done.includes(lesson.id) ? read(ui.completed, locale) : read(ui.complete, locale)}
        </button>
      </section>

      <nav className="lesson-pagination">
        {prev ? <Link to={`/${locale}/lesson/${prev.id}`}><ArrowLeft />{read(prev.title, locale)}</Link> : <span />}
        {next && <Link to={`/${locale}/lesson/${next.id}`}>{read(next.title, locale)}<ArrowRight /></Link>}
      </nav>
    </article>

    <aside className="lesson-preview"><Playground lesson={lesson} locale={locale} /></aside>
  </main></Shell>;
}

type LearningActivity = {
  prediction: LocalizedCopy;
  predictionOptions: LocalizedCopy[];
  predictionAnswer: number;
  check: LocalizedCopy;
  checkOptions: LocalizedCopy[];
  checkAnswer: number;
};

function activityFor(lesson: Lesson): LearningActivity {
  const common = {
    predictionOptions: [t("尺寸", "Size"), t("排列与位置", "Arrangement and position"), t("文字内容", "Text content")],
    checkOptions: [t("给文字加颜色", "Color the text"), t("修改布局关系", "Change the layout relationship"), t("更换页面内容", "Replace the page content")],
    predictionAnswer: 1,
    checkAnswer: 1,
  };
  if (lesson.id === "page-structure") return { ...common, prediction: t("块级元素默认最先改变哪一项？", "What do block elements change first by default?"), check: t("要让页面区域按正常文档流上下排列，应该做什么？", "What should you do to keep page regions stacked in normal flow?") };
  if (lesson.id === "box-model") return { prediction: t("在默认 content-box 中增加 padding，盒子的总宽度会怎样？", "With content-box, what happens to total width when padding grows?"), predictionOptions: [t("保持不变", "Stay fixed"), t("继续增大", "Grow"), t("变成零", "Become zero")], predictionAnswer: 1, check: t("哪条规则能让 padding 计入声明宽度？", "Which rule includes padding in the declared width?"), checkOptions: [t("display: block", "display: block"), t("box-sizing: border-box", "box-sizing: border-box"), t("margin: auto", "margin: auto")], checkAnswer: 1 };
  if (lesson.id === "flexbox") return { prediction: t("flex-direction 改为 column 后，主轴朝向哪里？", "Where does the main axis point after flex-direction becomes column?"), predictionOptions: [t("垂直", "Vertical"), t("水平", "Horizontal"), t("没有主轴", "There is no axis")], predictionAnswer: 0, check: t("哪个属性沿主轴分配剩余空间？", "Which property distributes free space along the main axis?"), checkOptions: [t("align-items", "align-items"), t("justify-content", "justify-content"), t("font-size", "font-size")], checkAnswer: 1 };
  if (lesson.id === "positioning") return { prediction: t("absolute 元素通常以谁作为定位参照？", "What usually becomes the reference for an absolute element?"), predictionOptions: [t("最近的已定位祖先", "Nearest positioned ancestor"), t("文字行", "The text line"), t("任意兄弟元素", "Any sibling")], predictionAnswer: 0, check: t("要让角标钉在卡片内部，卡片通常需要哪条规则？", "Which rule usually keeps a badge anchored inside a card?"), checkOptions: [t("position: relative", "position: relative"), t("display: inline", "display: inline"), t("overflow: visible", "overflow: visible")], checkAnswer: 0 };
  if (lesson.id === "grid") return { prediction: t("增加网格列数后，同一行通常会发生什么？", "What usually happens in a row when grid columns increase?"), predictionOptions: [t("容纳更多项目", "It holds more items"), t("项目全部消失", "Items disappear"), t("文字自动加粗", "Text becomes bold")], predictionAnswer: 0, check: t("哪个声明建立等宽网格列？", "Which declaration creates equal grid columns?"), checkOptions: [t("display: inline", "display: inline"), t("grid-template-columns", "grid-template-columns"), t("text-align", "text-align")], checkAnswer: 1 };
  if (lesson.id === "responsive") return { prediction: t("容器变窄且空间不足时，辅助栏应如何处理？", "When the container becomes too narrow, what should happen to the aside?"), predictionOptions: [t("移到主内容下方", "Move below the main content"), t("覆盖主内容", "Cover the main content"), t("强制撑宽页面", "Force the page wider")], predictionAnswer: 0, check: t("响应式断点应该由什么决定？", "What should determine a responsive breakpoint?"), checkOptions: [t("设备品牌", "Device brand"), t("内容开始无法正常呈现的位置", "Where content stops working"), t("随机整数", "A random integer")], checkAnswer: 1 };
  if (lesson.id === "patterns") return { prediction: t("规则卡片数量不确定时，哪种布局更适合自动换列？", "Which layout is better when an unknown number of cards must create columns automatically?"), predictionOptions: [t("Grid", "Grid"), t("绝对定位", "Absolute positioning"), t("连续 br", "Repeated br tags")], predictionAnswer: 0, check: t("选择布局工具时应该先看什么？", "What should you inspect before choosing a layout tool?"), checkOptions: [t("内容关系", "Content relationships"), t("流行效果", "Popular effects"), t("颜色数量", "Number of colors")], checkAnswer: 0 };
  return { prediction: t("页面外壳最先应该拆成什么？", "What should the page shell be split into first?"), predictionOptions: [t("内容区域", "Content regions"), t("动画帧", "Animation frames"), t("颜色主题", "Color themes")], predictionAnswer: 0, check: t("完整页面通常应如何选择布局工具？", "How should a complete page choose layout tools?"), checkOptions: [t("整页只用一种", "Use one for everything"), t("按区域关系分别选择", "Choose per region relationship"), t("全部绝对定位", "Absolutely position everything")], checkAnswer: 1 };
}

function keyPointFor(lesson: Lesson, index: number) {
  const indexes: Record<string, number[]> = {
    "page-structure": [0, 2, 3, 4],
    "box-model": [2, 0, 4, 5],
    flexbox: [0, 1, 4, 5],
    positioning: [0, 1, 3, 5],
    grid: [0, 1, 5, 6],
    responsive: [3, 0, 1, 4],
    patterns: [0, 1, 2, 4],
    "final-challenge": [0, 1, 2, 3],
  };
  return lesson.keyPoints[indexes[lesson.id]?.[index] ?? index % lesson.keyPoints.length];
}

function readQuizDraft(quizId: string) {
  try {
    const saved = JSON.parse(localStorage.getItem(`layout-lab-quiz-draft:${quizId}`) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(Object.entries(saved).filter(([, value]) => typeof value === "number")) as Record<string, number>;
  } catch { return {}; }
}

function QuizQuestionView({ question, index, locale, answer, submitted, onAnswer }: { question: QuizQuestion; index: number; locale: Locale; answer?: number; submitted: boolean; onAnswer: (answer: number) => void }) {
  const correct = submitted && answer === question.answer;
  const wrong = submitted && answer !== undefined && answer !== question.answer;
  return <fieldset className={`quiz-question ${correct ? "is-correct" : ""} ${wrong ? "is-wrong" : ""}`}>
    <legend><span>{String(index + 1).padStart(2, "0")}</span>{read(question.prompt, locale)}</legend>
    <div className="quiz-options">
      {question.options.map((option, optionIndex) => <label className={answer === optionIndex ? "selected" : ""} key={option.zh}>
        <input type="radio" name={question.id} checked={answer === optionIndex} disabled={correct} onChange={() => onAnswer(optionIndex)} />
        <i aria-hidden="true" />
        <span>{read(option, locale)}</span>
      </label>)}
    </div>
    {wrong && <p className="quiz-hint"><Lightbulb weight="fill" /><span><b>{locale === "zh" ? "提示" : "Hint"}</b>{read(question.hint, locale)} <em>{locale === "zh" ? `回顾：${read(question.concept, locale)}` : `Review: ${read(question.concept, locale)}`}</em></span></p>}
    {correct && <p className="quiz-correct"><Check weight="bold" />{locale === "zh" ? "回答正确" : "Correct"}</p>}
  </fieldset>;
}

function QuizPanel({ quiz, locale, passed, onPass, title, intro }: { quiz: Quiz; locale: Locale; passed: boolean; onPass: () => void; title: string; intro: string }) {
  const [answers, setAnswers] = useState<Record<string, number>>(() => readQuizDraft(quiz.id));
  const [submitted, setSubmitted] = useState(false);
  const answeredCount = quiz.questions.filter((question) => answers[question.id] !== undefined).length;
  const correctCount = quiz.questions.filter((question) => answers[question.id] === question.answer).length;
  const remaining = quiz.questions.length - answeredCount;
  const answer = (questionId: string, value: number) => {
    const next = { ...answers, [questionId]: value };
    setAnswers(next);
    try { localStorage.setItem(`layout-lab-quiz-draft:${quiz.id}`, JSON.stringify(next)); } catch { /* quiz still works */ }
  };
  const submit = () => {
    setSubmitted(true);
    if (correctCount === quiz.questions.length) onPass();
  };
  const retry = () => {
    setAnswers({});
    setSubmitted(false);
    try { localStorage.removeItem(`layout-lab-quiz-draft:${quiz.id}`); } catch { /* quiz still works */ }
  };
  return <section className="quiz-panel" id={quiz.kind === "chapter" ? "chapter-quiz" : undefined}>
    <header className="quiz-header">
      <div><span>{quiz.kind === "chapter" ? (locale === "zh" ? "章末小测" : "Chapter quiz") : (locale === "zh" ? "阶段综合测试" : "Stage test")}</span><h2>{title}</h2><p>{intro}</p></div>
      <strong>{answeredCount} / {quiz.questions.length}</strong>
    </header>
    {passed && <div className="quiz-passed"><Check weight="bold" /><span><b>{locale === "zh" ? "已经通过" : "Passed"}</b>{locale === "zh" ? "通过记录会保留，你仍可以重新练习。" : "Your pass is saved, and you can still practise again."}</span><button className="text-button" onClick={retry}>{locale === "zh" ? "再练一次" : "Practise again"}</button></div>}
    <div className="quiz-questions">
      {quiz.questions.map((question, index) => <QuizQuestionView question={question} index={index} locale={locale} answer={answers[question.id]} submitted={submitted} onAnswer={(value) => answer(question.id, value)} key={question.id} />)}
    </div>
    <div className="quiz-submit">
      <button className="button" disabled={remaining > 0} onClick={submit}><Play />{locale === "zh" ? "提交全部答案" : "Submit all answers"}</button>
      <p>{remaining > 0 ? (locale === "zh" ? `还剩 ${remaining} 题未作答` : `${remaining} unanswered`) : submitted && correctCount < quiz.questions.length ? (locale === "zh" ? `还有 ${quiz.questions.length - correctCount} 题需要修改` : `${quiz.questions.length - correctCount} answers need revision`) : (locale === "zh" ? "全对后即可通过" : "Answer all correctly to pass")}</p>
    </div>
  </section>;
}

function SectionActivity({ lesson, locale, isDone, savedEvidence, onComplete, onEvidence, demoState }: { lesson: Lesson; locale: Locale; isDone: boolean; savedEvidence?: LessonEvidence; onComplete: () => void; onEvidence: (patch: Partial<LessonEvidence>) => void; demoState: DemoState }) {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [answer, setAnswer] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const activity = activityFor(lesson);
  const task = taskFor(lesson);
  const taskPassed = task.conditions.every((condition) => condition.test(demoState));
  const correct = checked && answer === activity.checkAnswer;
  const predicted = isDone || Boolean(savedEvidence?.predicted) || prediction !== null;
  const tried = isDone || Boolean(savedEvidence?.practiced) || taskPassed;
  const answered = isDone || Boolean(savedEvidence?.instantCheckPassed) || correct;
  const submit = () => {
    setChecked(true);
    if (prediction !== null && taskPassed && answer === activity.checkAnswer) {
      onEvidence({ instantCheckPassed: true });
      onComplete();
    }
  };
  return <>
    <section className="learning-block situation-block">
      <span>{locale === "zh" ? "这一章要解决什么" : "What this lesson solves"}</span>
      <h2>{read(lesson.goal, locale)}</h2>
      <p>{read(lesson.summary, locale)} {locale === "zh" ? "下面四步先建立判断，再用同一个演示验证，最后把观察结果用于练习。" : "The four steps below build the idea, verify it in one demo, and reuse the observation in a short exercise."}</p>
    </section>
    <section className="learning-block prediction-block">
      <span className="step-label">01 · {locale === "zh" ? "建立初始判断" : "Make an initial judgement"}</span>
      <h3>{locale === "zh" ? "先预测，再读解释" : "Predict before reading"}</h3>
      <p>{read(activity.prediction, locale)}</p>
      <div className="quiz-options instant-options">{activity.predictionOptions.map((option, index) => <label className={prediction === index ? "selected" : ""} key={option.zh}><input type="radio" name={`${lesson.id}-prediction`} checked={prediction === index} onChange={() => { setPrediction(index); onEvidence({ predicted: true }); }} /><i aria-hidden="true" /><span>{read(option, locale)}</span></label>)}</div>
      {prediction !== null && <p className={prediction === activity.predictionAnswer ? "feedback correct" : "feedback"}>{prediction === activity.predictionAnswer ? (locale === "zh" ? "判断正确。继续读下面四步，弄清为什么。" : "Correct. Read the four steps below to understand why.") : (locale === "zh" ? "这个判断暂时不对。不要背答案，读完下面四步后再到演示里验证。" : "That judgement is not correct yet. Read the four steps, then verify it in the demo.")}</p>}
    </section>
    <section className="concept-sequence">
      <div className="sequence-heading"><span className="step-label">02 · {locale === "zh" ? "把原理连起来" : "Connect the ideas"}</span><h2>{locale === "zh" ? "从结构到规则，按顺序理解" : "Follow the reasoning from structure to rule"}</h2><p>{locale === "zh" ? "每一步只回答一个问题。后一步会使用前一步的结论。" : "Each step answers one question and uses the conclusion before it."}</p></div>
      {lesson.theory.map((block, index) => {
        const point = keyPointFor(lesson, index);
        return <section className="learning-block concept-step" key={block.heading.zh}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{read(block.heading, locale)}</h3><p>{read(block.body, locale)}</p><div className="focus-rule"><code>{point.term}</code><span>{read(point.desc, locale)}</span></div></div></section>;
      })}
    </section>
    <section className="learning-block mistake-block"><h3>{read(ui.mistakes, locale)}</h3><ul>{lesson.mistakes.map((mistake) => <li key={mistake.zh}>{read(mistake, locale)}</li>)}</ul></section>
    <section className="demo-lesson-block demo-instructions">
      <div className="demo-brief"><span className="step-label">03 · {locale === "zh" ? "带着任务操作" : "Operate with a task"}</span><h2>{read(task.title, locale)}</h2><p>{read(task.brief, locale)}</p><div className="task-levels"><span><b>1</b>{locale === "zh" ? "跟做：对照目标调整参数" : "Follow: match the target"}</span><span><b>2</b>{locale === "zh" ? "排错：根据未满足条件修正" : "Debug: fix unmet conditions"}</span><span><b>3</b>{locale === "zh" ? "迁移：用观察结果回答下一题" : "Transfer: answer from the result"}</span></div><strong>{locale === "zh" ? "不要靠试遍所有选项。每次只改一个参数，说清它改变的是方向、分布、尺寸还是间距。" : "Do not brute-force every option. Change one control at a time and name whether it affects direction, distribution, size or spacing."}</strong></div>
      <div className="board-pointer"><ArrowRight />{locale === "zh" ? "在右侧同步教学板中完成操作" : "Complete the task in the synchronized board"}</div>
    </section>
    <details className="full-code"><summary>{locale === "zh" ? "查看完整 HTML 与 CSS" : "View full HTML and CSS"}</summary><div className="code-block"><div>HTML</div><pre><code>{lesson.html}</code></pre></div><div className="code-block accent-code"><div>CSS</div><pre><code>{lesson.css}</code></pre></div></details>
    <section className="learning-block practice-check">
      <span className="step-label">04 · {locale === "zh" ? "用刚才的观察作答" : "Use what you observed"}</span>
      <h2>{locale === "zh" ? "即时检查 · 单选题" : "Instant check · single choice"}</h2>
      <h3>{read(activity.check, locale)}</h3>
      <p>{locale === "zh" ? "如果不确定，回到上面的演示，重新改变参数并观察说明文字。" : "If you are unsure, return to the demo, change the controls again, and read the explanation."}</p>
      <div className="quiz-options instant-options">{activity.checkOptions.map((option, index) => <label className={answer === index ? "selected" : ""} key={option.zh}><input type="radio" name={`${lesson.id}-instant-check`} checked={answer === index} onChange={() => { setAnswer(index); setChecked(false); }} /><i aria-hidden="true" /><span>{read(option, locale)}</span></label>)}</div>
      <div className="completion-panel"><h3>{locale === "zh" ? "本章完成标准" : "Completion evidence"}</h3><p>{locale === "zh" ? "这里记录的是你完成了有效学习过程，不等同于永久掌握。章末还有一次简短小测。" : "This records a useful learning process, not permanent mastery. A short quiz follows."}</p><ul><li className={predicted ? "met" : ""}>{predicted && <Check />}{locale === "zh" ? "已经作出预测" : "Made a prediction"}</li><li className={tried ? "met" : ""}>{tried && <Check />}{locale === "zh" ? "当前布局达到全部目标条件" : "Matched every target condition"}</li><li className={answered ? "met" : ""}>{answered && <Check />}{locale === "zh" ? "已正确解释布局变化" : "Correctly explained the layout change"}</li></ul></div>
      <div className="check-actions"><button className="button" disabled={isDone || !predicted || !tried || answer === null} onClick={submit}>{isDone ? <Check weight="bold" /> : <Play />}{isDone ? (locale === "zh" ? "学习证据已完成" : "Learning evidence complete") : (locale === "zh" ? "检查即时题" : "Check answer")}</button></div>
      {!isDone && (!predicted || !tried || answer === null) && <p className="missing-requirement"><LockKey />{!predicted ? (locale === "zh" ? "还需先完成预测" : "Complete the prediction first") : !tried ? (locale === "zh" ? "还需在右侧教学板达到全部目标" : "Match every target in the board") : (locale === "zh" ? "还需选择一个答案" : "Choose an answer")}</p>}
      {checked && <p className={correct ? "feedback correct" : "feedback"}>{correct ? (locale === "zh" ? "回答正确，三项学习证据已满足。现在可以完成章末小测。" : "Correct. All three learning checks are complete. You can now take the chapter quiz.") : (locale === "zh" ? `你选择了“${answer === null ? "" : read(activity.checkOptions[answer], locale)}”。再想一想：刚才调整的是尺寸、内容，还是元素之间的布局关系？` : `You chose “${answer === null ? "" : read(activity.checkOptions[answer], locale)}”. Reconsider whether the demo changed size, content, or the relationship between elements.`)}</p>}
    </section>
  </>;
}

function LearningLessonPage() {
  const { locale: raw, lessonId } = useParams();
  const locale = localeOf(raw);
  const lesson = lessons.find((item) => item.id === lessonId);
  const [demoState, setDemoState] = useState(initialDemo);
  const { sections, done, evidence, chapterPassed, stagePassed, toggle, markPracticed, recordEvidence, passChapter, completedCount, totalCount } = useProgress();
  if (!lesson) return <Shell><main className="page-main"><header className="page-header"><h1>{read(ui.notFound, locale)}</h1><Link className="button" to={`/${locale}/course`}>{read(ui.backToCourse, locale)}</Link></header></main></Shell>;
  const currentId = sectionId(lesson);
  const lessonIndex = lessons.indexOf(lesson);
  const nextHref = lessons[lessonIndex + 1] ? `/${locale}/lesson/${lessons[lessonIndex + 1].id}` : undefined;
  const stage = stageOf(lesson.stage);
  const stageLessons = lessons.filter((entry) => entry.stage === lesson.stage);
  const isStageEnd = stageLessons[stageLessons.length - 1]?.id === lesson.id;
  const stageUnlocked = stageLessons.every((entry) => chapterPassed.includes(entry.id));
  const quiz = chapterQuizzes[lesson.id];
  const updateDemo = (state: DemoState) => {
    setDemoState(state);
    if (taskFor(lesson).conditions.every((condition) => condition.test(state))) {
      markPracticed(lesson.id);
      recordEvidence(lesson.id, { practiced: true });
    }
  };
  return <Shell><main className="lesson-shell learning-shell">
    <aside className="lesson-nav">
      <Link className="back-link" to={`/${locale}`}><ArrowLeft />{locale === "zh" ? "学习路径" : "Learning path"}</Link>
      <div className="lesson-progress"><span>{read(ui.progress, locale)}</span><strong>{completedCount} / {totalCount}</strong></div>
      <nav className="lesson-list">
        {lessons.map((entry) => <div className="lesson-nav-entry" key={entry.id}><Link className={entry.id === lesson.id ? "active" : ""} to={`/${locale}/lesson/${entry.id}`}><span>{String(entry.order).padStart(2, "0")}</span>{read(entry.title, locale)}{done.includes(entry.id) && <Check weight="bold" />}</Link></div>)}
      </nav>
    </aside>
    <article className="lesson-content learning-content">
      <div className="lesson-title"><div className="lesson-meta"><span className="tag">{read(stage.name, locale)}</span><span>{lesson.order} / {lessons.length} {read(ui.chapter, locale)}</span><span>{locale === "zh" ? "4 个概念 · 1 次操作 · 1 道检验" : "4 concepts · 1 demo · 1 check"}</span><span>{read(lesson.duration, locale)}</span></div><h1>{read(lesson.title, locale)}</h1><p className="lesson-goal"><strong>{read(ui.goalLabel, locale)}</strong>{read(lesson.goal, locale)}</p></div>
      <SectionActivity key={currentId} lesson={lesson} locale={locale} isDone={sections.includes(currentId)} savedEvidence={evidence[lesson.id]} onComplete={() => { if (!sections.includes(currentId)) toggle(currentId); }} onEvidence={(patch) => recordEvidence(lesson.id, patch)} demoState={demoState} />
      {sections.includes(currentId) ? <>
        <QuizPanel quiz={quiz} locale={locale} passed={chapterPassed.includes(lesson.id)} onPass={() => passChapter(lesson.id)} title={locale === "zh" ? `${read(lesson.title, locale)}小测` : `${read(lesson.title, locale)} quiz`} intro={locale === "zh" ? "4 道基础选择题，全部答对后通过本章。答错会给出提示，不会直接公布答案。" : "Four basic questions. Answer all correctly to pass; wrong answers receive hints, not solutions."} />
        {chapterPassed.includes(lesson.id) && <div className="after-quiz-action">{isStageEnd ? <Link className="button" to={`/${locale}/stage/${lesson.stage}/test`}>{stagePassed.includes(lesson.stage) ? (locale === "zh" ? "重新练习阶段测试" : "Practise the stage test") : stageUnlocked ? (locale === "zh" ? "开始阶段综合测试" : "Start the stage test") : (locale === "zh" ? "查看阶段要求" : "View stage requirements")}<ArrowRight /></Link> : nextHref && <Link className="button" to={nextHref}>{locale === "zh" ? "进入下一章" : "Next chapter"}<ArrowRight /></Link>}</div>}
      </> : <section className="quiz-locked"><LockKey /><div><h2>{locale === "zh" ? "章末小测尚未开放" : "Chapter quiz locked"}</h2><p>{locale === "zh" ? "先完成预测、教学板目标和即时选择题。" : "Complete the prediction, board target and instant check first."}</p></div></section>}
    </article>
    <aside className="lesson-board">
      <div className="lesson-board-heading"><span>{locale === "zh" ? "同步教学板" : "Synchronized board"}</span><strong>{read(taskFor(lesson).title, locale)}</strong><p>{locale === "zh" ? "正文和教学板使用同一个任务。调整参数后，完成状态会立即同步。" : "The lesson and board share one task. Progress updates as you adjust the controls."}</p></div>
      <ConceptPlayground key={lesson.id} lesson={lesson} locale={locale} onChange={updateDemo} />
    </aside>
  </main></Shell>;
}

function StageTestPage() {
  const { locale: raw, stageKey } = useParams();
  const locale = localeOf(raw);
  const stage = stages.find((entry) => entry.key === stageKey);
  const { chapterPassed, stagePassed, passStage } = useProgress();
  if (!stage) return <Shell><main className="page-main"><header className="page-header"><h1>{read(ui.notFound, locale)}</h1><Link className="button" to={`/${locale}/course`}>{read(ui.backToCourse, locale)}</Link></header></main></Shell>;
  const quiz = stageQuizzes[stage.key];
  const missing = quiz.lessonIds.filter((id) => !chapterPassed.includes(id));
  return <Shell><main className="stage-test-page">
    <header className="stage-test-hero"><Link className="back-link" to={`/${locale}/course`}><ArrowLeft />{locale === "zh" ? "课程路径" : "Course path"}</Link><span>{locale === "zh" ? "阶段综合测试" : "Stage test"}</span><h1>{read(stage.name, locale)}</h1><p>{locale === "zh" ? "约 10 道基础题，覆盖本阶段全部章节。错题会给出回顾方向，全部答对后过关。" : "About ten basic questions across the stage. Wrong answers get review cues; all must be correct to pass."}</p></header>
    {missing.length ? <section className="stage-locked"><LockKey /><div><h2>{locale === "zh" ? "完成章末小测后开放" : "Complete the chapter quizzes first"}</h2><p>{locale === "zh" ? "还需要通过以下章节：" : "You still need to pass:"}</p><div>{missing.map((id) => { const entry = lessons.find((lesson) => lesson.id === id)!; return <Link to={`/${locale}/lesson/${id}`} key={id}>{read(entry.title, locale)}<ArrowRight /></Link>; })}</div></div></section> : <QuizPanel quiz={quiz} locale={locale} passed={stagePassed.includes(stage.key)} onPass={() => passStage(stage.key)} title={locale === "zh" ? `${read(stage.name, locale)}阶段综合测试` : `${read(stage.name, locale)} stage test`} intro={locale === "zh" ? "正确题会保留，提交后只需修改错题。" : "Correct answers stay complete; after submission, revise only the missed questions."} />}
  </main></Shell>;
}

function ChallengePage() {
  const locale = localeOf(useParams().locale);
  return <Navigate to={`/${locale}/lesson/final-challenge`} replace />;
}

function About() {
  const locale = localeOf(useParams().locale);
  return <Shell><main className="page-main">
    <header className="page-header">
      <p className="eyebrow">ABOUT THE COURSE</p>
      <h1>{read(ui.navAbout, locale)}</h1>
      <p>{locale === "zh" ? "这个项目用可运行的小实验解释前端布局，不需要注册，也不收集任何个人数据。" : "This project explains front-end layout through runnable experiments. No account and no personal data."}</p>
    </header>
    <section className="about-grid">
      <div>
        <h2>{locale === "zh" ? "如何学习" : "How to learn"}</h2>
        <p>{locale === "zh" ? "建议按阶段顺序前进：入门理解结构与盒模型，基础掌握 Flexbox 与定位，进阶处理 Grid 与响应式，实战完成完整页面。有基础时也可以直接跳到任意章节。" : "Follow the stages in order: Starter covers structure and the box model, Foundation covers Flexbox and positioning, Advanced covers Grid and responsive layout, and Practice finishes a complete page. With prior experience you can jump straight to any chapter."}</p>
      </div>
      <div>
        <h2>{locale === "zh" ? "每章包含什么" : "What each chapter contains"}</h2>
        <p>{locale === "zh" ? "每章围绕一个明确产出展开：先预测，连续理解四个概念，再按观察任务操作同一个几何演示，最后用刚才的变化完成检验。" : "Each lesson targets one outcome: predict, connect four concepts, operate one geometry demo with an observation task, then answer from what changed."}</p>
      </div>
      <div>
        <h2>{locale === "zh" ? "数据与进度" : "Data and progress"}</h2>
        <p>{locale === "zh" ? "完成状态、主题和语言偏好只保存在当前浏览器的 localStorage 中。清除浏览器数据会同时清除学习进度。" : "Completion state, theme and language preferences live only in this browser's localStorage. Clearing browser data also clears your progress."}</p>
      </div>
      <div>
        <h2>{locale === "zh" ? "部署方式" : "Deployment"}</h2>
        <p>{locale === "zh" ? "项目完全静态，构建产物可以直接发布到 GitHub Pages，使用 Hash 路由，刷新任意章节都不会 404。" : "The project is fully static. The build output deploys straight to GitHub Pages, and hash routing keeps every chapter refresh-safe."}</p>
      </div>
    </section>
  </main><Footer locale={locale} /></Shell>;
}

function Footer({ locale }: { locale: Locale }) {
  return <footer>
    <strong>Layout Lab</strong>
    <p>{locale === "zh" ? "用实验理解前端布局。" : "Understand front-end layout through experiments."}</p>
    <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
  </footer>;
}

export default function App() {
  const preferred = useMemo(() => (localStorage.getItem("layout-lab-locale") === "en" || navigator.language.startsWith("en") ? "en" : "zh"), []);
  return <Routes>
    <Route path="/" element={<Navigate to={`/${preferred}`} replace />} />
    <Route path="/:locale" element={<Home />} />
    <Route path="/:locale/course" element={<Course />} />
    <Route path="/:locale/lesson/:lessonId" element={<LearningLessonPage />} />
    <Route path="/:locale/stage/:stageKey/test" element={<StageTestPage />} />
    <Route path="/:locale/challenge" element={<ChallengePage />} />
    <Route path="/:locale/about" element={<About />} />
    <Route path="*" element={<Navigate to={`/${preferred}`} replace />} />
  </Routes>;
}
