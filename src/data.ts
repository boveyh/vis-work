export type Locale = "zh" | "en";
export type Copy = { zh: string; en: string };
export type StageKey = "starter" | "foundation" | "advanced" | "practice";
export type DemoKind =
  | "article"
  | "card"
  | "navbar"
  | "overlay"
  | "dashboard"
  | "split"
  | "landing"
  | "project";
export type ControlKey = "direction" | "justify" | "gap" | "columns" | "padding";

export type SourceKind = "spec" | "paper" | "docs" | "article";
export type RefLink = { label: string; href: string; kind?: SourceKind };

export type TheoryBlock = {
  heading: Copy;
  body: Copy;
  /* 这一块实际在讲的属性：必须与本章 keyPoints 的 term 一致；方法型概念可以省略 */
  point?: string;
  /* 原理层：规范怎么定义、浏览器内部怎么处理（带章节号的出处放在 refs 里） */
  principle?: Copy;
  /* 为什么这样（原理 / 浏览器行为） */
  why?: Copy;
  /* 3–6 行最小示例 */
  snippet?: string;
  /* 什么时候会踩坑 */
  pitfall?: Copy;
  /* 完整走查：把这一块用回贯穿案例的三步流程 */
  walkthrough?: { situation: Copy; steps: Copy[]; result: Copy };
  /* 生活化类比，帮助记忆 */
  analogy?: Copy;
  /* 常见变体与适用边界：每条一个 label + 一句 note */
  variants?: { label: Copy; note: Copy }[];
  /* 在右侧演示里怎么动手验证这一条 */
  demoHint?: Copy;
  /* 延伸阅读：规范 / 经典文献 / 手册 / 文章 */
  refs?: RefLink[];
};

/* 反例剖析：能跑、有人写、但坏了 */
export type CounterExample = {
  title: Copy;
  html?: string;
  css: string;
  symptom: Copy;
  cause: Copy;
  fix: Copy;
  whyHidden: Copy;
};

export type GlossaryEntry = {
  term: string;
  def: Copy;
  source?: string;
};

export type KeyPoint = {
  term: string;
  desc: Copy;
  /* 常用取值与一个坑 */
  detail?: Copy;
};

export type Lesson = {
  id: string;
  order: number;
  stage: StageKey;
  title: Copy;
  summary: Copy;
  goal: Copy;
  duration: Copy;
  objectives: Copy[];
  /* 真实场景：这一章解决的问题出现在哪些页面里 */
  scenario?: Copy;
  /* 贯穿本章的同一个案例，各小节都回到它 */
  caseStudy?: Copy;
  theory: TheoryBlock[];
  /* 概念图解：id 指向 src/figures.ts 里的内联 SVG */
  figures?: { id: string; caption: Copy }[];
  keyPoints: KeyPoint[];
  /* 术语表：术语 / 定义 / 出处 */
  glossary?: GlossaryEntry[];
  /* 反例剖析 */
  counterExamples?: CounterExample[];
  /* 教师视角：重点 / 难点 / 考察点 */
  focus?: Copy[];
  difficulty?: Copy[];
  examPoints?: Copy[];
  /* 规范原文摘录与出处，用来支撑本章结论 */
  spec?: { quote: Copy; quoteZh?: Copy; source: string; note: Copy };
  /* 再往深一层：2–3 段延伸讨论 */
  deepDive?: Copy[];
  mistakes: Copy[];
  practice: Copy[];
  /* 章末自检清单 */
  checklist?: Copy[];
  /* 本章参考文献（规范 / 经典文献 / 工程博客） */
  bibliography?: RefLink[];
  html: string;
  css: string;
  demo: DemoKind;
  controls: ControlKey[];
  challenge: Copy;
};

export const t = (zh: string, en: string): Copy => ({ zh, en });

export const stages: { key: StageKey; name: Copy; desc: Copy }[] = [
  { key: "starter", name: t("入门", "Starter"), desc: t("先看懂页面是怎么来的", "See how a page is put together") },
  { key: "foundation", name: t("基础", "Foundation"), desc: t("掌握控制排列的核心工具", "Master the core arrangement tools") },
  { key: "advanced", name: t("进阶", "Advanced"), desc: t("处理二维结构与多端适配", "Handle 2D structure and multi-device layout") },
  { key: "practice", name: t("实战", "Practice"), desc: t("独立完成真实页面", "Build real pages on your own") },
];

export const stageOf = (key: StageKey) => stages.find((item) => item.key === key) ?? stages[0];

export const lessons: Lesson[] = [
  {
    id: "page-structure",
    order: 1,
    stage: "starter",
    title: t("页面如何形成", "How a Page Takes Shape"),
    summary: t("认识 HTML 骨架、块级与行内元素，以及浏览器的默认排版规则。", "Meet the HTML skeleton, block and inline elements, and the browser's default layout rules."),
    scenario: t("几乎每个项目的第一天都在做这件事：把设计稿上的大区块翻译成 <header>、<main>、<footer>，再决定正文容器多宽。结构定错了，后面每一处样式都是在补丁上打补丁。", "Almost every project starts here: translate the design's big blocks into <header>, <main> and <footer>, then decide how wide the text column should be. Get the structure wrong and every later style is a patch on a patch."),
    caseStudy: t("贯穿案例：一个「技术博客文章页」。这一章先把它拆成 <header> / <main> / <footer>，并定下 720px 的阅读宽度；后面每一章都在这个骨架上做局部改造——第 2 章量清它的盒模型，第 3 章给文章顶部的标签行加 Flexbox，第 4 章把「更新于」角标钉在卡片右上角，第 8 章把它扩成完整的作品页。同一个页面贯穿八章，避免每章换一个玩具例子。", "The running case: a technical blog article page. This chapter splits it into header, main and footer and fixes a 720px reading measure; every later chapter changes one part of that same skeleton — chapter 2 measures its boxes, chapter 3 gives the tag row a flex line, chapter 4 pins an “updated on” badge to the card corner, and chapter 8 grows it into a full project page. One page runs through all eight chapters instead of a fresh toy per lesson."),
    goal: t("搭出一篇结构清楚、可访问的文章页面", "Build a clearly structured, accessible article page"),
    duration: t("约 12 分钟", "12 min"),
    objectives: [
      t("看懂一份 HTML 文档的基本骨架", "Read the basic skeleton of an HTML document"),
      t("区分块级元素与行内元素的排版差异", "Tell block elements apart from inline elements"),
      t("用语义标签划分页面的主要区域", "Divide a page into regions with semantic tags"),
    ],
    theory: [
      {
        heading: t("浏览器先读结构，再读样式", "The browser reads structure, then styles"),
        point: "<header> / <main> / <footer>",
        why: t("浏览器与屏幕阅读器会把这些标签变成地标（landmark），用户可以一键在区域之间跳转。用 <div> 拼出来的页面，对它们来说是一整块没有边界的长文本。", "Browsers and screen readers turn these tags into landmarks, so users can jump between regions with one keystroke. A page built from <div> is one undifferentiated wall of text to them."),
        snippet: "<main class=\"article\">\n  <header><h1>如何理解文档流</h1></header>\n  <p>正文第一段</p>\n  <footer>更新于 2026-09</footer>\n</main>",
        pitfall: t("一页写多个 <main>。整篇文档只允许一个可见的 <main>，重复会让地标导航失去意义。", "Writing several <main> elements. A document allows exactly one visible <main>; duplicates make landmark navigation meaningless."),
        analogy: t("HTML 是骨架，CSS 是衣服：先有能站住的骨架，衣服才有地方穿。", "HTML is the skeleton and CSS is the clothing; a garment needs something upright to hang on."),
        demoHint: t("把演示里的内边距从 24 调到 0，再看标题与容器边缘的距离——那是盒子内部的空白，不是元素之间的间距。", "Drop the demo padding from 24 to 0 and look at the gap between heading and edge: that is inside the box, not between elements."),
        variants: [{ label: t("更细的地标", "Named landmarks"), note: t("页面里出现两个导航时用 aria-label 区分：<nav aria-label=\"主导航\"> 与 <nav aria-label=\"目录\">，读屏器会把名字念出来。", "When a page has two navigations, name them with aria-label — <nav aria-label=\"Main\"> and <nav aria-label=\"Contents\"> — so the screen reader says which is which.") }, { label: t("一个 main，多个 article", "One main, many articles"), note: t("一页只保留一个可见的 <main>；多篇文章并列时用多个 <article>，而不是复制 <main>。", "Keep exactly one visible main per page; list several posts as separate article elements instead of duplicating main.") }],
        walkthrough: { situation: t("设计稿：顶部标识与导航、中间一篇长文、底部版权信息。", "The design: logo and navigation on top, one long article, copyright at the bottom."), steps: [t("① 用 <header> 包住标识与主导航，不要写 <div class=\"top\">。", "Wrap the logo and nav in header instead of a div with a class name."), t("② 文章整体放进 <main>，全页只留一个。", "Put the article in main and keep exactly one on the page."), t("③ <footer> 收尾；文章内的「更新于」可放局部 <footer>。", "Close with footer; the article's own updated line can carry a local footer.")], result: t("读屏器能一次跳到主体内容；之后给 header 加吸顶只改一个语义区域。", "A screen reader jumps straight to the main content, and a sticky header later touches one region.") },
        refs: [{ label: "MDN · <main>", href: "https://developer.mozilla.org/docs/Web/HTML/Element/main", kind: "docs" }, { label: "MDN · <header>", href: "https://developer.mozilla.org/docs/Web/HTML/Element/header", kind: "docs" }, { label: "CSS 2.2 §9 视觉格式化模型", href: "https://www.w3.org/TR/CSS22/visuren.html", kind: "spec" }, { label: "HTML 规范 · Sections", href: "https://html.spec.whatwg.org/multipage/sections.html", kind: "spec" }],
        body: t("HTML 负责说明“这块内容是什么”，CSS 负责决定“它长什么样、放在哪里”。浏览器先把 HTML 解析成一棵 DOM 树，再沿着这棵树为每个盒子算出尺寸与位置。header、main、footer 这类标签并不改变排版规则，它们的价值出现在可访问性树上：每个地标都成为读屏用户可以直接跳转的落点。结构一旦错了，后面每一处样式都是在给错误的分区打补丁——这是这一章排在第一位的原因。", "HTML says what a piece of content is; CSS decides how it looks and where it sits. The browser parses HTML into a DOM tree and then computes a size and position for every box along that tree. Tags such as header, main and footer do not change the layout rules; their value shows up in the accessibility tree, where each landmark becomes a landing point a screen-reader user can jump straight to. Once the structure is wrong, every later style patches a wrong division — which is why this chapter comes first."),
        principle: t("HTML 规范把 <main>、<header>、<footer> 定义为 landmark 元素，浏览器把每个 landmark 映射成可访问性树上的一个节点（role=main / banner / contentinfo），读屏用户据此在区域间跳转。CSS 2.2 §9 同时规定：普通流里块级盒自上而下堆叠、行内盒沿行盒排列——语义标签做的是给这套盒子命名，而不是换一套排版规则。", "HTML defines main, header and footer as landmark elements, and the browser maps each to a node in the accessibility tree (role=main / banner / contentinfo) that screen-reader users navigate between. CSS 2.2 §9 adds that normal flow stacks block boxes top-down and runs inline boxes along lines: semantic tags name those boxes, they do not change the rules."),
      },
      {
        heading: t("块级元素独占一行", "Block elements take a full row"),
        point: "display: block",
        why: t("块级盒子在垂直方向依次排列，并默认占满可用宽度。也正因为它占满宽度，margin-inline: auto 才能把一个定宽块推到中间。", "Block boxes stack vertically and fill the available width by default. Because they fill it, margin-inline: auto can push a fixed-width block into the middle."),
        snippet: ".card {\n  display: block;      /* 段落与容器的默认值 */\n  margin-inline: auto; /* 占满宽度才谈得上居中 */\n}",
        pitfall: t("把 <span> 当容器用，再用 <br> 强制换行。需要独占一行就直接用块级元素，或写 display: block。", "Using <span> as a container and forcing line breaks with <br>. If it needs its own line, use a block-level element or display: block."),
        analogy: t("块级盒像排队的车厢：每节独占一条轨道，所以它占满宽度之后才有“余位”可以被均分到两侧。", "A block box is a carriage on its own track: filling the width is exactly what leaves leftover space to split between the sides."),
        demoHint: t("把内边距加到 48，正文行会变短；同时拖窄窗口，确认容器仍然居中并把边距留出来。", "Raise padding to 48: the lines get shorter. Then narrow the window and check that the container stays centred and keeps its margin."),
        variants: [{ label: t("display: flow-root", "display: flow-root"), note: t("想建立块格式化上下文又不想用 overflow 时用它：能包住浮动子元素，也不会像 overflow: hidden 那样裁切内容或把元素变成滚动容器。", "Use it when you need a block formatting context without overflow: it contains floats and, unlike overflow: hidden, neither clips content nor turns the element into a scroll container.") }, { label: t("块级盒的宽度来源会变", "Who owns a block's width"), note: t("块级盒默认宽度来自包含块；一旦放进 flex/grid 容器，宽度改由那套算法决定，margin-inline: auto 也就不再是居中手段。", "A block's width comes from its containing block by default; inside a flex or grid container that algorithm takes over and margin-inline: auto stops being a centring tool.") }],
        walkthrough: { situation: t("正文要求宽屏居中、窄屏留 16px 边距，上限 720px。", "The body column should centre when wide, keep 16px when narrow and cap at 720px."), steps: [t("① 容器用块级元素（main / article），不能用 <span>。", "Use a block container such as main or article, never a span."), t("② 写 max-width: 720px 与 margin-inline: auto。", "Write max-width: 720px with margin-inline: auto."), t("③ 补 width: 100%，窄屏先收缩、再被上限封顶。", "Add width: 100% so it shrinks first and gets capped second.")], result: t("两档宽度共用一份样式，全程不需要媒体查询。", "One stylesheet serves both widths with no media query.") },
        refs: [{ label: "MDN · display", href: "https://developer.mozilla.org/docs/Web/CSS/display", kind: "docs" }, { label: "MDN · 块级内容", href: "https://developer.mozilla.org/docs/Glossary/Block-level_content", kind: "docs" }, { label: "WAI-ARIA APG · 地标区域", href: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/", kind: "spec" }],
        body: t("div、p、h1、section 默认都是块级盒：它们在垂直方向依次堆叠，每个都占满可用宽度，于是撑起页面的纵向结构。占满宽度带来两个后果——它天然就是一栏，而且只有它才有剩余的水平空间可以交给 margin-inline: auto 去均分。理解这一点，就理解了一半的居中问题。", "div, p, h1 and section are block boxes by default: they stack vertically and each fills the available width, which is how a page gets its vertical structure. Filling the width has two consequences: the box is a column by nature, and only such a box has leftover horizontal space for margin-inline: auto to share. Understanding this answers half of every centring question."),
        principle: t("display 决定盒类型（CSS 2.2 §9.2.4）。block 生成块级盒、参与块格式化上下文，独占一行且可以被赋予宽高——这正是 margin-inline: auto 能生效的前提：只有占满可用宽度的盒子，才有“剩余空间”可被均分到两侧。", "display decides the box type (CSS 2.2 §9.2.4). block generates a block-level box in a block formatting context: it takes the row and accepts width and height. That is the precondition for margin-inline: auto — only a box that fills the width has leftover space to split between its sides."),
      },
      {
        heading: t("行内元素跟随文字", "Inline elements flow with text"),
        point: "display: inline",
        why: t("行内盒子只在行盒里排布：宽高会被忽略，垂直方向的 padding 也不会把相邻行推开。要精确控制尺寸，先升级成 inline-block。", "Inline boxes live inside line boxes: width and height are ignored, and vertical padding never pushes neighbouring lines apart. To control size precisely, upgrade to inline-block first."),
        snippet: ".badge {\n  display: inline-block; /* 可以设置宽高，仍跟随文字 */\n  padding: 2px 10px;\n}",
        pitfall: t("给 <a> 或 <span> 写了 width / height 却没生效——行内元素不接受宽高，这不是浏览器的 bug。", "Setting width or height on an <a> or <span> and seeing nothing happen: inline elements ignore both. That is not a browser bug."),
        analogy: t("行内盒像句子里的词：可以加粗、倾斜、换色，却不能长出自己的身高。", "An inline box is a word in a sentence: bolding and slanting are fine, growing its own height is not."),
        demoHint: t("把内边距拉到最大，观察是否出现横向滚动条。如果出现，说明宽度用的是固定值而不是上限。", "Push padding to the maximum and watch for a horizontal scrollbar; if it appears, the width is a fixed value rather than a ceiling."),
        variants: [{ label: t("inline-block 与 inline-flex", "inline-block and inline-flex"), note: t("需要尺寸但保留行内排版时用 inline-block；要做一排对齐的行内小部件（徽章、图标按钮）用 inline-flex。", "Use inline-block when you need sizing but keep inline flow; use inline-flex for a row of aligned inline widgets such as badges or icon buttons.") }, { label: t("行内盒里的上下 padding", "Vertical padding on an inline box"), note: t("上下 padding 会画出背景，却不改变行高：相邻行看起来可能重叠，需要留空间时改用 line-height 或 margin。", "Vertical padding paints a background without changing line height, so neighbouring lines can look overlapped; use line-height or margins when space is needed.") }],
        walkthrough: { situation: t("「更新于 2026-09」标签要有底色，但行高不能被撑高。", "The “updated on” tag needs a background but must not push the line box taller."), steps: [t("① 先用 <span> 加 padding，观察上下 padding 不影响行高。", "Start with a span plus padding and watch vertical padding leave line height alone."), t("② 需要尺寸时改成 display: inline-block，仍跟随文字。", "Switch to inline-block when sizing is needed; it still flows inline."), t("③ 用 padding: 2px 8px 与圆角做出胶囊，不写 height。", "Build the pill from padding and a radius — no height.")], result: t("标签贴着基线、行高一致；给行内元素写 height 只会被忽略。", "The tag sits on the baseline and height on an inline element is simply ignored.") },
        refs: [{ label: "MDN · display", href: "https://developer.mozilla.org/docs/Web/CSS/display", kind: "docs" }, { label: "CSS 2.2 §10.6.1 行内元素的高度", href: "https://www.w3.org/TR/CSS22/visudet.html#inline-non-replaced", kind: "spec" }],
        body: t("span、a、strong 属于行内盒：它们沿行盒排列，宽度由内容决定，也不会获得换行权。由于纵向位置由 line-height 与 vertical-align 决定，height 在它们身上根本不参与计算，上下 padding 也不会把相邻行推开。想给行内元素控制尺寸，第一步是先把它升级成 inline-block 或 block，而不是继续在 height 上试数值。", "span, a and strong are inline boxes: they run along line boxes, take their width from content and never gain the right to break the line. Because their vertical position comes from line-height and vertical-align, height simply does not take part in the calculation, and vertical padding will not push neighbouring lines apart. To size an inline element, upgrade it to inline-block or block rather than trying more height values."),
        principle: t("行内盒属于行内格式化上下文：宽度由内容决定，纵向位置由 line-height 与 vertical-align 决定。CSS 2.2 §10.6.1、§10.8.1 写明：行内非替换元素的 height 不适用、上下 margin 也不影响行高——所以给 <a> 设 height 无效不是浏览器偷懒，而是规范就没让行内盒参与纵向尺寸计算。", "Inline boxes live in an inline formatting context: width comes from content and the vertical position from line-height and vertical-align. CSS 2.2 §10.6.1 and §10.8.1 state that for non-replaced inline elements height does not apply and vertical margins do not affect line height. An <a> that ignores height is not a browser shortcut, it is the spec."),
      },
      {
        heading: t("文档流是最省力的默认布局", "Normal flow is the cheapest default"),
        point: "max-width",
        why: t("max-width 允许元素在窄容器里收缩，width 不允许。正文排版几乎总是 max-width 加百分比，而不是写死像素。", "max-width lets an element shrink inside a narrow container; width does not. Body text almost always means max-width plus a percentage, never a hard-coded pixel value."),
        snippet: ".article {\n  max-width: 720px;    /* 约 65–75 个字符宽 */\n  margin-inline: auto;\n}",
        pitfall: t("用 width: 720px 代替 max-width：手机宽度不足时需要横向滚动，右半边内容被裁掉。", "Using width: 720px instead of max-width: on a phone the page scrolls sideways and the right half is cut off."),
        analogy: t("max-width 像给弹性墙加一个上限：屋子窄了它会收，屋子宽了它也不再涨。", "max-width is an elastic wall with a ceiling: it contracts in a narrow room and stops growing in a wide one."),
        demoHint: t("缩到 390px 视口，确认安全边距还在、正文没有溢出。", "At a 390px viewport, confirm the safe margin survives and the text does not overflow."),
        variants: [{ label: t("width: min(100%, 720px)", "width: min(100%, 720px)"), note: t("等价写法：把上限与百分比一起放进 min()，再配 margin-inline: auto，效果与 max-width 相同。", "An equivalent spelling: put the ceiling and the percentage inside min() and add margin-inline: auto — same effect as max-width.") }, { label: t("max-width 不解决长串溢出", "max-width does not fix long strings"), note: t("URL、代码或英文长词仍会撑破容器，需要 overflow-wrap: anywhere，flex/grid 子项还要补 min-width: 0。", "URLs, code and long unbroken words still burst the container: add overflow-wrap: anywhere, and min-width: 0 on flex or grid children.") }],
        walkthrough: { situation: t("同一篇文章要服务 1440px 桌面与 360px 手机，长链接不能撑破容器。", "One article must serve a 1440px desktop and a 360px phone without long links bursting it."), steps: [t("① 正文用 max-width: 720px，而不是 width: 720px。", "Give the body max-width: 720px rather than width: 720px."), t("② 给 img 与 pre 加 max-width: 100%。", "Add max-width: 100% to images and pre blocks."), t("③ 缩到 360px 检查横向滚动条。", "At 360px, check for a horizontal scrollbar.")], result: t("长内容只会换行或缩小，不会产生横向滚动。", "Long content wraps or shrinks instead of scrolling sideways.") },
        refs: [{ label: "MDN · max-width", href: "https://developer.mozilla.org/docs/Web/CSS/max-width", kind: "docs" }, { label: "CSS Sizing 3", href: "https://drafts.csswg.org/css-sizing-3/", kind: "spec" }],
        body: t("即使没有 flex、grid 和定位，页面依然能正确排版，因为普通流本身就是一套完整规则：块级盒自上而下，行内盒沿线排列，宽度沿包含块传递。内容页面通常只需要两件事——给正文设一个宽度上限（max-width），再让它居中（margin-inline: auto）。用上限而不是定值，是为了在窄屏上允许收缩，从而避免横向滚动这一最常见的移动端问题。", "A page lays out correctly even without flex, grid or positioning, because normal flow is a complete rule set on its own: blocks stack top-down, inlines run along lines, and widths cascade from the containing block. A content page usually needs just two things: a ceiling on the text width (max-width) and centring (margin-inline: auto). A ceiling rather than a fixed value is what lets the container shrink on small screens and keeps horizontal scrolling — the most common mobile defect — out of the picture."),
        principle: t("CSS Sizing 3 把尺寸分为 definite 与 indefinite：width 要求确定值，max-width 只是给计算过程加一条上限。浏览器先按包含块算出 100% 宽度，再截到上限——所以同一元素大屏被截断、小屏自然收缩，无需任何媒体查询。", "CSS Sizing 3 separates definite from indefinite sizes: width asks for a concrete value while max-width only adds an upper bound. The browser computes 100% of the containing block first and clamps it second — one element is capped on a large screen and simply shrinks on a small one, with no media query."),
      },
    ],
    keyPoints: [
      { term: "<header> / <main> / <footer>", desc: t("划出页眉、主体与页脚三个区域。", "Mark the page header, main region and footer."), detail: t("整页只保留一个 <main>；<header> 与 <footer> 也可以出现在 <article> 内部。", "Keep exactly one <main> per page; <header> and <footer> may also appear inside an <article>.") },
      { term: "<article> / <section>", desc: t("表示可独立内容块与主题分组。", "Represent standalone content and topical groups."), detail: t("<article> 指能独立分发的内容（一篇帖子）；<section> 是同主题分组，最好带一个标题。", "<article> is content that stands alone (a post); <section> groups a topic and is best given a heading.") },
      { term: "display: block", desc: t("元素独占一行，可以设置宽高。", "The element takes a row and accepts width and height."), detail: t("块级盒子垂直堆叠并占满宽度，配 margin-inline: auto 可以水平居中。", "Block boxes stack vertically and fill the width; margin-inline: auto centers them.") },
      { term: "display: inline", desc: t("元素跟随文字排列，宽高由内容决定。", "The element flows with text; size comes from content."), detail: t("需要宽高或垂直内边距时改成 inline-block，它依然跟随文字排列。", "Switch to inline-block when you need size or vertical padding; it still flows with the text.") },
      { term: "max-width", desc: t("限制内容最大宽度，超出后自动换行。", "Cap the content width; text wraps beyond it."), detail: t("正文常用 700–760px；再补一条 width: 100%，窄屏时才不会横向溢出。", "700–760px is the usual measure; add width: 100% so narrow screens never overflow.") },
      { term: "margin-inline: auto", desc: t("在可用空间里让定宽块级元素居中。", "Center a fixed-width block inside its available space."), detail: t("只在块级且宽度确定（width 或 max-width）时生效。", "Only works on a block-level element with a definite width (width or max-width).") },
    ],
    mistakes: [
      t("整页都用 <div> 拼装，屏幕阅读器无法判断各区域的用途。", "Building everything from <div> leaves screen readers unable to tell the regions apart."),
      t("用连续的 <br> 制造段落间距，内容一改排版就全乱。", "Using repeated <br> for spacing breaks as soon as the content changes."),
    ],
    practice: [
      t("把文章内容放进 <main>，补上 <header> 与 <footer>。", "Wrap the article in <main> and add <header> and <footer>."),
      t("给正文容器设置 720px 的最大宽度。", "Set a 720px max width on the content container."),
      t("用 margin-inline: auto 让它保持水平居中。", "Center it horizontally with margin-inline: auto."),
    ],
    focus: [
      t("语义区域与普通流的对应关系：landmark 是可访问性导航的锚点，不是装饰。", "How semantic regions map onto normal flow: landmarks are accessibility anchors, not decoration."),
      t("块级盒与行内盒的盒类型差异，以及它为什么决定了“能不能设宽高”。", "The box-type difference between block and inline, and why it decides whether width and height do anything."),
      t("用 max-width 加 margin-inline: auto 建立全站统一的阅读宽度。", "One shared reading measure built from max-width plus margin-inline: auto."),
    ],
    difficulty: [
      t("习惯用 <div> 加连续 <br> 直接拼版式，看不出结构错误的代价。", "Reaching for div plus repeated br to fake layout, blind to the cost of a broken structure."),
      t("把“行内元素不能设宽高”背成奇怪规定，而不是行内格式化上下文的必然结果。", "Memorising “inline elements ignore width” as an odd rule instead of a consequence of inline formatting."),
      t("把居中当成 margin: 0 auto 的固定咒语，说不清它何时失效。", "Treating centring as a magic incantation and being unable to say when it fails."),
    ],
    examPoints: [
      t("给一段纯 <div> 拼出的页面：改成语义结构，并逐个说明每个 landmark 的作用。", "Hand over a div-only page: rewrite it semantically and explain each landmark's role."),
      t("给 width: 720px 的正文容器：改成 max-width，并解释窄屏下的行为差异。", "Give a width: 720px container: change it to max-width and explain the narrow-screen difference."),
      t("提问：为什么给行内 <a> 设 height 无效？答案要落到行内格式化上下文，而不是“浏览器不支持”。", "Ask why height on an inline <a> does nothing; the answer must land on inline formatting, not “the browser does not support it”."),
    ],
    counterExamples: [
      {
        title: t("用 <br> 造段落间距", "Faking paragraph spacing with <br>"),
        html: "<div class=\"post\">\n  <h2>标题</h2>\n  <br />\n  <p>第一段</p>\n  <br />\n  <br />\n  <p>第二段</p>\n</div>",
        css: ".post p {\n  margin-bottom: 18px; /* 又叠上 <br> 产生的空行 */\n}",
        symptom: t("看起来“差不多”，但文案一改就多出一整行空白；读屏器会把 <br> 读成多次换行停顿。", "It looks roughly right until the copy changes and an extra blank line appears; screen readers announce repeated line-break pauses."),
        cause: t("<br> 生成的是一个强制换行的行盒，不携带段落语义也不受 margin 控制，于是间距同时来自行盒与 p 的 margin 两套机制。", "<br> creates a forced line break inside a line box: no paragraph semantics, no margin, so spacing comes from two mechanisms at once."),
        fix: t("删掉 <br>，让间距只由一个来源负责：单个方向的 margin，或父容器的 gap。", "Delete the break tags so one source owns the spacing: a single-direction margin, or the parent's gap."),
        whyHidden: t("浏览器确实把视觉距离推开了，看起来合法；只有内容或字号变化、或有人用读屏器访问时才暴露。", "The lines really are pushed apart, so it looks legal; it only breaks when content or font size changes, or when a screen reader visits."),
      },
      {
        title: t("正文容器写死像素宽度", "A hard-coded pixel width for the text column"),
        html: "<main class=\"article\">\n  <p>很长的正文……</p>\n</main>",
        css: ".article {\n  width: 760px;\n  margin: 0 auto;\n}",
        symptom: t("桌面端整齐居中，手机或分屏时出现横向滚动，右侧内容被裁掉。", "Tidy and centred on a desktop, then the phone or a split window scrolls sideways and clips the right edge."),
        cause: t("width 是确定值：不参考可用空间。包含块比 760px 窄时元素照样声明 760px，溢出交给文档处理。", "width is definite and ignores available space: a narrower containing block still gets a 760px box and the overflow goes to the document."),
        fix: t("改成 max-width: 760px 配 width: 100%，让浏览器先算可用宽度、再截上限。", "Use max-width: 760px with width: 100% so the available width is computed first and clamped second."),
        whyHidden: t("开发通常在大屏进行，滚动条只在窗口变窄时出现；页面不报错，控制台也一片安静。", "Development happens on a wide window; the scrollbar only appears once the window narrows, and nothing in the console ever complains."),
      },
    ],
    bibliography: [{ label: "CSS 2.2 §9 · 视觉格式化模型", href: "https://www.w3.org/TR/CSS22/visuren.html", kind: "spec" }, { label: "CSS 2.2 §10 · 视觉格式化模型细节", href: "https://www.w3.org/TR/CSS22/visudet.html", kind: "spec" }, { label: "HTML Living Standard · 元素分区与地标", href: "https://html.spec.whatwg.org/multipage/sections.html", kind: "spec" }, { label: "WCAG 2.2 · 1.3.1 信息与关系", href: "https://www.w3.org/TR/WCAG22/#info-and-relationships", kind: "spec" }, { label: "MDN · 块级内容", href: "https://developer.mozilla.org/docs/Glossary/Block-level_content", kind: "docs" }],
    figures: [{ id: "landmark-map", caption: t("同样的方块，换成语义标签后就变成可访问性导航的锚点。", "The same boxes become accessibility anchors once they carry semantic tags.") }, { id: "block-vs-inline", caption: t("块级盒独占整行才有“剩余空间”可分配；行内盒的身高由行盒决定。", "Only a block box that fills the row has free space to distribute; an inline box takes its height from the line box.") }],
    glossary: [
      { term: "普通流", def: t("在没有 flex、grid、定位参与时浏览器默认的排版方式：块级盒自上而下、行内盒沿行排列。", "The default layout when flex, grid and positioning are absent: blocks stack top-down and inlines run along lines."), source: "CSS 2.2 §9.2" },
      { term: "块级盒", def: t("独占一行、可设宽高的盒子，参与块格式化上下文。", "A box that takes its own row, accepts width and height, and takes part in a block formatting context."), source: "CSS 2.2 §9.2.1" },
      { term: "行内盒", def: t("沿行盒排列的盒子，宽高由内容与行高决定。", "A box that flows along lines, with its size coming from content and line height."), source: "CSS 2.2 §9.2.2" },
      { term: "地标（landmark）", def: t("header / main / footer 等元素在可访问性树上的角色，读屏用户可据此直接跳转。", "The accessibility role of header, main and footer, which lets screen-reader users jump between regions."), source: "HTML 规范 · WAI-ARIA" },
      { term: "阅读宽度（measure）", def: t("正文一行的长度，通常 45–75 个字符最易读。", "The length of a line of body text; 45–75 characters reads best."), source: "排版惯例" },
      { term: "margin-inline: auto", def: t("把块级盒剩余的水平空间均分到两侧——前提是它有确定宽度。", "Splits a block box's leftover horizontal space between both sides, provided the width is definite."), source: "CSS Logical Properties 1" },
    ],
    spec: {
      quote: t("Boxes are laid out in the normal flow: block-level boxes are stacked vertically, starting at the top of the containing block; inline-level boxes are laid out horizontally within line boxes.", "Boxes are laid out in the normal flow: block-level boxes are stacked vertically, starting at the top of the containing block; inline-level boxes are laid out horizontally within line boxes."),
      quoteZh: t("普通流中的盒子这样排列：块级盒在包含块顶部开始、垂直方向依次堆叠；行内盒在行盒内水平排列。", "Normal flow: block-level boxes stack vertically from the top of the containing block while inline-level boxes are laid out horizontally inside line boxes."),
      source: "CSS 2.2 §9.4.1 · Normal flow",
      note: t("规范的措辞把两件事分开了：盒子的类型决定它参与哪种格式化上下文，位置则由包含块与流的方向决定。语义标签不在这段规则里——它属于 HTML 与可访问性规范的范畴，这正是“结构与样式分离”的实际含义。", "The wording separates two things: the box type decides which formatting context it takes part in, while position comes from the containing block and the flow direction. Semantic tags are not part of this rule — they belong to HTML and accessibility — which is what separation of structure and style really means."),
    },
    deepDive: [
      t("为什么同一个页面在不同浏览器里默认排版几乎一致？因为普通流是所有引擎里最早、最稳定的那层实现：块级盒占满包含块宽度、行内盒沿行盒排列、外边距按规则合并。任何新布局工具最终都要落回这套基础规则——flex 容器本身也是普通流里的一个盒子，只是它内部换成了另一套算法。", "Why does a page lay out almost identically in every browser by default? Because normal flow is the oldest and most stable layer every engine implements: blocks fill the containing block, inlines run along lines, margins merge by rule. Any newer layout tool lands back on that foundation — a flex container is itself an ordinary box in normal flow, with a different algorithm inside."),
      t("很多“莫名其妙的间距”追到最后是行盒造成的：行内元素之间如果存在换行或空格，就会在行内格式化上下文里产生一个空白字符的宽度。这解释了为什么把标签写成多行会出现几像素的缝隙、为什么 inline-block 之间会有看似随机的间隔——那不是 margin，而是一个真实的文本节点。", "Many mysterious gaps trace back to line boxes: a newline or a space between inline elements produces a whitespace character inside the inline formatting context. That explains the few stray pixels between tags written on separate lines and the seemingly random gaps between inline-block elements — they are a real text node, not a margin."),
    ],
    checklist: [
      t("页面上每一块内容都落在 <main> 里了吗？", "Is every piece of content inside <main>?"),
      t("有没有用连续的 <br> 或空 <div> 制造间距？", "Are repeated <br> or empty <div> used to create spacing?"),
      t("正文容器用的是 max-width，而不是写死的 width？", "Does the text container use max-width rather than a hard-coded width?"),
      t("缩到 320px 时还能正常阅读、不出现横向滚动吗？", "At 320px, is it still readable with no horizontal scrolling?"),
    ],
    html: `<main class="article">\n  <header>\n    <h1>如何理解文档流</h1>\n    <p>从结构开始认识页面</p>\n  </header>\n  <article>正文内容按顺序自上而下排列。</article>\n  <aside>相关阅读</aside>\n</main>`,
    css: `.article {\n  max-width: 720px;\n  margin-inline: auto;\n  padding: 24px;\n}`,
    demo: "article",
    controls: ["padding"],
    challenge: t("让文章保持居中，并在小屏幕上始终留出 24px 安全边距。", "Keep the article centered and always leave a 24px safe margin on small screens."),
  },
  {
    id: "box-model",
    order: 2,
    stage: "starter",
    title: t("盒模型与文档流", "Box Model and Flow"),
    summary: t("看懂 content、padding、border 与 margin 如何共同决定一个元素的最终尺寸。", "See how content, padding, border and margin decide an element's final size."),
    scenario: t("给卡片设了 280px，加上 24px 内边距后它却量出 328px 并溢出容器；或者两段之间设了 24px 间距，实际只看到 24px 而不是 48px。这两个报障几乎出现在每个项目里。", "A card is set to 280px, gains 24px of padding and suddenly measures 328px and overflows. Or two paragraphs get 24px of spacing but show a single 24px gap instead of 48px. Both complaints show up in nearly every project."),
    caseStudy: t("案例继续：那张 280px 的卡片。这一章用它量清内容、内边距、边框、外边距各占多少；第 3 章给它加一排标签（Flexbox）；第 4 章把「New」角标钉在它右上角；第 5 章让一排这样的卡片自动换列。每一步都回到同一个盒子。", "The case continues with that 280px card. This chapter measures what content, padding, border and margin each take; chapter 3 adds a tag row with Flexbox; chapter 4 pins a “New” badge to its corner; chapter 5 lets a row of such cards reflow. Every step returns to the same box."),
    goal: t("让一张卡片在加上内边距和边框后仍不溢出", "Keep a card from overflowing after padding and border are added"),
    duration: t("约 15 分钟", "15 min"),
    objectives: [
      t("说清盒子四层的顺序与作用", "Describe the four layers of a box and what each does"),
      t("用 border-box 让尺寸可预测", "Make sizes predictable with border-box"),
      t("判断宽度溢出与 margin 折叠的原因", "Diagnose width overflow and margin collapse"),
    ],
    theory: [
      {
        heading: t("盒子由内向外分四层", "A box has four layers, outside in"),
        point: "padding",
        why: t("背景和边框都画在 padding 之外、内容之内，所以加大 padding 会同时撑大盒子的占位尺寸——除非已经换成 border-box。", "Background and border are painted outside the padding and inside the box, so extra padding grows the box's footprint — unless you have switched to border-box."),
        snippet: ".card { padding: 24px 32px; }  /* 上下 24px，左右 32px */",
        pitfall: t("把 padding 当父容器的“间距”用：父容器的内边距会吃掉留给子元素的空间，子项还没到边界就被挤到换行。", "Using padding as spacing on a parent: the parent's inner padding eats the room left for children, so items wrap before they reach the edge."),
        analogy: t("盒子四层像带护边的画框：画是 content，衬纸是 padding，画框是 border，挂墙的空隙是 margin。", "The four layers are like a framed picture: the image is content, the mat is padding, the frame is border and the wall gap is margin."),
        demoHint: t("把内边距从 24 调到 40：卡片外观宽度仍是 280px（border-box 生效），但内容区变窄了。", "Move padding from 24 to 40: the outer width stays 280px with border-box while the content area shrinks."),
        variants: [{ label: t("逻辑属性 padding-inline / padding-block", "Logical properties"), note: t("padding-inline 在横排里是左右、在竖排里自动变成上下，适合要适配书写方向的项目。", "padding-inline means left and right in horizontal writing and top and bottom in vertical writing — useful when the writing direction may change.") }, { label: t("padding 不接受负值", "Padding cannot be negative"), note: t("负值会被忽略；需要重叠或外推时用负 margin 或 transform。", "Negative values are ignored; reach for negative margins or transform when you need to overlap or push outward.") }],
        walkthrough: { situation: t("卡片内边距从 24px 改到 40px，外观宽度必须不变。", "Card padding moves from 24px to 40px while the outer width must hold."), steps: [t("① 确认卡片或 reset 里有 box-sizing: border-box。", "Confirm box-sizing: border-box on the card or in the reset."), t("② 只改 padding，不动 width。", "Change padding only, leaving width alone."), t("③ 用 DevTools 量外沿宽度是否仍是 280px。", "Measure the outer width in DevTools: it should still read 280px.")], result: t("内容区变窄、外观不变；变宽说明 box-sizing 没生效。", "The content area narrows while the footprint holds; growth means box-sizing is not applied.") },
        refs: [{ label: "MDN · padding", href: "https://developer.mozilla.org/docs/Web/CSS/padding", kind: "docs" }, { label: "CSS 2.2 §8.1 盒尺寸", href: "https://www.w3.org/TR/CSS22/box.html#box-dimensions", kind: "spec" }],
        body: t("最里面是内容区，往外依次是内边距、边框和外边距。内边距属于盒子自身：背景色会覆盖它，它也因此计入元素的占位尺寸；外边距在盒子之外，永远不属于自身尺寸，还会在垂直方向与相邻元素合并。把这四层分清，就能回答一个日常问题——改内边距会不会改变布局？答案是会，除非宽度指的是外框（border-box）。", "At the centre is the content area, then padding, border and finally margin. Padding belongs to the box: its background covers the area and it counts towards the element's footprint. Margin sits outside, is never part of the element's own size, and merges with neighbours vertically. Keeping the four layers straight answers a daily question: does more padding move the layout? Yes — unless the width in question is the border box."),
        principle: t("CSS 2.2 §8.1 把盒子拆成 content、padding、border、margin 四层，并规定背景绘制到 border box 为止。padding 属于盒子内部：它既被背景覆盖，又参与元素占位尺寸——所以“加内边距会不会撑大盒子”取决于宽度指的是哪一层，而不是取决于 padding 本身。", "CSS 2.2 §8.1 splits a box into content, padding, border and margin, and paints the background up to the border box. Padding belongs to the inside of the box: it is covered by the background and it counts towards the element's footprint — so whether padding grows the box depends on which layer width refers to."),
      },
      {
        heading: t("content-box 与 border-box", "content-box versus border-box"),
        point: "box-sizing: border-box",
        why: t("默认的 content-box 里，width 只描述内容区，padding 与 border 额外叠加；border-box 把两者算进声明宽度，于是 280px 永远是 280px。", "Under the default content-box, width covers only the content area and padding plus border stack on top. border-box folds both into the declared width, so 280px stays 280px."),
        snippet: "*, *::before, *::after {\n  box-sizing: border-box;\n}",
        pitfall: t("只在部分元素上设置 border-box，同一个项目里两种尺寸模型并存，一改 padding 行为就不一致。", "Setting border-box on only some elements: two sizing models coexist in one project, so changing padding behaves inconsistently."),
        analogy: t("border-box 像按外框尺寸买柜子：说好 280px 就按外沿算，内部怎么装都不改外观尺寸。", "border-box is buying a cabinet by its outer footprint: 280px is measured on the outside, whatever goes inside."),
        demoHint: t("把内边距一路加大到撑破容器，再切到 content-box 对比一次，看两者差多少像素。", "Keep raising padding until it bursts the container, then switch to content-box and compare the pixel difference."),
        variants: [{ label: t("局部声明 border-box", "Scoped border-box"), note: t("第三方组件内部若仍按 content-box 计算，可以在它自己的根节点单独声明，不必改全局 reset。", "If a third-party component still computes as content-box, declare border-box on its own root rather than changing the global reset.") }, { label: t("不改变内在尺寸", "It does not change intrinsic sizing"), note: t("border-box 只改变声明尺寸的解释方式；图片等替换元素仍按固有比例与 max-width 求解。", "border-box only changes how a declared size is interpreted; replaced elements still resolve from their intrinsic ratio and max-width.") }],
        walkthrough: { situation: t("280px 的卡片渲染成 348px，把侧栏挤出横向滚动。", "A 280px card rendered at 348px and pushed the sidebar into sideways scrolling."), steps: [t("① 算出多的 68px = padding 64 + border 4，属于 content-box 行为。", "Account for the extra 68px as 64px padding plus 4px border — content-box behaviour."), t("② 在 reset 里全局写 box-sizing: border-box。", "Set box-sizing: border-box globally in the reset."), t("③ 复核每张卡片与侧栏都不再溢出。", "Re-check every card and the sidebar for overflow.")], result: t("声明宽度等于外框宽度，尺寸可预测，溢出消失。", "The declared width equals the border box, sizes become predictable and the overflow is gone.") },
        refs: [{ label: "MDN · box-sizing", href: "https://developer.mozilla.org/docs/Web/CSS/box-sizing", kind: "docs" }, { label: "web.dev · Box model", href: "https://web.dev/learn/css/box-model", kind: "article" }, { label: "CSS UI 4 · box-sizing", href: "https://drafts.csswg.org/css-ui-4/#box-sizing", kind: "spec" }],
        body: t("默认的 content-box 会把内边距与边框加在声明宽度之外，于是 280px 加上 32px 的两侧内边距就变成 344px，再加边框 348px——设计稿与实现之间那几十像素的差异，大多来自这里。换成 border-box 之后，声明的 width 直接描述外框，尺寸变得可预测，溢出也更少见，这也是现代项目在 reset 里全局设置它的原因。", "The default content-box adds padding and border on top of the declared width, so 280px with 32px of padding on each side becomes 344px, and 348px once borders join in. Most of those tens of pixels between design and implementation start here. With border-box the declared width describes the border box, sizes become predictable and overflow becomes rarer, which is why modern projects set it globally in a reset."),
        principle: t("CSS UI 4 规定 box-sizing 的初始值是 content-box：此时 width 只描述内容区，padding 与 border 叠加在外。切到 border-box 后 width 描述的是 border box，含内边距与边框——这也是 280px 卡片能保持 280px 的规范依据，而不是浏览器的宽容。", "CSS UI 4 sets box-sizing to content-box initially: width then covers only the content area while padding and border stack outside. With border-box, width covers the border box including both — which is the specification behind a 280px card staying 280px, not browser leniency."),
      },
      {
        heading: t("外边距会与相邻元素合并", "Margins collapse with neighbours"),
        point: "margin",
        why: t("上下相邻的块级元素，垂直 margin 会折叠成较大的那一个；父子之间没有边框或内边距时也会发生，于是子元素的上边距常常“跑”到父元素外面。", "Vertically adjacent block elements collapse their margins into the larger value. It also happens between a parent and child with no border or padding, so a child's top margin often escapes the parent."),
        snippet: ".list > * + * {\n  margin-top: 16px;  /* 只在相邻项之间产生间距 */\n}",
        pitfall: t("用 margin 精确拼出设计稿的间距，折叠之后总数不对；改用一个方向的 margin，或者直接用 gap。", "Building exact design spacing from margins and losing half of it to collapsing. Use a single-direction margin, or just use gap."),
        analogy: t("外边距折叠像两人的社交距离：双方各退 24px，实际距离不是 48px，而是按退得更远的那位算。", "Margin collapsing is social distance: both step back 24px and the gap is 24px, not 48 — the larger retreat wins."),
        demoHint: t("缩到 320px 视口，确认卡片依旧不溢出——它已经受 max-width: 100% 保护。", "At a 320px viewport confirm the card still fits: max-width: 100% is protecting it."),
        variants: [{ label: t("只给一个方向", "One direction only"), note: t(".stack > * + * { margin-top: 16px } 让间距只出现在项目之间，首尾不留空白，也避免折叠带来的意外。", ".stack > * + * { margin-top: 16px } puts space only between items, leaves the ends clean and avoids collapsing surprises.") }, { label: t("flex / grid 子项不折叠", "No collapsing inside flex or grid"), note: t("父容器一旦成为弹性或网格容器，子项外边距不再与父级合并——同一个组件换个父容器，间距可能就变了。", "Once the parent is a flex or grid container, child margins stop merging with it — move the same component to another parent and its spacing changes.") }],
        walkthrough: { situation: t("列表项之间要 16px 间距，第一版每项都写 margin-bottom，首尾也留白。", "List items need 16px between them; a bottom margin on each item added leading and trailing gaps."), steps: [t("① 删掉统一的 margin-bottom。", "Remove the blanket bottom margin."), t("② 用 .list > * + * { margin-top: 16px } 只作用于相邻项。", "Use .list > * + * { margin-top: 16px } so only neighbours are spaced."), t("③ 或者改成 flex 列容器，用 gap: 16px 统一管理。", "Or make it a column flex container and let gap: 16px own it.")], result: t("间距只落在项目之间，首尾干净，也不必补偿折叠。", "Space lands between items only, the ends stay clean and collapsing needs no compensation.") },
        refs: [{ label: "MDN · margin", href: "https://developer.mozilla.org/docs/Web/CSS/margin", kind: "docs" }, { label: "MDN · 外边距折叠", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing", kind: "docs" }, { label: "CSS 2.2 §8.3.1 外边距折叠", href: "https://www.w3.org/TR/CSS22/box.html#collapsing-margins", kind: "spec" }],
        body: t("两个上下相邻的块级元素，它们的垂直外边距会折叠成较大的那一个，而不是相加；父子之间没有边框或内边距隔开时也会发生，空元素甚至能自我折叠。这不是 bug 而是规则：折叠掉的是“不影响布局的空白”。因此 margin 不是可叠加的间距系统，需要精确距离时应当换用 padding，或者让父容器用 gap 统一管理间距。", "Two stacked block elements collapse their vertical margins into the larger one instead of adding them up; the same happens between parent and child with nothing separating them, and an empty element can even collapse with itself. That is a rule, not a bug: the whitespace being collapsed would not affect layout. Margins are therefore not an additive spacing system — for exact distances reach for padding, or let a parent own the spacing with gap."),
        principle: t("CSS 2.2 §8.3.1 完整写出外边距折叠的条件：相邻兄弟之间、父子之间（中间没有 border / padding / 新的格式化上下文时）、以及空元素自身。折叠的是“不影响布局的空白”，因此 margin 不是可相加的间距系统——需要精确间距时规范给的工具是 padding 或 flex/grid 的 gap。", "CSS 2.2 §8.3.1 spells out margin collapsing: between adjacent siblings, between parent and child when nothing separates them, and inside an empty element. It collapses whitespace that would not affect layout, so margins are not an additive spacing system; for exact spacing the spec points you at padding or a flex/grid gap."),
      },
      {
        heading: t("宽度溢出通常来自三件事", "Overflow usually comes from three things"),
        point: "max-width: 100%",
        why: t("图片、iframe、pre 的固有宽度常常大于容器，max-width: 100% 让它们在窄容器里收缩，而不是把整页撑宽。", "Images, iframes and pre blocks often carry an intrinsic width wider than their container. max-width: 100% lets them shrink instead of widening the whole page."),
        snippet: "img, svg, video {\n  max-width: 100%;\n  height: auto;   /* 保持原始比例 */\n}",
        pitfall: t("只写 max-width: 100% 忘了 height: auto，图片被压扁；flex 或 grid 的子项还需要 min-width: 0 才真正缩得下去。", "Adding max-width: 100% but forgetting height: auto, which squashes the image. Flex and grid children also need min-width: 0 before they truly shrink."),
        analogy: t("替换元素像自带尺寸的照片：你只能给它一个上限，不能凭空改变它的比例。", "A replaced element is a photo with its own size: you can cap it, but you cannot invent a new aspect ratio."),
        demoHint: t("换一段更长的文案，观察高度随内容增长，而不是宽度被撑开。", "Paste longer copy and watch the height grow with the content instead of the width bursting."),
        variants: [{ label: t(":where() 一次覆盖", ":where() to cover them all"), note: t(":where(img, svg, video, iframe, pre) { max-width: 100% } 一行覆盖常见替换元素与代码块，且不额外提升优先级。", ":where(img, svg, video, iframe, pre) { max-width: 100% } covers the usual replaced elements and code blocks in one line with no added specificity.") }, { label: t("一定要配 min-width: 0", "It needs min-width: 0"), note: t("在 flex/grid 子项里只有 max-width 不足以让它收缩：自动最小尺寸仍是 min-content，长内容照样撑破容器。", "Inside a flex or grid child, max-width alone will not shrink it: the automatic minimum is still min-content and long content bursts the container anyway.") }],
        walkthrough: { situation: t("文章里的 1200px 截图在 360px 手机上撑出横向滚动。", "A 1200px screenshot drags the page sideways on a 360px phone."), steps: [t("① 给 img 加 max-width: 100% 与 height: auto。", "Give images max-width: 100% with height: auto."), t("② 把 pre 与 iframe 纳入同一条规则。", "Bring pre blocks and iframes into the same rule."), t("③ 若在 flex 子项里仍不缩小，补 min-width: 0。", "If it still will not shrink inside a flex child, add min-width: 0.")], result: t("图片等比缩小，页面不再横向溢出。", "Images scale down with their ratio intact and the page stops scrolling sideways.") },
        refs: [{ label: "MDN · max-width", href: "https://developer.mozilla.org/docs/Web/CSS/max-width", kind: "docs" }, { label: "MDN · min-width", href: "https://developer.mozilla.org/docs/Web/CSS/min-width", kind: "docs" }, { label: "CSS Flexbox 1 §4.5 自动最小尺寸", href: "https://drafts.csswg.org/css-flexbox-1/#min-size-auto", kind: "spec" }],
        body: t("宽度溢出通常来自三件事：固定宽度加内边距、子元素写死了更大的宽度、或者长串英文与图片不肯换行。前两种可以用 border-box 与相对单位化解，第三种要看清元素类型——图片这类替换元素有固有尺寸，max-width: 100% 能限制它；而 flex/grid 子项的最小尺寸按内容计算，必须显式写 min-width: 0，内容才真正缩得下去。", "Horizontal overflow usually comes from three places: a fixed width plus padding, a child with a larger hard-coded width, or long unbroken text and images that refuse to shrink. The first two yield to border-box and relative units; the third needs the element type in view — a replaced element such as an image has an intrinsic size that max-width: 100% can cap, while a flex or grid child is at least min-content wide and only min-width: 0 lets its content truly shrink."),
        principle: t("img、iframe 这类替换元素有固有尺寸（CSS 2.2 §10.4 的 shrink-to-fit 与替换元素尺寸规则），max-width 参与约束求解，所以图片能在窄容器里等比缩小。而 flex / grid 子项的自动最小尺寸被定义为 min-content（Flexbox §4.5 / Grid §6.6），内容不可断行时它拒绝收缩——这就是还需要 min-width: 0 的原因。", "Replaced elements such as img and iframe carry an intrinsic size (CSS 2.2 §10.4, shrink-to-fit), and max-width takes part in that constraint solving, so an image scales down inside a narrow container. Flex and grid children, however, get an automatic minimum size of min-content (Flexbox §4.5 / Grid §6.6) and refuse to shrink around unbreakable content — which is why min-width: 0 is still needed."),
      },
    ],
    keyPoints: [
      { term: "box-sizing: border-box", desc: t("让声明的宽高包含内边距与边框。", "Make the declared size include padding and border."), detail: t("现代项目通常在 reset 里全局设置；第三方组件的内部设置管不到父级对它的尺寸计算。", "Modern projects set it globally in a reset; a component's own rule cannot change how its parent measures it.") },
      { term: "width / height", desc: t("设置元素内容区的尺寸（受 box-sizing 影响）。", "Set the element's size, interpreted through box-sizing."), detail: t("宽度多用百分比、fr 或 clamp，高度尽量留给内容——写死高度最容易在换行时溢出。", "Widths favour percentages, fr or clamp; heights are best left to content — hard-coded heights overflow as soon as text wraps.") },
      { term: "padding", desc: t("内容与边框之间的内边距，属于盒子自身。", "Space between content and border, inside the box."), detail: t("简写顺序是上 右 下 左；写两个值时表示“上下 左右”。", "The shorthand runs top right bottom left; two values mean vertical horizontal.") },
      { term: "border", desc: t("边框，会增加盒子的视觉与占位尺寸。", "A border that adds both visual weight and size."), detail: t("border 会占位并撑大盒子；只需要视觉描边时可以用 outline 或 box-shadow，它们不影响尺寸。", "border takes up space and grows the box; when you only need a visual edge, outline or box-shadow keeps the size intact.") },
      { term: "margin", desc: t("盒子外侧的间距，垂直方向可能折叠。", "Space outside the box; vertical margins may collapse."), detail: t("垂直方向可能折叠、水平方向不会；auto 只在宽度确定时才会居中。", "Vertical margins may collapse while horizontal ones do not; auto only centers when the width is definite.") },
      { term: "max-width: 100%", desc: t("让元素在窄容器里自动收缩，避免溢出。", "Let an element shrink inside a narrow container."), detail: t("常用于图片与代码块；配合 min-width: 0 让 flex / grid 子项也能收缩。", "Common on images and code blocks; pair it with min-width: 0 so flex and grid children can shrink too.") },
    ],
    mistakes: [
      t("以为 280px 的卡片加上 48px padding 后还是 280px。", "Assuming a 280px card stays 280px after adding 48px of padding."),
      t("用 margin 去补相邻元素之间的间距，结果被折叠掉一半。", "Using margin to space stacked elements and losing half of it to collapsing."),
    ],
    practice: [
      t("给卡片加上 box-sizing: border-box。", "Add box-sizing: border-box to the card."),
      t("把 padding 调到 40px 以上，确认宽度仍为 280px。", "Raise padding past 40px and confirm the width is still 280px."),
      t("改用 gap 而不是 margin 来控制卡片内部间距。", "Switch to gap instead of margin for the internal spacing."),
    ],
    focus: [
      t("分清 width 描述的是哪一层，从而预判加 padding 后占位尺寸怎么变。", "Knowing which layer width describes, so you can predict what padding does to the footprint."),
      t("外边距折叠的四类触发条件与规避方式（gap / 单方向 margin / 新格式化上下文）。", "The four conditions that trigger margin collapsing and the ways out of each."),
      t("替换元素与 flex/grid 子项各自不同的“最小尺寸”来源。", "Where the minimum size comes from for replaced elements versus flex and grid children."),
    ],
    difficulty: [
      t("把 content-box 当成“浏览器的怪癖”，而不是 box-sizing 的初始值。", "Treating content-box as a browser quirk instead of the initial value of box-sizing."),
      t("用 margin 精确拼间距，却算不出折叠后的结果。", "Building exact spacing from margins while being unable to predict the collapsed result."),
      t("看到图片在 flex 里不缩小，第一反应是加宽度而不是查最小尺寸来源。", "Seeing an image refuse to shrink in flex and reaching for a width instead of the minimum-size rule."),
    ],
    examPoints: [
      t("给出 content-box 与 border-box 的同一段代码，要求算出实际占位宽度。", "Show the same rules under content-box and border-box and ask for the resulting footprint."),
      t("给两段相邻文本，要求解释“为什么 24px + 24px 只呈现出 24px”，并写两种修法。", "Two adjacent paragraphs: explain why 24px plus 24px renders as 24px, then give two fixes."),
      t("提问：img 与 flex 子项的最小尺寸分别由什么决定？", "Ask what determines the minimum size of an img versus a flex child."),
    ],
    counterExamples: [
      {
        title: t("卡片写 280px 却没有 border-box", "A 280px card without border-box"),
        html: "<article class=\"card\">\n  <h3>盒子模型</h3>\n  <p>内边距是 32px，卡片却变宽了。</p>\n</article>",
        css: ".card {\n  width: 280px;\n  padding: 32px;      /* content-box：占位 344px */\n  border: 2px solid currentColor;\n}",
        symptom: t("设计稿要求 280px，实际渲染 348px；放进 320px 的侧栏时溢出或挤走相邻内容。", "The spec says 280px, the render is 348px, and inside a 320px sidebar it overflows or pushes its neighbour."),
        cause: t("默认 box-sizing 是 content-box：width 只覆盖内容区，32px×2 的内边距与 2px×2 的边框另外加上去（280 + 64 + 4 = 348）。", "box-sizing defaults to content-box: width covers the content area only, so 32px of padding on each side plus 2px borders are added on top (280 + 64 + 4)."),
        fix: t("在 reset 里全局写 *, *::before, *::after { box-sizing: border-box }，让声明的宽度包含内边距与边框。", "Set box-sizing: border-box globally in a reset so the declared width includes padding and borders."),
        whyHidden: t("单个卡片看起来正常，溢出只在容器更窄或 padding 变大时出现；数值差 68px 又不足以让人立刻怀疑盒模型。", "One card looks fine; the overflow only appears in a narrower container or with larger padding, and a 68px difference is not obvious enough to blame on the box model."),
      },
    ],
    bibliography: [{ label: "CSS 2.2 §8 · 盒模型", href: "https://www.w3.org/TR/CSS22/box.html", kind: "spec" }, { label: "CSS UI 4 · box-sizing", href: "https://drafts.csswg.org/css-ui-4/#box-sizing", kind: "spec" }, { label: "CSS Sizing 3 · 内在尺寸", href: "https://drafts.csswg.org/css-sizing-3/#intrinsic-sizes", kind: "spec" }, { label: "CSS Flexbox 1 §4.5 · 自动最小尺寸", href: "https://drafts.csswg.org/css-flexbox-1/#min-size-auto", kind: "spec" }, { label: "web.dev · Box model", href: "https://web.dev/learn/css/box-model", kind: "article" }],
    figures: [{ id: "box-layers", caption: t("四层各有归属：padding 撑大占位，margin 在盒外且可能折叠。", "Each layer has an owner: padding grows the footprint, margin sits outside and may collapse.") }, { id: "margin-collapse", caption: t("24px + 24px 不是 48px；要精确间距就换成 gap 或单方向 margin。", "24px plus 24px is not 48px; for exact spacing switch to gap or one-directional margins.") }],
    glossary: [
      { term: "内容盒 / 内边距 / 边框 / 外边距", def: t("从内到外的四层，前两层属于盒子自身，最后一层在盒子之外。", "The four layers from the inside out; the first two belong to the box and the last sits outside it."), source: "CSS 2.2 §8.1" },
      { term: "box-sizing", def: t("决定 width 描述的是内容盒（content-box）还是含内边距与边框的外框（border-box）。", "Decides whether width describes the content box or the border box."), source: "CSS UI 4" },
      { term: "外边距折叠", def: t("相邻块级元素的垂直 margin 合并为较大者，而不是相加。", "Vertical margins of adjacent blocks merge into the larger value instead of adding up."), source: "CSS 2.2 §8.3.1" },
      { term: "内在尺寸", def: t("由内容或固有比例决定的尺寸，图片与替换元素都有。", "A size derived from content or an intrinsic ratio, as images and replaced elements have."), source: "CSS Sizing 3" },
      { term: "自动最小尺寸", def: t("flex / grid 子项默认的最小尺寸为 min-content，因此长内容不会自动收缩。", "Flex and grid children default to a min-content minimum, so long content will not shrink on its own."), source: "Flexbox §4.5 / Grid §6.6" },
      { term: "替换元素", def: t("尺寸来自外部资源而非 CSS 的元素，例如 img、video、iframe。", "An element whose size comes from an external resource rather than CSS, such as img, video or iframe."), source: "CSS 2.2 §3.1" },
    ],
    spec: {
      quote: t("The content area is surrounded by padding. The background of the box is painted in the padding area. The margin area extends beyond the border area.", "The content area is surrounded by padding. The background of the box is painted in the padding area. The margin area extends beyond the border area."),
      quoteZh: t("内容区被内边距包围，盒子的背景绘制到内边距区域；外边距区域延伸在边框区域之外。", "The content area is surrounded by padding; the box background is painted in the padding area; the margin area extends beyond the border area."),
      source: "CSS 2.2 §8.1 · Box dimensions",
      note: t("背景绘制到内边距、外边距在边框之外——这两句话解释了 padding 与 margin 最实用的差别：padding 是盒内的空白，会被背景覆盖、计入占位；margin 是盒外的空白，既不属于盒子，也参与折叠与剩余空间分配。", "Background painted through the padding and margin beyond the border sum up the practical difference: padding is inside the box, covered by the background and counted in its footprint, while margin is outside it — not part of the box, yet part of collapsing and free-space distribution."),
    },
    deepDive: [
      t("外边距折叠常被当成浏览器的坏脾气，其实它服务一个排版目标：段落之间的空白不应随嵌套层数增加而累加。设想一段文字被若干层 div 包着，如果父子外边距相加，包得越深间距就越大；折叠让“同样的语义距离”在不同嵌套深度下看起来一致。", "Margin collapsing looks like a browser temper tantrum but serves a typographic goal: the space between paragraphs should not grow with nesting depth. Picture a paragraph wrapped in several divs — if parent and child margins added up, deeper nesting would mean bigger gaps. Collapsing keeps the same semantic distance looking the same at any depth."),
      t("为什么 flex 与 grid 子项不用担心折叠？因为折叠只发生在块格式化上下文里：父容器一旦建立弹性或网格上下文，子元素外边距就不再与父级合并。这也解释了一个常见现象——同一个组件放进 flex 容器后垂直间距突然“变了”，其实是从折叠模式切换到了非折叠模式。", "Why do flex and grid children not have to worry about collapsing? Because collapsing happens only in a block formatting context: once the parent establishes a flex or grid context, child margins stop merging with it. That also explains a familiar surprise — moving a component into a flex container changes its vertical spacing, because collapsing is no longer in play."),
    ],
    checklist: [
      t("卡片加完 padding 之后宽度还是 280px 吗？", "Is the card still 280px after padding is added?"),
      t("页面里还有靠 margin 拼出来的间距，被折叠掉一半吗？", "Is any spacing still built from margins and losing half to collapsing?"),
      t("长单词、长链接或代码块会不会撑破容器？", "Do long words, long links or code blocks blow out the container?"),
      t("换一套字号或更长的文案后，盒子尺寸还成立吗？", "After a different font size or longer copy, do the box sizes still hold?"),
    ],
    html: `<article class="card">\n  <h3>盒模型</h3>\n  <p>改变内边距，观察内容与边框之间的空间。</p>\n</article>`,
    css: `.card {\n  box-sizing: border-box;\n  width: 280px;\n  padding: 24px;\n  border: 2px solid currentColor;\n}`,
    demo: "card",
    controls: ["padding"],
    challenge: t("让 280px 宽的卡片在继续增加内边距后仍然不溢出容器。", "Keep a 280px card from overflowing as you keep adding padding."),
  },
  {
    id: "flexbox",
    order: 3,
    stage: "foundation",
    title: t("Flexbox 弹性布局", "Flexbox Layout"),
    summary: t("用一维布局控制一组元素的方向、对齐、间距与伸缩。", "Control direction, alignment, spacing and growth for a row of items."),
    scenario: t("导航栏、工具栏、卡片行、页脚链接——凡是“一行或一列”的元素集合，几乎都用 Flexbox 排列；另一个日常任务是让某个子元素吃掉剩余空间，而另一个保持固定宽度。", "Navigation bars, toolbars, card rows, footer links: almost everything that lives in one row or one column uses Flexbox. Its other everyday job is letting one child absorb the leftover space while another stays fixed."),
    caseStudy: t("案例继续：文章页顶部的「标签行」，以及一张卡片里的一排按钮。第 3 章用 Flexbox 把它们排成一行并让长标题吃掉剩余宽度；第 4 章把角标钉在这排按钮的右上角；第 7 章把同一套写法搬去做首页 Hero。", "The case continues with the tag row at the top of the article page and the button row inside a card. Chapter 3 lays them out as one row with Flexbox and lets a long title absorb the leftover width; chapter 4 pins a badge to that row's corner; chapter 7 reuses the same recipe for the home-page hero."),
    goal: t("完成一个导航栏和一个等高卡片列表", "Build a navigation bar and a row of equal-height cards"),
    duration: t("约 20 分钟", "20 min"),
    objectives: [
      t("根据 flex-direction 判断主轴与交叉轴", "Derive the main and cross axis from flex-direction"),
      t("用 justify-content 与 align-items 精确对齐", "Align precisely with justify-content and align-items"),
      t("用 gap、flex 与 flex-wrap 控制间距和伸缩", "Control spacing and growth with gap, flex and flex-wrap"),
    ],
    theory: [
      {
        heading: t("Flex 解决的是一维排列", "Flex solves one-dimensional arrangement"),
        point: "display: flex",
        why: t("Flex 只处理一个方向：主轴。这既是它比 Grid 简单的原因，也是它不擅长二维对齐的原因——需要行列同时对齐时应该交给 Grid。", "Flex only concerns one direction: the main axis. That is why it is simpler than Grid, and also why it struggles with two-dimensional alignment: reach for Grid when rows and columns must line up together."),
        snippet: `.nav {\n  display: flex;\n  gap: 24px;\n}`,
        pitfall: t("把 display: flex 写在项目上而不是容器上。弹性布局作用于容器的直接子元素，写错层级等于没写。", "Putting display: flex on the item instead of the container. Flex applies to the container's direct children; the wrong level does nothing."),
        analogy: t("弹性容器像一条传送带：主轴就是传送带的方向，项目沿着它排队。", "A flex container is a conveyor belt: the main axis is the belt's direction and items queue along it."),
        demoHint: t("把方向从 row 切到 column，再分别动 justify 与 align，确认两个属性作用轴交换了。", "Switch direction from row to column, then move justify and align in turn: the two properties have swapped axes."),
        variants: [{ label: t("inline-flex", "inline-flex"), note: t("容器本身要参与行内排版时用它，例如句子中间的一组徽章；内部行为与 flex 完全一致。", "Use it when the container itself should sit inline, such as a group of badges inside a sentence; everything inside behaves exactly like flex.") }, { label: t("只作用于直接子元素", "Direct children only"), note: t("display: flex 只让直接子元素成为项目；孙子元素按各自 display 参与排版，需要时在中间再加一层容器。", "display: flex only turns direct children into items; grandchildren follow their own display, so add a container in between when needed.") }],
        walkthrough: { situation: t("文章顶部的标签行要把 4 个标签排成一行、间距统一。", "The tag row at the top of the article must lay four tags in one line with even spacing."), steps: [t("① 给容器（不是标签）写 display: flex。", "Put display: flex on the container, not the tags."), t("② 用 gap 控制间距，不用 margin。", "Control spacing with gap rather than margins."), t("③ 确认容器宽度不变、标签按内容宽度排列。", "Confirm the container width is unchanged and tags size to content.")], result: t("标签一行排列、间距一致；容器仍是普通流里的一个盒子。", "Tags line up evenly while the container stays an ordinary box in normal flow.") },
        refs: [{ label: "MDN · Flexbox 基本概念", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox", kind: "docs" }, { label: "web.dev · Flexbox", href: "https://web.dev/learn/css/flexbox", kind: "article" }, { label: "CSS Flexbox 1 §4.5 · 自动最小尺寸", href: "https://drafts.csswg.org/css-flexbox-1/#min-size-auto", kind: "spec" }, { label: "CSS Flexbox 1 §5.1 · 主轴", href: "https://drafts.csswg.org/css-flexbox-1/#flex-direction-property", kind: "spec" }],
        body: t("给容器加上 display: flex，它的直接子元素就进入弹性格式化上下文，沿一条主轴排列。它擅长导航栏、工具栏、卡片行这类“一行或一列”的问题；容器本身仍是普通流里的一个盒子，所以它自身的宽度、外边距与外部关系不变。反过来，若元素需要在行与列两个方向上同时对齐，就该交给 Grid——这是选择工具的第一道分界线。", "Add display: flex to a container and its direct children enter a flexible formatting context, arranged along one main axis. It shines on navigation bars, toolbars and card rows — problems that live in one row or one column. The container itself is still an ordinary box in normal flow, so its own width and margins behave as before. When items must align in both directions at once, that is Grid's job, and this is the first dividing line between the two tools."),
        principle: t("Flexbox §3、§4 规定：容器一旦成为 flex container，其子元素就处于弹性格式化上下文中，并默认取 flex: 0 1 auto——不放大、可收缩、基准尺寸取内容宽度。所以“加了 display: flex 却没有铺满”不是失效，而是默认值本来如此，需要 flex: 1 或宽度声明去改变它。", "Flexbox §3 and §4 state that once a container becomes a flex container its children live in a flexible formatting context and default to flex: 0 1 auto: no growing, shrinking allowed, base size from content. So “display: flex did nothing” is not a failure — that is simply the initial value."),
      },
      {
        heading: t("先找主轴，再选属性", "Find the main axis before picking properties"),
        point: "flex-direction",
        why: t("justify-content 只沿主轴工作，align-items 只沿交叉轴工作。flex-direction 一改，两者的作用方向跟着交换——这是初学 Flexbox 最容易混乱的地方。", "justify-content only works along the main axis and align-items only along the cross axis. Change flex-direction and their directions swap, which is the most confusing part of learning Flexbox."),
        snippet: `.hero {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; /* 主轴＝垂直 */\n  align-items: center;     /* 交叉轴＝水平 */\n}`,
        pitfall: t("把 justify-content 当成“水平居中”。方向改成 column 之后，它控制的是垂直方向。", "Treating justify-content as horizontal centering. Once the direction is column it controls the vertical direction."),
        analogy: t("justify-content 管的是“在这条线上怎么分布”，align-items 管的是“垂直于它怎么对齐”。", "justify-content asks how items are distributed along the line; align-items asks how they align across it."),
        demoHint: t("把 justify 换成 space-between：首项贴左、末项贴右，中间均分——这正是导航栏需要的分布。", "Set justify to space-between: first item left, last right, the rest shared — exactly what a navbar needs."),
        variants: [{ label: t("row-reverse 的代价", "The cost of row-reverse"), note: t("视觉顺序反转而 DOM 不变，焦点与读屏顺序会和视觉不一致；需要顺序变化就改 DOM。", "Visual order flips while the DOM keeps its order, so focus and screen-reader order disagree with the eyes; change the DOM when order matters.") }, { label: t("writing-mode 会改变主轴含义", "writing-mode changes the axis"), note: t("竖排文本里 row 是纵向、column 是横向：主轴始终绑定书写方向。", "In vertical writing, row runs vertically and column horizontally: the main axis is always tied to the writing direction.") }],
        walkthrough: { situation: t("导航在桌面横排两端对齐，在手机上竖排居中。", "The nav sits as a space-between row on desktop and a centred column on mobile."), steps: [t("① 桌面：flex-direction: row 加 justify-content: space-between。", "Desktop: flex-direction: row with justify-content: space-between."), t("② 断点内改成 column 加 align-items: center。", "Inside the breakpoint switch to column with align-items: center."), t("③ 确认 DOM 顺序没变，只是排版方向变了。", "Confirm the DOM order is untouched and only the direction changed.")], result: t("一套 DOM 支撑两种排布，键盘顺序始终与阅读顺序一致。", "One DOM serves both arrangements and keyboard order still matches reading order.") },
        refs: [{ label: "MDN · flex-direction", href: "https://developer.mozilla.org/docs/Web/CSS/flex-direction", kind: "docs" }, { label: "CSS Flexbox 1 §8.2 · justify-content", href: "https://drafts.csswg.org/css-flexbox-1/#justify-content-property", kind: "spec" }],
        body: t("flex-direction 决定主轴：row 时主轴水平，column 时主轴垂直。align-items 沿交叉轴对齐，justify-content 沿主轴分配空间，两条轴始终正交，因此换方向等于让这两个属性交换作用对象。初学 Flexbox 的混乱几乎都来自一点——把 justify-content 记成“水平居中”，方向一换就解释不通。", "flex-direction sets the main axis: horizontal for row, vertical for column. align-items aligns on the cross axis while justify-content distributes space along the main one, and the axes stay orthogonal, so changing direction swaps what those two properties act on. Almost all early confusion about Flexbox comes from one habit — filing justify-content under “horizontal centring”, which stops making sense the moment the direction changes."),
        principle: t("§5.1 用 flex-direction 定义主轴，§8.2 的 justify-content 沿主轴分配空间，§8.4 的 align-items 沿交叉轴对齐。两条轴始终正交：把方向换成 column，justify-content 就变成纵向分配——属性名不变、作用轴交换，这是 Flexbox 最容易被误记的一点。", "§5.1 defines the main axis with flex-direction, §8.2 distributes space along it with justify-content, and §8.4 aligns on the cross axis with align-items. The axes stay orthogonal: switch to column and justify-content now distributes vertically — same property names, swapped axes."),
      },
      {
        heading: t("间距优先用 gap", "Prefer gap for spacing"),
        point: "gap",
        why: t("gap 只在项目之间产生间距：既不在容器首尾留下空白，也不会像 margin 那样折叠。间距由父容器统一管理，子元素不需要知道彼此的存在。", "gap only creates space between items: no leading or trailing gaps, and no margin collapsing. The parent owns the spacing and children do not need to know about each other."),
        snippet: `.list {\n  display: flex;\n  gap: 16px;\n}\n/* 不要用 .list > * + * { margin-left: 16px } */`,
        pitfall: t("用 margin-right 给每个项目加间距，最后一个项目也会带上一段多余空白，行尾对齐就歪了。", "Adding margin-right to every item leaves extra space on the last one, which throws off the right edge."),
        analogy: t("gap 像货架隔板：只在货物之间出现，货架两端不会多出隔板。", "gap is a shelf divider: it appears between goods only, never at the ends of the shelf."),
        demoHint: t("把 gap 从 8 调到 32，确认只有项目之间变宽，容器两端没有跟着变化。", "Move gap from 8 to 32 and confirm only the space between items grows, not the container's edges."),
        variants: [{ label: t("justify-content: space-evenly", "justify-content: space-evenly"), note: t("首尾与项目之间均分空白，比 space-around 更直观，统计卡片行常用它。", "It splits free space evenly everywhere including the ends, which reads better than space-around — handy for statistic card rows.") }, { label: t("gap 只在项目之间", "gap sits between items only"), note: t("需要首尾也留白时不能用 gap：那属于容器的 padding。", "When the ends need space too, gap is the wrong tool: that belongs to the container's padding.") }],
        walkthrough: { situation: t("导航项间距 24px，第一版用 margin-right，居中时整体偏左。", "Nav items need 24px apart; a margin-right version sat off-centre."), steps: [t("① 删掉 margin-right。", "Remove the margin-right."), t("② 容器加 gap: 24px。", "Add gap: 24px to the container."), t("③ 把 justify-content 换成 center，确认精确居中。", "Switch justify-content to center and confirm exact centring.")], result: t("间距只出现在项目之间，居中不再偏移。", "Spacing sits between items only and centring no longer drifts.") },
        refs: [{ label: "MDN · gap", href: "https://developer.mozilla.org/docs/Web/CSS/gap", kind: "docs" }, { label: "CSS Flexbox 1 §8.1 · gap", href: "https://drafts.csswg.org/css-flexbox-1/#gutters", kind: "spec" }],
        body: t("gap 是 row-gap 与 column-gap 的简写：间距由容器统一管理，只出现在项目之间，首尾不会多出空白。相比给每个项目加 margin，它不会因为末项后面也留白而让参与分配的总宽度多算，换行之后每行的间距也保持一致；更重要的是，间距这件事从此只有一个来源，改设计稿时不必逐项检查。", "gap is a shorthand for row-gap and column-gap: the container owns the spacing, it appears only between items and never at the ends. Compared with a margin on each item, it does not inflate the total width used for free-space distribution by leaving a trailing gap, and wrapped rows keep identical spacing. More importantly, spacing now has exactly one source, so a design change no longer means auditing every item."),
        principle: t("§8.1 的 gap 是 row-gap 与 column-gap 的简写，规范明确它只出现在项目之间，不在容器首尾产生空白。这与 margin 的语义不同：margin 属于盒子自身、参与外边距折叠与剩余空间分配，而 gap 属于容器、是排版阶段的固定间隔。", "The gap property in §8.1 is a shorthand for row-gap and column-gap, and the spec says it only appears between items, never at the container's edges. Margins behave differently: they belong to the box, collapse, and join the free-space distribution, while a gap belongs to the container and is a fixed interval during layout."),
      },
      {
        heading: t("伸缩与换行", "Growing and wrapping"),
        point: "flex: 1",
        why: t("flex 是 flex-grow / flex-shrink / flex-basis 的简写。flex: 1 等于 flex: 1 1 0%，项目从 0 开始平分剩余空间，而不是从自身内容宽度开始。", "flex is shorthand for flex-grow, flex-shrink and flex-basis. flex: 1 means flex: 1 1 0%, so items share the space starting from zero rather than from their content width."),
        snippet: `.split {\n  display: flex;\n  gap: 24px;\n}\n.split aside { flex: 0 0 240px; }\n.split main  { flex: 1; min-width: 0; }`,
        pitfall: t("给可压缩的子元素忘记 min-width: 0，内部的长文本或表格会把布局撑破。", "Forgetting min-width: 0 on a shrinkable child: long text or a table inside will blow up the layout."),
        analogy: t("flex: 1 像按人数分蛋糕，min-width: 0 才是允许把每份再切小一点。", "flex: 1 is slicing the cake by headcount; min-width: 0 is permission to cut each slice smaller still."),
        demoHint: t("把窗口缩到 320px，确认标签行不重叠、不溢出；若被压缩，就检查有没有 min-width: 0。", "Shrink the window to 320px and confirm the tag row neither overlaps nor overflows; if it squeezes wrongly, check min-width: 0."),
        variants: [{ label: t("flex: 1 1 220px", "flex: 1 1 220px"), note: t("以 220px 为基准再按份伸缩，比 flex: 1 更适合卡片流，因为它尊重内容的理想宽度。", "Start from 220px and then flex — a better fit for card flows than plain flex: 1 because it respects the content's ideal width.") }, { label: t("换行后行高不齐", "Uneven row heights"), note: t("flex-wrap 后每行独立计算，卡片高度不一致；用 align-content 控制行分布，或改用 grid 让两个方向都对齐。", "With flex-wrap each line is sized on its own and card heights differ; use align-content to distribute lines, or switch to grid for alignment in both directions.") }],
        walkthrough: { situation: t("卡片里标题要吃掉剩余宽度、时间戳保持固定；窄屏时卡片行要换行。", "In a card the title should absorb the free width while the timestamp stays fixed, and the row must wrap when narrow."), steps: [t("① 标题项写 flex: 1 与 min-width: 0。", "Give the title flex: 1 with min-width: 0."), t("② 时间戳写 flex: none。", "Give the timestamp flex: none."), t("③ 容器加 flex-wrap: wrap 与 gap，缩到 360px 观察换行。", "Add flex-wrap: wrap and gap, then shrink to 360px to watch it wrap.")], result: t("长标题截断而不撑破布局，卡片行在窄屏自动换行。", "A long title truncates instead of bursting and the row wraps when narrow.") },
        refs: [{ label: "MDN · flex", href: "https://developer.mozilla.org/docs/Web/CSS/flex", kind: "docs" }, { label: "web.dev · Flexbox", href: "https://web.dev/learn/css/flexbox", kind: "article" }, { label: "CSS Flexbox 1 §9.7 · 弹性长度解算", href: "https://drafts.csswg.org/css-flexbox-1/#resolve-flexible-lengths", kind: "spec" }],
        body: t("flex: 1 让项目平分剩余空间并保持等高，展开后是 flex: 1 1 0%，也就是基准尺寸为零、可放大也可收缩。flex-wrap: wrap 允许一行放不下时换行，行距交给 gap。要注意被压缩的子元素还带着一个自动最小尺寸：内容不可断行时它拒绝继续收缩，必须显式写 min-width: 0，内部文字的截断才会真正生效。", "flex: 1 lets items share the leftover space and stay equally tall; expanded it is flex: 1 1 0% — zero base size, free to grow and shrink. flex-wrap: wrap lets a row break when it runs out, with the row gap coming from gap. Watch out for the automatic minimum size on a squeezed child: unbreakable content refuses to shrink further, so an explicit min-width: 0 is what finally makes truncation work."),
        principle: t("flex: 1 等价于 flex: 1 1 0%（§7.1.1）；§9.7 的解算算法用基准尺寸加缩放因子分配剩余空间。但项目还有一个自动最小尺寸（§4.5 min-width: auto → min-content），内容不可断行时它拒绝继续收缩——所以要截断长文本，必须显式写 min-width: 0。", "flex: 1 equals flex: 1 1 0% (§7.1.1), and the resolution algorithm in §9.7 distributes free space from the base size and the flex factors. Items also carry an automatic minimum size (§4.5, min-width: auto → min-content) and refuse to shrink around unbreakable content, so truncating long text requires an explicit min-width: 0."),
      },
    ],
    keyPoints: [
      { term: "display: flex", desc: t("把容器变成弹性容器，子元素成为项目。", "Turn the container into a flex container; children become items."), detail: t("取值：flex（默认）与 inline-flex；inline-flex 让容器本身参与行内排版。", "Values: flex (default) and inline-flex; inline-flex keeps the container itself inline.") },
      { term: "flex-direction", desc: t("设定主轴方向：row、column 及其反向。", "Set the main axis: row, column and their reverses."), detail: t("常用：row（默认）、column；row-reverse / column-reverse 会同时反转项目顺序。", "Common: row (default), column; the reverse values also flip the item order.") },
      { term: "justify-content", desc: t("沿主轴分配空间，如 center、space-between。", "Distribute space along the main axis, e.g. center or space-between."), detail: t("常用：flex-start、center、space-between、space-around、space-evenly。", "Common: flex-start, center, space-between, space-around, space-evenly.") },
      { term: "align-items", desc: t("沿交叉轴对齐，如 center、stretch。", "Align on the cross axis, e.g. center or stretch."), detail: t("常用：stretch（默认）、center、flex-start、baseline。", "Common: stretch (default), center, flex-start, baseline.") },
      { term: "gap", desc: t("项目之间的固定间距，不产生边缘空白。", "A fixed gap between items with no edge space."), detail: t("可以写两个值：gap: 行距 列距，例如 gap: 16px 24px。", "Accepts two values — gap: row column, e.g. gap: 16px 24px.") },
      { term: "flex: 1", desc: t("让项目平分剩余空间并保持等高。", "Let items share leftover space and stretch to equal height."), detail: t("等于 flex: 1 1 0%；写成 flex: 1 1 auto 会从内容宽度开始分配，效果不同。", "Equal to flex: 1 1 0%; flex: 1 1 auto distributes from the content width instead, which behaves differently.") },
      { term: "flex-wrap: wrap", desc: t("空间不足时允许换行。", "Allow wrapping when space runs out."), detail: t("配合 min-width: 0 与 gap 使用；nowrap 是默认值，只会强制压缩项目。", "Pairs with min-width: 0 and gap; nowrap is the default and simply squeezes items.") },
    ],
    mistakes: [
      t("把 justify-content 当成“水平居中”，换了方向就失效。", "Treating justify-content as horizontal centering; it breaks once the direction changes."),
      t("忘记给可压缩的子元素加 min-width: 0，长文本撑破布局。", "Forgetting min-width: 0 on a shrinkable child so long text blows up the layout."),
    ],
    practice: [
      t("把导航栏设为 flex，并用 justify-content: space-between 把 logo 和菜单推到两端。", "Make the nav a flex row and push logo and menu apart with justify-content: space-between."),
      t("用 gap 控制导航项间距，不要用 margin。", "Space the nav items with gap instead of margins."),
      t("给卡片列表加 flex-wrap，缩小预览看看是否换行。", "Add flex-wrap to the card row and shrink the preview to watch it wrap."),
    ],
    html: `<nav class="nav">\n  <span class="logo">Layout Lab</span>\n  <a>课程</a>\n  <a>挑战</a>\n  <a>说明</a>\n</nav>`,
    css: `.nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 24px;\n}`,
    demo: "navbar",
    controls: ["direction", "justify", "gap"],
    focus: [
      t("由 flex-direction 推导主轴，再决定用 justify-content 还是 align-items。", "Deriving the main axis from flex-direction and picking justify-content or align-items accordingly."),
      t("理解默认 flex: 0 1 auto，从而解释“为什么项目不铺满也不收缩”。", "Understanding the default flex: 0 1 auto to explain why items neither fill nor shrink."),
      t("区分 gap 与 margin 的归属，建立“间距由容器管”的习惯。", "Separating gap from margin and letting the container own the spacing."),
    ],
    difficulty: [
      t("把 justify-content 记成“水平居中”，方向一换就说不清。", "Memorising justify-content as horizontal centring and losing the plot once the direction changes."),
      t("用 margin 拼项目间距，没意识到首尾也会被加上间距、换行时间距不均。", "Padding out items with margins, unaware of the leading edge or the uneven gaps after wrapping."),
      t("说不清 flex: 1 为什么让项目等高，也解释不了 min-width: 0 的作用。", "Being unable to say why flex: 1 equalises height, or what min-width: 0 is for."),
    ],
    examPoints: [
      t("给出 flex-direction: column 的容器，要求说出 justify-content 与 align-items 各自控制的方向。", "Given a column flex container, state which direction each alignment property controls."),
      t("给一段用 margin 做间距的导航，要求改用 gap 并说明两者差异。", "A nav spaced with margins: rewrite it with gap and explain the difference."),
      t("提问：flex: 1 与 flex: 1 1 auto 在分配空间时差在哪？", "Ask how flex: 1 and flex: 1 1 auto differ when space is distributed."),
    ],
    counterExamples: [
      {
        title: t("用 margin-right 给弹性项目做间距", "Spacing flex items with margin-right"),
        html: "<nav class=\"nav\">\n  <a>课程</a>\n  <a>挑战</a>\n  <a>说明</a>\n</nav>",
        css: ".nav {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n.nav a {\n  margin-right: 16px;  /* 最后一个后面也留了 16px */\n}",
        symptom: t("居中时整体看起来偏左（尾部多出 16px）；换成 space-between 后间距忽大忽小，换行时行尾空隙又不一致。", "Centred content looks pushed left by the trailing 16px; with space-between the gaps jump around, and wrapped rows keep a different trailing gap."),
        cause: t("margin 属于元素自身，最后一项后面照样占位，因此参与 remaining space 计算的“总宽度”被多算了 16px；换行后每行末尾都重复这个问题。", "A margin belongs to the item, so the last one still reserves space and the total width used for free-space distribution is 16px too large; every wrapped row repeats it."),
        fix: t("改用容器的 gap: 16px，间距只出现在项目之间、不参与首尾占位。", "Use gap: 16px on the container: spacing sits only between items and never at the ends."),
        whyHidden: t("视觉差异只有十几像素，容易被“看起来还行”接受；只有把容器换成居中或 space-between 时才明显。", "The offset is only about ten pixels and reads as “fine” until the container is centred or switched to space-between."),
      },
    ],
    bibliography: [{ label: "CSS Flexible Box Layout 1", href: "https://drafts.csswg.org/css-flexbox-1/", kind: "spec" }, { label: "CSS Flexbox 1 §4.5 · 自动最小尺寸", href: "https://drafts.csswg.org/css-flexbox-1/#min-size-auto", kind: "spec" }, { label: "CSS Box Alignment 3 · gap 与对齐", href: "https://drafts.csswg.org/css-align-3/#gaps", kind: "spec" }, { label: "MDN · Flexbox 基本概念", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox", kind: "docs" }, { label: "web.dev · Flexbox", href: "https://web.dev/learn/css/flexbox", kind: "article" }],
    figures: [{ id: "flex-axes", caption: t("方向一换，justify-content 与 align-items 的作用轴就交换了。", "Change the direction and justify-content and align-items swap the axis they act on.") }, { id: "gap-vs-margin", caption: t("margin 属于项目、会在末项后留白；gap 属于容器、只在项目之间出现。", "A margin belongs to the item and lingers after the last one; a gap belongs to the container and only sits between items.") }],
    glossary: [
      { term: "主轴 / 交叉轴", def: t("flex-direction 决定主轴，另一条正交的轴是交叉轴。", "flex-direction determines the main axis; the other, orthogonal axis is the cross axis."), source: "Flexbox §5.1" },
      { term: "弹性项目", def: t("弹性容器的直接子元素，默认 flex: 0 1 auto，不放大但可收缩。", "A direct child of a flex container; it defaults to flex: 0 1 auto: no growth, shrinking allowed."), source: "Flexbox §4" },
      { term: "剩余空间", def: t("容器尺寸减去项目基准尺寸与 gap 之后剩下的部分，由 flex-grow 分配。", "The space left after base sizes and gaps, distributed by flex-grow."), source: "Flexbox §9.7" },
      { term: "自动最小尺寸", def: t("项目的 min-width 为 auto 时按 min-content 计算，长内容因此拒绝收缩。", "With min-width: auto an item is at least min-content wide, so long content refuses to shrink."), source: "Flexbox §4.5" },
      { term: "gap", def: t("row-gap 与 column-gap 的简写，只出现在项目之间。", "A shorthand for row-gap and column-gap that only applies between items."), source: "Flexbox §8.1" },
      { term: "换行（wrap）", def: t("flex-wrap 允许项目在主轴放不下时换到下一行，行距由 gap 控制。", "flex-wrap lets items break onto another line when the main axis runs out; the row gap is set by gap."), source: "Flexbox §5.2" },
    ],
    spec: {
      quote: t("Each flex item has an automatic minimum size... the used value of min-width: auto is its content-based minimum size.", "Each flex item has an automatic minimum size: the used value of min-width: auto is its content-based minimum size."),
      quoteZh: t("每个弹性项目都有一个自动最小尺寸：min-width: auto 的实际取值就是它基于内容的最小尺寸。", "Every flex item has an automatic minimum size: min-width: auto resolves to its content-based minimum size."),
      source: "CSS Flexbox 1 §4.5 · Automatic minimum size of flex items",
      note: t("这条规则的目的是避免内容被压成零宽而无法阅读；代价是当你想用省略号截断长文本时，必须显式把 min-width 写成 0，让算法允许内容真正收缩。它是“截断不生效”这类问题的规范解释。", "The rule exists so content is never crushed to zero width and made unreadable. The cost is that truncating long text requires an explicit min-width: 0 so the algorithm may actually shrink it — the specification's answer to “my ellipsis does not work”."),
    },
    deepDive: [
      t("Flexbox 的设计目标写在规范的引言里：为一维内容提供可预测的空间分配。“可预测”意味着剩余空间按 flex 因子线性分配，同时每个项目有一个基于内容的基准尺寸。理解这两个量，比记住十几个属性名称更有用——属性只是对它们的调整。", "Flexbox's design goal is stated in its introduction: predictable space distribution for one-dimensional content. Predictable means free space is distributed linearly by flex factors while every item keeps a content-based base size. Grasping those two quantities is worth more than memorising a dozen properties, which are only adjustments to them."),
      t("为什么 flex 项目默认不换行？因为换行会让剩余空间在不同行之间重新分配，算法与直觉都会复杂化，所以规范把它交给 flex-wrap 显式开启。日常经验是：一行放不下时先考虑 min-width: 0 配合截断，只有内容种类确实不同（例如成组的标签）才打开换行。", "Why do flex items not wrap by default? Because wrapping redistributes free space across lines, complicating both the algorithm and intuition, so the spec leaves it to flex-wrap. In practice: when a row overflows, reach for min-width: 0 with truncation first, and enable wrapping only when the content is genuinely different in kind, such as a group of tags."),
    ],
    checklist: [
      t("把窗口从 1440 拖到 320：导航项不溢出、不重叠。", "Drag the window from 1440 down to 320: nav items neither overflow nor overlap."),
      t("换成很长的英文单词后，卡片仍不撑破容器。", "Swap in a long English word: cards still do not blow out the container."),
      t("每处间距都来自 gap，而不是 margin 拼出来的。", "Every gap comes from gap, not from stacked margins."),
      t("改变主轴方向后，对齐仍然符合设计意图。", "After changing the main axis, alignment still matches the intent."),
    ],
    challenge: t("让导航项水平居中，并保持 24px 的固定间距。", "Center the navigation items horizontally while keeping a fixed 24px gap."),
  },
  {
    id: "positioning",
    order: 4,
    stage: "foundation",
    title: t("定位与层叠", "Positioning and Stacking"),
    summary: t("理解定位上下文、吸顶元素与 z-index 的层叠顺序。", "Understand positioning contexts, sticky elements and z-index stacking order."),
    scenario: t("吸顶导航、卡片右上角的「New」角标、点击后浮在所有内容之上的弹层：它们都在处理同一件事——元素以谁为参照，以及谁盖在谁上面。", "Sticky navigation, a “New” badge in a card's corner, an overlay that floats above everything: all three answer the same question — what does this element reference, and what sits on top of what."),
    caseStudy: t("案例继续：给卡片钉上「New」角标，给长列表加上吸顶表头。第 4 章用包含块解释角标为何钉在卡片上，用滚动容器解释吸顶为何会失效——后者正是本项目线上真实修过的 bug（overflow: hidden 把表头下推 64px）。", "The case continues with a “New” badge pinned to the card and a sticky header on a long list. Chapter 4 explains why the badge anchors to the card through the containing block, and why the sticky header can silently fail through the scroll container — the very bug this project fixed online after overflow: hidden pushed that header down 64px."),
    goal: t("做出吸顶导航与可靠的角标、弹层", "Build a sticky header with reliable badges and overlays"),
    duration: t("约 18 分钟", "18 min"),
    objectives: [
      t("区分 static、relative、absolute、fixed、sticky", "Tell static, relative, absolute, fixed and sticky apart"),
      t("判断绝对定位元素以谁为参照", "Work out what an absolutely positioned element references"),
      t("用 z-index 解决层叠问题而不是盲目加大数值", "Solve stacking with z-index instead of inflating numbers"),
    ],
    theory: [
      {
        heading: t("定位改变元素的参照物", "Positioning changes the reference"),
        point: "position: relative",
        why: t("relative 元素仍留在文档流里，原来的位置继续占位，偏移只是视觉上的移动；这正是它能安全地充当“定位参照”的原因。", "A relative element stays in normal flow: its original slot is still occupied and offsets are purely visual. That is exactly why it is a safe positioning reference for children."),
        snippet: ".card {\n  position: relative; /* 子元素将以它为参照 */\n}",
        pitfall: t("以为 relative 会脱离文档流，用它给元素“挪位置”，结果周围元素并没有让位，视觉上反而像重叠。", "Assuming relative leaves the flow and using it to relocate an element: neighbours do not move over, so it only looks like an overlap."),
        analogy: t("包含块像坐标系原点：元素写下的 inset 数值，都是相对它测量的。", "The containing block is the origin of a coordinate system: every inset value is measured from it."),
        demoHint: t("观察角标是随卡片移动还是随页面移动；再把父级的 position 去掉，看它立刻跑到哪。", "Watch whether the badge moves with the card or the page, then remove the parent's position and see where it jumps."),
        variants: [{ label: t("只建立参照、不偏移", "A reference without an offset"), note: t("只写 position: relative 而不写 inset 是常见写法：元素不移动，却给子元素提供了包含块。", "Declaring position: relative with no inset is common: the element does not move, yet children gain a containing block.") }, { label: t("relative 也参与层叠", "relative joins the stack"), note: t("已定位元素默认绘制在普通流之上；多个 relative 兄弟之间的覆盖关系会受 z-index 影响。", "Positioned elements paint above normal flow by default, and which relative sibling wins depends on z-index.") }],
        walkthrough: { situation: t("「New」角标要钉在卡片右上角，第一版却飞到了整页右上角。", "The “New” badge should pin to the card's corner but landed in the page's corner."), steps: [t("① 给卡片加 position: relative。", "Add position: relative to the card."), t("② 角标保持 absolute 加 inset: 12px 12px auto auto。", "Keep the badge absolute with inset: 12px 12px auto auto."), t("③ 滚动与缩放页面，确认角标始终跟随卡片。", "Scroll and resize to confirm the badge travels with the card.")], result: t("角标钉在卡片右上角，与页面滚动无关。", "The badge holds the card's corner regardless of scrolling.") },
        refs: [{ label: "MDN · position", href: "https://developer.mozilla.org/docs/Web/CSS/position", kind: "docs" }, { label: "CSS 2.2 §10.1 · 包含块的定义", href: "https://www.w3.org/TR/CSS22/visudet.html#containing-block-details", kind: "spec" }],
        body: t("static 是默认值，元素老老实实待在文档流里；relative 保留这一点——原位置继续占位，inset 只是把它视觉上挪开，周围元素不会跟着让位。正因为它既留在流里、又能充当参照，给父元素写 position: relative 成了为角标、遮罩和弹层找“坐标系原点”的标准手法。", "static is the default and keeps an element in normal flow; relative preserves that — the original slot stays occupied and inset only moves the element visually, without neighbours giving way. Because it remains in flow and can serve as a reference, giving a parent position: relative is the standard way to create an origin for badges, scrims and overlays."),
        principle: t("CSS 2.2 §10.1 定义包含块：普通流元素的包含块是最近祖先的内容盒；absolute 元素的包含块是最近“已定位”祖先的内边距盒；fixed 的包含块是视口。角标跑不跑偏，取决于沿祖先链找到的到底是哪一个盒子，而不是子元素自己写了什么。", "CSS 2.2 §10.1 defines the containing block: the nearest ancestor's content box for normal flow, the padding box of the nearest positioned ancestor for absolute, and the viewport for fixed. Whether a badge lands correctly depends on which box you find walking up the tree, not on what the child declares."),
      },
      {
        heading: t("父相子绝是最常用的组合", "Positioned parent, absolute child"),
        point: "position: absolute",
        why: t("absolute 元素脱离文档流，宽度默认按内容收缩，并向上寻找最近的已定位祖先；找不到时以初始包含块为参照，于是角标就飞到了页面角落。", "An absolute element leaves the flow, shrinks to fit its content by default and walks up to the nearest positioned ancestor. With none it references the initial containing block, which is why badges fly to the page corner."),
        snippet: ".panel { position: relative; }\n.badge {\n  position: absolute;\n  inset: 12px 12px auto auto;\n}",
        pitfall: t("忘了给父元素设 position: relative，或者父级是行内元素——行内盒子不能可靠地充当绝对定位的参照。", "Forgetting position: relative on the parent, or making that parent inline — an inline box cannot reliably act as the absolute reference."),
        analogy: t("absolute 像一张贴纸：松手就飞到最近的“已定位底板”上，找不到底板就贴到整页。", "An absolute element is a sticker: let go and it flies to the nearest positioned surface, or to the page if there is none."),
        demoHint: t("把容器高度改小，观察吸顶元素在容器结束时是否正常离开，而不是一直压在内容上。", "Shrink the container and check that the sticky element leaves when the container ends instead of lingering over the content."),
        variants: [{ label: t("inset: 0 + margin: auto", "inset: 0 with margin: auto"), note: t("让定位盒在包含块里居中：同时写四个方向的 0，再交给 auto 分配空间。", "Centres a positioned box inside its containing block: set all four insets to 0 and let auto do the distributing.") }, { label: t("它不再占位", "It takes no space"), note: t("absolute 元素脱离文档流，父容器高度不会因它撑开；长内容出现时需要给容器留出空间。", "An absolute element leaves the flow, so the parent does not grow around it; leave room on the container once the content gets taller.") }],
        walkthrough: { situation: t("弹层要盖在内容之上，并在窄屏水平居中。", "An overlay should cover the content and stay horizontally centred when narrow."), steps: [t("① 给定位容器 position: relative。", "Give the positioning container position: relative."), t("② 弹层 absolute、inset: 0、margin: auto。", "Make the overlay absolute with inset: 0 and margin: auto."), t("③ 确认弹层脱离文档流、不挤压正文。", "Confirm it left the flow and no longer squeezes the text.")], result: t("弹层不占位、不推挤内容，位置由容器决定。", "The overlay takes no space and derives its position from the container.") },
        refs: [{ label: "MDN · position", href: "https://developer.mozilla.org/docs/Web/CSS/position", kind: "docs" }, { label: "MDN · inset", href: "https://developer.mozilla.org/docs/Web/CSS/inset", kind: "docs" }, { label: "CSS 2.2 §10.3.7 · 绝对定位的宽度", href: "https://www.w3.org/TR/CSS22/visudet.html#abs-non-replaced-width", kind: "spec" }],
        body: t("absolute 脱离文档流：原来的位置被让出，宽度默认按内容收缩，位置则由 inset 相对最近的已定位祖先决定；找不到这样的祖先时，它会一路上溯到初始包含块，通常就是整页。角标飞到页面角落、弹层位置不对，几乎都是这条链路上少了一个 position: relative。", "absolute leaves the flow: its old slot is released, its width shrinks to fit its content, and inset positions it against the nearest positioned ancestor. When there is none, the search goes all the way up to the initial containing block — usually the whole page. Badges that end up in the page corner and overlays that miss their target almost always trace back to a missing position: relative on that chain."),
        principle: t("absolute 元素的宽度解算在 CSS 2.2 §10.3.7：左右偏移都为 auto 时按 shrink-to-fit 收缩，只有左右同时给定才会被拉伸。所以绝对定位的盒子默认“贴着内容”，写两个偏移反而会撑开——这是它与普通块级盒最容易混淆的地方。", "The width of an absolutely positioned element follows §10.3.7: with both insets auto it shrinks to fit, and only when both are given does it stretch. A positioned box hugs its content by default, which is the easiest way to confuse it with a block box."),
      },
      {
        heading: t("吸顶比固定更安全", "Sticky is safer than fixed"),
        point: "position: sticky",
        why: t("sticky 在达到阈值前完全像 static，越过阈值后在容器范围内保持粘住；因为它仍属于原容器，所以既不会塌陷布局高度，也不会在容器结束后继续留在屏幕上。", "Before the threshold sticky behaves exactly like static; past it the element sticks within its container's bounds. Because it still belongs to that container, it neither collapses layout height nor stays on screen after the container ends."),
        snippet: ".toc {\n  position: sticky;\n  top: 24px;   /* 粘在视口顶部下方 24px */\n}",
        pitfall: t("祖先写了 overflow: hidden / auto，sticky 直接失效——滚动容器换了，粘附参照也跟着变。", "An ancestor with overflow: hidden or auto silently kills sticky: the scroll container changed, and the sticky reference changed with it."),
        analogy: t("sticky 像带滑轨的便利贴：先跟着内容走，到阈值就贴住，容器结束后又跟着离开。", "A sticky element is a note on a rail: it travels with the content, sticks at the threshold and leaves with its container."),
        demoHint: t("缩到 390px 视口，确认角标仍钉在卡片右上角、没有盖住正文。", "At 390px confirm the badge still sits in the card's corner and never covers the text."),
        variants: [{ label: t("吸顶表头与侧栏目录", "Sticky headers and sidebars"), note: t("表头用 top: var(--nav-h) 吸在导航下方；侧栏目录用 top: 24px 在容器内跟随。", "A table header sticks with top: var(--nav-h); a sidebar table of contents follows at top: 24px inside its container.") }, { label: t("必须有可滚动的余量", "It needs scrollable slack"), note: t("容器本身没有可滚动高度时 sticky 不会生效（例如父级高度与内容等高），粘附需要可移动的余地。", "Sticky does nothing when the container has no scrollable slack — with a parent exactly as tall as its content there is nowhere to stick.") }],
        walkthrough: { situation: t("长表格要吸顶表头，容器结束后不能继续压着内容。", "A long table wants a sticky header that leaves when its container ends."), steps: [t("① 表头写 position: sticky 与 top: var(--nav-h)。", "Give the header position: sticky and top: var(--nav-h)."), t("② 检查祖先有没有 overflow 造出滚动容器，有就先去掉。", "Check for an overflow ancestor creating a scroll container and drop it."), t("③ 滚动观察：贴住导航、容器结束时离开。", "Scroll and watch it hold under the nav, then leave at the container's end.")], result: t("表头吸在导航下方，容器结束就回到文档流。", "The header holds under the nav and rejoins the flow at the end.") },
        refs: [{ label: "MDN · position: sticky", href: "https://developer.mozilla.org/docs/Web/CSS/position#sticky", kind: "docs" }, { label: "CSS Position 3 · sticky", href: "https://drafts.csswg.org/css-position-3/#sticky-pos", kind: "spec" }, { label: "CSS Overflow 3 · 滚动容器", href: "https://drafts.csswg.org/css-overflow-3/#scroll-container", kind: "spec" }],
        body: t("sticky 在滚到阈值之前完全像 static，越过阈值后在容器范围内粘住，容器结束时又跟着离开。它比 fixed 安全：不会塌陷布局高度，也不会在父容器结束后继续压在屏幕上。代价是它的参照物是“最近的滚动容器”——祖先里只要有人写了 overflow，粘附位置就会整体偏移，这是最容易被忽略的一类失效。", "Before its threshold sticky behaves exactly like static; past it the element sticks within its container's bounds and leaves when the container ends. That makes it safer than fixed: it neither collapses layout height nor hovers over the page after its parent finishes. The cost is that it references the nearest scroll container — one ancestor with overflow shifts the whole sticky position, which is the least obvious way for it to break."),
        principle: t("CSS Position 3 把 sticky 定义为 relative 与 fixed 的混合：元素在最近的“滚动容器”的 scrollport 内偏移，同时受自身包含块边界限制。关键词是“最近的滚动容器”——任何祖先一旦用 overflow 建立了滚动容器，粘附参照就从视口换成那个盒子。", "CSS Position 3 describes sticky as a mix of relative and fixed: it offsets inside the scrollport of its nearest scroll container while staying bounded by its containing block. The key phrase is nearest scroll container: once an ancestor creates one with overflow, the reference moves from the viewport to that box."),
      },
      {
        heading: t("z-index 只在同一层叠上下文内比较", "z-index only compares inside one stacking context"),
        point: "z-index",
        why: t("z-index 只在同一个层叠上下文内比较。祖先一旦有 transform、filter、opacity 小于 1 或新的 z-index，就会生成新的上下文，子元素再大的数值也无法越过另一个上下文里的元素。", "z-index only compares inside one stacking context. An ancestor with transform, filter, opacity below 1 or its own z-index creates a fresh context, and inside it no value can rise above elements in a different context."),
        snippet: ".dialog { position: fixed; z-index: 100; }\n.toast  { position: fixed; z-index: 200; }",
        pitfall: t("不断加大 z-index 却没效果——问题出在上下文边界，而不是数值大小；先找到生成上下文的那个祖先。", "Inflating z-index with no effect: the problem is the context boundary, not the number. Find the ancestor that creates the context first."),
        analogy: t("层叠上下文像楼层：同一层里可以比高低，跨楼层比 z-index 没有意义。", "A stacking context is a floor: you can compare heights within one floor, but z-index across floors means nothing."),
        demoHint: t("给表格容器临时加上 overflow: hidden，亲眼看着表头被下推一个导航的高度——这个坑值得亲手做一次。", "Temporarily add overflow: hidden to the table wrapper and watch the header drop by one navbar height; this pitfall is worth doing once by hand."),
        variants: [{ label: t("isolation: isolate", "isolation: isolate"), note: t("主动创建层叠上下文，把子元素的 z-index 关在组件内部，不再泄漏到整页。", "Create a stacking context on purpose so children's z-index values stay inside the component instead of leaking across the page.") }, { label: t("只对已定位或 flex/grid 子项生效", "Only on positioned boxes and flex/grid children"), note: t("普通流里未定位的元素写 z-index 完全无效，这是“调了没反应”的最常见原因。", "An unpositioned element in normal flow ignores z-index entirely — the most common reason “it did nothing”.") }],
        walkthrough: { situation: t("弹层被吸顶导航盖住，写 z-index: 9999 仍然无效。", "The overlay is covered by the sticky nav and z-index: 9999 changes nothing."), steps: [t("① 找出创建层叠上下文的祖先（transform / opacity / z-index）。", "Find the ancestor creating a stacking context: transform, opacity or z-index."), t("② 判断弹层与导航是否落在同一上下文。", "Decide whether overlay and nav share a context."), t("③ 把弹层移入同一上下文，或在父级提升层级。", "Move the overlay into that context, or raise its parent's level.")], result: t("层级关系回到可推理状态，不再靠加大数值碰运气。", "Stacking becomes explainable again instead of a numbers lottery.") },
        refs: [{ label: "MDN · 层叠上下文", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_positioned_layout/Stacking_context", kind: "docs" }, { label: "MDN · z-index", href: "https://developer.mozilla.org/docs/Web/CSS/z-index", kind: "docs" }, { label: "CSS 2.2 附录 E · 绘制顺序", href: "https://www.w3.org/TR/CSS22/zindex.html", kind: "spec" }, { label: "CSS Position 3 §5 · 层叠上下文", href: "https://drafts.csswg.org/css-position-3/#painting-order", kind: "spec" }],
        body: t("z-index 只在与同一层叠上下文内的元素比较。祖先一旦设置了 transform、filter、opacity 小于 1 或自己的 z-index，就会新建一个层叠上下文；此时子元素无论写多大的数值，都越不过另一个上下文里的元素。排查层叠问题的正确顺序是：先找出创建上下文的那个祖先，再谈数值大小。", "z-index only compares within one stacking context. As soon as an ancestor sets transform, filter, opacity below 1 or a z-index of its own, a new context is created — and inside it no value, however large, rises above elements from another context. The right order for debugging is to find the ancestor that creates the context first, then talk about numbers."),
        principle: t("CSS 2.2 附录 E 完整规定绘制顺序（背景 → 块级后代 → 浮动 → 行内 → 已定位元素，按 z-index 与文档顺序），Position 3 §5 又规定 transform、filter、opacity 小于 1、will-change 会新建层叠上下文。z-index 只与同一上下文内的元素比较，数值再大也越不过另一个上下文。", "Appendix E of CSS 2.2 fixes the painting order (background, block descendants, floats, inlines, positioned boxes, ordered by z-index and document order), while Position 3 §5 adds that transform, filter, opacity below 1 and will-change create new stacking contexts. z-index only compares inside one context."),
      },
    ],
    keyPoints: [
      { term: "position: relative", desc: t("保留原位，可偏移，并作为绝对定位参照。", "Keep the slot, allow offsets and act as an absolute reference."), detail: t("偏移写在 inset（或 top / left）；只写 position 不写偏移也照样建立参照，这是“父相子绝”的常见写法。", "Offsets go in inset (or top / left); declaring position with no offsets still creates a reference, which is the usual parent-relative pattern.") },
      { term: "position: absolute", desc: t("脱离文档流，按最近的已定位祖先定位。", "Leave the flow and anchor to the nearest positioned ancestor."), detail: t("定位盒默认按内容收缩，同时写 left 与 right 才会被拉伸；它不占原本的文档流位置。", "A positioned box shrinks to fit unless you set both left and right; it no longer occupies its old flow slot.") },
      { term: "position: fixed", desc: t("相对视口固定，滚动时位置不变。", "Pin to the viewport so it stays put while scrolling."), detail: t("参照视口，滚动时不动；它不占布局高度，容易遮住内容，需要给主体留出对应 padding。", "References the viewport and ignores scrolling; it takes no layout height and easily covers content, so leave matching padding.") },
      { term: "position: sticky", desc: t("滚动到阈值后粘住，仍保留在容器内。", "Stick after a scroll threshold while staying in its container."), detail: t("必须写 top / bottom / left / right 之一才生效；祖先的 overflow 会破坏粘附效果。", "Needs at least one of top, bottom, left, right to do anything; an ancestor's overflow breaks the effect.") },
      { term: "inset", desc: t("top / right / bottom / left 的简写。", "A shorthand for top, right, bottom and left."), detail: t("顺序为上 右 下 左；写 auto 表示该方向不参与拉伸。", "Order is top right bottom left; auto keeps that side out of any stretching.") },
      { term: "z-index", desc: t("在同一层叠上下文内决定前后顺序。", "Decide order inside a single stacking context."), detail: t("只对已定位元素或 flex / grid 子项生效；同值按 DOM 顺序决定前后。", "Applies to positioned elements and flex or grid children; equal values fall back to DOM order.") },
    ],
    mistakes: [
      t("用 absolute 去模拟正常布局，内容一变化就重叠。", "Simulating normal layout with absolute positioning, which overlaps as soon as content changes."),
      t("在错误的层叠上下文里不断加大 z-index，却毫无效果。", "Inflating z-index inside the wrong stacking context and seeing no effect."),
    ],
    practice: [
      t("给卡片容器加 position: relative。", "Add position: relative to the card container."),
      t("用 inset: 16px 16px auto auto 把角标钉在右上角。", "Pin the badge to the top-right with inset: 16px 16px auto auto."),
      t("把导航改成 position: sticky; top: 0，滚动确认它吸顶。", "Switch the header to position: sticky; top: 0 and scroll to confirm it sticks."),
    ],
    focus: [
      t("沿祖先链找出真正的包含块，而不是凭“父元素”直觉定位。", "Walking the ancestor chain to find the real containing block instead of guessing from the parent element."),
      t("理解 sticky 的参照是最近的滚动容器，从而预判它会粘在哪。", "Knowing that sticky references the nearest scroll container so you can predict where it will stick."),
      t("把 z-index 当上下文问题而不是数值问题来排查。", "Treating z-index as a stacking-context problem rather than a numbers problem."),
    ],
    difficulty: [
      t("分不清 relative 的“占位不变”与 absolute 的“脱离文档流”各自会带来什么后果。", "Separating the consequences of relative keeping its slot from absolute leaving the flow."),
      t("sticky 偶发失效时，第一反应是加 z-index，而不是检查祖先的 overflow。", "When sticky silently fails, reaching for z-index instead of checking an ancestor's overflow."),
      t("说不清“为什么写了 z-index: 9999 还是被盖住”。", "Being unable to explain why z-index: 9999 is still covered."),
    ],
    examPoints: [
      t("给嵌套三层的结构，要求指出角标的包含块是哪一个盒子。", "Given three nested levels, name the containing block a badge resolves against."),
      t("给一段 sticky 失效的代码，要求找出“最近的滚动容器”并说明原因。", "Given sticky that fails, find the nearest scroll container and explain why."),
      t("提问：哪些属性会新建层叠上下文？为什么这会改变 z-index 的比较范围？", "Ask which properties create a stacking context and why that changes what z-index compares."),
    ],
    counterExamples: [
      {
        title: t("overflow: hidden 裁圆角，顺手废掉了吸顶表头", "Clipping a rounded corner with overflow: hidden kills a sticky header"),
        html: "<div class=\"wrap\">\n  <table class=\"rates\">\n    <thead><tr><th>属性</th><th>作用</th></tr></thead>\n    <tbody><tr><td>gap</td><td>项目间距</td></tr></tbody>\n  </table>\n</div>",
        css: ".rates {\n  border-radius: 10px;\n  border-collapse: separate;\n  overflow: hidden;      /* 为了裁圆角 */\n}\n.rates thead th {\n  position: sticky;\n  top: 64px;             /* 本意：吸在顶部导航下方 */\n}",
        symptom: t("表头没有吸在导航下方，反而整体下移 64px：表格顶部出现一条空白，表头文字压在第一行数据上。", "The header does not stick under the nav; it shifts 64px down, a blank band opens above it and the header text sits on the first row."),
        cause: t("overflow: hidden 让 <table> 成为它自己的滚动容器。sticky 的参照于是从视口换成表格自身，top: 64px 被解释为“距表格顶边 64px”，正好是一个导航的高度。", "overflow: hidden turns the table into its own scroll container, so the sticky reference moves from the viewport to the table and top: 64px is read as “64px from the table's own top edge” — exactly one navbar height."),
        fix: t("不用 overflow: hidden 裁圆角（改给首末行单元格写 border-radius），或在使用滚动容器时明确接受 sticky 参照的交换。", "Do not use overflow: hidden to clip corners — round the first and last row cells instead — or accept the swapped sticky reference if a scroll container is genuinely required."),
        whyHidden: t("裁切与粘附表面上毫无关系，两行代码单独看都没错；只有滚动到表头本该吸住的那一刻才会暴露，而排查时几乎不会怀疑到裁圆角那一行。", "Clipping and sticking look unrelated and both rules are fine in isolation; it only appears at the exact moment the header should stick, and the corner-clipping line is the last thing you suspect."),
      },
    ],
    bibliography: [{ label: "CSS 2.2 §10.1 · 包含块", href: "https://www.w3.org/TR/CSS22/visudet.html#containing-block-details", kind: "spec" }, { label: "CSS 2.2 附录 E · 层叠与绘制顺序", href: "https://www.w3.org/TR/CSS22/zindex.html", kind: "spec" }, { label: "CSS Positioned Layout 3 · sticky", href: "https://drafts.csswg.org/css-position-3/#sticky-pos", kind: "spec" }, { label: "CSS Overflow 3 · 滚动容器", href: "https://drafts.csswg.org/css-overflow-3/#scroll-container", kind: "spec" }, { label: "MDN · 层叠上下文", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_positioned_layout/Stacking_context", kind: "docs" }],
    figures: [{ id: "containing-block", caption: t("角标跑偏时，先沿祖先链找包含块，而不是改子元素的偏移值。", "When a badge sits wrong, walk up for the containing block instead of editing the child's offsets.") }, { id: "sticky-scrollport", caption: t("sticky 的 top 相对最近的滚动容器解析：一旦祖先创建滚动容器，参照就从视口换成了那个盒子。", "sticky's top resolves against the nearest scroll container: once an ancestor creates one, the reference moves from the viewport to that box.") }],
    glossary: [
      { term: "包含块", def: t("元素定位与百分比尺寸的参照盒；absolute 参照最近已定位祖先的内边距盒。", "The reference box for positioning and percentage sizes; an absolute element uses the padding box of its nearest positioned ancestor."), source: "CSS 2.2 §10.1" },
      { term: "层叠上下文", def: t("一组由祖先建立的层叠层级；z-index 只在同一上下文内比较。", "A stack of levels created by an ancestor; z-index only compares within one context."), source: "CSS 2.2 附录 E · Position 3 §5" },
      { term: "滚动容器", def: t("overflow 不是 visible 的元素会成为滚动容器，sticky 的参照随之改变。", "An element whose overflow is not visible becomes a scroll container and changes what sticky references."), source: "CSS Overflow 3" },
      { term: "scrollport", def: t("滚动容器可见的那块区域；sticky 的偏移相对它解析。", "The visible area of a scroll container, against which sticky offsets resolve."), source: "CSS Overflow 3" },
      { term: "绘制顺序", def: t("规范规定的绘制次序：背景、块级后代、浮动、行内、已定位元素。", "The specified painting order: backgrounds, block descendants, floats, inlines, positioned boxes."), source: "CSS 2.2 附录 E" },
      { term: "shrink-to-fit", def: t("绝对定位元素在左右偏移都为 auto 时按内容收缩宽度。", "An absolutely positioned element shrinks to its content when both horizontal insets are auto."), source: "CSS 2.2 §10.3.7" },
    ],
    spec: {
      quote: t("If all three of 'left', 'width', and 'right' are auto... the width is shrink-to-fit. ... A sticky positioned box is offset relative to its nearest scrollport.", "If left, width and right are all auto the width is shrink-to-fit; a sticky positioned box is offset relative to its nearest scrollport."),
      quoteZh: t("若 left、width、right 三者皆为 auto，宽度按收缩适应（shrink-to-fit）计算；粘性定位盒子的偏移相对它最近的滚动口（scrollport）解析。", "With left, width and right all auto the width shrinks to fit; a sticky box is offset against its nearest scrollport."),
      source: "CSS 2.2 §10.3.7 与 CSS Position 3 · Sticky positioning",
      note: t("两条规则合起来解释了本项目真实踩过的坑：sticky 的偏移相对最近的滚动口解析，而不是相对视口。祖先里只要有人用 overflow 造出滚动容器，top: 64px 的含义就从“距视口顶部 64px”变成“距那个盒子顶部 64px”。", "Together these two rules explain a bug this project actually hit: a sticky offset resolves against the nearest scrollport, not the viewport. One ancestor with overflow turns top: 64px from “64px below the viewport” into “64px below that box”."),
    },
    deepDive: [
      t("包含块的规则看起来琐碎，实际在回答一个问题：百分比宽度、绝对定位与固定定位分别以谁为基准。普通流元素以最近块级祖先的内容盒为基准，绝对定位元素以最近已定位祖先的内边距盒为基准，固定定位元素以视口为基准——三句话能解释绝大多数“位置不对”的报障。", "Containing-block rules look fussy but answer one question: what do percentage widths, absolute positioning and fixed positioning measure against? Normal flow uses the nearest block ancestor's content box, absolute uses the nearest positioned ancestor's padding box, fixed uses the viewport — three sentences that explain most “it is positioned wrong” reports."),
      t("层叠上下文的引入让绘制顺序变得可预测：没有上下文边界，嵌套结构里的 z-index 就得跨层级比较，既难推理也难实现。代价是它会隔离数值——祖先一旦创建上下文，子元素再大的 z-index 也只在内部排序。因此调试层叠的正确入口始终是找出创建上下文的那个祖先。", "Stacking contexts exist to make painting order predictable: without boundaries, z-index inside nested structures would have to be compared across levels, which is hard to reason about and to implement. The cost is isolation — once an ancestor creates a context, even a huge z-index on a child only sorts inside it. So the entry point for debugging stacking is always the ancestor that creates the context."),
    ],
    checklist: [
      t("角标、弹层都钉在预期的容器里，而不是页面角落？", "Do badges and overlays pin to the intended container rather than the page corner?"),
      t("吸顶元素滚动时粘住，到达容器末尾后正常离开？", "Does the sticky element stick while scrolling and leave cleanly at the container's end?"),
      t("有没有靠不断加大 z-index 来解决问题？", "Did you reach for ever-larger z-index values instead of finding the context?"),
      t("键盘焦点可见性没有被浮层遮住？", "Is keyboard focus still visible and never hidden behind an overlay?"),
    ],
    html: `<section class="stage">\n  <article class="panel">内容面板</article>\n  <span class="badge">New</span>\n</section>`,
    css: `.stage { position: relative; }\n.badge {\n  position: absolute;\n  inset: 16px 16px auto auto;\n}`,
    demo: "overlay",
    controls: ["padding"],
    challenge: t("让角标始终固定在卡片容器右上角，而不是页面的右上角。", "Keep the badge fixed to the card's top-right corner, not the page's."),
  },
  {
    id: "grid",
    order: 5,
    stage: "advanced",
    title: t("CSS Grid 网格布局", "CSS Grid Layout"),
    summary: t("用轨道、区域和自动布局处理二维页面骨架。", "Use tracks, areas and auto-placement for two-dimensional page shells."),
    scenario: t("后台控制台、作品集画廊、杂志式首页都需要行列同时对齐：侧栏固定 240px、内容自适应，卡片在宽屏四列、窄屏一列。这些正是 Grid 的主场。", "Dashboards, portfolio galleries and magazine-style home pages all need rows and columns aligned at once: a fixed 240px sidebar beside fluid content, cards in four columns when wide and one when narrow. That is Grid's home turf."),
    caseStudy: t("案例继续：把卡片行升级成后台控制台——四张统计卡加一张「侧栏 + 主内容」的区域地图。第 5 章先定轨道与区域，第 7 章把这套骨架搬去做作品集首页，第 8 章再补上页脚行。", "The case continues by upgrading the card row into a dashboard: four stat cards plus a sidebar-and-main area map. Chapter 5 sets the tracks and areas, chapter 7 reuses the shell for a portfolio home page, and chapter 8 adds the footer row."),
    goal: t("搭建一个可伸缩的后台控制台骨架", "Build a responsive dashboard shell"),
    duration: t("约 22 分钟", "22 min"),
    objectives: [
      t("定义列轨道、行轨道与间距", "Define column tracks, row tracks and gaps"),
      t("用 repeat、minmax、auto-fit 让列数自适应", "Let the column count adapt with repeat, minmax and auto-fit"),
      t("用 grid-template-areas 描述页面区域", "Describe page regions with grid-template-areas"),
    ],
    theory: [
      {
        heading: t("Grid 同时管理行和列", "Grid manages rows and columns together"),
        point: "display: grid",
        why: t("Grid 先建立显式的行列轨道，再把子元素放进去，对齐发生在两个方向上；因此不必为了对齐再嵌套一层容器。", "Grid builds explicit row and column tracks first and then places children into them, so alignment happens in both directions; no extra nesting is needed just to line things up."),
        snippet: ".dash {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  gap: 24px;\n}",
        pitfall: t("把 Grid 用在只需要一行排列的导航上：能实现，但 Flexbox 更简单，间距与换行的语义也更自然。", "Using Grid for a navigation bar that only ever needs one row: it works, but Flexbox is simpler and models gaps and wrapping more naturally."),
        analogy: t("Grid 像先划好路网再盖房子：轨道是路，项目是房子，位置在开工前就定好了。", "Grid is a road network drawn before the houses: tracks are roads, items are houses, and positions are fixed before building starts."),
        demoHint: t("把列数从 2 调到 4：观察每条轨道的宽度同时变化，而不是某一张卡片变宽。", "Move the column count from 2 to 4: every track changes width together, not one card."),
        variants: [{ label: t("inline-grid 与 subgrid", "inline-grid and subgrid"), note: t("inline-grid 让网格容器参与行内排版；subgrid 让子网格沿用父网格的轨道，需要确认目标浏览器支持度。", "inline-grid keeps the container inline; subgrid lets a nested grid reuse its parent's tracks, with browser support worth checking first.") }, { label: t("同样只作用于直接子元素", "Direct children only again"), note: t("与 flex 一样，Grid 只管理直接子元素；更深的层级需要中间再放一个网格容器。", "Like flex, Grid only arranges direct children; deeper levels need another grid container in between.") }],
        walkthrough: { situation: t("控制台要「侧栏 240px + 主内容自适应」。", "The dashboard needs a 240px sidebar beside fluid content."), steps: [t("① 容器写 display: grid。", "Set display: grid on the container."), t("② grid-template-columns: 240px 1fr。", "Write grid-template-columns: 240px 1fr."), t("③ 用 gap 统一行列间距。", "Use gap for both gutters.")], result: t("两列骨架一次成型，不需要额外嵌套。", "The two-column shell lands in one declaration with no extra nesting.") },
        refs: [{ label: "MDN · CSS Grid 布局", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout", kind: "docs" }, { label: "web.dev · Grid", href: "https://web.dev/learn/css/grid", kind: "article" }, { label: "CSS Grid 1 §7.2 · 显式网格与轨道", href: "https://drafts.csswg.org/css-grid-1/#explicit-grids", kind: "spec" }, { label: "CSS Grid 1 §8.5 · 自动放置", href: "https://drafts.csswg.org/css-grid-1/#auto-placement-algo", kind: "spec" }],
        body: t("Flexbox 沿一条轴排列，Grid 则先把容器切成行列网格，再把子元素放进去：网格容器建立网格格式化上下文，显式轨道由 grid-template-* 声明，不够的部分由浏览器按需生成隐式轨道。页面级骨架、仪表盘、画廊这类二维关系用 Grid 描述最直接——位置在排版开始前就算清楚了，而不是靠内容互相推挤。", "Flexbox arranges along one axis; Grid first cuts the container into rows and columns and then places children into it. A grid container establishes a grid formatting context, grid-template-* declares the explicit tracks, and the browser generates implicit tracks as needed. Page shells, dashboards and galleries — relationships in two dimensions — describe most directly in Grid, because positions are resolved before layout rather than being pushed around by content."),
        principle: t("CSS Grid 1 §2、§5 规定：网格容器建立网格格式化上下文，子元素被放进“显式网格”（由 grid-template-* 声明）或浏览器自动生成的“隐式网格”，落位由 §8.5 的自动放置算法按顺序填充。二维布局能在同一个容器里写完，是因为行列轨道一开始就被一次性算清，而不是像浮动那样靠内容互相推挤。", "CSS Grid 1 §2 and §5 state that a grid container establishes a grid formatting context, and children land in the explicit grid declared by grid-template-* or in implicit tracks the browser generates; §8.5's auto-placement fills them in order. Two-dimensional layout fits in one container because every track is resolved up front instead of being pushed around by content."),
      },
      {
        heading: t("轨道可以是固定的，也可以是弹性的", "Tracks can be fixed or flexible"),
        point: "grid-template-columns",
        why: t("fr 表示“剩余空间的一份”，所以轨道会随容器宽度按比例伸缩；minmax(160px, 1fr) 给轨道设下限，空间不足时先保住下限，再多也只会分到一份。", "fr means one share of the free space, so tracks scale with the container. minmax(160px, 1fr) sets a floor: when space runs short the floor wins, and extra space is still shared one-for-one."),
        snippet: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}",
        pitfall: t("写 1fr 但子项内容不可收缩（表格、超长单词），轨道被撑宽导致横向溢出；给子项加 min-width: 0。", "Using 1fr with content that cannot shrink (tables, long words) so the track widens and overflows. Give the child min-width: 0."),
        analogy: t("fr 像按份分地：先把固定地块和通道扣掉，剩下的地再按份数分。", "fr is allotting land by shares: subtract the fixed plots and the streets first, then divide what remains."),
        demoHint: t("把 gap 调到 0 再调回来，注意行列间距是同时变化的——它属于容器，不属于项目。", "Set gap to 0 and back: row and column gutters change together because the gap belongs to the container."),
        variants: [{ label: t("minmax(0, 1fr)", "minmax(0, 1fr)"), note: t("需要内容可截断时用它；auto 会按内容调整尺寸，fr 只按比例分配剩余空间。", "Use it when content may be truncated; auto sizes to content while fr only divides the free space.") }, { label: t("隐式行高由内容决定", "Implicit rows follow content"), note: t("只声明列时，行是隐式的，其高度取该行内容的最大值；想统一行高就声明 grid-auto-rows。", "Declare columns only and rows stay implicit, taking the tallest item in each row; declare grid-auto-rows to control them.") }],
        walkthrough: { situation: t("卡片要宽屏四列、平板两列、手机一列。", "Cards should run four columns wide, two on a tablet and one on a phone."), steps: [t("① 写 repeat(auto-fit, minmax(220px, 1fr))。", "Write repeat(auto-fit, minmax(220px, 1fr))."), t("② 调整下限，观察换列时机变化。", "Adjust the floor and watch when columns drop."), t("③ 缩到 360px，确认单列且无横向滚动。", "At 360px confirm a single column with no sideways scrolling.")], result: t("列数由容器决定，零媒体查询。", "The container decides the column count with no media query.") },
        refs: [{ label: "MDN · grid-template-columns", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-columns", kind: "docs" }, { label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat", kind: "docs" }, { label: "CSS Grid 1 §11 · 轨道尺寸算法", href: "https://drafts.csswg.org/css-grid-1/#track-sizing", kind: "spec" }, { label: "CSS Grid 1 §6.6 · 自动最小尺寸", href: "https://drafts.csswg.org/css-grid-1/#min-size-auto", kind: "spec" }],
        body: t("1fr 表示一份可用空间：固定轨道与 gap 先被扣掉，剩下的再按份数分。repeat(3, 1fr) 是等分三列，minmax(160px, 1fr) 则先保证每条轨道至少 160px、再让它们继续伸展。把自动填充交给浏览器之后，就不必为每个断点重写列数——列数从此是算法的结果，而不是你维护的常量。", "1fr means one share of the available space: fixed tracks and gaps come out first and the rest is divided by share. repeat(3, 1fr) makes three equal columns, while minmax(160px, 1fr) guarantees every track at least 160px before letting it grow. Once the browser handles the filling, no breakpoint has to rewrite the column count — the count becomes an algorithm's result instead of a constant you maintain."),
        principle: t("§11 的轨道尺寸算法分两步：先算每条轨道的基础尺寸与增长上限，再把剩余空间分给灵活轨道。fr 即“剩余空间的一份”，minmax(160px, 1fr) 先保证 160px 下限再参与分配；§6.6 还给网格项目一个自动最小尺寸 min-content，内容不可断行时轨道会被撑宽——这正是 minmax(0, 1fr) 存在的原因。", "The track sizing algorithm in §11 resolves each track's base size and growth limit first, then distributes free space to flexible tracks. fr means one share of that space while minmax(160px, 1fr) guarantees a 160px floor first. §6.6 also gives grid items an automatic minimum of min-content, so unbreakable content widens the track — the reason minmax(0, 1fr) exists."),
      },
      {
        heading: t("auto-fit 与 auto-fill 的区别", "auto-fit versus auto-fill"),
        point: "auto-fit",
        why: t("auto-fit 会先按 minmax 的下限尽量多铺列，再把没有内容的空轨道折叠掉，让现有项目平分整行宽度——列数交给浏览器，就不用为每个断点重写。", "auto-fit first lays out as many columns as the minmax floor allows, then collapses the empty tracks so existing items share the full row. The browser picks the column count, so you stop rewriting it per breakpoint."),
        snippet: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}",
        pitfall: t("下限写成 320px 又想一行放三列：宽度不够时只会剩一列，看起来像“响应式失效”。", "A 320px floor while expecting three columns: when space runs out you get a single column, which looks like responsiveness broke."),
        analogy: t("auto-fit 像自动摆货架：先看这一排能放几个，放不满就把空位让给已有的商品。", "auto-fit is auto-arranging shelves: count what fits in a row and hand the empty slots to the goods that are there."),
        demoHint: t("把视口缩到 360px，看列数是否自动减少、且没有横向滚动条。", "At a 360px viewport, check that the column count drops on its own with no horizontal scrollbar."),
        variants: [{ label: t("auto-fill 保留空位", "auto-fill keeps the slots"), note: t("需要等宽槽位（仪表盘、统计格）时用 auto-fill，空位会保留，布局不随项目数跳动。", "Use auto-fill for equal slots such as dashboards: the empty ones stay, so the layout does not jump as items come and go.") }, { label: t("下限决定换列时机", "The floor decides the break"), note: t("下限过大时手机上只剩一列并可能横向滚动；先量出内容不再挤坏的宽度，再写下限。", "Too large a floor leaves a single column on a phone and can scroll sideways; measure the width at which content stops crowding first.") }],
        walkthrough: { situation: t("作品集只有 3 个项目，auto-fill 让右侧留下空洞。", "A portfolio with three items left a hole on the right under auto-fill."), steps: [t("① 把 auto-fill 换成 auto-fit。", "Swap auto-fill for auto-fit."), t("② 观察空轨道被折叠、卡片平分整行。", "Watch empty tracks collapse and cards share the row."), t("③ 增删项目，确认布局不塌。", "Add and remove items to confirm the layout holds.")], result: t("少量内容也铺满整行，增删都不产生空洞。", "A few items still fill the row, and adding or removing leaves no holes.") },
        refs: [{ label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat", kind: "docs" }, { label: "MDN · minmax()", href: "https://developer.mozilla.org/docs/Web/CSS/minmax", kind: "docs" }, { label: "CSS Grid 1 §7.2.3.1 · repeat() 的 auto-fill / auto-fit", href: "https://drafts.csswg.org/css-grid-1/#auto-repeat", kind: "spec" }],
        body: t("auto-fit 会先按 minmax 的下限尽量多铺几列，再把没有内容的空轨道折叠掉，让现有项目平分整行；auto-fill 则保留那些空轨道。两者的差别只有“空轨道是否折叠”这一条，却直接决定卡片流删掉几张之后会不会留下空洞。做响应式列表时，这一行 CSS 通常是全章性价比最高的写法。", "auto-fit lays out as many columns as the minmax floor allows and then collapses the empty tracks so existing items share the row; auto-fill keeps those empty tracks. The only difference is whether empty tracks collapse, yet it decides whether a trimmed card flow leaves holes behind. For a responsive list this single line of CSS is usually the best value in the whole chapter."),
        principle: t("repeat() 的自动重复形式（§7.2.3.1）先按容器可用宽度与轨道最小尺寸算出能放几条，再决定重复次数。auto-fill 保留多出来的空轨道，auto-fit 把它们折叠，让已有项目平分整行——差别只在“空轨道是否折叠”，却直接决定卡片流的收尾效果。", "The auto-repeating form of repeat() (§7.2.3.1) first works out how many tracks fit given the container width and the track minimum, then repeats that many times. auto-fill keeps surplus empty tracks while auto-fit collapses them so existing items share the row — the only difference is whether empty tracks collapse, yet it decides how a card flow ends."),
      },
      {
        heading: t("命名区域让结构一眼可读", "Named areas make structure readable"),
        point: "grid-template-areas",
        why: t("每个字符串是一行，每个词是一个单元格，同名相邻区域会自动合并成矩形；区域名让结构在 CSS 里可读，重排时只改这几行字符即可。", "Each string is a row and each word a cell; adjacent cells with the same name merge into one rectangle. The map makes structure readable in CSS, and a reflow means editing just those lines."),
        snippet: ".shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.side { grid-area: side; }\n.main { grid-area: main; }",
        pitfall: t("区域没有连成矩形，或同一行的词数不一致——浏览器会丢弃整段声明，布局直接退回单列。", "Areas that are not rectangular, or rows with different word counts: the browser drops the whole declaration and the layout falls back to a single column."),
        analogy: t("grid-template-areas 像用铅笔画地图：区域画成矩形，子元素照着地图认领位置。", "grid-template-areas is sketching a map in pencil: areas are drawn as rectangles and children claim their spot by name."),
        demoHint: t("把某张卡片的标题改成一长串不可断行的字符，观察轨道是否被撑宽——这就是需要 minmax(0, 1fr) 的场景。", "Paste a long unbreakable string into one card and watch the track widen: that is where minmax(0, 1fr) is needed."),
        variants: [{ label: t("断点里重画地图", "Redraw the map at a breakpoint"), note: t("手机端把三列地图改写成单列地图，DOM 完全不动，只是重新排版。", "On a phone rewrite the three-column map as a single-column one: the DOM stays put and only the layout changes.") }, { label: t("区域必须是矩形", "Areas must be rectangles"), note: t("非矩形区域或行内词数不一致会让整条声明失效，布局静默退回单列——这是最难察觉的一类失败。", "A non-rectangular area or unequal word counts invalidates the whole declaration and the layout silently collapses to one column — the hardest failure to notice.") }],
        walkthrough: { situation: t("骨架是「页眉 / 侧栏+主内容 / 页脚」，还要在断点处重排。", "The shell is header, sidebar plus main, footer — and it must reflow at a breakpoint."), steps: [t("① 用 grid-template-areas 画出字符地图。", "Draw the character map with grid-template-areas."), t("② 子元素用 grid-area 认领位置。", "Let children claim their spot with grid-area."), t("③ 断点内只改地图字符串，DOM 不动。", "Inside the breakpoint edit the map strings only; the DOM stays put.")], result: t("重排只改几行字符，结构关系一眼可读。", "A reflow edits a few strings and the structure stays readable.") },
        refs: [{ label: "MDN · grid-template-areas", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas", kind: "docs" }, { label: "MDN · grid-area", href: "https://developer.mozilla.org/docs/Web/CSS/grid-area", kind: "docs" }, { label: "CSS Grid 1 §7.3 · grid-template-areas", href: "https://drafts.csswg.org/css-grid-1/#grid-template-areas-property", kind: "spec" }],
        body: t("用 grid-template-areas 画一张字符地图，再让子元素通过 grid-area 认领位置，整个页面的区域关系会像示意图一样写在 CSS 里：每个字符串是一行，每个词是一格，同名相邻单元格必须连成矩形。重排布局时只改这几行字符，DOM 完全不动——这也是它能取代浮动加负边距那套 hack 的原因。", "Draw a character map with grid-template-areas and let children claim their spot through grid-area, and the page's region map ends up written in CSS like a diagram: each string is a row, each word a cell, and same-named neighbours must form a rectangle. Reflowing the layout means editing those few strings while the DOM stays untouched — the reason it replaced the float-and-negative-margin hacks."),
        principle: t("§7.3 规定 grid-template-areas 的解析：每个字符串是一行、每个词是一格，同名相邻单元格必须构成矩形；只要出现非矩形区域或行内词数不一致，整条声明就是无效值并被忽略。所以区域地图写错不会报错，只会静默退回单列。", "§7.3 defines how grid-template-areas parses: each string is a row, each word a cell, and same-named neighbours must form a rectangle. A non-rectangular area or unequal word counts make the whole declaration invalid and it is ignored — a broken map throws no error, it silently falls back to one column."),
      },
    ],
    keyPoints: [
      { term: "display: grid", desc: t("把容器变成网格容器。", "Turn the container into a grid container."), detail: t("inline-grid 让网格容器本身参与行内排版；子元素还可以再用 grid 或 subgrid 嵌套。", "inline-grid keeps the grid container itself inline; children may nest grid or subgrid in turn.") },
      { term: "grid-template-columns", desc: t("定义列轨道与宽度。", "Define column tracks and their widths."), detail: t("常用组合：240px 1fr、repeat(auto-fit, minmax(220px, 1fr))、minmax(0, 1fr) 1fr。", "Common shapes: 240px 1fr, repeat(auto-fit, minmax(220px, 1fr)), minmax(0, 1fr) 1fr.") },
      { term: "repeat()", desc: t("重复轨道定义，减少重复书写。", "Repeat a track definition to avoid repetition."), detail: t("可以写 repeat(3, 1fr)，也可以 repeat(auto-fit, minmax(...))，一次重复多组轨道。", "Write repeat(3, 1fr), or repeat(auto-fit, minmax(...)) to repeat a whole group of tracks.") },
      { term: "minmax(min, max)", desc: t("给轨道设定最小与最大尺寸。", "Give a track a minimum and a maximum size."), detail: t("min 通常给具体尺寸、max 用 1fr 或 auto；minmax(160px, 1fr) 是最常用的自适应列。", "min is usually a concrete size and max is 1fr or auto; minmax(160px, 1fr) is the everyday adaptive column.") },
      { term: "auto-fit", desc: t("自动铺列并收起空轨道。", "Fill columns automatically and collapse empty tracks."), detail: t("与 auto-fill 的差别只在“空轨道是否折叠”，卡片流优先用 auto-fit。", "The only difference from auto-fill is whether empty tracks collapse; prefer auto-fit for card flows.") },
      { term: "gap", desc: t("同时设置行列之间的间距。", "Set row and column gutters at once."), detail: t("写法是 gap: 行距 列距；它不会在容器首尾留下空白，因此可以替代靠 margin 拼的间距。", "Written as gap: row column. It leaves no space at the container's edges, so it replaces margin-based spacing.") },
      { term: "grid-template-areas", desc: t("用字符地图命名页面区域。", "Name page regions with a character map."), detail: t("每个字符串一行、每个词一格；用 . 表示留空，区域必须连成矩形。", "One string per row, one word per column; a dot means empty and every area must form a rectangle.") },
    ],
    mistakes: [
      t("写死四列，窄屏直接横向溢出。", "Hard-coding four columns so narrow screens overflow horizontally."),
      t("在一维排列的问题上强行使用 Grid，反而更难维护。", "Forcing Grid onto one-dimensional problems and making them harder to maintain."),
    ],
    practice: [
      t("给卡片容器设置 repeat(auto-fit, minmax(160px, 1fr))。", "Set repeat(auto-fit, minmax(160px, 1fr)) on the card container."),
      t("调整 gap，观察行列间距同时变化。", "Adjust gap and watch row and column gutters change together."),
      t("用 grid-template-areas 描述“侧栏 + 主内容 + 页脚”的骨架。", "Describe a sidebar + content + footer shell with grid-template-areas."),
    ],
    focus: [
      t("显式网格与隐式网格的区别，以及为什么多余项目不会丢。", "The difference between the explicit and implicit grid, and why surplus items never disappear."),
      t("用轨道尺寸算法解释 fr、minmax 与自动最小尺寸的相互作用。", "Using the track sizing algorithm to explain how fr, minmax and the automatic minimum interact."),
      t("auto-fit 与 auto-fill 的差别，以及它在卡片流里的实际效果。", "How auto-fit differs from auto-fill and what that does to a card flow."),
    ],
    difficulty: [
      t("把 1fr 当成“一定均分”，遇到不可断行内容时解释不了轨道被撑宽。", "Reading 1fr as a guarantee of equal columns and being unable to explain a track widened by unbreakable content."),
      t("区域地图写成非矩形，却不知道布局为什么没生效（也没有任何报错）。", "Writing a non-rectangular area map without realising why nothing happened — and no error was logged."),
      t("分不清“轨道数交给浏览器”与“断点重写列数”两种响应式策略各自适合什么场景。", "Confusing browser-decided track counts with breakpoint-rewritten column counts."),
    ],
    examPoints: [
      t("给一个 minmax(160px, 1fr) 的容器，要求预测 640px 与 1200px 下各有几列。", "Given a minmax(160px, 1fr) container, predict the column count at 640px and 1200px."),
      t("给一段写错的 grid-template-areas，要求指出无效的原因并修正。", "Show a broken grid-template-areas and ask for the reason plus a fix."),
      t("提问：为什么 1fr 的轨道有时会被内容撑宽？（答案要提到自动最小尺寸）", "Ask why a 1fr track is sometimes widened by content; the answer must mention the automatic minimum size."),
    ],
    counterExamples: [
      {
        title: t("区域地图不是矩形，布局静默退回单列", "A non-rectangular area map silently falls back to one column"),
        html: "<div class=\"shell\">\n  <header>页眉</header>\n  <aside>侧栏</aside>\n  <main>主内容</main>\n  <footer>页脚</footer>\n</div>",
        css: ".shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main side\"   /* side 被拆成两个格子 */\n    \"foot foot\";\n}",
        symptom: t("四条声明全部失效：没有两列布局，也没有命名区域，四个块上下排成一列，看起来“Grid 没生效”。", "All four declarations are dropped: no two-column layout, no named areas, and the four blocks stack in one column — it looks as if Grid never applied."),
        cause: t("第三行里 side 出现在不相邻的两格，区域单元格不构成矩形；§7.3 规定此时整条 grid-template-areas 是无效值并被忽略，连同行内的列定义一起失效。", "The side name appears in two non-adjacent cells on the third row, so the area is not a rectangle. §7.3 makes the entire declaration invalid and it is ignored, taking the column definitions with it."),
        fix: t("让同名单元格连成矩形（例如 \"side main main\"），并用 DevTools 的 Grid 覆盖面板确认区域高亮是矩形。", "Make same-named cells form a rectangle (for example \"side main main\") and confirm the highlight is rectangular in DevTools' grid overlay."),
        whyHidden: t("无效声明不报错也不进控制台，getComputedStyle 里只看到 grid-template-areas: none；排查者往往先怀疑选择器或嵌套层级，而不是去看那行字符串的形状。", "An invalid declaration raises nothing and logs nothing; getComputedStyle reports grid-template-areas: none. People suspect the selector or the nesting long before the shape of that string."),
      },
    ],
    bibliography: [{ label: "CSS Grid Layout 1", href: "https://drafts.csswg.org/css-grid-1/", kind: "spec" }, { label: "CSS Grid 1 §11 · 轨道尺寸算法", href: "https://drafts.csswg.org/css-grid-1/#track-sizing", kind: "spec" }, { label: "CSS Grid 1 · repeat() 与 auto-fit", href: "https://drafts.csswg.org/css-grid-1/#auto-repeat", kind: "spec" }, { label: "MDN · grid-template-areas", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas", kind: "docs" }, { label: "web.dev · Grid", href: "https://web.dev/learn/css/grid", kind: "article" }],
    figures: [{ id: "grid-tracks", caption: t("固定轨道与 gap 先扣，剩余空间按 fr 分配；minmax 的下限决定轨道何时不再收缩。", "Fixed tracks and gaps come out first and fr shares the rest; the minmax floor decides when a track stops shrinking.") }, { id: "auto-fit-fill", caption: t("auto-fit 折叠空轨道让卡片填满整行，auto-fill 会留下空洞。", "auto-fit collapses empty tracks so cards fill the row; auto-fill leaves holes behind.") }],
    glossary: [
      { term: "显式网格 / 隐式网格", def: t("grid-template-* 声明的轨道是显式的，超出部分由浏览器按需生成隐式轨道。", "Tracks declared by grid-template-* are explicit; anything beyond them is generated as implicit tracks."), source: "CSS Grid 1 §7.2" },
      { term: "轨道（track）", def: t("网格里的一行或一列，尺寸可以是固定值、minmax 或 fr。", "A row or column of the grid, sized with a length, a minmax or an fr."), source: "CSS Grid 1 §7.2" },
      { term: "fr 单位", def: t("剩余空间的一份；固定轨道与 gap 先被扣除。", "One share of the leftover space, after fixed tracks and gaps are subtracted."), source: "CSS Grid 1 §11" },
      { term: "minmax()", def: t("给轨道下限与上限，下限决定内容被挤坏前的最小宽度。", "Gives a track a floor and a ceiling; the floor sets the width below which content starts to break."), source: "CSS Grid 1 §7.2.1" },
      { term: "auto-fit / auto-fill", def: t("自动重复列数；auto-fit 折叠空轨道，auto-fill 保留它们。", "Automatic column repetition; auto-fit collapses empty tracks while auto-fill keeps them."), source: "CSS Grid 1 §7.2.3.1" },
      { term: "自动放置", def: t("没有显式定位的项目按顺序填入网格的算法。", "The algorithm that fills the grid with items that were not placed explicitly."), source: "CSS Grid 1 §8.5" },
    ],
    spec: {
      quote: t("If the grid container has a definite size... the number of repetitions is the largest possible positive integer that does not cause the grid to overflow the content box of its grid container.", "If the grid container has a definite size, the number of repetitions is the largest possible positive integer that does not cause the grid to overflow the container's content box."),
      quoteZh: t("当网格容器在该轴上有确定尺寸时，重复次数是“不会让网格溢出容器内容盒”的最大正整数。", "With a definite container size on that axis, the repetition count is the largest positive integer that does not overflow the content box."),
      source: "CSS Grid 1 §7.2.3.1 · Repeating a track definition",
      note: t("自动重复的列数是“不溢出”的最大整数——这句话就是 minmax 下限重要性的来源：下限越大，能放下的列数越少，因此它决定了卡片什么时候换列。列数从来不是写死的，而是算法在给定容器里的结果。", "The count is the largest integer that still fits, which is exactly why the minmax floor matters: a larger floor means fewer columns, so the floor decides when a card drops to the next row. The column count is never written down; it is an algorithm's result for a given container."),
    },
    deepDive: [
      t("轨道尺寸算法是 Grid 里最值得花时间读的一页：它先算每条轨道的基础尺寸（至少要能容纳内容），再算增长上限，最后把剩余空间分给灵活轨道。fr 参与的是最后一步而不是第一步，所以“1fr 被内容撑宽”并不矛盾——内容先把基础尺寸抬高，分配随后发生。", "The track sizing algorithm is the page of the Grid spec most worth reading: it resolves each track's base size (enough to hold its content), then its growth limit, and only afterwards shares free space among flexible tracks. fr takes part in that last step, not the first, so a 1fr track widened by content is no contradiction — content raises the base size before distribution happens."),
      t("命名区域被限制成矩形，是为了让区域能用一对起止网格线直接表示：矩形才能让放置、层叠与重排保持确定性。一旦允许非矩形，算法与实现都会失去可预测性，所以规范选择“整条声明无效”这种严厉处理——用静默失败换取规则简单。", "Named areas are restricted to rectangles so an area can be expressed as one pair of grid lines: only rectangles keep placement, stacking and reflow deterministic. Allowing non-rectangular areas would cost the algorithm and its implementations their predictability, so the spec instead invalidates the whole declaration — silent failure in exchange for simple rules."),
    ],
    checklist: [
      t("宽屏多列、窄屏单列时不写媒体查询也能自动适应吗？", "Does it adapt from many columns to one without a media query?"),
      t("侧栏与主内容在行、列两个方向都对齐了吗？", "Are the sidebar and main region aligned in both directions?"),
      t("超长内容（表格、长链接）还会撑破网格吗？", "Does long content (tables, links) still blow out the grid?"),
      t("重排布局时只改了轨道或区域，没有动 DOM 结构吗？", "Did the reflow only touch tracks or areas, leaving the DOM alone?"),
    ],
    html: `<section class="dash">\n  <div class="stat">访问量</div>\n  <div class="stat">转化率</div>\n  <div class="stat">订单</div>\n  <div class="stat">退款</div>\n</section>`,
    css: `.dash {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 20px;\n}`,
    demo: "dashboard",
    controls: ["columns", "gap"],
    challenge: t("让卡片随空间自动换列，并保证每列至少 160px 宽。", "Let cards wrap automatically while keeping every column at least 160px wide."),
  },
  {
    id: "responsive",
    order: 6,
    stage: "advanced",
    title: t("响应式布局", "Responsive Layout"),
    summary: t("用流式尺寸、媒体查询和容器查询让同一份结构适配不同屏幕。", "Adapt one structure to every screen with fluid sizing, media queries and container queries."),
    scenario: t("同一份代码要同时服务 360px 的手机、768px 的平板和 1440px 的桌面；而产品经理随时会再加一个板块，你不希望它顺带再引入一套断点。", "One codebase has to serve a 360px phone, a 768px tablet and a 1440px desktop, while new sections keep arriving — and you would rather not add another set of breakpoints with each one."),
    caseStudy: t("案例继续：让那个文章页在 360 / 768 / 1280 三个宽度都可读——手机单列、平板 2:1 双列、桌面保持阅读宽度。第 6 章决定断点放在哪里、哪些尺寸交给 clamp；第 8 章用同一套判断验收整页。", "The case continues by making the article page readable at 360, 768 and 1280: one column on a phone, a 2:1 split on a tablet, and the reading measure on a desktop. Chapter 6 decides where the breakpoints go and which sizes belong to clamp; chapter 8 verifies the whole page with the same test."),
    goal: t("让一个页面在手机、平板与桌面都保持可读", "Keep a page readable on phone, tablet and desktop"),
    duration: t("约 20 分钟", "20 min"),
    objectives: [
      t("用 min-width 断点从移动端向上增强", "Enhance upward from mobile with min-width breakpoints"),
      t("用 clamp、min、百分比替代写死的像素值", "Replace hard-coded pixels with clamp, min and percentages"),
      t("知道什么时候该用容器查询而不是媒体查询", "Know when to reach for container queries instead of media queries"),
    ],
    theory: [
      {
        heading: t("先移动端，再向上增强", "Start mobile, then enhance upward"),
        point: "@media (min-width: ...)",
        why: t("min-width 是“到达该宽度及以上时生效”，默认样式只写最小屏需要的部分，样式表因此是层层相加；max-width 属于覆盖式写法，断点一多就互相打架。", "min-width means “from this width upward”, so the base styles stay minimal and the sheet only ever adds. max-width works by overriding, and the rules start fighting once there are several breakpoints."),
        snippet: ".shell { display: grid; gap: 20px; }\n\n@media (min-width: 768px) {\n  .shell { grid-template-columns: 2fr 1fr; }\n}",
        pitfall: t("同时用 min-width 与 max-width 写双向断点，区间一旦重叠，样式互相覆盖，很难判断最终生效的是哪条。", "Mixing min-width and max-width breakpoints: once the ranges overlap the rules overwrite each other and it is hard to tell which one wins."),
        analogy: t("min-width 断点像搭楼梯：每一级都在上一级的基础上加东西，不会互相踩。", "min-width breakpoints are steps on a staircase: each one adds to the level below instead of trampling it."),
        demoHint: t("把列数从 1 调到 2，模拟断点前后的差别；再拖窄窗口，看它是否自然回到单列。", "Move the column count from 1 to 2 to mimic a breakpoint, then narrow the window and watch it return to one column."),
        variants: [{ label: t("尊重用户偏好", "Respecting user preferences"), note: t("同一套查询机制还能读 prefers-reduced-motion 与 prefers-color-scheme；打印样式用 @media print 单独处理。", "The same mechanism reads prefers-reduced-motion and prefers-color-scheme, and @media print handles the printed sheet.") }, { label: t("媒体查询不看容器", "Media queries do not see containers"), note: t("同一个组件放进窄侧栏时样式不变，因为查询看的是视口；组件级适配要用容器查询。", "Put the component in a narrow sidebar and nothing changes, because the query watches the viewport; component-level adaptation needs container queries.") }],
        walkthrough: { situation: t("正文在手机单列、平板起变双列。", "The body column is single on a phone and splits in two from tablet up."), steps: [t("① 默认样式只写单列所需的字号与间距。", "Write only the type size and spacing the single column needs by default."), t("② 用 @media (min-width: 768px) 加 grid-template-columns: 2fr 1fr。", "Add grid-template-columns: 2fr 1fr inside @media (min-width: 768px)."), t("③ 确认断点前后没有覆盖冲突，样式是叠加的。", "Confirm the two sides add rather than override.")], result: t("移动优先的叠加写法，读到哪一层都不需要撤销上一层的规则。", "A mobile-first cascade where no layer has to undo the one below.") },
        refs: [{ label: "MDN · 媒体查询", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries", kind: "docs" }, { label: "Media Queries 4 · 范围语法", href: "https://drafts.csswg.org/mediaqueries-4/#mq-range-context", kind: "spec" }],
        body: t("默认样式写给最小的屏幕，只写必要的字号、间距和分栏；再用 @media (min-width: 768px) 逐步往里加内容。这样样式表是层层相加，最先保证的是“能用”，而不是“桌面好看、手机崩掉”。同时要记住媒体查询本身不提升优先级：命中同一元素的两条规则，仍旧靠书写顺序决定胜负。", "Write the default styles for the smallest screen with only the type size, spacing and columns it needs, then add content back with @media (min-width: 768px). The sheet only ever adds, and usability comes first instead of “great on a desktop, broken on a phone”. Remember too that a media query adds no specificity: two rules matching the same element are still settled by source order."),
        principle: t("Media Queries 4 规定媒体查询是一个布尔表达式，min-width 属于 range context 的写法（等价于 width >= 值），求值时看的是视口尺寸而不是元素尺寸。媒体查询本身不增加优先级——两条同权重的规则命中同一个元素时，仍然是靠书写顺序决定胜负。", "Media Queries 4 defines a media query as a boolean expression, and min-width belongs to the range context syntax (equivalent to width >= value); what gets evaluated is the viewport, not the element. A media query adds no specificity either: when two equally weighted rules match, source order still decides."),
      },
      {
        heading: t("流式尺寸减少断点数量", "Fluid sizing reduces breakpoints"),
        point: "clamp(min, ideal, max)",
        why: t("clamp 把上下限交给 min 与 max，中间值用 vw 之类的相对单位，于是尺寸在区间内连续变化，不必为每个断点再写一档。", "clamp hands the floor and ceiling to min and max and uses a relative unit such as vw in the middle, so the size changes continuously and needs no per-breakpoint step."),
        snippet: "h1 {\n  font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem);\n}",
        pitfall: t("中间项不含 vw（例如 clamp(16px, 1.2rem, 24px)），结果只是一个固定值，缩放完全没发生。", "A middle term with no vw, such as clamp(16px, 1.2rem, 24px), collapses to a constant: no scaling happens at all."),
        analogy: t("clamp 像带护栏的滑梯：中间能滑，但永远低不过下限、高不过上限。", "clamp is a slide with rails: you can slide in the middle but never below the floor or above the ceiling."),
        demoHint: t("把间距按 clamp 的思路调大，观察它是连续变化而不是一跳一跳。", "Raise the spacing the way clamp would: it changes continuously instead of jumping."),
        variants: [{ label: t("min() 与 max() 更直接", "min() and max() are often enough"), note: t("只需要一侧限制时用 min(100% - 32px, 1200px)，比 clamp 少一个参数也更好读。", "When only one side is limited, min(100% - 32px, 1200px) is shorter and clearer than clamp.") }, { label: t("中间项必须含相对单位", "The middle term must be relative"), note: t("中间项写成 1.25rem 这类常量时整体退化为固定值；上下限差距过大时视觉节奏会随屏幕跳跃。", "A middle term like 1.25rem collapses the whole thing to a constant, and a very wide floor-to-ceiling range makes the rhythm jump between screens.") }],
        walkthrough: { situation: t("标题字号要在大屏更大、手机更小，且不要新增断点。", "The heading should grow on large screens and shrink on phones without a new breakpoint."), steps: [t("① 写 clamp(1.5rem, 1rem + 2vw, 2.5rem)。", "Write clamp(1.5rem, 1rem + 2vw, 2.5rem)."), t("② 在 DevTools 里拖动窗口，确认计算值连续变化。", "Drag the window in DevTools and confirm the computed value moves continuously."), t("③ 检查极窄与极宽两端是否被上下限挡住。", "Check that the floor and ceiling hold at both extremes.")], result: t("字号随视口平滑变化，少维护一档断点。", "Type scales smoothly and one breakpoint disappears from maintenance.") },
        refs: [{ label: "MDN · clamp()", href: "https://developer.mozilla.org/docs/Web/CSS/clamp", kind: "docs" }, { label: "CSS Values 4 · clamp()", href: "https://drafts.csswg.org/css-values-4/#funcdef-clamp", kind: "spec" }],
        body: t("clamp(1rem, 0.5rem + 2vw, 2rem) 让字号在有上下限的区间里跟着视口平滑变化：中间项含视口单位，所以它真的在动；上下限负责防止过大或过小。min() 与百分比也能承担类似职责，例如 min(100% - 32px, 1200px) 同时限制最大宽度与安全边距。用流式尺寸换掉一批断点，是响应式里最划算的减法。", "clamp(1rem, 0.5rem + 2vw, 2rem) lets a font size scale smoothly between a floor and a ceiling: the middle term carries a viewport unit, so it genuinely moves, while the bounds stop it from going too far either way. min() and percentages do similar duty — min(100% - 32px, 1200px) caps both the maximum width and the safe margin. Trading a batch of breakpoints for fluid sizing is the cheapest subtraction in responsive work."),
        principle: t("CSS Values 4 §10.3 给出 clamp() 的精确定义：clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))。中间项若不含相对单位（vw / % 等），整个表达式就退化成常量——这就是“写了 clamp 但字体不缩放”的规范原因。", "CSS Values 4 §10.3 defines clamp() precisely: clamp(MIN, VAL, MAX) equals max(MIN, min(VAL, MAX)). If the middle term carries no relative unit such as vw or %, the whole expression collapses to a constant — the specification behind “I used clamp and nothing scaled”."),
      },
      {
        heading: t("断点应由内容决定", "Let content decide the breakpoints"),
        point: "@media (min-width: ...)",
        why: t("断点应记在“内容开始难受”的宽度上：行长超过约 75 个字符、卡片被压到低于下限、导航项开始换行。它由内容决定，与设备型号无关。", "A breakpoint belongs where the content starts to hurt: lines longer than about 75 characters, cards squeezed below their floor, navigation items wrapping. Content decides it, not device names."),
        snippet: "/* 在内容开始拥挤的宽度处断点，而不是照抄机型 */\n@media (min-width: 720px) {\n  .cards { grid-template-columns: 1fr 1fr; }\n}",
        pitfall: t("照抄一份设备宽度表，真实文案下卡片在半屏就挤成一团；断点需要跟着内容量调整。", "Copying a device-width table: with real copy the cards crowd together at half width. Breakpoints have to follow the content."),
        analogy: t("断点应该记在“内容喊疼”的那一点：字号不疼、图片不糊、卡片没被压坏，就不必加。", "A breakpoint belongs where the content complains: if type is fine, images are sharp and cards are not crushed, do not add one."),
        demoHint: t("在 360 / 768 / 1280 三个宽度分别检查有没有横向滚动条。", "Check for horizontal scrollbars at 360, 768 and 1280."),
        variants: [{ label: t("只写 min-width", "min-width only"), note: t("断点从小到大叠加，读起来是一条增长曲线；避免 min/max 混用导致规则互相覆盖。", "Stacking min-width breakpoints reads as one growing curve; mixing min and max lets rules overwrite each other.") }, { label: t("320px 是可访问性下限", "320px is an accessibility floor"), note: t("它不是审美选择：WCAG 1.4.10 要求等效 320px 不出现双向滚动，低于它的适配属于额外工作。", "It is not a matter of taste: WCAG 1.4.10 requires no two-dimensional scrolling at an equivalent 320px, and adapting below that is extra work.") }],
        walkthrough: { situation: t("要在 360 / 768 / 1280 三档都可用，且不知道断点该放哪。", "It must work at 360, 768 and 1280, and it is unclear where the breakpoint belongs."), steps: [t("① 慢慢拖动宽度，记录文字开始别扭、卡片开始拥挤的位置。", "Drag the width slowly and note where text turns awkward and cards crowd."), t("② 把断点设在那个位置，而不是套用机型表。", "Put the breakpoint there instead of copying a device table."), t("③ 缩到 320px 确认没有横向滚动（WCAG 1.4.10）。", "At 320px confirm there is no horizontal scrolling, per WCAG 1.4.10.")], result: t("断点数量降到必要的那几个，每个都能说清用途。", "Breakpoints drop to the few that are needed, each with a stated purpose.") },
        refs: [{ label: "MDN · 媒体查询", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries", kind: "docs" }, { label: "web.dev · Responsive design", href: "https://web.dev/learn/design", kind: "article" }, { label: "WCAG 2.2 · 1.4.10 Reflow", href: "https://www.w3.org/TR/WCAG22/#reflow", kind: "spec" }],
        body: t("打开开发者工具，慢慢拖动宽度，记录文字开始换行别扭、卡片开始拥挤、导航项开始换行的位置，把断点设在那里。下限还有一条硬性依据：WCAG 要求内容在等效 320px 宽度下不出现横向滚动。照抄设备型号表往往在真实文案下失效，因为决定排版的从来是内容量，而不是机型清单。", "Open dev tools, drag the width slowly, and note where text starts wrapping awkwardly, cards start crowding and navigation items start breaking. Put the breakpoints there. The lower end has a hard anchor too: WCAG requires no horizontal scrolling at an equivalent width of 320px. Copying a device-width table tends to fail with real copy, because content volume decides layout, not a list of model numbers."),
        principle: t("断点下限不是审美问题：WCAG 2.2 的 1.4.10 Reflow 要求内容在等效 320px 宽度下不出现横向滚动（双向滚动的内容如表格、地图除外）。断点上限则由内容决定——行长超过约 75 个字符、卡片被压到低于下限时，就该在那里断。", "The lower end of a breakpoint range is not taste: WCAG 2.2 success criterion 1.4.10 Reflow requires no horizontal scrolling at an equivalent width of 320px (two-dimensional content such as tables and maps excepted). The upper end is decided by content — break where lines pass roughly 75 characters or cards drop below their floor."),
      },
      {
        heading: t("组件用容器查询", "Use container queries for components"),
        point: "@container (min-width: ...)",
        why: t("容器查询的参照是组件所在容器的宽度，因此同一张卡片放进侧栏或主区域会自动切换紧凑或舒展的样式，与视口大小解耦——这才是组件化的响应式。", "Container queries reference the width of the component's own container, so the same card in a sidebar or a main region switches between compact and roomy on its own, decoupled from the viewport. That is what component-level responsiveness means."),
        snippet: ".card-host { container-type: inline-size; }\n\n@container (min-width: 420px) {\n  .card { grid-template-columns: 120px 1fr; }\n}",
        pitfall: t("忘了给祖先写 container-type，或者写成 size 而元素高度不确定——容器查询永远不会命中。", "Forgetting container-type on the ancestor, or using size on an element without a definite height: the query never matches."),
        analogy: t("媒体查询问的是“窗口多大”，容器查询问的是“我这个组件现在多宽”。", "A media query asks how wide the window is; a container query asks how wide this component currently is."),
        demoHint: t("缩到 320px，确认正文仍然可读且没有横向滚动——这是 WCAG 1.4.10 的下限。", "At 320px confirm the text stays readable with no sideways scrolling: that is the WCAG 1.4.10 floor."),
        variants: [{ label: t("container-type: size", "container-type: size"), note: t("需要按高度切换版式时用它，前提是容器高度确定（否则查询无从求值）。", "Use it when the layout should respond to height, provided the container's height is definite — otherwise there is nothing to evaluate.") }, { label: t("容器尺寸不再由内容决定", "The container stops sizing to content"), note: t("inline-size containment 意味着“由内容撑开”不再发生：容器的尺寸来源必须明确指定，否则会塌成很小。", "inline-size containment means the container no longer grows around its contents: its size must come from somewhere explicit, or it collapses.") }],
        walkthrough: { situation: t("同一张卡片放进侧栏（260px）与主区域（720px）要呈现不同版式。", "The same card must look different in a 260px sidebar and a 720px main region."), steps: [t("① 给卡片容器写 container-type: inline-size。", "Give the card's container container-type: inline-size."), t("② 用 @container (min-width: 420px) 写并排版式。", "Write the side-by-side layout inside @container (min-width: 420px)."), t("③ 把同一份组件放到两处，确认各自切换。", "Place the same component in both spots and confirm each switches.")], result: t("组件按容器自适应，不再依赖视口宽度。", "The component adapts to its container instead of the viewport.") },
        refs: [{ label: "MDN · 容器查询", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_containment/Container_queries", kind: "docs" }, { label: "MDN · container-type", href: "https://developer.mozilla.org/docs/Web/CSS/container-type", kind: "docs" }, { label: "CSS Containment 3 · container-type", href: "https://drafts.csswg.org/css-contain-3/#container-type", kind: "spec" }],
        body: t("媒体查询看的是视口宽度，容器查询看的是组件自身所在容器的宽度。同一个卡片放进侧栏和主区域时，容器查询能让它分别呈现紧凑或舒展的样式，与视口大小解耦——这才是组件级的响应式。前提是祖先写了 container-type: inline-size，否则容器查询永远不会命中。", "A media query reads the viewport while a container query reads the width of the component's own container. The same card in a sidebar or a main region can render compact or roomy accordingly, decoupled from the viewport — that is responsiveness at component level. The precondition is container-type: inline-size on an ancestor, without which the query never matches."),
        principle: t("CSS Containment 3 规定 container-type: inline-size 会给元素加上 inline-size containment，并让它成为 query container：容器查询求值看的是这个容器的尺寸，且容器自身的尺寸不再受子内容影响。inline-size 只支持宽度查询；按高度查询需要 size，并要求容器高度确定。", "CSS Containment 3 says container-type: inline-size applies inline-size containment and turns the element into a query container: queries are evaluated against that container's size, and the container's own size no longer depends on its contents. inline-size supports width queries only; height queries need size and a definite height."),
      },
    ],
    keyPoints: [
      { term: "@media (min-width: ...)", desc: t("达到该宽度及以上时应用样式。", "Apply styles at that width and above."), detail: t("只写 min-width 的断点从小到大叠加；媒体查询本身不提升优先级，注意书写顺序。", "min-width-only breakpoints stack from small to large; a media query adds no specificity, so order matters.") },
      { term: "clamp(min, ideal, max)", desc: t("在上下限内平滑变化的流式尺寸。", "A fluid size that scales within a floor and ceiling."), detail: t("上限低于下限时取 min；中文标题常用 clamp(1.75rem, 1.2rem + 2vw, 2.75rem)。", "If the ceiling drops below the floor the minimum wins; Chinese headings often use clamp(1.75rem, 1.2rem + 2vw, 2.75rem).") },
      { term: "min() / max()", desc: t("在两个值之间取更小或更大的那个。", "Take the smaller or larger of two values."), detail: t("min(100% - 32px, 1200px) 是最常见的容器宽度写法，同时限制最大宽度和安全边距。", "min(100% - 32px, 1200px) is the everyday container width: a max width and a safe margin in one line.") },
      { term: "100% / fr", desc: t("相对单位的宽度，避免硬编码像素。", "Relative widths that avoid hard-coded pixels."), detail: t("百分比相对父容器，fr 相对网格剩余空间；两者都比固定像素更容易适配。", "Percentages resolve against the parent, fr against the grid's free space; both adapt more easily than fixed pixels.") },
      { term: "container-type: inline-size", desc: t("把元素变成可被容器查询的容器。", "Turn an element into a query container."), detail: t("只按宽度建立容器查询；需要按高度查询才用 size，且元素必须有确定高度。", "inline-size enables width queries only; use size for height queries, where the element needs a definite height.") },
      { term: "@container (min-width: ...)", desc: t("按容器宽度而不是视口宽度生效。", "Respond to container width instead of viewport width."), detail: t("参照最近的容器祖先；侧栏折叠、字体缩放时同样会生效。", "References the nearest container ancestor, and reacts to a collapsed sidebar just as it does to font scaling.") },
    ],
    mistakes: [
      t("只测几个热门机型宽度，错过内容真正拥挤的区间。", "Testing only a few popular device widths and missing where content actually crowds."),
      t("把整页塞进固定像素宽度，再靠 overflow: hidden 掩盖问题。", "Cramming the page into a fixed pixel width and hiding the fallout with overflow: hidden."),
    ],
    practice: [
      t("把 768px 作为第一个断点，让主内容从单列变双列。", "Use 768px as the first breakpoint so the main region goes from one column to two."),
      t("把标题字号换成 clamp，观察缩放是否顺滑。", "Switch the heading size to clamp and watch it scale smoothly."),
      t("在 360px、768px、1280px 三个宽度检查是否有横向滚动。", "Check for horizontal scrolling at 360px, 768px and 1280px."),
    ],
    focus: [
      t("用 min-width 从小到大叠加样式，而不是用 max-width 互相覆盖。", "Stacking styles upward with min-width instead of overriding with max-width."),
      t("区分“断点由内容决定”与“断点下限由可访问性要求决定”。", "Separating content-driven breakpoints from the accessibility floor."),
      t("知道容器查询与媒体查询各自回答什么问题。", "Knowing which question container queries and media queries each answer."),
    ],
    difficulty: [
      t("用 clamp 却没引入相对单位，结果完全不缩放，还怀疑浏览器不支持。", "Using clamp without a relative unit, seeing nothing scale, and blaming the browser."),
      t("把断点当成设备型号表来抄，真实文案下反而更早挤坏。", "Copying a device-width table so real copy crowds even earlier."),
      t("说不清 320px 这个数字从哪来（它不是设备统计，而是 WCAG 的可访问性下限）。", "Being unable to say where 320px comes from — it is a WCAG floor, not a device statistic."),
    ],
    examPoints: [
      t("给一段同时使用 min-width 与 max-width 的样式，要求指出哪些规则会被覆盖。", "Show rules mixing min-width and max-width and ask which ones end up overridden."),
      t("给一个 clamp 写法，要求指出为什么不缩放并改对。", "Give a clamp expression, explain why it does not scale, and fix it."),
      t("提问：什么情况下必须用容器查询而不是媒体查询？", "Ask when a container query is the only correct tool."),
    ],
    counterExamples: [
      {
        title: t("clamp 的中间项是常量，字号根本不缩放", "A clamp with a constant middle term never scales"),
        html: "<h1 class=\"title\">响应式标题</h1>",
        css: ".title {\n  /* 看起来像流式尺寸，其实恒等于 20px */\n  font-size: clamp(16px, 1.25rem, 24px);\n}",
        symptom: t("窗口从 1440 缩到 360，标题字号一直是 20px；换成 clamp 前后没有任何区别。", "From 1440 down to 360 the heading stays at 20px; clamp changed nothing at all."),
        cause: t("clamp = max(MIN, min(VAL, MAX))，而 VAL 是 1.25rem（相对根字号，与视口无关），于是结果与视口宽度无关，永远落在 16–24px 之间的同一个值。", "clamp equals max(MIN, min(VAL, MAX)), and VAL is 1.25rem — relative to the root font size, not the viewport — so the result is viewport-independent and always the same value between 16px and 24px."),
        fix: t("让中间项包含视口单位，例如 clamp(1.25rem, 1rem + 2vw, 2rem)，并在 DevTools 里拖动窗口确认数值真的在变。", "Give the middle term a viewport unit, e.g. clamp(1.25rem, 1rem + 2vw, 2rem), then drag the window in DevTools to confirm the computed value moves."),
        whyHidden: t("代码看起来非常“现代”，也没有任何报错；只有真的拖动窗口、或者去 DevTools 里看计算值，才会发现它其实是个常量。", "The code looks convincingly modern and nothing errors; only dragging the window or inspecting the computed value reveals it is a constant."),
      },
    ],
    bibliography: [{ label: "Media Queries Level 4", href: "https://drafts.csswg.org/mediaqueries-4/", kind: "spec" }, { label: "CSS Values 4 · clamp() 与数学函数", href: "https://drafts.csswg.org/css-values-4/#math", kind: "spec" }, { label: "CSS Containment 3 · 容器查询", href: "https://drafts.csswg.org/css-contain-3/", kind: "spec" }, { label: "WCAG 2.2 · 1.4.10 Reflow（320px 下限）", href: "https://www.w3.org/TR/WCAG22/#reflow", kind: "spec" }, { label: "web.dev · 响应式设计", href: "https://web.dev/learn/design", kind: "article" }],
    figures: [{ id: "breakpoint-ruler", caption: t("断点的下限来自可访问性要求，上限来自内容：三个参照点比一串设备型号更可靠。", "The floor of the range comes from accessibility and the ceiling from content: three references beat a list of device widths.") }, { id: "clamp-math", caption: t("clamp 的结果始终夹在下限与上限之间；中间项没有相对单位时就退化成常量。", "A clamp result always sits between floor and ceiling; without a relative unit the middle term collapses to a constant.") }, { id: "container-query", caption: t("同一个组件放进侧栏或主区域会自己切换版式，因为它看的是容器宽度，不是视口。", "The same component switches layout in a sidebar or a main region because it reads its container, not the viewport.") }],
    glossary: [
      { term: "媒体查询", def: t("对视口等媒体特性求值的布尔表达式，不增加选择器优先级。", "A boolean expression evaluated against media features such as viewport size; it adds no specificity."), source: "Media Queries 4" },
      { term: "范围语法", def: t("min-width / max-width 的写法，等价于 width >= 值 / width <= 值。", "The min-width and max-width syntax, equivalent to width >= value and width <= value."), source: "Media Queries 4 §2.1" },
      { term: "clamp()", def: t("clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))，用于有上下限的流式尺寸。", "clamp(MIN, VAL, MAX) equals max(MIN, min(VAL, MAX)): a fluid size with a floor and ceiling."), source: "CSS Values 4 §10.3" },
      { term: "容器查询", def: t("按组件所在容器的尺寸求值的查询，需要用 container-type 建立容器。", "A query evaluated against the component's own container, which needs container-type to be set."), source: "CSS Containment 3" },
      { term: "containment", def: t("把元素的尺寸计算与内容隔离，容器查询依赖它的 inline-size 形式。", "Isolates an element's sizing from its content; container queries rely on the inline-size form."), source: "CSS Containment 3" },
      { term: "Reflow（1.4.10）", def: t("WCAG 要求内容在等效 320px 宽度下不出现横向滚动。", "WCAG requires no horizontal scrolling at an equivalent width of 320px."), source: "WCAG 2.2 · 1.4.10" },
    ],
    spec: {
      quote: t("Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for vertically scrolling content at a width equivalent to 320 CSS pixels.", "Content can be presented without loss of information and without two-dimensional scrolling for vertically scrolling content at a width equivalent to 320 CSS pixels."),
      quoteZh: t("内容不得因缩放而丢失信息或功能；纵向滚动的内容在等效 320 CSS 像素的宽度下不应需要双向滚动。", "Content must not lose information or functionality when zoomed, and vertically scrolling content needs no two-dimensional scrolling at an equivalent width of 320 CSS pixels."),
      source: "WCAG 2.2 · 成功准则 1.4.10 Reflow",
      note: t("这条准则把“最窄可用宽度”从审美问题变成可验收的要求：320px 等同 400% 缩放下的 1280px 视口，是低视力用户与窄屏设备的共同下限。断点应当从这个下限往上安排，而不是从机型清单开始。", "This criterion turns “the narrowest usable width” from taste into something testable: 320px equals a 1280px viewport at 400% zoom, a floor shared by low-vision users and small devices. Breakpoints should be arranged upward from that floor rather than downward from a list of model numbers."),
    },
    deepDive: [
      t("媒体查询与容器查询的差别不只是“看谁”：媒体查询在布局之前求值，容器查询依赖 containment，让组件尺寸不再由内容决定，从而避免循环依赖。理解这一点就能判断什么时候该用哪个——页面级重排用媒体查询，组件级自适应用容器查询。", "The difference between media and container queries is not just what they measure: a media query is evaluated before layout, while a container query relies on containment so a component's size no longer depends on its contents, avoiding a circular dependency. That tells you which to reach for — media queries for page-level reflow, container queries for component-level adaptation."),
      t("流式尺寸的理论基础是把固定值换成关于可用空间的函数：clamp、min、max 都是一个下限、一段可变区间、一个上限。凡是能用这种函数表达的尺寸都不需要断点；只有需要改变结构（而不是尺寸）的地方，才值得新增一条媒体查询。", "Fluid sizing is replacing a fixed value with a function of the available space: clamp, min and max each express a floor, a variable range and a ceiling. Any size you can express that way needs no breakpoint; only changes of structure, rather than of size, justify adding one."),
    ],
    checklist: [
      t("360 / 768 / 1280 三个宽度都不出现横向滚动条吗？", "Is there no horizontal scrollbar at 360, 768 and 1280?"),
      t("字号与间距是流式变化，还是靠一串断点硬跳？", "Do type and spacing scale fluidly, or jump between breakpoints?"),
      t("每个断点都能说清它解决了哪个内容问题吗？", "Can you say which content problem each breakpoint solves?"),
      t("组件换到侧栏等窄容器时，样式会自动变紧凑吗？", "When a component moves into a narrow sidebar, does it turn compact on its own?"),
    ],
    html: `<section class="shell">\n  <main>主要内容</main>\n  <aside>辅助内容</aside>\n</section>`,
    css: `.shell { display: grid; gap: 24px; }\n@media (min-width: 768px) {\n  .shell { grid-template-columns: 2fr 1fr; }\n}`,
    demo: "split",
    controls: ["columns", "gap"],
    challenge: t("小屏保持单列，空间足够时变为 2:1 的双列结构。", "Stay single column on small screens and become a 2:1 split when space allows."),
  },
  {
    id: "patterns",
    order: 7,
    stage: "practice",
    title: t("常见页面模式", "Common Page Patterns"),
    summary: t("拆解 Hero、侧边栏、卡片流和圣杯布局，并选择合适的工具。", "Break down heroes, sidebars, card flows and the holy grail, then pick the right tool."),
    scenario: t("做作品集或博客首页时，你会在一个下午里连续遇到四块内容：首屏 Hero、卡片流、侧栏目录和页脚。每一块的排法都不同，而选错工具会让后续维护成本成倍增加。", "Building a portfolio or blog home page you meet four blocks in one afternoon: the hero, the card flow, a sidebar table of contents and the footer. Each is arranged differently, and the wrong tool multiplies the maintenance cost."),
    caseStudy: t("案例收束：把贯穿案例扩成一张作品集首页——Hero、卡片流、侧栏目录、页脚。第 7 章不做新属性，只做判断：每一块该用哪种布局手段，以及为什么。第八章会把它变成一次完整交付。", "The case closes by growing into a portfolio home page: hero, card flow, sidebar table of contents and footer. Chapter 7 introduces no new properties, only judgement: which layout tool each block needs and why. Chapter 8 turns it into a full delivery."),
    goal: t("独立完成一个博客或作品集首页", "Build a blog or portfolio home page on your own"),
    duration: t("约 18 分钟", "18 min"),
    objectives: [
      t("识别页面里的一维与二维关系", "Spot one- and two-dimensional relationships on a page"),
      t("在文档流、Flexbox、Grid 之间做出选择", "Choose between normal flow, Flexbox and Grid"),
      t("用一个容器宽度统一整页的横向节奏", "Unify horizontal rhythm with one container width"),
    ],
    theory: [
      {
        heading: t("先判断内容关系", "Start by reading the content relationship"),
        why: t("把“内容关系”当第一判断标准，就不用先选工具再掰内容：一维关系用 Flexbox，二维关系用 Grid，长文档用文档流加宽度限制，几乎覆盖了所有页面结构。", "Making the content relationship the first question removes the “pick a tool, then bend the content” trap: one dimension means Flexbox, two mean Grid, and a long document just needs normal flow with a width limit."),
        snippet: "/* 一维：导航行、标签行 */\n.row  { display: flex; gap: 16px; }\n/* 二维：首屏 + 卡片流的骨架 */\n.page { display: grid; gap: 32px; }",
        pitfall: t("先挑一个流行布局，再把不适合的内容硬塞进去——改一次文案，整个结构都要重写。", "Choosing a trendy layout first and forcing unsuitable content into it: one copy change means rewriting the whole structure."),
        analogy: t("一维关系像排队，二维关系像停车位：排队只需要一条线，停车位要同时对齐行和列。", "One dimension is a queue and two dimensions are parking bays: a queue needs one line, bays must line up in rows and columns at once."),
        demoHint: t("把整页内边距调大，观察所有区块是否跟着同一条容器宽度变化——如果有例外，说明宽度被写了两遍。", "Raise the page padding and check that every block follows one container width; an exception means the width is written twice."),
        variants: [{ label: t("混合使用才是常态", "Mixing is the norm"), note: t("现代页面几乎总是混用：Grid 做骨架、Flex 做组件内部、普通流放文字，各区域互不干扰。", "Modern pages mix them: Grid for the shell, Flex inside components and normal flow for prose — regions do not interfere.") }, { label: t("先有内容关系再选工具", "Relationship first, tool second"), note: t("没有弄清内容关系就套布局，真实文案一进来就会崩：工具是对关系的描述，不是装饰。", "Choosing a layout before understanding the relationship breaks the moment real copy arrives: a tool describes the relationship, it does not decorate it.") }],
        walkthrough: { situation: t("首页有导航行、卡片流和正文三块，要决定各自用什么工具。", "A home page has a nav row, a card flow and body copy; each needs a tool."), steps: [t("① 一维的导航行用 flex 加 gap。", "The one-dimensional nav row takes flex with gap."), t("② 二维的卡片流用 grid 加 auto-fit。", "The two-dimensional card flow takes grid with auto-fit."), t("③ 长文档用普通流加 max-width。", "The long document takes normal flow plus max-width.")], result: t("三块各用最贴合意图的工具，不需要额外 hack。", "Each block gets the tool that matches its intent, with no extra hacks.") },
        refs: [{ label: "MDN · CSS 布局", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_layout", kind: "docs" }, { label: "web.dev · Layout", href: "https://web.dev/learn/css/layout", kind: "article" }, { label: "CSS Flexbox 1 §1 · 一维布局的定位", href: "https://drafts.csswg.org/css-flexbox-1/#intro", kind: "spec" }, { label: "CSS 2.2 §9.4.1 · 块格式化上下文", href: "https://www.w3.org/TR/CSS22/visuren.html#block-formatting", kind: "spec" }],
        body: t("同一组元素沿一条线排列，用 Flexbox；区域之间需要在行和列两个方向上对齐，用 Grid；只是一篇长文档，普通文档流加宽度限制就够了。这不是风格偏好：三种手段背后是三套不同的排版算法，选错了就得用更多 hack 去补。判据在规范里写得很直接——工具跟着内容关系走，而不是跟着个人习惯走。", "A group of items along one line calls for Flexbox; regions that must align in rows and columns call for Grid; a long document just needs normal flow plus a width limit. This is not a matter of taste: the three tools are three different layout algorithms, and the wrong one costs extra hacks. The specifications are explicit about their intent — let the tool follow the content relationship, not your habits."),
        principle: t("工具判据来自规范的设计意图，而非个人偏好：Flexbox §1 明确它面向“沿单一轴分配空间”的一维布局，Grid §1 面向“行与列同时参与”的二维布局，CSS 2.2 §9.4.1 的块格式化上下文负责剩下的一切。先判断内容关系再选工具，本质是选择让浏览器运行哪套算法。", "The choice of tool comes from each specification's intent, not from taste: Flexbox §1 addresses one-dimensional distribution along a single axis, Grid §1 addresses rows and columns together, and the block formatting context of CSS 2.2 §9.4.1 handles everything else. Deciding the content relationship first means choosing which algorithm the browser will run."),
      },
      {
        heading: t("Hero 是一个纵向堆叠的容器", "A hero is a vertical stack"),
        point: "flex-direction: column",
        why: t("首屏内容是纵向的语义顺序（标题 → 副标题 → 按钮），用 column 让 DOM 顺序与视觉顺序保持一致，键盘与读屏顺序才不会错乱。", "Hero content has a vertical semantic order (title, subtitle, call to action). Using column keeps the DOM order equal to the visual order, so keyboard and screen-reader order stay correct."),
        snippet: ".hero {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  align-items: flex-start;\n}",
        pitfall: t("为了让按钮居中而用 absolute 定位，屏幕变窄后按钮和文案重叠在一起。", "Absolutely positioning the button just to center it: once the screen narrows, the button and the copy overlap."),
        analogy: t("flex-direction: column 像按阅读顺序排队：先来先看，键盘和读屏走的是同一条队。", "flex-direction: column is queuing in reading order: first come, first read, and keyboard and screen reader walk the same queue."),
        demoHint: t("把卡片流间距调到 24，再把窗口从 1440 拖到 360，看列数自己变化。", "Set the card-flow gap to 24, then drag the window from 1440 down to 360 and watch the column count change on its own."),
        variants: [{ label: t("align-items: flex-start", "align-items: flex-start"), note: t("纵向堆叠时让子项按自身宽度左对齐，而不是被默认拉伸到整行。", "When stacking vertically this keeps children at their own width instead of stretching them across the row.") }, { label: t("column 下 align-items 管横向", "Under column, align-items is horizontal"), note: t("与 row 时的直觉相反，两个属性的作用轴交换了，这是最容易记混的一点。", "It is the opposite of the row case: the two properties have swapped axis, the easiest thing to misremember.") }],
        walkthrough: { situation: t("Hero 是标题、副标题、按钮的纵向堆叠，窄屏也不能重叠。", "The hero stacks a title, subtitle and button and must not overlap when narrow."), steps: [t("① 容器 flex-direction: column 加 gap。", "Set flex-direction: column with a gap on the container."), t("② align-items: flex-start 让它们左对齐。", "Use align-items: flex-start to keep them flush left."), t("③ 缩到 360px 确认按钮没有压到文案。", "At 360px confirm the button does not overlap the copy.")], result: t("DOM 顺序等于视觉顺序，键盘与读屏走同一条路。", "DOM order equals visual order, so keyboard and screen reader share one path.") },
        refs: [{ label: "MDN · flex-direction", href: "https://developer.mozilla.org/docs/Web/CSS/flex-direction", kind: "docs" }, { label: "WCAG 2.2 · 2.4.3 焦点顺序", href: "https://www.w3.org/TR/WCAG22/#focus-order", kind: "spec" }],
        body: t("首页首屏通常包含标题、副标题和行动按钮，它们在语义上就是纵向顺序。用一层 flex-direction: column 加 gap 排列，DOM 顺序与视觉顺序天然一致，键盘和读屏用户走的也是同一条路。若改用绝对定位逐个摆放，屏幕一变宽度就会重叠，而且元素之间的顺序关系从此消失在样式里，维护的人再也看不出来。", "A hero usually holds a title, a subtitle and a call to action, which are vertical in meaning. One flex-direction: column with a gap keeps DOM order equal to visual order, so keyboard and screen-reader users travel the same path. Positioning each element absolutely instead makes them overlap as soon as the width changes, and the ordering relationship disappears into the styles where nobody can read it."),
        principle: t("flex-direction: column 时主轴变成块轴：justify-content 沿纵向分配、align-items 沿横向对齐（Flexbox §5.1）。这样做还有一个可访问性收益——视觉顺序与 DOM 顺序保持一致，符合 WCAG 2.2 的 2.4.3 Focus Order；反之用 row-reverse 或 order 制造视觉顺序，会让键盘与读屏顺序对不上。", "With flex-direction: column the main axis becomes the block axis: justify-content distributes vertically and align-items aligns horizontally (Flexbox §5.1). There is an accessibility payoff too — visual order stays equal to DOM order, which is what WCAG 2.2 criterion 2.4.3 Focus Order asks for. Reordering visually with row-reverse or order breaks that match."),
      },
      {
        heading: t("卡片流交给 auto-fit", "Let auto-fit handle the card flow"),
        point: "repeat(auto-fit, ...)",
        why: t("auto-fit 加 minmax 让列数由可用宽度决定：宽屏四列、平板两列、手机一列，全程零媒体查询，卡片被删掉几个也不会露出空轨道。", "auto-fit with minmax lets the available width decide the column count: four columns when wide, two on a tablet, one on a phone, with no media query at all and no empty tracks when cards are removed."),
        snippet: ".work {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 24px;\n}",
        pitfall: t("下限设得太大（例如 320px），手机上只能显示一列，还可能出现横向滚动。", "A floor that is too large (320px, say) gives a single column on a phone and can even introduce sideways scrolling."),
        analogy: t("auto-fit 像按货架宽度摆放商品，不需要事先决定摆几列。", "auto-fit arranges goods by shelf width without deciding the column count up front."),
        demoHint: t("检查 Hero 的 DOM 顺序与视觉顺序是否一致；不一致时先改 DOM，而不是用 order。", "Check that the hero's DOM order matches the visual order; when it does not, fix the DOM rather than reaching for order."),
        variants: [{ label: t("给卡片一个上限", "Give cards a ceiling"), note: t("卡片最宽不受限时会被拉得很宽；用 minmax(220px, 1fr) 配合容器宽度上限即可。", "Left uncapped, cards stretch wide; pair minmax(220px, 1fr) with a container width ceiling.") }, { label: t("单张卡片会铺满整行", "One card fills the row"), note: t("只剩一张卡片时 auto-fit 会让它占满整行，需要 max-width 或预留一个空槽位。", "With a single card left, auto-fit lets it take the whole row; add a max-width or reserve an empty slot.") }],
        walkthrough: { situation: t("作品集卡片流要去掉所有断点。", "The portfolio card flow should need no breakpoints at all."), steps: [t("① 容器写 grid 加 repeat(auto-fit, minmax(220px, 1fr))。", "Give the container grid with repeat(auto-fit, minmax(220px, 1fr))."), t("② 用 gap: 24px 统一间距。", "Set gap: 24px for the spacing."), t("③ 从 1440 拖到 360，确认列数自动变化。", "Drag from 1440 down to 360 and watch the columns change.")], result: t("四档宽度都不需要媒体查询。", "Four widths, no media queries.") },
        refs: [{ label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat", kind: "docs" }, { label: "web.dev · Grid", href: "https://web.dev/learn/css/grid", kind: "article" }, { label: "CSS Grid 1 §7.2.3.1 · repeat() 自动重复", href: "https://drafts.csswg.org/css-grid-1/#auto-repeat", kind: "spec" }],
        body: t("repeat(auto-fit, minmax(220px, 1fr)) 让卡片在宽屏多列、窄屏单列，全程不需要任何媒体查询。下限决定什么时候换列，上限留成 1fr 让它们填满容器。这也是响应式列表里最划算的一行写法：删掉几张卡片不会留下空洞，加几张也不会把布局挤坏。", "repeat(auto-fit, minmax(220px, 1fr)) gives cards many columns on wide screens and one on narrow screens with no media query involved. The floor decides when a column drops and the 1fr ceiling lets them fill the container. It is the best-value line in a responsive list: removing cards leaves no holes and adding them does not break the layout."),
        principle: t("卡片流交给 repeat(auto-fit, minmax(220px, 1fr))：§7.2.3.1 的自动重复形式先算出能放几列，§11 的轨道尺寸算法再把剩余空间分给各列。列数因此跟着容器宽度走，而不是跟着一组手写断点走——少写一套媒体查询，也少一处会在改文案后失效的地方。", "Handing a card flow to repeat(auto-fit, minmax(220px, 1fr)) means the auto-repeat form of §7.2.3.1 counts the columns first and §11's track sizing shares the space second. The count follows the container instead of a set of hand-written breakpoints, which is one fewer media query and one fewer place that breaks after a copy change."),
      },
      {
        heading: t("圣杯布局就是一张命名地图", "The holy grail is a named map"),
        point: "grid-template-areas",
        why: t("把页眉、侧栏、内容、页脚写进字符地图，结构关系一眼可读；断点里只需要重画这张地图，DOM 完全不动。", "Writing header, sidebar, content and footer into a character map makes the structure readable at a glance. At a breakpoint you redraw the map and leave the DOM untouched."),
        snippet: ".shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.side { grid-area: side; }\n.main { grid-area: main; }",
        pitfall: t("同一行的字符数不一致，或某个区域不成矩形——整条声明被忽略，布局悄悄退回单列。", "Rows with different word counts, or an area that is not rectangular: the declaration is ignored and the layout quietly falls back to one column."),
        analogy: t("grid-template-areas 像乐高底板：先把区域拼好，再把零件按名字按上去。", "grid-template-areas is a Lego baseplate: build the regions first, then snap pieces on by name."),
        demoHint: t("用键盘 Tab 走一遍首屏，确认焦点顺序与阅读顺序相同、焦点始终可见。", "Tab through the first screen and confirm focus order equals reading order and focus is always visible."),
        variants: [{ label: t("grid-area 的两种用法", "Two ways to use grid-area"), note: t("grid-area: side 认领命名区域；也可以写 行起 / 列起 / 行止 / 列止 精确落位。", "grid-area: side claims a named area, or use row-start / column-start / row-end / column-end for exact placement.") }, { label: t("地图只改排版不改顺序", "The map changes layout, not order"), note: t("重排后读屏与键盘仍按 DOM 顺序；一定要确认新排版下的阅读顺序依然合理。", "After a reflow, screen readers and the keyboard still follow the DOM: confirm the reading order still makes sense.") }],
        walkthrough: { situation: t("圣杯骨架在手机上要变成「页眉 / 主内容 / 侧栏 / 页脚」的单列。", "The holy-grail shell must become a single column on a phone."), steps: [t("① 桌面地图写成 \"head head\" / \"side main\" / \"foot foot\"。", "Desktop map: \"head head\" / \"side main\" / \"foot foot\"."), t("② 断点内改写成单列地图。", "Inside the breakpoint rewrite it as a single-column map."), t("③ DOM 完全不动，只改地图字符串。", "Leave the DOM alone and edit only the map strings.")], result: t("重排只动 CSS，结构语义保持不变。", "The reflow touches CSS only and the structure stays intact.") },
        refs: [{ label: "MDN · grid-template-areas", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas", kind: "docs" }, { label: "A List Apart · In Search of the Holy Grail", href: "https://alistapart.com/article/holygrail/", kind: "article" }],
        body: t("页眉、侧栏、内容、页脚这四块，用 grid-template-areas 一行一行画出来，再让子元素用 grid-area 认领位置，结构关系一眼可读。历史上这需要用浮动加负外边距和顺序 hack 才能勉强实现，今天只改几行字符就能在断点处重排——这正是规范引入 Grid 想解决的问题。", "Header, sidebar, content and footer can be drawn line by line with grid-template-areas, with each child claiming its spot through grid-area, so the structure reads at a glance. It used to take floats, negative margins and source-order hacks; today a reflow means editing a few strings — exactly the problem Grid was added to solve."),
        principle: t("圣杯布局这类页面骨架，现在只需要一张命名区域地图（Grid §7.3）加几行声明。它此前要用浮动、负外边距与顺序 hack 才能实现——A List Apart 2006 年的《In Search of the Holy Grail》是那套做法的代表文献，与今天的写法并读，就能理解规范为什么引入 Grid。", "A page shell like the holy grail now needs one named area map (Grid §7.3) and a few declarations. It used to take floats, negative margins and source-order hacks; A List Apart's 2006 article In Search of the Holy Grail documents that era, and reading it beside today's version explains why Grid was added."),
      },
    ],
    keyPoints: [
      { term: "flex-direction: column", desc: t("垂直堆叠首屏内容。", "Stack hero content vertically."), detail: t("主轴变成垂直方向，justify-content 控制纵向、align-items 控制横向，两者作用方向互换。", "The main axis turns vertical: justify-content controls the vertical and align-items the horizontal, so their roles swap.") },
      { term: "repeat(auto-fit, ...)", desc: t("自动响应式卡片流。", "An automatic responsive card flow."), detail: t("配合 gap 与 minmax 使用；轨道数由容器宽度决定，不需要为断点重写列数。", "Pairs with gap and minmax; the track count comes from the container width, so breakpoints never rewrite it.") },
      { term: "grid-template-areas", desc: t("描述页面的区域地图。", "Describe the page's region map."), detail: t("每个字符串一行；重复的名字会自动合并成矩形区域，用 . 表示留空。", "One string per row; repeated names merge into a rectangle and a dot leaves a cell empty.") },
      { term: "grid-area", desc: t("让子元素认领一个命名区域。", "Let a child claim a named area."), detail: t("既认领命名区域，也能用 grid-area: 行起 / 列起 / 行止 / 列止 精确落位。", "Either claims a named area or lands precisely with grid-area: row-start / column-start / row-end / column-end.") },
      { term: "min(100% - 32px, 1200px)", desc: t("同时限制最大宽度与安全边距。", "Limit max width and keep a safe margin at once."), detail: t("窄屏自动减去两侧各 16px 安全边距，宽屏锁定 1200px，全站一处定义。", "Narrow screens lose 16px on each side for a safe margin, wide screens lock at 1200px, defined once.") },
      { term: "position: sticky", desc: t("让侧栏或目录在滚动时保持可见。", "Keep a sidebar or table of contents visible while scrolling."), detail: t("侧栏目录用 top: 24px 粘住，父容器滚动结束时自然离开，不会像 fixed 那样一直压着内容。", "A sidebar table of contents sticks at top: 24px and leaves when the container ends, instead of covering content like fixed.") },
    ],
    mistakes: [
      t("先挑一个流行布局，再把不适合的内容硬塞进去。", "Picking a trendy layout first and forcing unsuitable content into it."),
      t("每一块各写一套容器宽度，页面横向节奏变得凌乱。", "Writing a separate container width per section and losing the horizontal rhythm."),
    ],
    practice: [
      t("给整个首页定义一个统一的容器宽度。", "Define one shared container width for the whole home page."),
      t("用 Grid 做首屏 + 卡片流的骨架，用 Flexbox 做内部组件。", "Use Grid for the hero and card-flow skeleton, Flexbox for inner components."),
      t("把卡片流写成 auto-fit，去掉所有断点。", "Rewrite the card flow with auto-fit and delete the breakpoints."),
    ],
    focus: [
      t("把“内容关系”翻译成规范里的算法选择（一维 / 二维 / 普通流）。", "Translating a content relationship into a choice of algorithm: one-dimensional, two-dimensional or normal flow."),
      t("把 DOM 顺序与视觉顺序的一致性当成选择布局手段的约束条件。", "Treating DOM-versus-visual order as a constraint when choosing a technique."),
      t("让卡片流列数由容器决定，把人工断点留给真正需要重排的地方。", "Letting the container decide the column count and saving breakpoints for genuine reflows."),
    ],
    difficulty: [
      t("习惯先挑布局再套内容，改一次文案就要重写结构。", "Picking a layout first and fitting content into it, so every copy change rewrites the structure."),
      t("用 order / row-reverse 调视觉顺序，没意识到键盘焦点顺序仍按 DOM 走。", "Reordering visually with order or row-reverse while keyboard focus still follows the DOM."),
      t("说不清“为什么同样是一行元素，这里该用 flex、那里该用 grid”。", "Being unable to justify why one row of items calls for flex and another for grid."),
    ],
    examPoints: [
      t("给出三块内容（导航行、卡片流、图文正文），要求各自选用合适的工具并说明依据。", "Three blocks — a nav row, a card flow and body copy — ask which tool each needs and why."),
      t("给一段用 order 调顺序的代码，要求指出可访问性问题并改写。", "Show code that reorders with order, name the accessibility problem and rewrite it."),
      t("提问：圣杯布局在浮动时代为什么需要负外边距？今天的写法省掉了哪一步？", "Ask why the float-era holy grail needed negative margins and which step today's version removes."),
    ],
    counterExamples: [
      {
        title: t("用 order 调视觉顺序，键盘顺序却对不上", "Reordering with order while keyboard order lags behind"),
        html: "<form class=\"row\">\n  <button type=\"button\" class=\"secondary\">取消</button>\n  <button type=\"submit\" class=\"primary\">提交</button>\n</form>",
        css: ".row {\n  display: flex;\n  gap: 12px;\n}\n.row .primary {\n  order: -1;   /* 让“提交”排在视觉最前面 */\n}",
        symptom: t("视觉上“提交”在左、“取消”在右，但按 Tab 时焦点先落在“取消”再跳到“提交”；读屏器同样按 DOM 顺序朗读。", "Visually 提交 sits on the left and 取消 on the right, yet Tab lands on 取消 first and only then on 提交; screen readers also follow DOM order."),
        cause: t("order 只改变弹性项目的排版顺序（Flexbox §5.4），不改 DOM、不改焦点顺序，也不改可访问性树的顺序；视觉与语义因此分叉。", "order only changes the layout order of flex items (Flexbox §5.4); it leaves the DOM, the focus order and the accessibility tree untouched, so visual and semantic order diverge."),
        fix: t("需要不同的操作顺序时直接调整 DOM（把主按钮写在前面），或换一个不依赖顺序的方案。", "When the tabbing order must change, change the DOM (put the primary button first) or choose an approach that does not rely on order."),
        whyHidden: t("视觉结果完全符合设计稿，鼠标用户也感觉不到；只有键盘 Tab 或读屏器访问时才暴露，而这两者常常不在日常验收路径里。", "The visual result matches the design and mouse users notice nothing; it only surfaces for keyboard and screen-reader users, who are rarely part of the daily review path."),
      },
    ],
    bibliography: [{ label: "CSS Flexible Box Layout 1 §1 · 设计定位", href: "https://drafts.csswg.org/css-flexbox-1/#intro", kind: "spec" }, { label: "CSS Grid Layout 1 · repeat() 与 auto-fit", href: "https://drafts.csswg.org/css-grid-1/#auto-repeat", kind: "spec" }, { label: "WCAG 2.2 · 2.4.3 焦点顺序", href: "https://www.w3.org/TR/WCAG22/#focus-order", kind: "spec" }, { label: "A List Apart · In Search of the Holy Grail (2006)", href: "https://alistapart.com/article/holygrail/", kind: "article" }, { label: "web.dev · Layout", href: "https://web.dev/learn/css/layout", kind: "article" }],
    figures: [{ id: "holy-grail-map", caption: t("区域地图把骨架写成字符：断点里只重画这张地图，DOM 完全不动。", "The area map writes the shell as characters: a breakpoint redraws the map and the DOM stays untouched.") }, { id: "order-vs-dom", caption: t("order 只改排版顺序，不改 DOM、焦点与可访问性树；需要不同顺序时改 DOM。", "order only changes layout order, not the DOM, focus or accessibility tree; when order must change, change the DOM.") }],
    glossary: [
      { term: "容器宽度", def: t("全站统一的横向节奏：用一处 min(100% - 边距, 上限) 定义，所有区块共用。", "One shared horizontal rhythm, defined once with min(100% - margin, ceiling) and reused by every block."), source: "工程惯例" },
      { term: "Hero", def: t("首屏区域，通常纵向堆叠标题、副标题与行动按钮。", "The first screen: a vertical stack of title, subtitle and call to action."), source: "设计惯例" },
      { term: "卡片流", def: t("数量与宽度都不固定的卡片集合，适合交给 auto-fit + minmax。", "A set of cards with no fixed count or width, best handed to auto-fit with minmax."), source: "CSS Grid 1 §7.2.3.1" },
      { term: "圣杯布局", def: t("页眉 + 侧栏 + 主内容 + 页脚的经典三列骨架，今天用命名区域几行写完。", "The classic header, sidebar, content and footer shell, now a few lines of named areas."), source: "A List Apart 2006" },
      { term: "视觉顺序与 DOM 顺序", def: t("两者不一致会让键盘与读屏顺序错乱，WCAG 2.4.3 对此有明确要求。", "When the two disagree, keyboard and screen-reader order break; WCAG 2.4.3 covers this."), source: "WCAG 2.2 · 2.4.3" },
      { term: "纵向节奏", def: t("页面各区块间距遵循同一套尺度，读者不会在中途失去结构感。", "Sections share one spacing scale so the reader never loses the structure."), source: "设计惯例" },
    ],
    spec: {
      quote: t("The flex layout is not intended for two-dimensional layout... The grid layout is a two-dimensional layout system, optimized for user interface design.", "The flex layout is not intended for two-dimensional layout; the grid layout is a two-dimensional system optimized for user interface design."),
      quoteZh: t("弹性布局并非为二维布局而设计；网格布局则是面向界面设计的二维布局系统。", "Flex layout is not intended for two-dimensional layout; grid layout is a two-dimensional system optimised for interface design."),
      source: "CSS Flexbox 1 §1 与 CSS Grid 1 §1 · 设计定位",
      note: t("两份规范在引言里就写清了各自边界：一维与二维。选择工具时引用这两句话，比“我觉得 flex 更简单”更站得住脚，也能解释为什么在二维场景里硬用 flex 会不断需要嵌套与 hack。", "Both specs state their boundary in the introduction: one dimension versus two. Quoting them settles a tool choice better than “flex feels simpler”, and explains why forcing flex onto a two-dimensional problem keeps demanding nesting and hacks."),
    },
    deepDive: [
      t("布局史本身就是一节理论课。在 Grid 出现之前，圣杯布局用浮动加负外边距实现，卡片流靠百分比宽度与清除浮动维持；这些技巧的共同代价是布局依赖内容顺序，改一处结构就要重新推演整套间距。命名区域与自动填充把这份推演交给了浏览器。", "Layout history is a theory lesson of its own. Before Grid, the holy grail used floats and negative margins, and card flows leaned on percentage widths with clearfix. Those tricks all paid the same price: layout depended on source order, so moving one block meant re-deriving every gap. Named areas and automatic filling hand that derivation to the browser."),
      t("今天的工程实践里，工具选择更多决定可维护性而不是可行性。同一个导航栏用 Grid 也能写出来，但当设计改成“间距由内容决定、末项贴右”时，Flexbox 的 gap 与 justify-content 更贴近意图；反过来，卡片流用 Flexbox 需要配合 flex-basis 与换行计算，用 Grid 一行即可。", "In day-to-day work the choice of tool decides maintainability more than feasibility. A navbar can be written in Grid too, but when the design becomes “space set by content, last item flush right”, gap and justify-content express that intent more directly; a card flow, conversely, needs flex-basis and wrapping arithmetic in Flexbox but one line in Grid."),
    ],
    checklist: [
      t("整页容器宽度只有一处定义吗？", "Is the page's container width defined in exactly one place?"),
      t("卡片流在 360px 到 1440px 之间都不需要断点吗？", "Does the card flow work from 360px to 1440px without breakpoints?"),
      t("首屏的 DOM 顺序与视觉顺序一致吗？", "Do the hero's DOM order and visual order match?"),
      t("区域地图和实际 DOM 结构对得上吗？", "Does the region map match the actual DOM structure?"),
    ],
    html: `<main class="landing">\n  <section class="hero">作品介绍</section>\n  <section class="work">项目列表</section>\n</main>`,
    css: `.landing {\n  width: min(100% - 32px, 1200px);\n  margin-inline: auto;\n  display: grid;\n  gap: 32px;\n}`,
    demo: "landing",
    controls: ["padding", "gap"],
    challenge: t("用统一容器宽度和自动卡片流，把作品集首页排成清晰的纵向节奏。", "Give the portfolio home a clear vertical rhythm with one container width and an automatic card flow."),
  },
  {
    id: "final-challenge",
    order: 8,
    stage: "practice",
    title: t("综合布局挑战", "Complete Layout Challenge"),
    summary: t("从目标出发，拆结构、选方法、加断点，完成一个响应式页面。", "Start from a goal, decompose it, pick methods, add breakpoints and finish a responsive page."),
    scenario: t("这是一次完整的交付：从一张分区图开始，选工具、写结构、只加必要的断点，最后按清单逐项验收——把前七章的能力串成一条工作流。", "This is a full delivery: start from a region map, pick tools, write the structure, add only the breakpoints you need, then verify item by item against a checklist — the first seven chapters combined into one workflow."),
    caseStudy: t("最终交付：把贯穿八章的作品集首页做完——分区图、骨架行、卡片流、安全边距，最后按清单逐项验收（三个宽度、长内容、键盘焦点）。这一章的案例就是你自己要交出去的那一版。", "The final delivery: finish the portfolio page that has run through all eight chapters — region map, shell rows, card flow, safe margins — and then verify it item by item: three widths, long content, keyboard focus. The case here is the version you hand over."),
    goal: t("独立完成一个包含导航、内容与页脚的响应式项目页", "Complete a responsive project page with navigation, content and footer"),
    duration: t("约 35 分钟", "35 min"),
    objectives: [
      t("把一个页面拆成可独立排版的区域", "Break a page into regions that can be laid out independently"),
      t("为每个区域选择文档流、Flexbox 或 Grid", "Choose normal flow, Flexbox or Grid per region"),
      t("只写必要的断点，并逐一验证", "Write only the breakpoints you need and verify each one"),
    ],
    theory: [
      {
        heading: t("第一步是画分区图", "Step one is a region map"),
        why: t("分区图把“哪些内容属于一组”变成明确的边界。边界清楚之后，选工具几乎自动完成，也不会写着写着又回头改结构。", "A region map turns “which content belongs together” into hard boundaries. Once they are clear, picking a tool is almost automatic and you stop rewriting structure halfway through."),
        snippet: "<!-- 先落地三个区域，再谈样式 -->\n<nav>项目导航</nav>\n<main>项目内容</main>\n<footer>联系方式</footer>",
        pitfall: t("一边调颜色一边定结构，最后 DOM 层级和设计稿的分区完全对不上，改一处要动全篇。", "Deciding structure while tuning colors: the DOM ends up unrelated to the design's regions and one change ripples through everything."),
        analogy: t("分区像先切蛋糕再装饰：块切错了，奶油抹得再漂亮也端不出去。", "Dividing the page is cutting the cake before decorating: cut it wrong and no amount of icing saves the slice."),
        demoHint: t("依次在 360 / 768 / 1280 三个宽度检查：无横向滚动、无重叠、焦点可见。", "Check 360, 768 and 1280 in turn for horizontal scrolling, overlap and visible focus."),
        variants: [{ label: t("分区图可以来自设计稿", "The map can come from the design"), note: t("Figma 里的框就是分区图，关键是标出哪一块会随屏幕变化、哪一块固定。", "Frames in Figma already are a region map; the important part is marking which block changes with the screen.") }, { label: t("分区不等于 DOM 层级", "Regions are not DOM levels"), note: t("一个区域可以跨越多个 DOM 层级，但把区块放在同一层通常最省事，也最容易重排。", "A region may span several DOM levels, but keeping blocks at one level is usually simpler and easier to reflow.") }],
        walkthrough: { situation: t("交付一个作品页：导航、内容、页脚，需要先定结构。", "Deliver a project page with navigation, content and footer; structure comes first."), steps: [t("① 纸面画出四个区域，标注哪一块随屏幕变化。", "Sketch the four regions and mark which one changes with the screen."), t("② 给每个区域标注所需的格式化上下文。", "Label the formatting context each region needs."), t("③ 按标注写语义 HTML，再补每种上下文。", "Write the semantic HTML from that map, then add each context.")], result: t("代码结构是分区图的照抄，后续样式有稳定落点。", "The code transcribes the map, so later styles have a stable place to land.") },
        refs: [{ label: "MDN · <main>", href: "https://developer.mozilla.org/docs/Web/HTML/Element/main", kind: "docs" }, { label: "MDN · CSS 布局", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_layout", kind: "docs" }, { label: "CSS 2.2 §9.4 · 格式化上下文", href: "https://www.w3.org/TR/CSS22/visuren.html#normal-flow", kind: "spec" }],
        body: t("拿纸或在设计工具里，先用方块标出导航、主内容、侧栏、页脚，并注明哪一块会随屏幕变化。分区图清楚之后，代码结构几乎是照抄：每个区域对应一个格式化上下文，可以选择普通流、Flexbox 或 Grid。结构先定，样式才有稳定的落点；反过来，边写样式边改结构，最后会改到每一处。", "On paper or in a design tool, block out navigation, main content, sidebar and footer first, and note which block changes with the screen. Once the map is clear the code is almost a transcription: each region maps to a formatting context, chosen from normal flow, Flexbox or Grid. Fix the structure first and styles have a stable place to land; change structure while styling and you end up editing everywhere."),
        principle: t("CSS 2.2 §9.4 把排版拆成若干“格式化上下文”：块级盒子在块格式化上下文里排列、行内内容在行内格式化上下文里排列，Flexbox 与 Grid 又各自带来新的上下文。分区图之所以有用，是因为它把页面切成几个可以独立选择算法的区域——整页只用一种工具既没必要也不划算。", "CSS 2.2 §9.4 splits layout into formatting contexts: blocks are arranged in a block formatting context, inline content in an inline formatting context, and Flexbox and Grid each introduce their own. A region map helps because it cuts a page into areas that choose an algorithm independently — one tool for the whole page is neither necessary nor cheaper."),
      },
      {
        heading: t("每个区域各自选工具", "Pick a tool per region"),
        point: "grid-template-rows: auto 1fr auto",
        why: t("1fr 让中间那行吃掉剩余高度，页脚因此在内容不足时也停在屏幕底部；导航与页脚用 auto，高度随内容走。", "1fr lets the middle row absorb the leftover height, so the footer sits at the bottom of the screen even with little content. Navigation and footer use auto and follow their content."),
        snippet: ".project {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  gap: 24px;\n}",
        pitfall: t("把 height: 100vh 当成答案：手机地址栏收起时会露出空白或突然出现滚动，用 min-height 更稳。", "Reaching for height: 100vh: when the mobile address bar collapses you get a blank strip or sudden scrolling. min-height is the sturdier choice."),
        analogy: t("auto 与 1fr 像撑杆与弹簧：两头固定，中间那颗弹簧负责吃掉所有多余高度。", "auto and 1fr are props and a spring: both ends are fixed and the spring in the middle absorbs every spare millimetre."),
        demoHint: t("把列数调到 1，确认单列下每一块仍然可用——降级不是坏掉。", "Set the column count to 1 and confirm every block still works: degrading is not breaking."),
        variants: [{ label: t("高度也可以用 min() 表达", "Height can use min() too"), note: t("min-height: max(100dvh, 内容高度) 是另一种写法，效果与 min-height: 100dvh 接近且更贴近内容。", "min-height: max(100dvh, content height) is another spelling that hugs the content a little more closely.") }, { label: t("移动端软键盘会改变可视高度", "The software keyboard changes the viewport"), note: t("输入密集的页面用 dvh 做固定布局要谨慎：键盘弹出时可视高度会明显变小。", "Be careful with dvh-based fixed layouts on form-heavy pages: the visible height drops sharply when the keyboard opens.") }],
        walkthrough: { situation: t("内容不满一屏时，页脚也要停在屏幕底部。", "With little content the footer should still sit at the bottom of the screen."), steps: [t("① 外壳写 grid-template-rows: auto 1fr auto。", "Give the shell grid-template-rows: auto 1fr auto."), t("② 配 min-height: 100dvh。", "Pair it with min-height: 100dvh."), t("③ 清空内容，确认页脚仍在底部。", "Empty the content and confirm the footer stays at the bottom.")], result: t("不需要绝对定位，内容多少都成立。", "No absolute positioning needed; it holds for any amount of content.") },
        refs: [{ label: "MDN · grid-template-rows", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-rows", kind: "docs" }, { label: "MDN · min-height", href: "https://developer.mozilla.org/docs/Web/CSS/min-height", kind: "docs" }, { label: "CSS Grid 1 §7.2.2 · grid-template-rows", href: "https://drafts.csswg.org/css-grid-1/#grid-template-rows-property", kind: "spec" }, { label: "CSS Values 4 · dvh 等视口单位", href: "https://drafts.csswg.org/css-values-4/#viewport-relative-lengths", kind: "spec" }],
        body: t("页面外壳用三行：导航与页脚按内容高度（auto），中间那行用 1fr 吃掉剩余高度，于是内容不满一屏时页脚也停在底部。配合 min-height 与 dvh 单位（跟随移动端可视区域变化），比写 height: 100vh 更稳——后者在地址栏收起的一瞬间会露出空白。", "The shell uses three rows: navigation and footer follow their content (auto) while the middle row absorbs what is left with 1fr, so the footer stays at the bottom even with little content. Combined with min-height and the dvh unit, which follows the mobile viewport, it is steadier than height: 100vh — that one leaves a blank strip the moment the address bar collapses."),
        principle: t("grid-template-rows: auto 1fr auto 里的 1fr 是一条灵活轨道（Grid §7.2.2 配 §11 的轨道尺寸算法）：auto 轨道按内容高度、1fr 吃掉剩余高度，所以内容不满一屏时页脚也停在底部。配合 min-height 与 dvh 单位（CSS Values 4，跟随移动端可视区域），比 height: 100vh 更稳。", "The 1fr in grid-template-rows: auto 1fr auto is a flexible track (Grid §7.2.2 with the sizing algorithm in §11): auto tracks follow content and 1fr absorbs what is left, so the footer stays at the bottom even with little content. Combined with min-height and the dvh unit it is steadier than height: 100vh."),
      },
      {
        heading: t("断点越少越好", "Fewer breakpoints is better"),
        point: "auto-fit + minmax",
        why: t("自动填充让列数跟着容器宽度走，把“需要几个断点”的决定交给浏览器；人工断点只留给真正需要重排的地方。", "Auto-fill follows the container width and hands the “how many breakpoints” decision to the browser, leaving manual breakpoints only where the layout truly must change."),
        snippet: ".projects {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 24px;\n}",
        pitfall: t("下限与容器宽度打架（三列 400px 的下限配 1000px 容器），列数会在拖动窗口时反复跳变。", "A floor that fights the container width (a 400px floor expecting three columns in 1000px) makes the column count flip back and forth while you drag the window."),
        analogy: t("minmax 的下限像货架最小格宽：低于这个宽度，商品就开始压坏了。", "The minmax floor is a shelf's minimum bay width: below it, the goods start to crush."),
        demoHint: t("把间距调到 0，看布局是否仍然分得清区块；如果分不清，说明层次靠间距撑着。", "Set the gap to 0 and check whether blocks remain distinguishable; if not, the hierarchy was carried by spacing alone."),
        variants: [{ label: t("断点只留给结构变化", "Breakpoints are for structural change"), note: t("列数交给 auto-fit，但“侧栏折到顶部”这类结构变化仍需要媒体查询。", "Let auto-fit own the column count, but keep a media query for structural changes such as a sidebar folding to the top.") }, { label: t("下限与容器宽度会互相打架", "The floor can fight the container"), note: t("三列 400px 的下限放进 1000px 容器，列数会在拖动窗口时反复跳变。", "A 400px floor expecting three columns inside 1000px makes the column count flip while you drag the window.") }],
        walkthrough: { situation: t("项目卡片在三种屏幕下都要好看，且不想维护断点。", "Project cards must look right at three widths without maintaining breakpoints."), steps: [t("① 卡片容器写 repeat(auto-fit, minmax(240px, 1fr))。", "Give the card container repeat(auto-fit, minmax(240px, 1fr))."), t("② 把「内容不再挤坏」的宽度写成下限。", "Use the width at which content stops crowding as the floor."), t("③ 在 360 / 768 / 1280 验证列数与溢出。", "Verify column count and overflow at 360, 768 and 1280.")], result: t("列数自动变化，断点只留给真正需要重排的地方。", "Columns adapt on their own and breakpoints stay for genuine reflows.") },
        refs: [{ label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat", kind: "docs" }, { label: "MDN · minmax()", href: "https://developer.mozilla.org/docs/Web/CSS/minmax", kind: "docs" }, { label: "CSS Grid 1 §11 · 轨道尺寸算法", href: "https://drafts.csswg.org/css-grid-1/#track-sizing", kind: "spec" }],
        body: t("优先用 auto-fit、clamp 和百分比让布局自己适应，只在内容确实需要重新排列时才加媒体查询。每个断点都要能说清它解决了什么：是行长过长、卡片被压坏，还是导航挤成一团。少一个断点，就少一处将来会因为文案变化而失效的地方。", "Prefer auto-fit, clamp and percentages so the layout adapts on its own, and add a media query only when content truly needs rearranging. For every breakpoint you should be able to say what it fixes: lines too long, cards crushed, or navigation crowding. One breakpoint fewer is one fewer place that will fail the next time the copy changes."),
        principle: t("auto-fit + minmax 把列数交给轨道尺寸算法，“什么时候换列”因此由下限决定：下限越大，越早掉列。写卡片流时先量出“内容不再被挤坏的最小宽度”再写成下限——这个数字是设计决策，也是排查列数跳变的第一现场。", "auto-fit with minmax hands the column count to the track sizing algorithm, so the floor decides when a column drops: the larger the floor, the earlier it happens. Measure the width at which content stops crowding and use it as the floor — that number is a design decision and the first place to look when columns jump."),
      },
      {
        heading: t("按清单验收", "Verify against a checklist"),
        point: "max-width: 100%",
        why: t("图片、嵌入内容和长代码块是横向溢出的主要来源。限住它们的最大宽度，页面骨架才不会被内容撑破。", "Images, embedded content and long code blocks are the main sources of horizontal overflow. Capping their width is what keeps the shell from being blown apart by content."),
        snippet: "img, video, iframe, pre { max-width: 100%; }\nimg { height: auto; }",
        pitfall: t("给 img 只写 max-width 忘了 height: auto，图片比例被压变形；iframe 与 pre 还需要 overflow-x: auto。", "Adding max-width to img but forgetting height: auto, which distorts the image. iframes and pre also need overflow-x: auto."),
        analogy: t("改 transform 像搬动箱子，改 width 像拆墙：前者随手挪，后者要重新量整间屋子。", "Animating transform moves a box; animating width takes down a wall — one is a nudge, the other re-measures the room."),
        demoHint: t("缩到 320px，确认骨架不塌、页脚仍在底部、长内容没有撑破容器。", "At 320px confirm the shell holds, the footer stays at the bottom and long content never bursts the container."),
        variants: [{ label: t("长代码用局部滚动", "Local scrolling for long code"), note: t("pre { overflow-x: auto } 比强制换行更可读，整页宽度也保持稳定。", "pre { overflow-x: auto } reads better than forced wrapping and keeps the page width stable.") }, { label: t("长链接仍需 overflow-wrap", "Long links still need overflow-wrap"), note: t("max-width 管不到不可断行的文本：URL 与长单词需要 overflow-wrap: anywhere 才能换行。", "max-width cannot touch unbreakable text: URLs and long words need overflow-wrap: anywhere before they wrap.") }],
        walkthrough: { situation: t("交付前发现长链接与图片会撑破容器。", "Before delivery, long links and images burst the container."), steps: [t("① 给 img / video / iframe / pre 加 max-width: 100%。", "Add max-width: 100% to img, video, iframe and pre."), t("② 给 img 补 height: auto，避免被压扁。", "Add height: auto to images so they do not squash."), t("③ 缩到 320px 用键盘 Tab 走一遍，确认焦点可见且无横向滚动。", "At 320px, tab through the page and confirm focus is visible with no sideways scrolling.")], result: t("通过了验收清单里最容易被漏掉的两项。", "The two most neglected checklist items are covered.") },
        refs: [{ label: "MDN · max-width", href: "https://developer.mozilla.org/docs/Web/CSS/max-width", kind: "docs" }, { label: "Chrome · RenderingNG 渲染管线", href: "https://developer.chrome.com/blog/renderingng", kind: "article" }],
        body: t("完成后依次检查：最小宽度下无横向滚动、长文本能换行、焦点可见、图片不超过容器、刷新后结构仍正确。最后两项常被忽略：图片需要 height: auto 才不会被压扁，flex 与 grid 子项需要 min-width: 0 才真的能收缩。布局的可靠性来自这些细项，而不是视觉上的热闹。", "When finished, check in order: no horizontal scrolling at the smallest width, long text wraps, focus is visible, images stay inside their container, and the structure still holds after a refresh. The last two are the most neglected: an image needs height: auto not to be squashed, and flex or grid children need min-width: 0 before they truly shrink. Reliability comes from these details, not from visual noise."),
        principle: t("max-width: 100% 针对的是替换元素与长内容，而渲染成本取决于改了什么：RenderingNG 把管线拆成 style、layout、paint、composite，改 width 触发 layout（子树重算），改 transform / opacity 通常只走 composite。所以“用 transform 做位移、别动 width”是成本问题，不是风格偏好。", "max-width: 100% targets replaced elements and long content, while rendering cost depends on what changes: RenderingNG splits the pipeline into style, layout, paint and composite. Changing width triggers layout for a subtree; changing transform or opacity usually just composites — “animate transform, not width” is about cost, not taste."),
      },
    ],
    keyPoints: [
      { term: "grid-template-rows: auto 1fr auto", desc: t("让导航与页脚固定、内容区撑满。", "Keep navigation and footer fixed while content fills the middle."), detail: t("1fr 那行吸收剩余高度；内容超过一屏时页面正常变高，不会裁切。", "The 1fr row absorbs the remaining height; when content exceeds a screen the page simply grows instead of clipping.") },
      { term: "min-height: 100dvh", desc: t("让页面至少铺满一屏高度。", "Let the page fill at least one viewport height."), detail: t("dvh 跟随移动端可视区域变化；写成 height 会把内容裁在屏幕内。", "dvh follows the mobile viewport as it changes; writing height instead would clip content to the screen.") },
      { term: "min(100% - 32px, 1160px)", desc: t("统一容器宽度与安全边距。", "One shared container width with a safe margin."), detail: t("窄屏自动留出两侧 16px，宽屏锁定 1160px，整个项目只需一处定义。", "Narrow screens keep 16px on each side, wide screens lock at 1160px, defined once for the whole project.") },
      { term: "auto-fit + minmax", desc: t("无需断点的响应式网格。", "A responsive grid without breakpoints."), detail: t("先定下限（内容不再挤坏的最小宽度），再让浏览器决定列数；配 gap 使用。", "Set the floor first — the width at which content stops crowding — then let the browser choose the count, with gap alongside.") },
      { term: "min-width: 0", desc: t("防止网格或弹性子项被内容撑破。", "Stop grid or flex children from being blown up by content."), detail: t("flex / grid 子项的默认最小尺寸等于内容宽度，加了 0 之后省略号与换行才真正生效。", "A flex or grid child's minimum size defaults to its content width; only min-width: 0 lets truncation and wrapping actually work.") },
      { term: "max-width: 100%", desc: t("让图片与媒体元素随容器收缩。", "Let images and media shrink with the container."), detail: t("图片还要补 height: auto；iframe 与 pre 建议配合 overflow-x: auto。", "Pair images with height: auto; give iframes and pre blocks overflow-x: auto as well.") },
    ],
    mistakes: [
      t("用大量绝对定位模拟正常布局，内容或屏幕一变就错位。", "Simulating normal layout with heavy absolute positioning, which misaligns as soon as content or screen size changes."),
      t("只在桌面宽度下开发，交付前才补移动端，结果推倒重来。", "Developing only at desktop width and bolting on mobile before delivery, then starting over."),
    ],
    practice: [
      t("先写出导航、主内容、页脚的语义结构。", "Write the semantic structure for navigation, content and footer first."),
      t("用 Grid 划分页面骨架，并让内容区自适应高度。", "Divide the shell with Grid and let the content area flex in height."),
      t("在 360px、768px、1280px 三个宽度逐项验收。", "Verify item by item at 360px, 768px and 1280px."),
    ],
    focus: [
      t("把页面拆成可以各自选择算法的区域，再判断每块该用什么上下文。", "Cutting a page into regions that choose their own algorithm and formatting context."),
      t("页面外壳用 1fr 撑开中间行，并用 dvh 处理移动端可视区域变化。", "Using 1fr for the middle row of a shell and dvh for the mobile viewport."),
      t("把渲染成本纳入决策：布局属性与合成属性的区别。", "Letting rendering cost inform decisions: layout properties versus composite-only ones."),
    ],
    difficulty: [
      t("试图用一个 Grid 或一套 absolute 定位解决整页，每加一块内容都要回头改结构。", "Trying to solve the whole page with one Grid or a pile of absolute positioning, then re-cutting the structure for every new block."),
      t("用 height: 100vh 做整页骨架，没考虑移动端地址栏收起的场景。", "Building a full-page shell with height: 100vh and ignoring the collapsing mobile address bar."),
      t("只按视觉调动画，未意识到改 width / height 会触发整棵子树的布局重算。", "Animating by eye without realising that width and height re-run layout for a whole subtree."),
    ],
    examPoints: [
      t("给出一个首页设计稿，要求写出分区图并标出每个区域使用的上下文。", "Given a home-page design, produce the region map and mark each region's formatting context."),
      t("给一段 height: 100vh 的骨架，要求改成 min-height + 1fr 并说明移动端差异。", "Show a height: 100vh shell, change it to min-height plus 1fr, and explain the mobile difference."),
      t("提问：为什么动 transform 比动 width 便宜？答案要落到渲染管线。", "Ask why animating transform is cheaper than animating width; the answer must land on the rendering pipeline."),
    ],
    counterExamples: [
      {
        title: t("用 height: 100vh 做整页骨架，移动端露出空白", "A height: 100vh shell leaves a blank strip on mobile"),
        html: "<main class=\"project\">\n  <nav>项目导航</nav>\n  <section>项目内容</section>\n  <footer>联系方式</footer>\n</main>",
        css: ".project {\n  height: 100vh;          /* 固定一屏高 */\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}",
        symptom: t("移动端地址栏收起的一瞬间底部多出一条空白，或页脚被裁掉；内容超过一屏时更明显。", "The moment the mobile address bar collapses, a blank strip appears at the bottom or the footer is clipped; it gets worse once content exceeds one screen."),
        cause: t("100vh 按“可能的最大视口高度”计算，并不跟随地址栏收起而变化；而布局已经按这个高度固定，多出来的部分既不能收缩也不能上移。", "100vh is computed from the largest possible viewport height and does not follow the collapsing bar, while the layout is already pinned to that height — the surplus can neither shrink nor move up."),
        fix: t("改成 min-height: 100dvh（dvh 跟随动态可视区域），中间行继续用 1fr 吸收剩余高度。", "Use min-height: 100dvh, which follows the dynamic viewport, and keep the middle row on 1fr to absorb the rest."),
        whyHidden: t("桌面浏览器与移动端 DevTools 模拟都不一定复现；只有真机上滑动、地址栏真正收起或展开时才看得出来。", "Neither a desktop browser nor mobile DevTools simulation reliably reproduces it; you only see it on a real device when the bar actually collapses."),
      },
    ],
    bibliography: [{ label: "CSS 2.2 §9 · 视觉格式化模型", href: "https://www.w3.org/TR/CSS22/visuren.html", kind: "spec" }, { label: "CSS Grid Layout 1 §11 · 轨道尺寸算法", href: "https://drafts.csswg.org/css-grid-1/#track-sizing", kind: "spec" }, { label: "CSS Values 4 · 视口相对单位（dvh）", href: "https://drafts.csswg.org/css-values-4/#viewport-relative-lengths", kind: "spec" }, { label: "Chrome for Developers · RenderingNG", href: "https://developer.chrome.com/blog/renderingng", kind: "article" }, { label: "WCAG 2.2 · 1.4.10 Reflow", href: "https://www.w3.org/TR/WCAG22/#reflow", kind: "spec" }],
    figures: [{ id: "render-pipeline", caption: t("先判断改动落在管线的哪一段，再决定怎么优化：layout 最贵，composite 最便宜。", "Decide which pipeline stage your change hits before optimising: layout is the expensive one, composite the cheap one.") }, { id: "dvh-vh", caption: t("整页骨架用 min-height + dvh，移动端地址栏收起时不会露出空白。", "Build full-page shells with min-height plus dvh so a collapsing mobile address bar leaves no blank strip.") }],
    glossary: [
      { term: "格式化上下文", def: t("块级、行内、弹性、网格各有自己的排版规则；区域可以选择不同的上下文。", "Block, inline, flex and grid each have their own rules; a region can choose its context."), source: "CSS 2.2 §9.4" },
      { term: "骨架行（shell rows）", def: t("页面外壳的 auto 1fr auto 三行：导航与页脚按内容，中间行吃掉剩余高度。", "The shell's auto 1fr auto rows: nav and footer follow content while the middle absorbs the rest."), source: "CSS Grid 1 §11" },
      { term: "安全边距", def: t("窄屏时两侧保留的最小空白，通常写在容器宽度表达式里。", "The minimum side margin on narrow screens, usually expressed inside the container width."), source: "工程惯例" },
      { term: "重排与重绘", def: t("改布局属性触发 layout，改颜色触发 paint，改 transform 通常只触发 composite。", "Changing layout properties triggers layout, changing colours triggers paint, changing transform usually only composites."), source: "RenderingNG" },
      { term: "合成层", def: t("浏览器把某些元素提升为独立层，便于只重合成而不重排。", "The browser promotes some elements to their own layer so they can be recomposited without layout."), source: "RenderingNG" },
      { term: "验收清单", def: t("交付前的固定检查项：宽度、长内容、键盘、刷新后结构。", "The fixed pre-delivery checks: widths, long content, keyboard, structure after a refresh."), source: "工程惯例" },
    ],
    spec: {
      quote: t("A formatting context is a set of rules that govern how boxes are laid out... Block, inline, flex and grid formatting contexts each define their own rules.", "A formatting context is a set of rules that govern how boxes are laid out; block, inline, flex and grid contexts each define their own."),
      quoteZh: t("格式化上下文是一套规定盒子如何排列的规则；块级、行内、弹性与网格各自定义自己的规则。", "A formatting context is a set of rules governing how boxes are laid out; block, inline, flex and grid each define their own."),
      source: "CSS 2.2 §9.4 与 CSS Display 3 · 格式化上下文",
      note: t("把页面拆成区域，本质上是给每个区域选择一套格式化上下文。这也是“整页只用一种工具”不划算的原因：不同区域的排版目标本来就不同，强行统一会让某些区域付出额外嵌套或 hack 的代价。", "Splitting a page into regions is really choosing a formatting context per region. That is why one tool for the whole page is a bad bargain: regions have different layout goals, and forcing them into one context makes some pay in nesting or hacks."),
    },
    deepDive: [
      t("渲染管线的分工决定了优化方向：style 决定哪些节点需要重算，layout 计算几何，paint 生成绘制指令，composite 把图层拼成画面。改 width 会进入 layout 并影响子树，改 transform 通常停在 composite。知道这条分工，就明白为什么“用 transform 做位移动画”是工程共识而非风格偏好。", "The pipeline's division of labour sets the direction for optimisation: style decides which nodes need recomputation, layout computes geometry, paint produces drawing commands and composite assembles layers into a frame. Changing width enters layout and affects a subtree; changing transform usually stops at composite. That division explains why animating transforms is engineering common sense rather than a style preference."),
      t("验收清单之所以重要，是因为布局缺陷大多在内容或环境变化时才出现：文案变长、系统字号被放大、地址栏收起、软键盘弹出。与其交付前凭感觉逐项检查，不如把这几项写成固定清单——它们覆盖了绝大多数真实环境差异，也正是 320px 与 dvh 这类规则存在的理由。", "A checklist matters because layout defects mostly appear when content or environment changes: longer copy, a bigger system font, a collapsing address bar, a software keyboard. Rather than eyeballing items before delivery, writing them down covers almost every real-world difference — and is exactly why rules such as 320px and dvh exist."),
    ],
    checklist: [
      t("360 / 768 / 1280 三个宽度下每一块都能正常使用吗？", "Does every region work at 360, 768 and 1280?"),
      t("长文本、长链接、图片都不会撑破容器吗？", "Do long text, long links and images all stay inside their containers?"),
      t("键盘 Tab 顺序与视觉顺序一致、焦点始终可见吗？", "Does keyboard order match the visual order with focus always visible?"),
      t("每个断点都能对应一个具体的内容问题吗？", "Does every breakpoint map to a concrete content problem?"),
    ],
    html: `<main class="project">\n  <nav>项目导航</nav>\n  <section>项目内容</section>\n  <footer>联系方式</footer>\n</main>`,
    css: `.project {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  gap: 24px;\n}`,
    demo: "project",
    controls: ["columns", "gap", "padding"],
    challenge: t("完成一个包含导航、内容区和页脚的响应式作品页，并保证三种屏幕下都可用。", "Build a responsive project page with navigation, content and footer that works at all three widths."),
  },
];

export const ui = {
  navCourse: t("课程地图", "Course map"),
  navQuestions: t("题库合集", "Question bank"),
  navChallenge: t("布局挑战", "Challenge"),
  navAbout: t("学习说明", "About"),
  continue: t("继续学习", "Continue"),
  start: t("开始学习", "Start learning"),
  startHere: t("从第 1 章开始", "Start from chapter 1"),
  map: t("查看全部章节", "View all chapters"),
  hero: t("学会布局，不靠背属性。", "Learn layout without memorizing properties."),
  heroSub: t("从页面结构到响应式项目。每一章都配有学习目标、四个知识块、属性速查、常见误区和可运行的示例。", "From page structure to a responsive project. Every chapter ships with objectives, four theory blocks, a property reference, common mistakes and a runnable demo."),
  path: t("四个阶段，一条学习路径", "Four stages, one learning path"),
  stages: t("按阶段浏览章节", "Browse chapters by stage"),
  chapters: t("课程章节", "Course chapters"),
  chapter: t("章", "Ch"),
  lessonsCount: t("个章节", "chapters"),
  pointsCount: t("个知识点", "key points"),
  overview: t("本章概览", "Chapter overview"),
  objectives: t("学完你能做到", "What you will be able to do"),
  keyPoints: t("属性速查", "Property reference"),
  keyPointsHint: t("这些是本章最常用的属性，先记住用途，再记写法。", "These are the properties this chapter uses most. Learn the purpose before the syntax."),
  mistakes: t("常见误区", "Common mistakes"),
  practice: t("动手练习", "Practice steps"),
  theory: t("理论知识", "Theory"),
  code: t("关键代码", "Key code"),
  demo: t("交互演示", "Interactive demo"),
  demoHint: t("调整下面的控件，预览会立即变化，同时生成对应的 CSS。", "Move the controls below: the preview updates instantly and the matching CSS is generated."),
  tryIt: t("练一下", "Try it"),
  reset: t("重置", "Reset"),
  copy: t("复制 CSS", "Copy CSS"),
  copied: t("已复制", "Copied"),
  complete: t("标记完成", "Mark complete"),
  completed: t("已完成", "Completed"),
  back: t("返回课程地图", "Back to course map"),
  prev: t("上一章", "Previous"),
  next: t("下一章", "Next"),
  inThisChapter: t("全部章节", "All chapters"),
  progress: t("学习进度", "Progress"),
  goalLabel: t("本章产出", "Chapter outcome"),
  durationLabel: t("预计用时", "Estimated time"),
  openChapter: t("进入章节", "Open chapter"),
  notFound: t("没有找到这个章节", "This chapter was not found"),
  backToCourse: t("返回课程地图", "Back to course map"),
};
