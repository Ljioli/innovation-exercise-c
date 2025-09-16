import React from 'react'
import { Card, Col, Row, Typography, Image } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import TotalTitle from './components/TotalTitle'

const { Title, Text } = Typography

const FitnessCircle: React.FC = () => {
  const fitnessSpots = [
    {
      id: 1,
      name: '中山公园健身区',
      image: 'https://picsum.photos/300/200?random=1',
      distance: '500m',
      facilities: ['健身路径', '篮球场', '乒乓球台']
    },
    {
      id: 2,
      name: '人民广场健身点',
      image: 'https://picsum.photos/300/200?random=2',
      distance: '800m',
      facilities: ['健身器材', '儿童游乐区', '慢跑道']
    },
    {
      id: 3,
      name: '滨河健身步道',
      image: 'https://picsum.photos/300/200?random=3',
      distance: '1.2km',
      facilities: ['步行道', '休息区', '景观台']
    },
    {
      id: 4,
      name: '社区健身中心',
      image: 'https://picsum.photos/300/200?random=4',
      distance: '600m',
      facilities: ['健身房', '瑜伽室', '羽毛球场']
    }
  ]

  return (
    <div>
      <TotalTitle
        titleText="15分钟健身圈"
        linkPath="#"
        icon={<EnvironmentOutlined />}
      />

      <Row gutter={[16, 16]}>
        {fitnessSpots.map((spot) => (
          <Col xs={24} sm={12} md={8} lg={6} key={spot.id}>
            <Card
              hoverable
              cover={
                <Image
                  src={spot.image}
                  alt={spot.name}
                  height={160}
                  preview={false}
                />
              }
            >
              <Title level={5}>{spot.name}</Title>
              <Text
                type="secondary"
                style={{ marginBottom: '8px', display: 'block' }}
              >
                距离: {spot.distance}
              </Text>
              <div>
                {spot.facilities.map((facility, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      background: '#f0f7ff',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      margin: '2px',
                      fontSize: '12px'
                    }}
                  >
                    {facility}
                  </span>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default FitnessCircle
