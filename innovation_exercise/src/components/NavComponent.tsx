import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]
type NavComponentProps = {
  showAll?: boolean // 是否显示全部菜单
  current?: string // 默认选中的菜单项key
}

const allItems: MenuItem[] = [
  {
    label: <Link to="/">首页</Link>,
    key: '1'
  },
  {
    label: '新闻资讯',
    key: '2',
    children: [
      {
        label: <Link to="/news/politics">时政新闻</Link>,
        key: '2-1'
      },
      {
        label: <Link to="/news/sports">热门赛事</Link>,
        key: '2-2'
      }
    ]
  },
  {
    label: '政务公开',
    key: '3',
    children: [
      {
        label: <Link to="/government/policy">政策法规</Link>,
        key: '3-1'
      },
      {
        label: <Link to="/government/inform">通知公告</Link>,
        key: '3-2'
      }
    ]
  },
  {
    label: '健身资源',
    key: '4',
    children: [
      {
        label: (
          <Link
            to="http://127.0.0.1:5500/src/pages/Resource/VenueMap.html"
            target="_blank"
          >
            15分钟健身圈
          </Link>
        ),
        key: '4-1'
      },
      {
        label: <Link to="/resource/venue-open">场馆开放</Link>,
        key: '4-2'
      },
      {
        label: (
          <Link
            to="/resource/score-visualization"
            target="_blank"
          >
            均衡性与可及性评分可视化平台
          </Link>
        ),
        key: '4-3'
      }
    ]
  },
  // {
  //   label: <Link to="/community"> 健身社区</Link>,
  //   key: '5'
  // },
  {
    label: '问答咨询',
    key: '5',
    children: [
      {
        label: <Link to="/qa/intelligentQA"> 智能问答</Link>,
        key: '5-1'
      },
      {
        label: <Link to="/qa/problemFeedback"> 问题反馈</Link>,
        key: '5-2'
      },
    ]
  },
    {
    label: <Link to="/knowledge-graph"> 知识图谱</Link>,
    key: '6'
  },
  {
    label: <Link to="/user"> 个人中心</Link>,
    key: '7'
  }
]

const NavComponent: React.FC<NavComponentProps> = ({ showAll = false }) => {
  const location = useLocation() // 获取当前路由信息
  const [menuItems, setMenuItems] = useState<MenuItem[]>(allItems)

  const getCurrentKey = () => {
    switch (location.pathname) {
      case '/':
        return '1'
      case '/news/politics':
        return '2-1'
      case '/news/sports':
        return '2-2'
      case '/government/policy':
        return '3-1'
      case '/government/inform':
        return '3-2'
      case '/resource/venue-open':
        return '4-2'
      case '/resource/score-visualization':
        return '4-3'
      case '/qa/intelligentQA':
        return '5-1'
      case '/qa/problemFeedback':
        return '5-2'
      case '/knowledge-graph':
        return '6'
      case '/user':
        return '7'
      default:
        return 'mail'
    }
  }

  useEffect(() => {
    if (showAll) {
      setMenuItems(allItems)
    } else {
      const filteredItems = allItems.filter(
        (item) => item && item.key !== '7'
      )
      setMenuItems(filteredItems)
    }
  }, [showAll])

  return (
    <div className="login-menu">
      <Menu
        selectedKeys={[getCurrentKey()]}
        mode="horizontal"
        items={menuItems}
        className="login-menu"
      />
    </div>
  )
}

export default NavComponent
