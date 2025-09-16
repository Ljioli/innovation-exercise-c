import React, { useState, useEffect } from 'react'
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  SaveOutlined,
  RollbackOutlined,
  HeartOutlined,
  LineChartOutlined,
  TrophyOutlined,
  FireOutlined,
  DashboardOutlined,
  ManOutlined,
  WomanOutlined
} from '@ant-design/icons'
import {
  Card,
  Avatar,
  Descriptions,
  Tabs,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  message,
  Divider,
  Statistic,
  Row,
  Col,
  Progress,
  Tag
} from 'antd'
import './index.scss'

// 定义用户信息类型接口
interface UserInfo {
  userId?: string
  nickname: string
  phone: string
  address: string
  registerTime?: string
  loginTime?: string
  status?: string
  sex?: string
  age?: number
  avatar?: string
  height?: string
  weight?: string
  bmi?: string
  bodyType?: string
  idealWeight?: string
  fitnessHobby?: string
}

// 健身数据接口
interface FitnessData {
  weeklyExercise: number // 本周运动次数
  monthlyGoal: number // 月度目标
  monthlyCompleted: number // 已完成
  continuousDays: number // 连续运动天数
  caloriesBurned: number // 本周消耗卡路里
  workoutTime: number // 本周运动时长(分钟)
}

const { TabPane } = Tabs

const User: React.FC = () => {
  // 用户信息状态
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nickname: '',
    phone: '',
    address: ''
  })

  // 健身数据状态
  const [fitnessData, setFitnessData] = useState<FitnessData>({
    weeklyExercise: 3,
    monthlyGoal: 20,
    monthlyCompleted: 12,
    continuousDays: 5,
    caloriesBurned: 2450,
    workoutTime: 320
  })

  // 编辑状态管理
  const [editing, setEditing] = useState(false)
  const [form] = Form.useForm()

  // 模拟获取用户信息
  useEffect(() => {
    // 实际项目中这里会是API请求
    const mockUserInfo: UserInfo = {
      userId: '2000553335',
      nickname: '健身达人',
      phone: '13800000000',
      address: '河北省石家庄市裕华区',
      loginTime: '2023-10-15 08:30:00',
      registerTime: '2023-05-03',
      status: '0',
      sex: '1', // 1-男 0-女
      age: 30,
      avatar:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      height: '178cm',
      weight: '70kg',
      bmi: '22.1',
      bodyType: '标准体型',
      idealWeight: '68kg',
      fitnessHobby: '跑步、游泳、羽毛球'
    }

    setUserInfo(mockUserInfo)
    form.setFieldsValue(mockUserInfo)
  }, [form])

  // 处理编辑切换
  const handleEdit = () => {
    setEditing(true)
  }

  // 处理保存编辑
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      setUserInfo(values)
      setEditing(false)
      message.success('个人信息更新成功')
    } catch (error) {
      message.error('信息验证失败，请检查输入')
    }
  }

  // 取消编辑
  const handleCancel = () => {
    form.setFieldsValue(userInfo)
    setEditing(false)
  }

  // 计算月度目标完成率
  const monthlyRate = Math.round(
    (fitnessData.monthlyCompleted / fitnessData.monthlyGoal) * 100
  )

  return (
    <div className="personal-center-container">
      <div className="personal-content">
        {/* 个人信息卡片 */}
        <Card className="user-info-card">
          <div className="user-basic-info">
            <div className="avatar-section">
              <Avatar
                src={userInfo.avatar}
                size={110}
                className="user-avatar"
              />
            </div>

            <div className="user-main-info">
              <div className="user-name-section">
                <h2 className="user-nickname">
                  {userInfo.nickname}
                  {userInfo.sex === '0' ? (
                    <WomanOutlined className="gender-icon female" />
                  ) : (
                    <ManOutlined className="gender-icon male" />
                  )}
                </h2>
              </div>

              <div className="user-basic-details">
                <p>
                  <UserOutlined /> 年龄：{userInfo.age || 0}岁
                </p>
                <p>
                  <PhoneOutlined /> 手机号：{userInfo.phone || '未填写'}
                </p>
                <p>
                  <HomeOutlined /> 地址：{userInfo.address || '未填写'}
                </p>
              </div>

              {!editing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  className="edit-btn"
                >
                  编辑信息
                </Button>
              ) : (
                <div className="edit-actions">
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                    className="save-btn"
                  >
                    保存
                  </Button>
                  <Button
                    icon={<RollbackOutlined />}
                    onClick={handleCancel}
                    className="cancel-btn"
                  >
                    取消
                  </Button>
                </div>
              )}
            </div>

            <div className="fitness-stats-overview">
              <div className="stat-item">
                <div className="stat-value">{fitnessData.weeklyExercise}</div>
                <div className="stat-label">本周运动</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{fitnessData.caloriesBurned}</div>
                <div className="stat-label">卡路里</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{fitnessData.workoutTime}</div>
                <div className="stat-label">运动分钟</div>
              </div>
            </div>
          </div>
        </Card>

        {/* 内容标签页 */}
        <Tabs defaultActiveKey="fitness" className="content-tabs">
          {/* 健身数据标签 */}
          <TabPane
            tab={
              <span>
                <DashboardOutlined />
                健身数据
              </span>
            }
            key="fitness"
          >
            <Card className="fitness-card">
              <Row gutter={16} className="fitness-stats">
                <Col xs={12} md={6}>
                  <Card className="stat-card">
                    <Statistic
                      title="本周运动"
                      value={fitnessData.weeklyExercise}
                      suffix="次"
                      prefix={<CalendarOutlined className="stat-icon" />}
                    />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card className="stat-card">
                    <Statistic
                      title="连续运动"
                      value={fitnessData.continuousDays}
                      suffix="天"
                      prefix={<HeartOutlined className="stat-icon" />}
                    />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card className="stat-card">
                    <Statistic
                      title="消耗卡路里"
                      value={fitnessData.caloriesBurned}
                      suffix="kcal"
                      prefix={<FireOutlined className="stat-icon" />}
                    />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card className="stat-card">
                    <Statistic
                      title="运动时长"
                      value={fitnessData.workoutTime}
                      suffix="分钟"
                      prefix={<ClockCircleOutlined className="stat-icon" />}
                    />
                  </Card>
                </Col>
              </Row>

              <div className="monthly-goal-section">
                <h3>月度运动目标</h3>
                <div className="progress-container">
                  <Progress
                    percent={monthlyRate}
                    status="active"
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068'
                    }}
                    strokeWidth={20}
                  />
                  <div className="goal-detail">
                    <span>已完成 {fitnessData.monthlyCompleted} 次</span>
                    <span>目标 {fitnessData.monthlyGoal} 次</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabPane>

          {/* 详细信息标签 */}
          <TabPane
            tab={
              <span>
                <UserOutlined />
                个人详情
              </span>
            }
            key="details"
          >
            <Card className="details-card">
              <h3 className="section-title">身体信息</h3>
              <Descriptions
                column={2}
                bordered
                className="body-info-descriptions"
              >
                <Descriptions.Item label="身高">
                  {editing ? (
                    <Form.Item name="height" noStyle>
                      <Input placeholder="请输入身高" />
                    </Form.Item>
                  ) : (
                    userInfo.height || '未填写'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="体重">
                  {editing ? (
                    <Form.Item name="weight" noStyle>
                      <Input placeholder="请输入体重" />
                    </Form.Item>
                  ) : (
                    userInfo.weight || '未填写'
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="BMI指数">
                  <span
                    className={
                      userInfo.bmi && parseFloat(userInfo.bmi) > 24
                        ? 'bmi-high'
                        : 'bmi-normal'
                    }
                  >
                    {userInfo.bmi || '未计算'}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="体型">
                  {userInfo.bodyType || '未知'}
                </Descriptions.Item>
                <Descriptions.Item label="理想体重">
                  {userInfo.idealWeight || '未设置'}
                </Descriptions.Item>
                <Descriptions.Item label="健身爱好">
                  {editing ? (
                    <Form.Item name="fitnessHobby" noStyle>
                      <Input placeholder="请输入健身爱好，用逗号分隔" />
                    </Form.Item>
                  ) : userInfo.fitnessHobby ? (
                    userInfo.fitnessHobby.split('、').map((hobby, index) => (
                      <Tag key={index} color="blue">
                        {hobby}
                      </Tag>
                    ))
                  ) : (
                    '无'
                  )}
                </Descriptions.Item>
              </Descriptions>

              {editing && (
                <div className="additional-edit-fields">
                  <h3 className="section-title">编辑基本信息</h3>
                  <Form form={form} layout="vertical" className="edit-form">
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          name="nickname"
                          label="昵称"
                          rules={[{ required: true, message: '请输入昵称' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="sex"
                          label="性别"
                          rules={[{ required: true, message: '请选择性别' }]}
                        >
                          <Select>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="0">女</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="age"
                          label="年龄"
                          rules={[{ required: true, message: '请输入年龄' }]}
                        >
                          <InputNumber
                            min={0}
                            max={150}
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="phone"
                          label="手机号"
                          rules={[
                            { required: true, message: '请输入手机号' },
                            {
                              pattern: /^1[3-9]\d{9}$/,
                              message: '请输入正确的手机号格式'
                            }
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          name="address"
                          label="地址"
                          rules={[{ required: true, message: '请输入地址' }]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              )}
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default User
