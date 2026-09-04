import {
  ArrowDown, ArrowRight, BellRing, BrainCircuit, Building2, Check,
  ChevronRight, CircleDot, CloudCog, Cpu, Database, Headphones,
  MapPinned, RadioTower, ScanSearch, ShieldCheck, Siren, Wrench,
} from "lucide-react";

const navItems = ["首页", "产品展示", "AI大数据烟感", "案例", "联系我们"];

const capabilities = [
  { icon: RadioTower, number: "01", title: "全域智能感知", description: "接入烟感、电气、水系统等消防物联设备，形成重点场所与重点人群的风险感知网络。" },
  { icon: BrainCircuit, number: "02", title: "AI辅助研判", description: "对多源告警进行智能分析与人工复核，降低无效信息干扰，让风险判断更快、更准。" },
  { icon: MapPinned, number: "03", title: "一图统管全局", description: "基于GIS地图汇聚设备、告警、工单与处置状态，为管理部门提供清晰统一的治理视图。" },
  { icon: CloudCog, number: "04", title: "数据闭环治理", description: "从预警、核实、派单到处置、归档全程留痕，让每一次告警可追溯、每一项责任可落实。" },
];

const operationSteps = [
  { icon: ScanSearch, label: "设备感知", sub: "风险被及时发现" },
  { icon: BrainCircuit, label: "AI研判", sub: "多源数据分析" },
  { icon: Headphones, label: "人工复核", sub: "7×24小时值守" },
  { icon: BellRing, label: "多端触达", sub: "告警精准送达" },
  { icon: Wrench, label: "派单处置", sub: "人员快速到场" },
  { icon: Database, label: "数据归档", sub: "过程全程留痕" },
];

const cases = [
  { image: "/assets/dashilan.jpg", area: "北京 · 西城区", title: "大栅栏街道", description: "面向历史街区复杂业态，构建智慧消防感知与运营中心。", className: "case-card case-card-featured" },
  { image: "/assets/tianqiao.jpg", area: "北京 · 西城区", title: "天桥街道", description: "聚焦社区安全与独居老人等重点人群，完善预警处置机制。", className: "case-card" },
  { image: "/assets/handan-school.jpg", area: "河北 · 邯郸", title: "教育系统", description: "覆盖校园等重点单位，提升日常监管和风险响应效率。", className: "case-card" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="壹壹壹壹安全技术有限公司首页">
          <img src="/assets/brand-mark.jpg" alt="壹壹壹壹品牌标志" />
          <span className="brand-copy"><strong>壹壹壹壹</strong><small>智慧消防 · 安全运营</small></span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item, index) => index === 0 ? (
            <a key={item} href="#top" className="nav-item active">{item}</a>
          ) : (
            <button key={item} type="button" className="nav-item" aria-disabled="true" title="小样阶段，页面筹备中">{item}</button>
          ))}
        </nav>
        <div className="header-status" aria-label="平台服务状态"><span />运营服务在线</div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" />城市基层智慧消防运营服务商</div>
            <h1>让消防风险<span>看得见 · 管得住</span><em>处置有闭环</em></h1>
            <p>以“壹消智慧火灾预警运维云平台”为技术底座，融合物联网、AI与专业运营服务，为政府与基层治理部门构建从感知到处置的智慧消防体系。</p>
            <div className="hero-actions">
              <a className="primary-button" href="#platform">查看平台能力<ArrowRight size={17} /></a>
              <a className="text-button" href="#operations">了解服务闭环<ArrowDown size={16} /></a>
            </div>
            <div className="hero-facts" aria-label="平台核心特点">
              <div><strong>7×24</strong><span>专业运营值守</span></div>
              <div><strong>AI + IoT</strong><span>智能感知研判</span></div>
              <div><strong>全流程</strong><span>闭环处置留痕</span></div>
            </div>
          </div>

          <div className="hero-visual" aria-label="壹消智慧消防平台界面展示">
            <div className="platform-window">
              <div className="window-bar">
                <div className="window-title"><span className="window-mark"><ShieldCheck size={15} /></span>壹消智慧消防运营中心</div>
                <div className="window-live"><i /> LIVE</div>
              </div>
              <div className="dashboard-frame">
                <img src="/assets/platform-dashboard.png" alt="壹消智慧消防平台告警管理界面" />
                <div className="data-scan" aria-hidden="true" />
              </div>
            </div>
            <div className="float-card alarm-card">
              <div className="float-icon red"><Siren size={18} /></div>
              <div><small>风险事件</small><strong>告警已核实</strong></div><span className="tag">已派单</span>
            </div>
            <div className="float-card ai-card">
              <div className="float-icon blue"><BrainCircuit size={18} /></div>
              <div><small>AI 智能研判</small><strong>多源数据融合</strong></div>
              <div className="mini-bars" aria-hidden="true"><i /><i /><i /><i /></div>
            </div>
            <div className="signal-ring" aria-hidden="true"><span><CircleDot size={12} /></span></div>
          </div>
        </div>
        <a className="scroll-hint" href="#identity" aria-label="继续浏览"><span>SCROLL TO EXPLORE</span><i /></a>
      </section>

      <section className="identity-section" id="identity">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div><span className="section-kicker">ABOUT YIXIAO / 关于壹消</span><h2>不止建设一套系统<br />更让消防治理持续运转</h2></div>
            <p>壹壹壹壹（北京）安全技术有限公司面向政府、街道、社区及重点单位，提供智慧消防平台建设、智能终端接入和专业代运维服务。以技术提升发现能力，以运营保障处置效率。</p>
          </div>
          <div className="pain-grid">
            <article><span className="pain-number">01</span><h3>装了，有人管</h3><p>设备在线巡检与运行监测，减少“建而不用”的系统空转。</p><Check size={18} /></article>
            <article><span className="pain-number">02</span><h3>响了，有人应</h3><p>平台、电话与服务人员协同，让告警第一时间进入处置流程。</p><Check size={18} /></article>
            <article><span className="pain-number">03</span><h3>坏了，有人修</h3><p>故障工单、维护记录与设备档案统一管理，保障体系持续在线。</p><Check size={18} /></article>
          </div>
          <div className="trinity-band">
            <div className="trinity-title"><span>三维一体</span><strong>智慧消防治理新模式</strong></div>
            <div className="trinity-items">
              <div><Cpu size={21} /><span><strong>技防</strong>智能感知</span></div><i />
              <div><Headphones size={21} /><span><strong>人防</strong>专业值守</span></div><i />
              <div><ShieldCheck size={21} /><span><strong>物防</strong>设施保障</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="page-shell">
          <div className="section-heading platform-heading">
            <div><span className="section-kicker">PLATFORM CAPABILITIES / 平台能力</span><h2>一张图掌握全域风险<br />一套机制贯通处置全程</h2></div>
            <div className="platform-tag"><span /> 数据驱动 · 协同治理</div>
          </div>
          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, number, title, description }) => (
              <article key={number} className="capability-card">
                <div className="capability-top"><span className="capability-icon"><Icon size={24} /></span><span className="capability-number">{number}</span></div>
                <h3>{title}</h3><p>{description}</p><div className="card-line" />
              </article>
            ))}
          </div>
          <div className="platform-showcase">
            <div className="showcase-copy">
              <span className="section-kicker">UNIFIED DATA CENTER</span><h3>从“看设备”到“管事件”</h3>
              <p>统一汇聚设备运行、实时告警、处置工单和统计分析。管理者既能看到全域态势，也能下钻到每一条事件记录。</p>
              <ul><li><Check size={16} />多层级组织与权限管理</li><li><Check size={16} />地图、列表与统计多维呈现</li><li><Check size={16} />事件全过程可查、可追、可复盘</li></ul>
            </div>
            <div className="showcase-screen">
              <div className="screen-toolbar"><span><i /> 壹消平台 · 告警管理</span><small>数据实时同步</small></div>
              <img src="/assets/platform-dashboard.png" alt="壹消智慧消防平台数据管理界面" />
            </div>
          </div>
        </div>
      </section>

      <section className="sensor-section">
        <div className="page-shell sensor-layout">
          <div className="sensor-visual">
            <div className="sensor-halo halo-a" /><div className="sensor-halo halo-b" />
            <div className="sensor-image-wrap"><img src="/assets/smoke-sensor.jpg" alt="智能烟感设备" /></div>
            <span className="sensor-label label-a">NB-IoT 无线连接</span><span className="sensor-label label-b">低功耗长续航</span><span className="sensor-label label-c">实时状态上报</span>
          </div>
          <div className="sensor-copy">
            <span className="section-kicker">AI + BIG DATA SMOKE DETECTION</span><h2>让每一只烟感<br />成为风险数据入口</h2>
            <p>智能烟感不仅发出本地声光报警，更将现场状态实时接入平台。通过AI分析、人工复核与多端通知，把一次告警转化为可执行、可追踪的治理事件。</p>
            <div className="sensor-points">
              <div><span>01</span><strong>秒级感知</strong><small>异常及时上报</small></div><div><span>02</span><strong>远程监管</strong><small>状态随时可查</small></div>
              <div><span>03</span><strong>精准触达</strong><small>信息快速送达</small></div><div><span>04</span><strong>闭环处置</strong><small>结果全程留痕</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="operations-section" id="operations">
        <div className="page-shell">
          <div className="section-heading centered-heading">
            <span className="section-kicker">MANAGED OPERATIONS / 专属代运维</span><h2>7×24小时专业值守<br />让预警真正转化为行动</h2>
            <p>以平台为中枢，以运营团队为保障，打通“发现—研判—通知—处置—归档”全链路。</p>
          </div>
          <div className="operations-photo">
            <img src="/assets/operations-center.jpg" alt="智慧消防运营中心实景" /><div className="photo-shade" />
            <div className="operations-caption"><span><i /> 运营中心实景</span><strong>有人看、有人管、有人负责到底</strong></div>
          </div>
          <div className="process-track">
            {operationSteps.map(({ icon: Icon, label, sub }, index) => (
              <div className="process-step" key={label}>
                <div className="process-icon"><Icon size={21} /></div><span className="process-index">0{index + 1}</span><strong>{label}</strong><small>{sub}</small>
                {index < operationSteps.length - 1 && <ChevronRight className="process-arrow" size={17} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="results-section">
        <div className="page-shell results-layout">
          <div className="results-copy"><span className="section-kicker">VERIFIED PRACTICE / 实践成效</span><h2>用真实运行数据<br />回答治理成效</h2><p>从设备覆盖到事件处置，壹消把看不见的安全投入，转化为可度量、可复盘的治理结果。</p><span className="data-note">* 数据来自现有项目资料及媒体报道</span></div>
          <div className="metrics-grid"><div><strong>989<sup>台</sup></strong><span>智能烟感设备</span></div><div><strong>520<sup>位</sup></strong><span>重点老人守护</span></div><div><strong>122<sup>起</sup></strong><span>火警及时处置</span></div><div className="metric-accent"><strong>13<sup>起</sup></strong><span>锅烧干隐患预警</span></div></div>
        </div>
      </section>

      <section className="cases-section">
        <div className="page-shell">
          <div className="section-heading split-heading case-heading"><div><span className="section-kicker">REPRESENTATIVE CASES / 代表案例</span><h2>扎根治理现场<br />守护城市安全</h2></div><p>方案已应用于街道社区、历史街区、教育系统等多类场景，在真实治理环境中持续运行。</p></div>
          <div className="cases-grid">
            {cases.map((item) => (
              <article className={item.className} key={item.title}><img src={item.image} alt={`${item.title}智慧消防项目现场`} /><div className="case-overlay" /><div className="case-content"><span>{item.area}</span><h3>{item.title}</h3><p>{item.description}</p></div><div className="case-corner"><Building2 size={20} /></div></article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-top">
          <div className="footer-brand"><img src="/assets/brand-mark.jpg" alt="" /><div><strong>壹壹壹壹（北京）安全技术有限公司</strong><span>让科技服务安全，让治理更有温度</span></div></div>
          <div className="footer-product"><span>核心产品</span><strong>壹消智慧火灾预警运维云平台</strong></div>
        </div>
        <div className="page-shell footer-bottom"><span>© 2026 壹壹壹壹（北京）安全技术有限公司</span><span>智慧消防 · AI预警 · 专业运营</span></div>
      </footer>
    </main>
  );
}
