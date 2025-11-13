import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Typography,
  Table,
  Descriptions,
  Button,
  Space,
  Form,
  Input
} from 'antd'
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  TeamOutlined,
  StarOutlined
} from '@ant-design/icons'
import './venueDetail.scss'
import VenueMap from './components/VenueMap'
import RatingDetail from './components/RatingDetail'

const { Title } = Typography

// 引入基础的Venue接口定义
interface Venue {
  id: number
  name: string
  address: string
  openingHours: string
  phone: string
  type: string
  image: string
  province: string
  city: string
  operator?: string
  year?: string
  area?: string
}

// 扩展场馆数据类型
interface VenueDetail extends Venue {
  outerFreeArea?: string
  venueArea?: string
  outerArea?: string
  outerFreeCount?: string
  coreFreeArea?: string
  hasOutdoorArea?: string
  coreArea?: string
  coreFreeCount?: string
  landArea?: string
  seatNum?: string
  superior?: string
  description?: string
  facilities?: Facility[]
}

// 设施数据类型
interface Facility {
  id: number
  name: string
  image: string
  quantity: number
  availableCount: number
  type: string
  lastCheck?: string
}

// 评分指标类型
export interface RatingIndicator {
  name: string
  score: number
  weight: number
  description: string
}

// 评分数据类型
export interface RatingData {
  overall: number
  indicators: RatingIndicator[]
}

// 模拟场馆详情数据
const mockVenueDetails: Record<number, VenueDetail> = {
  1: {
    id: 1,
    name: '河北体育馆',
    address: '石家庄市长安区中山东路338号',
    openingHours: '06:00-22:00',
    phone: '0311-85918888',
    type: '综合体育馆',
    image:
      'https://js365.org.cn/oss/js365/upload/2021/10/12/f5de89a3-a29d-44ca-8e62-677e82c5b6fe.jpg',
    province: '河北省',
    city: '石家庄市',
    operator: '河北省体育局',
    year: '2005',
    area: '25000',
    outerFreeArea: '5000',
    venueArea: '25000',
    outerArea: '8000',
    outerFreeCount: '12',
    coreFreeArea: '12000',
    hasOutdoorArea: '是',
    coreArea: '17000',
    coreFreeCount: '8',
    landArea: '45000',
    seatNum: '5000',
    superior: '河北省体育局',
    description:
      '河北省体育馆建于2005年，是集体育比赛、训练、健身、娱乐为一体的综合性体育场馆。场馆设施先进，可举办各类室内体育赛事，同时向市民开放，提供健身服务。',
    facilities: [
      {
        id: 101,
        name: '篮球架',
        image: 'https://picsum.photos/100/100?random=101',
        quantity: 12,
        availableCount: 10,
        type: '球类',
        lastCheck: '2023-10-15'
      },
      {
        id: 102,
        name: '乒乓球台',
        image: 'https://picsum.photos/100/100?random=102',
        quantity: 20,
        availableCount: 18,
        type: '球类',
        lastCheck: '2023-10-10'
      },
      {
        id: 103,
        name: '跑步机',
        image: 'https://picsum.photos/100/100?random=103',
        quantity: 15,
        availableCount: 15,
        type: '健身器材',
        lastCheck: '2023-10-05'
      },
      {
        id: 104,
        name: '动感单车',
        image: 'https://picsum.photos/100/100?random=104',
        quantity: 20,
        availableCount: 17,
        type: '健身器材',
        lastCheck: '2023-10-08'
      }
    ]
  },
  2: {
    id: 2,
    name: '河北奥体中心主体育场',
    address: '石家庄市长安区中山东路211号',
    openingHours: '全天开放',
    phone: '0311-86688888',
    type: '户外健身区',
    image: 'https://picsum.photos/800/500?random=2',
    province: '河北省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2010',
    area: '8000',
    outerFreeArea: '3000',
    venueArea: '8000',
    outerArea: '5000',
    outerFreeCount: '8',
    coreFreeArea: '4000',
    hasOutdoorArea: '是',
    coreArea: '3000',
    coreFreeCount: '5',
    landArea: '15000',
    seatNum: '2000',
    superior: '石家庄市体育局',
    description:
      '河北奥体中心主体育场建于2010年，是集户外健身、体育训练为一体的体育场地，全天向市民开放，提供便捷的健身服务。',
    facilities: [
      {
        id: 201,
        name: '健身路径',
        image: 'https://picsum.photos/100/100?random=201',
        quantity: 5,
        availableCount: 5,
        type: '户外器材',
        lastCheck: '2023-10-12'
      },
      {
        id: 202,
        name: '足球场',
        image: 'https://picsum.photos/100/100?random=202',
        quantity: 2,
        availableCount: 2,
        type: '户外场地',
        lastCheck: '2023-10-08'
      },
      {
        id: 203,
        name: '网球场',
        image: 'https://picsum.photos/100/100?random=203',
        quantity: 4,
        availableCount: 3,
        type: '户外场地',
        lastCheck: '2023-10-05'
      }
    ]
  }
}

const VenueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const venueId = id ? parseInt(id, 10) : 1
  const venue = mockVenueDetails[venueId] || mockVenueDetails[1]
  const [ratingVisible, setRatingVisible] = useState(false)

  // 场馆评分数据
  const ratingData: RatingData = {
    overall: 4.7,
    indicators: [
      {
        name: '设施完善度',
        score: 4.8,
        weight: 30,
        description: '评估场馆设施的完整性、先进性和维护状况'
      },
      {
        name: '服务质量',
        score: 4.5,
        weight: 25,
        description: '评估场馆工作人员服务态度和专业水平'
      },
      {
        name: '场地条件',
        score: 4.9,
        weight: 20,
        description: '评估场地大小、采光、通风等物理条件'
      },
      {
        name: '开放时间合理性',
        score: 4.6,
        weight: 15,
        description: '评估开放时间是否满足市民健身需求'
      },
      {
        name: '交通便利性',
        score: 4.4,
        weight: 10,
        description: '评估场馆的交通可达性和停车条件'
      }
    ]
  }

  // 计算总分（用于演示计算过程）
  const calculateOverallScore = () => {
    const total = ratingData.indicators.reduce(
      (sum, item) => sum + (item.score * item.weight) / 100,
      0
    )
    return total.toFixed(1)
  }

  // 设施表格列定义
  const facilityColumns = [
    {
      title: '器材图片',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} alt="" className="facility-image" />
      )
    },
    {
      title: '器材名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '器材总数',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: '器材可用数',
      dataIndex: 'availableCount',
      key: 'availableCount'
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '最近检查',
      dataIndex: 'lastCheck',
      key: 'lastCheck'
    }
  ]

  // 基本信息描述列表项
  const basicInfoItems = [
    {
      key: '1',
      label: '场馆类型',
      children: venue.type || '未知',
      span: 1
    },
    {
      key: '2',
      label: '运营单位',
      children: venue.operator || '未知',
      span: 1
    },
    {
      key: '3',
      label: '建成年份',
      children: venue.year || '未知',
      span: 1
    },
    {
      key: '4',
      label: '建筑面积（㎡）',
      children: venue.area || '未知',
      span: 1
    },
    {
      key: '5',
      label: '场馆外围免费或低收费开放的场地面积（㎡）',
      children: venue.outerFreeArea || '未知',
      span: 1
    },
    {
      key: '6',
      label: '场地面积（㎡）',
      children: venue.venueArea || '未知',
      span: 1
    },
    {
      key: '7',
      label: '场馆外围场地面积（㎡）',
      children: venue.outerArea || '未知',
      span: 1
    },
    {
      key: '8',
      label: '场馆外围免费或低收费开放的场地片数（片）',
      children: venue.outerFreeCount || '未知',
      span: 1
    },
    {
      key: '9',
      label: '核心区免费或低收费开放的场地面积（㎡）',
      children: venue.coreFreeArea || '未知',
      span: 1
    },
    {
      key: '10',
      label: '是否有户外公共区域及户外健身器材',
      children: venue.hasOutdoorArea || '未知',
      span: 1
    },
    {
      key: '11',
      label: '核心区场地面积（㎡）',
      children: venue.coreArea || '未知',
      span: 1
    },
    {
      key: '12',
      label: '核心区免费或低收费开放的场地片数（片）',
      children: venue.coreFreeCount || '未知',
      span: 1
    },
    {
      key: '13',
      label: '用地面积（㎡）',
      children: venue.landArea || '未知',
      span: 1
    },
    {
      key: '14',
      label: '固定座位数（座）',
      children: venue.seatNum || '未知',
      span: 1
    },
    {
      key: '15',
      label: '上级主管单位',
      children: venue.superior || '未知',
      span: 1
    }
  ]

  return (
    <div className="venue-detail-page">
      {/* 第一部分：场馆图片和基本信息 */}
      <Card className="main-info-card">
        <Row gutter={[24, 0]}>
          {/* 左侧图片 */}
          <Col xs={24} md={10}>
            <div className="venue-image-container">
              <img
                src={venue.image}
                alt={venue.name}
                className="venue-main-image"
              />
            </div>
          </Col>

          {/* 右侧基本信息 */}
          <Col xs={24} md={14}>
            <div className="venue-header">
              <Title level={2} className="venue-name">
                {venue.name}
              </Title>

              {/* 评分显示区域 */}
              <div
                className="rating-display"
                onClick={() => setRatingVisible(true)}
              >
                <div className="rating-value">
                  {ratingData.overall}
                  <StarOutlined className="star-icon" />
                </div>
                <div className="rating-text">点击查看详情</div>
              </div>
            </div>

            <div className="basic-info-list">
              <div className="info-item">
                <EnvironmentOutlined className="info-icon" />
                <span className="info-label">场馆地址：</span>
                <span className="info-value">{venue.address}</span>
              </div>

              <div className="info-item">
                <PhoneOutlined className="info-icon" />
                <span className="info-label">联系电话：</span>
                <span className="info-value">{venue.phone}</span>
              </div>

              <div className="info-item">
                <ClockCircleOutlined className="info-icon" />
                <span className="info-label">开放时间：</span>
                <span className="info-value">{venue.openingHours}</span>
              </div>

              <div className="info-item">
                <TeamOutlined className="info-icon" />
                <span className="info-label">运营单位：</span>
                <span className="info-value">{venue.operator || '未知'}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 评分详情弹窗组件 */}
      <RatingDetail
        visible={ratingVisible}
        venueName={venue.name}
        ratingData={ratingData}
        onClose={() => setRatingVisible(false)}
        calculateOverallScore={calculateOverallScore}
      />

      {/* 第二部分：详细信息 */}
      <Card className="detail-info-card" title="详细介绍">
        <Title level={3}>基本信息</Title>
        <Descriptions
          column={2}
          items={basicInfoItems}
          className="venue-descriptions"
        />

        {/* 场馆设施 */}
        <Title level={3}>场馆设施</Title>
        <Table
          columns={facilityColumns}
          dataSource={venue.facilities}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 第三部分：地图定位 */}
      <Card className="map-card" title="场馆位置">
        <VenueMap venueName={venue.name} />
      </Card>
    </div>
  )
}

export default VenueDetail
