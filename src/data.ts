export type Locale = "zh" | "en";
export type Copy = { zh: string; en: string };

export type Lesson = {
  id: string;
  level: Copy;
  title: Copy;
  summary: Copy;
  goal: Copy;
  theory: Copy[];
  mistake: Copy;
  html: string;
  css: string;
  controls: ("direction" | "justify" | "gap" | "columns" | "padding")[];
  challenge: Copy;
};

const t = (zh: string, en: string): Copy => ({ zh, en });

export const lessons: Lesson[] = [
  {
    id: "page-structure",
    level: t("入门", "Starter"),
    title: t("页面如何形成", "How a Page Takes Shape"),
    summary: t("认识页面骨架、语义结构和默认文档流。", "Meet the document skeleton, semantic structure and normal flow."),
    goal: t("搭建一篇结构清楚的文章页面", "Build a clearly structured article page"),
    theory: [
      t("浏览器先读取 HTML 结构，再根据 CSS 决定每个元素的尺寸和位置。", "The browser reads HTML first, then uses CSS to size and place each element."),
      t("没有特殊布局规则时，块级元素会按照文档顺序从上到下排列。", "Without special layout rules, block elements follow the document from top to bottom."),
    ],
    mistake: t("不要为了视觉效果随意选择标签，结构语义会影响可访问性。", "Do not choose tags only for appearance. Semantics affect accessibility."),
    html: `<main class="article">\n  <header>页面标题</header>\n  <article>正文内容</article>\n  <aside>相关链接</aside>\n</main>`,
    css: `.article {\n  max-width: 720px;\n  margin-inline: auto;\n  padding: 24px;\n}`,
    controls: ["padding"],
    challenge: t("让文章保持居中，并在小屏幕上留出安全边距。", "Keep the article centered with safe spacing on small screens."),
  },
  {
    id: "box-model",
    level: t("入门", "Starter"),
    title: t("盒模型与文档流", "Box Model and Flow"),
    summary: t("看懂 content、padding、border 与 margin 如何共同决定尺寸。", "See how content, padding, border and margin determine size."),
    goal: t("修复一张溢出的内容卡片", "Fix an overflowing content card"),
    theory: [
      t("每个元素都可以想成一个盒子。内容在最里面，依次向外是内边距、边框和外边距。", "Every element is a box. Content sits inside padding, border and margin."),
      t("使用 border-box 后，声明的宽度会包含内边距和边框，尺寸更容易预测。", "With border-box, the declared width includes padding and border, making size easier to predict."),
    ],
    mistake: t("margin 不属于盒子自身尺寸，且相邻的垂直 margin 可能发生折叠。", "Margin is outside the box, and adjacent vertical margins may collapse."),
    html: `<article class="card">\n  <h3>盒模型</h3>\n  <p>改变内边距，观察内容空间。</p>\n</article>`,
    css: `.card {\n  box-sizing: border-box;\n  width: 280px;\n  padding: 24px;\n  border: 2px solid currentColor;\n}`,
    controls: ["padding"],
    challenge: t("让 280px 宽的卡片增加内边距后仍不发生溢出。", "Keep a 280px card from overflowing after padding is added."),
  },
  {
    id: "flexbox",
    level: t("基础", "Foundation"),
    title: t("Flexbox 布局", "Flexbox Layout"),
    summary: t("控制一组元素的方向、对齐、间距与伸缩。", "Control direction, alignment, spacing and growth for a group of items."),
    goal: t("完成导航栏和自适应产品列表", "Build a navigation bar and flexible product list"),
    theory: [
      t("Flexbox 适合处理一维排列。主轴由 flex-direction 决定，不一定是水平方向。", "Flexbox handles one-dimensional layouts. The main axis comes from flex-direction and is not always horizontal."),
      t("justify-content 控制主轴，align-items 控制交叉轴。先判断轴，再选择属性。", "justify-content controls the main axis; align-items controls the cross axis. Identify the axes first."),
    ],
    mistake: t("justify-content 并不永远负责水平居中，方向改变后主轴也会改变。", "justify-content does not always mean horizontal alignment. The main axis changes with direction."),
    html: `<div class="flex-demo">\n  <div>01</div>\n  <div>02</div>\n  <div>03</div>\n</div>`,
    css: `.flex-demo {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  gap: 24px;\n}`,
    controls: ["direction", "justify", "gap"],
    challenge: t("让三个导航项水平居中，并保持 24px 间距。", "Center three navigation items with a 24px gap."),
  },
  {
    id: "positioning",
    level: t("基础", "Foundation"),
    title: t("定位与层叠", "Positioning and Stacking"),
    summary: t("理解定位上下文、吸顶元素与层叠顺序。", "Understand positioning contexts, sticky elements and stacking order."),
    goal: t("制作吸顶导航与可靠弹层", "Build sticky navigation and a reliable overlay"),
    theory: [t("绝对定位元素会寻找最近的已定位祖先作为参照。", "An absolutely positioned element uses the nearest positioned ancestor as its reference.")],
    mistake: t("盲目增大 z-index 不能解决不同层叠上下文之间的问题。", "A larger z-index cannot fix every issue across separate stacking contexts."),
    html: `<section class="stage">\n  <button class="badge">提示</button>\n</section>`,
    css: `.stage { position: relative; }\n.badge {\n  position: absolute;\n  inset: 16px 16px auto auto;\n}`,
    controls: ["padding"],
    challenge: t("让提示始终固定在容器右上角，而不是页面右上角。", "Pin the badge to its container, not to the page."),
  },
  {
    id: "grid",
    level: t("进阶", "Advanced"),
    title: t("CSS Grid 布局", "CSS Grid Layout"),
    summary: t("使用轨道、区域和自动布局处理二维页面。", "Use tracks, areas and auto-placement for two-dimensional pages."),
    goal: t("搭建可伸缩的控制台骨架", "Build a responsive dashboard shell"),
    theory: [
      t("Grid 同时控制行和列，适合二维页面骨架与对齐要求强的内容。", "Grid controls rows and columns together, ideal for page shells and strict alignment."),
      t("repeat、minmax 和 auto-fit 可以让网格根据空间自动改变列数。", "repeat, minmax and auto-fit let a grid adapt its column count to available space."),
    ],
    mistake: t("固定写死四列会在窄屏溢出，优先让轨道具备伸缩能力。", "Four fixed columns overflow on narrow screens. Prefer flexible tracks."),
    html: `<div class="grid-demo">\n  <div>01</div><div>02</div>\n  <div>03</div><div>04</div>\n</div>`,
    css: `.grid-demo {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 20px;\n}`,
    controls: ["columns", "gap"],
    challenge: t("让卡片自动换列，并保证每列至少 160px 宽。", "Make cards wrap automatically while keeping each column at least 160px wide."),
  },
  {
    id: "responsive",
    level: t("进阶", "Advanced"),
    title: t("响应式布局", "Responsive Layout"),
    summary: t("组合流式尺寸、媒体查询和容器查询。", "Combine fluid sizing, media queries and container queries."),
    goal: t("让同一页面适配三种屏幕", "Adapt one page to three screen sizes"),
    theory: [t("响应式设计不是缩小桌面页面，而是根据可用空间重新安排内容优先级。", "Responsive design is not a smaller desktop page. It rearranges priorities for the available space.")],
    mistake: t("只测试某几个设备宽度，会遗漏内容真正发生拥挤的位置。", "Testing only a few device widths misses where content actually starts to crowd."),
    html: `<section class="shell">\n  <main>主要内容</main>\n  <aside>辅助内容</aside>\n</section>`,
    css: `.shell { display: grid; gap: 24px; }\n@media (min-width: 768px) {\n  .shell { grid-template-columns: 2fr 1fr; }\n}`,
    controls: ["columns", "gap"],
    challenge: t("小屏单列显示，空间足够时变为 2:1 双列。", "Use one column on small screens and a 2:1 split when space allows."),
  },
  {
    id: "patterns",
    level: t("实战", "Practice"),
    title: t("常见页面模式", "Common Page Patterns"),
    summary: t("拆解 Hero、侧边栏、卡片流和内容页面。", "Break down heroes, sidebars, card flows and content pages."),
    goal: t("完成博客或作品集首页", "Build a blog or portfolio home page"),
    theory: [t("先判断内容关系，再选择 Flexbox、Grid 或普通文档流。", "Identify content relationships before choosing Flexbox, Grid or normal flow.")],
    mistake: t("不要先选一个流行布局，再把不适合的内容硬塞进去。", "Do not choose a trendy layout first and force unsuitable content into it."),
    html: `<main class="landing">\n  <section class="hero">作品介绍</section>\n  <section class="work">项目列表</section>\n</main>`,
    css: `.landing {\n  width: min(100% - 32px, 1200px);\n  margin-inline: auto;\n}`,
    controls: ["padding", "gap"],
    challenge: t("根据内容关系为作品集首页选择合适的布局方法。", "Choose suitable layout methods for a portfolio based on its content."),
  },
  {
    id: "final-challenge",
    level: t("实战", "Practice"),
    title: t("综合布局挑战", "Complete Layout Challenge"),
    summary: t("从目标图出发，拆结构、选方法并完成响应式还原。", "Start from a target, decompose it and build a responsive recreation."),
    goal: t("独立完成一个响应式页面", "Complete a responsive page independently"),
    theory: [t("先画内容分区，再识别一维和二维关系，最后处理断点。", "Map content regions first, identify one- and two-dimensional relationships, then add breakpoints.")],
    mistake: t("不要用大量绝对定位模拟正常布局，它会在内容和屏幕变化时失效。", "Do not simulate normal layout with absolute positioning. It breaks as content and screens change."),
    html: `<main class="project">\n  <nav>项目导航</nav>\n  <section>项目内容</section>\n  <footer>联系方式</footer>\n</main>`,
    css: `.project {\n  min-height: 100dvh;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}`,
    controls: ["columns", "gap", "padding"],
    challenge: t("完成包含导航、内容区和页脚的响应式作品页。", "Build a responsive project page with navigation, content and footer."),
  },
];

export const ui = {
  navCourse: t("课程地图", "Course map"),
  navChallenge: t("布局挑战", "Challenge"),
  navAbout: t("学习说明", "About"),
  continue: t("继续学习", "Continue"),
  start: t("开始学习", "Start learning"),
  map: t("查看课程地图", "View course map"),
  hero: t("学会布局，不靠背属性。", "Learn layout without memorizing properties."),
  heroSub: t("从盒模型到响应式页面，每个知识点都能运行。", "From the box model to responsive pages, every idea is runnable."),
  path: t("一条清楚的学习路径", "One clear learning path"),
  chapters: t("课程章节", "Course chapters"),
  theory: t("理论知识", "Theory"),
  code: t("关键代码", "Key code"),
  demo: t("交互演示", "Interactive demo"),
  practice: t("练一下", "Try it"),
  reset: t("重置", "Reset"),
  copy: t("复制 CSS", "Copy CSS"),
  copied: t("已复制", "Copied"),
  complete: t("标记完成", "Mark complete"),
  completed: t("已完成", "Completed"),
  back: t("返回课程地图", "Back to course map"),
};
