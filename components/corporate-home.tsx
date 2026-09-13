/* oxlint-disable next/no-img-element, next/no-html-link-for-pages -- static site navigation must preserve full-page route transitions in Vinext */
import type { CSSProperties } from 'react';
import {
  Activity,
  AlarmSmoke,
  ArrowDown,
  ArrowUpRight,
  BellRing,
  Building2,
  ClipboardCheck,
  Database,
  FileText,
  Headphones,
  Home,
  MapPin,
  MonitorCog,
  Network,
  PhoneCall,
  ScanLine,
  School,
  Store,
  Warehouse,
  Wrench,
} from 'lucide-react';
import ImageLightbox from './image-lightbox';
import ProjectGallery from './project-gallery';
import CorporateMotion from './corporate-motion';
import HeroWaves from './hero-waves';
import { HeroLine, RevealImage } from './site-motion-bits';
import './corporate-home.css';

const services = [
  {
    icon: MonitorCog,
    title: '设备部署与建档',
    text: '根据建筑环境和项目需求部署智能烟感、视频及电气监测终端，完成设备型号、安装点位、通信状态和维保记录建档。经核查后的存量设备，也可纳入统一管理。',
    output: '点位信息 · 设备台账',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/560d9b0afede6b23/assets/service-device-equipment.jpg',
    imageAlt: '资料中的电气火灾监控设备与传感器',
    visualLabel: '设备与点位',
    mediaType: 'product',
  },
  {
    icon: BellRing,
    title: '全天候接警与通知',
    text: '平台持续接收设备状态和告警信息，由值守坐席开展复核，结合项目预案通过电话、短信或移动端通知相关责任人，并持续跟进核查与处置结果。',
    output: '告警记录 · 通知记录',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/884abe9a6b30bf70/assets/service-duty-operator.jpg',
    imageAlt: '资料中的智慧消防运维中心值守人员',
    visualLabel: '人工值守',
    mediaType: 'photo',
  },
  {
    icon: Wrench,
    title: '日常巡检与维修',
    text: '按计划检查遮挡、积灰、移位、离线、低电量和设备故障等问题，现场调试、维修或更换设备，并把照片、工单与复核结果回传平台。',
    output: '巡检记录 · 维修工单',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/360fbe775c230874/assets/service-field-inspection-v2.webp',
    imageAlt: '运维人员在现场检查烟感设备',
    visualLabel: '现场巡检',
    mediaType: 'photo',
  },
  {
    icon: FileText,
    title: '运行报告与交接',
    text: '汇总设备状态、告警趋势、巡检维修和处置进度，形成运行报告、问题清单及可追溯台账，便于管理人员复核整改、研判重点点位和完成项目交接。',
    output: '运行报告 · 问题清单',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/10ec819dd450c87a/assets/service-maintenance-order.jpg',
    imageAlt: '资料中的维修工单管理界面',
    visualLabel: '工单归档',
    mediaType: 'screen',
  },
];

const topology = [
  { icon: AlarmSmoke, title: '感知设备', note: '烟感、视频与电气监测终端接入' },
  { icon: Database, title: '智慧平台', note: '点位状态、分级告警与工单汇聚' },
  { icon: Headphones, title: '人工值守', note: '7×24小时核实、通知与持续跟进' },
  { icon: Wrench, title: '现场运维', note: '巡检、维修、更换与结果归档' },
];

const companyPoints = [
  {
    title: '基层治理场景',
    text: '重点服务老旧街巷、历史文化街区、社区院落、沿街商铺、校园及其他重点单位。',
  },
  {
    title: '技防、人防、物防协同',
    text: '以感知设备发现异常，以平台汇集信息，以人工值守和现场运维完成核实与落地处置。',
  },
  {
    title: '全周期持续运营',
    text: '覆盖设备建档、在线监测、告警通知、巡检维修、工单归档和运行报告，不止完成一次性安装。',
  },
];

const steps = [
  [
    '设备 / 平台',
    '接收异常，定位点位',
    '感知终端上传状态与告警，平台显示发生时间、设备位置、异常类型和关联责任信息，并按项目规则进行分级。',
  ],
  [
    '值守中心',
    '人工复核，分级通知',
    '值守人员核对平台信息并联系现场，过滤明显误报；确认需要跟进后，按预案通知场所负责人、物业或属地人员。',
  ],
  [
    '责任人 / 运维 / 应急力量',
    '现场核查，分类处置',
    '现场人员核查实际情况。安全事件按既定预案处置并视情联动相关力量；设备异常由运维人员检查、调试、维修或更换。',
  ],
  [
    '平台 / 值守 / 管理人员',
    '结果回传，闭环归档',
    '保存核实、通知、现场照片、处理结果和复核记录；未完成事项继续进入工单跟进，结案后纳入台账与运行分析。',
  ],
];

const platformCapabilities = [
  {
    icon: MapPin,
    title: 'GIS一张图管控',
    text: '将消防感知点位落到电子地图，按区域和设备类型查看在线、离线、故障及告警状态。',
  },
  {
    icon: BellRing,
    title: '分级告警与人工复核',
    text: '汇集火警、电气隐患和设备故障等信息，结合风险等级推送，并由值守人员进一步核实。',
  },
  {
    icon: ClipboardCheck,
    title: '闭环运维工单',
    text: '在线管理派单、现场打卡、照片回传、维修结果和结案复核，让每项任务留有记录。',
  },
  {
    icon: MonitorCog,
    title: '设备生命周期管理',
    text: '集中维护设备型号、安装点位、通信状态、电池更换及维修历史，持续掌握设备健康情况。',
  },
  {
    icon: Activity,
    title: '运行数据分析',
    text: '统计告警趋势、高频隐患点位、设备异常和处置进度，为巡检安排与管理复盘提供依据。',
  },
  {
    icon: Network,
    title: '多端权限协同',
    text: '面向管理人员、网格员、运维人员和场所负责人配置对应入口与权限，减少信息断层。',
  },
];

const serviceScenes = [
  {
    icon: Building2,
    title: '历史文化街区',
    text: '面向古建周边、老旧院落和胡同商铺，兼顾存量建筑保护与分散点位的日常管理。',
  },
  {
    icon: Home,
    title: '老旧平房与居民小区',
    text: '建立设备台账，接入智能烟感，持续开展状态监测、告警通知和上门巡检。',
  },
  {
    icon: Store,
    title: '沿街商铺与九小场所',
    text: '关注烟雾、用气用电和设备异常，帮助基层管理人员更快定位并跟进风险点位。',
  },
  {
    icon: School,
    title: '中小学与幼儿园',
    text: '覆盖校园重点区域的感知设备、平台监测、巡检运维及消防安全管理记录。',
  },
  {
    icon: Warehouse,
    title: '仓储物流与重点单位',
    text: '对关键区域和重要点位进行统一接入，结合告警分级、责任通知和工单管理开展持续运营。',
  },
  {
    icon: PhoneCall,
    title: '独居老人居家场景',
    text: '接入智能烟感与紧急求助信号，按项目预案联系家属、社区或相关责任人员。',
  },
];

const navItems = [
  ['产品展示', '/products'],
  ['AI 大数据烟感', '/products/smoke'],
  ['项目案例', '#projects'],
  ['新闻资讯', '/news'],
];

const mobileNavItems = [
  { icon: Home, label: '首页', href: '#top' },
  { icon: Database, label: '产品', href: '/products' },
  { icon: AlarmSmoke, label: 'AI烟感', href: '/products/smoke' },
  { icon: Building2, label: '案例', href: '#projects' },
  { icon: FileText, label: '资讯', href: '/news' },
  { icon: PhoneCall, label: '联系', href: '/contact' },
];

const heroMetrics = [
  {
    value: '7×24',
    title: '人工值守',
    note: '持续接收、复核并跟进告警',
  },
  {
    value: '4',
    title: '处置环节',
    note: '监测、核实、处置、归档',
  },
  {
    value: '6',
    title: '平台模块',
    note: '点位、告警、工单与数据协同',
  },
];

function SectionHeading({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="c-heading" data-scroll-reveal="heading">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function CorporateHome() {
  return (
    <div className="corporate">
      <CorporateMotion />
      <div className="c-page-progress" aria-hidden="true" />
      <a className="c-skip" href="#business">
        跳到正文
      </a>

      <header className="c-header">
        <a className="c-brand" href="#top" aria-label="返回首页">
          <img src="https://yiyiyiyi.cn-nb1.rains3.com/website/92caeb2d0cd9552d/assets/brand-mark.jpg" alt="" />
          <span>
            <b>壹壹壹壹</b>
            <small>（北京）安全技术有限公司</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="#top" aria-current="page">
            首页
          </a>
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="c-header-contact" href="/contact">
          联系我们 <ArrowUpRight size={17} />
        </a>
      </header>

      <nav className="c-mobile-dock" aria-label="手机快捷导航">
        {mobileNavItems.map(({ icon: Icon, label, href }) => (
          <a href={href} key={href} aria-current={href === '#top' ? 'page' : undefined}>
            <Icon aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <main>
        <section className="c-hero" id="top" data-scroll-section>
          <picture className="c-hero-picture">
            <source
              media="(max-width: 760px)"
              srcSet="https://yiyiyiyi.cn-nb1.rains3.com/website/3bef8aeee7849a62/assets/smart-city-hero-mobile-refined.webp"
            />
            <img
              className="c-hero-image"
              src="https://yiyiyiyi.cn-nb1.rains3.com/website/017cfc36f451b04a/assets/smart-city-hero-desktop-refined.webp"
              alt=""
            />
          </picture>
          <div className="c-hero-shade" aria-hidden="true" />
          <HeroWaves />
          <div className="c-hero-frame" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="c-shell c-hero-stage">
            <div className="c-hero-body">
              <div className="c-hero-status">
                <Activity aria-hidden="true" />
                <span>城市基层智慧消防运营服务</span>
                <b>持续在线</b>
              </div>
              <h1><HeroLine text="智慧消防 火灾预警" /><em><HeroLine text="系统建设与代运维" entranceDelay={0.47} /></em></h1>
              <p className="c-hero-intro">
                面向街道、社区、历史街区、校园及重点单位，提供智能感知设备部署、壹消平台接入、7×24小时人工值守与现场代运维。让设备有人管、告警有人应、故障有人修。
              </p>
              <div className="c-actions">
                <a className="c-action-primary" href="#business">
                  查看服务能力 <ArrowDown size={18} />
                </a>
                <a className="c-action-secondary" href="#projects">
                  项目实景 <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

          </div>

          <div className="c-hero-metrics" aria-label="智慧消防服务体系概览">
            <div className="c-shell c-hero-metrics-grid">
              {heroMetrics.map(({ value, title, note }) => (
                <article key={title}>
                  <strong>{value}</strong>
                  <p>
                    <b>{title}</b>
                    <span>{note}</span>
                  </p>
                </article>
              ))}
              <a href="#platform">
                继续了解 <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="c-section c-business" id="business" data-scroll-section>
          <div className="c-shell">
            <div className="c-business-video" data-scroll-reveal="split">
              <video
                src="https://yiyiyiyi.cn-nb1.rains3.com/website/4e2e426b83751d0b/media/smart-fire-v6.mp4"
                autoPlay muted loop playsInline controls preload="metadata"
                aria-label="智慧消防平台演示视频"
              />
              <span>智慧消防平台 · 现场运维实录</span>
            </div>
            <SectionHeading
              title="智慧消防代运维服务"
              text="壹壹壹壹（北京）安全技术有限公司深耕城市基层消防治理，以自主研发的壹消智慧消防平台为管理中枢，将物联网感知、人工值守和落地运维纳入同一服务体系。"
            />

            <div className="c-company-overview" data-scroll-reveal="split">
              <div className="c-company-intro">
                <span>公司定位</span>
                <h3>城市基层智慧消防全周期服务</h3>
                <p>
                  围绕传统消防“重安装、轻运维、缺闭环”的管理难题，公司提供从前端设备部署、平台接入到日常值守、巡检维修和运行复盘的一站式服务。
                </p>
                <p>
                  服务重点不是单次交付设备，而是让感知、告警、责任通知、现场处置与结果归档持续运转，帮助管理单位看清设备状态、掌握待办事项并留存完整过程记录。
                </p>
              </div>
              <div className="c-company-points">
                {companyPoints.map(({ title, text }) => (
                  <article key={title}>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="c-topology" aria-label="智慧消防服务链路" data-scroll-reveal="line">
              <div className="c-topology-head">
                <span>
                  <Network size={18} /> 运行链路
                </span>
                <b>感知、平台、人员与现场协同</b>
              </div>
              <div className="c-topology-track">
                {topology.map(({ icon: Icon, title, note }) => (
                  <article key={title}>
                    <Icon aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{note}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="c-services">
              {services.map(
                (
                  {
                    icon: Icon,
                    title,
                    text,
                    output,
                    image,
                    imageAlt,
                    visualLabel,
                    mediaType,
                  },
                ) => (
                  <article key={title}>
                    <RevealImage
                      className={`c-service-media c-service-media-${mediaType}`}
                    >
                      <img
                        src={image}
                        alt={imageAlt}
                        loading="lazy"
                        data-lightbox
                      />
                      <span>{visualLabel}</span>
                    </RevealImage>
                    <div className="c-service-content">
                      <div className="c-card-top">
                        <Icon aria-hidden="true" />
                      </div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <div className="c-output">
                        <span>形成记录</span>
                        <b>{output}</b>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
            <p className="c-note">
              具体设备配置、巡检频次、维修及耗材范围、服务期限，在项目方案与合同中明确。
            </p>
          </div>
        </section>

        <section className="c-section c-platform-section" id="platform" data-scroll-section>
          <div className="c-shell">
            <SectionHeading
              title="壹消智慧消防平台"
              text="壹消平台围绕监测、预警、处置和管理四个环节，集中承载GIS点位、设备状态、分级告警、人工复核、运维工单、统计分析与多端权限，减少分散查找和反复确认。"
            />

            <div className="c-platform" data-scroll-reveal="screen">
              <figure className="c-platform-screen">
                <div className="c-screen-head">
                  <span>
                    <ScanLine size={16} /> 壹消智慧消防平台
                  </span>
                  <b>ALARM MANAGEMENT</b>
                </div>
                <div className="c-screen-media">
                  <img
                    src="https://yiyiyiyi.cn-nb1.rains3.com/website/4c47528394cbe627/assets/platform-dashboard.png"
                    alt="壹消平台告警管理界面，点击查看大图"
                    loading="lazy"
                    data-lightbox
                  />
                </div>
                <figcaption>
                  <span>真实平台界面</span> 点击查看大图
                </figcaption>
              </figure>

              <div className="c-platform-list">
                <div className="c-platform-status">
                  <Activity aria-hidden="true" />
                  <span>平台核心功能</span>
                  <b>六个模块协同运行</b>
                </div>
                {platformCapabilities.map(
                  ({ icon: Icon, title, text }) => (
                    <article key={title}>
                      <Icon aria-hidden="true" />
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </div>

            <div className="c-sensor" data-scroll-reveal="split">
              <div className="c-sensor-copy">
                <h3>烟感设备与平台协同</h3>
                <p>
                  前端感知设备是风险信号的采集入口，不替代现场核实与消防处置。设备接入平台后，在线、离线、低电量、故障及告警状态统一汇聚，值守人员负责核实和通知，运维人员负责日常检查、故障处理与更换记录。
                </p>
                <div className="c-sensor-tags">
                  <span>点位建档</span>
                  <span>状态接入</span>
                  <span>异常上报</span>
                  <span>维保工单</span>
                </div>
                <p className="c-note">
                  设备类型与点位数量，根据建筑环境和项目需求确定。
                </p>
              </div>
              <div className="c-sensor-image">
                <img
                  src="https://yiyiyiyi.cn-nb1.rains3.com/website/2e69c8381435d0a9/assets/smoke-sensor.png"
                  alt="智能烟感设备"
                  loading="lazy"
                  data-lightbox
                />
                <p>智能烟感设备</p>
              </div>
            </div>
          </div>
        </section>

        <section className="c-section c-operations" id="operations" data-scroll-section>
          <div className="c-shell">
            <SectionHeading
              title="告警响应与闭环处置"
              text="告警信息进入平台后，通过自动分级、人工复核、责任人触达、现场处理和归档复盘形成闭环。不同场景按预案确定通知对象、到场职责与升级路径。"
            />

            <div className="c-workflow" data-scroll-reveal="workflow">
              <figure>
                <div className="c-workflow-frame">
                  <img
                    src="https://yiyiyiyi.cn-nb1.rains3.com/website/eb96cec2e92f195c/assets/operations-center.jpg"
                    alt="智慧消防运维中心工作场景"
                    loading="lazy"
                    data-lightbox
                  />
                  <div className="c-workflow-live">
                    <Activity size={15} />
                    值守中心实景
                  </div>
                </div>
                <figcaption>
                  <strong>智慧消防运维中心</strong>
                  <span>项目资料中的运维工作场景</span>
                </figcaption>
              </figure>

              <ol>
                {steps.map(([role, title, text], index) => (
                  <li key={title}>
                    <span className="c-step-number">0{index + 1}</span>
                    <div>
                      <small>{role}</small>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="c-note">
              告警通知对象、现场响应职责与处置要求，按各项目预案执行。
            </p>
          </div>
        </section>

        <section className="c-section c-project-section" id="projects" data-scroll-section>
          <div className="c-shell">
            <SectionHeading
              title="服务场景与项目案例"
              text="服务方案会根据建筑形态、人员结构、设备基础和管理责任调整。从历史街区、老旧院落到校园与重点单位，设备配置可以不同，但持续监测、人工值守、现场运维和过程留痕是共同基础。"
            />
            <div className="c-scene-grid" aria-label="适用服务场景" data-scroll-reveal="line">
              {serviceScenes.map(({ icon: Icon, title, text }) => (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div data-scroll-reveal="gallery">
              <ProjectGallery />
            </div>
          </div>
        </section>
        <div className="c-footer-city" aria-hidden="true">
          <img src="https://yiyiyiyi.cn-nb1.rains3.com/website/d942268682076ef7/assets/footer-city-skyline-v2.png" alt="" loading="lazy" decoding="async" />
        </div>
      </main>

      <footer className="c-footer" id="contact">

        <div className="c-shell c-footer-main" data-scroll-reveal="line">
          <div className="c-footer-brand">
            <img src="https://yiyiyiyi.cn-nb1.rains3.com/website/92caeb2d0cd9552d/assets/brand-mark.jpg" alt="" />
            <div>
              <h2>壹壹壹壹</h2>
              <strong>（北京）安全技术有限公司</strong>
            </div>
            <p>
              面向街道、社区、校园及重点单位，提供智慧消防系统建设、平台接入、人工值守与全周期代运维服务。
            </p>
          </div>

          <div className="c-footer-columns">
            <nav className="c-footer-column" aria-label="页脚导航">
              <h3>快速导航</h3>
              <a href="#top">首页</a>
              <a href="/products">产品展示</a>
              <a href="#operations">告警流程</a>
              <a href="#projects">项目案例</a>
            </nav>

            <div className="c-footer-column">
              <h3>服务范围</h3>
              <p>设备部署与平台接入</p>
              <p>人工值守与告警通知</p>
              <p>巡检维修与运行报告</p>
              <p>项目台账与运维复盘</p>
            </div>

            <div className="c-footer-column c-footer-column-contact">
              <h3>联系我们</h3>
              <p>项目负责人：熊贵齐</p>
              <a className="c-footer-phone" href="tel:17600000015">
                <PhoneCall aria-hidden="true" /> 176 0000 0015
              </a>
              <p>方案沟通与项目合作</p>
            </div>
          </div>
        </div>

        <div className="c-shell c-copyright">
          <span>© 2026 壹壹壹壹（北京）安全技术有限公司</span>
          <a href="#top">
            回到顶部 <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </footer>
      <ImageLightbox />
    </div>
  );
}
