import React, { useState } from 'react'
import { Card, Col, Divider, Row, Tabs, Typography, Table } from 'antd'
import type { TabsProps } from 'antd'
import TotalTitle from './components/TotalTitle'
import './VenueOpen.scss'
const { Title, Text } = Typography

const VenueOpen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1')

  // 场馆类型数据
  const venueTypes: TabsProps['items'] = [
    {
      key: '1',
      label: '公共体育场'
    },
    {
      key: '2',
      label: '公共体育馆'
    },
    {
      key: '3',
      label: '公共游泳(跳水)馆'
    },
    {
      key: '4',
      label: '全民健身中心'
    },
    {
      key: '5',
      label: '网球场(馆)'
    },
    {
      key: '6',
      label: '滑冰馆'
    }
  ]

  // 场馆数据
  const venueData = [
    {
      id: 1,
      type: '1',
      name: '青海省全民健身中心体育场',
      location: '青海省·西宁市',
      visitors: 4598
    },
    {
      id: 2,
      type: '1',
      name: '利川市清源体育场',
      location: '湖北省·恩施土家族苗族自治州',
      visitors: 4546
    },
    {
      id: 3,
      type: '1',
      name: '西宁市大通县体育场',
      location: '青海省·西宁市',
      visitors: 3862
    },
    {
      id: 4,
      type: '1',
      name: '平潭人民体育场',
      location: '福建省·福州市',
      visitors: 4377
    },
    {
      id: 5,
      type: '2',
      name: '兰州奥体中心体育场',
      location: '甘肃省·兰州市',
      visitors: 3726
    }
  ]

  // 排行榜数据
  const rankingData = [
    { rank: 4, region: '广东省', visitors: 97146 },
    { rank: 5, region: '湖南省', visitors: 92591 },
    { rank: 6, region: '云南省', visitors: 85451 },
    { rank: 7, region: '陕西省', visitors: 83717 },
    { rank: 8, region: '湖北省', visitors: 72999 },
    { rank: 9, region: '山西省', visitors: 69956 },
    { rank: 10, region: '河南省', visitors: 60419 },
    { rank: 11, region: '福建省', visitors: 48991 },
    { rank: 12, region: '内蒙古自区', visitors: 48583 },
    { rank: 13, region: '广西壮族自', visitors: 48488 },
    { rank: 14, region: '吉林省', visitors: 46727 },
    { rank: 15, region: '新疆维吾尔自治区', visitors: 44240 }
  ]

  // 过滤当前类型的场馆
  const filteredVenues = venueData.filter((venue) => venue.type === activeTab)

  // 排行榜列定义
  const rankingColumns = [
    {
      title: '序号',
      dataIndex: 'rank',
      key: 'rank',
      width: 60
    },
    {
      title: '地区',
      dataIndex: 'region',
      key: 'region'
    },
    {
      title: '累计客流量',
      dataIndex: 'visitors',
      key: 'visitors'
    }
  ]

  return (
    <div>
      <TotalTitle />

      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: 16,
          marginBottom: 24,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Tabs
          type="card"
          activeKey={activeTab}
          items={venueTypes}
          onChange={setActiveTab}
        />
        <Row gutter={[16, 16]}>
          {/* 场馆列表 */}
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Row gutter={[16, 16]}>
              {filteredVenues.map((venue) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={8} key={venue.id}>
                  <Card
                    hoverable
                    style={{ height: '100%' }}
                    styles={{
                      body: { padding: 16 }
                    }}
                  >
                    <div
                      style={{
                        marginBottom: 8,
                        height: '150px'
                      }}
                    >
                      <img
                        src="https://js365.org.cn/oss/js365/upload/2021/07/23/9673666b-9672-421a-a460-355094ececdb.jpg"
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                    <Title level={5} style={{ marginBottom: 4 }}>
                      {venue.name}
                    </Title>
                    <Text type="secondary">{venue.location}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* 排行榜 */}
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Card
              title="核心区累计客流排行"
              styles={{
                body: { padding: 0 },
                header: { fontWeight: 'bold' }
              }}
            >
              <Table
                columns={rankingColumns}
                dataSource={rankingData}
                rowKey="rank"
                size="small"
                scroll={{ x: true }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default VenueOpen
