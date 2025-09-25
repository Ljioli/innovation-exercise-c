import React from 'react'
import {
  Typography,
  Layout,
  Select,
  Card,
  Progress,
  Button,
  message,
  Avatar,
  Statistic
} from 'antd'
import { FireFilled, CheckCircleOutlined, StarFilled } from '@ant-design/icons'
import './fitnessCommunity.scss'
import { useState } from 'react'
import { HeartOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import CommunityFeed from './components/CommunityFeed'

const { Title } = Typography
const { Header, Sider, Content } = Layout
const { Meta } = Card

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#f5f7fa',
  height: 'auto'
}

const siderStyle: React.CSSProperties = {
  padding: '0 20px',
  backgroundColor: '#f5f7fa'
}
// 视频数据结构
const videos = [
  {
    id: 1,
    part: 'chest',
    title: '胸肌训练基础',
    author: '教练A',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    id: 2,
    part: 'legs',
    title: '腿部爆发力训练',
    author: '教练B',
    url: 'https://www.w3schools.com/html/movie.mp4'
  },
  {
    id: 3,
    part: 'abs',
    title: '腹肌撕裂者',
    author: '达人C',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4'
  }
]

const FitnessCommunity: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState('全部')
  const [streak, setStreak] = useState(0)
  const [checkedIn, setCheckedIn] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showCommentSidebar, setShowCommentSidebar] = useState(false)

  const actions: React.ReactNode[] = [
    <Statistic value={1128} prefix={<HeartOutlined />} />,
    <Statistic value={1128} prefix={<StarOutlined />} />,
    <Statistic value={1128} prefix={<MessageOutlined />} />
  ]

  // 推荐视频筛选
  const filteredVideos =
    selectedPart === '全部'
      ? videos
      : videos.filter((v) => v.part === selectedPart)

  // 收藏切换
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

  // 每日打卡逻辑
  const handleCheckIn = () => {
    if (!checkedIn) {
      const newStreak = streak + 1
      setStreak(newStreak)
      setCheckedIn(true)
      message.success(`打卡成功！已连续打卡 ${newStreak} 天`)
    }
  }

  return (
    <>
      <Layout>
        <Header style={headerStyle}>
          <Title level={2}>健身社区</Title>
          <Title level={5} type="secondary">
            分享你的健身日常，与大家一起进步
          </Title>
        </Header>
        <Layout>
          <Sider width="25%" style={siderStyle}>
            <div className="fitness-left-sider">
              <Title level={5} className="fitness-left-title">
                锻炼部位
              </Title>
              <Select
                value={selectedPart}
                style={{ width: '100%' }}
                onChange={(value) => setSelectedPart(value)}
                options={[
                  { label: <span>全部</span>, value: '全部' },
                  {
                    label: <span>上肢训练</span>,
                    title: '上肢训练',
                    options: [
                      { label: <span>胸部</span>, value: 'chest' },
                      { label: <span>肩部</span>, value: 'shoulders' },
                      { label: <span>背部</span>, value: 'back' },
                      { label: <span>手臂</span>, value: 'arms' }
                    ]
                  },
                  {
                    label: <span>下肢训练</span>,
                    title: '下肢训练',
                    options: [
                      { label: <span>腿部</span>, value: 'legs' },
                      { label: <span>臀部</span>, value: 'glutes' },
                      { label: <span>小腿</span>, value: 'calves' }
                    ]
                  },
                  {
                    label: <span>核心训练</span>,
                    title: '核心训练',
                    options: [
                      { label: <span>腹部</span>, value: 'abs' },
                      { label: <span>腰部</span>, value: 'waist' },
                      { label: <span>下背部</span>, value: 'lower_back' }
                    ]
                  },
                  {
                    label: <span>全身训练</span>,
                    title: '全身训练',
                    options: [
                      { label: <span>全身综合</span>, value: 'full_body' },
                      { label: <span>有氧运动</span>, value: 'cardio' },
                      { label: <span>功能性训练</span>, value: 'functional' }
                    ]
                  }
                ]}
              />
            </div>
            <div className="fitness-left-sider">
              <Title level={5} className="fitness-left-title">
                推荐视频
              </Title>
              <div className="fitness-left">
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    hoverable
                    cover={<video src={video.url} controls />}
                    className="fitness-video"
                  >
                    <Meta
                      title={video.title}
                      description={`作者：${video.author}`}
                    />
                    <Button
                      onClick={() => toggleFavorite(video.id)}
                      icon={
                        favorites.includes(video.id) ? (
                          <StarFilled />
                        ) : (
                          <StarOutlined />
                        )
                      }
                      className="favorite-button"
                    ></Button>
                  </Card>
                ))}
              </div>
            </div>
          </Sider>

          <Content className="fitness-content">
            <CommunityFeed
            />
          </Content>
          <Sider width="25%" style={siderStyle}>
            <Card className="check-in-card" title="每日打卡">
              <div className="check-in-content">
                {streak === 0 ? (
                  <div className="streak-count">暂未打卡</div>
                ) : (
                  <div className="streak-count">
                    <FireFilled style={{ color: '#ff7a45' }} />
                    <span>
                      已连续打卡 <strong>{streak}</strong> 天
                    </span>
                  </div>
                )}
                <Progress
                  percent={Math.round((streak / 30) * 100)}
                  size="small"
                  status="active"
                  format={() => `${streak}/30`}
                />
                <Button
                  type={checkedIn ? 'primary' : 'default'}
                  size="large"
                  icon={<CheckCircleOutlined />}
                  onClick={handleCheckIn}
                  disabled={checkedIn}
                  style={{ backgroundColor: checkedIn ? '#98ec49' : undefined }}
                  block
                >
                  {checkedIn ? '今日已打卡' : '每日打卡'}
                </Button>
              </div>
            </Card>
            <Card className="check-in-card" title="社区统计">
              {/* 活跃用户 */}

              <Card className="stat-small-card">
                <Statistic
                  value={2865}
                  title="活跃用户"
                  className="stat-item"
                />
              </Card>

              {/* 健身视频 */}

              <Card className="stat-small-card">
                <Statistic
                  value={1248}
                  title="健身视频"
                  className="stat-item"
                />
              </Card>

              {/* 动态分享 */}

              <Card className="stat-small-card">
                <Statistic
                  value={5632}
                  title="动态分享"
                  className="stat-item"
                />
              </Card>
            </Card>
          </Sider>
        </Layout>
      </Layout>
    </>
  )
}
export default FitnessCommunity
