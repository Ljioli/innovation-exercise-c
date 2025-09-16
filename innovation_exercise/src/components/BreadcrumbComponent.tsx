import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
  clickable?: boolean; 
}

interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  return (
    <Breadcrumb separator=">">
      <Breadcrumb.Item>
        <Link to="/">
          <HomeOutlined/>
          首页
        </Link>
      </Breadcrumb.Item>
      
      {/* 动态生成的面包屑项 */}
      {items.map((item, index) => (
        <Breadcrumb.Item 
          key={index}
          className={item.isActive ? 'active-breadcrumb' : ''}
        >
          {item.path && item.clickable !== false ? (
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