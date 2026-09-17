/* 专题页数据：面向「一个概念往死里挖」的深水区，与八章课程互补。
   结构复用课程页的组件（图解 / 代码块 / 表格 / 清单 / 文献）。 */
import type { Copy, RefLink } from "./data";

export type TopicSection = {
  id: string;
  heading: Copy;
  body: Copy[];
  list?: Copy[];
  figure?: string;
  code?: { label: string; text: string };
  table?: { head: Copy[]; rows: Copy[][] };
};

export type Topic = {
  id: string;
  eyebrow: string;
  title: Copy;
  summary: Copy;
  minutes: Copy;
  sections: TopicSection[];
  checklist?: Copy[];
  bibliography?: RefLink[];
};

const SPEC = (p: string) => `https://www.w3.org/TR/CSS22/${p}`;
const DRAFT = (n: string) => `https://drafts.csswg.org/${n}`;

export const topics: Topic[] = [
  {
    id: "formatting-contexts",
    eyebrow: "DEEP DIVE 01",
    title: { zh: "深入格式化上下文与包含块", en: "Formatting contexts and containing blocks" },
    summary: {
      zh: "布局里最难解释的两类问题——位置不对、吸顶失效——都能归到这两条规则上。这一篇把规范的原文、四类上下文的对照、以及一个真实踩过的坑串成一条排查链。",
      en: "The two families of layout bug that resist explanation — wrong position and sticky that fails — both trace back to these rules. This deep dive strings the specification, a comparison of the four contexts and a bug we actually hit into one debugging chain.",
    },
    minutes: { zh: "约 25 分钟", en: "25 min" },
    sections: [
      {
        id: "what",
        heading: { zh: "格式化上下文：一套排版法则的作用域", en: "A formatting context is the scope of one layout rule set" },
        body: [
          {
            zh: "规范把布局拆成若干“格式化上下文”：块级盒子在块格式化上下文（BFC）里垂直堆叠、行内内容在行内格式化上下文（IFC）里沿线排列，弹性与网格又各自带来 FFC 与 GFC。上下文之间互不干扰——这正是“同一个页面里不同区域可以各自用不同工具”的理论依据。",
            en: "The spec splits layout into formatting contexts: block boxes stack vertically in a block formatting context, inline content runs along lines in an inline formatting context, and flex and grid each bring their own. Contexts do not interfere with one another, which is the theoretical basis for different regions of one page using different tools.",
          },
          {
            zh: "上下文最实用的两个副作用：其一，它决定外边距折叠是否发生（BFC 内部才折叠）；其二，它决定谁是 sticky 的参照（最近的滚动容器）。日常遇到的“加了 display: flex 之后间距变了”“吸顶突然失效”，都落在这两条上。",
            en: "Two consequences matter most in practice: a context decides whether margins collapse (only inside a BFC do they), and it decides what sticky references (the nearest scroll container). “Spacing changed after I added display: flex” and “sticky suddenly stopped working” both land here.",
          },
        ],
        table: {
          head: [
            { zh: "上下文", en: "Context" },
            { zh: "由什么建立", en: "Created by" },
            { zh: "内部规则", en: "Internal rules" },
          ],
          rows: [
            [
              { zh: "块格式化上下文 BFC", en: "Block (BFC)" },
              { zh: "块级盒、overflow 非 visible、float、display: flow-root", en: "Block boxes, overflow other than visible, floats, display: flow-root" },
              { zh: "垂直堆叠、宽度撑满、外边距折叠", en: "Vertical stacking, full width, collapsing margins" },
            ],
            [
              { zh: "行内格式化上下文 IFC", en: "Inline (IFC)" },
              { zh: "块容器里的行内内容", en: "Inline content inside a block container" },
              { zh: "沿行盒排列、行高决定纵向尺寸", en: "Runs along line boxes; line height sets vertical size" },
            ],
            [
              { zh: "弹性格式化上下文 FFC", en: "Flex (FFC)" },
              { zh: "display: flex / inline-flex", en: "display: flex or inline-flex" },
              { zh: "单一主轴分配空间，项目可伸缩", en: "One main axis distributes space, items flex" },
            ],
            [
              { zh: "网格格式化上下文 GFC", en: "Grid (GFC)" },
              { zh: "display: grid / inline-grid", en: "display: grid or inline-grid" },
              { zh: "行列轨道一次算清，项目自动放置", en: "Tracks resolve up front, items auto-place" },
            ],
          ],
        },
      },
      {
        id: "containing-block",
        heading: { zh: "包含块：尺寸与定位的参照物", en: "The containing block is what sizes and offsets measure against" },
        body: [
          {
            zh: "百分比宽度、绝对定位与固定定位都需要一个参照物，规范把它叫作包含块：普通流元素以最近块级祖先的内容盒为基准，绝对定位元素以最近“已定位”祖先的内边距盒为基准，固定定位元素以视口为基准。找不到已定位祖先时，绝对定位元素会上溯到初始包含块，通常就是整页。",
            en: "Percentage widths and absolute or fixed offsets all need a reference, which the spec calls the containing block: normal flow uses the nearest block ancestor's content box, absolute uses the nearest positioned ancestor's padding box, and fixed uses the viewport. Without a positioned ancestor an absolute element walks up to the initial containing block, usually the whole page.",
          },
        ],
        list: [
          { zh: "角标跑到页面角落 → 沿祖先链找 position: relative 缺失的那一层。", en: "A badge in the page corner: walk up looking for the missing position: relative." },
          { zh: "弹层被裁切 → 检查祖先里有没有 overflow: hidden 造出的裁剪盒。", en: "An overlay gets clipped: look for an overflow: hidden ancestor." },
          { zh: "百分比高度失效 → 父级没有确定高度时，百分比无从计算。", en: "A percentage height does nothing: without a definite parent height there is nothing to resolve against." },
        ],
      },
      {
        id: "case",
        heading: { zh: "真实案例：裁圆角顺手废掉了吸顶表头", en: "A real case: clipping a corner killed the sticky header" },
        body: [
          {
            zh: "这个站点自身就踩过：属性速查表的圆角需要裁切，于是给 <table> 加了 overflow: hidden。表格因此成为它自己的滚动容器，而 sticky 的偏移改为相对这个滚动口解析——表头被整整下推 64px，表格顶部出现一条空白，表头文字压在第一行数据上。",
            en: "This very site hit it: the property table needed rounded corners, so the table got overflow: hidden. That turned the table into its own scroll container, sticky started resolving against that scrollport, and the header was pushed down a full 64px — a blank band above it and the header sitting on the first row.",
          },
        ],
        figure: "sticky-scrollport",
        code: {
          label: "修复前 / 修复后",
          text: `/* ❌ 表格成为滚动容器，sticky 参照被换掉 */
.rates {
  border-radius: 10px;
  overflow: hidden;      /* 为了裁圆角 */
}
.rates thead th { position: sticky; top: 64px; }

/* ✅ 圆角交给单元格，表格不再是滚动容器 */
.rates { border-radius: 10px; border-collapse: separate; }
.rates thead th:first-child { border-top-left-radius: 9px; }
.rates thead th:last-child  { border-top-right-radius: 9px; }`,
        },
      },
      {
        id: "debug",
        heading: { zh: "排查顺序：五步定位", en: "A five-step debugging order" },
        body: [
          {
            zh: "把上面两条规则变成固定动作，绝大多数“位置/吸顶/裁切”问题会在一分钟内收敛。顺序很重要——先找参照物，再谈数值。",
            en: "Turning those two rules into a fixed routine makes most positioning, sticky and clipping problems converge within a minute. The order matters: find the reference first, argue about numbers second.",
          },
        ],
        list: [
          { zh: "① 选中元素，看 DevTools 的 Computed 里 position 的实际取值。", en: "Select the element and read its computed position in DevTools." },
          { zh: "② 沿祖先链寻找“已定位”与“滚动容器”两类祖先，各记下第一个命中项。", en: "Walk up the chain and note the first positioned ancestor and the first scroll container." },
          { zh: "③ 用 getBoundingClientRect 量出实际位置，和预期值对比差多少像素。", en: "Measure the real position with getBoundingClientRect and compare it with the expectation." },
          { zh: "④ 差值恰好等于某个已知量（导航高度、圆角、内边距）时，优先怀疑参照物被换掉。", en: "When the difference equals a known quantity — a navbar height, a radius, padding — suspect that the reference changed." },
          { zh: "⑤ 修完再滚动一次、缩一次窗口，确认没有引入新的参照。", en: "After the fix, scroll once and resize once to confirm no new reference crept in." },
        ],
      },
      {
        id: "beyond",
        heading: { zh: "再深一层：为什么要设计 containment", en: "Deeper: why containment exists" },
        body: [
          {
            zh: "上下文隔离不只是概念：它让浏览器可以在局部完成尺寸计算，也避免了“元素尺寸依赖内容、内容又依赖尺寸”的循环。CSS Containment 把这件事显式化：container-type: inline-size 声明“我的宽度不取决于内容”，容器查询才得以安全求值。",
            en: "Context isolation is not just a concept: it lets the browser compute sizes locally and avoids the circularity of an element sizing from content that sizes from the element. CSS Containment makes that explicit — container-type: inline-size declares “my width does not depend on my contents”, which is what makes container queries safe to evaluate.",
          },
          {
            zh: "理解了这层，也就能解释为什么新特性常以“先把隔离做对”为前置条件：隔离是性能与可预测性的共同基础，而不是可选的优化。",
            en: "That also explains why new features so often require isolation first: containment is the shared foundation of performance and predictability, not an optional optimisation.",
          },
        ],
      },
    ],
    checklist: [
      { zh: "能说出四类格式化上下文各自由什么建立、内部规则是什么。", en: "You can name what creates each of the four contexts and how it behaves inside." },
      { zh: "能背出三类包含块的参照物，并会用 DevTools 验证。", en: "You can state the three containing-block references and verify them in DevTools." },
      { zh: "遇到吸顶失效时，先检查祖先的 overflow，而不是先调 z-index。", en: "When sticky fails you check ancestor overflow before touching z-index." },
      { zh: "知道 container-type 与容器查询之间的依赖关系。", en: "You know how container-type and container queries depend on each other." },
    ],
    bibliography: [
      { label: "CSS 2.2 §9.4 · Formatting contexts", href: SPEC("visuren.html#normal-flow"), kind: "spec" },
      { label: "CSS 2.2 §10.1 · Containing block", href: SPEC("visudet.html#containing-block-details"), kind: "spec" },
      { label: "CSS Position 3 · Sticky positioning", href: DRAFT("css-position-3/#sticky-pos"), kind: "spec" },
      { label: "CSS Overflow 3 · Scroll containers", href: DRAFT("css-overflow-3/#scroll-container"), kind: "spec" },
      { label: "CSS Containment 3 · Container queries", href: DRAFT("css-contain-3/"), kind: "spec" },
    ],
  },
  {
    id: "spacing-rhythm",
    eyebrow: "DEEP DIVE 02",
    title: { zh: "间距与节奏系统", en: "Spacing and vertical rhythm" },
    summary: {
      zh: "间距看起来只是数字，实际是页面的呼吸方式。这一篇讲清三件事：为什么需要一套尺度、margin 与 gap 各自的分工、以及怎样让间距随屏幕平滑变化而不是靠断点硬跳。",
      en: "Spacing looks like a matter of numbers and is really how a page breathes. This deep dive covers three things: why a shared scale is needed, how margin and gap divide the work, and how spacing can scale smoothly instead of jumping at breakpoints.",
    },
    minutes: { zh: "约 20 分钟", en: "20 min" },
    sections: [
      {
        id: "why",
        heading: { zh: "为什么需要一套间距尺度", en: "Why one shared spacing scale" },
        body: [
          {
            zh: "当每个区块自行决定间距时，页面会慢慢失去层次：同样是“段落之间的空白”，这里 18px、那里 22px、下一页 15px。读者说不清哪里不对，只觉得有点乱。一套固定尺度（例如 4 / 8 / 16 / 24 / 32 / 48）把这种随机性收敛成几个选项，改版时也只需调整 token，而不是逐个找像素。",
            en: "When every block decides its own spacing, a page quietly loses hierarchy: “the gap between paragraphs” becomes 18px here, 22px there, 15px on the next screen. Readers cannot name the problem, only feel it. A fixed scale (4 / 8 / 16 / 24 / 32 / 48, say) collapses that randomness into a few choices, and a redesign edits tokens instead of hunting pixels.",
          },
          {
            zh: "尺度还承担语义：越大的间隔代表越强的关系断裂。标题与正文之间用 8px（同属一块），章节之间用 48px（换主题），读者据此建立结构感——这是单纯的像素值传达不了的信息。",
            en: "The scale also carries meaning: larger gaps signal stronger breaks. Eight pixels between a heading and its body (same block) and 48px between sections (new topic) let readers build a sense of structure — information raw numbers never convey.",
          },
        ],
        table: {
          head: [{ zh: "token", en: "Token" }, { zh: "值", en: "Value" }, { zh: "用在哪", en: "Where it belongs" }],
          rows: [
            [{ zh: "--sp-1", en: "--sp-1" }, { zh: "4px", en: "4px" }, { zh: "图标与文字、行内标签的内边距", en: "Icon and label, inline tag padding" }],
            [{ zh: "--sp-2", en: "--sp-2" }, { zh: "8px", en: "8px" }, { zh: "标题与紧随其后的正文", en: "A heading and the text right under it" }],
            [{ zh: "--sp-3", en: "--sp-3" }, { zh: "12px", en: "12px" }, { zh: "卡片内的行距、表单元素之间", en: "Line spacing inside a card, between form fields" }],
            [{ zh: "--sp-4", en: "--sp-4" }, { zh: "16px", en: "16px" }, { zh: "卡片内边距、并列元素之间", en: "Card padding, spacing between siblings" }],
            [{ zh: "--sp-5", en: "--sp-5" }, { zh: "24px", en: "24px" }, { zh: "区块内边距、卡片与卡片", en: "Block padding, card to card" }],
            [{ zh: "--sp-6", en: "--sp-6" }, { zh: "32–48px", en: "32–48px" }, { zh: "章节之间、页面留白", en: "Between sections, page whitespace" }],
          ],
        },
      },
      {
        id: "mix",
        heading: { zh: "margin、gap、padding 各管一段", en: "margin, gap and padding each own one job" },
        body: [
          {
            zh: "三者不是可互换的：padding 属于盒子内部，撑大占位并由背景覆盖；gap 属于容器，只在子项之间出现，不产生首尾空白；margin 属于盒子自身，会在垂直方向折叠，并参与剩余空间分配。把它们按职责分开，就不必再为“折叠掉一半”而反复加值。",
            en: "The three are not interchangeable. Padding belongs inside a box: it grows the footprint and the background covers it. A gap belongs to the container and appears only between children, never at the ends. A margin belongs to the box, collapses vertically and joins free-space distribution. Give each a job and you stop inflating values to compensate for collapsing.",
          },
        ],
        figure: "gap-vs-margin",
        code: {
          label: "推荐分工",
          text: `.stack {
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);          /* 子项之间：由容器统一管理 */
}
.card {
  padding: var(--sp-4);      /* 盒内留白：属于卡片自身 */
}
.section + .section {
  margin-top: var(--sp-6);   /* 章节之间：单方向、可折叠 */
}`,
        },
      },
      {
        id: "fluid",
        heading: { zh: "让间距随屏幕变化", en: "Let spacing scale with the screen" },
        body: [
          {
            zh: "把间距写成 clamp(min, ideal, max)，中间项带视口单位，就能在小屏收紧、大屏舒展，而不必为间距单独加断点。经验值是上下限相差不超过两倍：差距过大时，视觉节奏会随屏幕剧烈变化。",
            en: "Written as clamp(min, ideal, max) with a viewport unit in the middle, spacing tightens on small screens and opens up on large ones without a breakpoint of its own. Keep the ceiling within roughly twice the floor: a wider range makes the rhythm swing violently with the viewport.",
          },
        ],
        code: {
          label: "流式间距",
          text: `:root {
  --sp-4: 16px;
  --sp-6: clamp(24px, 3vw, 48px);   /* 小屏 24px → 大屏 48px */
}
.section + .section { margin-top: var(--sp-6); }`,
        },
      },
      {
        id: "check",
        heading: { zh: "自查：这套间距站得住吗", en: "Self-check: does this spacing system hold up" },
        body: [
          {
            zh: "把页面缩到 320px、把字号放大到 200%，再看一张去色的灰度图：如果结构层次依旧清楚，说明间距在真正承担层级；如果一眼看不出分区，间距就只是装饰。",
            en: "Shrink to 320px, zoom the text to 200% and look at a grayscale screenshot: if the hierarchy still reads, spacing is genuinely carrying it; if the blocks blur together, the spacing was decoration.",
          },
        ],
        list: [
          { zh: "所有间距是否都来自有限的一组分档，而不是随手写的像素值？", en: "Does every gap come from a finite set of steps rather than ad-hoc pixels?" },
          { zh: "是否还靠 margin 累加制造间距？该换成 gap 或单方向 margin 了吗？", en: "Are you still stacking margins for spacing, or have you moved to gap or one-directional margins?" },
          { zh: "字号被放大后，间距是否跟着放大（相对单位还是固定 px）？", en: "When the font size grows, does the spacing grow with it — relative units or fixed pixels?" },
          { zh: "去掉颜色之后，区块边界还分得清吗？", en: "With colour removed, are the block boundaries still clear?" },
        ],
      },
    ],
    checklist: [
      { zh: "能列出全站使用的间距分档，并说清每一档的语义。", en: "You can list the spacing steps in use and say what each signals." },
      { zh: "能解释外边距折叠为什么不是 bug，以及现在为什么优先用 gap。", en: "You can explain why collapsing is not a bug and why gap is now preferred." },
      { zh: "知道 padding、gap、margin 各自的归属与副作用。", en: "You know what padding, gap and margin each belong to and what they cost." },
      { zh: "会用 clamp 写出有上下限的流式间距。", en: "You can write fluid spacing with clamp and sensible bounds." },
    ],
    bibliography: [
      { label: "CSS 2.2 §8.3.1 · Collapsing margins", href: SPEC("box.html#collapsing-margins"), kind: "spec" },
      { label: "CSS Box Alignment 3 · gap", href: DRAFT("css-align-3/#gaps"), kind: "spec" },
      { label: "CSS Values 4 · clamp()", href: DRAFT("css-values-4/#funcdef-clamp"), kind: "spec" },
      { label: "MDN · gap", href: "https://developer.mozilla.org/docs/Web/CSS/gap", kind: "docs" },
      { label: "web.dev · Spacing", href: "https://web.dev/learn/css/spacing", kind: "article" },
    ],
  },
];

/* 「关于本课程」页的扩展区块：理论来源 / 设计原则 / 技术栈 / 质量保障 */
export const aboutExtras = {
  sources: {
    heading: { zh: "理论来源", en: "Where the theory comes from" },
    intro: {
      zh: "课程里的每一条结论都尽量落在可核查的出处上：规范原文负责定义，WCAG 负责可访问性下限，工程文献负责解释浏览器怎么做、为什么这么做。",
      en: "Every claim in the course tries to land on something checkable: specifications for definitions, WCAG for accessibility floors, and engineering write-ups for how browsers actually do it and why.",
    },
    list: [
      { label: "CSS 2.2（W3C 推荐标准）", href: "https://www.w3.org/TR/CSS22/", kind: "spec", note: { zh: "盒模型、视觉格式化模型、包含块、层叠与绘制顺序", en: "Box model, visual formatting model, containing blocks, stacking and painting order" } },
      { label: "CSS 工作草案族（CSSWG）", href: "https://drafts.csswg.org/", kind: "spec", note: { zh: "Flexbox、Grid、Sizing、Position、Overflow、Containment、Values", en: "Flexbox, Grid, Sizing, Position, Overflow, Containment, Values" } },
      { label: "WCAG 2.2", href: "https://www.w3.org/TR/WCAG22/", kind: "spec", note: { zh: "1.4.10 Reflow 的 320px 下限、2.4.3 焦点顺序、1.3.1 信息与关系", en: "The 320px floor of 1.4.10 Reflow, 2.4.3 Focus Order, 1.3.1 Info and Relationships" } },
      { label: "Chrome · RenderingNG", href: "https://developer.chrome.com/blog/renderingng", kind: "article", note: { zh: "渲染管线的分段，以及改动落在哪一段", en: "How the rendering pipeline is split and where a change lands" } },
      { label: "A List Apart · In Search of the Holy Grail", href: "https://alistapart.com/article/holygrail/", kind: "article", note: { zh: "浮动时代的圣杯布局实现，用来对照今天的网格区域", en: "The float-era holy grail, useful as a contrast to today's grid areas" } },
    ] as { label: string; href: string; kind: string; note: Copy }[],
  },
  principles: {
    heading: { zh: "设计原则", en: "Design principles" },
    list: [
      { zh: "案例为中心：八个章节围绕同一个文章页与卡片展开，而不是每章换一个玩具例子。", en: "Case-centred: all eight chapters work on one article page and card rather than a fresh toy each time." },
      { zh: "可运行优先：每个概念都有最小示例与配套演示，结论要能在 DevTools 里当场验证。", en: "Runnable first: every concept ships a minimal example and a demo, and every claim can be verified in DevTools." },
      { zh: "理论有出处：结论尽量引用规范章节号或可核查的文献，方便追到底。", en: "Cited theory: claims point at spec sections or checkable references so you can trace them." },
      { zh: "先反例后正解：每章安排可运行的反例，训练识别而不是背诵。", en: "Counter examples before fixes: each chapter ships a runnable wrong version, training recognition over recall." },
      { zh: "可访问性不是附加项：语义、焦点顺序与 320px 下限写进每章的自查清单。", en: "Accessibility is not an add-on: semantics, focus order and the 320px floor appear in every checklist." },
    ],
  },
  stack: {
    heading: { zh: "技术栈与体量", en: "Stack and size" },
    list: [
      { zh: "React 19 + Vite 7 + TypeScript，路由用 HashRouter，部署在 GitHub Pages 子路径下。", en: "React 19, Vite 7 and TypeScript with HashRouter, deployed under a GitHub Pages subpath." },
      { zh: "零 UI 依赖：图解是手写内联 SVG，图标仅用 Phosphor 的少量图标，样式全部自研并跟随主题变量。", en: "No UI framework: figures are hand-written inline SVG, only a few Phosphor icons are used, and the styling is our own, driven by theme variables." },
      { zh: "内容与代码分离：课程数据、题库与专题各自独立成模块，便于校对与批量改写。", en: "Content is separate from code: lessons, the question bank and the deep dives live in their own modules for review and bulk edits." },
      { zh: "全站双语：中文与英文文案成对存在同一处，避免版本漂移。", en: "Bilingual throughout: Chinese and English copy sit together so the two never drift apart." },
    ],
  },
  quality: {
    heading: { zh: "质量保障", en: "Quality gates" },
    list: [
      { zh: "151 项自动化回归，覆盖排版几何、懒加载、题库、扩写字段与图解渲染。", en: "151 automated assertions covering layout geometry, lazy loading, the question bank, content fields and figure rendering." },
      { zh: "生产构建与本地子路径托管双跑：同一套用例分别打在 dist 与 /vis-work/ 前缀上。", en: "The suite runs twice: once against the production build and once against a local server hosting the site under a /vis-work/ prefix." },
      { zh: "内容审计：每章必须齐备场景、贯穿案例、原理、类比、反例、术语、图解、教师视角与文献。", en: "Content audits: every chapter must ship scenario, running case, principle, analogy, counter example, glossary, figures, teacher's view and bibliography." },
      { zh: "部署后再次跑线上回归，确认产物与源码一致。", en: "After deployment the same suite runs against the live URL to confirm the artefact matches the source." },
    ],
  },
};

