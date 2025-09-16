import React from 'react'
import { Card, Col, Row, Typography, Tag } from 'antd'
import { Link } from 'react-router-dom'
import { NotificationOutlined } from '@ant-design/icons'
import TotalTitle from './components/TotalTitle'
import './NoticeAnnouncement.scss'

const { Title, Text } = Typography

const NoticeAnnouncement: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: '2025年市民健身节活动通知',
      publishTime: '2025-08-15',
      type: '通知公告',
      content:
        '为进一步推动全民健身事业发展，满足市民日益增长的健身需求，我市将启动新一轮社区健身设施升级改造计划。'
    },
    {
      id: 2,
      title: '全市公共体育场馆免费开放政策',
      publishTime: '2025-08-10',
      type: '政策法规',
      content:
        '为进一步推动全民健身事业发展，满足市民日益增长的健身需求，我市将启动新一轮社区健身设施升级改造计划。'
    },
    {
      id: 3,
      title: '社区健身设施升级改造计划',
      publishTime: '2025-08-05',
      type: '通知公告',
      content:
        '为进一步推动全民健身事业发展，满足市民日益增长的健身需求，我市将启动新一轮社区健身设施升级改造计划。'
    }
  ]

  const getCategoryColor = (type: string) => {
    return type === '通知公告' ? 'blue' : 'green'
  }

  return (
    <div>
      <TotalTitle
        titleText="政务公开"
        linkPath="#"
        icon={<NotificationOutlined />}
      />

      <Row gutter={[24, 24]} className="announcement-cards">
        {announcements.map((item) => (
          <Col xs={24} md={12} lg={8} key={item.id}>
            <Card hoverable>
              <div>
                <Tag color={getCategoryColor(item.type)}>
                  {item.type}
                </Tag>
                <Text type="secondary" className="card-date">
                  {item.publishTime}
                </Text>
              </div>
              <Title level={4}>
                {item.title}
              </Title>
              <Text>{item.content}</Text>
              <div className="card-footer">
                <Link
                  to={`/government/notices/${item.id}`}
                  className="read-more-link"
                >
                  阅读全文
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default NoticeAnnouncement
