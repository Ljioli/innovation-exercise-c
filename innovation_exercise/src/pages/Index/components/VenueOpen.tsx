import React, { useState } from 'react'
import { Card, Col, Divider, Row, Tabs, Typography, Table } from 'antd'
import type { TabsProps } from 'antd'
import TotalTitle from './components/TotalTitle'
import './VenueOpen.scss'
// import ExerciseMap from './ExerciseMap'
// import { url } from 'inspector'
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
      type: '2',
      url: 'https://js365.org.cn/oss/js365/js365/upload/20220620/13117c9a27f940fb9095307d386a8be6.jpg',
      name: '石家庄市新华区文体中心体育综合馆',
      location: '河北省·石家庄市',
      visitors: 4598
    },
    {
      id: 2,
      type: '2',
      url:'https://js365.org.cn/oss/js365/upload/2021/10/12/f5de89a3-a29d-44ca-8e62-677e82c5b6fe.jpg',
      name: '河北体育馆',
      location: '河北省石家庄市长安区广安街道中山东路338号',
      visitors: 4546
    },
    {
      id: 3,
      type: '2',
      url:'https://js365.org.cn/oss/js365/js365/upload/20220621/e76e1aa77d184d6bbaa643c4d32b2192.jpg',
      name: '石家庄滑冰馆',
      location: '河北省石家庄市长安区育才街道中山东路350号',
      visitors: 3862
    },
    {
      id: 4,
      type: '2',
      url:'https://www.js365.org.cn/oss/js365/upload/20240725/fc5c888aeb514a94884f49f631d50ff9.jpg',
      name: '石家庄市中山体育馆',
      location: '河北省石家庄市桥西区维明街道自强路117号',
      visitors: 4377
    },
    {
      id: 5,
      type: '2',
      url:'https://js365.org.cn/oss/js365/js365/upload/20220714/d019cb5abda14242bfa92345e200bfd8.png',
      name: '栾城区体育馆',
      location: '河北省石家庄市栾城区栾城镇街道惠源路39号',
      visitors: 3726
    },
    {
      id: 6,
      type: '2',
      url:'https://www.js365.org.cn/oss/js365/upload/20230717/b0ccdc0d860e4396985a3025b342d0f6.jpg',
      name: '高新区气膜体育馆',
      location: '河北省石家庄市石家庄高新技术产业开发区',
      visitors: 3862
    }
  ]

  // 排行榜数据
  const rankingData = [
    { rank: 1, region: '石家庄市', visitors: 12586 },
    { rank: 2, region: '唐山市', visitors: 10532 },
    { rank: 3, region: '秦皇岛市', visitors: 9532 },
    { rank: 4, region: '邯郸市', visitors: 8512 },
    { rank: 5, region: '邢台市', visitors: 7523 },
    { rank: 6, region: '保定市', visitors: 7203 },
    { rank: 7, region: '张家口市', visitors: 6508 },
    { rank: 8, region: '承德市', visitors: 6526 },
    { rank: 9, region: '沧州市', visitors: 5982 },
    { rank: 10, region: '廊坊市', visitors: 5820 },
    { rank: 11, region: '衡水市', visitors: 5169 },
    { rank: 12, region: '定州市', visitors: 4889 }
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
      <TotalTitle linkPath="/resource/venue-open"/>

      <div
        className='venue-open-container'
      >
        <Tabs
          type="card"
          activeKey={activeTab}
          items={venueTypes}
          onChange={setActiveTab}
        />
        <Row gutter={[16, 16]}>
          {/* 场馆列表 */}
          <Col xs={24} sm={24} md={18} lg={18} xl={17}>
            <Row gutter={[16, 16]}>
              {filteredVenues.map((venue) => (
                <Col xs={24} sm={12} md={12} lg={8} xl={8} key={venue.id}>
                  <Card
                    hoverable
                  >
                    <div
                      className='venue-card-img'
                    >
                      <img
                        src={venue.url}
                        alt=""
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

          {/* 场馆分布 */}
          <Col xs={24} sm={24} md={6} lg={6} xl={7}>
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
            {/* <ExerciseMap
            /> */}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default VenueOpen
