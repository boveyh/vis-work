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
    q("structure-1", "哪个标签最适合承载页面的主要内容？", "Which element best contains the page's main content?", [t("<main>", "<main>"), t("<span>", "<span>"), t("<br>", "<br>")], 0, "先判断内容在整页中的语义角色。", "Start with the content's semantic role in the page.", "语义结构", "Semantic structure"),
    q("structure-2", "块级元素默认如何排列？", "How do block elements flow by default?", [t("从上到下排列", "Stack from top to bottom"), t("全部重叠", "All overlap"), t("始终在同一行", "Always stay on one line")], 0, "回想正常文档流中的纵向顺序。", "Recall the vertical order in normal flow.", "文档流", "Normal flow"),
    q("structure-3", "想让文章区域宽度受限并居中，优先使用哪组规则？", "Which rules should limit and center an article?", [t("max-width 与 margin-inline: auto", "max-width and margin-inline: auto"), t("position: absolute", "position: absolute"), t("连续插入 <br>", "Repeated <br> elements")], 0, "目标是限制宽度并分配两侧剩余空间。", "The goal is to cap width and distribute leftover side space.", "内容宽度", "Content width"),
    q("structure-4", "哪种做法最利于屏幕阅读器理解页面？", "Which approach best helps screen readers understand a page?", [t("使用 header、main、footer", "Use header, main and footer"), t("全部使用 div", "Use div for everything"), t("用颜色区分区域", "Separate regions with color")], 0, "辅助技术需要结构含义，而不只是视觉差异。", "Assistive technology needs structural meaning, not only visual differences.", "可访问性", "Accessibility"),
  ]),
  "box-model": quiz("box-model", [
    q("box-1", "标准盒模型从内到外的顺序是什么？", "What is the box model order from inside to outside?", [t("content、padding、border、margin", "content, padding, border, margin"), t("margin、content、padding、border", "margin, content, padding, border"), t("border、margin、content、padding", "border, margin, content, padding")], 0, "从文字所在的内容区开始向外观察。", "Start at the content area and move outward.", "盒模型", "Box model"),
    q("box-2", "在默认 content-box 下增加 padding，会发生什么？", "What happens when padding increases under content-box?", [t("盒子总占用宽度增加", "The total occupied width grows"), t("总宽度永远不变", "The total width never changes"), t("内容自动消失", "The content disappears")], 0, "声明的 width 此时只描述 content。", "The declared width describes only the content in this mode.", "尺寸计算", "Size calculation"),
    q("box-3", "哪条规则让 padding 计入声明宽度？", "Which rule includes padding in the declared width?", [t("box-sizing: border-box", "box-sizing: border-box"), t("display: inline", "display: inline"), t("overflow: visible", "overflow: visible")], 0, "寻找改变 width 计算边界的属性。", "Look for the property that changes the width calculation boundary.", "border-box", "border-box"),
    q("box-4", "两个相邻项目之间的固定间距优先用什么？", "What should create a fixed gap between adjacent items?", [t("gap", "gap"), t("color", "color"), t("font-weight", "font-weight")], 0, "它应由父布局统一管理，而不是改变文字。", "It should be managed by the parent layout, not by text styling.", "间距", "Spacing"),
  ]),
  flexbox: quiz("flexbox", [
    q("flex-1", "flex-direction: column 会把主轴改成什么方向？", "What direction does flex-direction: column give the main axis?", [t("垂直", "Vertical"), t("水平", "Horizontal"), t("没有主轴", "No main axis")], 0, "column 表示项目按列堆叠。", "Column means the items stack as a column.", "主轴", "Main axis"),
    q("flex-2", "哪个属性沿主轴分配剩余空间？", "Which property distributes free space on the main axis?", [t("justify-content", "justify-content"), t("align-items", "align-items"), t("font-size", "font-size")], 0, "先确认题目问的是主轴而不是交叉轴。", "Check that the question asks about the main axis, not the cross axis.", "空间分配", "Space distribution"),
    q("flex-3", "想让三个项目之间保持统一距离，应使用什么？", "What keeps a consistent distance between three items?", [t("gap", "gap"), t("z-index", "z-index"), t("text-align", "text-align")], 0, "寻找由 flex 容器统一控制的间距属性。", "Look for spacing controlled by the flex container.", "Flex 间距", "Flex spacing"),
    q("flex-4", "主轴改变后，justify-content 的作用会怎样？", "What happens to justify-content when the main axis changes?", [t("继续沿新的主轴生效", "It follows the new main axis"), t("固定控制水平方向", "It always controls horizontal alignment"), t("立即失效", "It stops working")], 0, "属性跟随轴线，而不是固定跟随屏幕方向。", "The property follows the axis, not a fixed screen direction.", "轴线关系", "Axis relationship"),
  ]),
  positioning: quiz("positioning", [
    q("position-1", "absolute 元素通常以谁为定位参照？", "What usually becomes the reference for an absolute element?", [t("最近的已定位祖先", "The nearest positioned ancestor"), t("任意文字行", "Any text line"), t("最后一个兄弟元素", "The last sibling")], 0, "向祖先方向寻找非 static 的定位上下文。", "Look upward for a non-static positioning context.", "定位参照", "Positioning reference"),
    q("position-2", "要把角标固定在卡片内部，卡片通常需要什么？", "What does a card usually need to contain an anchored badge?", [t("position: relative", "position: relative"), t("display: inline", "display: inline"), t("font-style: italic", "font-style: italic")], 0, "父元素需要建立定位上下文。", "The parent needs to establish a positioning context.", "相对定位", "Relative positioning"),
    q("position-3", "z-index 主要控制什么？", "What does z-index mainly control?", [t("重叠元素的前后层级", "The stacking order of overlapping elements"), t("文字大小", "Text size"), t("网格列数", "Grid column count")], 0, "它只在元素发生层叠时容易观察。", "It is easiest to observe when elements overlap.", "层叠", "Stacking"),
    q("position-4", "什么时候不应优先使用 absolute？", "When should absolute positioning not be the first choice?", [t("普通内容需要自然撑开页面时", "When normal content should grow the page"), t("角标需要覆盖卡片角落时", "When a badge overlays a card corner"), t("弹层需要覆盖内容时", "When an overlay must cover content")], 0, "考虑元素是否还应该参与正常文档流。", "Consider whether the element should remain in normal flow.", "定位边界", "Positioning boundaries"),
  ]),
  grid: quiz("grid", [
    q("grid-1", "哪个属性定义网格列轨道？", "Which property defines grid column tracks?", [t("grid-template-columns", "grid-template-columns"), t("justify-content", "justify-content"), t("position", "position")], 0, "寻找名称中直接包含 columns 的网格属性。", "Look for the grid property that names columns directly.", "网格轨道", "Grid tracks"),
    q("grid-2", "repeat(3, 1fr) 表示什么？", "What does repeat(3, 1fr) mean?", [t("三条等宽列轨道", "Three equal column tracks"), t("三个重叠元素", "Three overlapping elements"), t("三行文字", "Three lines of text")], 0, "fr 分配的是网格容器中的可用空间。", "fr distributes available space in a grid container.", "fr 单位", "fr unit"),
    q("grid-3", "六个项目放进三列网格，通常形成几行？", "How many rows do six items usually form in a three-column grid?", [t("两行", "Two rows"), t("一行", "One row"), t("六行", "Six rows")], 0, "用项目总数除以每行容量。", "Divide the item count by the row capacity.", "自动放置", "Auto placement"),
    q("grid-4", "想改变网格轨道之间的距离，应调整什么？", "What changes the distance between grid tracks?", [t("gap", "gap"), t("color", "color"), t("line-height", "line-height")], 0, "目标是轨道之间的沟槽，而不是项目内部。", "The target is the gutter between tracks, not inside an item.", "网格间距", "Grid gap"),
  ]),
  responsive: quiz("responsive", [
    q("responsive-1", "响应式断点应由什么决定？", "What should determine a responsive breakpoint?", [t("内容开始无法正常呈现的位置", "Where content stops working"), t("手机品牌", "The phone brand"), t("随意选择的整数", "A random integer")], 0, "观察布局，而不是设备型号。", "Observe the layout rather than the device model.", "断点", "Breakpoints"),
    q("responsive-2", "双栏在窄屏空间不足时，优先怎么处理？", "What should a cramped two-column layout do first?", [t("重排为单列", "Reflow into one column"), t("强制撑宽页面", "Force the page wider"), t("把文字缩到不可读", "Shrink text until unreadable")], 0, "保持内容可读比保持原列数更重要。", "Readable content matters more than preserving the column count.", "内容重排", "Content reflow"),
    q("responsive-3", "媒体查询主要根据什么应用不同规则？", "What does a media query use to apply different rules?", [t("环境或视口条件", "Environment or viewport conditions"), t("HTML 标签数量", "The number of HTML tags"), t("文字颜色", "Text color")], 0, "它判断的是外部呈现条件。", "It evaluates external presentation conditions.", "媒体查询", "Media queries"),
    q("responsive-4", "移动端代码块过宽时，较合适的处理是什么？", "What is a good way to handle an overly wide code block on mobile?", [t("只让代码块横向滚动", "Let only the code block scroll horizontally"), t("让整页横向滚动", "Make the whole page scroll horizontally"), t("删除所有代码", "Delete all code")], 0, "溢出应被限制在产生溢出的组件内。", "Contain overflow inside the component that creates it.", "溢出控制", "Overflow control"),
  ]),
  patterns: quiz("patterns", [
    q("patterns-1", "选择布局工具前最先看什么？", "What should you inspect before choosing a layout tool?", [t("内容之间的关系", "Relationships between content"), t("当前流行效果", "The current visual trend"), t("颜色数量", "The number of colors")], 0, "布局工具服务于结构关系。", "Layout tools serve structural relationships.", "布局选择", "Layout choice"),
    q("patterns-2", "一维导航排列通常优先使用什么？", "What is usually best for one-dimensional navigation?", [t("Flexbox", "Flexbox"), t("绝对定位每一项", "Absolute positioning for every item"), t("连续空格", "Repeated spaces")], 0, "它主要处理一条轴线上的排列和分布。", "It mainly handles arrangement and distribution on one axis.", "一维布局", "One-dimensional layout"),
    q("patterns-3", "二维卡片区域通常优先使用什么？", "What is usually best for a two-dimensional card area?", [t("Grid", "Grid"), t("<br>", "<br>"), t("z-index", "z-index")], 0, "同时考虑行和列时，选择二维布局工具。", "Choose a two-dimensional tool when rows and columns both matter.", "二维布局", "Two-dimensional layout"),
    q("patterns-4", "页面区域使用不同布局工具是否合理？", "Is it reasonable for page regions to use different layout tools?", [t("合理，应按各区域关系选择", "Yes, choose by each region's relationship"), t("不合理，整页只能使用一种", "No, a page may use only one"), t("只有深色页面可以", "Only on dark pages")], 0, "整页由多个职责不同的区域组成。", "A page contains regions with different responsibilities.", "组合布局", "Composed layouts"),
  ]),
  "final-challenge": quiz("final-challenge", [
    q("final-1", "构建完整页面时，第一步通常是什么？", "What is usually the first step in building a full page?", [t("划分主要内容区域", "Divide the main content regions"), t("先写所有动画", "Write every animation first"), t("随机选择断点", "Pick random breakpoints")], 0, "先建立骨架，再处理区域内部。", "Build the shell before the regions inside it.", "页面骨架", "Page shell"),
    q("final-2", "导航、主内容、侧栏和页脚适合由什么统一组织？", "What can organize navigation, main, aside and footer together?", [t("页面级 Grid", "A page-level Grid"), t("文字颜色", "Text color"), t("每块都绝对定位", "Absolute positioning for every region")], 0, "这里同时存在行和列的区域关系。", "The shell contains both row and column relationships.", "页面网格", "Page grid"),
    q("final-3", "窄屏下侧栏最合理的变化是什么？", "What is the most reasonable narrow-screen change for an aside?", [t("移到主内容下方", "Move below the main content"), t("覆盖主内容", "Cover the main content"), t("始终保持固定宽度", "Always keep a fixed width")], 0, "优先保持阅读顺序与可用宽度。", "Preserve reading order and usable width first.", "响应式重排", "Responsive reflow"),
    q("final-4", "如何判断布局挑战是否真正完成？", "How should a layout challenge be considered complete?", [t("区域、间距和窄屏行为都满足目标", "Regions, spacing and narrow-screen behavior all meet the target"), t("只要颜色好看", "As long as the colors look good"), t("只要桌面端不报错", "As long as desktop shows no error")], 0, "完整页面需要同时检查结构和多端表现。", "A complete page needs structural and multi-device checks.", "综合验收", "Integrated verification"),
  ]),
};

const stageLessons: Record<StageKey, [string, string]> = {
  starter: ["page-structure", "box-model"],
  foundation: ["flexbox", "positioning"],
  advanced: ["grid", "responsive"],
  practice: ["patterns", "final-challenge"],
};

const stageExtras: Record<StageKey, QuizQuestion[]> = {
  starter: [
    q("starter-extra-1", "文章卡片设置 width 后因 padding 变宽，最直接的修正是什么？", "A fixed-width article card grows because of padding. What is the direct fix?", [t("使用 border-box", "Use border-box"), t("删除 main", "Remove main"), t("改成 absolute", "Make it absolute")], 0, "把语义结构与尺寸计算分开考虑。", "Treat semantic structure and size calculation separately.", "结构与盒模型", "Structure and box model"),
    q("starter-extra-2", "哪组方案同时保证结构清晰和内容居中？", "Which combination gives both clear structure and centered content?", [t("语义标签 + max-width", "Semantic elements + max-width"), t("全用 span + z-index", "Only spans + z-index"), t("连续 br + 固定高度", "Repeated br + fixed height")], 0, "一个解决含义，一个解决几何范围。", "One solves meaning; the other solves geometric width.", "基础组合", "Foundation combination"),
  ],
  foundation: [
    q("foundation-extra-1", "导航项目需要一行分布，角标需要覆盖卡片，应如何组合？", "Navigation items need one-row distribution while a badge overlays a card. What combination fits?", [t("导航用 Flex，角标用定位", "Flex for navigation, positioning for the badge"), t("全部用 absolute", "Use absolute for everything"), t("全部用文字空格", "Use text spaces for everything")], 0, "两个区域的关系不同，可以使用不同工具。", "The two relationships differ and may use different tools.", "Flex 与定位", "Flex and positioning"),
    q("foundation-extra-2", "flex-direction 改变后，角标的定位参照会自动改变吗？", "Does changing flex-direction automatically change a badge's positioning reference?", [t("不会，定位上下文独立决定", "No, the positioning context decides independently"), t("会，永远改成页面", "Yes, it always becomes the page"), t("会，改成文字行", "Yes, it becomes the text line")], 0, "分别判断弹性轴线和定位上下文。", "Evaluate the flex axes and positioning context separately.", "布局机制边界", "Layout mechanism boundaries"),
  ],
  advanced: [
    q("advanced-extra-1", "三列卡片在窄屏放不下时，优先调整什么？", "What should change first when a three-column card grid no longer fits?", [t("在断点处减少列数", "Reduce columns at a breakpoint"), t("强制缩小所有文字", "Force all text smaller"), t("增加页面最小宽度", "Increase the page minimum width")], 0, "保持卡片可读，调整网格结构。", "Keep cards readable by changing the grid structure.", "Grid 响应式", "Responsive Grid"),
    q("advanced-extra-2", "auto-fit 一类响应式网格解决的核心问题是什么？", "What core problem does an auto-fit style grid solve?", [t("根据可用空间自动安排列", "Arrange columns from available space"), t("改变文字内容", "Change text content"), t("控制层叠顺序", "Control stacking order")], 0, "关注轨道数量与可用宽度的关系。", "Focus on track count relative to available width.", "自适应轨道", "Adaptive tracks"),
  ],
  practice: [
    q("practice-extra-1", "完整页面同时有导航、卡片流和角标时，应如何选择工具？", "How should a page with navigation, a card grid and badges choose tools?", [t("按区域分别使用 Flex、Grid 和定位", "Use Flex, Grid and positioning by region"), t("整页只用 absolute", "Use only absolute positioning"), t("整页只用一种工具", "Use one tool for everything")], 0, "先拆分区域，再判断每个区域的关系。", "Split the regions, then judge each relationship.", "工具组合", "Tool composition"),
    q("practice-extra-2", "完成桌面布局后，下一项必要检查是什么？", "What is the next required check after a desktop layout works?", [t("验证窄屏重排和溢出", "Verify narrow-screen reflow and overflow"), t("只更换配色", "Only change the colors"), t("删除语义标签", "Remove semantic elements")], 0, "完整验收不能只覆盖一种宽度。", "Complete verification cannot cover only one width.", "多端验收", "Multi-device verification"),
  ],
};

const makeStageQuiz = (stage: StageKey): Quiz => {
  const lessonIds = stageLessons[stage];
  return {
    id: `stage-${stage}`,
    kind: "stage",
    lessonIds,
    questions: [...chapterQuizzes[lessonIds[0]].questions, ...chapterQuizzes[lessonIds[1]].questions, ...stageExtras[stage]],
  };
};

export const stageQuizzes: Record<StageKey, Quiz> = {
  starter: makeStageQuiz("starter"),
  foundation: makeStageQuiz("foundation"),
  advanced: makeStageQuiz("advanced"),
  practice: makeStageQuiz("practice"),
};
