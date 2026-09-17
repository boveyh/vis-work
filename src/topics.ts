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
  {
    id: "debugging-layout",
    eyebrow: "DEEP DIVE 03",
    title: { zh: "布局调试方法论", en: "Debugging layout" },
    summary: {
      zh: "布局 bug 的共性是：肉眼看到的症状离原因很远。这一篇把排查拆成可复用的顺序——先量、再二分、最后写成断言，并给出四个必会面板的具体用法。",
      en: "Layout bugs share one trait: the visible symptom is far from the cause. This deep dive turns debugging into a reusable order — measure first, bisect second, write an assertion last — and covers four DevTools panels worth knowing.",
    },
    minutes: { zh: "约 22 分钟", en: "22 min" },
    sections: [
      {
        id: "order",
        heading: { zh: "顺序：先量，再改", en: "Order: measure before editing" },
        body: [
          {
            zh: "绝大多数布局“修复”之所以反复，是因为动手太快：凭感觉改一个值、看是否好转，再改下一个。更稳的做法是先拿到数字——元素的实际尺寸与位置——再判断差在参照物、盒模型还是算法上。数字会把猜测压缩成一两个候选原因。",
            en: "Most layout “fixes” keep coming back because the hands move too early: change a value, see if it looks better, change the next one. A steadier routine is to get numbers first — real sizes and positions — then decide whether the difference lies in the reference, the box model or the algorithm. Numbers cut the guesswork down to one or two candidates.",
          },
        ],
        list: [
          { zh: "① 选中元素，读 Computed 面板里的实际取值，而不是 Styles 里写的那份。", en: "Select the element and read the computed values, not the ones written in Styles." },
          { zh: "② 量出它现在的矩形与预期的差值，把差值记下来。", en: "Measure its current rectangle and note the gap to the expectation." },
          { zh: "③ 判断差值是否恰好等于某个已知量：导航高度、内边距、圆角或滚动条宽度。", en: "Decide whether the gap equals a known quantity: navbar height, padding, radius or scrollbar width." },
          { zh: "④ 沿祖先链找“已定位”与“滚动容器”两类祖先，各记下第一个命中项。", en: "Walk up for the first positioned ancestor and the first scroll container." },
          { zh: "⑤ 确认原因后再动手，一次只改一处，改完重新量。", en: "Only then edit — one change at a time, then measure again." },
        ],
      },
      {
        id: "tools",
        heading: { zh: "四个必会面板", en: "Four panels worth knowing" },
        body: [
          {
            zh: "工具的价值不在于多，而在于知道它能回答哪个问题。先记住渲染管线的四段——style、layout、paint、composite——再看面板，就能判断“我该看谁”。",
            en: "Tooling is not about quantity but about knowing which question each panel answers. Learn the four pipeline stages first — style, layout, paint, composite — and the panels fall into place.",
          },
        ],
        figure: "render-pipeline",
        table: {
          head: [{ zh: "面板", en: "Panel" }, { zh: "回答什么问题", en: "Answers" }, { zh: "具体做法", en: "How" }],
          rows: [
            [{ zh: "Elements · Computed", en: "Elements · Computed" }, { zh: "实际生效的值是多少", en: "Which value actually won" }, { zh: "选中元素，看盒模型图与 computed 列表，被覆盖的值会划掉", en: "Select the element and read the box diagram plus the computed list; overridden values appear struck through" }],
            [{ zh: "Layout 覆盖层", en: "Layout overlays" }, { zh: "网格与弹性轨道到底在哪", en: "Where the grid and flex tracks really are" }, { zh: "用 Elements 里的 grid / flex 徽章勾选轨道与区域高亮", en: "Use the grid or flex badge in Elements and enable track and area highlights" }],
            [{ zh: "Rendering", en: "Rendering" }, { zh: "谁在重绘、谁被提升为层", en: "Who repaints and who got promoted to a layer" }, { zh: "开启 Paint flashing 与 Layer borders，滚动页面看闪烁范围", en: "Turn on paint flashing and layer borders, then scroll and watch which regions flash" }],
            [{ zh: "Performance", en: "Performance" }, { zh: "这一帧花在哪一段", en: "Which stage the frame spends time in" }, { zh: "录一段交互，看 style / layout / paint / composite 的占比", en: "Record an interaction and read the style, layout, paint and composite breakdown" }],
          ],
        },
      },
      {
        id: "measure",
        heading: { zh: "用脚本量，而不是用眼睛猜", en: "Measure with a script, not with your eyes" },
        body: [
          {
            zh: "目测只能判断“偏了”，说不出偏了多少。在 Console 里跑几行就能拿到精确数字，而且可以直接对比多个元素——本项目修吸顶表头时，正是量到表头与表框相差恰好 64px，才锁定是滚动容器换了参照。",
            en: "Eyeballing tells you something is off but not by how much. A few lines in the console give exact numbers and let you compare several elements at once — when this project fixed its sticky header, the measurement showing exactly 64px between header and frame is what identified the swapped scroll container.",
          },
        ],
        code: {
          label: "量差值的最小脚本",
          text: `const table = document.querySelector('.rates');
const th = table.querySelector('thead th');
const thead = table.querySelector('thead');

// 表头相对表框偏了多少？
Math.round(th.getBoundingClientRect().top - thead.getBoundingClientRect().top);

// 谁是最近的滚动容器？
let el = th.parentElement;
while (el && el !== document.body) {
  const cs = getComputedStyle(el);
  if (cs.overflowX !== 'visible' || cs.overflowY !== 'visible') {
    console.log('scroll container:', el.tagName, cs.overflowX);
  }
  el = el.parentElement;
}`,
        },
      },
      {
        id: "bisect",
        heading: { zh: "二分法：让浏览器替你排除", en: "Bisect: let the browser rule things out" },
        body: [
          {
            zh: "当候选原因太多，就用二分：把可能相关的声明成批注释掉，看症状是否消失，再逐半缩小范围。对布局特别有效，因为布局的因果关系往往跨越多层祖先。",
            en: "When there are too many candidates, bisect: comment out a batch of plausible declarations, see whether the symptom disappears, then halve the range. It works especially well for layout, where cause and effect often span several ancestors.",
          },
        ],
        list: [
          { zh: "overflow 排查：临时给祖先链加 overflow: visible，看症状是否消失。", en: "Overflow hunt: temporarily set overflow: visible along the ancestor chain and see whether the symptom goes away." },
          { zh: "位置排查：给可疑祖先加 outline: 1px solid red，确认它的盒子边界到底在哪。", en: "Positioning hunt: add outline: 1px solid red to a suspicious ancestor to see where its box really is." },
          { zh: "层叠排查：临时移除 transform / filter / opacity，看上下文是否因此改变。", en: "Stacking hunt: temporarily remove transform, filter or opacity and see whether the context changes." },
          { zh: "算法排查：把 auto-fit 换成固定列数，区分是算法问题还是内容问题。", en: "Algorithm hunt: swap auto-fit for a fixed column count to tell an algorithm problem from a content problem." },
        ],
      },
      {
        id: "prevent",
        heading: { zh: "把这次修的东西变成断言", en: "Turn the fix into an assertion" },
        body: [
          {
            zh: "修完不算完：同一个坑会被下一个人再踩一次。本项目修好吸顶表头后，把它写成了两条自动化断言——表头与表框偏移必须 ≤2px、表格自身的 overflow 必须是 visible——于是“再加一行 overflow: hidden 裁圆角”这种改动会立刻让测试红掉。修复的价值因此从“这一次对了”变成“以后不容易错”。",
            en: "Fixing is not finishing: the next person steps in the same hole. After fixing its sticky header, this project turned the bug into two automated assertions — the header-to-frame offset must stay within 2px and the table's own overflow must remain visible — so a future “just clip the corner with overflow: hidden” turns the suite red immediately. The fix is worth more as “hard to break again” than as “right this once”.",
          },
          {
            zh: "写断言时记住两点：断言可量化的几何关系，而不是“看起来对”；把阈值与原因写进断言名称，让失败信息本身就能提示原因。",
            en: "Two rules for writing them: assert a measurable geometric relationship rather than “looks right”, and put the threshold and the reason in the assertion's name so the failure message explains itself.",
          },
        ],
      },
    ],
    checklist: [
      { zh: "遇到布局问题先量数字，再动手改样式。", en: "You measure before editing styles." },
      { zh: "知道四个面板各自回答什么问题，尤其是 Layout 覆盖层。", en: "You know which question each of the four panels answers, especially the layout overlays." },
      { zh: "会用脚本量两个元素的差值，并沿祖先链找滚动容器。", en: "You can script the difference between two elements and find scroll containers up the chain." },
      { zh: "修完之后会把这次的关键几何关系写成断言。", en: "After a fix you turn its key geometric relationship into an assertion." },
    ],
    bibliography: [
      { label: "Chrome DevTools · 检查网格", href: "https://developer.chrome.com/docs/devtools/css/grid", kind: "article" },
      { label: "Chrome DevTools · 检查弹性布局", href: "https://developer.chrome.com/docs/devtools/css/flexbox", kind: "article" },
      { label: "Chrome for Developers · RenderingNG", href: "https://developer.chrome.com/blog/renderingng", kind: "article" },
      { label: "CSS Overflow 3 · 滚动容器", href: DRAFT("css-overflow-3/#scroll-container"), kind: "spec" },
      { label: "CSS 2.2 §10.1 · 包含块", href: SPEC("visudet.html#containing-block-details"), kind: "spec" },
    ],
  },
  {
    id: "accessibility-flow",
    eyebrow: "DEEP DIVE 04",
    title: { zh: "可访问性与文档流", en: "Accessibility and normal flow" },
    summary: {
      zh: "文档流、DOM 顺序与可访问性树三者是同一件事的三种读法。这一篇把「焦点顺序、地标、320px 重排、读屏实测」串成一条链，并给出不依赖任何插件的五个检查动作。",
      en: "Normal flow, DOM order and the accessibility tree are three readings of the same thing. This deep dive strings focus order, landmarks, 320px reflow and screen-reader testing into one chain, with five checks that need no plugins.",
    },
    minutes: { zh: "约 24 分钟", en: "24 min" },
    sections: [
      {
        id: "flow",
        heading: { zh: "文档流就是可访问性的底盘", en: "Normal flow is the accessibility chassis" },
        body: [
          {
            zh: "浏览器把 HTML 解析成一棵树，再从同一棵树生成可访问性树：DOM 顺序既是读屏器的朗读顺序，也是键盘 Tab 的顺序，还是普通流里默认的视觉顺序。三者同源的好处是——只要不做视觉重排，它们永远一致；一旦用 CSS 把顺序拉开，就会产生分叉。",
            en: "The browser parses HTML into a tree and derives the accessibility tree from it: DOM order is the screen reader's reading order, the tab order, and the visual order of normal flow. Because they share one source they agree by default — and the moment CSS rearranges things visually, they diverge.",
          },
          {
            zh: "所以「先写语义结构，再做视觉调整」不是风格建议，而是把一致性成本降到最低的做法：结构正确时，键盘、读屏与视觉三套顺序自动对齐；结构错了，后面得用 tabindex、aria 与 order 一个个补救，而每一个补救都会留下新的不一致。",
            en: "That is why “semantics first, visuals second” is not a style preference but the cheapest way to keep the three orders aligned: correct structure aligns keyboard, screen reader and eyes for free, while a broken one needs tabindex, aria and order patches — each of which adds a new inconsistency.",
          },
        ],
        figure: "landmark-map",
      },
      {
        id: "order",
        heading: { zh: "焦点顺序必须跟着 DOM 走", en: "Focus order follows the DOM" },
        body: [
          {
            zh: "WCAG 2.4.3 要求焦点顺序保持意义与可操作性。用 order、row-reverse、flex-direction: row-reverse 或绝对定位把元素视觉重排，都会让 Tab 顺序与眼睛看到的顺序对不上；用 tabindex 正数强改顺序更糟——它会把元素从正常循环里拽出来，后面的顺序全靠猜。",
            en: "WCAG 2.4.3 asks that focus order preserve meaning and operability. Reordering visually with order, row-reverse or absolute positioning leaves the tab order disagreeing with the eyes, and positive tabindex values are worse still: they pull elements out of the natural cycle and make everything after them guesswork.",
          },
        ],
        figure: "order-vs-dom",
        list: [
          { zh: "反模式：把主按钮用 order: -1 提到视觉最前，Tab 却先落在次按钮上。", en: "Anti-pattern: raising the primary button with order: -1 while Tab still reaches the secondary one first." },
          { zh: "反模式：用 tabindex=\"1\" 修正顺序，结果是全局顺序被打断。", en: "Anti-pattern: patching order with tabindex=\"1\", which interrupts the global sequence." },
          { zh: "反模式：整块内容绝对定位脱离文档流，读屏器朗读顺序与视觉完全无关。", en: "Anti-pattern: taking a whole block out of flow so the reading order has nothing to do with the visuals." },
          { zh: "正解：需要不同顺序时改 DOM，让结构与呈现同源。", en: "The fix: when the order must change, change the DOM so structure and presentation share one source." },
        ],
      },
      {
        id: "landmarks",
        heading: { zh: "地标与跳转：给键盘用户一条捷径", en: "Landmarks and skip links: a shortcut for keyboard users" },
        body: [
          {
            zh: "地标（header / nav / main / aside / footer）在可访问性树上会变成可跳转的区域。读屏用户按一个快捷键就能列出全部地标并直接跳到 main；这一条的前提正是「一页只有一个 main」与「不要用 div 代替 nav」。",
            en: "Landmarks (header, nav, main, aside, footer) become jump targets in the accessibility tree: a screen-reader user lists them with one shortcut and jumps straight to main. The precondition is exactly “one main per page” and “do not use a div where nav belongs”.",
          },
          {
            zh: "可视页面还应提供「跳到主要内容」的 skip link：它是键盘用户在首屏跳过重复导航的唯一低成本手段，实现只需一个聚焦后才可见的链接，加上对目标元素 focus() 与 tabindex=\"-1\"。本站顶部的 skip-link 就是这一实现。",
            en: "A visual page should also offer a “skip to main content” link: for keyboard users it is the cheapest way past repeated navigation. Implement it as a link that only becomes visible on focus, plus focus() and tabindex=\"-1\" on the target. The skip link at the top of this site is exactly that.",
          },
        ],
        list: [
          { zh: "每个 <nav> 都给 aria-label（「主导航」「目录」），否则读屏里会听到一串无名的导航。", en: "Give every nav an aria-label (“Main”, “Contents”), otherwise a screen reader announces a run of nameless navigations." },
          { zh: "标题层级不跳级：h1 → h2 → h3，读屏用户靠它当目录用。", en: "Do not skip heading levels: h1 to h2 to h3 is the outline screen-reader users navigate by." },
          { zh: "链接文字要能独立表意，「点这里」离开上下文毫无信息。", en: "Link text must stand on its own; “click here” carries nothing once removed from context." },
          { zh: "图标按钮必须有可访问名称（aria-label 或视觉隐藏文本）。", en: "Icon-only buttons need an accessible name: an aria-label or visually hidden text." },
        ],
      },
      {
        id: "reflow",
        heading: { zh: "320px 与缩放：两条硬性下限", en: "320px and zoom: two hard floors" },
        body: [
          {
            zh: "WCAG 1.4.10 要求纵向滚动的内容在等效 320 CSS 像素宽度下不需要双向滚动；1.4.4 要求文字放大到 200% 不丢内容或功能。这两条把「响应式」从审美拉回到验收：320px 对应 400% 缩放下的 1280px 视口，是低视力用户与窄屏设备共同的下限。",
            en: "WCAG 1.4.10 requires vertically scrolling content to avoid two-dimensional scrolling at an equivalent width of 320 CSS pixels, and 1.4.4 requires text to remain usable at 200% zoom. Together they turn responsiveness into something testable: 320px equals a 1280px viewport at 400% zoom, a floor shared by low-vision users and small devices.",
          },
          {
            zh: "最常见的两个失分点：固定宽度容器在 320px 下溢出（要用 max-width 与 min()，而不是定宽）；以及字号用 px 写死后，用户改系统字号或浏览器缩放时文本不跟随。字体用 rem 是同时满足 1.4.4 与用户偏好的最低成本做法。",
            en: "Two failures account for most of it: a fixed-width container overflowing at 320px (use max-width and min() instead of a hard width), and px-only type that ignores system font size or browser zoom. Sizing text in rem is the cheapest way to satisfy 1.4.4 and user preference at once.",
          },
        ],
        code: {
          label: "320px 与 200% 字号都能过的写法",
          text: `/* ✅ 容器：先算可用宽度，再封上限 */
.shell {
  width: min(100% - 32px, 1160px);   /* 窄屏自动留两侧边距 */
  margin-inline: auto;
}

/* ✅ 字号：用 rem，跟随用户设置与缩放 */
body { font-size: 1rem; }            /* 16px 基准，可被用户覆盖 */
h1   { font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem); }

/* ✅ 代码与图片：不撑破容器 */
pre, img { max-width: 100%; }`,
        },
      },
      {
        id: "test",
        heading: { zh: "五个动作：不装插件也能测", en: "Five checks that need no plugins" },
        body: [
          {
            zh: "可访问性测试的门槛比想象低：键盘与缩放浏览器本身就能完成大半；读屏器（Windows 上的 NVDA、macOS/iOS 上的 VoiceOver）都免费。把下面五个动作固定成提交前的例行检查，能拦住绝大多数布局相关的可访问性问题。",
            en: "Accessibility testing is cheaper than it looks: the keyboard and browser zoom cover most of it, and screen readers — NVDA on Windows, VoiceOver on macOS and iOS — are free. Making the five actions below a routine before committing catches nearly every layout-related accessibility problem.",
          },
        ],
        list: [
          { zh: "① 只用键盘走一遍：Tab 顺序是否与视觉顺序一致，焦点环是否始终可见，Esc 能否关闭浮层。", en: "① Walk the page with the keyboard only: does tab order match the visual order, is the focus ring always visible, does Escape close overlays." },
          { zh: "② 缩到 320px 再把字号放大到 200%：不出现横向滚动，不丢内容。", en: "② Shrink to 320px and raise the font size to 200%: no horizontal scrolling and nothing lost." },
          { zh: "③ 打开读屏器列出地标与标题：地标是否齐全、标题层级是否连续。", en: "③ List landmarks and headings with a screen reader: are all landmarks present and is the heading outline continuous." },
          { zh: "④ 检查可访问名称：图标按钮、表单控件、图片是否都有可朗读的名字。", en: "④ Check accessible names: do icon buttons, form controls and images all have something to announce." },
          { zh: "⑤ 用 DevTools 的 Accessibility 面板看无障碍树，确认地标与名称真的进了树，而不只是写在属性里。", en: "⑤ Inspect the accessibility tree in DevTools and confirm landmarks and names actually reached it, not just the attributes." },
        ],
        table: {
          head: [{ zh: "检查项", en: "Check" }, { zh: "用什么", en: "Tool" }, { zh: "通过标准", en: "Passes when" }],
          rows: [
            [{ zh: "键盘顺序", en: "Focus order" }, { zh: "只用 Tab / Shift+Tab", en: "Tab and Shift+Tab only" }, { zh: "顺序与视觉一致，焦点环始终可见", en: "Order matches the visuals and the focus ring is always visible" }],
            [{ zh: "320px 重排", en: "320px reflow" }, { zh: "把窗口缩到 320px", en: "Shrink the window to 320px" }, { zh: "没有横向滚动（WCAG 1.4.10）", en: "No horizontal scrolling (WCAG 1.4.10)" }],
            [{ zh: "200% 字号", en: "200% text" }, { zh: "浏览器缩放或系统字号", en: "Browser zoom or system font size" }, { zh: "不丢内容、不重叠（WCAG 1.4.4）", en: "Nothing lost or overlapping (WCAG 1.4.4)" }],
            [{ zh: "地标与标题", en: "Landmarks and headings" }, { zh: "读屏器的地标/标题列表", en: "The screen reader's landmark and heading lists" }, { zh: "地标齐全、标题层级连续", en: "All landmarks present and the outline continuous" }],
            [{ zh: "可访问名称", en: "Accessible names" }, { zh: "DevTools Accessibility 面板", en: "DevTools accessibility pane" }, { zh: "图标按钮与表单控件都有名字", en: "Icon buttons and form controls all have names" }],
          ],
        },
      },
    ],
    checklist: [
      { zh: "能用一句话解释 DOM 顺序、焦点顺序与视觉顺序为什么应该同源。", en: "You can explain in one sentence why DOM, focus and visual order should share a source." },
      { zh: "页面有恰当地标、可跳转的 skip link 与连续的标题层级。", en: "The page has proper landmarks, a working skip link and a continuous heading outline." },
      { zh: "在 320px 与 200% 字号下都通过检查。", en: "It passes at 320px and at 200% font size." },
      { zh: "提交前跑过五个动作，包括一次真实的读屏器浏览。", en: "You ran the five checks before committing, including one real screen-reader pass." },
    ],
    bibliography: [
      { label: "WCAG 2.2 · 1.4.10 Reflow", href: "https://www.w3.org/TR/WCAG22/#reflow", kind: "spec" },
      { label: "WCAG 2.2 · 1.4.4 Resize Text", href: "https://www.w3.org/TR/WCAG22/#resize-text", kind: "spec" },
      { label: "WCAG 2.2 · 2.4.3 Focus Order", href: "https://www.w3.org/TR/WCAG22/#focus-order", kind: "spec" },
      { label: "WAI-ARIA APG · 地标区域", href: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/", kind: "spec" },
      { label: "MDN · 可访问性", href: "https://developer.mozilla.org/docs/Web/Accessibility", kind: "docs" },
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

