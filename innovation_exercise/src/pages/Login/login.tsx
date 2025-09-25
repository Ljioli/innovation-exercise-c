import React, { useState } from 'react'
import './login.scss'
import NavComponent from '@/components/NavComponent'
import {
  Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Flex,
  Menu,
  message
} from 'antd'
import { LockOutlined, PhoneOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Title, Link } = Typography

interface LoginFormValues {
  phone?: string
  password?: string
  remember?: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<LoginFormValues>()

  const onFinish = (values: LoginFormValues) => {
    console.log('登录表单数据:', values)
    message.success('登录成功')
    navigate('/')
  }
  return (
    <div className="login-container">
      <div className="login-bg">
        <span className="title">河北省全民健身服务平台</span>
        <NavComponent />

        <div className="form">
          <Title level={2}>登录</Title>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '请输入手机号！' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码！' },
                { min: 6, message: '密码长度至少 6 位' }
              ]}
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
              或者 <Link href="/register">注册账号</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Login
