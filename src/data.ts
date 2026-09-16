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

export type Lesson = {
  id: string;
  order: number;
  stage: StageKey;
  title: Copy;
  summary: Copy;
  goal: Copy;
  duration: Copy;
  objectives: Copy[];
  theory: { heading: Copy; body: Copy }[];
  keyPoints: { term: string; desc: Copy }[];
  mistakes: Copy[];
  practice: Copy[];
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
        body: t("HTML 负责说明“这块内容是什么”，CSS 负责决定“它长什么样、放在哪里”。浏览器先把 HTML 解析成一棵树，再根据 CSS 计算每个盒子的尺寸和位置。布局出问题时，先检查结构是否正确。", "HTML says what a piece of content is; CSS decides how it looks and where it sits. The browser parses HTML into a tree, then computes every box's size and position from CSS. When layout breaks, check the structure first."),
      },
      {
        heading: t("块级元素独占一行", "Block elements take a full row"),
        body: t("div、p、h1、section 这类块级元素默认从上到下依次排列，每个都占满可用宽度，它们撑起页面的纵向结构。", "Block elements such as div, p, h1 and section stack from top to bottom and fill the available width. They form the vertical structure of a page."),
      },
      {
        heading: t("行内元素跟随文字", "Inline elements flow with text"),
        body: t("span、a、strong 这类行内元素不会换行，宽度由内容决定，只占据文字需要的空间。想给行内元素设置宽高，需要先把它变成 inline-block 或 block。", "Inline elements like span, a and strong never break the line. Their width comes from their content. To give them width or height, first make them inline-block or block."),
      },
      {
        heading: t("文档流是最省力的默认布局", "Normal flow is the cheapest default"),
        body: t("在没有 flex、grid、定位的情况下，页面依然能正确排版，这就是文档流。大多数内容页面只需要限制宽度、留出间距，不必动用复杂的布局工具。", "Without flex, grid or positioning a page still lays out correctly. That is normal flow. Most content pages only need a width limit and some spacing, not heavyweight layout tools."),
      },
    ],
    keyPoints: [
      { term: "<header> / <main> / <footer>", desc: t("划出页眉、主体与页脚三个区域。", "Mark the page header, main region and footer.") },
      { term: "<article> / <section>", desc: t("表示可独立内容块与主题分组。", "Represent standalone content and topical groups.") },
      { term: "display: block", desc: t("元素独占一行，可以设置宽高。", "The element takes a row and accepts width and height.") },
      { term: "display: inline", desc: t("元素跟随文字排列，宽高由内容决定。", "The element flows with text; size comes from content.") },
      { term: "max-width", desc: t("限制内容最大宽度，超出后自动换行。", "Cap the content width; text wraps beyond it.") },
      { term: "margin-inline: auto", desc: t("在可用空间里让定宽块级元素居中。", "Center a fixed-width block inside its available space.") },
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
        body: t("最里面是内容区 content，往外依次是内边距 padding、边框 border 和外边距 margin。padding 属于盒子自身，背景色会覆盖它；margin 在盒子之外，永远不属于自身尺寸。", "At the centre is the content area, then padding, border and finally margin. Padding belongs to the box and is covered by its background; margin sits outside the box and is never part of its own size."),
      },
      {
        heading: t("content-box 与 border-box", "content-box versus border-box"),
        body: t("默认的 content-box 会把 padding 和 border 加在声明宽度之外；设置 box-sizing: border-box 后，声明的 width 就包含 padding 与 border，尺寸更容易预测，也更少溢出。", "The default content-box adds padding and border on top of the declared width. With box-sizing: border-box the declared width already includes padding and border, so sizes are easier to predict and overflow is rarer."),
      },
      {
        heading: t("外边距会与相邻元素合并", "Margins collapse with neighbours"),
        body: t("两个上下相邻的块级元素，它们的垂直 margin 会折叠成较大的那一个，而不是相加。这不是 bug，而是规则；用 padding 或 flex/grid 的 gap 才能得到确定间距。", "For two block elements stacked vertically, their vertical margins collapse into the larger value instead of adding up. That is the rule, not a bug; use padding or a flex/grid gap when you need exact spacing."),
      },
      {
        heading: t("宽度溢出通常来自三件事", "Overflow usually comes from three things"),
        body: t("固定宽度加内边距、子元素写死了更大的宽度、或者长串英文和图片不肯换行。先确认是哪一种，再决定用 border-box、min-width: 0 还是 max-width: 100%。", "A fixed width plus padding, a child with a larger hard-coded width, or long unbroken text and images that refuse to shrink. Identify which one applies before reaching for border-box, min-width: 0 or max-width: 100%."),
      },
    ],
    keyPoints: [
      { term: "box-sizing: border-box", desc: t("让声明的宽高包含内边距与边框。", "Make the declared size include padding and border.") },
      { term: "width / height", desc: t("设置元素内容区的尺寸（受 box-sizing 影响）。", "Set the element's size, interpreted through box-sizing.") },
      { term: "padding", desc: t("内容与边框之间的内边距，属于盒子自身。", "Space between content and border, inside the box.") },
      { term: "border", desc: t("边框，会增加盒子的视觉与占位尺寸。", "A border that adds both visual weight and size.") },
      { term: "margin", desc: t("盒子外侧的间距，垂直方向可能折叠。", "Space outside the box; vertical margins may collapse.") },
      { term: "max-width: 100%", desc: t("让元素在窄容器里自动收缩，避免溢出。", "Let an element shrink inside a narrow container.") },
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
        body: t("给容器加上 display: flex，它的直接子元素就变成弹性项目，按一条轴线排列。它最擅长处理导航栏、工具栏、卡片行这类“一行或一列”的问题。", "Add display: flex to a container and its direct children become flex items arranged along a single axis. It shines for navigation bars, toolbars and card rows: problems that live in one row or one column."),
      },
      {
        heading: t("先找主轴，再选属性", "Find the main axis before picking properties"),
        body: t("flex-direction 决定主轴方向，justify-content 沿主轴分配空间，align-items 沿交叉轴对齐。主轴不一定是水平的：改成 column 之后，justify-content 就控制垂直方向了。", "flex-direction defines the main axis. justify-content distributes space along it, while align-items aligns on the cross axis. The main axis is not always horizontal: switch to column and justify-content now controls the vertical direction."),
      },
      {
        heading: t("间距优先用 gap", "Prefer gap for spacing"),
        body: t("gap 只在项目之间产生间距，不会在容器首尾留下多余空白，因此比给每个子元素写 margin 更可预测，也避免了 margin 折叠。", "gap only creates space between items, never at the container's edges, so it is more predictable than margins on every child and immune to margin collapsing."),
      },
      {
        heading: t("伸缩与换行", "Growing and wrapping"),
        body: t("flex: 1 让项目平分剩余空间，flex-wrap: wrap 允许一行放不下时换行。注意被压缩的子元素需要 min-width: 0 才能让内部文字正确截断。", "flex: 1 lets items share the leftover space, and flex-wrap: wrap lets a row break when it overflows. Remember that a squeezed child needs min-width: 0 before its inner text can truncate correctly."),
      },
    ],
    keyPoints: [
      { term: "display: flex", desc: t("把容器变成弹性容器，子元素成为项目。", "Turn the container into a flex container; children become items.") },
      { term: "flex-direction", desc: t("设定主轴方向：row、column 及其反向。", "Set the main axis: row, column and their reverses.") },
      { term: "justify-content", desc: t("沿主轴分配空间，如 center、space-between。", "Distribute space along the main axis, e.g. center or space-between.") },
      { term: "align-items", desc: t("沿交叉轴对齐，如 center、stretch。", "Align on the cross axis, e.g. center or stretch.") },
      { term: "gap", desc: t("项目之间的固定间距，不产生边缘空白。", "A fixed gap between items with no edge space.") },
      { term: "flex: 1", desc: t("让项目平分剩余空间并保持等高。", "Let items share leftover space and stretch to equal height.") },
      { term: "flex-wrap: wrap", desc: t("空间不足时允许换行。", "Allow wrapping when space runs out.") },
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
    challenge: t("让导航项水平居中，并保持 24px 的固定间距。", "Center the navigation items horizontally while keeping a fixed 24px gap."),
  },
  {
    id: "positioning",
    order: 4,
    stage: "foundation",
    title: t("定位与层叠", "Positioning and Stacking"),
    summary: t("理解定位上下文、吸顶元素与 z-index 的层叠顺序。", "Understand positioning contexts, sticky elements and z-index stacking order."),
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
        body: t("static 是默认值，元素跟随文档流。relative 仍占原位，但可以用 inset 偏移，并成为子元素的定位参照。absolute 脱离文档流，以最近的已定位祖先为参照。fixed 以视口为参照，sticky 则在滚动到阈值后粘住。", "static is the default and stays in flow. relative keeps its slot but can be offset with inset and becomes a reference for children. absolute leaves the flow and references the nearest positioned ancestor. fixed references the viewport, while sticky sticks once it reaches a threshold."),
      },
      {
        heading: t("父相子绝是最常用的组合", "Positioned parent, absolute child"),
        body: t("给父元素设置 position: relative，子元素用 position: absolute 加 inset，就能把角标、关闭按钮和遮罩精确地钉在父容器里，而不会跑到页面其他位置。", "Give the parent position: relative, then place the child with position: absolute and inset. Badges, close buttons and scrims then pin to the parent instead of flying off somewhere else on the page."),
      },
      {
        heading: t("吸顶比固定更安全", "Sticky is safer than fixed"),
        body: t("position: sticky 配合 top: 0 能让元素在滚动到顶部时粘住，但它仍属于原有容器。相比 fixed 不会塌陷布局高度，也不会在父容器结束后还留在屏幕上。", "position: sticky with top: 0 sticks an element once it reaches the top, yet it still belongs to its container. Unlike fixed it does not collapse layout height or hang around after its parent ends."),
      },
      {
        heading: t("z-index 只在同一层叠上下文内比较", "z-index only compares inside one stacking context"),
        body: t("只要祖先设置了 transform、filter、opacity 或新的 z-index，就会创建一个新的层叠上下文。此时子元素再大的 z-index 也无法越过另一个上下文里的元素。先理清上下文边界，再调数值。", "Whenever an ancestor sets transform, filter, opacity or a new z-index it creates a fresh stacking context. Inside it, no z-index can rise above elements in a different context. Map the context boundaries before tuning numbers."),
      },
    ],
    keyPoints: [
      { term: "position: relative", desc: t("保留原位，可偏移，并作为绝对定位参照。", "Keep the slot, allow offsets and act as an absolute reference.") },
      { term: "position: absolute", desc: t("脱离文档流，按最近的已定位祖先定位。", "Leave the flow and anchor to the nearest positioned ancestor.") },
      { term: "position: fixed", desc: t("相对视口固定，滚动时位置不变。", "Pin to the viewport so it stays put while scrolling.") },
      { term: "position: sticky", desc: t("滚动到阈值后粘住，仍保留在容器内。", "Stick after a scroll threshold while staying in its container.") },
      { term: "inset", desc: t("top / right / bottom / left 的简写。", "A shorthand for top, right, bottom and left.") },
      { term: "z-index", desc: t("在同一层叠上下文内决定前后顺序。", "Decide order inside a single stacking context.") },
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
        body: t("Flexbox 沿一条轴线排列，Grid 则先把容器切成行列网格，再把子元素放进去。页面级骨架、仪表盘、画廊这类二维关系，用 Grid 描述最直接。", "Flexbox arranges along one axis; Grid first cuts the container into rows and columns, then places children into it. For page shells, dashboards and galleries, Grid describes the two-dimensional relationship most directly."),
      },
      {
        heading: t("轨道可以是固定的，也可以是弹性的", "Tracks can be fixed or flexible"),
        body: t("1fr 表示一份可用空间，repeat(3, 1fr) 是等分三列，minmax(160px, 1fr) 则保证轨道至少 160px 且能继续伸展。把自动填充交给浏览器，就不必为每个断点重写列数。", "1fr means one share of the free space; repeat(3, 1fr) makes three equal columns; minmax(160px, 1fr) keeps a track at least 160px wide while still allowing it to grow. Let the browser handle the filling and you no longer rewrite column counts per breakpoint."),
      },
      {
        heading: t("auto-fit 与 auto-fill 的区别", "auto-fit versus auto-fill"),
        body: t("两者都会自动铺列。auto-fill 会保留空轨道，auto-fit 则把空轨道收起来，让现有项目撑满整行。做卡片流时通常选 auto-fit。", "Both lay out columns automatically. auto-fill keeps empty tracks around, while auto-fit collapses them so the existing items fill the row. For card flows auto-fit is usually the choice."),
      },
      {
        heading: t("命名区域让结构一眼可读", "Named areas make structure readable"),
        body: t("用 grid-template-areas 画一张字符地图，再让子元素通过 grid-area 认领位置，整个页面的区域关系会像示意图一样直接写在 CSS 里。", "Draw a character map with grid-template-areas, then let each child claim a spot through grid-area. The whole page's region map then reads like a diagram right inside the CSS."),
      },
    ],
    keyPoints: [
      { term: "display: grid", desc: t("把容器变成网格容器。", "Turn the container into a grid container.") },
      { term: "grid-template-columns", desc: t("定义列轨道与宽度。", "Define column tracks and their widths.") },
      { term: "repeat()", desc: t("重复轨道定义，减少重复书写。", "Repeat a track definition to avoid repetition.") },
      { term: "minmax(min, max)", desc: t("给轨道设定最小与最大尺寸。", "Give a track a minimum and a maximum size.") },
      { term: "auto-fit", desc: t("自动铺列并收起空轨道。", "Fill columns automatically and collapse empty tracks.") },
      { term: "gap", desc: t("同时设置行列之间的间距。", "Set row and column gutters at once.") },
      { term: "grid-template-areas", desc: t("用字符地图命名页面区域。", "Name page regions with a character map.") },
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
        body: t("默认样式写给最小的屏幕，只写必要的字号。间距和分栏；再用 @media (min-width: 768px) 逐步往里加内容。这样最先保证的是“能用”，而不是“桌面好看、手机崩掉”。", "Write the default styles for the smallest screen with only essential size, spacing and columns. Then add content back with @media (min-width: 768px). This guarantees usability first, instead of a desktop that looks great and a phone that breaks."),
      },
      {
        heading: t("流式尺寸减少断点数量", "Fluid sizing reduces breakpoints"),
        body: t("clamp(1rem, 0.5rem + 2vw, 2rem) 让字号在有上下限的区间里跟随视口平滑变化，min() 与百分比配合能取代大量固定宽度，从而少写很多媒体查询。", "clamp(1rem, 0.5rem + 2vw, 2rem) lets a font size scale smoothly with the viewport between a floor and a ceiling. min() plus percentages replace a lot of fixed widths, which means far fewer media queries."),
      },
      {
        heading: t("断点应由内容决定", "Let content decide the breakpoints"),
        body: t("打开开发者工具，慢慢拖动宽度，记录文字开始换行别扭、卡片开始拥挤的位置，把断点设在那里。按具体设备型号设断点，往往在真实内容下失效。", "Open dev tools, drag the width slowly, and note where text starts wrapping awkwardly or cards start crowding. Put the breakpoints there. Breakpoints tied to specific device models tend to fail with real content."),
      },
      {
        heading: t("组件用容器查询", "Use container queries for components"),
        body: t("媒体查询看的是视口宽度，容器查询看的是组件自身所在容器的宽度。同一个卡片放进侧栏和主区域时，容器查询能让它分别呈现紧凑或舒展的样式。", "Media queries look at viewport width; container queries look at the width of the component's own container. The same card placed in a sidebar or a main region can render compact or roomy accordingly."),
      },
    ],
    keyPoints: [
      { term: "@media (min-width: ...)", desc: t("达到该宽度及以上时应用样式。", "Apply styles at that width and above.") },
      { term: "clamp(min, ideal, max)", desc: t("在上下限内平滑变化的流式尺寸。", "A fluid size that scales within a floor and ceiling.") },
      { term: "min() / max()", desc: t("在两个值之间取更小或更大的那个。", "Take the smaller or larger of two values.") },
      { term: "100% / fr", desc: t("相对单位的宽度，避免硬编码像素。", "Relative widths that avoid hard-coded pixels.") },
      { term: "container-type: inline-size", desc: t("把元素变成可被容器查询的容器。", "Turn an element into a query container.") },
      { term: "@container (min-width: ...)", desc: t("按容器宽度而不是视口宽度生效。", "Respond to container width instead of viewport width.") },
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
        body: t("同一组元素沿一条线排列，用 Flexbox；区域之间需要在行和列两个方向上对齐，用 Grid；只是一篇长文档，普通文档流加宽度限制就够了。工具跟着关系走，而不是跟着习惯走。", "A group of items along one line calls for Flexbox. Regions that must align in both rows and columns call for Grid. A long document just needs normal flow plus a width limit. Let the tool follow the relationship, not your habits."),
      },
      {
        heading: t("Hero 是一个纵向堆叠的容器", "A hero is a vertical stack"),
        body: t("首页首屏通常包含标题、副标题和行动按钮。它们纵向排列，用一层 flex-direction: column 加 gap 即可，不需要把每个元素都绝对定位。", "A landing hero usually holds a title, a subtitle and a call to action. They stack vertically, so one flex-direction: column with a gap is enough. There is no need to absolutely position every element."),
      },
      {
        heading: t("卡片流交给 auto-fit", "Let auto-fit handle the card flow"),
        body: t("repeat(auto-fit, minmax(220px, 1fr)) 让卡片在宽屏多列、窄屏单列，且无需任何媒体查询。这是响应式列表里最划算的一行代码。", "repeat(auto-fit, minmax(220px, 1fr)) gives cards many columns on wide screens and one on narrow screens with no media query at all. It is the best-value line of CSS in a responsive list."),
      },
      {
        heading: t("圣杯布局就是一张命名地图", "The holy grail is a named map"),
        body: t("页眉、侧栏、内容、页脚这四块，用 grid-template-areas 一行一行画出来，再把子元素用 grid-area 放进去，既直观又便于在断点处重排。", "Header, sidebar, content and footer: draw them line by line with grid-template-areas, then place each child with grid-area. It is both readable and easy to rearrange at breakpoints."),
      },
    ],
    keyPoints: [
      { term: "flex-direction: column", desc: t("垂直堆叠首屏内容。", "Stack hero content vertically.") },
      { term: "repeat(auto-fit, ...)", desc: t("自动响应式卡片流。", "An automatic responsive card flow.") },
      { term: "grid-template-areas", desc: t("描述页面的区域地图。", "Describe the page's region map.") },
      { term: "grid-area", desc: t("让子元素认领一个命名区域。", "Let a child claim a named area.") },
      { term: "min(100% - 32px, 1200px)", desc: t("同时限制最大宽度与安全边距。", "Limit max width and keep a safe margin at once.") },
      { term: "position: sticky", desc: t("让侧栏或目录在滚动时保持可见。", "Keep a sidebar or table of contents visible while scrolling.") },
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
        body: t("拿纸或在设计工具里，先用方块标出导航、主内容、侧栏、页脚，并注明哪一块会随屏幕变化。分区图清楚以后，代码结构几乎是照抄下来的。", "On paper or in a design tool, block out navigation, main content, sidebar and footer, then note which blocks change with screen size. Once the map is clear, the code structure is almost a transcription."),
      },
      {
        heading: t("每个区域各自选工具", "Pick a tool per region"),
        body: t("页面外壳用 Grid 划分行，主内容与侧栏用 Grid 分列，导航栏内部用 Flexbox 对齐，其余文字走文档流。不要整页只用一种工具。", "Use Grid to divide the page shell into rows, Grid again to split content from the sidebar, Flexbox to align inside the navigation bar, and normal flow for the text. Do not use a single tool for the whole page."),
      },
      {
        heading: t("断点越少越好", "Fewer breakpoints is better"),
        body: t("优先用 auto-fit、clamp 和百分比让布局自己适应，只在内容确实需要重新排列时才加媒体查询。每加一个断点，都要能说清它解决了什么。", "Prefer auto-fit, clamp and percentages so the layout adapts on its own, and add a media query only when content truly needs rearranging. For every breakpoint you add, you should be able to say what it fixes."),
      },
      {
        heading: t("按清单验收", "Verify against a checklist"),
        body: t("完成后依次检查：最小宽度下无横向滚动、长文本能换行、焦点可见、图片不超过容器、刷新后结构仍正确。布局的可靠性来自这些细项，而不是视觉效果。", "When finished, check in order: no horizontal scroll at the smallest width, long text wraps, focus is visible, images never exceed their container, and the structure still holds after a refresh. Layout reliability comes from these details, not from visual flair."),
      },
    ],
    keyPoints: [
      { term: "grid-template-rows: auto 1fr auto", desc: t("让导航与页脚固定、内容区撑满。", "Keep navigation and footer fixed while content fills the middle.") },
      { term: "min-height: 100dvh", desc: t("让页面至少铺满一屏高度。", "Let the page fill at least one viewport height.") },
      { term: "min(100% - 32px, 1160px)", desc: t("统一容器宽度与安全边距。", "One shared container width with a safe margin.") },
      { term: "auto-fit + minmax", desc: t("无需断点的响应式网格。", "A responsive grid without breakpoints.") },
      { term: "min-width: 0", desc: t("防止网格或弹性子项被内容撑破。", "Stop grid or flex children from being blown up by content.") },
      { term: "max-width: 100%", desc: t("让图片与媒体元素随容器收缩。", "Let images and media shrink with the container.") },
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
    html: `<main class="project">\n  <nav>项目导航</nav>\n  <section>项目内容</section>\n  <footer>联系方式</footer>\n</main>`,
    css: `.project {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n  gap: 24px;\n}`,
    demo: "project",
    controls: ["columns", "gap", "padding"],
    challenge: t("完成一个包含导航、内容区和页脚的响应式作品页，并保证三种屏幕下都可用。", "Build a responsive project page with navigation, content and footer that works at all three widths."),
  },
];

export const ui = {
  navCourse: t("课程地图", "Course map"),
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
