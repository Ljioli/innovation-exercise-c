import React, { useEffect, useState } from 'react'
import { Breadcrumb, Menu, Typography } from 'antd'
import {
  HomeOutlined,
  FileTextOutlined,
  BellOutlined,
  CalendarOutlined,
} from '@ant-design/icons'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import './noticeDetail.scss'

// 定义通知详情数据类型
interface NoticeDetailItem extends NoticeItem {
  content: string
  source: string
}

interface NoticeItem {
  id: number
  title: string
  publishTime: string
}

const { Title, Paragraph } = Typography

const NoticeDetail: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()

  // 从路径中提取类型信息
  const getTypeFromPath = (): 'policy' | 'inform' => {
    if (location.pathname.includes('/policy/')) {
      return 'policy'
    } else if (location.pathname.includes('/inform/')) {
      return 'inform'
    }
    // 默认值
    return 'policy'
  }

  const [activeKey, setActiveKey] = useState<'3' | '4'>('3')
  const [noticeDetail, setNoticeDetail] = useState<NoticeDetailItem | null>(null)

  // 政策和通知标题数据
  const policyTitles = [
    { id: 1, title: '安徽省全民健身条例实施细则' },
    { id: 2, title: '安徽省体育设施建设管理办法' },
    { id: 3, title: '安徽省体育产业发展专项资金管理办法' },
    { id: 4, title: '安徽省运动员选拔与培养条例' },
    { id: 5, title: '安徽省体育赛事活动管理规定' },
    { id: 6, title: '安徽省社会体育指导员管理办法' },
    { id: 7, title: '安徽省公共体育设施向社会开放实施细则' },
    { id: 8, title: '安徽省体育类民办非企业单位登记管理办法' },
    { id: 9, title: '安徽省体育彩票公益金使用管理办法' },
    { id: 10, title: '安徽省青少年体育训练大纲' }
  ];

  const noticeTitles = [
    { id: 1, title: '关于举办2025年安徽省青少年体育夏令营的通知' },
    { id: 2, title: '安徽省体育局关于开展体育场地统计调查的通知' },
    { id: 3, title: '关于组织参加全国体育行业职业技能大赛的通知' },
    { id: 4, title: '安徽省全民健身设施建设补助资金申报指南' },
    { id: 5, title: '关于开展2025年度体育类民办非企业单位年检工作的通知' },
    { id: 6, title: '安徽省体育局关于加强体育赛事活动安全管理的通知' },
    { id: 7, title: '关于举办安徽省社会体育指导员技能大赛的通知' },
    { id: 8, title: '安徽省体育产业发展专项资金申报通知' },
    { id: 9, title: '关于做好2025年下半年体育彩票销售工作的通知' },
    { id: 10, title: '安徽省体育局关于开展体育系统安全生产检查的通知' }
  ];

  // 模拟详情内容生成
  const generateMockContent = (title: string) => `
    ${title}是为了规范相关体育活动，促进体育事业发展而制定的重要文件。

    各地区、各单位要高度重视，认真组织学习和贯彻落实本文件精神，确保各项要求落到实处。

    一、充分认识文件的重要性
    各级体育主管部门要加强领导，精心部署，把贯彻落实工作作为当前的一项重要任务来抓，切实提高思想认识，增强责任感和使命感。

    二、明确工作责任
    建立健全工作责任制，明确责任分工，确保各项工作有人抓、有人管、有人负责。要加强协调配合，形成工作合力，共同推进相关工作开展。

    三、加强监督检查
    要定期对贯彻落实情况进行监督检查，及时发现和解决工作中存在的问题。对工作不力、落实不到位的单位和个人，要进行通报批评，并督促整改。

    请各单位于2025年10月底前将贯彻落实情况报送省体育局。
  `

  // 初始化数据
  useEffect(() => {
    const currentType = getTypeFromPath()
    
    // 根据类型确定激活的导航项
    if (currentType === 'policy') {
      setActiveKey('3')
    } else if (currentType === 'inform') {
      setActiveKey('4')
    }

    // 模拟API请求获取详情数据
    setTimeout(() => {
      if (!id) return;
      
      const numericId = parseInt(id, 10);
      const isPolicy = currentType === 'policy';
      
      // 根据ID查找对应的标题
      const titleItem = isPolicy
        ? policyTitles.find(item => item.id === numericId)
        : noticeTitles.find(item => item.id === numericId);
      
      const title = titleItem?.title || `${isPolicy ? '政策法规' : '通知公告'}文件（第${id}号）`;

      // 发布时间数组
      const policyDates = [
        '2025-09-03', '2025-08-25', '2025-08-18', '2025-08-10', '2025-07-28', 
        '2025-07-15', '2025-07-05', '2025-06-28', '2025-06-18', '2025-06-10'
      ];
      
      const noticeDates = [
        '2025-09-05', '2025-09-01', '2025-08-28', '2025-08-20', '2025-08-15', 
        '2025-08-10', '2025-08-05', '2025-07-30', '2025-07-25', '2025-07-20'
      ];

      const mockDetail: NoticeDetailItem = {
        id: numericId,
        title,
        publishTime: isPolicy 
          ? policyDates[numericId - 1] || new Date().toISOString().split('T')[0]
          : noticeDates[numericId - 1] || new Date().toISOString().split('T')[0],
        source: '安徽省体育局官网',
        content: generateMockContent(title)
      }
      
      setNoticeDetail(mockDetail)
    }, 300)
  }, [location.pathname, id])

  // 获取页面标题
  const getPageTitle = () => {
    return activeKey === '3' ? '政策法规' : '通知公告'
  }

  // 导航菜单点击处理
  const handleMenuClick = (e: { key: string }) => {
    const key = e.key as '3' | '4'
    setActiveKey(key)
    navigate(`/government/${key === '3' ? 'policy' : 'inform'}`)
  }

  if (!noticeDetail) {
    return <div className="loading">加载中...</div>
  }

  return (
    <div>
      {/* 顶部导航栏 */}
      <header className="header">
        <div className="container">
          <div className="breadcrumb-container">
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <Link to="/">
                  <HomeOutlined className="home-icon" />
                  首页
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>政务公开</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to={`/government/${activeKey === '3' ? 'policy' : 'inform'}`}
                >
                  {getPageTitle()}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="active-breadcrumb">
                正文
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <div className="content-wrapper">
        {/* 左侧导航 */}
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon"></div>
            <h1 className="brand-name">政务公开</h1>
          </div>

          <Menu
            className="nav-menu"
            selectedKeys={[activeKey]}
            mode="inline"
            onClick={handleMenuClick}
          >
            <Menu.Item
              key="3"
              icon={<FileTextOutlined className="menu-icon" />}
            >
              政策法规
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<BellOutlined className="menu-icon" />}
            >
              通知公告
            </Menu.Item>
          </Menu>
        </aside>

        {/* 右侧内容区 - 详情内容 */}
        <div className="content-area">
          {/* 标题区域 */}
          <div className="title-section">
            <Title level={2} className="detail-title">
              {noticeDetail.title}
            </Title>
            <div className="detail-meta">
              <div className="meta-item">
                <CalendarOutlined className="meta-icon" />
                <span>发布时间：{noticeDetail.publishTime}</span>
              </div>
              <div className="meta-item">
                <span>来源：{noticeDetail.source}</span>
              </div>
            </div>
          </div>

          {/* 文章内容 */}
          <div className="detail-content">
            {noticeDetail.content
              .split('\n')
              .map((paragraph, index) =>
                paragraph.trim() ? (
                  <Paragraph key={index}>{paragraph}</Paragraph>
                ) : null
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeDetail