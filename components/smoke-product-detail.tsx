/* oxlint-disable next/no-img-element, next/no-html-link-for-pages -- static route transitions preserve Vinext stability */
import { Activity, AlarmSmoke, ArrowDown, ArrowUpRight, BellRing, ClipboardCheck, Database, Home, MapPin, Newspaper, PhoneCall, Wrench } from 'lucide-react';
import CorporateMotion from './corporate-motion';
import ImageLightbox from './image-lightbox';
import './corporate-home.css';
import './smoke-product-detail.css';

const points = [
  ['五类告警', '覆盖烟雾火警、拆除、低电压、设备故障与环境高温，区分火情风险与设备维护事项。', AlarmSmoke],
  ['AI 分级上报', '按方案配置本地识别、数据预处理与通知优先级，让火情相关告警优先进入核实流程。', Activity],
  ['人工复核', '告警进入平台后由值守人员核实，减少信息误传和重复处置。', BellRing],
  ['持续运维', '从设备建档、巡检维修到结果复核，完整保留设备生命周期记录。', Wrench],
] as const;
const scenes = [
  ['商铺与独立场所', '关注闭店后、人员不在现场时的烟雾异常。', '按空间布局确定烟感点位，配置联网接入、责任人通知和设备台账。', '提供场所面积、房间布局与现场通信条件。'],
  ['居民社区与老旧院落', '点位分散，住户与物业需要明确通知和核查责任。', '分楼栋管理烟感设备，关联住户及物业信息，按需配置平台值守与上门巡检。', '提供楼栋、住户及已有设备数量。'],
  ['校园与教育场所', '宿舍等重点区域集中监测，告警需要落实到具体负责人。', '按校区、楼栋和房间建立点位，配置分区权限、告警跟进与巡检工单。', '提供校区范围、建筑用途与管理人员分工。'],
  ['街道、园区与历史街区', '跨建筑、跨主体管理，需要统一查看风险和整改进度。', '集中接入分散设备，结合区域数据分析、五方联动和现场运维形成项目服务方案。', '提供管理范围、建筑类型与现有系统情况。'],
];
const alarmTypes = [
  ['烟雾火警', '感知烟雾异常，本地声光报警，并优先推送至平台及责任人员核实。'],
  ['环境高温告警', '提示温度异常，结合现场环境与其他告警信息及时核查。'],
  ['设备拆防告警', '设备拆除状态异常时通知管理人员，核查是否为授权维护并跟进恢复。'],
  ['电池低电压告警', '提示供电不足，进入维护提醒与更换计划，持续跟进直至恢复。'],
  ['设备故障告警', '提示设备工作异常，安排检查、维修或更换，保留处理记录。'],
];
const telemetry = [
  ['在线状态', '查看设备连接情况，定位离线点位。'],
  ['烟雾浓度', '按设备协议获取烟雾数据，关联异常记录。'],
  ['环境温湿度', '结合环境变化辅助核查告警。'],
  ['剩余电量', '按协议显示电量或低电状态，安排维护。'],
  ['4G 信号强度', '辅助检查现场通信覆盖与连接异常。'],
  ['设备拆卸状态', '记录拆除事件与维护后的恢复情况。'],
];
const example = [
  ['设备发现烟雾异常', '商铺内联网烟感上报异常，平台关联设备点位、发生时间和场所责任信息。'],
  ['值守人员核实情况', '按项目配置接收告警，通过电话或现场反馈了解实际情况，记录核实结果。'],
  ['通知责任人员处理', '依照预案通知商户、物业或属地人员。涉及火情时按应急预案联动消防力量，设备故障则转运维检查。'],
  ['结果回传与复核', '现场照片、处理过程和结果进入记录；未完成事项继续跟进，完成后归档并纳入运行分析。'],
];
const scenePhotos = [
  ['source-scene-shop.jpg', '商铺场景配图'],
  ['source-scene-community.jpg', '居民社区场景配图'],
  ['source-scene-campus.jpg', '校园消防演练配图'],
  ['source-scene-hutong.jpg', '老旧胡同场景配图'],
];

export default function SmokeProductDetail() {
  return <div className="corporate smoke-detail-page">
    <CorporateMotion />
    <div className="c-page-progress" aria-hidden="true" />
    <header className="c-header">
      <a className="c-brand" href="/" aria-label="返回首页"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/92caeb2d0cd9552d/assets/brand-mark.jpg" alt="" /><span><b>壹壹壹壹</b><small>（北京）安全技术有限公司</small></span></a>
      <nav aria-label="主导航"><a href="/">首页</a><a href="/products">产品展示</a><a href="/products/smoke" aria-current="page">AI 大数据烟感</a><a href="/#projects">项目案例</a><a href="/news">新闻资讯</a></nav>
      <a className="c-header-contact" href="/contact">联系我们 <ArrowUpRight size={17} /></a>
    </header>
    <nav className="c-mobile-dock" aria-label="手机快捷导航">
      <a href="/"><Home aria-hidden="true" /><span>首页</span></a>
      <a href="/products"><Database aria-hidden="true" /><span>产品</span></a>
      <a href="/products/smoke" aria-current="page"><AlarmSmoke aria-hidden="true" /><span>AI烟感</span></a>
      <a href="/#projects"><MapPin aria-hidden="true" /><span>案例</span></a>
      <a href="/news"><Newspaper aria-hidden="true" /><span>资讯</span></a>
      <a href="/contact"><PhoneCall aria-hidden="true" /><span>联系</span></a>
    </nav>
    <main>
      <section className="smoke-hero" data-scroll-section>
        <div className="smoke-hero-grid" aria-hidden="true" />
        <div className="c-shell smoke-hero-inner">
          <div>
            <span className="smoke-kicker"><AlarmSmoke size={17} /> AI 大数据烟感产品</span>
            <h1>AI 大数据烟感</h1>
            <p>集双光路感烟、五类异常告警与 4G 联网于一体，搭配 AI 智能火情识别与分级上报方案，连接设备监测、云端分析和人工处置。面向商铺、社区、校园与街道，让火情相关告警优先触达，让低电、拆除和故障得到持续跟进。</p>
            <p className="smoke-hero-summary">五类告警 · 温湿度检测 · 分级通知 · 云端台账</p>
            <div className="smoke-actions"><a href="#solution">了解产品方案 <ArrowDown size={18} /></a><a href="tel:17600000015">咨询设备配置 <PhoneCall size={17} /></a></div>
          </div>
          <figure className="smoke-hero-visual"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/c23bf5183fcc06b6/assets/smoke-yl-iot-yw03bd-hd-v1.png" alt="源流物联 YL-IOT-YW03BD 烟感报警器高清重构示意图，外观以实物为准" loading="eager" data-lightbox /><figcaption><b>YL-IOT-YW03BD</b></figcaption></figure>
        </div>
      </section>
      <section className="smoke-section" id="solution" data-scroll-section>
        <div className="c-shell"><div className="smoke-heading"><h2>产品组成与功能</h2><p>烟感终端采集信号，平台汇集与分析数据，人员完成核实和处理。设备、平台功能与服务期限在配置方案中分别列明。</p></div>
          <div className="smoke-point-grid" data-scroll-reveal="cards">{points.map(([title, text, Icon]) => <article key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>
      <section className="smoke-section smoke-dark smoke-ai-section" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>AI 智能火情识别<br />与分级上报</h2><p>设备支持五类异常告警；在此基础上，AI 方案配置本地识别逻辑与数据预处理，标记告警类别和优先级，将火情核实、设备维护分别纳入对应通知流程。</p></div>
          <div className="smoke-alarm-list">{alarmTypes.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="smoke-ai-policy"><h3>通知分级与风险跟进</h3><p>烟雾火警及高温异常优先通知并核实；低电、故障等设备隐患按风险等级安排提醒、工单与升级通知，减少重复消息。分级不是忽略告警，涉及监测失效的异常应及时处理；具体通知时限与升级条件在项目预案中明确。</p></div>
          <p className="smoke-ai-note">AI 判别用于辅助研判，不替代现场核实。算法版本、分类规则及推送策略以项目交付配置为准。<a href="/#ai-architecture">另见陶然亭方案拟采用的端云协同 AI 架构 →</a></p>
        </div>
      </section>
      <section className="smoke-section" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>数据采集与云端管理</h2><p>方案围绕六类设备数据建立运行台账，经本地预处理、干扰数据筛选和标准化整理后，通过 4G 网络上报云端，关联点位、时间与告警记录。</p></div>
          <div className="smoke-telemetry">{telemetry.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <div className="smoke-configurations smoke-cloud-details">
            <article><h3>精卫安消防云平台接入</h3><p>本次补充方案采用精卫安消防云平台管理上报数据，按点位查询状态、告警分类与 AI 分析台账，辅助值守复核和运维跟进。与现有壹消平台的对接方式、账号权限及数据同步范围在交付方案中明确。</p></article>
            <article><h3>AI 台账与统计报表</h3><p>按区域、时间、设备与告警类型整理分析记录，按平台配置导出台账及统计报表，用于消防检查资料准备、隐患整改跟踪和运行复盘。报表字段、格式与导出权限以交付版本为准。</p></article>
          </div>
          <p className="smoke-data-note">采集频率、烟雾浓度与电量的显示形式、信号字段及上报协议以设备固件和平台对接配置为准。规格书确认温湿度检测与五类告警支持，未列明全部云端字段及 AI 功能。</p>
        </div>
      </section>
      <section className="smoke-section smoke-dark" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>设备规格</h2><p>源流物联 YL-IOT-YW03BD 独立式光电感烟火灾探测报警器。以下参数依据产品规格书 V1.2，AI 与云端功能另按方案确认。</p></div>
          <dl className="smoke-specs">
            <div><dt>感烟技术</dt><dd>双光路（红外光、蓝光），光电式感知</dd></div>
            <div><dt>通信方式</dt><dd>4G Cat.1</dd></div>
            <div><dt>本地报警</dt><dd>声、光报警；正前方 3 米处声压级 &gt;80 dB(A)</dd></div>
            <div><dt>供电与寿命</dt><dd>DC 3V，2 节 AA 1.5V 电池；正常环境下设计寿命三年以上</dd></div>
            <div><dt>保护面积</dt><dd>规格书标注 30–60㎡，实际点位按建筑环境与安装要求确定</dd></div>
            <div><dt>工作环境</dt><dd>−10℃ 至 +50℃；相对湿度 ≤95%RH，不凝露</dd></div>
            <div><dt>操作与安装</dt><dd>自检／消音按键，支持红外消音、电池防漏装；螺钉或双面胶固定</dd></div>
            <div><dt>尺寸与重量</dt><dd>Φ95 × H54.5mm；约 155g（含底座、电池）</dd></div>
          </dl>
        </div>
      </section>
      <section className="smoke-section smoke-dark" data-scroll-section>
        <div className="c-shell smoke-split"><div><span className="smoke-kicker">平台协同</span><h2>每一次告警<br /><em>都有后续动作</em></h2><p>平台记录点位、时间、异常类型与责任信息，按项目规则分级推送。值守人员联系现场进行核实；需要处理的事项进入工单，由责任人或运维人员完成处置并回传结果。</p></div><div className="smoke-chain"><div><Database /><b>告警进入平台</b><span>点位与状态集中呈现</span></div><div><BellRing /><b>值守复核通知</b><span>按预案触达责任人员</span></div><div><ClipboardCheck /><b>处置结果归档</b><span>照片、工单与复核记录留存</span></div></div></div>
      </section>
      <section className="smoke-section" id="smoke-scenes" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>场景配置方案</h2><p>从单个场所到区域统一管理，按点位规模、人员职责和服务需求确定配置。</p></div>
          <div className="smoke-configurations smoke-scene-cards">{scenes.map(([title, need, config, input], index) => <article key={title}><figure className="smoke-scene-photo"><img src={`/assets/${scenePhotos[index][0]}`} alt={scenePhotos[index][1]} loading="lazy" data-lightbox /><figcaption>{scenePhotos[index][1]} · 来源：平台介绍资料</figcaption></figure><div className="smoke-scene-copy"><h3>{title}</h3><p>{need}</p><dl><dt>配置建议</dt><dd>{config}</dd><dt>咨询时提供</dt><dd>{input}</dd></dl><a href="#smoke-quote">咨询本场景配置 <ArrowUpRight size={18} /></a></div></article>)}</div>
        </div>
      </section>
      <section className="smoke-section smoke-dark" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>商铺告警处理示例</h2><p>以闭店后出现烟雾告警为例，说明联网烟感与配套值守服务如何衔接。实际通知对象与处理职责按项目预案配置。</p></div>
          <div className="smoke-example"><figure><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/884abe9a6b30bf70/assets/source-duty-dashilan.jpg" alt="大栅栏智慧消防运维中心人员在电脑前值守" loading="lazy" data-lightbox /><figcaption>资料实拍 · 大栅栏智慧消防运维中心值守场景（非上述告警事件现场）</figcaption></figure><ol>{example.map(([title, text], index) => <li key={title}><b>{index + 1}</b><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div>
        </div>
      </section>
      <section className="smoke-section" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>平台管理与数据分析</h2><p>日常查看设备是否在线、哪些告警待核实、哪些任务未完成；结合历史数据安排重点巡检和运行复盘。</p></div>
          <figure className="smoke-platform-image"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/eb96cec2e92f195c/assets/source-center-overview.jpg" alt="资料中的智慧消防运维中心，集中显示区域地图、设备统计与告警信息" loading="lazy" data-lightbox /><figcaption>资料实拍 · 运维中心大屏与工作席位，可点击查看原图</figcaption></figure>
          <div className="smoke-configurations">
            <article><h3>设备状态与点位台账</h3><p>按区域和点位查看设备状态，维护安装位置、责任信息、低电量、离线与故障记录，便于安排检查和更换。</p></article>
            <article><h3>告警记录与处理进度</h3><p>集中查看告警类型、发生时间、通知记录与处置进度，关联现场照片、维修工单和复核结果。</p></article>
            <article><h3>AI 与历史数据分析</h3><p>结合历史报警、时间和空间信息，辅助识别高频告警点位与重点时段，为风险研判和资源安排提供参考。烟感采集与平台分析共同工作，告警仍需核实。</p></article>
            <article><h3>多角色协同</h3><p>按管理范围分配权限，连接管理人员、物业、值守与运维团队。五方联动涵盖消防部门、社区或街道、物业、企业或学校、科技服务方，具体职责由项目明确。</p></article>
          </div>
        </div>
      </section>
      <section className="smoke-section smoke-dark" data-scroll-section>
        <div className="c-shell">
          <div className="smoke-heading"><h2>交付与运维服务</h2><p>以智能监测、专业维保和应急联动覆盖日常使用。以下服务按项目选配，报价中明确范围、期限和责任。</p></div>
          <div className="smoke-configurations">
            <article><h3>现场勘察与设备配置</h3><p>了解建筑布局、使用环境和通信条件，确定设备型号、数量与安装点位；对已有设备评估接入兼容性。</p></article>
            <article><h3>安装调试与使用交接</h3><p>完成设备安装、联网调试、点位建档、账号权限与通知规则配置，开展操作培训并按约定项目验收。</p></article>
            <article><h3>平台值守与告警跟进</h3><p>可配置 7×24 小时人工值守，开展告警核实、责任人通知和持续跟进。通知渠道、升级路径与现场响应要求在预案中明确。</p></article>
            <article><h3>巡检维护与运行报告</h3><p>检查设备离线、低电量、积灰和故障，按约定维修或更换。汇总设备健康、告警处理和问题清单，形成可追溯的运行记录。</p></article>
          </div>
          <div className="smoke-order" id="smoke-quote"><div><span>产品咨询与订购</span><h2>获取烟感配置与报价</h2><p>提供项目城市、场所类型、建筑数量或面积、现有设备情况，以及是否需要人工值守和现场维护。我们据此沟通配置方案，并分别明确设备、安装、平台使用及运维服务费用。</p><p>咨询 → 需求与现场评估 → 配置报价 → 确认交付与服务范围</p><p>产品咨询：熊贵齐 · 176 0000 0015</p></div><a href="tel:17600000015">电话咨询配置与报价 <PhoneCall /></a></div>
        </div>
      </section>
      <div className="c-footer-city" aria-hidden="true"><img src="https://yiyiyiyi.cn-nb1.rains3.com/website/d942268682076ef7/assets/footer-city-skyline-v2.png" alt="" loading="lazy" /></div>
    </main>
    <footer className="c-footer"><div className="c-shell c-copyright"><span>壹壹壹壹（北京）安全技术有限公司 · AI 大数据智能烟感</span><a href="/products">返回产品展示 <ArrowUpRight /></a></div></footer>
    <ImageLightbox />
  </div>;
}
