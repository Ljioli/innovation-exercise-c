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

// 定义新闻数据类型 
interface NewsItem {
  id: number
  title: string
  content: string
  publishTime: string
  cover: string
  type: '1' | '2'
}

const News: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 根据当前路由设置默认分类
  const getDefaultType = (): '1' | '2' => {
    if (location.pathname.includes('sports')) {
      return '2' // 热门赛事
    }
    return '1' // 时政新闻
  }

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
      cover: 'https://www.gov.cn/yaowen/liebiao/202411/W020241117249768158161_ORIGIN.jpg',
      type: '1'
    },
    {
      id: 2,
      title: '全国人大常委会审议多项重要法律草案',
      content:
        '本次常委会会议审议了环境保护法修订草案、数字经济促进法草案等多项重要法律案，回应社会关切。',
      publishTime: '2025-09-03',
      cover: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.Qn0Gz06jpI5aJNN8EOOzYAHaEK?w=269&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3',
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
      id: 6,
      title: '第十五届全运会群众比赛象棋项目决赛鸣金收兵',
      content:
        '9月5日至12日，中华人民共和国第十五届运动会群众比赛象棋项目决赛在广东省深圳市罗湖区举行',
      publishTime: '2025-09-14',
      cover: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.5t55d8ZGeszG4d8OEnG2jAHaFC?w=239&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3',
      type: '2'
    },
    {
      id: 5,
      title: '2025年河北省第二届体育行业职业技能竞赛社会体育指导（健身）开赛',
      content:
        '9月20日，2025年河北省第二届体育行业职业技能竞赛社会体育指导（健身）在石家庄市万拓体育恒大华府运动中心正式开赛。',
      publishTime: '2025-09-22',
      cover: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.ojdGvfytBn8JRAjRV1YPYgHaE8?w=261&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3',
      type: '2'
    },
    {
      id: 7,
      title: '雄东片区全民健身志愿服务启动 居民解锁科学健身“新姿势”',
      content:
        '近日，雄安新区雄东片区B单元观香园气氛热烈，由新区宣传网信局主办，容东管理委员会、容西管理委员会',
      publishTime: '2025-09-01',
      cover: 'https://picsum.photos/id/1060/600/400',
      type: '2'
    },
    {
      id: 8,
      title: '河北省第三届村BA总决赛在承德丰宁圆满收官',
      content:
        '8月29日，2025年“冀农乐”第三届和美乡村“和顺杯”篮球赛（村BA）总决赛在丰宁满族自治县北园子村圆满收官。',
      publishTime: '2025-08-28',
      cover: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.k2PjdIFLemJSoRZfaUumLAHaE7?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
      type: '2'
    }
  ]

  // 筛选新闻
  const filteredNews = newsData
    .filter((item) => item.type === activeType)
    // 按日期倒序
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
    <Row gutter={[0, 24]}>
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

      <Col xs={24} md={18} lg={19} xl={20}>
        <Card className="news-content">
          <BreadcrumbComponent
            items={[
              { label: '新闻资讯', clickable: false },
              {
                label: activeType === '1' ? '时政新闻' : '热门赛事',
                isActive: true
              }
            ]}
          />

          <div className="page-title">
            <Title level={3}>
              {activeType === '1' ? '时政新闻' : '热门赛事'}
            </Title>
            <Divider />
          </div>

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
