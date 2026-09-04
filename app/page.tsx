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
  Wrench,
} from "lucide-react";
import CaseShowcase from "@/components/case-showcase";
import RevealObserver from "@/components/reveal-observer";

const navItems = ["首页", "产品展示", "AI大数据烟感", "案例", "联系我们"];

const services = [
  {
    icon: MonitorCog,
    number: "01",
    title: "全域感知与建档",
    text: "智能烟感、可视烟感、电气监测等终端统一接入，点位、型号和维保记录形成电子台账。",
  },
  {
    icon: RadioTower,
    number: "02",
    title: "预警研判与联动",
    text: "告警按火警、用电隐患、设备故障、低电量等类型分级，按责任主体同步推送。",
  },
  {
    icon: Headphones,
    number: "03",
    title: "全周期代运维",
    text: "值守、复核、派单、巡检、维修、回访和报告由专人持续跟进，保障系统长期运行。",
  },
];

const platformItems = [
  { icon: MapPinned, title: "全域GIS一张图", text: "所有感知点位精准落图，实时查看在线、离线、故障和告警状态" },
  { icon: BellRing, title: "AI分级告警", text: "识别火警、用电隐患、设备故障和低电量，按风险等级推送" },
  { icon: Database, title: "全闭环工单", text: "告警、巡检、维修线上派发，现场打卡、拍照回传并归档" },
  { icon: ChartNoAxesColumnIncreasing, title: "安全分析研判", text: "汇总告警趋势、隐患点位、故障率和处置时效，辅助监管决策" },
];

const platformPillars = [
  { icon: MonitorCog, label: "技防", title: "智能监测", text: "持续采集烟、火、电、温等风险信号，AI过滤环境干扰。" },
  { icon: UserRoundCheck, label: "人防", title: "闭环值守", text: "专职人员接警、复核、研判，联动网格员和现场责任人。" },
  { icon: ShieldCheck, label: "物防", title: "长效保障", text: "设备离线、低电量或故障自动提醒，运维团队主动巡检更换。" },
];

const sensorItems = [
  { icon: AlarmSmoke, title: "多源感知", text: "可接入烟感、可视烟感、电气监测等终端，持续采集风险信号" },
  { icon: ScanSearch, title: "精准研判", text: "平台区分火警、隐患、故障和低电量，减少误报干扰" },
  { icon: PhoneCall, title: "多端通知", text: "通过平台、电话、短信和小程序同步触达相关责任人" },
  { icon: ClipboardCheck, title: "台账留痕", text: "报警核实、现场处置、照片和维修结果全部线上归档" },
];

const operationSteps = [
  { icon: AlarmSmoke, number: "01", title: "设备报警", detail: "终端发现烟雾、明火或异常" },
  { icon: MonitorCog, number: "02", title: "平台接警", detail: "告警秒级上云并锁定点位" },
  { icon: UserRoundCheck, number: "03", title: "人工复核", detail: "值守中心二次核验、分级研判" },
  { icon: PhoneCall, number: "04", title: "联动通知", detail: "电话、短信、小程序同步触达" },
  { icon: ShieldCheck, number: "05", title: "现场处置", detail: "就近派单，网格力量快速到场" },
  { icon: FileCheck2, number: "06", title: "归档复盘", detail: "拍照回传，工单和台账留痕" },
];

const operationAssurances = [
  { icon: Headphones, title: "全天候接警复核", text: "专职值守中心全年在线，自动告警与人工复核双重把关。" },
  { icon: PhoneCall, title: "多角色联动触达", text: "同步联动街道、社区网格、物业安保、场所负责人和微型消防站。" },
  { icon: Wrench, title: "工单闭环督办", text: "未处置工单持续跟进，设备故障主动派单，维修结果线上归档。" },
];

const serviceMode = [
  { icon: RadioTower, number: "01", title: "硬件设备部署", text: "智能烟感、可视烟感、电气监测等终端构成消防数据采集底座。" },
  { icon: MonitorCog, number: "02", title: "壹消云平台管控", text: "GIS地图统一展示设备状态、警情信息和处置进度，支持远程调度。" },
  { icon: Headphones, number: "03", title: "7×24小时值守", text: "专业团队全天候接警、复核和通知，保障每条告警有人响应。" },
  { icon: ShieldCheck, number: "04", title: "全周期代运维", text: "定期巡检、故障维修、耗材更换和系统养护由专人持续负责。" },
];

const metrics = [
  { icon: RadioTower, value: "989", unit: "台", label: "智能烟感设备", detail: "现有项目资料披露的设备部署规模" },
  { icon: HeartHandshake, value: "520", unit: "位", label: "重点老人守护", detail: "纳入独居及重点人群安全守护" },
  { icon: Flame, value: "122", unit: "起", label: "火警及时处置", detail: "项目运行资料中的火警处置记录" },
  { icon: AlarmSmoke, value: "13", unit: "起", label: "锅烧干隐患预警", detail: "通过设备及时发现的居家风险" },
];

const cases = [
  {
    image: "/assets/dashilan.jpg",
    location: "北京市西城区",
    title: "大栅栏街道",
    scene: "历史文化街区 · 老旧平房院落 · 胡同商铺",
    service: "设备统一建档、常态化巡检、故障维修与7×24小时值守",
    result: "设备在线率提升至99%以上",
  },
  {
    image: "/assets/tianqiao.jpg",
    location: "北京市西城区",
    title: "天桥街道",
    scene: "老旧院落 · 独居老人 · 九小场所",
    service: "智能烟感部署、告警核查、故障更换与隐患闭环",
    result: "形成社区消防托管运维机制",
  },
  {
    image: "/assets/handan-school.jpg",
    location: "河北省邯郸市",
    title: "教育系统",
    scene: "中小学 · 幼儿园 · 教室宿舍食堂",
    service: "校园云哨兵设备接入、平台监测和专人运维",
    result: "覆盖重点区域，保障校园安全运营",
  },
];

export default function Home() {
  return (
    <main>
      <header className="site-header" data-reveal="down">
        <a className="site-brand" href="#top" aria-label="壹壹壹壹安全技术有限公司首页" data-reveal="left" data-delay="1">
          <img src="/assets/brand-mark.jpg" alt="壹壹壹壹品牌标志" />
          <span>
            <strong>壹壹壹壹</strong>
            <small>（北京）安全技术有限公司</small>
          </span>
        </a>
        <nav className="site-nav" aria-label="主导航" data-reveal="right" data-delay="2">
          {navItems.map((item, index) => index === 0 ? (
            <a key={item} className="site-nav-item active" href="#top">{item}</a>
          ) : (
            <button key={item} className="site-nav-item" type="button" disabled aria-disabled="true" title="小样阶段，页面筹备中">{item}</button>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <img className="hero-image" src="/assets/command-center-hero.jpg" alt="西城区大栅栏街道智慧消防与交通治理安全沙盘实景" />
        <div className="hero-overlay" />
        <div className="page-shell hero-inner">
          <div className="hero-copy">
            <span className="hero-company" data-reveal="left" data-delay="1">壹壹壹壹（北京）安全技术有限公司</span>
            <h1 data-reveal="left" data-delay="2">城市基层消防安全<br /><span className="hero-title-accent">智慧运营服务</span></h1>
            <p data-reveal="left" data-delay="3">面向政府、街道、社区及重点单位，提供平台建设、智能设备接入和7×24小时专业运维服务。</p>
            <div className="hero-product" data-reveal="left" data-delay="4"><RadioTower aria-hidden="true" />壹消智慧火灾预警运维云平台</div>
            <div className="hero-actions" data-reveal="left" data-delay="5">
              <a className="hero-action-primary" href="#company">了解服务体系 <span aria-hidden="true">↗</span></a>
              <a className="hero-action-secondary" href="#platform">查看平台能力 <span aria-hidden="true">→</span></a>
            </div>
          </div>
          <aside className="hero-side-note" data-reveal="right" data-delay="4" aria-label="城市消防安全运营说明">
            <span>城市消防安全运营</span>
            <strong>从预警到处置<br />每一步都有响应</strong>
            <p>全域感知、分级研判、联动处置，形成可追溯的基层消防安全闭环。</p>
          </aside>
          <div className="hero-facts">
            <div data-reveal="up" data-delay="2"><span>服务对象</span><strong>政府 · 街道 · 社区 · 重点单位</strong></div>
            <div data-reveal="up" data-delay="3"><span>服务模式</span><strong>设备部署 + 平台管控 + 代运维</strong></div>
            <div data-reveal="up" data-delay="4"><span>响应机制</span><strong>秒级预警 · 分钟处置</strong></div>
            <a href="#company" data-reveal="right" data-delay="5">查看完整服务体系<span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="company-section" id="company">
        <div className="page-shell">
          <div className="section-number" data-reveal="up"><span>01</span><b>关于企业</b></div>
          <div className="company-intro" data-reveal="up" data-delay="1">
            <h2 data-reveal="left" data-delay="2">深耕城市基层消防治理<br /><span className="section-title-accent">提供全周期运营服务</span></h2>
            <div data-reveal="right" data-delay="3">
              <p>壹壹壹壹（北京）安全技术有限公司是一家深耕城市基层智慧消防治理、专注全周期消防代运维托管的技术服务企业。公司聚焦老旧街巷、历史街区、九小场所、校园教育、老旧小区和独居居家等消防管理薄弱场景，自主搭建壹消智慧火灾预警运维云平台。</p>
              <p>区别于单一硬件销售，公司把智慧消防搭建、7×24小时云端值守和全域落地代运维连成一条服务链，持续解决设备有人装、报警有人应、故障有人修的问题。</p>
            </div>
          </div>
          <div className="service-list">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                  <article key={service.number} data-reveal="up" data-delay={String(Number(service.number))}>
                  <div className="service-mark"><span>{service.number}</span><Icon aria-hidden="true" /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="page-shell">
          <div className="section-number" data-reveal="up"><span>02</span><b>壹消平台</b></div>
          <div className="platform-heading" data-reveal="up" data-delay="1">
            <h2 data-reveal="left" data-delay="2">从感知到处置<br /><span className="section-title-accent">把消防安全纳入日常管理</span></h2>
            <p data-reveal="right" data-delay="3">壹消平台依托物联网感知、AI智能算法和大数据GIS可视化技术，为政府、街道和项目管理人员提供设备监控、风险研判、联动处置和运维台账。</p>
          </div>
          <div className="platform-pillars">
            {platformPillars.map((pillar) => {
              const Icon = pillar.icon;
              return <article key={pillar.label} data-reveal="up" data-delay={pillar.label === "技防" ? "1" : pillar.label === "人防" ? "2" : "3"}><Icon aria-hidden="true" /><span>{pillar.label}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></article>;
            })}
          </div>
          <div className="platform-content">
            <figure className="platform-screen" data-reveal="left" data-delay="1">
              <div><span>壹消智慧火灾预警运维云平台</span><b>告警管理界面</b></div>
              <img src="/assets/platform-dashboard.png" alt="壹消智慧消防平台告警管理界面" />
            </figure>
            <div className="platform-list" data-reveal="right" data-delay="2">
              {platformItems.map((item) => {
                const Icon = item.icon;
                  return (
                  <article key={item.title} data-reveal="up" data-delay={(platformItems.indexOf(item) % 4) + 1}>
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
          <figure className="sensor-figure" data-reveal="left">
            <div className="sensor-tech-lines" aria-hidden="true"><i className="sensor-node sensor-node-a" /><i className="sensor-node sensor-node-b" /><i className="sensor-node sensor-node-c" /></div>
            <div className="sensor-image-wrap"><img src="/assets/smoke-sensor.png" alt="AI大数据烟感设备" /></div>
            <figcaption>智能烟感设备</figcaption>
          </figure>
            <div className="sensor-copy" data-reveal="right">
              <div className="section-number" data-reveal="up"><span>03</span><b>智能终端</b></div>
            <h2 data-reveal="right" data-delay="1">AI大数据烟感<br /><span className="section-title-accent">与多维风险感知</span></h2>
            <p className="sensor-lead" data-reveal="right" data-delay="2">烟感只是感知网络的入口。平台可接入烟感、可视烟感、电气监测等终端，持续采集烟、火、电、温等风险信号，再由值守人员核实并推动现场处置。</p>
            <dl data-reveal="up" data-delay="3">
              {sensorItems.map((item) => {
                const Icon = item.icon;
                return <div key={item.title} data-reveal="up" data-delay={(sensorItems.indexOf(item) % 4) + 1}><dt><Icon aria-hidden="true" /><span>{item.title}</span></dt><dd>{item.text}</dd></div>;
              })}
            </dl>
          </div>
        </div>
      </section>

      <section className="operations-section">
        <div className="page-shell operations-inner">
          <div className="section-number light" data-reveal="up"><span>04</span><b>代运维服务</b></div>
          <div className="operations-copy" data-reveal="up" data-delay="1">
            <h2 data-reveal="left" data-delay="2">7×24小时人工值守<br /><span className="section-title-accent">确保每一次告警有人响应</span></h2>
            <p data-reveal="right" data-delay="3">自建专属值守中心，自动告警与人工复核双重把关。告警触发后，值守人员完成核验、分级研判、责任人通知和工单跟进；设备离线、低电量或故障时，平台自动提醒并派发维修任务。</p>
          </div>
          <div className="operation-assurances">
            {operationAssurances.map((item) => {
              const Icon = item.icon;
              return <article key={item.title} data-reveal="up" data-delay={(operationAssurances.indexOf(item) % 3) + 1}><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>;
            })}
          </div>
          <figure className="operations-media" data-reveal="scale" data-delay="2">
            <img src="/assets/operations-center.jpg" alt="壹消智慧消防运营中心实景" />
            <figcaption><span>运营保障</span><strong>智慧消防运营中心实景</strong></figcaption>
          </figure>
          <ol className="process-list">
            {operationSteps.map((step) => {
              const Icon = step.icon;
              return <li key={step.number} data-reveal="up" data-delay={String(Number(step.number))}><div><Icon aria-hidden="true" /><span>{step.number}</span></div><strong>{step.title}</strong><small>{step.detail}</small></li>;
            })}
          </ol>
        </div>
      </section>

      <section className="mode-section">
        <div className="page-shell">
          <div className="section-number" data-reveal="up"><span>05</span><b>整体服务模式</b></div>
          <div className="mode-heading" data-reveal="up" data-delay="1">
            <h2 data-reveal="left" data-delay="2">一体化全包服务<br /><span className="section-title-accent">让甲方少操心、能验收</span></h2>
            <p data-reveal="right" data-delay="3">硬件设备部署、壹消云平台管控、7×24小时人工值守和全周期代运维协同运行。甲方无需另行配备专职值守人员，也无需自行对接维修和整理台账。</p>
          </div>
          <div className="mode-grid">
            {serviceMode.map((item) => {
              const Icon = item.icon;
              return <article key={item.number} data-reveal="up" data-delay={String(Number(item.number))}><div className="mode-mark"><span>{item.number}</span><Icon aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.text}</p></article>;
            })}
          </div>
          <div className="mode-footnote" data-reveal="up" data-delay="2"><strong>服务结果</strong><span>消防安全智能化、常态化、标准化、闭环化管理</span></div>
        </div>
      </section>

      <section className="results-section">
        <div className="page-shell">
          <div className="section-number" data-reveal="up"><span>06</span><b>项目运行情况</b></div>
          <div className="results-heading" data-reveal="up" data-delay="1">
            <h2 data-reveal="left" data-delay="2">项目运行数据<br /><span className="section-title-accent">对应真实的服务结果</span></h2>
            <p data-reveal="right" data-delay="3">以下数据整理自公司现有项目资料及媒体报道，用于说明设备规模、重点人群守护和典型风险处置情况。</p>
          </div>
          <div className="metrics-list">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return <div key={metric.label} data-reveal="up" data-delay={(metrics.indexOf(metric) % 4) + 1}><Icon aria-hidden="true" /><strong>{metric.value}<sup>{metric.unit}</sup></strong><span>{metric.label}</span><small>{metric.detail}</small></div>;
            })}
          </div>
          <p className="results-note" data-reveal="up" data-delay="2">数据来源：公司项目资料及相关媒体报道，具体项目数据以合同、验收和运维报告为准。</p>
        </div>
      </section>

      <section className="cases-section" id="cases">
        <div className="page-shell">
          <div className="section-number" data-reveal="up"><span>07</span><b>服务案例</b></div>
          <div className="cases-heading" data-reveal="up" data-delay="1">
            <h2 data-reveal="left" data-delay="2">落地项目与<span className="section-title-accent">服务场景</span></h2>
            <p data-reveal="right" data-delay="3">不是简单部署设备，而是围绕不同区域的管理难题建立长期运维机制。</p>
          </div>
          <CaseShowcase cases={cases} />
        </div>
      </section>

      <footer className="site-footer">
        <div className="page-shell footer-main">
          <div className="footer-brand" data-reveal="left">
            <img src="/assets/brand-mark.jpg" alt="" />
            <div><strong>壹壹壹壹（北京）安全技术有限公司</strong><span>智慧消防建设与运营服务</span></div>
          </div>
          <div className="footer-product" data-reveal="right" data-delay="1"><span>核心产品</span><strong>壹消智慧火灾预警运维云平台</strong></div>
        </div>
        <div className="page-shell footer-bottom" data-reveal="up" data-delay="2"><span>© 2026 壹壹壹壹（北京）安全技术有限公司</span><span>本页为官方网站首页小样</span></div>
      </footer>
      <RevealObserver />
    </main>
  );
}
