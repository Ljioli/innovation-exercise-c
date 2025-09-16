import React, { useState } from 'react'
import { Card, Typography, Divider, Row, Col, Menu, Breadcrumb } from 'antd'
import {
  ClockCircleOutlined,
  FlagOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
  HomeOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import BreadcrumbComponent from '@/components/BreadcrumbComponent'

const { Title, Text, Paragraph } = Typography
const { Item: BreadcrumbItem } = Breadcrumb

// 新闻数据类型定义
interface NewsItem {
  id: number
  title: string
  content: string
  publishTime: string
  cover: string
  type: '1' | '2'
}

const News: React.FC = () => {
  // 获取当前路由信息
  const location = useLocation()
  const navigate = useNavigate()

  // 根据当前路由设置默认分类
  const getDefaultType = (): '1' | '2' => {
    if (location.pathname.includes('sports')) {
      return '2' // 热门赛事
    }
    return '1' // 时政新闻
  }

  // 状态管理
  const [activeType, setActiveType] = useState<'1' | '2'>(getDefaultType())

  // 当分类变化时更新路由
  useEffect(() => {
    const currentType = getDefaultType()
    setActiveType(currentType)
  }, [location.pathname])

  // 模拟新闻数据
  const newsData: NewsItem[] = [
    // 时政新闻
    {
      id: 1,
      title: '国家领导人出席亚太经合组织领导人非正式会议',
      content:
        '国家领导人在会议上发表重要讲话，强调加强国际合作，共同应对全球挑战，推动构建人类命运共同体。',
      publishTime: '2025-09-05',
      cover: 'https://picsum.photos/id/1015/600/400',
      type: '1'
    },
    {
      id: 2,
      title: '全国人大常委会审议多项重要法律草案',
      content:
        '本次常委会会议审议了环境保护法修订草案、数字经济促进法草案等多项重要法律案，回应社会关切。',
      publishTime: '2025-09-03',
      cover: 'https://picsum.photos/id/1025/600/400',
      type: '1'
    },
    {
      id: 3,
      title: '我国经济运行延续回升向好态势',
      content:
        '最新数据显示，我国经济主要指标持续改善，市场信心增强，发展韧性和活力进一步显现。',
      publishTime: '2025-09-01',
      cover: 'https://picsum.photos/id/1043/600/400',
      type: '1'
    },
    {
      id: 4,
      title: '新一批国家公园正式设立',
      content:
        '国家林业和草原局宣布设立5处新的国家公园，进一步完善我国自然保护地体系。',
      publishTime: '2025-08-29',
      cover: 'https://picsum.photos/id/1036/600/400',
      type: '1'
    },

    // 热门赛事
    {
      id: 5,
      title: '世界杯预选赛亚洲区：中国队战胜韩国队',
      content:
        '在世界杯预选赛亚洲区关键战中，中国队凭借出色发挥，以2-1战胜韩国队，取得小组出线主动权。',
      publishTime: '2025-09-04',
      cover: 'https://picsum.photos/id/1058/600/400',
      type: '2'
    },
    {
      id: 6,
      title: '全运会田径比赛多项纪录被打破',
      content:
        '在全运会田径赛场上，共有5项全国纪录被刷新，展现了我国田径运动的蓬勃发展态势。',
      publishTime: '2025-09-02',
      cover: 'https://picsum.photos/id/1059/600/400',
      type: '2'
    },
    {
      id: 7,
      title: '国际乒联世锦赛：中国乒乓球队斩获五金',
      content:
        '在刚刚结束的国际乒联世界锦标赛上，中国乒乓球队表现出色，包揽全部五个项目的冠军。',
      publishTime: '2025-08-30',
      cover: 'https://picsum.photos/id/1060/600/400',
      type: '2'
    },
    {
      id: 8,
      title: '奥运会倒计时一周年活动举行',
      content:
        '距离下届奥运会开幕还有一周年，组委会举行了隆重的倒计时活动，发布了多项赛事筹备进展。',
      publishTime: '2025-08-28',
      cover: 'https://picsum.photos/id/1062/600/400',
      type: '2'
    }
  ]

  // 根据当前分类筛选新闻
  const filteredNews = newsData
    .filter((item) => item.type === activeType)
    // 按日期倒序排列
    .sort((a, b) => {
      return (
        new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
      )
    })

  // 处理菜单点击
  const handleMenuClick = (type: '1' | '2') => {
    const route = type === '1' ? 'politics' : 'sports'
    navigate(`/news/${route}`)
  }

  return (
    <Row gutter={[24, 24]}>
      {/* 左侧导航 */}
      <Col xs={24} md={6} lg={5} xl={4}>
        <Card className="news-sidebar">
          <div className="sidebar-title">
            <Title level={2}>新闻资讯</Title>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[activeType]}
            className="news-categories"
          >
            <Menu.Item
              key="1"
              icon={<FlagOutlined />}
              className={`category-item ${activeType === '1' ? 'active' : ''}`}
              onClick={() => handleMenuClick('1')}
            >
              时政新闻
            </Menu.Item>

            <Menu.Item
              key="2"
              icon={<TrophyOutlined />}
              className={`category-item ${activeType === '2' ? 'active' : ''}`}
              onClick={() => handleMenuClick('2')}
            >
              热门赛事
            </Menu.Item>
          </Menu>
        </Card>
      </Col>

      {/* 右侧内容区 */}
      <Col xs={24} md={18} lg={19} xl={20}>
        <Card className="news-content">
          <BreadcrumbComponent
            items={[
              { label: '新闻资讯', path: '/news' },
              {
                label: activeType === '1' ? '时政新闻' : '热门赛事',
                isActive: true
              }
            ]}
          />

          {/* 页面标题 */}
          <div className="page-title">
            <Title level={3}>
              {activeType === '1' ? '时政新闻' : '热门赛事'}
            </Title>
            <Divider />
          </div>

          {/* 新闻列表 */}
          <div className="news-list">
            {filteredNews.map((news) => (
              <Link
                key={news.id}
                to={`/news/${activeType === '1' ? 'politics' : 'sports'}/${news.id}`}
              >
                <Card key={news.id} className="news-item" hoverable>
                  <Row gutter={[24, 0]}>
                    <Col xs={24} md={8} lg={7}>
                      <div className="news-image-container">
                        <img
                          src={news.cover}
                          alt={news.title}
                          className="news-image"
                        />
                      </div>
                    </Col>

                    <Col xs={24} md={16} lg={17}>
                      <div className="news-info">
                        <div className="news-header">
                          <Title level={4} className="news-title">
                            {news.title}
                          </Title>
                        </div>

                        <Paragraph
                          className="news-summary"
                          ellipsis={{ rows: 2 }}
                        >
                          {news.content}
                        </Paragraph>

                        <div className="news-meta">
                          <div className="news-date">
                            <ClockCircleOutlined />
                            <Text>{news.publishTime}</Text>
                          </div>
                          <a href={`#/news/${news.id}`} className="read-more">
                            阅读全文 <ArrowRightOutlined />
                          </a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Link>
            ))}
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default News
