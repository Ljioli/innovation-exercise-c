import React, { useState, useMemo, useEffect } from 'react'
import {
  PlusOutlined,
  SearchOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import {
  Card,
  Input,
  Select,
  Modal,
  Form,
  Button,
  Typography,
  Space,
  message,
  Checkbox,
  Radio
} from 'antd'
import 'antd/dist/reset.css'
import './intelligentQA.scss'

// 类型定义
interface Question {
  id: number
  title: string
  question: string
  type: string
  questioner: string
  time: string
  answer?: string
  answerer?: string
  answerTime?: string
  isProcessing?: boolean
}

interface Category {
  label: string
  value: string
}

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

const IntelligentQA: React.FC = () => {
  // 问题分类数据
  const categories: Category[] = [
    { label: '场馆预约', value: 'venue-booking' },
    { label: '活动报名', value: 'activity-registration' },
    { label: '健身指导', value: 'fitness-guidance' },
    { label: '设施维护', value: 'facility-maintenance' },
    { label: '政策咨询', value: 'policy-consultation' },
    { label: '赛事信息', value: 'event-information' },
    { label: '体质监测', value: 'physical-testing' },
    { label: '社会体育指导员', value: 'instructor-related' },
    { label: 'APP使用', value: 'app-usage' }
  ]

  // 热门标签
  const tags = [
    '广场舞培训',
    '健身路径',
    '赛事报名',
    '科学健身',
    '国民体质监测',
    '场馆开放时间',
    '健身器材使用',
    '社会体育指导员',
    '运动损伤预防'
  ]

  // 初始问题数据
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: '体育馆预约',
      question: '河北省体育馆的羽毛球场地怎么预约？为什么总是显示预约已满？',
      type: 'venue-booking',
      questioner: '市民王先生',
      time: '2025-09-24 20:27',
      answer:
        '河北省体育馆羽毛球场地可通过"冀健通"APP预约，每日早8点释放未来7天场地资源。预约紧张时段建议错峰预约（工作日10:00-15:00相对宽松），系统支持提前24小时取消预约（违约3次将限制预约权限7天）。',
      answerer: '省体育局客服 001',
      answerTime: '2025-09-25 09:10'
    },
    {
      id: 2,
      title: '科学健身指导',
      question:
        '作为中老年健身爱好者，适合参与哪些全民健身活动？有哪些注意事项？',
      type: 'fitness-guidance',
      questioner: '李阿姨',
      time: '2023-10-15 10:30',
      answer:
        '中老年朋友推荐参与：1. 社区广场舞（每周一、三、五有指导员现场教学）；2. 太极拳/剑（省体育场每日早6-8点免费教学）；3. 健步走（各大公园均有健步走团队）。注意事项：运动前做5分钟热身，避免空腹或餐后立即运动，随身携带急救药品，感觉不适立即停止。',
      answerer: '省体育局健身指导员 张教练',
      answerTime: '2025-09-25 11:20'
    },
    {
      id: 3,
      title: '马拉松报名',
      question:
        '2025年石家庄马拉松什么时候开始报名？需要满足什么条件才能参加？',
      type: 'event-information',
      questioner: '跑步爱好者小张',
      time: '2025-09-23 15:45'
    },
    {
      id: 4,
      title: 'APP无法登录',
      question:
        '河北省全民健身服务平台APP总是登录失败，提示"网络错误"，但网络是正常的，请问怎么解决？',
      type: 'app-usage',
      questioner: '赵先生',
      time: '2025-09-22 09:18'
    },
    {
      id: 5,
      title: '社区健身器材损坏',
      question:
        '裕华区槐底社区的健身路径中，漫步机的踏板坏了，请问如何报修？大概多久能修好？',
      type: 'facility-maintenance',
      questioner: '社区居民刘女士',
      time: '2023-10-10 14:15',
      answer:
        '健身器材报修可通过三种方式：1. 拨打12345政务服务热线转全民健身设施报修；2. 在"冀健通"APP首页点击"设施报修"上传照片和位置；3. 联系社区居委会登记。接到报修后，维修人员会在48小时内到场检修，一般轻微损坏72小时内修复，严重损坏会设置警示标识并在7天内更换。',
      answerer: '省体育局设施维护部 李工',
      answerTime: '2025-09-25 12:30'
    }
  ])

  // 状态管理
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [loading, setLoading] = useState<boolean>(false)
  const [showAddQuestionModal, setShowAddQuestionModal] =
    useState<boolean>(false)
  const [hasApiKey] = useState<boolean>(true) // API Key已内置
  const [form] = Form.useForm()

  // 过滤后的问题列表
  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      // 关键词过滤
      const matchesSearch =
        !searchKeyword ||
        question.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        question.question.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (question.answer &&
          question.answer.toLowerCase().includes(searchKeyword.toLowerCase()))

      // 分类过滤
      const matchesCategory =
        !selectedCategories.length || selectedCategories.includes(question.type)

      // 状态过滤
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'answered' && !!question.answer) ||
        (selectedStatus === 'unanswered' && !question.answer)

      // 标签过滤
      const matchesTag =
        !selectedTags.length ||
        selectedTags.some(
          (tag) =>
            question.title.includes(tag) ||
            question.question.includes(tag) ||
            (question.answer && question.answer.includes(tag))
        )

      return matchesSearch && matchesCategory && matchesStatus && matchesTag
    })
  }, [
    questions,
    searchKeyword,
    selectedCategories,
    selectedTags,
    selectedStatus
  ])

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  // 搜索处理
  const handleSearch = () => {
    // 滚动到列表顶部
    const listElement = document.querySelector('.questions-list')
    listElement?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 关闭添加问题弹窗
  const handleCloseAddQuestion = () => {
    setShowAddQuestionModal(false)
    form.resetFields()
  }

  // 获取AI回答
  const getAIAnswer = async (question: Question) => {
    // 更新问题为处理中状态
    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, isProcessing: true } : q))
    )

    try {
      const apiKey = '7042eb5d93ad41479366c2e7cf4b48f3.cLei70cPEKkd5Pij'
      const response = await fetch(
        'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'glm-4-flash',
            messages: [
              {
                role: 'system',
                content:
                  '你是一个体育健身领域专家，需要回答用户关于健身、健康饮食、系统使用等各种问题。请用简洁明了的语言回答问题，提供实用的建议和解决方案。'
              },
              {
                role: 'user',
                content: `问题标题：${question.title} 问题描述：${question.question}`
              }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        }
      )

      if (!response.ok) throw new Error(`API调用失败: ${response.status}`)
      const data = await response.json()
      const answer = data.choices?.[0]?.message?.content || '抱歉，未能生成回答'

      // 更新问题答案
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id
            ? {
                ...q,
                answer,
                isProcessing: false,
                answerer: 'AI助手',
                answerTime: new Date().toLocaleString('zh-CN')
              }
            : q
        )
      )
    } catch (error) {
      console.error('获取AI回答失败:', error)
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === question.id
            ? {
                ...q,
                answer: '获取AI回答失败，请稍后再试',
                isProcessing: false
              }
            : q
        )
      )
      message.error('获取AI回答失败')
    }
  }

  // 提交新问题
  const handleSubmitQuestion = async () => {
    try {
      const values = await form.validateFields()
      const newQuestion: Question = {
        id: questions.length + 1,
        title: values.title,
        question: values.question,
        type: values.type,
        questioner: '当前用户',
        time: new Date().toLocaleString('zh-CN')
      }

      // 添加新问题
      setQuestions((prev) => [newQuestion, ...prev])

      // 如果有API Key，自动获取AI回答
      if (hasApiKey) {
        await getAIAnswer(newQuestion)
      }

      handleCloseAddQuestion()
      message.success('问题提交成功')
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  // 加载更多问题
  const loadMoreQuestions = () => {
    setLoading(true)

    // 模拟加载延迟
    setTimeout(() => {
      const newQuestions: Question[] = [
        {
          id: questions.length + 1,
          title: '数据导出格式',
          question:
            '请问平台支持将数据导出为哪些格式？是否支持Excel和CSV格式？',
          type: 'data',
          questioner: '王研究员',
          time: '2025-09-21 14:30'
        },
        {
          id: questions.length + 2,
          title: '社区健身设施如何提升数字化服务水平？',
          question:
            '我们社区配备了智能健身器材和线上服务平台，但居民使用率不高，如何更好地利用这些数字化资源提升健身服务质量？',
          type: 'digital-application',
          questioner: '李教练',
          time: '2023-10-05 09:45'
        }
      ]

      setQuestions((prev) => [...prev, ...newQuestions])
      setLoading(false)
    }, 1500)
  }

  // 监听滚动加载更多
  useEffect(() => {
    const handleScroll = () => {
      const listElement = document.querySelector('.questions-list')
      if (listElement) {
        const { scrollTop, scrollHeight, clientHeight } =
          listElement as HTMLDivElement
        // 滚动到底部附近时加载更多
        if (
          scrollHeight - scrollTop - clientHeight < 200 &&
          !loading &&
          filteredQuestions.length === questions.length
        ) {
          loadMoreQuestions()
        }
      }
    }

    const listElement = document.querySelector('.questions-list')
    if (listElement) {
      listElement.addEventListener('scroll', handleScroll)
      return () => listElement.removeEventListener('scroll', handleScroll)
    }
  }, [loading, filteredQuestions.length, questions.length])

  return (
    <div className="qa-container">
      <div className="qa-header">
        <Title level={2}>INTELLIGENT Q&A</Title>
        <Title level={3}>智能问答</Title>
      </div>

      <div className="qa-content">
        {/* 左侧筛选栏 */}
        <div className="filter-sidebar">
          <div className="filter-section">
            <h3>问题分类</h3>
            <div className="filter-options">
              {categories.map((category) => (
                <Checkbox
                  key={category.value}
                  value={category.value}
                  checked={selectedCategories.includes(category.value)}
                  onChange={(e) => {
                    setSelectedCategories((prev) =>
                      e.target.checked
                        ? [...prev, category.value]
                        : prev.filter((c) => c !== category.value)
                    )
                  }}
                >
                  {category.label}
                </Checkbox>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>热门标签</h3>
            <div className="tags">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <span className="selected-tag">✓</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>问题状态</h3>
            <div className="filter-options">
              <Radio.Group
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <Radio value="all">全部</Radio>
                <Radio value="answered">已回答</Radio>
                <Radio value="unanswered">待回答</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>

        {/* 右侧问答列表 */}
        <div className="questions-container">
          {/* 搜索框 */}
          <div className="search-section">
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜索咨询信息..."
              className="search-input"
              prefix={<SearchOutlined />}
              onPressEnter={handleSearch}
            />
            <Button type="primary" onClick={handleSearch}>
              搜索
            </Button>
          </div>

          {/* 问题列表 */}
          <div className="questions-list">
            {filteredQuestions.length === 0 ? (
              <div className="no-questions">
                <p>暂无匹配的问题</p>
              </div>
            ) : (
              filteredQuestions.map((question) => (
                <Card key={question.id} className="question-card">
                  <div className="question-header">
                    <Title level={4} className="question-title">
                      {question.title}
                    </Title>
                    <Text className="question-type">
                      {categories.find((c) => c.value === question.type)
                        ?.label || question.type}
                    </Text>
                  </div>

                  <div className="question-content">
                    <Paragraph className="question-text">
                      {question.question}
                    </Paragraph>
                  </div>

                  {question.isProcessing ? (
                    <div className="processing-section">
                      <Space
                        align="center"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          padding: '20px 0'
                        }}
                      >
                        <LoadingOutlined />
                        <span>AI正在生成回答，请稍候...</span>
                      </Space>
                    </div>
                  ) : question.answer ? (
                    <div className="answer-section">
                      <div className="answer-label">回复内容:</div>
                      <Paragraph className="answer-text">
                        {question.answer}
                      </Paragraph>
                    </div>
                  ) : (
                    <div className="unanswered-section">
                      <p className="unanswered-text">等待回答...</p>
                      {hasApiKey && (
                        <div className="get-answer-btn-wrapper">
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => getAIAnswer(question)}
                          >
                            获取AI回答
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="question-footer">
                    <div className="question-info">
                      <Text className="questioner">{question.questioner}</Text>
                      <Text className="question-time">
                        {formatDate(question.time)}
                      </Text>
                    </div>

                    {question.answer && (
                      <div className="answer-info">
                        <Text className="answerer">
                          回复人：{question.answerer}
                        </Text>
                        <Text className="answer-time">
                          {question.answerTime}
                        </Text>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            )}

            {/* 加载更多 */}
            {loading && <div className="loading-more">加载更多内容...</div>}
          </div>
        </div>
      </div>

      {/* 添加问题按钮 */}
      <div
        className="add-question-btn"
        onClick={() => setShowAddQuestionModal(true)}
      >
        <PlusOutlined size={20} />
      </div>

      {/* 添加问题弹窗 */}
      <Modal
        title="提出问题"
        open={showAddQuestionModal}
        onCancel={handleCloseAddQuestion}
        footer={[
          <Button key="cancel" onClick={handleCloseAddQuestion}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitQuestion}>
            提交
          </Button>
        ]}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="questionForm"
          initialValues={{ type: '' }}
        >
          <Form.Item
            name="type"
            label="问题类型"
            rules={[{ required: true, message: '请选择问题类型' }]}
          >
            <Select placeholder="请选择问题类型">
              {categories.map((category) => (
                <Option key={category.value} value={category.value}>
                  {category.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="title"
            label="问题标题"
            rules={[
              { required: true, message: '请输入问题标题' },
              { min: 5, max: 100, message: '标题长度在5到100个字符' }
            ]}
          >
            <Input placeholder="请输入问题标题" maxLength={100} showCount />
          </Form.Item>

          <Form.Item
            name="question"
            label="问题内容"
            rules={[
              { required: true, message: '请输入问题内容' },
              { min: 10, max: 1000, message: '问题描述长度在10到1000个字符' }
            ]}
          >
            <TextArea
              placeholder="请详细描述您的问题"
              rows={4}
              maxLength={1000}
              showCount
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default IntelligentQA
