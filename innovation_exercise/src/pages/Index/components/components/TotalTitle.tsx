import { Typography } from 'antd'
import { DropboxOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './TotalTitle.scss'
import { ReactNode } from 'react'

const { Title } = Typography

interface TotalTitleProps {
  titleText?: string
  linkPath?: string
  icon?: ReactNode
}

const TotalTitle: React.FC<TotalTitleProps> = ({
  titleText = '场馆开放',
  linkPath = '#',
  icon = <DropboxOutlined />
}) => {
  return (
    <div>
      <div className="title">
        <div>
          <span
            style={{
              color: '#37f',
              fontSize: '33px',
              marginLeft: '10px',
              marginRight: '10px'
            }}
          >
            {icon}
          </span>
          <Title level={2}>{titleText}</Title>
        </div>
        <Link to={linkPath} style={{ fontSize: 14 }}>
          {`查看更多>`}
        </Link>
      </div>
    </div>
  )
}

export default TotalTitle
