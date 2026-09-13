/* oxlint-disable next/no-img-element, next/no-html-link-for-pages */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import NewsShell from '@/components/news-shell';
import { projects } from '@/lib/projects';
import './case-detail.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return project ? { title: `${project.title}｜项目案例｜壹消智慧消防`, description: project.intro } : { title: '案例未找到' };
}

export default async function CaseDetail({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <NewsShell section="cases">
    <header className="case-heading c-shell">
      <nav aria-label="面包屑"><a href="/">首页</a><span>/</span><a href="/#projects">项目案例</a><span>/</span><span>{project.location}</span></nav>
      <p className="case-location">{project.location}</p><h1>{project.title}</h1>
      <p className="case-scene">{project.scene}</p>
    </header>
    <div className="case-platform c-shell"><figure><a href={project.image} target="_blank" rel="noopener noreferrer" aria-label={`打开${project.title}完整截图`}><img src={project.image} alt={`${project.title}平台监测界面`} width="1900" height="980" /></a><figcaption><span>项目平台实景</span><a href={project.image} target="_blank" rel="noopener noreferrer">查看完整截图 ↗</a></figcaption></figure></div>
    <section className="case-story"><div className="c-shell case-story-grid"><aside><h2>项目概况</h2><dl><dt>项目区域</dt><dd>{project.location}</dd><dt>应用场景</dt><dd>{project.scene}</dd><dt>资料来源</dt><dd>{project.source}</dd></dl><a className="case-consult" href="/contact">咨询同类项目</a></aside><div className="case-story-copy"><p className="case-intro">{project.intro}</p><h2>项目内容与管理重点</h2><ul>{project.work.map(item=><li key={item}>{item}</li>)}</ul><h2>平台运行展示</h2><p>{platformNotes[slug]}</p><p className="case-evidence-note">图中设备数量、在线率及告警统计为截图时点的信息，不代表当前实时运行数据。</p><div className="case-links"><a href="/products">了解平台与设备体系 ↗</a><a href="/products/smoke">了解 AI 大数据烟感 ↗</a></div></div></div></section>
    <section className="case-more"><div className="c-shell"><h2>更多项目案例</h2><nav aria-label="全部项目案例">{projects.map(item=><a key={item.slug} href={`/cases/${item.slug}`} aria-current={item.slug===slug?'page':undefined}><span>{item.location}</span><strong>{item.title}</strong><span>{item.slug===slug?'当前案例':'查看案例 ↗'}</span></a>)}</nav></div></section>
  </NewsShell>;
}

const platformNotes: Record<string, string> = {
  'beijing-dashilan': '平台以区域地图呈现分散在街区内的监测点位，左右两侧分别展示下级单位、设备分类、运行状态及告警统计。针对胡同和老旧院落点位分散的特点，地图与设备信息的对应，有助于值守人员查找异常位置，再衔接联系与现场跟进。',
  'beijing-tianqiao': '截图将街道点位与设备总览放在同一视图中，同时呈现今日、本月告警及处理分类。管理人员可以结合在线、离线统计和点位分布了解设备情况；告警类型视图则便于区分已有处理记录与其他报警类别。',
  'fengtai-shuangshao': '平台展示下级单位、烟感设备分类和点位分布，设备每日状态曲线与报警类型统计共同呈现。区域管理人员可以从整体设备情况进入具体点位查看，避免点位位置与设备状态分散在不同资料中。',
  'jinan-guanglu': '地图呈现光禄镇相关点位，设备总览汇集安装、在线与离线信息，并以每日状态趋势补充运行情况。烟感设备分类和实时报警区域分别承担设备概览与异常展示，形成乡镇点位的集中查看入口。',
  'baidu-handan': '截图中的设备分类包含烟感、燃气、摄像头及消防主机部件等类型，地图展示区域点位，旁侧提供报警总览、处理分类和每日设备状态。不同类型设备的信息汇集，为运维人员了解设备构成与异常分布提供参考。',
  'handan-campus': '平台按联网单位汇集校园设备，地图标记学校位置，并提供单位统计、设备在线率、实时告警与七日告警趋势。实时告警区域展示所属单位、建筑和时间等信息，便于将告警关联到具体学校与建筑；图表数据均为截图时点记录。',
  'nanjing-yijiangmen': '平台按烟感、燃气、温感、人体探测等类别统计感知设备，并在街道地图旁展示设备状态及实时报警。报警列表包含时间、地址和处理状态，帮助管理人员从汇总数字进一步定位到具体告警记录。',
  'shijiazhuang-no12': '学校平台以建筑物为管理单元，截图中的宿舍楼信息关联楼层和设备数量。界面同时呈现设备在线情况、告警统计与七日趋势，使校方能够从学校总览进入建筑层面的监测信息。',
};
