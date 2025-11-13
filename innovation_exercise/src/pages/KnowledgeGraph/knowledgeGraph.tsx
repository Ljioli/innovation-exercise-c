import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as echarts from 'echarts';
import { Button, Input, Card, Typography, Space, Divider } from 'antd';
import 'antd/dist/reset.css';
import './knowledgeGraph.scss';

// 类型定义
interface GraphNode {
  id: string;
  name: string;
  category: number;
  value: number;
  description?: string;
  connections?: number;
}

interface GraphLink {
  source: string;
  target: string;
  value: number;
}

interface FilterOption {
  label: string;
  value: string;
}

interface LegendItem {
  label: string;
  color: string;
}

interface Metric {
  name: string;
  percentage: number;
  color: string;
}

const { Title, Text, Paragraph } = Typography;

const KnowledgeGraph: React.FC = () => {
  // 响应式数据
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [currentNode, setCurrentNode] = useState<Partial<GraphNode>>({});

  // 常量数据
  const filters: FilterOption[] = [
    { label: '全部维度', value: 'all' },
    { label: '基础数据', value: 'input' },
    { label: '评估方法', value: 'process' },
    { label: '服务成果', value: 'output' }
  ];

  const legendItems: LegendItem[] = [
    { label: '基础数据', color: '#e74c3c' },
    { label: '评估方法', color: '#3498db' },
    { label: '服务成果', color: '#2ecc71' },
    { label: '评价指标', color: '#f39c12' }
  ];

  const metrics: Metric[] = [
    { name: '设施覆盖率', percentage: 78, color: '#3498db' },
    { name: '活动参与率', percentage: 65, color: '#2ecc71' },
    { name: '满意度评分', percentage: 82, color: '#e74c3c' },
    { name: '指导员配备率', percentage: 55, color: '#f39c12' },
    { name: '经费投入占比', percentage: 60, color: '#9b59b6' }
  ];

  const nodeDescriptions: Record<string, string> = {
    '健身设施数据': '包含河北省各地市健身路径、场馆等设施的基础信息',
    '参与人数统计': '河北省各年龄段、各地区全民健身参与人数的统计数据',
    '活动开展记录': '各级体育部门组织的全民健身活动开展情况',
    '问卷调查结果': '公众对健身服务的满意度和需求调查数据',
    '数据统计法': '对健身服务相关数据进行量化分析的方法',
    '模糊综合评价': '对服务质量进行多因素综合评估的方法',
    '服务覆盖率': '反映健身服务在河北省的覆盖范围和可达性',
    '满意度指数': '综合评价公众对全民健身服务的满意程度',
    '设施建设指标': '包括人均设施面积、设施完好率等评估指标',
    '活动组织指标': '衡量全民健身活动的频次、规模和多样性',
    '科学指导指标': '评估社会体育指导员的配备和服务情况',
    '经费保障指标': '反映全民健身服务经费的投入和使用效率',
    '健康促进指标': '衡量全民健身对居民健康水平提升的效果'
  };

  // 知识图谱数据
  const graphData = {
    nodes: [
      // 基础数据 - 红色
      { id: 'input-facility-data', name: '健身设施数据', category: 0, value: 100 },
      { id: 'input-participation', name: '参与人数统计', category: 0, value: 90 },
      { id: 'input-activities', name: '活动开展记录', category: 0, value: 85 },
      { id: 'input-survey', name: '问卷调查结果', category: 0, value: 80 },
      { id: 'input-funding', name: '经费投入数据', category: 0, value: 75 },
      { id: 'input-instructor', name: '指导员数据', category: 0, value: 70 },

      // 评估方法 - 蓝色
      { id: 'method-statistics', name: '数据统计法', category: 1, value: 95 },
      { id: 'method-fuzzy', name: '模糊综合评价', category: 1, value: 90 },
      { id: 'method-gis', name: 'GIS空间分析', category: 1, value: 80 },
      { id: 'method-satisfaction', name: '满意度测评', category: 1, value: 85 },
      { id: 'method-efficiency', name: '效率评估模型', category: 1, value: 75 },

      // 服务成果 - 绿色
      { id: 'output-coverage', name: '服务覆盖率', category: 2, value: 100 },
      { id: 'output-satisfaction', name: '满意度指数', category: 2, value: 95 },
      { id: 'output-equity', name: '服务公平性', category: 2, value: 90 },
      { id: 'output-health', name: '健康促进效果', category: 2, value: 85 },
      { id: 'output-report', name: '服务评估报告', category: 2, value: 80 },

      // 评价指标 - 橙色
      { id: 'index-facility', name: '设施建设指标', category: 3, value: 90 },
      { id: 'index-activity', name: '活动组织指标', category: 3, value: 85 },
      { id: 'index-guidance', name: '科学指导指标', category: 3, value: 80 },
      { id: 'index-funding', name: '经费保障指标', category: 3, value: 75 },
      { id: 'index-health', name: '健康促进指标', category: 3, value: 70 }
    ] as GraphNode[],
    links: [
      // 基础数据与评价指标的关联
      { source: 'input-facility-data', target: 'index-facility', value: 1 },
      { source: 'input-activities', target: 'index-activity', value: 1 },
      { source: 'input-instructor', target: 'index-guidance', value: 1 },
      { source: 'input-funding', target: 'index-funding', value: 1 },
      { source: 'input-participation', target: 'index-health', value: 1 },

      // 评价指标与评估方法的关联
      { source: 'index-facility', target: 'method-gis', value: 1 },
      { source: 'index-activity', target: 'method-statistics', value: 1 },
      { source: 'index-guidance', target: 'method-statistics', value: 1 },
      { source: 'index-funding', target: 'method-efficiency', value: 1 },
      { source: 'index-health', target: 'method-statistics', value: 1 },

      // 评估方法之间的关系
      { source: 'method-statistics', target: 'method-fuzzy', value: 1 },
      { source: 'method-gis', target: 'method-fuzzy', value: 1 },
      { source: 'method-satisfaction', target: 'method-fuzzy', value: 1 },

      // 评估方法与服务成果的关联
      { source: 'method-fuzzy', target: 'output-coverage', value: 1 },
      { source: 'method-fuzzy', target: 'output-satisfaction', value: 1 },
      { source: 'method-efficiency', target: 'output-equity', value: 1 },
      { source: 'method-statistics', target: 'output-health', value: 1 },
      { source: 'output-coverage', target: 'output-report', value: 1 },
      { source: 'output-satisfaction', target: 'output-report', value: 1 },

      // 核心关联
      { source: 'input-survey', target: 'method-satisfaction', value: 1 },
      { source: 'method-fuzzy', target: 'output-report', value: 1 }
    ] as GraphLink[]
  };

  // 辅助方法
  const getCategoryColor = (category: number): string => {
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12'];
    return colors[category] || '#95a5a6';
  };

  const getCategoryName = (category?: number): string => {
    const names = ['基础数据', '评估方法', '服务成果', '评价指标'];
    return category !== undefined ? names[category] : '-';
  };

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const updateNodeInfo = (nodeData: GraphNode) => {
    const connections = graphData.links.filter(link =>
      link.source === nodeData.id || link.target === nodeData.id
    ).length;

    setCurrentNode({
      ...nodeData,
      connections,
      description: nodeDescriptions[nodeData.name] || '全民健身均衡性评价体系的重要组成部分'
    });
  };

  // 过滤数据
  const getFilteredData = useCallback(() => {
    let filteredNodes = [...graphData.nodes];
    let filteredLinks = [...graphData.links];

    // 根据筛选条件过滤节点
    if (currentFilter !== 'all') {
      const categoryMap: Record<string, number> = {
        'input': 0,    // 基础数据
        'process': 1,  // 评估方法
        'output': 2    // 服务成果
      };
      const targetCategory = categoryMap[currentFilter];

      if (targetCategory !== undefined) {
        filteredNodes = graphData.nodes.filter(node => node.category === targetCategory);
        
        // 过滤链接，只保留两个端点都在过滤后节点中的链接
        filteredLinks = graphData.links.filter(link => {
          const sourceInFiltered = filteredNodes.some(node => node.id === link.source);
          const targetInFiltered = filteredNodes.some(node => node.id === link.target);
          return sourceInFiltered && targetInFiltered;
        });
      }
    }

    // 根据搜索关键词过滤
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase().trim();
      const searchFilteredNodes = filteredNodes.filter(node =>
        node.name.toLowerCase().includes(keyword)
      );

      // 如果搜索后没有节点，保持原样
      if (searchFilteredNodes.length > 0) {
        filteredNodes = searchFilteredNodes;
        
        // 重新过滤链接
        filteredLinks = graphData.links.filter(link => {
          const sourceInFiltered = filteredNodes.some(node => node.id === link.source);
          const targetInFiltered = filteredNodes.some(node => node.id === link.target);
          return sourceInFiltered && targetInFiltered;
        });
      }
    }

    return { nodes: filteredNodes, links: filteredLinks };
  }, [currentFilter, searchKeyword]);

  // 初始化图表
  const initChart = () => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current);

    const option = {
      title: {
        text: '全民健身均衡性评价知识图谱',
        subtext: '河北省全民健身均衡性评价体系',
        top: 'top',
        left: 'center',
        textStyle: {
          color: '#2c3e50',
          fontSize: 18
        }
      },
      tooltip: {
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            return `<div style="text-align: center;">
              <strong>${params.data.name}</strong><br/>
              重要性: ${params.data.value}
            </div>`;
          }
          return `${params.data.source} → ${params.data.target}`;
        }
      },
      legend: {
        data: ['基础数据', '评估方法', '服务成果', '评价指标'],
        top: 40,
        textStyle: {
          color: '#34495e'
        }
      },
      series: [{
        type: 'graph',
        layout: 'force',
        data: [],
        links: [],
        categories: [
          { name: '基础数据', itemStyle: { color: '#e74c3c' } },
          { name: '评估方法', itemStyle: { color: '#3498db' } },
          { name: '服务成果', itemStyle: { color: '#2ecc71' } },
          { name: '评价指标', itemStyle: { color: '#f39c12' } }
        ],
        roam: true,
        focusNodeAdjacency: true,
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        force: {
          repulsion: 300,
          gravity: 0.1,
          edgeLength: 120
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 3
          }
        }
      }]
    };

    chartInstance.current.setOption(option);

    // 绑定点击事件
    chartInstance.current.on('click', (params: any) => {
      if (params.dataType === 'node') {
        updateNodeInfo(params.data as GraphNode);
      }
    });

    // 初始化显示第一个节点信息
    if (graphData.nodes.length > 0) {
      updateNodeInfo(graphData.nodes[0]);
    }
  };

  // 更新图表数据
  const updateChart = useCallback(() => {
    if (!chartInstance.current) return;

    const { nodes, links } = getFilteredData();

    const option = {
      series: [{
        data: nodes.map(node => ({
          ...node,
          symbolSize: Math.max(25, node.value / 3),
          itemStyle: {
            color: getCategoryColor(node.category)
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            fontSize: 10,
            color: '#fff',
            fontWeight: 'bold'
          }
        })),
        links: links.map(link => ({
          ...link,
          lineStyle: {
            color: '#95a5a6',
            width: 1.5,
            curveness: 0.2
          }
        }))
      }]
    };

    chartInstance.current.setOption(option);

    // 如果当前选中的节点不在过滤后的数据中，清空节点信息
    if (currentNode.id && !nodes.some(node => node.id === currentNode.id)) {
      setCurrentNode({});
    }
  }, [getFilteredData, currentNode.id]);

  // 生命周期
  useEffect(() => {
    initChart();
    
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  // 当筛选条件或搜索词变化时更新图表
  useEffect(() => {
    updateChart();
  }, [updateChart]);

  return (
    <div className="knowledge-graph-container">
      {/* 头部 */}
      <div className="knowledge-graph-header">
        <Title level={2} className="header-title">河北省全民健身时空知识图谱</Title>
        <Paragraph className="header-subtitle">基于熵权-TOPSIS法的综合评价模型可视化分析</Paragraph>
      </div>

      {/* 控制面板 */}
      <div className="controls">
        <Space size="middle">
          {filters.map(filter => (
            <Button
              key={filter.value}
              type={currentFilter === filter.value ? "primary" : "default"}
              className="control-btn"
              onClick={() => handleFilterChange(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </Space>

        <Input
          value={searchKeyword}
          placeholder="搜索节点..."
          className="search-box"
          onChange={handleSearch}
          allowClear
        />

        <div className="legend">
          {legendItems.map(item => (
            <div key={item.label} className="legend-item">
              <div className="legend-color" style={{ backgroundColor: item.color }} />
              <span className="legend-text">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 主要内容 */}
      <div className="content">
        {/* 图谱区域 */}
        <div className="graph-container">
          <div ref={chartRef} className="chart" />
        </div>

        {/* 信息面板 */}
        <div className="info-panel">
          {/* 节点信息 */}
          <Card className="node-info-card">
            <Title level={3} className="panel-title">节点信息</Title>
            <div className="info-item">
              <span className="info-label">名称:</span>
              <span className="info-value">{currentNode.name || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">类型:</span>
              <span className="info-value">{getCategoryName(currentNode.category)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">权重:</span>
              <span className="info-value">{currentNode.value ? `${currentNode.value} 分` : '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">关联节点:</span>
              <span className="info-value">{currentNode.connections || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">描述:</span>
              <span className="info-value">{currentNode.description || '-'}</span>
            </div>
          </Card>

          <Divider className="divider" />

          {/* 指标权重 */}
          <Card className="metrics-card">
            <Title level={3} className="panel-title">指标权重分布</Title>
            {metrics.map(metric => (
              <div key={metric.name} className="metric-item">
                <div className="metric-header">
                  <span className="metric-name">{metric.name}</span>
                  <span className="metric-percentage">{metric.percentage}%</span>
                </div>
                <div className="metric-bar">
                  <div
                    className="metric-fill"
                    style={{
                      width: `${metric.percentage}%`,
                      backgroundColor: metric.color
                    }}
                  />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* 底部 */}
      <div className="footer">
        <Paragraph className="footer-text">
          河北省全民健身时空知识图谱 | 基于熵权-TOPSIS综合评价模型
        </Paragraph>
      </div>
    </div>
  );
};

export default KnowledgeGraph;