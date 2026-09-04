const navItems = ["首页", "产品展示", "AI大数据烟感", "案例", "联系我们"];

const capabilities = [
  { number: "01", title: "全域感知", description: "接入烟感、电气、水系统等消防物联设备，建立重点场所与重点人群的风险感知网络。" },
  { number: "02", title: "智能研判", description: "多源告警由AI辅助分析、专业人员复核，减少无效干扰，让风险判断更及时、更准确。" },
  { number: "03", title: "一图统管", description: "在同一视图汇聚设备、告警、工单与处置状态，支撑多层级管理与协同调度。" },
  { number: "04", title: "闭环治理", description: "预警、核实、派单、处置、归档全程留痕，让每一次响应有据可查、有责可循。" },
];

const operationSteps = [
  ["01", "设备感知", "风险及时发现"],
  ["02", "AI研判", "多源数据分析"],
  ["03", "人工复核", "7×24小时值守"],
  ["04", "多端触达", "告警精准送达"],
  ["05", "派单处置", "人员快速到场"],
  ["06", "数据归档", "过程全程留痕"],
];

const cases = [
  { image: "/assets/dashilan.jpg", place: "北京 · 西城区", title: "大栅栏街道", description: "面向历史街区复杂业态，建设智慧消防感知与运营中心。", featured: true },
  { image: "/assets/tianqiao.jpg", place: "北京 · 西城区", title: "天桥街道", description: "聚焦社区安全与重点人群，完善预警处置机制。" },
  { image: "/assets/handan-school.jpg", place: "河北 · 邯郸", title: "教育系统", description: "覆盖校园重点单位，提升日常监管和风险响应效率。" },
];

export default function Home() {
  return (
    <main>
      <header className="civic-header">
        <a className="civic-brand" href="#top" aria-label="壹壹壹壹安全技术有限公司首页">
          <img src="/assets/brand-mark.jpg" alt="壹壹壹壹品牌标志" />
          <span><strong>壹壹壹壹</strong><small>（北京）安全技术有限公司</small></span>
        </a>
        <nav className="civic-nav" aria-label="主导航">
          {navItems.map((item, index) => index === 0 ? (
            <a key={item} href="#top" className="civic-nav-item active">{item}</a>
          ) : (
            <button key={item} type="button" className="civic-nav-item" disabled aria-disabled="true" title="小样阶段，页面筹备中">{item}</button>
          ))}
        </nav>
        <div className="civic-header-note"><span>01</span>城市基层消防治理</div>
      </header>

      <section className="civic-hero" id="top">
        <div className="civic-hero-copy">
          <div className="civic-overline"><span>壹消智慧火灾预警运维云平台</span><b>YIXIAO / 2026</b></div>
          <div className="civic-title-row">
            <span className="civic-section-no">01</span>
            <h1><span>智慧消防</span><strong>从预警到处置</strong><em>始终有人负责。</em></h1>
          </div>
          <div className="civic-intro">
            <p>面向政府、街道与社区，以物联网感知、AI辅助研判和7×24小时专业值守，构建真正持续运转的消防治理闭环。</p>
            <a href="#identity">了解壹消体系<span aria-hidden="true">↓</span></a>
          </div>
          <div className="civic-proof" aria-label="平台核心能力">
            <div><b>AI + IoT</b><span>智能感知研判</span></div>
            <div><b>7 × 24</b><span>专业运营值守</span></div>
            <div><b>100%</b><span>处置过程留痕</span></div>
          </div>
        </div>

        <div className="civic-hero-media">
          <img className="civic-main-photo" src="/assets/operations-center.jpg" alt="壹消智慧消防运营中心实景" />
          <div className="civic-photo-wash" />
          <div className="civic-media-top"><span>MANAGED FIRE SAFETY</span><b>北京 · 中国</b></div>
          <div className="civic-media-title"><span>运营中心实景</span><strong>技术发现风险<br />运营解决问题</strong></div>
          <div className="civic-screen-strip">
            <img src="/assets/platform-dashboard.png" alt="壹消智慧消防平台告警管理界面" />
            <div><span>PLATFORM</span><strong>一图统管<br />全程闭环</strong></div>
          </div>
          <div className="civic-red-mark" aria-hidden="true"><span /><span /><span /></div>
        </div>
        <div className="civic-rail" aria-hidden="true"><span>壹消智慧消防</span><i /></div>
      </section>

      <section className="identity-section" id="identity">
        <div className="page-shell">
          <div className="editorial-heading">
            <div><span className="section-kicker">ABOUT YIXIAO / 关于壹消</span><h2>建设系统只是起点<br />持续运转才是答案</h2></div>
            <p>壹壹壹壹（北京）安全技术有限公司，面向政府、街道、社区及重点单位，提供智慧消防平台建设、智能终端接入与专业代运维服务。让技术能力落到治理现场，让每一次告警都进入处置闭环。</p>
          </div>
          <div className="responsibility-grid">
            <article><span>01 / ONLINE</span><h3>装了，<b>有人管</b></h3><p>设备在线巡检、运行监测，避免系统“建而不用”。</p></article>
            <article><span>02 / RESPONSE</span><h3>响了，<b>有人应</b></h3><p>平台、电话与运营人员协同，让告警及时进入处置。</p></article>
            <article><span>03 / SERVICE</span><h3>坏了，<b>有人修</b></h3><p>故障工单、维护记录、设备档案统一管理。</p></article>
          </div>
          <div className="governance-band">
            <div><span>治理方法</span><strong>三维一体</strong></div>
            <ol>
              <li><span>01</span><b>技防</b><small>智能感知 · 平台研判</small></li>
              <li><span>02</span><b>人防</b><small>专业值守 · 协同响应</small></li>
              <li><span>03</span><b>物防</b><small>设施保障 · 持续维护</small></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="page-shell">
          <div className="platform-intro">
            <span className="section-kicker">PLATFORM CAPABILITIES / 平台能力</span>
            <h2>一张图掌握全域风险<br />一套机制贯通处置全程</h2>
            <p>面向管理者的统一治理视图</p>
          </div>
          <div className="platform-layout">
            <div className="capability-list">
              {capabilities.map((item) => (
                <article key={item.number}>
                  <span>{item.number}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </article>
              ))}
            </div>
            <figure className="platform-figure">
              <div className="figure-meta"><span><i /> 壹消平台 · 告警管理</span><b>实时数据</b></div>
              <img src="/assets/platform-dashboard.png" alt="壹消智慧消防平台数据管理界面" />
              <figcaption><span>UNIFIED DATA CENTER</span><strong>从“看设备”到“管事件”</strong></figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sensor-section">
        <div className="page-shell sensor-layout">
          <div className="sensor-visual">
            <span className="visual-index">02</span>
            <div className="sensor-image-wrap"><img src="/assets/smoke-sensor.jpg" alt="智能烟感设备" /></div>
            <div className="sensor-annotation annotation-a"><i />NB-IoT 无线连接</div>
            <div className="sensor-annotation annotation-b"><i />低功耗 · 长续航</div>
            <div className="sensor-annotation annotation-c"><i />状态实时上报</div>
          </div>
          <div className="sensor-copy">
            <span className="section-kicker">AI + BIG DATA SMOKE DETECTION</span>
            <h2>让每一只烟感<br />成为风险数据入口</h2>
            <p>智能烟感不止发出本地报警，更将现场状态接入平台。通过AI分析、人工复核与多端通知，把一次告警转化为可执行、可追踪的治理事件。</p>
            <div className="sensor-specs">
              <div><span>01</span><strong>秒级感知</strong><small>异常及时上报</small></div>
              <div><span>02</span><strong>远程监管</strong><small>状态随时可查</small></div>
              <div><span>03</span><strong>精准触达</strong><small>信息快速送达</small></div>
              <div><span>04</span><strong>闭环处置</strong><small>结果全程留痕</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="operations-section" id="operations">
        <div className="page-shell">
          <div className="operations-heading">
            <div><span className="section-kicker">MANAGED OPERATIONS / 专属代运维</span><h2>7×24小时专业值守<br />让预警真正转化为行动</h2></div>
            <p>系统负责发现，运营负责解决。以平台为中枢、以专业团队为保障，打通发现、研判、通知、处置、归档全链路。</p>
          </div>
          <figure className="operations-figure">
            <img src="/assets/operations-center.jpg" alt="智慧消防运营中心实景" />
            <figcaption><span>运营中心实景 / BEIJING</span><strong>有人看、有人管、有人负责到底</strong></figcaption>
          </figure>
          <ol className="process-list">
            {operationSteps.map(([number, title, detail]) => (
              <li key={number}><span>{number}</span><strong>{title}</strong><small>{detail}</small></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="results-section">
        <div className="page-shell results-layout">
          <div className="results-copy"><span className="section-kicker">VERIFIED PRACTICE / 实践成效</span><h2>真实运行数据<br />就是治理答案</h2><p>从设备覆盖到事件处置，把看不见的安全投入转化为可度量、可复盘的治理结果。</p><small>* 数据来自现有项目资料及媒体报道</small></div>
          <div className="metrics-grid">
            <div><strong>989<sup>台</sup></strong><span>智能烟感设备</span></div>
            <div><strong>520<sup>位</sup></strong><span>重点老人守护</span></div>
            <div><strong>122<sup>起</sup></strong><span>火警及时处置</span></div>
            <div className="metric-accent"><strong>13<sup>起</sup></strong><span>锅烧干隐患预警</span></div>
          </div>
        </div>
      </section>

      <section className="cases-section">
        <div className="page-shell">
          <div className="cases-heading"><div><span className="section-kicker">REPRESENTATIVE CASES / 代表案例</span><h2>扎根治理现场<br />守护城市安全</h2></div><p>服务覆盖街道社区、历史街区、教育系统等场景，在真实治理环境中持续运行。</p></div>
          <div className="cases-grid">
            {cases.map((item, index) => (
              <article className={item.featured ? "case-item featured" : "case-item"} key={item.title}>
                <img src={item.image} alt={`${item.title}智慧消防项目现场`} />
                <div className="case-shade" />
                <span className="case-number">0{index + 1}</span>
                <div className="case-copy"><span>{item.place}</span><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-main">
          <div className="footer-brand"><img src="/assets/brand-mark.jpg" alt="" /><div><strong>壹壹壹壹（北京）安全技术有限公司</strong><span>让科技服务安全，让治理更有温度</span></div></div>
          <div className="footer-product"><span>CORE PRODUCT / 核心产品</span><strong>壹消智慧火灾预警运维云平台</strong></div>
        </div>
        <div className="page-shell footer-bottom"><span>© 2026 壹壹壹壹（北京）安全技术有限公司</span><span>智慧消防 · AI预警 · 专业运营</span></div>
      </footer>
    </main>
  );
}
