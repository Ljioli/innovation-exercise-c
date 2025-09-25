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
    <div className="login-container">
      <div className="login-bg">
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
                    src="data:image/gif;base64,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"
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
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  noStyle
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.reject(new Error('请同意用户注册协议'))
                        }
                        return Promise.resolve()
                      }
                    }
                  ]}
                >
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
