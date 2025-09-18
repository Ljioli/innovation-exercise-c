import React, { useState } from 'react'
import './login.scss'
import type { MenuProps } from 'antd'
import { Form, Input, Button, Typography, Checkbox, Flex, Menu } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { Title } = Typography

type MenuItem = Required<MenuProps>['items'][number]

const onFinish = (values: any) => {
  console.log('Received values of form: ', values)
}

const items: MenuItem[] = [
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
        label: '15分钟健身圈',
        key: '4-1'
      },
      {
        label: <Link to="/resource/venue-open">场馆开放</Link>,
        key: '4-2'
      }
    ]
  }
]

const Login: React.FC = () => {
  const [current, setCurrent] = useState('mail')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <div className="login-container">
      <div className="login-bg">
        <div>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            className="login-menu"
          />
        </div>
        <div className="login-form">
          <Title level={2}>河北省全民健身服务平台</Title>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <a href="">忘记密码？</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
              或者 <a href="/register">注册账号</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Login
