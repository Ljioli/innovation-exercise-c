import React from 'react'
import { Carousel } from 'antd'
import TotalTitle from './components/TotalTitle'
const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79'
}
const EventItem: React.FC = () => {
  return (
    <div>
      <TotalTitle
        titleText="赛事活动"
        linkPath="#"
        // icon={<DribbbleSquareOutlined />}
      />
      <Carousel arrows infinite={false}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  )
}
export default EventItem
