import { t, type Copy, type StageKey } from "./data";

export type QuizQuestion = {
  id: string;
  prompt: Copy;
  options: Copy[];
  answer: number;
  hint: Copy;
  concept: Copy;
  /* 找错题：先给一段有问题的代码，再选诊断 */
  code?: string;
  /* 为什么正确项是对的：答对后与题库中显示 */
  rationale?: Copy;
};

export type Quiz = {
  id: string;
  kind: "chapter" | "stage";
  lessonIds: string[];
  questions: QuizQuestion[];
};

const q = (id: string, zh: string, en: string, options: [Copy, Copy, Copy], answer: number, hintZh: string, hintEn: string, conceptZh: string, conceptEn: string, code?: string): QuizQuestion => ({
  id,
  prompt: t(zh, en),
  options,
  answer,
  hint: t(hintZh, hintEn),
  concept: t(conceptZh, conceptEn),
  code,
});

const quiz = (lessonId: string, questions: QuizQuestion[]): Quiz => ({ id: `chapter-${lessonId}`, kind: "chapter", lessonIds: [lessonId], questions });

const chapterQuizData: Record<string, Quiz> = {
  "page-structure": quiz("page-structure", [
    q("structure-1", "哪个标签最适合承载页面的主要内容？", "Which element best contains the page's main content?", [t("<span>", "<span>"), t("<br>", "<br>"), t("<main>", "<main>")], 2, "先判断内容在整页中的语义角色。", "Start with the content's semantic role in the page.", "语义结构", "Semantic structure"),
    q("structure-2", "块级元素默认如何排列？", "How do block elements flow by default?", [t("始终在同一行", "Always stay on one line"), t("从上到下排列", "Stack from top to bottom"), t("全部重叠", "All overlap")], 1, "回想正常文档流中的纵向顺序。", "Recall the vertical order in normal flow.", "文档流", "Normal flow"),
    q("structure-3", "想让文章区域宽度受限并居中，优先使用哪组规则？", "Which rules should limit and center an article?", [t("max-width 与 margin-inline: auto", "max-width and margin-inline: auto"), t("position: absolute", "position: absolute"), t("连续插入 <br>", "Repeated <br> elements")], 0, "目标是限制宽度并分配两侧剩余空间。", "The goal is to cap width and distribute leftover side space.", "内容宽度", "Content width"),
    q("structure-4", "哪种做法最利于屏幕阅读器理解页面？", "Which approach best helps screen readers understand a page?", [t("全部使用 div", "Use div for everything"), t("用颜色区分区域", "Separate regions with color"), t("使用 header、main、footer", "Use header, main and footer")], 2, "辅助技术需要结构含义，而不只是视觉差异。", "Assistive technology needs structural meaning, not only visual differences.", "可访问性", "Accessibility"),
    q("structure-find-1", "下面这段结构的主要问题是什么？", "What is the main problem with this markup?", [t("用 <br> 造段落间距：间距会叠加，语义与顺序都不可控", "Using <br> for paragraph spacing: gaps stack up and neither semantics nor order is controlled"), t("<h1> 不该出现在文章容器里", "An h1 should not appear inside an article container"), t("缺少为每段单独包裹的 <div>", "It is missing a wrapping div per paragraph")], 0, "先问“这段间距由谁提供”。", "Ask which rule provides that spacing.", "结构与间距", "Structure and spacing", "<div class=\"post\">\n  <h1>标题</h1>\n  <br />\n  <br />\n  <p>第一段</p>\n</div>"),
  ]),
  "box-model": quiz("box-model", [
    q("box-1", "标准盒模型从内到外的顺序是什么？", "What is the box model order from inside to outside?", [t("border、margin、content、padding", "border, margin, content, padding"), t("content、padding、border、margin", "content, padding, border, margin"), t("margin、content、padding、border", "margin, content, padding, border")], 1, "从文字所在的内容区开始向外观察。", "Start at the content area and move outward.", "盒模型", "Box model"),
    q("box-2", "在默认 content-box 下增加 padding，会发生什么？", "What happens when padding increases under content-box?", [t("盒子总占用宽度增加", "The total occupied width grows"), t("总宽度永远不变", "The total width never changes"), t("内容自动消失", "The content disappears")], 0, "声明的 width 此时只描述 content。", "The declared width describes only the content in this mode.", "尺寸计算", "Size calculation"),
    q("box-3", "哪条规则让 padding 计入声明宽度？", "Which rule includes padding in the declared width?", [t("display: inline", "display: inline"), t("overflow: visible", "overflow: visible"), t("box-sizing: border-box", "box-sizing: border-box")], 2, "寻找改变 width 计算边界的属性。", "Look for the property that changes the width calculation boundary.", "border-box", "border-box"),
    q("box-4", "两个相邻项目之间的固定间距优先用什么？", "What should create a fixed gap between adjacent items?", [t("font-weight", "font-weight"), t("gap", "gap"), t("color", "color")], 1, "它应由父布局统一管理，而不是改变文字。", "It should be managed by the parent layout, not by text styling.", "间距", "Spacing"),
    q("box-find-1", "这张卡片的实际占位宽度是多少？", "How wide is this card's footprint?", [t("348px：padding 与 border 叠加在 content-box 之外", "348px: padding and border stack outside the content box"), t("280px：width 已经包含内边距", "280px: width already includes padding"), t("312px：只有 padding 参与计算", "312px: only padding counts")], 0, "想想 box-sizing 的初始值。", "Recall the initial value of box-sizing.", "盒模型计算", "Box model maths", ".card {\n  width: 280px;\n  padding: 32px;\n  border: 2px solid;\n}"),
  ]),
  flexbox: quiz("flexbox", [
    q("flex-1", "flex-direction: column 会把主轴改成什么方向？", "What direction does flex-direction: column give the main axis?", [t("垂直", "Vertical"), t("水平", "Horizontal"), t("没有主轴", "No main axis")], 0, "column 表示项目按列堆叠。", "Column means the items stack as a column.", "主轴", "Main axis"),
    q("flex-2", "哪个属性沿主轴分配剩余空间？", "Which property distributes free space on the main axis?", [t("align-items", "align-items"), t("font-size", "font-size"), t("justify-content", "justify-content")], 2, "先确认题目问的是主轴而不是交叉轴。", "Check that the question asks about the main axis, not the cross axis.", "空间分配", "Space distribution"),
    q("flex-3", "想让三个项目之间保持统一距离，应使用什么？", "What keeps a consistent distance between three items?", [t("text-align", "text-align"), t("gap", "gap"), t("z-index", "z-index")], 1, "寻找由 flex 容器统一控制的间距属性。", "Look for spacing controlled by the flex container.", "Flex 间距", "Flex spacing"),
    q("flex-4", "主轴改变后，justify-content 的作用会怎样？", "What happens to justify-content when the main axis changes?", [t("继续沿新的主轴生效", "It follows the new main axis"), t("固定控制水平方向", "It always controls horizontal alignment"), t("立即失效", "It stops working")], 0, "属性跟随轴线，而不是固定跟随屏幕方向。", "The property follows the axis, not a fixed screen direction.", "轴线关系", "Axis relationship"),
    q("flex-find-1", "为什么这个导航看起来没有精确居中？", "Why does this nav look slightly off-centre?", [t("末项右侧也留了 16px，参与分配的总宽度被多算", "The last item keeps a 16px margin, so the width used for distribution is too large"), t("justify-content 在弹性布局里不生效", "justify-content does not work in flex layouts"), t("需要给每个 a 加 flex: 1", "Each anchor needs flex: 1")], 0, "看间距属于谁。", "Ask who owns the spacing.", "间距归属", "Spacing ownership", ".nav {\n  display: flex;\n  justify-content: center;\n}\n.nav a {\n  margin-right: 16px;\n}"),
  ]),
  positioning: quiz("positioning", [
    q("position-1", "absolute 元素通常以谁为定位参照？", "What usually becomes the reference for an absolute element?", [t("任意文字行", "Any text line"), t("最后一个兄弟元素", "The last sibling"), t("最近的已定位祖先", "The nearest positioned ancestor")], 2, "向祖先方向寻找非 static 的定位上下文。", "Look upward for a non-static positioning context.", "定位参照", "Positioning reference"),
    q("position-2", "要把角标固定在卡片内部，卡片通常需要什么？", "What does a card usually need to contain an anchored badge?", [t("font-style: italic", "font-style: italic"), t("position: relative", "position: relative"), t("display: inline", "display: inline")], 1, "父元素需要建立定位上下文。", "The parent needs to establish a positioning context.", "相对定位", "Relative positioning"),
    q("position-3", "z-index 主要控制什么？", "What does z-index mainly control?", [t("重叠元素的前后层级", "The stacking order of overlapping elements"), t("文字大小", "Text size"), t("网格列数", "Grid column count")], 0, "它只在元素发生层叠时容易观察。", "It is easiest to observe when elements overlap.", "层叠", "Stacking"),
    q("position-4", "什么时候不应优先使用 absolute？", "When should absolute positioning not be the first choice?", [t("角标需要覆盖卡片角落时", "When a badge overlays a card corner"), t("弹层需要覆盖内容时", "When an overlay must cover content"), t("普通内容需要自然撑开页面时", "When normal content should grow the page")], 2, "考虑元素是否还应该参与正常文档流。", "Consider whether the element should remain in normal flow.", "定位边界", "Positioning boundaries"),
    q("position-find-1", "为什么吸顶表头被整体下推了一个导航的高度？", "Why is the sticky header pushed down by a full navbar height?", [t("overflow: hidden 让容器成为滚动容器，sticky 的参照从视口换成了这个容器", "overflow: hidden turns the container into a scroll container, so sticky references it instead of the viewport"), t("top: 64px 应该写成 top: 0", "top: 64px should be top: 0"), t("sticky 必须配合 z-index 才能生效", "sticky needs a z-index to work")], 0, "sticky 的偏移相对谁解析？", "What does a sticky offset resolve against?", "滚动容器与 sticky", "Scroll containers and sticky", ".list {\n  max-height: 320px;\n  overflow: hidden;   /* 为了裁圆角 */\n}\n.list thead th {\n  position: sticky;\n  top: 64px;\n}"),
  ]),
  grid: quiz("grid", [
    q("grid-1", "哪个属性定义网格列轨道？", "Which property defines grid column tracks?", [t("position", "position"), t("grid-template-columns", "grid-template-columns"), t("justify-content", "justify-content")], 1, "寻找名称中直接包含 columns 的网格属性。", "Look for the grid property that names columns directly.", "网格轨道", "Grid tracks"),
    q("grid-2", "repeat(3, 1fr) 表示什么？", "What does repeat(3, 1fr) mean?", [t("三条等宽列轨道", "Three equal column tracks"), t("三个重叠元素", "Three overlapping elements"), t("三行文字", "Three lines of text")], 0, "fr 分配的是网格容器中的可用空间。", "fr distributes available space in a grid container.", "fr 单位", "fr unit"),
    q("grid-3", "六个项目放进三列网格，通常形成几行？", "How many rows do six items usually form in a three-column grid?", [t("一行", "One row"), t("六行", "Six rows"), t("两行", "Two rows")], 2, "用项目总数除以每行容量。", "Divide the item count by the row capacity.", "自动放置", "Auto placement"),
    q("grid-4", "想改变网格轨道之间的距离，应调整什么？", "What changes the distance between grid tracks?", [t("line-height", "line-height"), t("gap", "gap"), t("color", "color")], 1, "目标是轨道之间的沟槽，而不是项目内部。", "The target is the gutter between tracks, not inside an item.", "网格间距", "Grid gap"),
    q("grid-find-1", "这段网格代码为什么整条声明都没生效？", "Why does this grid declaration do nothing at all?", [t("side 出现在不相邻的两格，区域不是矩形，声明被判为无效", "side appears in two non-adjacent cells, so the area is not a rectangle and the declaration is invalid"), t("grid-template-areas 不能用双引号", "grid-template-areas cannot use double quotes"), t("必须先声明行轨道才能用命名区域", "Named areas require explicit row tracks first")], 0, "把字符地图画在纸上看看形状。", "Draw the character map on paper and look at its shape.", "命名区域的规则", "Rules for named areas", ".shell {\n  display: grid;\n  grid-template-columns: 240px 1fr;\n  grid-template-areas:\n    \"head head\"\n    \"side main side\"\n    \"foot foot\";\n}"),
  ]),
  responsive: quiz("responsive", [
    q("responsive-1", "响应式断点应由什么决定？", "What should determine a responsive breakpoint?", [t("内容开始无法正常呈现的位置", "Where content stops working"), t("手机品牌", "The phone brand"), t("随意选择的整数", "A random integer")], 0, "观察布局，而不是设备型号。", "Observe the layout rather than the device model.", "断点", "Breakpoints"),
    q("responsive-2", "双栏在窄屏空间不足时，优先怎么处理？", "What should a cramped two-column layout do first?", [t("强制撑宽页面", "Force the page wider"), t("把文字缩到不可读", "Shrink text until unreadable"), t("重排为单列", "Reflow into one column")], 2, "保持内容可读比保持原列数更重要。", "Readable content matters more than preserving the column count.", "内容重排", "Content reflow"),
    q("responsive-3", "媒体查询主要根据什么应用不同规则？", "What does a media query use to apply different rules?", [t("文字颜色", "Text color"), t("环境或视口条件", "Environment or viewport conditions"), t("HTML 标签数量", "The number of HTML tags")], 1, "它判断的是外部呈现条件。", "It evaluates external presentation conditions.", "媒体查询", "Media queries"),
    q("responsive-4", "移动端代码块过宽时，较合适的处理是什么？", "What is a good way to handle an overly wide code block on mobile?", [t("只让代码块横向滚动", "Let only the code block scroll horizontally"), t("让整页横向滚动", "Make the whole page scroll horizontally"), t("删除所有代码", "Delete all code")], 0, "溢出应被限制在产生溢出的组件内。", "Contain overflow inside the component that creates it.", "溢出控制", "Overflow control"),
    q("responsive-find-1", "为什么这个字号完全不随视口变化？", "Why does this font size never change with the viewport?", [t("中间项不含视口单位，clamp 退化成常量", "The middle term has no viewport unit, so clamp collapses to a constant"), t("clamp 必须写在媒体查询里才生效", "clamp only works inside a media query"), t("最小值必须大于最大值", "The minimum must be greater than the maximum")], 0, "clamp 的中间项用的是什么单位？", "Which unit is the middle term using?", "流式尺寸", "Fluid sizing", ".title {\n  font-size: clamp(16px, 1.25rem, 24px);\n}"),
  ]),
  patterns: quiz("patterns", [
    q("patterns-1", "选择布局工具前最先看什么？", "What should you inspect before choosing a layout tool?", [t("当前流行效果", "The current visual trend"), t("颜色数量", "The number of colors"), t("内容之间的关系", "Relationships between content")], 2, "布局工具服务于结构关系。", "Layout tools serve structural relationships.", "布局选择", "Layout choice"),
    q("patterns-2", "一维导航排列通常优先使用什么？", "What is usually best for one-dimensional navigation?", [t("连续空格", "Repeated spaces"), t("Flexbox", "Flexbox"), t("绝对定位每一项", "Absolute positioning for every item")], 1, "它主要处理一条轴线上的排列和分布。", "It mainly handles arrangement and distribution on one axis.", "一维布局", "One-dimensional layout"),
    q("patterns-3", "二维卡片区域通常优先使用什么？", "What is usually best for a two-dimensional card area?", [t("Grid", "Grid"), t("<br>", "<br>"), t("z-index", "z-index")], 0, "同时考虑行和列时，选择二维布局工具。", "Choose a two-dimensional tool when rows and columns both matter.", "二维布局", "Two-dimensional layout"),
    q("patterns-4", "页面区域使用不同布局工具是否合理？", "Is it reasonable for page regions to use different layout tools?", [t("不合理，整页只能使用一种", "No, a page may use only one"), t("只有深色页面可以", "Only on dark pages"), t("合理，应按各区域关系选择", "Yes, choose by each region's relationship")], 2, "整页由多个职责不同的区域组成。", "A page contains regions with different responsibilities.", "组合布局", "Composed layouts"),
    q("patterns-find-1", "视觉顺序对了，但可访问性上有什么问题？", "The visual order looks right — what is the accessibility problem?", [t("键盘与读屏顺序仍按 DOM，视觉与操作顺序不一致", "Keyboard and screen-reader order still follow the DOM, so visual and operable order differ"), t("order 会显著增加渲染开销", "order adds a significant rendering cost"), t("order 会让按钮无法点击", "order makes the button unclickable")], 0, "谁在决定 Tab 的先后？", "What decides the tab sequence?", "视觉顺序与 DOM 顺序", "Visual order versus DOM order", ".row {\n  display: flex;\n  gap: 12px;\n}\n.row .primary {\n  order: -1;   /* 让主按钮排在视觉最前 */\n}"),
  ]),
  "final-challenge": quiz("final-challenge", [
    q("final-1", "构建完整页面时，第一步通常是什么？", "What is usually the first step in building a full page?", [t("随机选择断点", "Pick random breakpoints"), t("划分主要内容区域", "Divide the main content regions"), t("先写所有动画", "Write every animation first")], 1, "先建立骨架，再处理区域内部。", "Build the shell before the regions inside it.", "页面骨架", "Page shell"),
    q("final-2", "导航、主内容、侧栏和页脚适合由什么统一组织？", "What can organize navigation, main, aside and footer together?", [t("页面级 Grid", "A page-level Grid"), t("文字颜色", "Text color"), t("每块都绝对定位", "Absolute positioning for every region")], 0, "这里同时存在行和列的区域关系。", "The shell contains both row and column relationships.", "页面网格", "Page grid"),
    q("final-3", "窄屏下侧栏最合理的变化是什么？", "What is the most reasonable narrow-screen change for an aside?", [t("覆盖主内容", "Cover the main content"), t("始终保持固定宽度", "Always keep a fixed width"), t("移到主内容下方", "Move below the main content")], 2, "优先保持阅读顺序与可用宽度。", "Preserve reading order and usable width first.", "响应式重排", "Responsive reflow"),
    q("final-4", "如何判断布局挑战是否真正完成？", "How should a layout challenge be considered complete?", [t("只要桌面端不报错", "As long as desktop shows no error"), t("区域、间距和窄屏行为都满足目标", "Regions, spacing and narrow-screen behavior all meet the target"), t("只要颜色好看", "As long as the colors look good")], 1, "完整页面需要同时检查结构和多端表现。", "A complete page needs structural and multi-device checks.", "综合验收", "Integrated verification"),
    q("final-find-1", "移动端地址栏收起时，这段骨架会出现什么？", "What happens to this shell when the mobile address bar collapses?", [t("底部露出空白或页脚被裁：height 固定为最大视口高度", "A blank strip or a clipped footer: height is pinned to the largest viewport height"), t("页脚会跑到屏幕中间", "The footer jumps to the middle of the screen"), t("网格会退化成单列", "The grid falls back to a single column")], 0, "100vh 量的是哪个高度？", "Which height does 100vh measure?", "视口单位与整页骨架", "Viewport units and page shells", ".project {\n  height: 100vh;\n  display: grid;\n  grid-template-rows: auto 1fr auto;\n}"),
  ]),
};

const stageLessons: Record<StageKey, [string, string]> = {
  starter: ["page-structure", "box-model"],
  foundation: ["flexbox", "positioning"],
  advanced: ["grid", "responsive"],
  practice: ["patterns", "final-challenge"],
};

/* Stage tests hold their own ten questions: they cover the two chapters of the stage plus a
   little cross-chapter judgement, and never repeat a chapter quiz prompt. */
const stageQuestionSets: Record<StageKey, QuizQuestion[]> = {
  starter: [
    q("stage-starter-1", "页面里唯一的主内容区域，用哪个元素最合适？", "Which element should carry the single main content area?", [t("header", "header"), t("main", "main"), t("footer", "footer")], 1, "先判断这块内容在整页里是不是唯一的中心内容。", "Ask whether this block is the single centre of the page.", "语义区域", "Semantic regions"),
    q("stage-starter-2", "默认文档流下，相邻的两个块级元素会怎么排列？", "How do two neighbouring block elements flow by default?", [t("上下堆叠", "Stacked vertically"), t("左右并排", "Side by side"), t("完全重叠", "Exactly overlapping")], 0, "想一下块级盒子默认朝哪个方向推进。", "Think about which direction block boxes advance.", "文档流", "Normal flow"),
    q("stage-starter-3", "想让正文每行不超过约 70 个字符，最直接的做法是？", "Which step keeps body lines under roughly 70 characters?", [t("给 body 加 padding", "Add padding to body"), t("把字号改小", "Reduce the font size"), t("给内容容器设 max-width", "Give the content container a max-width")], 2, "限制的是容器的宽度，而不是文字本身。", "You are limiting a container, not the glyphs.", "内容宽度", "Content width"),
    q("stage-starter-4", "在 content-box 下给 280px 宽的卡片加 2px 边框，占用宽度会变成？", "Under content-box, a 280px card gains a 2px border. What width does it occupy?", [t("仍然是 280px", "Still 280px"), t("284px", "284px"), t("276px", "276px")], 1, "回忆 content-box 里 width 描述的是哪一块。", "Recall which part width describes under content-box.", "盒模型", "Box model"),
    q("stage-starter-5", "希望卡片增加内边距后总宽度不变，应写哪条规则？", "Which rule keeps a card's total width stable when padding grows?", [t("box-sizing: border-box", "box-sizing: border-box"), t("margin: auto", "margin: auto"), t("overflow: hidden", "overflow: hidden")], 0, "要让 padding 和 border 计入声明宽度。", "Padding and border have to sit inside the declared width.", "border-box", "border-box"),
    q("stage-starter-6", "卡片之间要稳定留出 16px，最可预测的做法是？", "What is the most predictable way to keep a steady 16px between cards?", [t("给每张卡片写 margin", "Write a margin on every card"), t("插入空的 div", "Insert empty divs"), t("让父容器用 gap", "Let the parent container use gap")], 2, "让父布局统一管理间距，而不是逐个元素处理。", "Let the parent manage spacing instead of every child.", "间距", "Spacing"),
    q("stage-starter-7", "想表达“这里是页面导航”，用哪个元素最合适？", "Which element best says this region is the page navigation?", [t("div", "div"), t("nav", "nav"), t("span", "span")], 1, "语义元素本身就能说明区域角色。", "A semantic element can name the region on its own.", "语义结构", "Semantic structure"),
    q("stage-starter-8", "用 margin: 0 auto 让元素水平居中，还需要什么前提？", "What does margin: 0 auto need before it can centre an element?", [t("元素有明确或受限的宽度", "A defined or limited width"), t("元素使用绝对定位", "The element is absolutely positioned"), t("父容器有边框", "The parent has a border")], 0, "没有多余空间可以分配时，居中无从谈起。", "Centring needs leftover space to distribute.", "水平居中", "Horizontal centring"),
    q("stage-starter-9", "受限宽度的卡片加上内边距后溢出容器，最合理的排查顺序是？", "A width-limited card overflows once padding is added. What is the soundest order of checks?", [t("先换字体再调宽度", "Change the font first, then the width"), t("先看尺寸计算方式，再看可用宽度", "Check the size model first, then the available width"), t("先改成绝对定位", "Switch to absolute positioning first")], 1, "先分清是尺寸计算问题，还是可用空间问题。", "Separate the size calculation from the available space.", "尺寸与结构", "Size and structure"),
    q("stage-starter-10", "想让文章既语义清楚又读起来舒服，哪组做法更合理？", "Which combination keeps an article readable and semantic?", [t("语义标签 + 受限宽度 + 统一间距", "Semantic elements + a limited measure + even spacing"), t("全用 div + 很大内边距", "Only divs + very large padding"), t("全用 span + 固定高度", "Only spans + a fixed height")], 0, "结构、宽度、间距是三件不同的事。", "Structure, measure and spacing are three separate concerns.", "基础组合", "Foundation combination"),
  ],
  foundation: [
    q("stage-foundation-1", "flex-direction: column-reverse 后，主轴与项目顺序有什么变化？", "After flex-direction: column-reverse, what changes about the axis and the item order?", [t("主轴垂直、项目顺序反转", "The main axis is vertical and the order reverses"), t("主轴水平、顺序不变", "The axis is horizontal and the order stays"), t("没有主轴", "There is no main axis")], 0, "column 和 reverse 各自改变了什么。", "column and reverse each change something different.", "主轴", "Main axis"),
    q("stage-foundation-2", "想沿交叉轴把项目居中，应该用哪个属性？", "Which property centres items on the cross axis?", [t("justify-content: center", "justify-content: center"), t("text-align: center", "text-align: center"), t("align-items: center", "align-items: center")], 2, "先确认题目问的是主轴还是交叉轴。", "Check whether the question is about the main or the cross axis.", "交叉轴", "Cross axis"),
    q("stage-foundation-3", "让 logo 与菜单分别贴在两端，用哪个值最直接？", "Which value pushes a logo and a menu to opposite ends?", [t("align-items: center", "align-items: center"), t("justify-content: space-between", "justify-content: space-between"), t("gap: 0", "gap: 0")], 1, "要让剩余空间全部被推到中间。", "Push all leftover space into the middle.", "空间分配", "Space distribution"),
    q("stage-foundation-4", "侧栏固定宽度、主内容占满剩余空间，应怎么设置？", "How do you keep an aside fixed while the main area takes the rest?", [t("给主内容 flex: 1", "Give the main area flex: 1"), t("给侧栏 flex: 1", "Give the aside flex: 1"), t("给两者都加 gap", "Add gap to both")], 0, "先想清楚谁应该生长，谁应保持固定。", "Decide who grows and who stays fixed.", "弹性伸缩", "Flexible sizing"),
    q("stage-foundation-5", "一行项目在窄屏放不下，希望自动换成两行，用哪个属性？", "Which property lets a crowded row break onto a second line?", [t("overflow: hidden", "overflow: hidden"), t("position: static", "position: static"), t("flex-wrap: wrap", "flex-wrap: wrap")], 2, "找允许换行的那个属性。", "Look for the property that allows wrapping.", "换行", "Wrapping"),
    q("stage-foundation-6", "用 absolute 给卡片角标定位，父容器通常需要什么？", "What does the parent usually need before an absolute badge is placed?", [t("display: flex", "display: flex"), t("position: relative 一类定位上下文", "A positioning context such as position: relative"), t("overflow: scroll", "overflow: scroll")], 1, "绝对定位需要一个明确的参照。", "Absolute positioning needs a defined reference.", "定位参照", "Positioning context"),
    q("stage-foundation-7", "希望角标盖在卡片内容之上，应该考虑什么？", "What makes a badge sit above the card content?", [t("定位配合 z-index", "Positioning together with z-index"), t("增加 margin", "A larger margin"), t("换成 b 元素", "Using a b element")], 0, "重叠顺序属于层叠问题。", "Overlap order is a stacking question.", "层叠顺序", "Stacking order"),
    q("stage-foundation-8", "工具栏上一排按钮的排列，优先用哪种方式？", "What is the first choice for arranging a toolbar row?", [t("absolute 定位", "absolute positioning"), t("浮动", "floats"), t("Flex 排列", "Flex layout")], 2, "一维排列是弹性布局的强项。", "One-dimensional arrangement is Flex's strength.", "工具选择", "Tool choice"),
    q("stage-foundation-9", "同一页面里，导航用 Flex 排一行、角标用定位覆盖在卡片上，合理吗？", "A Flex nav row and a positioned badge on the same page: is that sound?", [t("不合理，整页只能用一种布局", "No, a page may use only one layout mode"), t("合理，两个区域的关系不同", "Yes, the two regions have different relationships"), t("不合理，角标必须用 Flex", "No, the badge must be a flex item")], 1, "不同区域可以有完全不同的关系。", "Different regions may have different relationships.", "机制边界", "Mechanism boundaries"),
    q("stage-foundation-10", "在 flex-direction: column 下，justify-content: center 会把项目放在哪？", "Under flex-direction: column, where does justify-content: center place the items?", [t("垂直方向居中", "Centred vertically"), t("水平方向居中", "Centred horizontally"), t("只贴近左上角", "Tucked into the top-left corner")], 0, "justify-content 永远跟着主轴走。", "justify-content always follows the main axis.", "主轴与对齐", "Axis and alignment"),
  ],
  advanced: [
    q("stage-advanced-1", "三列等宽列轨道的写法是？", "How do you declare three equal column tracks?", [t("grid-template-rows: 3fr", "grid-template-rows: 3fr"), t("display: inline-block", "display: inline-block"), t("grid-template-columns: repeat(3, 1fr)", "grid-template-columns: repeat(3, 1fr)")], 2, "列轨道归哪个属性管。", "Which property owns column tracks.", "网格轨道", "Grid tracks"),
    q("stage-advanced-2", "9 个项目放进 3 列网格，通常形成几行？", "Nine items in a three-column grid usually form how many rows?", [t("3 行", "3 rows"), t("9 行", "9 rows"), t("1 行", "1 row")], 0, "用项目数除以列数。", "Divide the item count by the number of columns.", "行列关系", "Rows and columns"),
    q("stage-advanced-3", "想让列数随可用宽度自动变化，应该用什么？", "What makes the column count follow the available width?", [t("固定写 repeat(3, 1fr)", "A fixed repeat(3, 1fr)"), t("给网格加 overflow: scroll", "overflow: scroll on the grid"), t("auto-fit 配合 minmax()", "auto-fit together with minmax()")], 2, "让轨道数量跟着可用宽度走。", "Let the track count follow the available width.", "自适应轨道", "Adaptive tracks"),
    q("stage-advanced-4", "网格里同时控制轨道之间与行之间的距离，用哪个属性？", "Which property controls spacing between tracks and rows at once?", [t("margin", "margin"), t("gap", "gap"), t("padding", "padding")], 1, "有一个属性同时管两个方向。", "One property covers both directions.", "网格间距", "Grid gaps"),
    q("stage-advanced-5", "响应式断点最合理的确定依据是什么？", "What is the soundest basis for choosing a breakpoint?", [t("内容开始拥挤的位置", "Where the content starts to feel cramped"), t("常见手机型号列表", "A list of popular phone models"), t("固定只用 768 和 1024", "Always 768 and 1024")], 0, "断点服务于内容，而不是设备清单。", "Breakpoints serve content, not a device list.", "断点", "Breakpoints"),
    q("stage-advanced-6", "页面在 1024px 下双栏仍然放不下，最先应该调整什么？", "At 1024px a two-column layout still does not fit. What should change first?", [t("把两栏的字都缩小", "Shrink the text in both columns"), t("在断点处让内容改成单列", "Reflow the content into one column at a breakpoint"), t("给页面加横向滚动", "Add horizontal scrolling to the page")], 1, "优先改变内容关系，而不是压缩内容。", "Change the relationship before squeezing the content.", "断点重排", "Breakpoint reflow"),
    q("stage-advanced-7", "媒体查询主要在做哪件事？", "What does a media query actually do?", [t("按条件应用不同的样式规则", "Apply different style rules under a condition"), t("改变 HTML 结构", "Change the HTML structure"), t("加载不同字体文件", "Load a different font file")], 0, "它只是切换同一份布局的规则。", "It only switches rules for the same markup.", "媒体查询", "Media queries"),
    q("stage-advanced-8", "移动端代码块比屏幕宽，最合适的处理方式是？", "A code block is wider than the phone screen. What is the soundest fix?", [t("缩小整个页面", "Scale the whole page down"), t("让代码块自己横向滚动", "Let the code block scroll on its own"), t("直接删掉代码", "Delete the code")], 1, "局部滚动不会影响整页宽度。", "Local scrolling keeps the page width intact.", "溢出处理", "Overflow"),
    q("stage-advanced-9", "三列卡片在窄屏放不下，同时页面还有一行导航，合理做法是？", "A three-column grid no longer fits and the page also has a nav row. What is sound?", [t("两者都缩小字体", "Shrink the text in both"), t("导航保持一行、卡片区在断点减少列数", "Keep the nav on one row and drop columns at a breakpoint"), t("两者都改成绝对定位", "Make both absolutely positioned")], 1, "每个区域按自己的关系决定。", "Each region decides from its own relationship.", "分区域响应", "Per-region responsiveness"),
    q("stage-advanced-10", "auto-fit 网格与固定列网格的关键区别是什么？", "What is the key difference between an auto-fit grid and a fixed-column grid?", [t("是否能用 gap", "Whether gap works"), t("是否需要 display", "Whether display is needed"), t("列数是否随可用宽度变化", "Whether the column count follows the available width")], 2, "看轨道数量由谁决定。", "See who decides the track count.", "自适应与固定", "Adaptive vs fixed"),
  ],
  practice: [
    q("stage-practice-1", "拿到一张设计稿，第一步更合理的是？", "What is the soundest first step with a design in hand?", [t("先写动画细节", "Write the animation details"), t("先拆出区域并明确关系", "Split the regions and name their relationships"), t("先挑颜色", "Pick colours")], 1, "布局从区域关系开始。", "Layout starts with region relationships.", "拆解顺序", "Decomposition order"),
    q("stage-practice-2", "一维的导航排列优先用什么？", "What is the first choice for a one-dimensional nav row?", [t("Grid", "Grid"), t("absolute 定位", "absolute positioning"), t("Flex", "Flex")], 2, "先判断要处理的是一维还是二维。", "Decide whether the problem is one- or two-dimensional.", "工具选择", "Tool choice"),
    q("stage-practice-3", "二维卡片墙优先用什么？", "What is the first choice for a two-dimensional card wall?", [t("Grid", "Grid"), t("浮动", "floats"), t("给每张卡片写 margin", "A margin on every card")], 0, "行列都要控制时该用谁。", "Who controls rows and columns together.", "二维布局", "Two-dimensional layout"),
    q("stage-practice-4", "完整页面同时有导航、卡片墙和角标，应该怎么做？", "A page has a nav, a card wall and badges. How should the tools be chosen?", [t("全页只用一种工具", "Use one tool for the whole page"), t("按区域分别选择工具", "Choose tools region by region"), t("全页绝对定位", "Absolutely position everything")], 1, "组合使用是正常的。", "Combining tools is normal.", "工具组合", "Tool composition"),
    q("stage-practice-5", "桌面布局完成后，下一项必要的检查是什么？", "What must be checked once the desktop layout works?", [t("只更换配色", "Only swap the palette"), t("删除语义标签", "Remove the semantic elements"), t("验证窄屏重排与溢出", "Verify narrow-screen reflow and overflow")], 2, "验收要覆盖多种宽度。", "Verification must cover several widths.", "多端验收", "Multi-width verification"),
    q("stage-practice-6", "窄屏下导航条目太多放不下时，最合理的处理是？", "Too many nav items for a narrow screen: what is the soundest handling?", [t("允许换行、横向滚动或折叠", "Let them wrap, scroll or collapse"), t("缩小字体硬塞进一行", "Shrink the font and force one row"), t("隐藏整个导航", "Hide the whole navigation")], 0, "导航的可达性优先于“必须一行”。", "Reachability matters more than staying on one row.", "导航响应", "Responsive navigation"),
    q("stage-practice-7", "要让页面边缘保持统一节奏，用哪个更合适？", "What keeps a consistent rhythm at the page edges?", [t("给每个元素写 margin-top", "A margin-top on every element"), t("容器统一 padding", "One padding value on the container"), t("调整 border-width", "Tuning border-width")], 1, "边缘留白属于容器。", "Edge spacing belongs to the container.", "页面节奏", "Page rhythm"),
    q("stage-practice-8", "想让整页看起来更整齐，最关键的是什么？", "What matters most for making a page look tidy?", [t("更多颜色", "More colours"), t("更多阴影", "More shadows"), t("统一的间距尺度与对齐线", "One spacing scale and shared alignment lines")], 2, "一致性比装饰更有效。", "Consistency beats decoration.", "视觉节奏", "Visual rhythm"),
    q("stage-practice-9", "一个区域用 Flex 排一行、另一个区域用 Grid 排网格，会冲突吗？", "One region lays out a row with Flex while another uses Grid. Do they conflict?", [t("不会，布局上下文以容器为单位", "No, layout context is per container"), t("会，整页只能有一种布局", "Yes, a page may use only one layout mode"), t("会，必须重写 HTML", "Yes, the HTML has to be rewritten")], 0, "布局上下文以容器为单位。", "Layout context is per container.", "作用域", "Scope"),
    q("stage-practice-10", "怎样判断一个布局任务算真正完成？", "How do you judge a layout task as truly finished?", [t("视觉上差不多就行", "It looks roughly right"), t("达成目标条件且各宽度下无溢出与错位", "Targets met with no overflow or misalignment at any width"), t("表面对齐就够了", "Surface alignment is enough")], 1, "验收标准要包含条件与多端。", "Acceptance needs conditions and widths.", "验收标准", "Acceptance criteria"),
  ],
};

const stageQuizData: Record<StageKey, Quiz> = {
  starter: { id: "stage-starter", kind: "stage", lessonIds: stageLessons.starter, questions: stageQuestionSets.starter },
  foundation: { id: "stage-foundation", kind: "stage", lessonIds: stageLessons.foundation, questions: stageQuestionSets.foundation },
  advanced: { id: "stage-advanced", kind: "stage", lessonIds: stageLessons.advanced, questions: stageQuestionSets.advanced },
  practice: { id: "stage-practice", kind: "stage", lessonIds: stageLessons.practice, questions: stageQuestionSets.practice },
};

/* 每题一句「为什么正确项是对的」：测验答对后与题库中显示 */
const rationales: Record<string, Copy> = {
  "structure-1": t("<main> 表示页面唯一的主内容区域；<header> 与 <footer> 只能描述页眉页脚，无法替代它。", "<main> marks the page's single main content region; <header> and <footer> only describe the banner and footer, so they cannot stand in for it."),
  "structure-2": t("块级盒子在正常流里逐个换行，所以默认纵向堆叠；横向并排需要额外的布局工具。", "Block boxes break to a new line in normal flow, so they stack vertically; side-by-side placement needs a layout tool."),
  "structure-3": t("max-width 限制行宽避免长行难读，margin-inline: auto 把两侧剩余空间均分，于是水平居中。", "max-width caps the line length and margin-inline: auto splits the leftover space on both sides, which centres the block."),
  "structure-4": t("语义元素本身就把区域角色告诉了辅助技术；全用 div 只能靠额外 ARIA 或视觉猜测补救。", "Semantic elements name the region for assistive technology by themselves; div-only markup relies on extra ARIA or guesswork."),
  "box-1": t("盒模型从内到外就是内容区、内边距、边框、外边距：padding 属于盒子自身，margin 在盒子之外。", "The box model runs content, padding, border, margin from the inside out: padding belongs to the box, margin sits outside it."),
  "box-2": t("content-box 下 width 只描述内容区，padding 会被加在声明宽度之外，所以总占用变宽。", "Under content-box width describes only the content area, so padding is added on top of the declared width and the box grows."),
  "box-3": t("border-box 让声明的 width 包含 padding 与 border，尺寸计算因此可预测、也少溢出。", "border-box makes the declared width include padding and border, which keeps sizing predictable and overflow rare."),
  "box-4": t("gap 由父布局统一管理、只在项目之间生效，不会像 margin 那样在首尾留下空白或被折叠。", "gap is owned by the parent and only sits between items; unlike margin it leaves no edge space and never collapses."),
  "flex-1": t("column 把主轴由水平改为垂直，项目因此沿纵向排列。", "column turns the main axis from horizontal to vertical, so items line up down the page."),
  "flex-2": t("justify-content 沿主轴分配剩余空间；负责交叉轴的是 align-items。", "justify-content distributes leftover space along the main axis, while align-items covers the cross axis."),
  "flex-3": t("gap 只在项目之间产生固定间距，首尾不会多出空白，比逐个写 margin 更可控。", "gap creates a fixed distance only between items, with no extra space at the ends, which is more controllable than per-child margins."),
  "flex-4": t("justify-content 永远跟随主轴；主轴改成垂直后，它控制的就是垂直方向。", "justify-content always follows the main axis: once the axis is vertical it controls the vertical direction."),
  "position-1": t("absolute 以最近的 position 非 static 祖先为参照，找不到时才退回初始包含块。", "An absolute element references the nearest ancestor whose position is not static, falling back to the initial containing block."),
  "position-2": t("父元素建立定位上下文后，absolute 子元素才会以它为参照被钉在卡片内部。", "Once the parent establishes a positioning context, the absolute child pins to it rather than to the page."),
  "position-3": t("z-index 决定同一层叠上下文内的绘制顺序，数值越大越靠上。", "z-index decides paint order inside one stacking context: the larger value sits on top."),
  "position-4": t("absolute 会脱离文档流、失去流内高度，内容一变就容易重叠，只在确实需要覆盖时才用。", "absolute leaves the flow and loses in-flow height, so content changes cause overlap; use it only when something truly must be overlaid."),
  "grid-1": t("列轨道由 grid-template-columns 定义，行轨道交给 grid-template-rows。", "Column tracks come from grid-template-columns; row tracks are grid-template-rows."),
  "grid-2": t("repeat(3, 1fr) 生成 3 条轨道，1fr 表示每条都分到一份等量的可用空间。", "repeat(3, 1fr) creates three tracks, and 1fr gives each an equal share of the free space."),
  "grid-3": t("网格按行自动放置，6 ÷ 3 = 2，所以形成两行。", "The grid auto-places row by row: 6 ÷ 3 = 2, so two rows."),
  "grid-4": t("gap 同时控制轨道之间与行之间；写两个值时是 gap: 行距 列距。", "gap controls track and row gutters together; with two values it reads gap: row column."),
  "responsive-1": t("断点应设在内容真正开始拥挤的位置，设备型号清单会随新品上市而过时。", "Breakpoints belong where content actually starts to crowd; a device list goes stale with every launch."),
  "responsive-2": t("空间不足时先重排内容关系（改单列），缩小字号只会牺牲可读性。", "When space runs out, reflow the relationship into one column first; shrinking type only trades away readability."),
  "responsive-3": t("媒体查询匹配的是视口条件；要按组件所在容器宽度响应，应改用容器查询。", "Media queries match viewport conditions; to respond to a component's own container you use a container query."),
  "responsive-4": t("让代码块在自身范围内滚动，页面宽度与其余内容都不受影响。", "Letting the block scroll internally keeps the page width and everything else intact."),
  "patterns-1": t("先看内容沿一条线还是一张网格——关系决定工具，而不是习惯。", "Check whether the content runs along a line or across a grid: the relationship picks the tool, not habit."),
  "patterns-2": t("一维排列是 Flexbox 的主场，导航项正需要一行分布。", "One-dimensional arrangement is Flexbox's home turf, which is exactly what a nav row needs."),
  "patterns-3": t("卡片区域要求行列同时对齐，正是 Grid 的二维能力。", "A card area needs rows and columns aligned together, which is Grid's two-dimensional strength."),
  "patterns-4": t("每个区域的关系不同，按区域分别选工具是正常且推荐的组合方式。", "Different regions have different relationships, so choosing per region is normal and recommended."),
  "final-1": t("分区图清楚之后，代码结构几乎是照抄下来的，后面每一步都更省力。", "Once the region map is clear the code structure is almost a transcription, which makes every later step cheaper."),
  "final-2": t("grid-template-areas 用字符地图描述整体结构，既直观又便于在断点处重排。", "grid-template-areas describes the whole structure as a character map: readable, and easy to rearrange at breakpoints."),
  "final-3": t("让主内容先出现符合阅读与操作顺序，而不是把侧栏挤成窄条。", "Letting the main content come first matches reading order instead of squeezing the aside into a sliver."),
  "final-4": t("验收要同时覆盖目标条件，以及多种宽度下的溢出、错位与焦点可见性。", "Acceptance covers the target conditions plus overflow, misalignment and visible focus at several widths."),
  "stage-starter-1": t("整页只有一个主内容区域，<main> 正是表达它的元素。", "A page has one main content region, and <main> is the element that says so."),
  "stage-starter-2": t("块级盒子的默认推进方向是纵向，所以相邻块级元素上下堆叠。", "Block boxes advance vertically by default, so neighbouring blocks stack."),
  "stage-starter-3": t("限制每行字符数等于给容器设宽度上限，而不是改字号。", "Capping characters per line means capping the container width, not the type size."),
  "stage-starter-4": t("content-box 下 width 只算内容区：280 + 2×2 = 284px。", "Under content-box width covers only the content: 280 + 2×2 = 284px."),
  "stage-starter-5": t("border-box 把 padding 与 border 计入声明宽度，加内边距不会改变总宽。", "border-box counts padding and border inside the declared width, so extra padding does not widen the box."),
  "stage-starter-6": t("由父布局统一管理间距，既不依赖每个子元素，也不会被折叠。", "The parent owns the spacing, so it depends on no child and never collapses."),
  "stage-starter-7": t("<nav> 直接声明这一区域的作用，辅助技术无需猜测。", "<nav> states what the region is, with no guessing for assistive tech."),
  "stage-starter-8": t("margin: auto 分配的是剩余空间，没有剩余空间就无法居中。", "margin: auto shares leftover space, so without leftover space nothing centres."),
  "stage-starter-9": t("先分清是尺寸计算问题还是可用空间不足，再改一处验证。", "Separate a sizing-model problem from a lack-of-space problem, then change one thing and verify."),
  "stage-starter-10": t("结构、测量宽度与间距是三件独立的事，组合起来才既清楚又好读。", "Structure, measure and spacing are three separate concerns; together they give clarity and readability."),
  "stage-foundation-1": t("column 负责改方向、reverse 负责反转顺序，两者叠加生效。", "column changes the direction and reverse flips the order; the two stack."),
  "stage-foundation-2": t("交叉轴对齐交给 align-items，主轴分配才用 justify-content。", "Cross-axis alignment belongs to align-items; justify-content handles the main axis."),
  "stage-foundation-3": t("space-between 把剩余空间全部推到中间，两端自然贴边。", "space-between pushes every bit of free space into the middle, leaving the ends flush."),
  "stage-foundation-4": t("需要伸展的一侧用 flex: 1，另一侧保持固定宽度即可。", "Give the growing side flex: 1 and keep the other at a fixed width."),
  "stage-foundation-5": t("wrap 允许放不下时换行，溢出因此不再发生。", "wrap lets the row break when it runs out of space, which removes the overflow."),
  "stage-foundation-6": t("absolute 需要最近的非 static 祖先作为参照，父容器通常用 relative 提供。", "absolute needs the nearest non-static ancestor as its reference, which relative usually provides."),
  "stage-foundation-7": t("覆盖顺序是层叠问题，由定位与 z-index 共同决定。", "Overlap order is a stacking question, decided by positioning together with z-index."),
  "stage-foundation-8": t("工具栏是一维排列，Flex 最直接，并自带对齐与间距控制。", "A toolbar is one-dimensional, so Flex is the direct choice and brings alignment and gaps with it."),
  "stage-foundation-9": t("布局上下文以容器为单位，同一页面里不同区域用不同工具完全正常。", "Layout context is per container, so mixing tools across regions is entirely normal."),
  "stage-foundation-10": t("justify-content 永远沿主轴工作；column 下主轴就是垂直方向。", "justify-content always works along the main axis, which under column is vertical."),
  "stage-advanced-1": t("列轨道由 grid-template-columns 定义，repeat(3, 1fr) 给出三条等宽轨道。", "Column tracks come from grid-template-columns, and repeat(3, 1fr) yields three equal ones."),
  "stage-advanced-2": t("自动放置按行推进，9 个项目分 3 列正好 3 行。", "Auto-placement fills row by row: nine items over three columns make three rows."),
  "stage-advanced-3": t("minmax 给出每条轨道的最小宽度，auto-fit 让轨道数量跟着可用宽度变化。", "minmax sets each track's minimum and auto-fit lets the track count follow the available width."),
  "stage-advanced-4": t("gap 一个属性同时控制轨道与行之间的间距。", "One gap covers both track and row gutters."),
  "stage-advanced-5": t("断点服务于内容；设备清单无法覆盖真实内容的行为。", "Breakpoints serve content; a device list cannot cover how real content behaves."),
  "stage-advanced-6": t("先改变内容关系（单列重排），而不是压缩字号或强制横向滚动。", "Change the relationship first — reflow to one column — instead of shrinking type or forcing sideways scrolling."),
  "stage-advanced-7": t("媒体查询只切换样式规则，不改变结构、也不加载别的资源。", "A media query only switches rules: it changes no markup and fetches nothing."),
  "stage-advanced-8": t("局部滚动把溢出限制在代码块内，整页宽度保持稳定。", "Local scrolling keeps the overflow inside the block, so page width stays stable."),
  "stage-advanced-9": t("每个区域按自己的关系响应：导航仍是一维，卡片区减少轨道即可。", "Each region responds on its own terms: the nav stays one-dimensional while the card area drops tracks."),
  "stage-advanced-10": t("auto-fit 的轨道数量跟着可用宽度走，固定列网格的列数是写死的。", "auto-fit's track count follows the available width, while a fixed grid hard-codes the count."),
  "stage-practice-1": t("布局从区域关系开始，颜色与动画都是后话。", "Layout starts with regions and their relationships; colour and animation come later."),
  "stage-practice-2": t("一维导航排列是 Flex 的标准用法。", "A one-dimensional nav row is textbook Flex."),
  "stage-practice-3": t("二维卡片墙需要行列同时控制，Grid 最合适。", "A two-dimensional card wall needs rows and columns controlled together, which is Grid."),
  "stage-practice-4": t("区域关系不同，工具组合使用才是正常做法。", "Regions differ, so combining tools is the normal approach."),
  "stage-practice-5": t("桌面通过不代表完成，还要在窄屏验证重排与溢出。", "Passing on desktop is not done: narrow widths must be checked for reflow and overflow."),
  "stage-practice-6": t("导航的可达性优先于“必须挤在一行”。", "Reachability beats forcing everything onto one row."),
  "stage-practice-7": t("页面边缘的留白属于容器，由它统一控制才有节奏。", "Edge spacing belongs to the container, and that is what gives the page rhythm."),
  "stage-practice-8": t("一致的尺度与对齐线比更多颜色和阴影更能带来秩序感。", "A consistent scale and shared alignment lines give order more than extra colour or shadow."),
  "stage-practice-9": t("布局上下文以容器为单位，混用 Flex 与 Grid 不会互相干扰。", "Layout context is per container, so mixing Flex and Grid does not interfere."),
  "stage-practice-10": t("验收意味着目标达成且各宽度下无溢出与错位，而不是“看起来差不多”。", "Acceptance means targets met and no overflow or misalignment at any width, not “close enough”."),
  "structure-find-1": t("间距应由 CSS 负责（一个方向的 margin，或父容器的 gap）。<br> 只是行内换行：它与段落 margin 叠加，让读屏多出停顿，也不会随文案变化而可预期地失效。正确做法是删掉 <br>，让间距只有一个来源。", "Spacing belongs to CSS — a one-directional margin or the parent's gap. A <br> is only a line break: it stacks with paragraph margins, adds pauses for screen readers and fails unpredictably when the copy changes. Delete the breaks so one source owns the spacing."),
  "box-find-1": t("box-sizing 默认是 content-box：width 只描述内容区，32px×2 的内边距与 2px×2 的边框额外叠加，于是 280 + 64 + 4 = 348px。全局设置 box-sizing: border-box 后，声明宽度才等于外框宽度。", "box-sizing defaults to content-box: width covers only the content area, so 2×32px padding and 2×2px border are added on top — 280 + 64 + 4 = 348px. With border-box set globally the declared width equals the border box."),
  "flex-find-1": t("margin 属于项目自身，最后一项后面照样占位，“总宽度”因此被多算 16px，居中整体左偏。改用容器的 gap: 16px，间距只出现在项目之间，不再参与首尾占位。", "A margin belongs to the item, so the last one still reserves space and the total width is 16px too large, pushing the centring left. Use gap: 16px on the container: spacing then sits only between items and never at the ends."),
  "position-find-1": t("sticky 的偏移相对最近的滚动容器解析。overflow: hidden 让 .list 成为滚动容器，top: 64px 于是被解释为“距容器顶部 64px”，正好一个导航高度。修法：不要在需要 sticky 的祖先上用 overflow 裁切，或把 sticky 元素移到没有滚动容器的层级。", "A sticky offset resolves against the nearest scroll container. overflow: hidden makes .list one, so top: 64px reads as “64px from that container's top” — exactly one navbar height. Do not clip an ancestor that needs sticky, or move the sticky element out of the scroll container."),
  "grid-find-1": t("命名区域必须是矩形：同名单元格要连成一块。第三行的 side 被 main 隔开，整条 grid-template-areas 因此在解析阶段被判为无效值并被忽略，连同行内的列定义一起失效，布局静默退回单列。改成 \"side main main\" 即可。", "Named areas must be rectangles: same-named cells have to join up. On the third row side is split by main, so the whole declaration is invalid and ignored, taking the column definition with it and leaving a silent single column. \"side main main\" fixes it."),
  "responsive-find-1": t("clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))。中间项 1.25rem 只相对根字号、与视口无关，结果因此恒定。让中间项含 vw 才有流式效果，例如 clamp(1rem, 0.5rem + 2vw, 2rem)，并在 DevTools 里拖动窗口确认计算值在变。", "clamp(MIN, VAL, MAX) equals max(MIN, min(VAL, MAX)). A middle term of 1.25rem tracks only the root font size, so the result is constant. Give it a vw component — clamp(1rem, 0.5rem + 2vw, 2rem) — and drag the window in DevTools to watch the computed value move."),
  "patterns-find-1": t("order 只改变弹性项目的排版顺序，不改 DOM、不改焦点顺序，也不改可访问性树。视觉上主按钮在前，Tab 却先落到次按钮上，WCAG 2.4.3 会判不通过。需要不同顺序时应直接调整 DOM。", "order changes only the layout order of flex items: the DOM, the focus order and the accessibility tree are untouched. The primary button looks first while Tab reaches the secondary one first, failing WCAG 2.4.3. Change the DOM when the order must change."),
  "final-find-1": t("100vh 按“可能的最大视口高度”计算，不随地址栏收起而变化，而布局已按这个高度固定，多出来的部分既不能收缩也不能上移。改成 min-height: 100dvh（跟随动态可视区域），中间行继续用 1fr 吸收剩余高度。", "100vh is computed from the largest possible viewport height and ignores the collapsing bar, while the layout is pinned to it — the surplus can neither shrink nor move up. Use min-height: 100dvh so the height follows the dynamic viewport and keep the middle row on 1fr."),
};

/* 逐题解析与测验数据分开维护：一处集中审阅，且新增题目时容易发现遗漏 */
const withRationale = (question: QuizQuestion): QuizQuestion => (rationales[question.id] ? { ...question, rationale: rationales[question.id] } : question);
const decorate = (quiz: Quiz): Quiz => ({ ...quiz, questions: quiz.questions.map(withRationale) });

export const chapterQuizzes: Record<string, Quiz> = Object.fromEntries(Object.entries(chapterQuizData).map(([id, quiz]) => [id, decorate(quiz)]));
export const stageQuizzes = Object.fromEntries(Object.entries(stageQuizData).map(([key, quiz]) => [key, decorate(quiz)])) as Record<StageKey, Quiz>;
