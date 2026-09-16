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

export type TheoryBlock = {
  heading: Copy;
  body: Copy;
  /* 这一块实际在讲的属性：必须与本章 keyPoints 的 term 一致；方法型概念可以省略 */
  point?: string;
  /* 为什么这样（原理 / 浏览器行为） */
  why?: Copy;
  /* 3–6 行最小示例 */
  snippet?: string;
  /* 什么时候会踩坑 */
  pitfall?: Copy;
  /* 延伸阅读 */
  refs?: { label: string; href: string }[];
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
  theory: TheoryBlock[];
  keyPoints: KeyPoint[];
  mistakes: Copy[];
  practice: Copy[];
  /* 章末自检清单 */
  checklist?: Copy[];
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
        refs: [{ label: "MDN · <main>", href: "https://developer.mozilla.org/docs/Web/HTML/Element/main" }, { label: "MDN · <header>", href: "https://developer.mozilla.org/docs/Web/HTML/Element/header" }],
        body: t("HTML 负责说明“这块内容是什么”，CSS 负责决定“它长什么样、放在哪里”。浏览器先把 HTML 解析成一棵树，再根据 CSS 计算每个盒子的尺寸和位置。布局出问题时，先检查结构是否正确。", "HTML says what a piece of content is; CSS decides how it looks and where it sits. The browser parses HTML into a tree, then computes every box's size and position from CSS. When layout breaks, check the structure first."),
      },
      {
        heading: t("块级元素独占一行", "Block elements take a full row"),
        point: "display: block",
        why: t("块级盒子在垂直方向依次排列，并默认占满可用宽度。也正因为它占满宽度，margin-inline: auto 才能把一个定宽块推到中间。", "Block boxes stack vertically and fill the available width by default. Because they fill it, margin-inline: auto can push a fixed-width block into the middle."),
        snippet: ".card {\n  display: block;      /* 段落与容器的默认值 */\n  margin-inline: auto; /* 占满宽度才谈得上居中 */\n}",
        pitfall: t("把 <span> 当容器用，再用 <br> 强制换行。需要独占一行就直接用块级元素，或写 display: block。", "Using <span> as a container and forcing line breaks with <br>. If it needs its own line, use a block-level element or display: block."),
        refs: [{ label: "MDN · display", href: "https://developer.mozilla.org/docs/Web/CSS/display" }, { label: "MDN · 块级内容", href: "https://developer.mozilla.org/docs/Glossary/Block-level_content" }],
        body: t("div、p、h1、section 这类块级元素默认从上到下依次排列，每个都占满可用宽度，它们撑起页面的纵向结构。", "Block elements such as div, p, h1 and section stack from top to bottom and fill the available width. They form the vertical structure of a page."),
      },
      {
        heading: t("行内元素跟随文字", "Inline elements flow with text"),
        point: "display: inline",
        why: t("行内盒子只在行盒里排布：宽高会被忽略，垂直方向的 padding 也不会把相邻行推开。要精确控制尺寸，先升级成 inline-block。", "Inline boxes live inside line boxes: width and height are ignored, and vertical padding never pushes neighbouring lines apart. To control size precisely, upgrade to inline-block first."),
        snippet: ".badge {\n  display: inline-block; /* 可以设置宽高，仍跟随文字 */\n  padding: 2px 10px;\n}",
        pitfall: t("给 <a> 或 <span> 写了 width / height 却没生效——行内元素不接受宽高，这不是浏览器的 bug。", "Setting width or height on an <a> or <span> and seeing nothing happen: inline elements ignore both. That is not a browser bug."),
        refs: [{ label: "MDN · display", href: "https://developer.mozilla.org/docs/Web/CSS/display" }],
        body: t("span、a、strong 这类行内元素不会换行，宽度由内容决定，只占据文字需要的空间。想给行内元素设置宽高，需要先把它变成 inline-block 或 block。", "Inline elements like span, a and strong never break the line. Their width comes from their content. To give them width or height, first make them inline-block or block."),
      },
      {
        heading: t("文档流是最省力的默认布局", "Normal flow is the cheapest default"),
        point: "max-width",
        why: t("max-width 允许元素在窄容器里收缩，width 不允许。正文排版几乎总是 max-width 加百分比，而不是写死像素。", "max-width lets an element shrink inside a narrow container; width does not. Body text almost always means max-width plus a percentage, never a hard-coded pixel value."),
        snippet: ".article {\n  max-width: 720px;    /* 约 65–75 个字符宽 */\n  margin-inline: auto;\n}",
        pitfall: t("用 width: 720px 代替 max-width：手机宽度不足时需要横向滚动，右半边内容被裁掉。", "Using width: 720px instead of max-width: on a phone the page scrolls sideways and the right half is cut off."),
        refs: [{ label: "MDN · max-width", href: "https://developer.mozilla.org/docs/Web/CSS/max-width" }],
        body: t("在没有 flex、grid、定位的情况下，页面依然能正确排版，这就是文档流。大多数内容页面只需要限制宽度、留出间距，不必动用复杂的布局工具。", "Without flex, grid or positioning a page still lays out correctly. That is normal flow. Most content pages only need a width limit and some spacing, not heavyweight layout tools."),
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
        refs: [{ label: "MDN · padding", href: "https://developer.mozilla.org/docs/Web/CSS/padding" }],
        body: t("最里面是内容区 content，往外依次是内边距 padding、边框 border 和外边距 margin。padding 属于盒子自身，背景色会覆盖它；margin 在盒子之外，永远不属于自身尺寸。", "At the centre is the content area, then padding, border and finally margin. Padding belongs to the box and is covered by its background; margin sits outside the box and is never part of its own size."),
      },
      {
        heading: t("content-box 与 border-box", "content-box versus border-box"),
        point: "box-sizing: border-box",
        why: t("默认的 content-box 里，width 只描述内容区，padding 与 border 额外叠加；border-box 把两者算进声明宽度，于是 280px 永远是 280px。", "Under the default content-box, width covers only the content area and padding plus border stack on top. border-box folds both into the declared width, so 280px stays 280px."),
        snippet: "*, *::before, *::after {\n  box-sizing: border-box;\n}",
        pitfall: t("只在部分元素上设置 border-box，同一个项目里两种尺寸模型并存，一改 padding 行为就不一致。", "Setting border-box on only some elements: two sizing models coexist in one project, so changing padding behaves inconsistently."),
        refs: [{ label: "MDN · box-sizing", href: "https://developer.mozilla.org/docs/Web/CSS/box-sizing" }, { label: "web.dev · Box model", href: "https://web.dev/learn/css/box-model" }],
        body: t("默认的 content-box 会把 padding 和 border 加在声明宽度之外；设置 box-sizing: border-box 后，声明的 width 就包含 padding 与 border，尺寸更容易预测，也更少溢出。", "The default content-box adds padding and border on top of the declared width. With box-sizing: border-box the declared width already includes padding and border, so sizes are easier to predict and overflow is rarer."),
      },
      {
        heading: t("外边距会与相邻元素合并", "Margins collapse with neighbours"),
        point: "margin",
        why: t("上下相邻的块级元素，垂直 margin 会折叠成较大的那一个；父子之间没有边框或内边距时也会发生，于是子元素的上边距常常“跑”到父元素外面。", "Vertically adjacent block elements collapse their margins into the larger value. It also happens between a parent and child with no border or padding, so a child's top margin often escapes the parent."),
        snippet: ".list > * + * {\n  margin-top: 16px;  /* 只在相邻项之间产生间距 */\n}",
        pitfall: t("用 margin 精确拼出设计稿的间距，折叠之后总数不对；改用一个方向的 margin，或者直接用 gap。", "Building exact design spacing from margins and losing half of it to collapsing. Use a single-direction margin, or just use gap."),
        refs: [{ label: "MDN · margin", href: "https://developer.mozilla.org/docs/Web/CSS/margin" }, { label: "MDN · 外边距折叠", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing" }],
        body: t("两个上下相邻的块级元素，它们的垂直 margin 会折叠成较大的那一个，而不是相加。这不是 bug，而是规则；用 padding 或 flex/grid 的 gap 才能得到确定间距。", "For two block elements stacked vertically, their vertical margins collapse into the larger value instead of adding up. That is the rule, not a bug; use padding or a flex/grid gap when you need exact spacing."),
      },
      {
        heading: t("宽度溢出通常来自三件事", "Overflow usually comes from three things"),
        point: "max-width: 100%",
        why: t("图片、iframe、pre 的固有宽度常常大于容器，max-width: 100% 让它们在窄容器里收缩，而不是把整页撑宽。", "Images, iframes and pre blocks often carry an intrinsic width wider than their container. max-width: 100% lets them shrink instead of widening the whole page."),
        snippet: "img, svg, video {\n  max-width: 100%;\n  height: auto;   /* 保持原始比例 */\n}",
        pitfall: t("只写 max-width: 100% 忘了 height: auto，图片被压扁；flex 或 grid 的子项还需要 min-width: 0 才真正缩得下去。", "Adding max-width: 100% but forgetting height: auto, which squashes the image. Flex and grid children also need min-width: 0 before they truly shrink."),
        refs: [{ label: "MDN · max-width", href: "https://developer.mozilla.org/docs/Web/CSS/max-width" }, { label: "MDN · min-width", href: "https://developer.mozilla.org/docs/Web/CSS/min-width" }],
        body: t("固定宽度加内边距、子元素写死了更大的宽度、或者长串英文和图片不肯换行。先确认是哪一种，再决定用 border-box、min-width: 0 还是 max-width: 100%。", "A fixed width plus padding, a child with a larger hard-coded width, or long unbroken text and images that refuse to shrink. Identify which one applies before reaching for border-box, min-width: 0 or max-width: 100%."),
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
        refs: [{ label: "MDN · Flexbox 基本概念", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox" }, { label: "web.dev · Flexbox", href: "https://web.dev/learn/css/flexbox" }],
        body: t("给容器加上 display: flex，它的直接子元素就变成弹性项目，按一条轴线排列。它最擅长处理导航栏、工具栏、卡片行这类“一行或一列”的问题。", "Add display: flex to a container and its direct children become flex items arranged along a single axis. It shines for navigation bars, toolbars and card rows: problems that live in one row or one column."),
      },
      {
        heading: t("先找主轴，再选属性", "Find the main axis before picking properties"),
        point: "flex-direction",
        why: t("justify-content 只沿主轴工作，align-items 只沿交叉轴工作。flex-direction 一改，两者的作用方向跟着交换——这是初学 Flexbox 最容易混乱的地方。", "justify-content only works along the main axis and align-items only along the cross axis. Change flex-direction and their directions swap, which is the most confusing part of learning Flexbox."),
        snippet: `.hero {\n  display: flex;\n  flex-direction: column;\n  justify-content: center; /* 主轴＝垂直 */\n  align-items: center;     /* 交叉轴＝水平 */\n}`,
        pitfall: t("把 justify-content 当成“水平居中”。方向改成 column 之后，它控制的是垂直方向。", "Treating justify-content as horizontal centering. Once the direction is column it controls the vertical direction."),
        refs: [{ label: "MDN · flex-direction", href: "https://developer.mozilla.org/docs/Web/CSS/flex-direction" }],
        body: t("flex-direction 决定主轴方向，justify-content 沿主轴分配空间，align-items 沿交叉轴对齐。主轴不一定是水平的：改成 column 之后，justify-content 就控制垂直方向了。", "flex-direction defines the main axis. justify-content distributes space along it, while align-items aligns on the cross axis. The main axis is not always horizontal: switch to column and justify-content now controls the vertical direction."),
      },
      {
        heading: t("间距优先用 gap", "Prefer gap for spacing"),
        point: "gap",
        why: t("gap 只在项目之间产生间距：既不在容器首尾留下空白，也不会像 margin 那样折叠。间距由父容器统一管理，子元素不需要知道彼此的存在。", "gap only creates space between items: no leading or trailing gaps, and no margin collapsing. The parent owns the spacing and children do not need to know about each other."),
        snippet: `.list {\n  display: flex;\n  gap: 16px;\n}\n/* 不要用 .list > * + * { margin-left: 16px } */`,
        pitfall: t("用 margin-right 给每个项目加间距，最后一个项目也会带上一段多余空白，行尾对齐就歪了。", "Adding margin-right to every item leaves extra space on the last one, which throws off the right edge."),
        refs: [{ label: "MDN · gap", href: "https://developer.mozilla.org/docs/Web/CSS/gap" }],
        body: t("gap 只在项目之间产生间距，不会在容器首尾留下多余空白，因此比给每个子元素写 margin 更可预测，也避免了 margin 折叠。", "gap only creates space between items, never at the container's edges, so it is more predictable than margins on every child and immune to margin collapsing."),
      },
      {
        heading: t("伸缩与换行", "Growing and wrapping"),
        point: "flex: 1",
        why: t("flex 是 flex-grow / flex-shrink / flex-basis 的简写。flex: 1 等于 flex: 1 1 0%，项目从 0 开始平分剩余空间，而不是从自身内容宽度开始。", "flex is shorthand for flex-grow, flex-shrink and flex-basis. flex: 1 means flex: 1 1 0%, so items share the space starting from zero rather than from their content width."),
        snippet: `.split {\n  display: flex;\n  gap: 24px;\n}\n.split aside { flex: 0 0 240px; }\n.split main  { flex: 1; min-width: 0; }`,
        pitfall: t("给可压缩的子元素忘记 min-width: 0，内部的长文本或表格会把布局撑破。", "Forgetting min-width: 0 on a shrinkable child: long text or a table inside will blow up the layout."),
        refs: [{ label: "MDN · flex", href: "https://developer.mozilla.org/docs/Web/CSS/flex" }, { label: "web.dev · Flexbox", href: "https://web.dev/learn/css/flexbox" }],
        body: t("flex: 1 让项目平分剩余空间，flex-wrap: wrap 允许一行放不下时换行。注意被压缩的子元素需要 min-width: 0 才能让内部文字正确截断。", "flex: 1 lets items share the leftover space, and flex-wrap: wrap lets a row break when it overflows. Remember that a squeezed child needs min-width: 0 before its inner text can truncate correctly."),
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
        refs: [{ label: "MDN · position", href: "https://developer.mozilla.org/docs/Web/CSS/position" }],
        body: t("static 是默认值，元素跟随文档流。relative 仍占原位，但可以用 inset 偏移，并成为子元素的定位参照。absolute 脱离文档流，以最近的已定位祖先为参照。fixed 以视口为参照，sticky 则在滚动到阈值后粘住。", "static is the default and stays in flow. relative keeps its slot but can be offset with inset and becomes a reference for children. absolute leaves the flow and references the nearest positioned ancestor. fixed references the viewport, while sticky sticks once it reaches a threshold."),
      },
      {
        heading: t("父相子绝是最常用的组合", "Positioned parent, absolute child"),
        point: "position: absolute",
        why: t("absolute 元素脱离文档流，宽度默认按内容收缩，并向上寻找最近的已定位祖先；找不到时以初始包含块为参照，于是角标就飞到了页面角落。", "An absolute element leaves the flow, shrinks to fit its content by default and walks up to the nearest positioned ancestor. With none it references the initial containing block, which is why badges fly to the page corner."),
        snippet: ".panel { position: relative; }\n.badge {\n  position: absolute;\n  inset: 12px 12px auto auto;\n}",
        pitfall: t("忘了给父元素设 position: relative，或者父级是行内元素——行内盒子不能可靠地充当绝对定位的参照。", "Forgetting position: relative on the parent, or making that parent inline — an inline box cannot reliably act as the absolute reference."),
        refs: [{ label: "MDN · position", href: "https://developer.mozilla.org/docs/Web/CSS/position" }, { label: "MDN · inset", href: "https://developer.mozilla.org/docs/Web/CSS/inset" }],
        body: t("给父元素设置 position: relative，子元素用 position: absolute 加 inset，就能把角标、关闭按钮和遮罩精确地钉在父容器里，而不会跑到页面其他位置。", "Give the parent position: relative, then place the child with position: absolute and inset. Badges, close buttons and scrims then pin to the parent instead of flying off somewhere else on the page."),
      },
      {
        heading: t("吸顶比固定更安全", "Sticky is safer than fixed"),
        point: "position: sticky",
        why: t("sticky 在达到阈值前完全像 static，越过阈值后在容器范围内保持粘住；因为它仍属于原容器，所以既不会塌陷布局高度，也不会在容器结束后继续留在屏幕上。", "Before the threshold sticky behaves exactly like static; past it the element sticks within its container's bounds. Because it still belongs to that container, it neither collapses layout height nor stays on screen after the container ends."),
        snippet: ".toc {\n  position: sticky;\n  top: 24px;   /* 粘在视口顶部下方 24px */\n}",
        pitfall: t("祖先写了 overflow: hidden / auto，sticky 直接失效——滚动容器换了，粘附参照也跟着变。", "An ancestor with overflow: hidden or auto silently kills sticky: the scroll container changed, and the sticky reference changed with it."),
        refs: [{ label: "MDN · position: sticky", href: "https://developer.mozilla.org/docs/Web/CSS/position#sticky" }],
        body: t("position: sticky 配合 top: 0 能让元素在滚动到顶部时粘住，但它仍属于原有容器。相比 fixed 不会塌陷布局高度，也不会在父容器结束后还留在屏幕上。", "position: sticky with top: 0 sticks an element once it reaches the top, yet it still belongs to its container. Unlike fixed it does not collapse layout height or hang around after its parent ends."),
      },
      {
        heading: t("z-index 只在同一层叠上下文内比较", "z-index only compares inside one stacking context"),
        point: "z-index",
        why: t("z-index 只在同一个层叠上下文内比较。祖先一旦有 transform、filter、opacity 小于 1 或新的 z-index，就会生成新的上下文，子元素再大的数值也无法越过另一个上下文里的元素。", "z-index only compares inside one stacking context. An ancestor with transform, filter, opacity below 1 or its own z-index creates a fresh context, and inside it no value can rise above elements in a different context."),
        snippet: ".dialog { position: fixed; z-index: 100; }\n.toast  { position: fixed; z-index: 200; }",
        pitfall: t("不断加大 z-index 却没效果——问题出在上下文边界，而不是数值大小；先找到生成上下文的那个祖先。", "Inflating z-index with no effect: the problem is the context boundary, not the number. Find the ancestor that creates the context first."),
        refs: [{ label: "MDN · 层叠上下文", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_positioned_layout/Stacking_context" }, { label: "MDN · z-index", href: "https://developer.mozilla.org/docs/Web/CSS/z-index" }],
        body: t("只要祖先设置了 transform、filter、opacity 或新的 z-index，就会创建一个新的层叠上下文。此时子元素再大的 z-index 也无法越过另一个上下文里的元素。先理清上下文边界，再调数值。", "Whenever an ancestor sets transform, filter, opacity or a new z-index it creates a fresh stacking context. Inside it, no z-index can rise above elements in a different context. Map the context boundaries before tuning numbers."),
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
        refs: [{ label: "MDN · CSS Grid 布局", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_grid_layout" }, { label: "web.dev · Grid", href: "https://web.dev/learn/css/grid" }],
        body: t("Flexbox 沿一条轴线排列，Grid 则先把容器切成行列网格，再把子元素放进去。页面级骨架、仪表盘、画廊这类二维关系，用 Grid 描述最直接。", "Flexbox arranges along one axis; Grid first cuts the container into rows and columns, then places children into it. For page shells, dashboards and galleries, Grid describes the two-dimensional relationship most directly."),
      },
      {
        heading: t("轨道可以是固定的，也可以是弹性的", "Tracks can be fixed or flexible"),
        point: "grid-template-columns",
        why: t("fr 表示“剩余空间的一份”，所以轨道会随容器宽度按比例伸缩；minmax(160px, 1fr) 给轨道设下限，空间不足时先保住下限，再多也只会分到一份。", "fr means one share of the free space, so tracks scale with the container. minmax(160px, 1fr) sets a floor: when space runs short the floor wins, and extra space is still shared one-for-one."),
        snippet: ".grid {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}",
        pitfall: t("写 1fr 但子项内容不可收缩（表格、超长单词），轨道被撑宽导致横向溢出；给子项加 min-width: 0。", "Using 1fr with content that cannot shrink (tables, long words) so the track widens and overflows. Give the child min-width: 0."),
        refs: [{ label: "MDN · grid-template-columns", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-columns" }, { label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat" }],
        body: t("1fr 表示一份可用空间，repeat(3, 1fr) 是等分三列，minmax(160px, 1fr) 则保证轨道至少 160px 且能继续伸展。把自动填充交给浏览器，就不必为每个断点重写列数。", "1fr means one share of the free space; repeat(3, 1fr) makes three equal columns; minmax(160px, 1fr) keeps a track at least 160px wide while still allowing it to grow. Let the browser handle the filling and you no longer rewrite column counts per breakpoint."),
      },
      {
        heading: t("auto-fit 与 auto-fill 的区别", "auto-fit versus auto-fill"),
        point: "auto-fit",
        why: t("auto-fit 会先按 minmax 的下限尽量多铺列，再把没有内容的空轨道折叠掉，让现有项目平分整行宽度——列数交给浏览器，就不用为每个断点重写。", "auto-fit first lays out as many columns as the minmax floor allows, then collapses the empty tracks so existing items share the full row. The browser picks the column count, so you stop rewriting it per breakpoint."),
        snippet: ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 20px;\n}",
        pitfall: t("下限写成 320px 又想一行放三列：宽度不够时只会剩一列，看起来像“响应式失效”。", "A 320px floor while expecting three columns: when space runs out you get a single column, which looks like responsiveness broke."),
        refs: [{ label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat" }, { label: "MDN · minmax()", href: "https://developer.mozilla.org/docs/Web/CSS/minmax" }],
        body: t("两者都会自动铺列。auto-fill 会保留空轨道，auto-fit 则把空轨道收起来，让现有项目撑满整行。做卡片流时通常选 auto-fit。", "Both lay out columns automatically. auto-fill keeps empty tracks around, while auto-fit collapses them so the existing items fill the row. For card flows auto-fit is usually the choice."),
      },
      {
        heading: t("命名区域让结构一眼可读", "Named areas make structure readable"),
        point: "grid-template-areas",
        why: t("每个字符串是一行，每个词是一个单元格，同名相邻区域会自动合并成矩形；区域名让结构在 CSS 里可读，重排时只改这几行字符即可。", "Each string is a row and each word a cell; adjacent cells with the same name merge into one rectangle. The map makes structure readable in CSS, and a reflow means editing just those lines."),
        snippet: ".shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.side { grid-area: side; }\n.main { grid-area: main; }",
        pitfall: t("区域没有连成矩形，或同一行的词数不一致——浏览器会丢弃整段声明，布局直接退回单列。", "Areas that are not rectangular, or rows with different word counts: the browser drops the whole declaration and the layout falls back to a single column."),
        refs: [{ label: "MDN · grid-template-areas", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas" }, { label: "MDN · grid-area", href: "https://developer.mozilla.org/docs/Web/CSS/grid-area" }],
        body: t("用 grid-template-areas 画一张字符地图，再让子元素通过 grid-area 认领位置，整个页面的区域关系会像示意图一样直接写在 CSS 里。", "Draw a character map with grid-template-areas, then let each child claim a spot through grid-area. The whole page's region map then reads like a diagram right inside the CSS."),
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
        refs: [{ label: "MDN · 媒体查询", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries" }],
        body: t("默认样式写给最小的屏幕，只写必要的字号。间距和分栏；再用 @media (min-width: 768px) 逐步往里加内容。这样最先保证的是“能用”，而不是“桌面好看、手机崩掉”。", "Write the default styles for the smallest screen with only essential size, spacing and columns. Then add content back with @media (min-width: 768px). This guarantees usability first, instead of a desktop that looks great and a phone that breaks."),
      },
      {
        heading: t("流式尺寸减少断点数量", "Fluid sizing reduces breakpoints"),
        point: "clamp(min, ideal, max)",
        why: t("clamp 把上下限交给 min 与 max，中间值用 vw 之类的相对单位，于是尺寸在区间内连续变化，不必为每个断点再写一档。", "clamp hands the floor and ceiling to min and max and uses a relative unit such as vw in the middle, so the size changes continuously and needs no per-breakpoint step."),
        snippet: "h1 {\n  font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem);\n}",
        pitfall: t("中间项不含 vw（例如 clamp(16px, 1.2rem, 24px)），结果只是一个固定值，缩放完全没发生。", "A middle term with no vw, such as clamp(16px, 1.2rem, 24px), collapses to a constant: no scaling happens at all."),
        refs: [{ label: "MDN · clamp()", href: "https://developer.mozilla.org/docs/Web/CSS/clamp" }],
        body: t("clamp(1rem, 0.5rem + 2vw, 2rem) 让字号在有上下限的区间里跟随视口平滑变化，min() 与百分比配合能取代大量固定宽度，从而少写很多媒体查询。", "clamp(1rem, 0.5rem + 2vw, 2rem) lets a font size scale smoothly with the viewport between a floor and a ceiling. min() plus percentages replace a lot of fixed widths, which means far fewer media queries."),
      },
      {
        heading: t("断点应由内容决定", "Let content decide the breakpoints"),
        point: "@media (min-width: ...)",
        why: t("断点应记在“内容开始难受”的宽度上：行长超过约 75 个字符、卡片被压到低于下限、导航项开始换行。它由内容决定，与设备型号无关。", "A breakpoint belongs where the content starts to hurt: lines longer than about 75 characters, cards squeezed below their floor, navigation items wrapping. Content decides it, not device names."),
        snippet: "/* 在内容开始拥挤的宽度处断点，而不是照抄机型 */\n@media (min-width: 720px) {\n  .cards { grid-template-columns: 1fr 1fr; }\n}",
        pitfall: t("照抄一份设备宽度表，真实文案下卡片在半屏就挤成一团；断点需要跟着内容量调整。", "Copying a device-width table: with real copy the cards crowd together at half width. Breakpoints have to follow the content."),
        refs: [{ label: "MDN · 媒体查询", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_media_queries/Using_media_queries" }, { label: "web.dev · Responsive design", href: "https://web.dev/learn/design" }],
        body: t("打开开发者工具，慢慢拖动宽度，记录文字开始换行别扭、卡片开始拥挤的位置，把断点设在那里。按具体设备型号设断点，往往在真实内容下失效。", "Open dev tools, drag the width slowly, and note where text starts wrapping awkwardly or cards start crowding. Put the breakpoints there. Breakpoints tied to specific device models tend to fail with real content."),
      },
      {
        heading: t("组件用容器查询", "Use container queries for components"),
        point: "@container (min-width: ...)",
        why: t("容器查询的参照是组件所在容器的宽度，因此同一张卡片放进侧栏或主区域会自动切换紧凑或舒展的样式，与视口大小解耦——这才是组件化的响应式。", "Container queries reference the width of the component's own container, so the same card in a sidebar or a main region switches between compact and roomy on its own, decoupled from the viewport. That is what component-level responsiveness means."),
        snippet: ".card-host { container-type: inline-size; }\n\n@container (min-width: 420px) {\n  .card { grid-template-columns: 120px 1fr; }\n}",
        pitfall: t("忘了给祖先写 container-type，或者写成 size 而元素高度不确定——容器查询永远不会命中。", "Forgetting container-type on the ancestor, or using size on an element without a definite height: the query never matches."),
        refs: [{ label: "MDN · 容器查询", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_containment/Container_queries" }, { label: "MDN · container-type", href: "https://developer.mozilla.org/docs/Web/CSS/container-type" }],
        body: t("媒体查询看的是视口宽度，容器查询看的是组件自身所在容器的宽度。同一个卡片放进侧栏和主区域时，容器查询能让它分别呈现紧凑或舒展的样式。", "Media queries look at viewport width; container queries look at the width of the component's own container. The same card placed in a sidebar or a main region can render compact or roomy accordingly."),
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
        refs: [{ label: "MDN · CSS 布局", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_layout" }, { label: "web.dev · Layout", href: "https://web.dev/learn/css/layout" }],
        body: t("同一组元素沿一条线排列，用 Flexbox；区域之间需要在行和列两个方向上对齐，用 Grid；只是一篇长文档，普通文档流加宽度限制就够了。工具跟着关系走，而不是跟着习惯走。", "A group of items along one line calls for Flexbox. Regions that must align in both rows and columns call for Grid. A long document just needs normal flow plus a width limit. Let the tool follow the relationship, not your habits."),
      },
      {
        heading: t("Hero 是一个纵向堆叠的容器", "A hero is a vertical stack"),
        point: "flex-direction: column",
        why: t("首屏内容是纵向的语义顺序（标题 → 副标题 → 按钮），用 column 让 DOM 顺序与视觉顺序保持一致，键盘与读屏顺序才不会错乱。", "Hero content has a vertical semantic order (title, subtitle, call to action). Using column keeps the DOM order equal to the visual order, so keyboard and screen-reader order stay correct."),
        snippet: ".hero {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  align-items: flex-start;\n}",
        pitfall: t("为了让按钮居中而用 absolute 定位，屏幕变窄后按钮和文案重叠在一起。", "Absolutely positioning the button just to center it: once the screen narrows, the button and the copy overlap."),
        refs: [{ label: "MDN · flex-direction", href: "https://developer.mozilla.org/docs/Web/CSS/flex-direction" }],
        body: t("首页首屏通常包含标题、副标题和行动按钮。它们纵向排列，用一层 flex-direction: column 加 gap 即可，不需要把每个元素都绝对定位。", "A landing hero usually holds a title, a subtitle and a call to action. They stack vertically, so one flex-direction: column with a gap is enough. There is no need to absolutely position every element."),
      },
      {
        heading: t("卡片流交给 auto-fit", "Let auto-fit handle the card flow"),
        point: "repeat(auto-fit, ...)",
        why: t("auto-fit 加 minmax 让列数由可用宽度决定：宽屏四列、平板两列、手机一列，全程零媒体查询，卡片被删掉几个也不会露出空轨道。", "auto-fit with minmax lets the available width decide the column count: four columns when wide, two on a tablet, one on a phone, with no media query at all and no empty tracks when cards are removed."),
        snippet: ".work {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 24px;\n}",
        pitfall: t("下限设得太大（例如 320px），手机上只能显示一列，还可能出现横向滚动。", "A floor that is too large (320px, say) gives a single column on a phone and can even introduce sideways scrolling."),
        refs: [{ label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat" }, { label: "web.dev · Grid", href: "https://web.dev/learn/css/grid" }],
        body: t("repeat(auto-fit, minmax(220px, 1fr)) 让卡片在宽屏多列、窄屏单列，且无需任何媒体查询。这是响应式列表里最划算的一行代码。", "repeat(auto-fit, minmax(220px, 1fr)) gives cards many columns on wide screens and one on narrow screens with no media query at all. It is the best-value line of CSS in a responsive list."),
      },
      {
        heading: t("圣杯布局就是一张命名地图", "The holy grail is a named map"),
        point: "grid-template-areas",
        why: t("把页眉、侧栏、内容、页脚写进字符地图，结构关系一眼可读；断点里只需要重画这张地图，DOM 完全不动。", "Writing header, sidebar, content and footer into a character map makes the structure readable at a glance. At a breakpoint you redraw the map and leave the DOM untouched."),
        snippet: ".shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.side { grid-area: side; }\n.main { grid-area: main; }",
        pitfall: t("同一行的字符数不一致，或某个区域不成矩形——整条声明被忽略，布局悄悄退回单列。", "Rows with different word counts, or an area that is not rectangular: the declaration is ignored and the layout quietly falls back to one column."),
        refs: [{ label: "MDN · grid-template-areas", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-areas" }],
        body: t("页眉、侧栏、内容、页脚这四块，用 grid-template-areas 一行一行画出来，再把子元素用 grid-area 放进去，既直观又便于在断点处重排。", "Header, sidebar, content and footer: draw them line by line with grid-template-areas, then place each child with grid-area. It is both readable and easy to rearrange at breakpoints."),
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
        refs: [{ label: "MDN · <main>", href: "https://developer.mozilla.org/docs/Web/HTML/Element/main" }, { label: "MDN · CSS 布局", href: "https://developer.mozilla.org/docs/Web/CSS/CSS_layout" }],
        body: t("拿纸或在设计工具里，先用方块标出导航、主内容、侧栏、页脚，并注明哪一块会随屏幕变化。分区图清楚以后，代码结构几乎是照抄下来的。", "On paper or in a design tool, block out navigation, main content, sidebar and footer, then note which blocks change with screen size. Once the map is clear, the code structure is almost a transcription."),
      },
      {
        heading: t("每个区域各自选工具", "Pick a tool per region"),
        point: "grid-template-rows: auto 1fr auto",
        why: t("1fr 让中间那行吃掉剩余高度，页脚因此在内容不足时也停在屏幕底部；导航与页脚用 auto，高度随内容走。", "1fr lets the middle row absorb the leftover height, so the footer sits at the bottom of the screen even with little content. Navigation and footer use auto and follow their content."),
        snippet: ".project {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  gap: 24px;\n}",
        pitfall: t("把 height: 100vh 当成答案：手机地址栏收起时会露出空白或突然出现滚动，用 min-height 更稳。", "Reaching for height: 100vh: when the mobile address bar collapses you get a blank strip or sudden scrolling. min-height is the sturdier choice."),
        refs: [{ label: "MDN · grid-template-rows", href: "https://developer.mozilla.org/docs/Web/CSS/grid-template-rows" }, { label: "MDN · min-height", href: "https://developer.mozilla.org/docs/Web/CSS/min-height" }],
        body: t("页面外壳用 Grid 划分行，主内容与侧栏用 Grid 分列，导航栏内部用 Flexbox 对齐，其余文字走文档流。不要整页只用一种工具。", "Use Grid to divide the page shell into rows, Grid again to split content from the sidebar, Flexbox to align inside the navigation bar, and normal flow for the text. Do not use a single tool for the whole page."),
      },
      {
        heading: t("断点越少越好", "Fewer breakpoints is better"),
        point: "auto-fit + minmax",
        why: t("自动填充让列数跟着容器宽度走，把“需要几个断点”的决定交给浏览器；人工断点只留给真正需要重排的地方。", "Auto-fill follows the container width and hands the “how many breakpoints” decision to the browser, leaving manual breakpoints only where the layout truly must change."),
        snippet: ".projects {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 24px;\n}",
        pitfall: t("下限与容器宽度打架（三列 400px 的下限配 1000px 容器），列数会在拖动窗口时反复跳变。", "A floor that fights the container width (a 400px floor expecting three columns in 1000px) makes the column count flip back and forth while you drag the window."),
        refs: [{ label: "MDN · repeat()", href: "https://developer.mozilla.org/docs/Web/CSS/repeat" }, { label: "MDN · minmax()", href: "https://developer.mozilla.org/docs/Web/CSS/minmax" }],
        body: t("优先用 auto-fit、clamp 和百分比让布局自己适应，只在内容确实需要重新排列时才加媒体查询。每加一个断点，都要能说清它解决了什么。", "Prefer auto-fit, clamp and percentages so the layout adapts on its own, and add a media query only when content truly needs rearranging. For every breakpoint you add, you should be able to say what it fixes."),
      },
      {
        heading: t("按清单验收", "Verify against a checklist"),
        point: "max-width: 100%",
        why: t("图片、嵌入内容和长代码块是横向溢出的主要来源。限住它们的最大宽度，页面骨架才不会被内容撑破。", "Images, embedded content and long code blocks are the main sources of horizontal overflow. Capping their width is what keeps the shell from being blown apart by content."),
        snippet: "img, video, iframe, pre { max-width: 100%; }\nimg { height: auto; }",
        pitfall: t("给 img 只写 max-width 忘了 height: auto，图片比例被压变形；iframe 与 pre 还需要 overflow-x: auto。", "Adding max-width to img but forgetting height: auto, which distorts the image. iframes and pre also need overflow-x: auto."),
        refs: [{ label: "MDN · max-width", href: "https://developer.mozilla.org/docs/Web/CSS/max-width" }],
        body: t("完成后依次检查：最小宽度下无横向滚动、长文本能换行、焦点可见、图片不超过容器、刷新后结构仍正确。布局的可靠性来自这些细项，而不是视觉效果。", "When finished, check in order: no horizontal scroll at the smallest width, long text wraps, focus is visible, images never exceed their container, and the structure still holds after a refresh. Layout reliability comes from these details, not from visual flair."),
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
