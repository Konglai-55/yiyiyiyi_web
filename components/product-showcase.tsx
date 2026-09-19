/* oxlint-disable next/no-img-element, next/no-html-link-for-pages -- static site navigation must preserve full-page route transitions in Vinext */
import {
  Activity,
  AlarmSmoke,
  ArrowDown,
  ArrowUpRight,
  BellRing,
  Building2,
  ClipboardCheck,
  Database,
  Home,
  MapPin,
  MonitorCog,
  Network,
  Newspaper,
  PhoneCall,
  ScanLine,
} from 'lucide-react';
import CorporateMotion from './corporate-motion';
import { RevealImage, ProductSpotlight } from './site-motion-bits';
import ImageLightbox from './image-lightbox';
import './corporate-home.css';
import './product-showcase.css';

const productLayers = [
  {
    icon: AlarmSmoke,
    title: '智能感知设备',
    text: '持续采集烟雾、电气、水压、视频及紧急求助等风险信号，为安全管理提供可靠的数据入口。',
    items: ['烟感监测', '电气监测', '消防水监测', '视频 AI 识别'],
  },
  {
    icon: Database,
    title: '壹消智慧消防平台',
    text: '统一管理区域、建筑、点位、设备、告警和工单，让风险信息集中呈现、处置过程完整留痕。',
    items: ['GIS 一张图', '智能预警', '闭环工单', '数据驾驶舱'],
  },
  {
    icon: Network,
    title: '多端协同应用',
    text: '面向管理人员、值守人员、运维人员和场所责任人配置对应入口，减少信息断层。',
    items: ['管理端', '值守端', '运维端', '责任人端'],
  },
];

const deviceTypes = [
  {
    icon: AlarmSmoke,
    title: 'AI 大数据智能烟感',
    text: '面向居民住宅、沿街商铺、校园宿舍、历史街区和老旧院落，持续采集烟雾异常、在线状态、低电量与设备故障信息。',
    fit: '烟感部署、分散点位联网、告警通知与长期运维',
  },
  {
    icon: Activity,
    title: '电气火灾监测',
    text: '面向校园、商铺、园区及重点单位，关注用电回路中的异常变化。',
    fit: '重点用电区域监测、多回路管理、异常记录与整改跟踪',
  },
  {
    icon: MonitorCog,
    title: '消防水系统监测',
    text: '接入消防水压、水位等运行数据，辅助掌握消防水系统状态。',
    fit: '水压水位监测、分散设施巡查与异常通知',
  },
  {
    icon: ScanLine,
    title: '视频 AI 识别',
    text: '结合现场视频识别烟火迹象，为值守人员核实现场提供依据。',
    fit: '重点区域视频巡查、异常画面辅助核实与告警联动',
  },
  {
    icon: BellRing,
    title: '一键报警与求助',
    text: '为校园、居家关怀等场景提供主动上报与紧急求助入口。',
    fit: '主动求助、重点人群关怀与现场异常上报',
  },
];

const platformCapabilities = [
  {
    icon: MapPin,
    title: 'GIS 一张图管控',
    text: '在地图中查看项目分布、设备点位与区域风险。',
  },
  {
    icon: BellRing,
    title: '智能预警中心',
    text: '汇集火警、设备故障和电气隐患并按规则分级。',
  },
  {
    icon: ClipboardCheck,
    title: '任务闭环管理',
    text: '记录派单、到场、处置、复核和归档全过程。',
  },
  {
    icon: MonitorCog,
    title: '设备生命周期',
    text: '集中维护型号、点位、通信状态与维修历史。',
  },
  {
    icon: Activity,
    title: '数据分析驾驶舱',
    text: '分析设备健康度、告警趋势和处置进度。',
  },
  {
    icon: Network,
    title: '多角色权限协同',
    text: '让不同责任主体查看与处理对应范围内的事项。',
  },
];

const processSteps = [
  ['感知', '发现异常', '前端设备采集风险信号与运行状态。'],
  ['汇聚', '进入平台', '点位、时间、类型和责任信息集中呈现。'],
  ['研判', '分级预警', '平台按项目规则识别并推送异常信息。'],
  ['核实', '人工确认', '值守人员联系现场，核对实际情况。'],
  ['处置', '任务执行', '责任人员或运维人员按预案到场处理。'],
  ['归档', '闭环复盘', '保存图片、工单、结果和复核记录。'],
];

const scenarios = [
  ['历史文化街区', '分散点位与存量建筑的持续监测'],
  ['居民社区', '设备台账、告警通知与上门巡检'],
  ['园区与重点单位', '多建筑、多角色的统一安全管理'],
  ['教育校园', '重点区域监测与责任闭环'],
  ['九小场所', '用电、用气与烟火风险关注'],
  ['居家关怀', '烟感与紧急求助信号接入'],
];

function ProductHeading({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="p-heading" data-scroll-reveal="heading">
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

export default function ProductShowcase() {
  return (
    <div className="corporate product-page">
      <CorporateMotion />
      <div className="c-page-progress" aria-hidden="true" />
      <a className="c-skip" href="#product-system">
        跳到产品内容
      </a>

      <header className="c-header">
        <a className="c-brand" href="/" aria-label="返回首页">
          <img src="https://yiyiyiyi.cn-nb1.rains3.com/website/92caeb2d0cd9552d/assets/brand-mark.jpg" alt="" />
          <span>
            <b>壹壹壹壹</b>
            <small>（北京）安全技术有限公司</small>
          </span>
        </a>
        <nav aria-label="主导航">
          <a href="/">首页</a>
          <a href="/products" aria-current="page">
            产品展示
          </a>
          <a href="/products/smoke">AI 大数据烟感</a>
          <a href="/#projects">项目案例</a>
          <a href="/news">新闻资讯</a>
        </nav>
        <a className="c-header-contact" href="/contact">
          联系我们 <ArrowUpRight size={17} />
        </a>
      </header>

      <nav className="c-mobile-dock" aria-label="手机快捷导航">
        <a href="/">
          <Home aria-hidden="true" />
          <span>首页</span>
        </a>
        <a href="#product-system" aria-current="page">
          <Network aria-hidden="true" />
          <span>产品</span>
        </a>
        <a href="/products/smoke">
          <AlarmSmoke aria-hidden="true" />
          <span>AI烟感</span>
        </a>
        <a href="/#projects">
          <Database aria-hidden="true" />
          <span>案例</span>
        </a>
        <a href="/news"><Newspaper aria-hidden="true" /><span>资讯</span></a>
        <a href="/contact">
          <PhoneCall aria-hidden="true" />
          <span>联系</span>
        </a>
      </nav>

      <main>
        <section className="p-hero" id="top" data-scroll-section>
          <div className="p-hero-grid" aria-hidden="true" />
          <div className="p-hero-frame" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="c-shell p-hero-stage">
            <div className="p-hero-copy">
              <div className="p-hero-status">
                <ScanLine aria-hidden="true" />
                <span>智慧消防产品展示</span>
                <b>平台持续在线</b>
              </div>
              <h1>
                壹消智慧消防
                <span>产品体系</span>
              </h1>
              <p>
                先看清要采购什么，再按现场情况组合配置。壹消把智能感知设备、消防平台、告警通知与后续运维接成一套可落地的产品方案。
              </p>
              <div className="p-hero-actions">
                <a href="#product-system">
                  查看产品构成 <ArrowDown aria-hidden="true" />
                </a>
                <a href="tel:17600000015">
                  咨询产品方案 <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="p-hero-console" aria-label="壹消智慧消防平台与智能烟感设备展示">
              <div className="p-console-head">
                <span>
                  <Activity aria-hidden="true" /> 产品运行界面
                </span>
                <b>SMART FIRE SYSTEM</b>
              </div>
              <div className="p-console-screen">
                <img
                  src="https://yiyiyiyi.cn-nb1.rains3.com/website/4c47528394cbe627/assets/platform-dashboard.png"
                  alt="壹消智慧消防平台告警管理界面"
                  loading="eager"
                  decoding="async"
                  data-lightbox
                />
              </div>
              <div className="p-console-device">
                <img src="https://yiyiyiyi.cn-nb1.rains3.com/website/8220252464c65d66/assets/product-sensor-gateway.png" alt="智能感知设备与 IoT 网关" />
                <span>智能感知终端</span>
              </div>
              <div className="p-console-flow" aria-hidden="true">
                <span>感知</span>
                <i />
                <span>分析</span>
                <i />
                <span>预警</span>
                <i />
                <span>处置</span>
              </div>
            </div>
          </div>

          <div className="p-hero-band">
            <div className="c-shell">
              <span>一套平台</span>
              <span>多类感知设备</span>
              <span>多角色协同</span>
              <span>全过程留痕</span>
            </div>
          </div>
        </section>

        <section className="p-section p-system" id="product-system" data-scroll-section>
          <div className="c-shell">
            <ProductHeading
              title="智慧消防产品体系"
              text="以壹消智慧消防平台为管理中枢，将前端感知、平台研判、多端协同和现场处置纳入同一运行链路。"
            />
            <div className="p-system-grid" data-scroll-reveal="cards">
              {productLayers.map(({ icon: Icon, title, text, items }) => (
                <article key={title}>
                  <div className="p-system-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <ul>
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <div className="p-system-link" data-scroll-reveal="line" aria-label="产品运行关系">
              <span>风险信号</span>
              <i />
              <span>集中研判</span>
              <i />
              <span>责任触达</span>
              <i />
              <span>现场闭环</span>
            </div>
            <a className="p-ai-route" href="/#ai-architecture">了解陶然亭方案中的端云协同 AI 技术架构 <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </section>

        <section className="p-section p-devices" id="devices" data-scroll-section>
          <div className="c-shell">
              <ProductHeading
              title="智能感知设备"
              text="从单个商铺、住宅，到校园、园区和街道，按建筑环境与风险点位选择设备。设备负责发现异常，平台和运维服务负责后续核实、通知与处理。"
            />

            <div className="p-device-layout">
              <figure className="p-device-visual">
                <RevealImage className="p-device-image-main">
                  <img
                    src="https://yiyiyiyi.cn-nb1.rains3.com/website/8220252464c65d66/assets/product-sensor-gateway.png"
                    alt="智能感知设备与 IoT 网关"
                    loading="lazy"
                    data-lightbox
                  />
                </RevealImage>
                <figcaption>
                  <strong>感知设备接入</strong>
                  <span>型号、点位与数量依据项目方案确定</span>
                </figcaption>
              </figure>

              <div className="p-device-list">
                {deviceTypes.map(({ icon: Icon, title, text, fit }) => (
                  <article key={title}>
                    <ProductSpotlight><span aria-hidden="true" /></ProductSpotlight>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title === 'AI 大数据智能烟感' ? <a href="/products/smoke">{title}</a> : title}</h3>
                      <p>{text}</p>
                      <small>适合：{fit}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <p className="p-purchase-note">设备型号、通信方式、点位数量和安装范围，根据现场勘察及项目方案确认。</p>
            <article className="p-smoke-detail" data-scroll-reveal="split">
              <div>
                <span className="p-detail-kicker">AI 大数据烟感</span>
                <h3>让每一个烟感点位都有人关注</h3>
                <p>设备负责发现烟雾和运行异常，平台负责汇集点位、时间、区域与历史告警数据，辅助识别高频风险区域和重点时段；值守人员进行人工复核，相关责任人和运维人员按项目预案完成通知、核查与处置。</p>
              </div>
              <div className="p-smoke-detail-points">
                <span><b>01</b>实时感知</span>
                <span><b>02</b>AI 研判</span>
                <span><b>03</b>分级通知</span>
                <span><b>04</b>持续运维</span>
              </div>
            </article>
          </div>
        </section>

        <section className="p-section p-platform" id="platform" data-scroll-section>
          <div className="c-shell">
            <ProductHeading
              title="壹消智慧消防平台"
              text="平台不是单独的一张看板，而是设备接入后的日常工作入口。管理人员看状态，值守人员核告警，运维人员接工单，责任人收到通知。"
            />

            <div className="p-platform-layout" data-scroll-reveal="line">
              <img
                className="p-platform-atmosphere"
                src="https://yiyiyiyi.cn-nb1.rains3.com/website/9738df3fcf273ced/assets/product-data-network.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
              <figure className="p-platform-screen">
                <div className="p-platform-screen-head">
                  <span>
                    <ScanLine aria-hidden="true" /> 告警管理界面
                  </span>
                  <b>真实平台界面 · 点击查看大图</b>
                </div>
                <img
                  src="https://yiyiyiyi.cn-nb1.rains3.com/website/4c47528394cbe627/assets/platform-dashboard.png"
                  alt="壹消智慧消防平台告警管理界面，点击查看大图"
                  loading="lazy"
                  data-lightbox
                />
              </figure>

              <div className="p-capability-list">
                {platformCapabilities.map(({ icon: Icon, title, text }) => (
                  <article key={title}>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="p-buy-strip" data-scroll-reveal="split">
              <strong>平台适合谁使用</strong>
              <span>街道与社区管理人员</span><span>物业与场所负责人</span><span>值守与运维团队</span>
              <a href="tel:17600000015">预约平台演示 <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="p-section p-process" id="process" data-scroll-section>
          <div className="c-shell">
            <ProductHeading
              title="风险发现与闭环处置"
              text="每一次异常从进入平台开始，经过研判、通知和现场处理，最终沉淀为可查询、可复核的完整记录。"
            />
            <ol className="p-process-track" data-scroll-reveal="cards">
              {processSteps.map(([label, title, text], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{label}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="p-section p-scenes" id="scenes" data-scroll-section>
          <div className="c-shell">
            <ProductHeading
              title="多场景消防安全管理"
              text="产品组合随建筑类型、人员结构、设备基础和管理责任调整，保持统一的平台能力与处置逻辑。"
            />
            <div className="p-scene-list" data-scroll-reveal="cards">
              {scenarios.map(([title, text]) => (
                <article key={title}>
                  <Building2 aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>

            <div className="p-consult" data-scroll-reveal="split">
              <div>
                <h2>智慧消防项目合作</h2>
                <p>
                  告诉我们项目所在城市、场所类型、建筑数量或大致面积，以及现有消防设备情况，我们会据此给出设备选型、点位规划、平台接入和服务报价建议。
                </p>
              </div>
              <a href="tel:17600000015">
                获取配置与报价 <PhoneCall aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <div className="c-footer-city" aria-hidden="true">
          <img
            src="https://yiyiyiyi.cn-nb1.rains3.com/website/d942268682076ef7/assets/footer-city-skyline-v2.png"
            alt=""
            loading="lazy"
            decoding="async"
          />
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
              <a href="/">首页</a>
              <a href="#product-system">产品体系</a>
              <a href="#devices">感知设备</a>
              <a href="#platform">智慧平台</a>
            </nav>

            <div className="c-footer-column">
              <h3>产品范围</h3>
              <p>智能感知设备接入</p>
              <p>壹消智慧消防平台</p>
              <p>多角色协同应用</p>
              <p>告警与工单闭环</p>
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
