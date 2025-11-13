import React, { useState, useMemo, useEffect, useRef } from 'react'
import {
  SendOutlined,
  SmileOutlined,
  SearchOutlined,
  HistoryOutlined,
  FireOutlined,
  ClockCircleOutlined,
  UserOutlined,
  RobotOutlined,
  LoadingOutlined
} from '@ant-design/icons'
import {
  Card,
  Input,
  Badge,
  Avatar,
  Space,
  message,
  Typography,
  List,
  Divider,
  Spin,
  Button
} from 'antd'
import 'antd/dist/reset.css'
import './intelligentQA.scss'

// 类型定义
interface Message {
  id: number
  content: string
  sender: 'user' | 'ai'
  timestamp: string
  status: 'pending' | 'completed' | 'error'
}

interface FAQItem {
  id: number
  question: string
  views: number
  isRecent?: boolean
}

const { Text, Title, Paragraph } = Typography

const IntelligentQA: React.FC = () => {
  // 状态管理
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: '您好！我是体育健身领域的智能助手，有什么可以帮助您的吗？',
      sender: 'ai',
      timestamp: new Date(Date.now() - 86400000).toLocaleString(),
      status: 'completed'
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // 热门问题和最近问题
  const faqItems: FAQItem[] = [
    { id: 1, question: '河北省体育馆的羽毛球场地怎么预约？', views: 128, isRecent: true },
    { id: 2, question: '中老年适合参与哪些全民健身活动？', views: 95 },
    { id: 3, question: '2025年石家庄马拉松什么时候报名？', views: 87, isRecent: true },
    { id: 4, question: '健身器材损坏如何报修？', views: 76 },
    { id: 5, question: '如何解决APP登录失败问题？', views: 68 },
    { id: 6, question: '国民体质监测需要准备什么？', views: 54 },
    { id: 7, question: '运动损伤的应急处理方法？', views: 49, isRecent: true },
    { id: 8, question: '社会体育指导员如何预约？', views: 36 }
  ]

  // 发送消息
  const sendMessage = async () => {
    if (!inputValue.trim() || loading) return

    // 添加用户消息
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleString(),
      status: 'completed'
    }
    
    setInputValue('')
    setLoading(true)

    // 添加AI正在输入的状态
    const aiPendingMessage: Message = {
      id: messages.length + 2,
      content: '',
      sender: 'ai',
      timestamp: new Date().toLocaleString(),
      status: 'pending'
    }
    
    setMessages(prev => [...prev, userMessage, aiPendingMessage])

    try {
      // 模拟AI回答延迟
      await new Promise(resolve => setTimeout(resolve, 1500))
      
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
                content: '你是一个体育健身领域专家，需要回答用户关于健身、健康饮食、系统使用等各种问题。请用简洁明了的语言回答问题，提供实用的建议和解决方案。'
              },
              ...messages.filter(m => m.status === 'completed').map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.content
              })),
              { role: 'user', content: inputValue.trim() }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        }
      )

      if (!response.ok) throw new Error(`API调用失败: ${response.status}`)
      const data = await response.json()
      const answer = data.choices?.[0]?.message?.content || '抱歉，未能生成回答'

      // 更新AI消息为完成状态
      setMessages(prev => prev.map(msg => 
        msg.id === aiPendingMessage.id 
          ? { ...msg, content: answer, status: 'completed' }
          : msg
      ))
      
    } catch (error) {
      console.error('获取AI回答失败:', error)
      setMessages(prev => prev.map(msg => 
        msg.id === aiPendingMessage.id 
          ? { ...msg, content: '抱歉，获取回答失败，请稍后再试', status: 'error' }
          : msg
      ))
      message.error('获取回答失败')
    } finally {
      setLoading(false)
    }
  }

  // 快捷提问
  const handleQuickQuestion = (question: string) => {
    setInputValue(question)
  }

  // 处理回车键发送消息
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // 热门问题
  const hotQuestions = useMemo(() => {
    return [...faqItems].sort((a, b) => b.views - a.views).slice(0, 5)
  }, [])

  // 最近问题
  const recentQuestions = useMemo(() => {
    return faqItems.filter(item => item.isRecent)
  }, [])

  return (
    <div className="chat-container">
      {/* 顶部标题栏 */}
      <div className="qa-header">
        <Title level={2}>INTELLIGENT Q&A</Title>
        <Title level={2} className="qa-title">智能问答</Title>
      </div>

      <div className="chat-content">
        {/* 左侧对话区域 */}
        <div className="chat-messages">
          <div className="messages-container">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message-item ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}
              >
                <Avatar 
                  className="message-avatar" 
                  icon={message.sender === 'user' ? <UserOutlined /> : <RobotOutlined />}
                />
                <div className="message-bubble">
                  <Paragraph className="message-content">
                    {message.status === 'pending' ? (
                      <Spin indicator={<LoadingOutlined spin />} />
                    ) : (
                      message.content
                    )}
                  </Paragraph>
                  <Text className="message-time">{message.timestamp}</Text>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 输入区域 */}
          <div className="message-input-area">
            <Card className="input-card">
              <div className="input-tools">
                <SmileOutlined className="input-tool-icon" />
              </div>
              <Input.TextArea
                placeholder="请输入您的问题..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onPressEnter={handleKeyPress}
                rows={3}
                className="message-input"
              />
              <Button 
                icon={<SendOutlined />} 
                onClick={sendMessage}
                loading={loading}
                className="send-button"
              />
            </Card>
          </div>
        </div>

        {/* 右侧辅助信息区 */}
        <div className="chat-sidebar">
          <Card className="sidebar-card">


            <Divider orientation="left">
              <Space>
                <FireOutlined />
                <Text>热门问题</Text>
              </Space>
            </Divider>
            <List
              dataSource={hotQuestions}
              renderItem={item => (
                <List.Item 
                  className="quick-question-item"
                  onClick={() => handleQuickQuestion(item.question)}
                >
                  <List.Item.Meta
                    title={
                      <div className="question-content">
                        <Text >{item.question}</Text>
                        <Badge count={item.views} size="small" className="views-badge" />
                      </div>
                    }
                  />
                </List.Item>
              )}
            />

            <Divider orientation="left">
              <Space>
                <ClockCircleOutlined />
                <Text>最近咨询</Text>
              </Space>
            </Divider>
            <List
              dataSource={recentQuestions}
              renderItem={item => (
                <List.Item 
                  className="quick-question-item"
                  onClick={() => handleQuickQuestion(item.question)}
                >
                  <List.Item.Meta
                    title={<Text>{item.question}</Text>}
                  />
                </List.Item>
              )}
            />

            <div className="assistant-info">
              <div className="assistant-avatar">
                <Avatar icon={<RobotOutlined />} size="large" />
              </div>
              <div className="assistant-details">
                <Title level={5} className="assistant-name">体育智能助手</Title>
                <Text type="secondary" className="assistant-desc">
                  可以为您提供场馆预约、活动报名、健身指导等方面的帮助
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default IntelligentQA