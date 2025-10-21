import React from 'react'
import { Outlet } from 'react-router-dom'
import './index.scss'
import NavComponent from '@/components/NavComponent'
import { Input } from 'antd'
import type { GetProps } from 'antd'
import { Col, Divider, Row, Typography, Space } from 'antd'
import { MailFilled, EnvironmentFilled } from '@ant-design/icons'
const { Text, Link } = Typography
type SearchProps = GetProps<typeof Input.Search>
const { Search } = Input
const onSearch: SearchProps['onSearch'] = (value, _e, info) =>
  console.log(info?.source, value)

const { Title } = Typography

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="header-container">
        {/* logo + 搜索框 + 登录注册 */}
        <div className="header-top">
          <div className="logo">
            <img
              src="https://sport.hebei.gov.cn/templets/h5moban/ui/img/logo.png"
              alt="Logo"
            />
          </div>
          <div className="search-login">
            <div className="search">
              <Search placeholder="请输入搜索内容" onSearch={onSearch} />
            </div>
            <div className="login">
              <Space split={<Divider type="vertical" />}>
                <Typography.Link href="/login">登录</Typography.Link>
                <Typography.Link href="/register">注册</Typography.Link>
              </Space>
            </div>
          </div>
        </div>

        {/* 导航栏 */}
        <nav className="nav-bar">
          <NavComponent showAll={true} current="1" />
        </nav>
      </header>

      {/* 二级路由出口 */}
      <main>
        <div className="main-content">
          <Outlet />
        </div>
      </main>

      <footer>
        <div className="footer-container">
          <Row gutter={16}>
            {/* 联系我们 */}
            <Col span={7}>
              <div className="contact-bg">
                <Title level={3} style={{ color: 'white' }}>
                  联系我们
                </Title>

                <div className="contact">
                  <MailFilled style={{ marginRight: 8, fontSize: 20 }} />
                  <div className="contact-info">
                    <Text>邮箱： js365@sport.gov.cn</Text>
                  </div>
                </div>

                <div className="contact">
                  <EnvironmentFilled style={{ marginRight: 8, fontSize: 20 }} />
                  <div className="contact-info">
                    <Text>地址： 河北省石家庄市中山东路372号</Text>
                  </div>
                </div>
              </div>
            </Col>
            {/* 二维码 */}
            <Col span={4}>
              <div
                className="contact-bg"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <p>河北省全民健身平台</p>

                <img
                  src="https://js365.org.cn/static/img/gzh-code.25b26208.jpg"
                  alt="二维码"
                  width={90}
                />

                <p>河北省全民健身平台</p>
              </div>
            </Col>
            {/* 相关链接 */}
            <Col xs={24} sm={24} md={8} lg={13}>
              <div className="links-container">
                <Title level={3} style={{ color: 'white', marginBottom: 16 }}>
                  相关链接
                </Title>
                <div className="links-grid">
                  {[
                    '国家体育总局',
                    '河北省体育局',
                    '全民健身公共服务平台',
                    '体育赛事信息网',
                    '运动员注册系统',
                    '体育场馆预约',
                    '体育政策法规',
                    '体育人才招聘',
                    '体育科研资讯'
                  ].map((text, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="custom-link"
                      target="_blank"
                    >
                      {text}
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          {/* </div> */}
          <Divider orientation="left"></Divider>
          {/* 版权标注 */}
          <Row style={{ textAlign: 'center' }}>
            <Col span={12} offset={6}>
              河北省全民健身平台
              <br />
              冀ICP备20014800号-2 冀公网安备13010202002305号
            </Col>
          </Row>
          {/* </div> */}
        </div>
      </footer>
    </div>
  )
}

export default Layout
