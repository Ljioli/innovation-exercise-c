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
import { FireFilled, CheckCircleOutlined } from '@ant-design/icons'
import './fitnessCommunity.scss'
import { useState } from 'react'
import {
  HeartOutlined,
  MessageOutlined,
  StarOutlined
} from '@ant-design/icons'
const { Title } = Typography
const { Header, Sider, Content } = Layout
const { Meta } = Card

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  backgroundColor: '#f5f7fa',
  height: 'auto'
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  backgroundColor: '#fff'
}

const siderStyle: React.CSSProperties = {
  padding: '0 20px',
  backgroundColor: '#f5f7fa'
}

const FitnessCommunity: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState('全部')
  const [streak, setStreak] = useState(8)
  const [checkedIn, setCheckedIn] = useState(false)
  
  const actions: React.ReactNode[] = [
    <Statistic value={1128} prefix={<HeartOutlined />} />,
    <Statistic value={1128} prefix={<StarOutlined />} />,
    <Statistic value={1128} prefix={<MessageOutlined />} />
  ]
  // 每日打卡
  const handleCheckIn = () => {
    if (!checkedIn) {
      const newStreak = streak + 1
      // setStreak(newStreak);
      // setCheckedIn(true);
      // localStorage.setItem('todayCheckedIn', 'true');
      // localStorage.setItem('streak', newStreak.toString());
      message.success('打卡成功！连续打卡' + newStreak + '天')
    } else {
      message.info('今天已经打卡过了哦！')
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
                style={{ width: 200 }}
                onChange={(value) => setSelectedPart(value)}
                options={[
                  {
                    label: <span>manager</span>,
                    title: 'manager',
                    options: [
                      { label: <span>Jack</span>, value: 'Jack' },
                      { label: <span>Lucy</span>, value: 'Lucy' }
                    ]
                  },
                  {
                    label: <span>engineer</span>,
                    title: 'engineer',
                    options: [
                      { label: <span>Chloe</span>, value: 'Chloe' },
                      { label: <span>Lucas</span>, value: 'Lucas' }
                    ]
                  }
                ]}
              />
            </div>
            <div className="fitness-left-sider">
              <Title level={5} className="fitness-left-title">
                锻炼部位
              </Title>
              <div className="fitness-left">
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  className="fitness-video"
                >
                  <Meta
                    style={{ height: 50 }}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  className="fitness-video"
                >
                  <Meta
                    style={{ height: 50 }}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
                <Card
                  hoverable
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  className="fitness-video"
                >
                  <Meta
                    style={{ height: 50 }}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
              </div>
            </div>
          </Sider>
          <Content style={contentStyle}>
            <Card actions={actions} style={{ minWidth: 300 }}>
              <Card.Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                }
                title="Card title"
                description={
                  <>
                    <p>This is the description</p>
                    <p>This is the description</p>
                  </>
                }
              />
            </Card>
          </Content>
          <Sider width="25%" style={siderStyle}>
            <Card className="check-in-card" title="每日打卡">
              <div className="check-in-content">
                <div className="streak-count">
                  <FireFilled style={{ color: '#ff7a45' }} />
                  <span>
                    已连续打卡 <strong>{streak}</strong> 天
                  </span>
                </div>
                <Progress
                  percent={Math.round((streak / 30) * 100)}
                  size="small"
                  status="active"
                  format={() => `本月已完成${streak}/30天`}
                />
                <Button
                  type="primary"
                  size="large"
                  icon={<CheckCircleOutlined />}
                  onClick={handleCheckIn}
                  disabled={checkedIn}
                  className="check-in-button"
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
