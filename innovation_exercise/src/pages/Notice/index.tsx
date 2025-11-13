import React, { useState, useEffect, useMemo } from 'react'
import { Breadcrumb, Menu, List, Typography, Pagination, Input } from 'antd'
import { HomeOutlined, FileTextOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import BreadcrumbComponent from '@/components/BreadcrumbComponent'
import './index.scss'

// 定义通知公告数据类型
interface NoticeItem {
  id: number
  title: string
  publishTime: string
}

const { Title } = Typography
const { Search } = Input

const Notice: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  // 状态管理
  const [activeKey, setActiveKey] = useState<'3' | '4'>('3')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const PAGE_SIZE = 8  // 每页显示5条

  // 模拟政策法规数据
  const policyData: NoticeItem[] = [
    { id: 1, title: '河北省全民健身条例实施细则', publishTime: '2025-09-03' },
    { id: 2, title: '河北省体育设施建设管理办法', publishTime: '2025-08-25' },
    {
      id: 3,
      title: '河北省体育产业发展专项资金管理办法',
      publishTime: '2025-08-18'
    },
    { id: 4, title: '河北省运动员选拔与培养条例', publishTime: '2025-08-10' },
    { id: 5, title: '河北省体育赛事活动管理规定', publishTime: '2025-07-28' },
    { id: 6, title: '河北省社会体育指导员管理办法', publishTime: '2025-07-15' },
    {
      id: 7,
      title: '河北省公共体育设施向社会开放实施细则',
      publishTime: '2025-07-05'
    },
    {
      id: 8,
      title: '河北省体育类民办非企业单位登记管理办法',
      publishTime: '2025-06-28'
    },
    {
      id: 9,
      title: '河北省体育彩票公益金使用管理办法',
      publishTime: '2025-06-18'
    },
    { id: 10, title: '河北省青少年体育训练大纲', publishTime: '2025-06-10' }
  ]

  // 模拟通知公告数据
  const noticeData: NoticeItem[] = [
    {
      id: 1,
      title: '关于举办2025年河北省青少年体育夏令营的通知',
      publishTime: '2025-09-05'
    },
    {
      id: 2,
      title: '河北省体育局关于开展体育场地统计调查的通知',
      publishTime: '2025-09-01'
    },
    {
      id: 3,
      title: '关于组织参加全国体育行业职业技能大赛的通知',
      publishTime: '2025-08-28'
    },
    {
      id: 4,
      title: '河北省全民健身设施建设补助资金申报指南',
      publishTime: '2025-08-20'
    },
    {
      id: 5,
      title: '关于开展2025年度体育类民办非企业单位年检工作的通知',
      publishTime: '2025-08-15'
    },
    {
      id: 6,
      title: '河北省体育局关于加强体育赛事活动安全管理的通知',
      publishTime: '2025-08-10'
    },
    {
      id: 7,
      title: '关于举办河北省社会体育指导员技能大赛的通知',
      publishTime: '2025-08-05'
    },
    {
      id: 8,
      title: '河北省体育产业发展专项资金申报通知',
      publishTime: '2025-07-30'
    },
    {
      id: 9,
      title: '关于做好2025年下半年体育彩票销售工作的通知',
      publishTime: '2025-07-25'
    },
    {
      id: 10,
      title: '河北省体育局关于开展体育系统安全生产检查的通知',
      publishTime: '2025-07-20'
    }
  ]

  useEffect(() => {
    // 页面加载时根据路由设置激活项并重置搜索
    if (location.pathname.includes('policy')) {
      setActiveKey('3')
    } else if (location.pathname.includes('inform')) {
      setActiveKey('4')
    }
    setSearchText('')
    setCurrentPage(1)
  }, [location.pathname])

  // 获取当前类型的所有数据
  const getAllData = () => {
    return activeKey === '3' ? policyData : noticeData
  }

  // 根据搜索文本过滤数据
  const filteredData = useMemo(() => {
    const data = getAllData()
    if (!searchText.trim()) return data
    
    return data.filter(item => 
      item.title.toLowerCase().includes(searchText.toLowerCase().trim())
    )
  }, [getAllData(), searchText])

  // 处理分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredData, currentPage])

  // 导航项点击处理
  const handleMenuClick = (e: { key: string }) => {
    const key = e.key as '3' | '4'
    setActiveKey(key)
    setCurrentPage(1)
    setSearchText('')
    
    const route = key === '3' ? 'policy' : 'inform'
    navigate(`/government/${route}`)
  }

  // 分页变化处理
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearchText(value)
    setCurrentPage(1) // 搜索时重置到第一页
  }

  return (
    <div className="government-container">
      <header className="header">
        <div className="container">
          <div className="breadcrumb-container">
            <BreadcrumbComponent
              items={[
                { label: '政务公开', clickable: false },
                {
                  label: activeKey === '3' ? '政策法规' : '通知公告',
                  isActive: true
                }
              ]}
            />
          </div>
        </div>
      </header>

      <div className="content-wrapper">
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
            <Menu.Item key="4" icon={<BellOutlined className="menu-icon" />}>
              通知公告
            </Menu.Item>
          </Menu>
        </aside>

        <div className="content-area">
          <div className="title-section">
            <div className="title-bar">
              <Title level={2} className="content-title">
                {activeKey === '3' ? (
                  <>
                    <FileTextOutlined className="title-icon" /> 政策法规
                  </>
                ) : (
                  <>
                    <BellOutlined className="title-icon" /> 通知公告
                  </>
                )}
              </Title>
              
              <div className="search-container">
                <Search
                  placeholder="搜索标题..."
                  allowClear
                  enterButton={<SearchOutlined />}
                  size="middle"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onSearch={handleSearch}
                />
              </div>
            </div>
          </div>

          <List
            className="notice-list"
            dataSource={paginatedData}
            renderItem={(item) => (
              <List.Item className="notice-item">
                <Link
                  to={`/government/${activeKey === '3' ? 'policy' : 'inform'}/${item.id}`}
                  className="notice-link"
                >
                  {item.title}
                </Link>
                <span className="notice-publishTime">{item.publishTime}</span>
              </List.Item>
            )}
            locale={{ emptyText: '没有找到匹配的内容' }}
          />

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={PAGE_SIZE}
              onChange={handlePageChange}
              showSizeChanger={false}
              showQuickJumper={false}
              showTotal={(total) => `共 ${total} 条`}
              className="pagination"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice