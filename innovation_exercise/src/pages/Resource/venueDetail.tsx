import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Typography, Tabs, Table, Descriptions } from 'antd'
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  TeamOutlined
} from '@ant-design/icons'
import './venueDetail.scss'

const { Title } = Typography
const { TabPane } = Tabs

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
  // 详细描述
  description?: string
  // 设施列表
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

// 模拟场馆详情数据
const mockVenueDetails: Record<number, VenueDetail> = {
  1: {
    id: 1,
    name: '河北省体育馆',
    address: '石家庄市长安区中山东路338号',
    openingHours: '06:00-22:00',
    phone: '0311-85918888',
    type: '综合体育馆',
    image: 'https://picsum.photos/800/500?random=1',
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
  }
}

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

const VenueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const venueId = id ? parseInt(id, 10) : 1
  const venue = mockVenueDetails[venueId] || mockVenueDetails[1] // 默认显示第一个场馆

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
            <Title level={2} className="venue-name">
              {venue.name}
            </Title>

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

      {/* 第二部分：详细信息 */}
      <Card className="detail-info-card" title="详细介绍">
        <Title level={3}>基本信息</Title>
        <Descriptions
          column={2}
          items={basicInfoItems}
          className="venue-descriptions"
        />

        {/* 场馆设施标签页 */}
        <Title level={3}>场馆设施</Title>
        <Table
          columns={facilityColumns}
          dataSource={venue.facilities}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}

export default VenueDetail
