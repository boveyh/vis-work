/* 概念图解：内联 SVG，零依赖、跟随主题变量（.fig-* 类在 styles.css 里定义）。
   每个图的 viewBox 固定 560×240，容器按宽度自适应缩放。 */
const VB = 'viewBox="0 0 560 240" role="img" xmlns="http://www.w3.org/2000/svg"';

export const FIGURES: Record<string, { svg: string; label: { zh: string; en: string } }> = {
  /* 页面区域与 landmark：区域不是装饰，而是可访问性导航的锚点 */
  "landmark-map": {
    label: { zh: "页面区域与 landmark", en: "Page regions and landmarks" },
    svg: `<svg ${VB}>
      <rect class="fig-box" x="20" y="20" width="520" height="52" rx="8" />
      <text class="fig-text" x="36" y="52">&lt;header&gt;</text>
      <text class="fig-muted" x="140" y="52">banner · 站点标识与主导航</text>
      <rect class="fig-accent" x="20" y="84" width="330" height="104" rx="8" />
      <text class="fig-text" x="36" y="116">&lt;main&gt;</text>
      <text class="fig-muted" x="120" y="116">main · 每页唯一</text>
      <rect class="fig-box" x="366" y="84" width="174" height="104" rx="8" />
      <text class="fig-text" x="382" y="116">&lt;aside&gt;</text>
      <text class="fig-muted" x="382" y="140">complementary</text>
      <rect class="fig-box" x="20" y="200" width="520" height="24" rx="6" />
      <text class="fig-muted" x="36" y="217">&lt;footer&gt; · contentinfo</text>
      <text class="fig-note" x="20" y="16">读屏器可在这些区域之间直接跳转</text>
    </svg>`,
  },
  /* 块级盒占满一行，行内盒只占内容宽度 */
  "block-vs-inline": {
    label: { zh: "块级盒与行内盒", en: "Block box versus inline box" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="26">display: block</text>
      <rect class="fig-accent" x="20" y="36" width="520" height="34" rx="6" />
      <text class="fig-text" x="34" y="58">占满可用宽度，可设宽高，垂直堆叠</text>
      <rect class="fig-accent" x="20" y="78" width="520" height="34" rx="6" />
      <text class="fig-text" x="34" y="100">margin-inline: auto 才有剩余空间可分配</text>
      <text class="fig-muted" x="20" y="146">display: inline</text>
      <rect class="fig-box" x="20" y="156" width="520" height="40" rx="6" />
      <rect class="fig-navy" x="40" y="162" width="72" height="28" rx="4" />
      <text class="fig-text" x="52" y="181">行内盒</text>
      <rect class="fig-navy" x="124" y="162" width="96" height="28" rx="4" />
      <text class="fig-text" x="136" y="181">宽度=内容</text>
      <text class="fig-muted" x="236" y="181">height 不适用、上下 margin 不影响行高</text>
      <text class="fig-note" x="20" y="222">行内盒与文字共用一条行盒基线，行高由 line-height 决定</text>
    </svg>`,
  },
  /* 盒模型四层 */
  "box-layers": {
    label: { zh: "盒模型的四层", en: "The four layers of a box" },
    svg: `<svg ${VB}>
      <rect class="fig-dash" x="30" y="24" width="500" height="192" rx="10" />
      <text class="fig-muted" x="42" y="46">margin · 盒外，垂直方向可能折叠</text>
      <rect class="fig-navy" x="86" y="56" width="388" height="128" rx="8" />
      <text class="fig-muted" x="98" y="76">border · 参与占位</text>
      <rect class="fig-accent" x="130" y="86" width="300" height="80" rx="6" />
      <text class="fig-muted" x="142" y="106">padding · 被背景覆盖，撑大盒子</text>
      <rect class="fig-surface" x="180" y="112" width="200" height="40" rx="4" />
      <text class="fig-text" x="230" y="137">content</text>
      <text class="fig-note" x="330" y="200">width 描述哪一层，取决于 box-sizing</text>
    </svg>`,
  },
  /* 外边距折叠：24 + 24 = 24 */
  "margin-collapse": {
    label: { zh: "相邻外边距折叠", en: "Adjacent margins collapse" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="26">两个相邻块级元素</text>
      <rect class="fig-surface" x="20" y="36" width="220" height="52" rx="6" />
      <text class="fig-text" x="34" y="68">上一段 margin-bottom: 24px</text>
      <rect class="fig-surface" x="20" y="140" width="220" height="52" rx="6" />
      <text class="fig-text" x="34" y="172">下一段 margin-top: 24px</text>
      <rect class="fig-accent" x="20" y="88" width="220" height="52" rx="0" />
      <text class="fig-text" x="52" y="118">实际间距 = max(24, 24) = 24</text>
      <path class="fig-arrow" d="M264 62 L264 140" />
      <text class="fig-note" x="286" y="96">折叠的是“不影响布局的空白”</text>
      <text class="fig-note" x="286" y="120">要精确间距：用 gap 或单方向 margin</text>
      <path class="fig-arrow" d="M300 170 L300 190" />
      <text class="fig-muted" x="316" y="186">父子之间也会折叠（中间无 border/padding/新 FC）</text>
    </svg>`,
  },
  /* 主轴与交叉轴：方向一换，两个属性交换作用轴 */
  "flex-axes": {
    label: { zh: "主轴与交叉轴", en: "Main axis and cross axis" },
    svg: `<svg ${VB}>
      <rect class="fig-dash" x="20" y="30" width="520" height="80" rx="8" />
      <text class="fig-muted" x="32" y="52">flex-direction: row（默认）</text>
      <rect class="fig-accent" x="40" y="62" width="110" height="36" rx="6" />
      <rect class="fig-accent" x="166" y="62" width="110" height="36" rx="6" />
      <rect class="fig-accent" x="292" y="62" width="110" height="36" rx="6" />
      <path class="fig-arrow" d="M40 116 L402 116" />
      <text class="fig-text" x="410" y="120">主轴 · justify-content</text>
      <path class="fig-arrow" d="M500 62 L500 100" />
      <text class="fig-text" x="512" y="82">交叉轴</text>
      <text class="fig-muted" x="440" y="140">align-items</text>
      <rect class="fig-dash" x="20" y="160" width="240" height="66" rx="8" />
      <text class="fig-muted" x="32" y="180">flex-direction: column</text>
      <rect class="fig-navy" x="36" y="188" width="208" height="14" rx="4" />
      <rect class="fig-navy" x="36" y="206" width="208" height="14" rx="4" />
      <path class="fig-arrow" d="M276 192 L276 220" />
      <text class="fig-text" x="288" y="212">主轴变为纵向：</text>
      <text class="fig-muted" x="288" y="230">justify-content 现在控制上下</text>
    </svg>`,
  },
  /* gap 与 margin 的归属差别 */
  "gap-vs-margin": {
    label: { zh: "gap 与 margin 的差别", en: "gap versus margin" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="26">用 margin-right 拼间距</text>
      <rect class="fig-box" x="20" y="36" width="520" height="56" rx="6" />
      <rect class="fig-surface" x="36" y="48" width="88" height="32" rx="4" />
      <rect class="fig-margin" x="124" y="48" width="16" height="32" />
      <rect class="fig-surface" x="140" y="48" width="88" height="32" rx="4" />
      <rect class="fig-margin" x="228" y="48" width="16" height="32" />
      <rect class="fig-surface" x="244" y="48" width="88" height="32" rx="4" />
      <rect class="fig-margin-warn" x="332" y="48" width="16" height="32" />
      <text class="fig-note" x="360" y="68">末项仍占位 → 居中会偏左</text>
      <text class="fig-muted" x="20" y="126">用容器 gap: 16px</text>
      <rect class="fig-box" x="20" y="136" width="520" height="56" rx="6" />
      <rect class="fig-surface" x="36" y="148" width="88" height="32" rx="4" />
      <rect class="fig-gap" x="124" y="148" width="16" height="32" />
      <rect class="fig-surface" x="140" y="148" width="88" height="32" rx="4" />
      <rect class="fig-gap" x="228" y="148" width="16" height="32" />
      <rect class="fig-surface" x="244" y="148" width="88" height="32" rx="4" />
      <text class="fig-note" x="342" y="168">首尾不留白，间距只属于容器</text>
      <text class="fig-note" x="20" y="220">差别不在“好不好看”，而在占位是否参与剩余空间分配</text>
    </svg>`,
  },
  /* 包含块：absolute 参照的是最近已定位祖先的内边距盒 */
  "containing-block": {
    label: { zh: "包含块决定参照物", en: "The containing block decides the reference" },
    svg: `<svg ${VB}>
      <rect class="fig-dash" x="20" y="24" width="520" height="192" rx="10" />
      <text class="fig-muted" x="34" y="46">视口（fixed 的包含块）</text>
      <rect class="fig-navy" x="60" y="58" width="360" height="130" rx="8" />
      <text class="fig-text" x="74" y="80">.card { position: relative }</text>
      <rect class="fig-accent" x="220" y="92" width="180" height="76" rx="6" />
      <text class="fig-text" x="234" y="116">.badge { position: absolute }</text>
      <text class="fig-muted" x="234" y="140">inset: 12px 12px auto auto</text>
      <path class="fig-arrow" d="M412 130 L444 130" />
      <text class="fig-note" x="432" y="106">未遇到已定位祖先</text>
      <text class="fig-note" x="432" y="160">就一路找到视口</text>
      <rect class="fig-box" x="446" y="58" width="80" height="34" rx="6" />
      <text class="fig-text" x="460" y="80">父级 static</text>
      <text class="fig-note" x="20" y="234">角标跑偏时，先沿祖先链找包含块，而不是改子元素的偏移值</text>
    </svg>`,
  },
  /* sticky 的参照 = 最近的滚动容器（我们项目里踩过的坑） */
  "sticky-scrollport": {
    label: { zh: "sticky 的参照是最近的滚动容器", en: "sticky references the nearest scroll container" },
    svg: `<svg ${VB}>
      <rect class="fig-box" x="20" y="20" width="250" height="200" rx="8" />
      <text class="fig-muted" x="34" y="42">正确：参照视口</text>
      <rect class="fig-surface" x="34" y="52" width="222" height="26" rx="4" />
      <text class="fig-text" x="46" y="70">站点导航 64px</text>
      <rect class="fig-accent" x="34" y="82" width="222" height="26" rx="4" />
      <text class="fig-text" x="46" y="100">sticky 表头 · top: 64px</text>
      <text class="fig-note" x="46" y="126">吸在导航正下方，滚动时保持不动</text>
      <rect class="fig-dash" x="300" y="20" width="240" height="200" rx="8" />
      <text class="fig-muted" x="314" y="42">踩坑：表格自身成为滚动容器</text>
      <rect class="fig-surface-warn" x="314" y="52" width="212" height="64" rx="4" />
      <text class="fig-text" x="326" y="74">overflow: hidden</text>
      <text class="fig-muted" x="326" y="96">→ table 变成 scroll container</text>
      <rect class="fig-warn" x="314" y="126" width="212" height="26" rx="4" />
      <text class="fig-text" x="326" y="144">表头被下推 64px</text>
      <text class="fig-note" x="326" y="172">框顶出现空白、表头压在首行上</text>
      <text class="fig-note" x="20" y="236">sticky 的 top 是相对“最近滚动容器”解析的，不是相对视口</text>
    </svg>`,
  },
  /* 网格轨道：显式轨道、fr 与 minmax */
  "grid-tracks": {
    label: { zh: "网格轨道与 fr", en: "Grid tracks and fr" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="26">grid-template-columns: repeat(3, minmax(0, 1fr))</text>
      <rect class="fig-accent" x="20" y="36" width="160" height="44" rx="6" />
      <text class="fig-text" x="86" y="63">1fr</text>
      <rect class="fig-accent" x="188" y="36" width="160" height="44" rx="6" />
      <text class="fig-text" x="254" y="63">1fr</text>
      <rect class="fig-accent" x="356" y="36" width="160" height="44" rx="6" />
      <text class="fig-text" x="422" y="63">1fr</text>
      <text class="fig-note" x="20" y="102">固定轨道与 gap 先扣掉，剩余空间再按 fr 分配</text>
      <text class="fig-muted" x="20" y="140">minmax(160px, 1fr)：先保下限，再参与分配</text>
      <rect class="fig-navy" x="20" y="150" width="120" height="40" rx="6" />
      <text class="fig-text" x="46" y="175">≥160px</text>
      <rect class="fig-navy" x="148" y="150" width="120" height="40" rx="6" />
      <text class="fig-text" x="174" y="175">≥160px</text>
      <rect class="fig-dash" x="276" y="150" width="240" height="40" rx="6" />
      <text class="fig-muted" x="292" y="175">宽度不足时下限优先，列数交给算法</text>
      <text class="fig-note" x="20" y="222">内容不可断行时项目的自动最小尺寸是 min-content → 需要 minmax(0, 1fr) 压住</text>
    </svg>`,
  },
  /* auto-fit 与 auto-fill */
  "auto-fit-fill": {
    label: { zh: "auto-fit 与 auto-fill", en: "auto-fit versus auto-fill" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="26">auto-fill：保留空轨道</text>
      <rect class="fig-box" x="20" y="36" width="520" height="60" rx="6" />
      <rect class="fig-accent" x="34" y="50" width="104" height="32" rx="4" />
      <rect class="fig-dash" x="150" y="50" width="104" height="32" rx="4" />
      <rect class="fig-dash" x="266" y="50" width="104" height="32" rx="4" />
      <rect class="fig-dash" x="382" y="50" width="104" height="32" rx="4" />
      <text class="fig-note" x="152" y="72">空轨道照样占位</text>
      <text class="fig-muted" x="20" y="132">auto-fit：折叠空轨道，已有项目平分整行</text>
      <rect class="fig-box" x="20" y="142" width="520" height="60" rx="6" />
      <rect class="fig-accent" x="34" y="156" width="240" height="32" rx="4" />
      <rect class="fig-accent" x="286" y="156" width="240" height="32" rx="4" />
      <text class="fig-note" x="120" y="178">卡片被拉开，填满容器</text>
      <text class="fig-note" x="20" y="228">卡片流优先 auto-fit：删掉几个项目后不会留下空洞</text>
    </svg>`,
  },
  /* 断点从哪来 */
  "breakpoint-ruler": {
    label: { zh: "断点从哪来", en: "Where breakpoints come from" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="88">WCAG 1.4.10：等效 320px 下不出现横向滚动</text>
      <path class="fig-arrow" d="M20 120 L540 120" />
      <rect class="fig-warn" x="20" y="104" width="60" height="32" rx="4" />
      <text class="fig-text" x="30" y="125">320</text>
      <rect class="fig-accent" x="120" y="104" width="90" height="32" rx="4" />
      <text class="fig-text" x="140" y="125">768</text>
      <rect class="fig-navy" x="250" y="104" width="110" height="32" rx="4" />
      <text class="fig-text" x="272" y="125">1280</text>
      <text class="fig-note" x="120" y="162">内容开始拥挤处</text>
      <text class="fig-note" x="250" y="162">行长超过 ~75 字符</text>
      <text class="fig-note" x="380" y="162">卡片低于下限</text>
      <text class="fig-note" x="20" y="202">只写 min-width 的断点从小到大叠加；混用 max-width 会互相覆盖</text>
      <text class="fig-note" x="20" y="226">能交给 clamp / auto-fit 解决的，不要新增断点</text>
    </svg>`,
  },
  /* 容器查询看的是容器宽度 */
  "container-query": {
    label: { zh: "容器查询看的是容器", en: "Container queries look at the container" },
    svg: `<svg ${VB}>
      <rect class="fig-box" x="20" y="24" width="150" height="152" rx="8" />
      <text class="fig-muted" x="34" y="46">侧栏 · 260px</text>
      <rect class="fig-surface" x="34" y="58" width="122" height="104" rx="6" />
      <rect class="fig-navy" x="44" y="70" width="102" height="26" rx="4" />
      <text class="fig-text" x="56" y="88">图片在上</text>
      <text class="fig-muted" x="44" y="120">@container &lt; 420px</text>
      <text class="fig-muted" x="44" y="142">→ 纵向紧凑版</text>
      <rect class="fig-box" x="196" y="24" width="344" height="152" rx="8" />
      <text class="fig-muted" x="210" y="46">主区域 · 720px</text>
      <rect class="fig-surface" x="210" y="58" width="316" height="104" rx="6" />
      <rect class="fig-accent" x="222" y="70" width="96" height="78" rx="4" />
      <text class="fig-text" x="252" y="114">图</text>
      <text class="fig-muted" x="330" y="100">@container ≥ 420px</text>
      <text class="fig-muted" x="330" y="124">→ 图文并排版</text>
      <text class="fig-note" x="20" y="204">同一份组件代码，两处容器宽度不同 → 自动切换布局</text>
      <text class="fig-note" x="20" y="228">前提：祖先有 container-type: inline-size</text>
    </svg>`,
  },
  /* clamp 的取值区间 */
  "clamp-math": {
    label: { zh: "clamp 的取值区间", en: "How clamp resolves" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="30">clamp(MIN, VAL, MAX) = max(MIN, min(VAL, MAX))</text>
      <path class="fig-arrow" d="M60 130 L500 130" />
      <rect class="fig-warn" x="60" y="70" width="60" height="56" rx="4" />
      <text class="fig-text" x="72" y="103">16px</text>
      <rect class="fig-accent" x="180" y="70" width="200" height="56" rx="4" />
      <text class="fig-text" x="216" y="94">1rem + 2vw</text>
      <text class="fig-note" x="216" y="114">随视口变化</text>
      <rect class="fig-navy" x="440" y="70" width="60" height="56" rx="4" />
      <text class="fig-text" x="452" y="103">32px</text>
      <text class="fig-note" x="68" y="156">下限</text>
      <text class="fig-note" x="188" y="156">中间项必须含相对单位</text>
      <text class="fig-note" x="448" y="156">上限</text>
      <text class="fig-note" x="20" y="200">中间项写成 1.25rem 这类常量时结果与视口无关，缩放不会发生</text>
      <text class="fig-note" x="20" y="224">拖动窗口看 DevTools 的计算值，是验证流式尺寸最快的办法</text>
    </svg>`,
  },
  /* DOM 顺序 vs 视觉顺序 */
  "order-vs-dom": {
    label: { zh: "视觉顺序与 DOM 顺序", en: "Visual order versus DOM order" },
    svg: `<svg ${VB}>
      <text class="fig-muted" x="20" y="26">DOM 顺序（键盘与读屏遵循它）</text>
      <rect class="fig-box" x="20" y="36" width="520" height="52" rx="6" />
      <text class="fig-text" x="40" y="68">1 · 取消</text>
      <text class="fig-text" x="200" y="68">2 · 提交</text>
      <text class="fig-muted" x="20" y="120">视觉顺序（order: -1 之后）</text>
      <rect class="fig-box" x="20" y="130" width="520" height="52" rx="6" />
      <rect class="fig-accent" x="32" y="142" width="140" height="28" rx="4" />
      <text class="fig-text" x="46" y="162">提交</text>
      <rect class="fig-navy" x="184" y="142" width="140" height="28" rx="4" />
      <text class="fig-text" x="198" y="162">取消</text>
      <path class="fig-arrow" d="M300 152 L360 152" />
      <text class="fig-note" x="368" y="156">Tab 却仍然先到“取消”</text>
      <text class="fig-note" x="20" y="212">order / row-reverse 只改排版顺序，不改 DOM、焦点与可访问性树</text>
      <text class="fig-note" x="20" y="236">需要不同顺序时，直接调整 DOM 结构</text>
    </svg>`,
  },
  /* 圣杯布局的区域地图 */
  "holy-grail-map": {
    label: { zh: "区域地图与圣杯布局", en: "Area map and the holy grail" },
    svg: `<svg ${VB}>
      <rect class="fig-box" x="20" y="24" width="520" height="40" rx="6" />
      <text class="fig-text" x="40" y="50">head</text>
      <rect class="fig-navy" x="20" y="72" width="120" height="112" rx="6" />
      <text class="fig-text" x="48" y="134">side</text>
      <rect class="fig-accent" x="148" y="72" width="392" height="112" rx="6" />
      <text class="fig-text" x="320" y="134">main</text>
      <rect class="fig-box" x="20" y="192" width="520" height="36" rx="6" />
      <text class="fig-text" x="40" y="215">foot</text>
      <text class="fig-note" x="20" y="16">grid-template-areas: "head head" / "side main" / "foot foot"</text>
      <text class="fig-muted" x="400" y="16">断点时只重画这张地图</text>
    </svg>`,
  },
  /* 渲染管线：改什么，重算什么 */
  "render-pipeline": {
    label: { zh: "渲染管线与改动代价", en: "Render pipeline and cost of change" },
    svg: `<svg ${VB}>
      <rect class="fig-box" x="20" y="60" width="112" height="60" rx="8" />
      <text class="fig-text" x="52" y="96">style</text>
      <rect class="fig-accent" x="152" y="60" width="112" height="60" rx="8" />
      <text class="fig-text" x="182" y="96">layout</text>
      <rect class="fig-navy" x="284" y="60" width="112" height="60" rx="8" />
      <text class="fig-text" x="322" y="96">paint</text>
      <rect class="fig-box" x="416" y="60" width="124" height="60" rx="8" />
      <text class="fig-text" x="438" y="96">composite</text>
      <path class="fig-arrow" d="M132 90 L152 90" />
      <path class="fig-arrow" d="M264 90 L284 90" />
      <path class="fig-arrow" d="M396 90 L416 90" />
      <text class="fig-note" x="20" y="150">改 width / height / font-size → 触发 layout（整棵子树重算）</text>
      <text class="fig-note" x="20" y="176">改 transform / opacity → 通常只走 composite</text>
      <text class="fig-note" x="20" y="202">改 color / background → paint，不重排</text>
      <text class="fig-muted" x="20" y="228">DevTools 的 Performance 面板可以看到每一帧落在那一段</text>
    </svg>`,
  },
  /* vh 与 dvh */
  "dvh-vh": {
    label: { zh: "vh 与 dvh 的差别", en: "vh versus dvh" },
    svg: `<svg ${VB}>
      <rect class="fig-box" x="40" y="20" width="150" height="200" rx="12" />
      <text class="fig-muted" x="54" y="42">height: 100vh</text>
      <rect class="fig-accent" x="54" y="52" width="122" height="140" rx="6" />
      <rect class="fig-warn" x="54" y="192" width="122" height="16" rx="4" />
      <text class="fig-note" x="66" y="205">多出的空白</text>
      <rect class="fig-box" x="230" y="20" width="150" height="200" rx="12" />
      <text class="fig-muted" x="244" y="42">min-height: 100dvh</text>
      <rect class="fig-navy" x="244" y="52" width="122" height="156" rx="6" />
      <text class="fig-note" x="258" y="196">跟随可视区域</text>
      <text class="fig-note" x="410" y="96">地址栏收起/展开时，</text>
      <text class="fig-note" x="410" y="120">只有 dvh 会跟着变；</text>
      <text class="fig-note" x="410" y="144">vh 固定为最大高度</text>
      <text class="fig-muted" x="20" y="236">移动端整页骨架用 dvh + 1fr 中间行，比 100vh 稳</text>
    </svg>`,
  },
};

