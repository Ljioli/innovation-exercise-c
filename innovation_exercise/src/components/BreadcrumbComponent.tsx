import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  return (
    <Breadcrumb separator=">">
      {/* 首页固定项 */}
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined className="home-icon" />
          首页
        </Link>
      </Breadcrumb.Item>
      
      {/* 动态生成的面包屑项 */}
      {items.map((item, index) => (
        <Breadcrumb.Item 
          key={index}
          className={item.isActive ? 'active-breadcrumb' : ''}
        >
          {item.path ? (
            <Link to={item.path}>{item.label}</Link>
          ) : (
            item.label
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;