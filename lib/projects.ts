const originalProjects = [
  {
    title: '大栅栏街道',
    location: '北京市西城区',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/c6924b6941b29dfa/assets/dashilan.jpg',
    scene: '历史文化街区 · 老旧平房院落 · 胡同商铺',
    intro:
      '大栅栏位于北京中轴线核心区域，百年商铺、历史建筑、老旧平房院落与胡同商业空间交织。项目在兼顾存量建筑特点的前提下，将已有设备、分散点位和日常消防管理纳入统一运维。',
    work: [
      '统一整理设备型号、安装点位与历史维护记录',
      '开展月度常态化巡检，排查离线、低电量及现场环境问题',
      '提供7×24小时人工值守，核实并跟进告警信息',
      '安排故障设备现场维修，保留工单与复核记录',
    ],
    source: '智慧消防代运维方案、壹消智慧消防平台介绍',
  },
  {
    title: '天桥街道',
    location: '北京市西城区',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/08ec1d06bd88a780/assets/tianqiao.jpg',
    scene: '老旧院落 · 居家老人 · 沿街小场所',
    intro:
      '天桥街道老旧院落较集中，社区点位分散，老年人口与沿街小场所的日常消防管理需求并存。项目以智能烟感和壹消平台为基础，配套值守及全周期代运维。',
    work: [
      '部署并接入智能烟感，统一查看点位和设备状态',
      '值守人员核查告警，按预案联系社区或相关责任人',
      '持续跟踪离线、低电量和设备故障等异常',
      '安排上门检查与更换，并将处理结果归档',
    ],
    source: '壹消智慧消防平台介绍',
  },
  {
    title: '邯郸教育系统',
    location: '河北省邯郸市',
    image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/38673b46f0d5880e/assets/handan-school.jpg',
    scene: '中小学 · 幼儿园 · 校园重点区域',
    intro:
      '面向邯郸市中小学和幼儿园等人员密集场景，项目将前端智能硬件、平台监测和运维支持组合交付，使设备接入后的状态管理、异常跟进和巡检维护成为持续服务。',
    work: [
      '接入校园重点区域监测设备，集中查看运行状态',
      '通过平台汇总告警、点位和设备异常信息',
      '由值守人员通知责任人并跟进现场核查结果',
      '安排专人巡检维护，形成校园设备与运维台账',
    ],
    source: '壹消智慧消防平台介绍',
  },
];
const screenshotSource = '客户提供的项目平台截图（2026年9月）';
const projectRecords = [
  { ...originalProjects[0], title: '北京大栅栏街道智慧消防运维中心', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/6fbb9430146b00d2/assets/project-platform-01.png', source: screenshotSource },
  { ...originalProjects[1], title: '北京天桥街道运维中心', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/1e11b64ac8e5f5b7/assets/project-platform-02.png', source: screenshotSource },
  {
    title: '丰台区双哨双应智慧预警平台', location: '北京市丰台区', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/cb1f4e5d1f15d926/assets/project-platform-03.png',
    scene: '区域设备监管 · 智慧预警',
    intro: '平台以地图关联区域设备点位，集中展示联网设备状态、告警统计与处理分类，便于管理人员了解监测范围和异常情况。',
    work: ['设备点位分布与下级单位管理', '在线、离线与故障状态查看', '告警类型统计与实时报警查看'], source: screenshotSource,
  },
  {
    title: '冀南新区光禄镇智慧消防预警平台', location: '河北省邯郸市冀南新区', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/67037d9c7d044aff/assets/project-platform-04.jpg',
    scene: '乡镇消防监测 · 点位集中管理',
    intro: '围绕光禄镇设备点位建立区域监测视图，将烟感设备、在线状态和告警记录汇集到统一平台，支持日常查看与异常跟进。',
    work: ['地图点位与设备总览', '烟感设备分类与运行状态统计', '日常状态趋势与报警记录查看'], source: screenshotSource,
  },
  {
    title: '百度（邯郸）智慧消防运维中心', location: '河北省邯郸市', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/02e867a528cc28fb/assets/project-platform-05.png',
    scene: '多类型设备接入 · 消防运维管理',
    intro: '运维中心平台集中呈现区域消防设备信息，以地图点位、设备分类和告警统计辅助日常监管，连接设备状态查看与运维管理。',
    work: ['多类型消防设备分类展示', '设备在线情况与每日状态统计', '实时报警与处理分类查看'], source: screenshotSource,
  },
  { ...originalProjects[2], title: '邯郸校园智慧消防预警平台', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/b262a855b8fe8e1c/assets/project-platform-06.png', source: screenshotSource },
  {
    title: '南京鼓楼区挹江门街道智慧消防联动中心', location: '江苏省南京市鼓楼区', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/182f68aeb6a4258c/assets/project-platform-07.png',
    scene: '街道消防联动 · 多要素感知',
    intro: '联动中心在地图上汇集街道点位，展示烟感、燃气、温感等设备类别和运行状态，并集中呈现实时告警信息，辅助日常监管与联动跟进。',
    work: ['多类型感知设备分类监管', '设备在线、离线与每日状态查看', '实时告警位置、时间与处理状态查看'], source: screenshotSource,
  },
  {
    title: '石家庄第十二中学预警平台', location: '河北省石家庄市', image: 'https://yiyiyiyi.cn-nb1.rains3.com/website/493d54ea9aa16784/assets/project-platform-08.png',
    scene: '校园建筑监测 · 宿舍安全管理',
    intro: '以学校建筑为管理单元，平台关联宿舍楼、楼层与烟感设备信息，集中查看设备运行状态和告警情况，方便校方定位重点监测区域。',
    work: ['建筑、楼层与设备数量关联展示', '烟感设备在线状态查看', '实时告警、原因统计与七日趋势查看'], source: screenshotSource,
  },
];

const slugs = ["beijing-dashilan","beijing-tianqiao","fengtai-shuangshao","jinan-guanglu","baidu-handan","handan-campus","nanjing-yijiangmen","shijiazhuang-no12"];
export const projects = projectRecords.map((project, index) => ({ ...project, slug: slugs[index] }));

