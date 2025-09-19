import React from 'react'
import './register.scss'
import NavComponent from '@/components/NavComponent'
import {
  Typography,
  Form,
  Input,
  message,
  Checkbox,
  Flex,
  Button,
  Row,
  Col
} from 'antd'

import { useNavigate } from 'react-router-dom'
const { Title, Text, Link } = Typography

interface RegisterFormValues {
  phone?: string
  captcha?: string
  smsCode?: string
  password?: string
  confirmPassword?: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<RegisterFormValues>()

  const onFinish = (values: RegisterFormValues) => {
    console.log('注册表单数据:', values)
    message.success('注册成功')
    navigate('/login')
  }

  return (
    <div className="container">
      <div className="bg">
        <span className="title">河北省全民健身服务平台</span>
        <NavComponent />
        <div className="form">
          <Title level={2}>注册</Title>
          <Form form={form} name="register" onFinish={onFinish}>
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: '请输入手机号！' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效手机号' }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>

            <Form.Item>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: '请输入图片验证码！'
                      }
                    ]}
                  >
                    <Input placeholder="请输入图片验证码" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <img
                    src="https://picsum.photos/200/300"
                    alt=""
                    width={100}
                    height={45}
                  />
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="smsCode"
                    noStyle
                    rules={[
                      {
                        required: true,
                        message: '请输入短信验证码！'
                      }
                    ]}
                  >
                    <Input placeholder="请输入短信验证码" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button>获取验证码</Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input placeholder="请输入密码" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: '请再次输入密码！' }]}
            >
              <Input placeholder="请再次输入密码" />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>
                    我已阅读并同意
                    <a href="#">《河北省全民健身服务平台用户注册协议》</a>
                  </Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link onClick={() => navigate('/login')}>已有账号？立即登录</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Register
