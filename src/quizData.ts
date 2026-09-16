import { t, type Copy, type StageKey } from "./data";

export type QuizQuestion = {
  id: string;
  prompt: Copy;
  options: Copy[];
  answer: number;
  hint: Copy;
  concept: Copy;
};

export type Quiz = {
  id: string;
  kind: "chapter" | "stage";
  lessonIds: string[];
  questions: QuizQuestion[];
};

const q = (id: string, zh: string, en: string, options: [Copy, Copy, Copy], answer: number, hintZh: string, hintEn: string, conceptZh: string, conceptEn: string): QuizQuestion => ({
  id,
  prompt: t(zh, en),
  options,
  answer,
  hint: t(hintZh, hintEn),
  concept: t(conceptZh, conceptEn),
});

const quiz = (lessonId: string, questions: QuizQuestion[]): Quiz => ({ id: `chapter-${lessonId}`, kind: "chapter", lessonIds: [lessonId], questions });

export const chapterQuizzes: Record<string, Quiz> = {
  "page-structure": quiz("page-structure", [
    q("structure-1", "哪个标签最适合承载页面的主要内容？", "Which element best contains the page's main content?", [t("<span>", "<span>"), t("<br>", "<br>"), t("<main>", "<main>")], 2, "先判断内容在整页中的语义角色。", "Start with the content's semantic role in the page.", "语义结构", "Semantic structure"),
    q("structure-2", "块级元素默认如何排列？", "How do block elements flow by default?", [t("始终在同一行", "Always stay on one line"), t("从上到下排列", "Stack from top to bottom"), t("全部重叠", "All overlap")], 1, "回想正常文档流中的纵向顺序。", "Recall the vertical order in normal flow.", "文档流", "Normal flow"),
    q("structure-3", "想让文章区域宽度受限并居中，优先使用哪组规则？", "Which rules should limit and center an article?", [t("max-width 与 margin-inline: auto", "max-width and margin-inline: auto"), t("position: absolute", "position: absolute"), t("连续插入 <br>", "Repeated <br> elements")], 0, "目标是限制宽度并分配两侧剩余空间。", "The goal is to cap width and distribute leftover side space.", "内容宽度", "Content width"),
    q("structure-4", "哪种做法最利于屏幕阅读器理解页面？", "Which approach best helps screen readers understand a page?", [t("全部使用 div", "Use div for everything"), t("用颜色区分区域", "Separate regions with color"), t("使用 header、main、footer", "Use header, main and footer")], 2, "辅助技术需要结构含义，而不只是视觉差异。", "Assistive technology needs structural meaning, not only visual differences.", "可访问性", "Accessibility"),
  ]),
  "box-model": quiz("box-model", [
    q("box-1", "标准盒模型从内到外的顺序是什么？", "What is the box model order from inside to outside?", [t("border、margin、content、padding", "border, margin, content, padding"), t("content、padding、border、margin", "content, padding, border, margin"), t("margin、content、padding、border", "margin, content, padding, border")], 1, "从文字所在的内容区开始向外观察。", "Start at the content area and move outward.", "盒模型", "Box model"),
    q("box-2", "在默认 content-box 下增加 padding，会发生什么？", "What happens when padding increases under content-box?", [t("盒子总占用宽度增加", "The total occupied width grows"), t("总宽度永远不变", "The total width never changes"), t("内容自动消失", "The content disappears")], 0, "声明的 width 此时只描述 content。", "The declared width describes only the content in this mode.", "尺寸计算", "Size calculation"),
    q("box-3", "哪条规则让 padding 计入声明宽度？", "Which rule includes padding in the declared width?", [t("display: inline", "display: inline"), t("overflow: visible", "overflow: visible"), t("box-sizing: border-box", "box-sizing: border-box")], 2, "寻找改变 width 计算边界的属性。", "Look for the property that changes the width calculation boundary.", "border-box", "border-box"),
    q("box-4", "两个相邻项目之间的固定间距优先用什么？", "What should create a fixed gap between adjacent items?", [t("font-weight", "font-weight"), t("gap", "gap"), t("color", "color")], 1, "它应由父布局统一管理，而不是改变文字。", "It should be managed by the parent layout, not by text styling.", "间距", "Spacing"),
  ]),
  flexbox: quiz("flexbox", [
    q("flex-1", "flex-direction: column 会把主轴改成什么方向？", "What direction does flex-direction: column give the main axis?", [t("垂直", "Vertical"), t("水平", "Horizontal"), t("没有主轴", "No main axis")], 0, "column 表示项目按列堆叠。", "Column means the items stack as a column.", "主轴", "Main axis"),
    q("flex-2", "哪个属性沿主轴分配剩余空间？", "Which property distributes free space on the main axis?", [t("align-items", "align-items"), t("font-size", "font-size"), t("justify-content", "justify-content")], 2, "先确认题目问的是主轴而不是交叉轴。", "Check that the question asks about the main axis, not the cross axis.", "空间分配", "Space distribution"),
    q("flex-3", "想让三个项目之间保持统一距离，应使用什么？", "What keeps a consistent distance between three items?", [t("text-align", "text-align"), t("gap", "gap"), t("z-index", "z-index")], 1, "寻找由 flex 容器统一控制的间距属性。", "Look for spacing controlled by the flex container.", "Flex 间距", "Flex spacing"),
    q("flex-4", "主轴改变后，justify-content 的作用会怎样？", "What happens to justify-content when the main axis changes?", [t("继续沿新的主轴生效", "It follows the new main axis"), t("固定控制水平方向", "It always controls horizontal alignment"), t("立即失效", "It stops working")], 0, "属性跟随轴线，而不是固定跟随屏幕方向。", "The property follows the axis, not a fixed screen direction.", "轴线关系", "Axis relationship"),
  ]),
  positioning: quiz("positioning", [
    q("position-1", "absolute 元素通常以谁为定位参照？", "What usually becomes the reference for an absolute element?", [t("任意文字行", "Any text line"), t("最后一个兄弟元素", "The last sibling"), t("最近的已定位祖先", "The nearest positioned ancestor")], 2, "向祖先方向寻找非 static 的定位上下文。", "Look upward for a non-static positioning context.", "定位参照", "Positioning reference"),
    q("position-2", "要把角标固定在卡片内部，卡片通常需要什么？", "What does a card usually need to contain an anchored badge?", [t("font-style: italic", "font-style: italic"), t("position: relative", "position: relative"), t("display: inline", "display: inline")], 1, "父元素需要建立定位上下文。", "The parent needs to establish a positioning context.", "相对定位", "Relative positioning"),
    q("position-3", "z-index 主要控制什么？", "What does z-index mainly control?", [t("重叠元素的前后层级", "The stacking order of overlapping elements"), t("文字大小", "Text size"), t("网格列数", "Grid column count")], 0, "它只在元素发生层叠时容易观察。", "It is easiest to observe when elements overlap.", "层叠", "Stacking"),
    q("position-4", "什么时候不应优先使用 absolute？", "When should absolute positioning not be the first choice?", [t("角标需要覆盖卡片角落时", "When a badge overlays a card corner"), t("弹层需要覆盖内容时", "When an overlay must cover content"), t("普通内容需要自然撑开页面时", "When normal content should grow the page")], 2, "考虑元素是否还应该参与正常文档流。", "Consider whether the element should remain in normal flow.", "定位边界", "Positioning boundaries"),
  ]),
  grid: quiz("grid", [
    q("grid-1", "哪个属性定义网格列轨道？", "Which property defines grid column tracks?", [t("position", "position"), t("grid-template-columns", "grid-template-columns"), t("justify-content", "justify-content")], 1, "寻找名称中直接包含 columns 的网格属性。", "Look for the grid property that names columns directly.", "网格轨道", "Grid tracks"),
    q("grid-2", "repeat(3, 1fr) 表示什么？", "What does repeat(3, 1fr) mean?", [t("三条等宽列轨道", "Three equal column tracks"), t("三个重叠元素", "Three overlapping elements"), t("三行文字", "Three lines of text")], 0, "fr 分配的是网格容器中的可用空间。", "fr distributes available space in a grid container.", "fr 单位", "fr unit"),
    q("grid-3", "六个项目放进三列网格，通常形成几行？", "How many rows do six items usually form in a three-column grid?", [t("一行", "One row"), t("六行", "Six rows"), t("两行", "Two rows")], 2, "用项目总数除以每行容量。", "Divide the item count by the row capacity.", "自动放置", "Auto placement"),
    q("grid-4", "想改变网格轨道之间的距离，应调整什么？", "What changes the distance between grid tracks?", [t("line-height", "line-height"), t("gap", "gap"), t("color", "color")], 1, "目标是轨道之间的沟槽，而不是项目内部。", "The target is the gutter between tracks, not inside an item.", "网格间距", "Grid gap"),
  ]),
  responsive: quiz("responsive", [
    q("responsive-1", "响应式断点应由什么决定？", "What should determine a responsive breakpoint?", [t("内容开始无法正常呈现的位置", "Where content stops working"), t("手机品牌", "The phone brand"), t("随意选择的整数", "A random integer")], 0, "观察布局，而不是设备型号。", "Observe the layout rather than the device model.", "断点", "Breakpoints"),
    q("responsive-2", "双栏在窄屏空间不足时，优先怎么处理？", "What should a cramped two-column layout do first?", [t("强制撑宽页面", "Force the page wider"), t("把文字缩到不可读", "Shrink text until unreadable"), t("重排为单列", "Reflow into one column")], 2, "保持内容可读比保持原列数更重要。", "Readable content matters more than preserving the column count.", "内容重排", "Content reflow"),
    q("responsive-3", "媒体查询主要根据什么应用不同规则？", "What does a media query use to apply different rules?", [t("文字颜色", "Text color"), t("环境或视口条件", "Environment or viewport conditions"), t("HTML 标签数量", "The number of HTML tags")], 1, "它判断的是外部呈现条件。", "It evaluates external presentation conditions.", "媒体查询", "Media queries"),
    q("responsive-4", "移动端代码块过宽时，较合适的处理是什么？", "What is a good way to handle an overly wide code block on mobile?", [t("只让代码块横向滚动", "Let only the code block scroll horizontally"), t("让整页横向滚动", "Make the whole page scroll horizontally"), t("删除所有代码", "Delete all code")], 0, "溢出应被限制在产生溢出的组件内。", "Contain overflow inside the component that creates it.", "溢出控制", "Overflow control"),
  ]),
  patterns: quiz("patterns", [
    q("patterns-1", "选择布局工具前最先看什么？", "What should you inspect before choosing a layout tool?", [t("当前流行效果", "The current visual trend"), t("颜色数量", "The number of colors"), t("内容之间的关系", "Relationships between content")], 2, "布局工具服务于结构关系。", "Layout tools serve structural relationships.", "布局选择", "Layout choice"),
    q("patterns-2", "一维导航排列通常优先使用什么？", "What is usually best for one-dimensional navigation?", [t("连续空格", "Repeated spaces"), t("Flexbox", "Flexbox"), t("绝对定位每一项", "Absolute positioning for every item")], 1, "它主要处理一条轴线上的排列和分布。", "It mainly handles arrangement and distribution on one axis.", "一维布局", "One-dimensional layout"),
    q("patterns-3", "二维卡片区域通常优先使用什么？", "What is usually best for a two-dimensional card area?", [t("Grid", "Grid"), t("<br>", "<br>"), t("z-index", "z-index")], 0, "同时考虑行和列时，选择二维布局工具。", "Choose a two-dimensional tool when rows and columns both matter.", "二维布局", "Two-dimensional layout"),
    q("patterns-4", "页面区域使用不同布局工具是否合理？", "Is it reasonable for page regions to use different layout tools?", [t("不合理，整页只能使用一种", "No, a page may use only one"), t("只有深色页面可以", "Only on dark pages"), t("合理，应按各区域关系选择", "Yes, choose by each region's relationship")], 2, "整页由多个职责不同的区域组成。", "A page contains regions with different responsibilities.", "组合布局", "Composed layouts"),
  ]),
  "final-challenge": quiz("final-challenge", [
    q("final-1", "构建完整页面时，第一步通常是什么？", "What is usually the first step in building a full page?", [t("随机选择断点", "Pick random breakpoints"), t("划分主要内容区域", "Divide the main content regions"), t("先写所有动画", "Write every animation first")], 1, "先建立骨架，再处理区域内部。", "Build the shell before the regions inside it.", "页面骨架", "Page shell"),
    q("final-2", "导航、主内容、侧栏和页脚适合由什么统一组织？", "What can organize navigation, main, aside and footer together?", [t("页面级 Grid", "A page-level Grid"), t("文字颜色", "Text color"), t("每块都绝对定位", "Absolute positioning for every region")], 0, "这里同时存在行和列的区域关系。", "The shell contains both row and column relationships.", "页面网格", "Page grid"),
    q("final-3", "窄屏下侧栏最合理的变化是什么？", "What is the most reasonable narrow-screen change for an aside?", [t("覆盖主内容", "Cover the main content"), t("始终保持固定宽度", "Always keep a fixed width"), t("移到主内容下方", "Move below the main content")], 2, "优先保持阅读顺序与可用宽度。", "Preserve reading order and usable width first.", "响应式重排", "Responsive reflow"),
    q("final-4", "如何判断布局挑战是否真正完成？", "How should a layout challenge be considered complete?", [t("只要桌面端不报错", "As long as desktop shows no error"), t("区域、间距和窄屏行为都满足目标", "Regions, spacing and narrow-screen behavior all meet the target"), t("只要颜色好看", "As long as the colors look good")], 1, "完整页面需要同时检查结构和多端表现。", "A complete page needs structural and multi-device checks.", "综合验收", "Integrated verification"),
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

export const stageQuizzes: Record<StageKey, Quiz> = {
  starter: { id: "stage-starter", kind: "stage", lessonIds: stageLessons.starter, questions: stageQuestionSets.starter },
  foundation: { id: "stage-foundation", kind: "stage", lessonIds: stageLessons.foundation, questions: stageQuestionSets.foundation },
  advanced: { id: "stage-advanced", kind: "stage", lessonIds: stageLessons.advanced, questions: stageQuestionSets.advanced },
  practice: { id: "stage-practice", kind: "stage", lessonIds: stageLessons.practice, questions: stageQuestionSets.practice },
};
