// venueVisualization.tsx
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { Select, Card, Row, Col, Divider } from "antd";
import "./venueVisualization.scss";

const { Option } = Select;

interface ChartProps {
  id: string;
  title: string;
  option: echarts.EChartsOption;
}

// 定义数据类型接口
interface ProvinceData {
  cities: string[];
  spatialBalance: {
    serviceRadius: number[];
    areaPerCapita: number[];
    facilitiesPerCapita: number[];
    distributionBalance: number[];
  };
  resourceBalance: {
    fundInvestment: number[];
    professionalStaff: number[];
  };
  serviceBalance: {
    facilityTypes: number[];
    publicServiceRatio: number[];
  };
  qualityBalance: {
    facilityIntegrity: number[];
    userSatisfaction: number[];
  };
  coverageBalance: {
    elderlyFriendly: number[];
    childFriendly: number[];
    accessibility: number[];
  };
  geographicalAccess: {
    populationCoverage: number[];
  };
  trafficAccess: {
    busCoverage: number[];
    parkingCoverage: number[];
    bikeSharing: number[];
  };
  temporalAccess: {
    weeklyHours: number[];
    nightWeekend: number[];
    timeMatch: number[];
  };
  informationAccess: {
    channelDiversity: number[];
    updateTimeliness: number[];
    contentAccessibility: number[];
    queryConvenience: number[];
  };
  digitalAccess: {
    smartDevice: number[];
    freeWifi: number[];
    onlineService: number[];
    dataSharing: number[];
  };
  comprehensiveScore: number[];
}

interface CityData {
  districts: string[];
  spatialBalance: {
    serviceRadius: number[];
    areaPerCapita: number[];
    facilitiesPerCapita: number[];
    distributionBalance: number[];
  };
  resourceBalance: {
    fundInvestment: number[];
    professionalStaff: number[];
  };
  serviceBalance: {
    facilityTypes: number[];
    publicServiceRatio: number[];
  };
  qualityBalance: {
    facilityIntegrity: number[];
    userSatisfaction: number[];
  };
  coverageBalance: {
    elderlyFriendly: number[];
    childFriendly: number[];
    accessibility: number[];
  };
  geographicalAccess: {
    populationCoverage: number[];
  };
  trafficAccess: {
    busCoverage: number[];
    parkingCoverage: number[];
    bikeSharing: number[];
  };
  temporalAccess: {
    weeklyHours: number[];
    nightWeekend: number[];
    timeMatch: number[];
  };
  informationAccess: {
    channelDiversity: number[];
    updateTimeliness: number[];
    contentAccessibility: number[];
    queryConvenience: number[];
  };
  digitalAccess: {
    smartDevice: number[];
    freeWifi: number[];
    onlineService: number[];
    dataSharing: number[];
  };
  comprehensiveScore: number[];
}

// 模拟数据
const provinceData: ProvinceData = {
  cities: ["石家庄市", "唐山市", "秦皇岛市", "邯郸市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市", "邢台市"],
  
  spatialBalance: {
    serviceRadius: [85, 78, 82, 75, 88, 80, 77, 79, 83, 76, 74],
    areaPerCapita: [3.2, 2.8, 3.0, 2.5, 3.6, 3.1, 2.9, 2.7, 3.3, 2.6, 2.4],
    facilitiesPerCapita: [2.1, 1.8, 2.0, 1.6, 2.3, 1.9, 1.7, 1.8, 2.1, 1.5, 1.4],
    distributionBalance: [0.85, 0.79, 0.81, 0.76, 0.88, 0.83, 0.78, 0.80, 0.84, 0.77, 0.75]
  },
  
  resourceBalance: {
    fundInvestment: [82, 75, 78, 70, 85, 80, 73, 76, 81, 72, 68],
    professionalStaff: [88, 82, 85, 78, 90, 83, 80, 81, 86, 79, 76]
  },
  
  serviceBalance: {
    facilityTypes: [15, 12, 14, 11, 16, 13, 12, 13, 15, 10, 9],
    publicServiceRatio: [75, 68, 72, 65, 78, 70, 67, 69, 73, 64, 62]
  },
  
  qualityBalance: {
    facilityIntegrity: [92, 88, 90, 85, 94, 89, 87, 88, 91, 86, 84],
    userSatisfaction: [89, 85, 87, 82, 91, 86, 84, 85, 88, 83, 81]
  },
  
  coverageBalance: {
    elderlyFriendly: [80, 72, 76, 68, 83, 75, 70, 73, 78, 67, 65],
    childFriendly: [78, 70, 74, 66, 81, 73, 68, 71, 76, 65, 63],
    accessibility: [85, 78, 82, 75, 88, 80, 77, 79, 83, 76, 74]
  },
  
  geographicalAccess: {
    populationCoverage: [82, 76, 85, 70, 90, 78, 74, 77, 83, 72, 69]
  },
  
  trafficAccess: {
    busCoverage: [85, 78, 82, 75, 88, 80, 77, 79, 84, 76, 73],
    parkingCoverage: [65, 58, 62, 55, 68, 60, 57, 59, 64, 56, 53],
    bikeSharing: [70, 63, 67, 60, 73, 65, 62, 64, 69, 61, 58]
  },
  
  temporalAccess: {
    weeklyHours: [56, 52, 54, 50, 58, 53, 51, 52, 55, 49, 48],
    nightWeekend: [75, 68, 72, 65, 78, 70, 67, 69, 74, 66, 64],
    timeMatch: [82, 76, 79, 74, 85, 78, 75, 77, 81, 73, 71]
  },
  
  informationAccess: {
    channelDiversity: [80, 75, 78, 72, 83, 76, 74, 75, 79, 71, 69],
    updateTimeliness: [85, 79, 82, 77, 87, 80, 78, 79, 83, 76, 74],
    contentAccessibility: [88, 82, 85, 80, 90, 83, 81, 82, 86, 79, 77],
    queryConvenience: [83, 77, 80, 75, 85, 78, 76, 77, 82, 74, 72]
  },
  
  digitalAccess: {
    smartDevice: [68, 62, 65, 60, 70, 63, 61, 62, 67, 59, 57],
    freeWifi: [72, 66, 69, 64, 75, 67, 65, 66, 71, 63, 61],
    onlineService: [65, 59, 62, 57, 68, 60, 58, 59, 64, 56, 54],
    dataSharing: [60, 54, 57, 52, 63, 55, 53, 54, 59, 51, 49]
  },
  
  comprehensiveScore: [82, 78, 80, 74, 88, 81, 77, 79, 83, 75, 73]
};

// 市级数据（以石家庄为例）
const shijiazhuangData: CityData = {
  districts: ["长安区", "桥西区", "新华区", "裕华区", "井陉矿区", "藁城区", "鹿泉区", "栾城区"],
  
  spatialBalance: {
    serviceRadius: [88, 85, 87, 90, 82, 84, 86, 83],
    areaPerCapita: [3.5, 3.3, 3.4, 3.6, 3.1, 3.2, 3.4, 3.2],
    facilitiesPerCapita: [2.3, 2.1, 2.2, 2.4, 1.9, 2.0, 2.2, 2.0],
    distributionBalance: [0.88, 0.85, 0.87, 0.90, 0.82, 0.84, 0.86, 0.83]
  },
  
  resourceBalance: {
    fundInvestment: [85, 82, 84, 88, 80, 81, 86, 79],
    professionalStaff: [90, 87, 89, 92, 85, 86, 91, 84]
  },
  
  serviceBalance: {
    facilityTypes: [16, 15, 16, 18, 14, 14, 17, 13],
    publicServiceRatio: [78, 76, 77, 81, 74, 75, 80, 73]
  },
  
  qualityBalance: {
    facilityIntegrity: [94, 92, 93, 95, 90, 91, 94, 89],
    userSatisfaction: [91, 89, 90, 93, 88, 87, 92, 86]
  },
  
  coverageBalance: {
    elderlyFriendly: [85, 82, 84, 88, 80, 81, 86, 79],
    childFriendly: [83, 80, 82, 86, 78, 79, 84, 77],
    accessibility: [88, 85, 87, 91, 83, 84, 89, 82]
  },
  
  geographicalAccess: {
    populationCoverage: [85, 82, 84, 87, 80, 81, 83, 80]
  },
  
  trafficAccess: {
    busCoverage: [88, 85, 87, 90, 83, 84, 86, 82],
    parkingCoverage: [70, 68, 69, 72, 65, 66, 71, 64],
    bikeSharing: [75, 72, 74, 78, 70, 71, 76, 69]
  },
  
  temporalAccess: {
    weeklyHours: [58, 56, 57, 60, 54, 55, 59, 53],
    nightWeekend: [80, 78, 79, 83, 76, 77, 81, 75],
    timeMatch: [85, 83, 84, 87, 81, 82, 86, 80]
  },
  
  informationAccess: {
    channelDiversity: [85, 83, 84, 87, 81, 82, 86, 80],
    updateTimeliness: [88, 86, 87, 90, 84, 85, 89, 83],
    contentAccessibility: [90, 88, 89, 92, 86, 87, 91, 85],
    queryConvenience: [87, 85, 86, 89, 83, 84, 88, 82]
  },
  
  digitalAccess: {
    smartDevice: [75, 73, 74, 78, 70, 71, 76, 69],
    freeWifi: [78, 76, 77, 81, 73, 74, 79, 72],
    onlineService: [72, 70, 71, 75, 67, 68, 73, 66],
    dataSharing: [68, 66, 67, 71, 63, 64, 69, 62]
  },
  
  comprehensiveScore: [85, 82, 84, 87, 80, 81, 83, 80]
};

const ChartBox: React.FC<ChartProps> = ({ id, title, option }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current);
    chart.setOption(option);
    const resize = () => chart.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chart.dispose();
    };
  }, [option]);

  return (
    <Card className="chart-card" bordered={false}>
      <h3 className="chart-title">{title}</h3>
      <div ref={ref} id={id} className="chart-box" />
    </Card>
  );
};

const VenueVisualization: React.FC = () => {
  const [region, setRegion] = useState("hebei");
  const [currentLevel, setCurrentLevel] = useState<"province" | "city">("province");
  const [currentData, setCurrentData] = useState<ProvinceData | CityData>(provinceData);
  const [selectedArea, setSelectedArea] = useState(0);

  const regionOptions = [
    { label: "河北省", value: "hebei" },
    { label: "石家庄市", value: "sjz" },
    { label: "唐山市", value: "ts" },
    { label: "秦皇岛市", value: "qhd" },
    { label: "邯郸市", value: "hd" },
    { label: "保定市", value: "bd" },
    { label: "张家口市", value: "zjk" },
    { label: "承德市", value: "cd" },
    { label: "沧州市", value: "cz" },
    { label: "廊坊市", value: "lf" },
    { label: "衡水市", value: "hs" },
    { label: "邢台市", value: "xt" }
  ];

  const handleRegionChange = (value: string) => {
    setRegion(value);
    if (value === "hebei") {
      setCurrentLevel("province");
      setCurrentData(provinceData);
    } else {
      setCurrentLevel("city");
      setCurrentData(shijiazhuangData);
    }
    setSelectedArea(0);
  };

  const names = currentLevel === "province" 
    ? (currentData as ProvinceData).cities 
    : (currentData as CityData).districts;

  // 1. 空间均衡性 - 多指标柱状图
  const spatialBalanceOption: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['服务半径覆盖率', '人均场地面积', '人均设施数量'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLabel: {
        interval: 0,
        rotate: names.length > 8 ? 45 : 0
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '覆盖率(%)',
        position: 'left',
        max: 100
      },
      {
        type: 'value',
        name: '面积/数量',
        position: 'right'
      }
    ],
    series: [
      {
        name: '服务半径覆盖率',
        type: 'bar',
        data: currentData.spatialBalance.serviceRadius,
        itemStyle: { color: '#5470c6' }
      },
      {
        name: '人均场地面积',
        type: 'bar',
        yAxisIndex: 1,
        data: currentData.spatialBalance.areaPerCapita,
        itemStyle: { color: '#91cc75' }
      },
      {
        name: '人均设施数量',
        type: 'bar',
        yAxisIndex: 1,
        data: currentData.spatialBalance.facilitiesPerCapita,
        itemStyle: { color: '#fac858' }
      }
    ]
  };

  // 2. 资源与服务均衡性 - 雷达图
  const resourceServiceOption: echarts.EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: {
      data: names.slice(0, 5),
      bottom: 0,
      type: 'scroll'
    },
    radar: {
      indicator: [
        { name: '资金投入', max: 100 },
        { name: '专业人才', max: 100 },
        { name: '设施种类', max: 20 },
        { name: '普惠服务占比', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: names.slice(0, 5).map((name: string, index: number) => ({
        name,
        value: [
          currentData.resourceBalance.fundInvestment[index],
          currentData.resourceBalance.professionalStaff[index],
          currentData.serviceBalance.facilityTypes[index],
          currentData.serviceBalance.publicServiceRatio[index]
        ],
        areaStyle: { opacity: 0.3 }
      }))
    }]
  };

  // 3. 质量与人群覆盖均衡性
const qualityCoverageOption: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['设施完好率', '用户满意度', '适老化改造', '无障碍设施'],
    bottom: 0
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '12%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: names,
    axisLabel: {
      interval: 0,
      rotate: names.length > 8 ? 45 : 0
    }
  },
  yAxis: {
    type: 'value',
    name: '得分',
    max: 100
  },
  series: [
    {
      name: '设施完好率',
      type: 'bar',
      stack: '质量',
      data: currentData.qualityBalance.facilityIntegrity,
      itemStyle: { color: '#5470c6' }
    },
    {
      name: '用户满意度',
      type: 'bar',
      stack: '质量',
      data: currentData.qualityBalance.userSatisfaction,
      itemStyle: { color: '#91cc75' }
    },
    {
      name: '适老化改造',
      type: 'bar',
      stack: '覆盖',
      data: currentData.coverageBalance.elderlyFriendly,
      itemStyle: { color: '#fac858' }
    },
    {
      name: '无障碍设施',
      type: 'bar',
      stack: '覆盖',
      data: currentData.coverageBalance.accessibility,
      itemStyle: { color: '#ee6666' }
    }
  ]
};

  // 4. 地理可及性 - 散点图（气泡图）
  const geoAccessOption: echarts.EChartsOption = {
  tooltip: {
    formatter: function (params: any) {
      return `${params.data[3]}<br/>
              服务人口覆盖率: ${params.data[1]}%<br/>
              服务半径覆盖率: ${params.data[0]}%<br/>
              综合评分: ${params.data[2]}分`;
    }
  },
  legend: {
    data: ['地理可及性分布'],
    bottom: 0
  },
  xAxis: {
    type: 'value',
    name: '服务半径覆盖率(%)',
    min: 70,
    max: 95
  },
  yAxis: {
    type: 'value',
    name: '服务人口覆盖率(%)',
    min: 65,
    max: 95
  },
  series: [{
    name: '地理可及性分布',
    type: 'scatter',
    symbolSize: function (data) {
      return data[2] / 3; // 调小圆点大小：从 data[2]/2 改为 data[2]/3
    },
    data: names.map((name, index) => [
      currentData.spatialBalance.serviceRadius[index],
      currentData.geographicalAccess.populationCoverage[index],
      currentLevel === 'province' 
        ? (currentData as ProvinceData).comprehensiveScore[index] 
        : (currentData as CityData).comprehensiveScore[index],
      name
    ]),
    itemStyle: {
      color: function (params: any) {
        const score = (params.data[0] + params.data[1]) / 2;
        return score >= 85 ? '#c23531' : 
               score >= 75 ? '#d48265' : 
               score >= 65 ? '#91c7ae' : '#61a0a8';
      }
    },
    label: {
      show: true,
      formatter: '{@[3]}',
      position: 'top',
      fontSize: 10 // 可选：同时调小标签字体
    }
  }]
};

  // 5. 交通可及性 - 雷达图
  const trafficAccessOption: echarts.EChartsOption = {
    tooltip: {},
    legend: {
      data: names.slice(0, 6),
      bottom: 0,
      type: 'scroll'
    },
    radar: {
      indicator: [
        { name: "公交站点覆盖率", max: 100 },
        { name: "停车场配套率", max: 100 },
        { name: "共享单车点覆盖率", max: 100 },
        { name: "交通便利指数", max: 100 },
      ],
    },
    series: [
      {
        type: "radar",
        data: names.slice(0, 6).map((name: string, index: number) => ({
          name,
          value: [
            currentData.trafficAccess.busCoverage[index],
            currentData.trafficAccess.parkingCoverage[index],
            currentData.trafficAccess.bikeSharing[index],
            Math.round((
              currentData.trafficAccess.busCoverage[index] + 
              currentData.trafficAccess.parkingCoverage[index] + 
              currentData.trafficAccess.bikeSharing[index]
            ) / 3)
          ],
          areaStyle: { opacity: 0.3 },
        })),
      },
    ],
  };

  // 6. 信息可及性 - 热力图
  const infoAccessOption: echarts.EChartsOption = {
    tooltip: {
      position: 'top'
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['信息渠道多样性', '更新及时性', '内容通俗性', '查询便捷性'],
      splitArea: {
        show: true
      }
    },
    yAxis: {
      type: 'category',
      data: names,
      splitArea: {
        show: true
      }
    },
    visualMap: {
      min: 60,
      max: 95,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%'
    },
    series: [{
      name: '信息可及性',
      type: 'heatmap',
      data: names.map((name, nameIndex) => [
        0, nameIndex, currentData.informationAccess.channelDiversity[nameIndex]
      ]).concat(
        names.map((name, nameIndex) => [
          1, nameIndex, currentData.informationAccess.updateTimeliness[nameIndex]
        ])
      ).concat(
        names.map((name, nameIndex) => [
          2, nameIndex, currentData.informationAccess.contentAccessibility[nameIndex]
        ])
      ).concat(
        names.map((name, nameIndex) => [
          3, nameIndex, currentData.informationAccess.queryConvenience[nameIndex]
        ])
      ),
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  // 7. 数智化水平 - 仪表盘
  const smartOption: echarts.EChartsOption = {
    tooltip: { formatter: "{a} <br/>{b}: {c}%" },
    series: [
      {
        name: "数智化可及性",
        type: "gauge",
        detail: { valueAnimation: true, formatter: "{value}%" },
        data: [{ 
          value: Math.round(
            currentData.digitalAccess.smartDevice.reduce((a, b) => a + b) / names.length
          ), 
          name: "智能服务覆盖度" 
        }],
        title: {
          show: true,
          offsetCenter: [0, "80%"],
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#FF6E76'],
              [0.7, '#FDDD60'],
              [1, '#58D9F9']
            ]
          }
        },
        pointer: {
          length: '60%',
          width: 4
        }
      },
    ],
  };

  // 8. 综合：各市/区评分对比（横向条形图）
  const totalOption: echarts.EChartsOption = {
    tooltip: { trigger: "axis" },
    grid: { left: "25%", right: "5%" },
    xAxis: { type: "value", name: "综合得分" },
    yAxis: { 
      type: "category", 
      data: names,
      axisLabel: {
        interval: 0
      }
    },
    series: [
      {
        type: "bar",
        data: currentLevel === 'province' 
          ? (currentData as ProvinceData).comprehensiveScore 
          : (currentData as CityData).comprehensiveScore,
        itemStyle: { color: "#edc948" },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}分'
        }
      },
    ],
  };

  return (
    <div className="venue-page">
      <div className="header">
        <h2>河北省健身场馆均衡性与可及性可视化平台</h2>
        <Select
          className="region-select"
          value={region}
          onChange={handleRegionChange}
          style={{ width: 200 }}
        >
          {regionOptions.map((c) => (
            <Option key={c.value} value={c.value}>
              {c.label}
            </Option>
          ))}
        </Select>
      </div>

      <Divider>均衡性分析</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <ChartBox id="spatial" title="空间均衡性指标对比" option={spatialBalanceOption} />
        </Col>
        <Col xs={24} lg={8}>
          <ChartBox id="resource" title="资源与服务均衡性" option={resourceServiceOption} />
        </Col>
        <Col xs={24} lg={8}>
          <div style={{ textAlign: 'center' }}>
            <ChartBox id="quality" title="质量与人群覆盖均衡性" option={qualityCoverageOption} />
          </div>
        </Col>
      </Row>

      <Divider>可及性分析</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <ChartBox id="geo" title="地理可及性分布" option={geoAccessOption} />
        </Col>
        <Col xs={24} lg={8}>
          <ChartBox id="traffic" title="交通可及性" option={trafficAccessOption} />
        </Col>
        <Col xs={24} lg={8}>
          <ChartBox id="info" title="信息可及性热力图" option={infoAccessOption} />
        </Col>
      </Row>

      <Divider>数智化水平</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <ChartBox id="smart" title="数智化可及性" option={smartOption} />
        </Col>
        <Col xs={24} md={12}>
          <ChartBox 
            id="digital-detail" 
            title={`${currentLevel === 'province' ? '各市' : '各区'}数智化水平对比`} 
            option={{
              tooltip: { trigger: "axis" },
              xAxis: { 
                type: "category", 
                data: names,
                axisLabel: {
                  interval: 0,
                  rotate: names.length > 8 ? 45 : 0
                }
              },
              yAxis: { type: "value", name: "得分" },
              series: [
                {
                  name: "数智化水平",
                  type: "bar",
                  data: currentData.digitalAccess.smartDevice,
                  itemStyle: { color: "#76b7b2" },
                },
              ],
            }} 
          />
        </Col>
      </Row>

      <Divider>综合评价</Divider>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <ChartBox id="total" title={`${currentLevel === 'province' ? '各市' : '各区'}综合得分对比`} option={totalOption} />
        </Col>
      </Row>
    </div>
  );
};

export default VenueVisualization;