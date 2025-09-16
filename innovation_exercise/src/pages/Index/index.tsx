import React from 'react'
import {
  Splitter,
  Carousel,
  Typography,
  Tabs,
  List,
  Divider,
  FloatButton
} from 'antd'
import {
  DropboxOutlined,
  NotificationOutlined,
  DribbbleSquareOutlined
} from '@ant-design/icons'
import type { TabsProps } from 'antd'
import './index.scss'
import VenueOpen from './components/VenueOpen'
import ExerciseGuide from './components/ExerciseGuide'
import NoticeAnnouncement from './components/NoticeAnnouncement'
// import ExerciseMap from './components/ExerciseMap'
const { Title, Text } = Typography
const onChange = (key: string) => {
  console.log(key)
}
const fitnessData = [
  { title: '2023年河北省全民健身日活动即将开始', publishTime: '2023-05-15' },
  { title: '石家庄市举办冬季马拉松比赛', publishTime: '2023-04-28' },
  { title: '河北省体育局发布最新健身指南', publishTime: '2023-03-10' },
  {
    title: '全民健身中心春节开放时间调整通知公告信息',
    publishTime: '2023-01-20'
  },
  {
    title: '2023年健身教练培训班招生简章',
    publishTime: '2022-12-05'
  }
]

const noticeData = [
  {
    title: '关于举办2023年社会体育指导员培训的通知',
    publishTime: '2023-05-10'
  },
  { title: '全民健身中心设施维护公告', publishTime: '2023-04-15' },
  { title: '河北省体育局关于表彰先进单位的决定', publishTime: '2023-03-01' },
  { title: '春节期间各体育场馆开放时间安排公告', publishTime: '2023-01-18' },
  { title: '关于申报2023年体育产业项目的通知', publishTime: '2022-11-30' }
]
const newsItems: TabsProps['items'] = [
  {
    key: '1',
    label: '时政新闻',
    children: (
      <List
        size="large"
        dataSource={fitnessData}
        renderItem={(item) => (
          <List.Item className="list-item">
            <a href="#" className="list-title">
              {item.title}
            </a>
            <Text type="secondary" className="list-date">
              [{item.publishTime}]
            </Text>
          </List.Item>
        )}
      />
    )
  },
  {
    key: '2',
    label: '热门赛事',
    children: (
      <List
        size="large"
        dataSource={noticeData}
        renderItem={(item) => (
          <List.Item className="list-item">
            <a href="#" className="list-title">
              {item.title}
            </a>
            <Text type="secondary" className="list-date">
              [{item.publishTime}]
            </Text>
          </List.Item>
        )}
      />
    )
  }
]

const Index: React.FC = () => {
  const carouselData = [
    {
      imgUrl:
        'https://js365.org.cn/eportal/imageDir/qmjs/2024/12/img_pc_site/2024122512391942426.jpg',
      title: '品牌，让世界更美好'
    },
    {
      imgUrl:
        'https://js365.org.cn/eportal/imageDir/qmjs/2024/12/img_pc_site/2024122314135028902.jpg',
      title: '2025世界品牌莫干山大会'
    },
    {
      imgUrl:
        'https://js365.org.cn/eportal/imageDir/qmjs/2024/11/img_pc_site/2024111508413061383.jpg',
      title: '主办单位：新华社品牌官方办公室中国品牌局出品'
    }
  ]

  return (
    <div>
      {/* 第一部分 */}
      <Splitter
      >
        {/* 轮播图 */}
        <Splitter.Panel defaultSize="40%" min="20%" max="70%">
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Carousel
              autoplay
              arrows
              infinite={false}
              effect="fade"
            >
              {carouselData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: 'relative'
                  }}
                >
                  {/* <div className="image-container"> */}
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="responsive-image"
                  />
                  {/* </div> */}
                  <div className="caption-overlay">
                    <div className="caption-content">
                      <Title level={4} className="caption-title">
                        {item.title}
                      </Title>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </Splitter.Panel>
        {/* 新闻 */}
        <Splitter.Panel>
          <Tabs
            defaultActiveKey="1"
            items={newsItems}
            onChange={onChange}
            style={{ marginLeft: '30px' }}
          />
        </Splitter.Panel>
      </Splitter>

      <Divider></Divider>
      {/* 第二部分 */}
      {/* 通知公告 */}
      <div id="notice-announcement">
        <NoticeAnnouncement />
      </div>

      <Divider></Divider>
      {/* 第三部分 */}
      {/* <EventItem /> */}
      <div id="venue-open">
        <VenueOpen />
      </div>
      <Divider></Divider>

      {/* 第四部分 */}
      <div id="exercise-guide">
        <ExerciseGuide />
      </div>
      <Divider></Divider>
      {/* 第五部分 */}
      {/* <div id="exercise-map">
        <ExerciseMap />
      </div> */}

      <Divider></Divider>
      {/* 设置锚点 */}

      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        <FloatButton
          icon={<DropboxOutlined />}
          href="#venue-open"
          tooltip="场馆开放"
        />
        <FloatButton
          icon={<NotificationOutlined />}
          href="#notice-announcement"
          tooltip="政务公开"
        />
        <FloatButton
          icon={<DribbbleSquareOutlined />}
          href="#exercise-guide"
          tooltip="科学健身指导"
        />
        <FloatButton />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
    </div>
  )
}

export default Index
