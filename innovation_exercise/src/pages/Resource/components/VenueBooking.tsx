import React, { useMemo, useState } from 'react'
import {
  Drawer,
  Button,
  Row,
  Col,
  Form,
  Input,
  Space,
  message,
  Divider
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './VenueBooking.scss'

type Slot = { id: string; label: string }

interface VenueBookingProps {
  visible: boolean
  onClose: () => void
  venue: { id: number; name: string; type?: string }
}

const DAYS_COUNT = 7

// 选择日期
function formatDayLabel(day: Date) {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return `${day.getMonth() + 1}月${day.getDate()}日 ${days[day.getDay()]}`
}

// 转换为格式日期：YYYY-MM-DD
function isoDate(day: Date) {
  return day.toISOString().slice(0, 10)
}

const defaultSlots: Slot[] = [
  { id: '08:00-10:00', label: '08:00 - 10:00' },
  { id: '10:00-12:00', label: '10:00 - 12:00' },
  { id: '14:00-16:00', label: '14:00 - 16:00' },
  { id: '16:00-18:00', label: '16:00 - 18:00' },
  { id: '18:00-20:00', label: '18:00 - 20:00' }
]

const VenueBooking: React.FC<VenueBookingProps> = ({
  visible,
  onClose,
  venue
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  // 生成未来 7 天（含今天）
  const days = useMemo(() => {
    const arr: { iso: string; label: string }[] = []
    for (let i = 0; i < DAYS_COUNT; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      arr.push({ iso: isoDate(d), label: formatDayLabel(d) })
    }
    return arr
  }, [])

  const getSlotsFor = (dateIso: string) => {
    return defaultSlots
  }

  const handleConfirm = async () => {
    try {
      // 表单校验（联系人列表）
      const values = await form.validateFields()
      const payload = {
        venue_id: venue.id,
        date: selectedDate,
        time_slot: selectedSlot,
        participants: values.participants || []
      }

      setLoading(true)
      // await createVenueBookingService(venue.id, payload)
      message.success('预约成功')
      form.resetFields()
      setSelectedDate(null)
      setSelectedSlot(null)
      onClose()
    } catch (err: any) {
      console.error(err)
      message.error('预约失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 清理选择
  React.useEffect(() => {
    if (!visible) {
      form.resetFields()
      setSelectedDate(null)
      setSelectedSlot(null)
      setLoading(false)
    }
  }, [visible, form])
  const [contactCount, setContactCount] = useState(1)
  return (
    <Drawer
      title={`预约 — ${venue.name}`}
      width={520}
      onClose={onClose}
      open={visible}
    >
      <Form form={form} layout="vertical" onFinish={handleConfirm}>
        <div className="venue-booking-container">
          <Form.Item
            name="date"
            label="选择日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <Row gutter={[8, 8]}>
              {days.map((d) => {
                const active = selectedDate === d.iso
                return (
                  <Col key={d.iso}>
                    <Button
                      type={active ? 'primary' : 'default'}
                      onClick={() => {
                        setSelectedDate(d.iso)
                        setSelectedSlot(null)
                        form.setFieldsValue({ date: d.iso })
                      }}
                    >
                      <div>{d.label.split(' ')[0]}</div>
                      <div>{d.label.split(' ')[1]}</div>
                    </Button>
                  </Col>
                )
              })}
            </Row>
          </Form.Item>

          <Divider />

          {/* 3. 时段 */}
          <Form.Item
            name="slot"
            label="选择时段"
            rules={[{ required: true, message: '请选择时段' }]}
          >
            <Space wrap>
              {selectedDate ? (
                getSlotsFor(selectedDate).map((s) => {
                  const active = selectedSlot === s.id
                  return (
                    <Button
                      key={s.id}
                      type={active ? 'primary' : 'default'}
                      onClick={() => {
                        setSelectedSlot(s.id)
                        form.setFieldsValue({ slot: s.id })
                      }}
                    >
                      {s.label}
                    </Button>
                  )
                })
              ) : (
                <div className="booking-tip">请选择上方日期以查看可选时段</div>
              )}
            </Space>
          </Form.Item>
          <Divider />

          {/* 4. 联系人（可多人） */}
          <Form.Item label="联系人信息" required>
            {Array.from({ length: contactCount }).map((_, index) => (
              <div key={index} className="contact-item">
                <div
                  style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <Form.Item
                    name={`contact_${index}_name`}
                    label={`联系人${index + 1}姓名`}
                    rules={[{ required: true, message: '请输入姓名' }]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="请输入姓名" />
                  </Form.Item>
                  <Form.Item
                    name={`contact_${index}_phone`}
                    label={`联系人${index + 1}电话`}
                    rules={[
                      { required: true, message: '请输入电话' },
                      {
                        pattern: /^1[3456789]\d{9}$/,
                        message: '请输入正确的手机号'
                      }
                    ]}
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="请输入电话" />
                  </Form.Item>

                  <Button
                    type="text"
                    danger
                    onClick={() => setContactCount(contactCount - 1)}
                    disabled={contactCount <= 1}
                  >
                    删除
                  </Button>
                </div>
              </div>
            ))}

            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={() => setContactCount(contactCount + 1)}
            >
              添加联系人
            </Button>
          </Form.Item>
          {/* 底部确认 */}
          <div className="booking-footer">
            <Row justify="space-between">
              <Col>
                <div className="booking-footer-info">
                  {selectedDate ? ` 日期：${selectedDate}` : ''}
                  {selectedSlot ? ` 时段：${selectedSlot}` : ''}
                </div>
              </Col>
              <Col>
                <Space>
                  <Button onClick={onClose}>取消</Button>
                  <Button type="primary" loading={loading} htmlType="submit">
                    确认预约
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
    </Drawer>
  )
}

export default VenueBooking
