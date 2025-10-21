import React from 'react'
import { Card, Col, Row, Typography } from 'antd'
import { DribbbleSquareOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import TotalTitle from './components/TotalTitle'
import './ExerciseGuide.scss'

const { Title, Text } = Typography

const videoData = [
  {
    id: 1,
    title: '髋关节慢性疼痛的基本原理',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'https://tse1-mm.cn.bing.net/th/id/OIP-C.U2BOCi5hANNEwPtsannY1gHaEo?w=268&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  },
  {
    id: 2,
    title: '大众全身健身操',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'data:image/webp;base64,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'
  },
  {
    id: 3,
    title: '健身器材使用指南（一）',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.sIyo4x4DB4VvbVLso0C9CAHaEK?w=321&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 4,
    title: '训练动作及其要点',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'https://tse2-mm.cn.bing.net/th/id/OIP-C.4FI66OSNUYEjk1-o7Q3kiwHaEK?w=282&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 5,
    title: '髋关节慢性伤病运动处方.',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'https://tse1-mm.cn.bing.net/th/id/OIP-C.SB1pIXpaQTIQCHHdf4oELQHaEK?w=329&h=185&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  },
  {
    id: 6,
    title: '训练动作视频演示',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'https://tse2-mm.cn.bing.net/th/id/OIP-C.DyB0q4X2pSqGKk1CLhY2xAHaEL?w=307&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  },
  {
    id: 7,
    title: '肩关节疼痛的致病因素',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'https://tse3-mm.cn.bing.net/th/id/OIP-C.A_E8lSDvDnhhbeOh_cMDEgHaEK?w=333&h=187&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 8,
    title: '健身器材使用指南（二）',
    videoPath: require('@/assets/video/huqiu.MP4'),
    url:'https://tse1-mm.cn.bing.net/th/id/OIP-C.G1Y_WZTPz3MxpOHBxCOpjAHaFj?w=231&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
  }
]

const ExerciseGuide: React.FC = () => {
  return (
    <div>
      <TotalTitle
        titleText="科学健身指导"
        linkPath="/community"
        icon={<DribbbleSquareOutlined />}
      />


      <div className="video">
        <Row gutter={[16, 24]}>
          {videoData.map((video) => (
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Card
                // loading={true}
                hoverable
                cover={
                  // <video
                  //   muted
                  //   preload="metadata"
                  //   style={{ width: '100%', height: 'auto' }}
                  // >
                  //   <source src={video.videoPath} type="video/mp4" />
                  // </video>
                  <img src={video.url} alt={video.title} height={150} />
                }
                styles={{ body: { padding: '12px' } }}
              >
                <Text strong style={{ fontSize: '14px' }}>
                  {video.title}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default ExerciseGuide
