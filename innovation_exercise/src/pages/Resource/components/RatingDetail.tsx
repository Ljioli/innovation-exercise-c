import React, { useEffect, useRef } from 'react';
import { Modal, Progress, Typography } from 'antd';
import * as echarts from 'echarts';
import { RatingData, RatingIndicator } from '../venueDetail';
import './RatingDetail.scss';

const { Title, Text } = Typography;

// 评分详情组件属性接口
interface RatingDetailProps {
  visible: boolean;
  venueName: string;
  ratingData: RatingData;
  onClose: () => void;
  calculateOverallScore: () => string;
}

// 饼图颜色
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const RatingDetail: React.FC<RatingDetailProps> = ({
  visible,
  venueName,
  ratingData,
  onClose,
  calculateOverallScore
}) => {
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
  const barChartInstance = useRef<echarts.ECharts | null>(null);
  const pieChartInstance = useRef<echarts.ECharts | null>(null);

  // 初始化柱状图
  const initBarChart = () => {
    if (!barChartRef.current) return;
    
    // 如果已有实例，先销毁
    if (barChartInstance.current) {
      barChartInstance.current.dispose();
    }
    
    barChartInstance.current = echarts.init(barChartRef.current);
    
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} 分',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#1890ff',
        textStyle: {
          color: '#ffffff'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ratingData.indicators.map(item => item.name),
        axisLabel: {
          rotate: 30,
          interval: 0,
          color: '#ffffff'
        }
      },
      yAxis: {
        type: 'value',
        max: 5,
        min: 0,
        interval: 1,
        axisLabel: {
          color: '#ffffff'
        }
      },
      series: [
        {
          data: ratingData.indicators.map(item => item.score),
          type: 'bar',
          itemStyle: {
            color: '#1890ff',
            borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            fontWeight: 'bold',
            color: '#ffffff'
          }
        }
      ]
    };

    barChartInstance.current.setOption(option);
  };

  // 初始化饼图
  const initPieChart = () => {
    if (!pieChartRef.current) return;
    
    // 如果已有实例，先销毁
    if (pieChartInstance.current) {
      pieChartInstance.current.dispose();
    }
    
    pieChartInstance.current = echarts.init(pieChartRef.current);
    
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}% ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ratingData.indicators.map(item => item.name),
        textStyle: {
          color: '#ffffff'
        }
      },
      series: [
        {
          name: '权重占比',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: ratingData.indicators.map((item, index) => ({
            value: item.weight,
            name: item.name,
            itemStyle: {
              color: COLORS[index % COLORS.length]
            }
          }))
        }
      ]
    };

    pieChartInstance.current.setOption(option);
  };

  // 处理窗口大小变化
  const handleResize = () => {
    if (barChartInstance.current) {
      barChartInstance.current.resize();
    }
    if (pieChartInstance.current) {
      pieChartInstance.current.resize();
    }
  };

  // 当组件可见性变化或数据变化时重新初始化图表
  useEffect(() => {
    if (visible) {
      // 延迟初始化，确保DOM已经渲染
      setTimeout(() => {
        initBarChart();
        initPieChart();
      }, 100);
      
      // 添加resize监听
      window.addEventListener('resize', handleResize);
    }
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (barChartInstance.current) {
        barChartInstance.current.dispose();
        barChartInstance.current = null;
      }
      if (pieChartInstance.current) {
        pieChartInstance.current.dispose();
        pieChartInstance.current = null;
      }
    };
  }, [visible, ratingData]);

  // 确保容器有合适的高度
  useEffect(() => {
    if (visible) {
      // 给图表容器设置最小高度
      if (barChartRef.current) {
        barChartRef.current.style.minHeight = '300px';
      }
      if (pieChartRef.current) {
        pieChartRef.current.style.minHeight = '300px';
      }
    }
  }, [visible]);

  return (
    <Modal
      title={`${venueName} 评分详情`}
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={null}
      destroyOnClose={true}
      className="rating-detail-modal"
      afterOpenChange={(open) => {
        if (open) {
          setTimeout(() => {
            handleResize();
          }, 300);
        }
      }}
    >
      <div className="rating-detail-container">
        {/* 总体评分 */}
        <div className="overall-rating-section">
          <Title level={4}>综合评分</Title>
          <div className="overall-score">
            <span className="score-value">{ratingData.overall}</span>
            <span className="score-unit">/5.0</span>
          </div>
          <Progress 
            percent={ratingData.overall * 20} 
            status="active" 
            strokeColor="#FAAD14"
            className="overall-progress"
          />
        </div>

        {/* 评分构成 */}
        <div className="rating-components">
          <Title level={4}>评分构成与计算方式</Title>
          
          <div className="charts-container">
            {/* 左侧：各项指标得分柱状图 */}
            <div className="chart-wrapper">
              <Text strong>各项指标得分 (满分5分)</Text>
              <div ref={barChartRef} className="bar-chart" style={{ width: '100%', height: '300px' }} />
            </div>
            
            {/* 右侧：指标权重饼图 */}
            <div className="chart-wrapper">
              <Text strong>各项指标权重占比</Text>
              <div ref={pieChartRef} className="pie-chart" style={{ width: '100%', height: '300px' }} />
            </div>
          </div>
          
          {/* 计算公式 */}
          <div className="calculation-formula">
            <Title level={4}>评分计算公式</Title>
            <p>综合评分 = Σ(指标得分 × 指标权重) ÷ 100</p>
            <p className="calculation-process">
              计算过程：{ratingData.indicators.map((item, index) => (
                <span key={index}>
                  {item.score} × {item.weight}% 
                  {index < ratingData.indicators.length - 1 ? ' + ' : ''}
                </span>
              ))}
              = {calculateOverallScore()}
            </p>
          </div>
          
          {/* 指标说明 */}
          <div className="indicator-explanations">
            <Title level={4}>各项指标说明</Title>
            <div className="indicators-list">
              {ratingData.indicators.map((indicator, index) => (
                <div key={index} className="indicator-item">
                  <div className="indicator-header">
                    <span className="indicator-name">{indicator.name}</span>
                    <span className="indicator-weight">权重 {indicator.weight}%</span>
                  </div>
                  <div className="indicator-desc">{indicator.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RatingDetail;