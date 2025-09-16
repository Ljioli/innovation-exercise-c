import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Typography } from 'antd'
import './newsDetail.scss'
import BreadcrumbComponent from '@/components/BreadcrumbComponent'
const { Title } = Typography

// 新闻数据接口定义
interface NewsItem {
  id: string
  title: string
  content: string[]
  source: string
  publishTime: string
  images: string[]
  type: '1' | '2'
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [activeKey, setActiveKey] = useState<'1' | '2'>('1')
  const [prevNews, setPrevNews] = useState<NewsItem | null>(null)
  const [nextNews, setNextNews] = useState<NewsItem | null>(null)

  // 模拟新闻数据
  const mockNewsData: NewsItem[] = [
    // 时政新闻 (type: '1')
    {
      id: '1',
      title: '国家领导人出席亚太经合组织领导人非正式会议',
      content: ['内容...'],
      source: '新华社',
      publishTime: '2025-09-05 09:30',
      images: [],
      type: '1'
    },
    {
      id: '2',
      title: '全国人大常委会审议多项重要法律草案',
      content: ['内容...'],
      source: '人民日报',
      publishTime: '2025-09-03 10:15',
      images: [],
      type: '1'
    },
    {
      id: '3',
      title: '我国经济运行延续回升向好态势',
      content: ['内容...'],
      source: '经济日报',
      publishTime: '2025-09-01 08:45',
      images: [],
      type: '1'
    },
    {
      id: '4',
      title: '新一批国家公园正式设立',
      content: ['内容...'],
      source: '央视新闻',
      publishTime: '2025-08-29 14:20',
      images: [],
      type: '1'
    },
    // 热门赛事 (type: '2')
    {
      id: '5',
      title: '世界杯预选赛亚洲区：中国队战胜韩国队',
      content: ['内容...'],
      source: '体育周报',
      publishTime: '2025-09-04 19:30',
      images: [],
      type: '2'
    },
    {
      id: '6',
      title: '全运会田径比赛多项纪录被打破',
      content: ['内容...'],
      source: '体育日报',
      publishTime: '2025-09-02 16:45',
      images: [],
      type: '2'
    },
    {
      id: '7',
      title: '国际乒联世锦赛：中国乒乓球队斩获五金',
      content: ['内容...'],
      source: '乒乓世界',
      publishTime: '2025-08-30 21:15',
      images: [],
      type: '2'
    },
    {
      id: '8',
      title: '奥运会倒计时一周年活动举行',
      content: ['内容...'],
      source: '奥运频道',
      publishTime: '2025-08-28 18:00',
      images: [],
      type: '2'
    }
  ]
  // 模拟获取新闻详情数据
  useEffect(() => {
    const fetchNewsDetail = async () => {
      if (!id) return

      // 查找当前新闻
      const currentNews = mockNewsData.find((item) => item.id === id)
      if (!currentNews) return

      setNews(currentNews)
      setActiveKey(currentNews.type)

      // 获取同类型的新闻列表（按发布时间倒序）
      const sameTypeNews = mockNewsData
        .filter((item) => item.type === currentNews.type)
        .sort(
          (a, b) =>
            new Date(b.publishTime).getTime() -
            new Date(a.publishTime).getTime()
        )

      // 查找当前新闻在列表中的索引
      const currentIndex = sameTypeNews.findIndex((item) => item.id === id)

      // 设置上一篇和下一篇
      if (currentIndex > 0) {
        setPrevNews(sameTypeNews[currentIndex - 1])
      } else {
        setPrevNews(null)
      }

      if (currentIndex < sameTypeNews.length - 1) {
        setNextNews(sameTypeNews[currentIndex + 1])
      } else {
        setNextNews(null)
      }

      // 模拟新闻详情内容
      const mockDetail: NewsItem = {
        ...currentNews,
        content: [
          '近年来，人工智能技术在医疗健康领域的应用取得了显著进展，为疾病诊断、治疗方案制定和患者护理带来了革命性变化。',
          '最新研究表明，AI辅助诊断系统在某些疾病的早期检测中准确率已经超过了传统方法。特别是在影像诊断方面，AI系统能够识别出人类医生可能忽略的细微病变。',
          '在药物研发领域，人工智能算法能够加速化合物筛选过程，显著缩短新药研发周期并降低成本。多家制药公司已开始大规模采用AI技术，预计未来几年将有更多AI辅助研发的新药问世。',
          '此外，AI驱动的个性化医疗方案也成为研究热点。通过分析患者的基因数据、生活习惯和病史，AI系统能够为每位患者量身定制治疗方案，提高治疗效果并减少副作用。'
        ],
        images: [
          'https://p9-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/fa792a814093435cbca068572011a2a0.png~tplv-a9rns2rl98-24:720:720.png',
          'https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/db2727f9969c401c9951dbb08f533ddc.png~tplv-a9rns2rl98-24:720:720.png'
        ]
      }

      setNews(mockDetail)
    }

    fetchNewsDetail()
  }, [id])

  // 处理返回按钮点击
  const handleBack = () => {
    navigate(-1)
  }

  if (!news) {
    return (
      <div className="news-detail-error">
        <p>抱歉，未找到该新闻</p>
        <button onClick={handleBack} className="back-button">
          返回
        </button>
      </div>
    )
  }

  return (
    <div className="news-detail-bg">
      <BreadcrumbComponent
        items={[
          { label: '新闻资讯', clickable: false },
          {
            label: activeKey === '1' ? '时政新闻' : '热门赛事',
            path: `/news/${activeKey === '1' ? 'politics' : 'sports'}`
          },
          { label: '正文', isActive: true }
        ]}
      />
      <div className="news-detail-container">
        <Title level={2} className="news-detail-title">
          {news.title}
        </Title>

        <div className="news-metadata">
          <span className="news-source">来源：{news.source}</span>
          <span>发布时间：{news.publishTime}</span>
        </div>

        {/* 新闻内容 */}
        <div>
          {news.content.map((paragraph, index) => (
            <p key={index} className="news-paragraph">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 上一篇下一篇导航 */}
        <div className="news-navigation">
          {prevNews && (
            <div className="nav-item">
              <span className="nav-label">上一篇：</span>
              <Link
                to={`/news/${activeKey === '1' ? 'politics' : 'sports'}/${prevNews.id}`}
                className="nav-link"
              >
                {prevNews.title}
              </Link>
            </div>
          )}

          {nextNews && (
            <div className="nav-item">
              <span className="nav-label">下一篇：</span>
              <Link
                to={`/news/${activeKey === '1' ? 'politics' : 'sports'}/${nextNews.id}`}
                className="nav-link"
              >
                {nextNews.title}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
