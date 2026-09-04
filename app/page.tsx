import {
  AlarmSmoke,
  BellRing,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  Database,
  FileCheck2,
  Flame,
  Headphones,
  HeartHandshake,
  MapPinned,
  MonitorCog,
  PhoneCall,
  RadioTower,
  ScanSearch,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";

const navItems = ["首页", "产品展示", "AI大数据烟感", "案例", "联系我们"];

const services = [
  {
    icon: MonitorCog,
    number: "01",
    title: "智慧消防平台建设",
    text: "统一接入消防物联设备和报警信息，为管理部门提供设备状态、报警记录和处置进度。",
  },
  {
    icon: RadioTower,
    number: "02",
    title: "智能设备接入",
    text: "支持智能烟感、电气火灾、水系统等终端接入，并建立设备档案和日常巡检记录。",
  },
  {
    icon: Headphones,
    number: "03",
    title: "专业代运维服务",
    text: "提供全天值守、报警核实、人员通知、工单流转和设备维护，保障系统持续运行。",
  },
];

const platformItems = [
  { icon: Database, title: "设备管理", text: "查看设备在线、离线、故障及运行状态" },
  { icon: BellRing, title: "报警管理", text: "汇总报警信息并记录核实、通知和处置过程" },
  { icon: MapPinned, title: "地图查看", text: "按区域、场所和设备位置查看消防风险" },
  { icon: ChartNoAxesColumnIncreasing, title: "统计分析", text: "形成设备、报警、工单等日常管理数据" },
];

const sensorItems = [
  { icon: AlarmSmoke, title: "报警上报", text: "发现烟雾后同步向平台发送报警信息" },
  { icon: ScanSearch, title: "远程查看", text: "在线查询设备状态、报警和故障记录" },
  { icon: PhoneCall, title: "消息通知", text: "通过平台和电话通知相关管理人员" },
  { icon: ClipboardCheck, title: "过程留痕", text: "完整记录报警核实与现场处置情况" },
];

const operationSteps = [
  { icon: AlarmSmoke, number: "01", title: "设备报警" },
  { icon: MonitorCog, number: "02", title: "平台接警" },
  { icon: UserRoundCheck, number: "03", title: "人工核实" },
  { icon: PhoneCall, number: "04", title: "通知人员" },
  { icon: ShieldCheck, number: "05", title: "现场处置" },
  { icon: FileCheck2, number: "06", title: "记录归档" },
];

const metrics = [
  { icon: RadioTower, value: "989", unit: "台", label: "智能烟感设备" },
  { icon: HeartHandshake, value: "520", unit: "位", label: "重点老人守护" },
  { icon: Flame, value: "122", unit: "起", label: "火警及时处置" },
  { icon: AlarmSmoke, value: "13", unit: "起", label: "锅烧干隐患预警" },
];

const cases = [
  {
    image: "/assets/dashilan.jpg",
    location: "北京市西城区",
    title: "大栅栏街道",
    text: "历史街区智慧消防感知与运营服务",
    featured: true,
  },
  {
    image: "/assets/tianqiao.jpg",
    location: "北京市西城区",
    title: "天桥街道",
    text: "社区消防预警与重点人群安全服务",
  },
  {
    image: "/assets/handan-school.jpg",
    location: "河北省邯郸市",
    title: "教育系统",
    text: "校园重点单位消防安全管理",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="site-brand" href="#top" aria-label="壹壹壹壹安全技术有限公司首页">
          <img src="/assets/brand-mark.jpg" alt="壹壹壹壹品牌标志" />
          <span>
            <strong>壹壹壹壹</strong>
            <small>（北京）安全技术有限公司</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="主导航">
          {navItems.map((item, index) => index === 0 ? (
            <a key={item} className="site-nav-item active" href="#top">{item}</a>
          ) : (
            <button key={item} className="site-nav-item" type="button" disabled aria-disabled="true" title="小样阶段，页面筹备中">{item}</button>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src="/assets/beijing-city-hero.jpg" alt="北京城市夜景" />
        <div className="hero-overlay" />
        <div className="page-shell hero-inner">
          <div className="hero-copy">
            <span className="hero-company">壹壹壹壹（北京）安全技术有限公司</span>
            <h1>城市基层<br />智慧消防运营服务</h1>
            <p>面向政府、街道、社区及重点单位，提供平台建设、智能设备接入和7×24小时专业运维服务。</p>
            <div className="hero-product"><RadioTower aria-hidden="true" />壹消智慧火灾预警运维云平台</div>
          </div>
          <div className="hero-facts">
            <div><span>服务对象</span><strong>政府 · 街道 · 社区</strong></div>
            <div><span>服务内容</span><strong>平台 · 设备 · 运维</strong></div>
            <div><span>值守时间</span><strong>7 × 24 小时</strong></div>
            <a href="#company">了解企业与服务<span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="company-section" id="company">
        <div className="page-shell">
          <div className="section-number"><span>01</span><b>关于企业</b></div>
          <div className="company-intro">
            <h2>我们不只建设系统<br />也负责系统长期运行</h2>
            <div>
              <p>壹壹壹壹（北京）安全技术有限公司专注于智慧消防建设与运营服务。公司通过“壹消”平台连接消防设备、管理人员和现场处置人员，为基层消防安全管理提供持续的技术与运营支持。</p>
              <p>服务覆盖平台部署、终端接入、日常值守、报警核实、设备维护和数据统计，帮助管理单位及时掌握设备状态和事件处置情况。</p>
            </div>
          </div>
          <div className="service-list">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.number}>
                  <div className="service-mark"><span>{service.number}</span><Icon aria-hidden="true" /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="platform-section">
        <div className="page-shell">
          <div className="section-number"><span>02</span><b>壹消平台</b></div>
          <div className="platform-heading">
            <h2>设备、报警和处置进度<br />在一个平台统一管理</h2>
            <p>平台面向政府、街道和项目管理人员使用，集中查看辖区内消防设备状态、报警信息、处置工单和统计数据。</p>
          </div>
          <div className="platform-content">
            <figure className="platform-screen">
              <div><span>壹消智慧火灾预警运维云平台</span><b>告警管理界面</b></div>
              <img src="/assets/platform-dashboard.png" alt="壹消智慧消防平台告警管理界面" />
            </figure>
            <div className="platform-list">
              {platformItems.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title}>
                    <Icon aria-hidden="true" />
                    <div><h3>{item.title}</h3><p>{item.text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sensor-section">
        <div className="page-shell sensor-layout">
          <figure className="sensor-figure">
            <img src="/assets/smoke-sensor.jpg" alt="AI大数据烟感设备" />
            <figcaption>智能烟感设备</figcaption>
          </figure>
          <div className="sensor-copy">
            <div className="section-number"><span>03</span><b>智能终端</b></div>
            <h2>AI大数据烟感</h2>
            <p className="sensor-lead">烟感报警后，信息同步上传至壹消平台。值守人员可及时核实情况，并通知现场相关人员处理。</p>
            <dl>
              {sensorItems.map((item) => {
                const Icon = item.icon;
                return <div key={item.title}><dt><Icon aria-hidden="true" /><span>{item.title}</span></dt><dd>{item.text}</dd></div>;
              })}
            </dl>
          </div>
        </div>
      </section>

      <section className="operations-section">
        <div className="page-shell operations-inner">
          <div className="section-number light"><span>04</span><b>代运维服务</b></div>
          <div className="operations-copy">
            <h2>7×24小时运营值守</h2>
            <p>专业人员负责查看报警信息、核实现场情况、通知相关人员并跟进处理结果。设备出现故障时，形成维护工单并记录维修情况。</p>
          </div>
          <figure className="operations-media">
            <img src="/assets/operations-center.jpg" alt="壹消智慧消防运营中心实景" />
            <figcaption><span>运营保障</span><strong>智慧消防运营中心实景</strong></figcaption>
          </figure>
          <ol className="process-list">
            {operationSteps.map((step) => {
              const Icon = step.icon;
              return <li key={step.number}><div><Icon aria-hidden="true" /><span>{step.number}</span></div><strong>{step.title}</strong></li>;
            })}
          </ol>
        </div>
      </section>

      <section className="results-section">
        <div className="page-shell">
          <div className="section-number"><span>05</span><b>项目运行情况</b></div>
          <div className="results-heading">
            <h2>部分项目运行数据</h2>
            <p>以下数据整理自公司现有项目资料及媒体报道。</p>
          </div>
          <div className="metrics-list">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return <div key={metric.label}><Icon aria-hidden="true" /><strong>{metric.value}<sup>{metric.unit}</sup></strong><span>{metric.label}</span></div>;
            })}
          </div>
        </div>
      </section>

      <section className="cases-section">
        <div className="page-shell">
          <div className="section-number"><span>06</span><b>服务案例</b></div>
          <div className="cases-heading">
            <h2>典型服务项目</h2>
            <p>服务场景包括街道社区、历史街区和教育系统等。</p>
          </div>
          <div className="cases-grid">
            {cases.map((item, index) => (
              <article className={item.featured ? "case-item featured" : "case-item"} key={item.title}>
                <img src={item.image} alt={`${item.title}智慧消防项目现场`} />
                <div className="case-overlay" />
                <span className="case-index">0{index + 1}</span>
                <div className="case-copy">
                  <span>{item.location}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-main">
          <div className="footer-brand">
            <img src="/assets/brand-mark.jpg" alt="" />
            <div><strong>壹壹壹壹（北京）安全技术有限公司</strong><span>智慧消防建设与运营服务</span></div>
          </div>
          <div className="footer-product"><span>核心产品</span><strong>壹消智慧火灾预警运维云平台</strong></div>
        </div>
        <div className="page-shell footer-bottom"><span>© 2026 壹壹壹壹（北京）安全技术有限公司</span><span>本页为官方网站首页小样</span></div>
      </footer>
    </main>
  );
}
