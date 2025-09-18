import React from 'react'
import './register.scss'
import NavComponent from '@/components/NavComponent'
import { Typography } from 'antd'
const { Title } = Typography
const Register: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-bg">
        <NavComponent />
        
        {/* <Title level={2}>注册</Title> */}
        
      </div>
    </div>
  )
}
export default Register
