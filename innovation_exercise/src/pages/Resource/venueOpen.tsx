import React from 'react'
import {
  Select,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Pagination,
  Tag
} from 'antd'
import { EnvironmentOutlined,ClockCircleOutlined } from '@ant-design/icons'

import './venueOpen.scss'

const { Option } = Select
const { Link } = Typography

// 场馆数据类型定义
interface Venue {
  id: number
  name: string
  address: string
  openingHours: string
  phone: string
  type: string
  image: string
  province: string
  city: string
  district: string  // 新增区属性
  operator?: string
  year?: string
  area?: string
}

// 河北省内场馆数据
const venueData: Venue[] = [
  {
    id: 1,
    name: '河北体育馆',
    address: '石家庄市长安区中山东路338号',
    openingHours: '06:00-22:00',
    phone: '0311-85918888',
    type: '综合体育馆',
    image: 'https://js365.org.cn/oss/js365/upload/2021/10/12/f5de89a3-a29d-44ca-8e62-677e82c5b6fe.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '长安区',
    operator: '河北省体育局',
    year: '2005',
    area: '25000'
  },
  {
    id: 2,
    name: '高邑县公共体育馆',
    address: '石家庄市高邑县高邑镇北关村太行路152号',
    openingHours: '全天开放',
    phone: '0311-86688888',
    type: '户外健身区',
    image: 'https://js365.org.cn/oss/js365/js365/upload/20220624/02dcf9ebd3124dbea6c12190a8558371.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '高邑县',
    operator: '石家庄市市政管理处',
    year: '2010',
    area: '8000'
  },
  {
    id: 3,
    name: '石家庄市新华区文体中心体育综合馆',
    address: '石家庄市新华区北苑街道钟旺路15号',
    openingHours: '08:00-21:00',
    phone: '010-84375088',
    type: '综合体育馆',
    image: 'https://js365.org.cn/oss/js365/js365/upload/20220620/13117c9a27f940fb9095307d386a8be6.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '新华区',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 4,
    name: '石家庄市鹿泉区篮球馆',
    address: '石家庄市鹿泉区获鹿镇向阳大街213号',
    openingHours: '07:30-22:00',
    phone: '021-64385200',
    type: '综合体育馆',
    image: 'https://js365.org.cn/oss/js365/js365/upload/20220621/e76e1aa77d184d6bbaa643c4d32b2192.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '鹿泉区',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 5,
    name: '石家庄市中山体育馆',
    address: '石家庄市桥西区维明街道自强路117号',
    openingHours: '06:30-22:30',
    phone: '020-85678900',
    type: '体育中心',
    image: 'https://www.js365.org.cn/oss/js365/upload/20240725/fc5c888aeb514a94884f49f631d50ff9.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '桥西区',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 6,
    name: '赞皇县体育馆',
    address: '石家庄市赞皇县西龙门乡布古庄村二中南邻',
    openingHours: '07:00-22:00',
    phone: '0755-86308888',
    type: '体育中心',
    image: 'https://js365.org.cn/oss/js365/upload/2021/05/13/85baf517-0e5d-41ad-aaa2-8ad4a87cde17.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '赞皇县',
    operator: '石家庄市市政管理处',
    year: '2011',
    area: '307000'
  },
  {
    id: 7,
    name: '新乐市体育馆',
    address: '石家庄市新乐市长寿街道育才街8号',
    openingHours: '08:00-21:30',
    phone: '028-86616566',
    type: '体育场',
    image: 'https://www.js365.org.cn/oss/js365/upload/20240723/ec4d3d79f31b44438170cf922be31781.jpg',
    province: '河北省',
    city: '石家庄市',
    district: '新乐市',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 8,
    name: '唐山市体育中心',
    address: '唐山市路南区卫国南路11号',
    openingHours: '08:00-22:00',
    phone: '0315-2825678',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=8',
    province: '河北省',
    city: '唐山市',
    district: '路南区',
    operator: '唐山市体育局',
    year: '2012',
    area: '180000'
  },
  {
    id: 9,
    name: '秦皇岛市奥体中心',
    address: '秦皇岛市海港区河北大街西段',
    openingHours: '07:30-21:00',
    phone: '0335-8051234',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=9',
    province: '河北省',
    city: '秦皇岛市',
    district: '海港区',
    operator: '秦皇岛市体育局',
    year: '2004',
    area: '400000'
  },
  {
    id: 10,
    name: '邯郸市体育馆',
    address: '邯郸市丛台区中华北大街21号',
    openingHours: '07:00-22:00',
    phone: '0310-3026789',
    type: '体育馆',
    image: 'https://picsum.photos/400/200?random=10',
    province: '河北省',
    city: '邯郸市',
    district: '丛台区',
    operator: '邯郸市体育局',
    year: '1998',
    area: '73000'
  },
  {
    id: 11,
    name: '保定市体育馆',
    address: '保定市竞秀区东风西路109号',
    openingHours: '08:00-21:30',
    phone: '0312-3034567',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=11',
    province: '河北省',
    city: '保定市',
    district: '竞秀区',
    operator: '保定市体育局',
    year: '2008',
    area: '135000'
  },
  {
    id: 12,
    name: '张家口市全民健身中心',
    address: '张家口市桥东区胜利中路2号',
    openingHours: '07:30-22:00',
    phone: '0313-4038910',
    type: '综合体育馆',
    image: 'https://picsum.photos/400/200?random=12',
    province: '河北省',
    city: '张家口市',
    district: '桥东区',
    operator: '张家口市体育局',
    year: '2010',
    area: '28000'
  },
  {
    id: 13,
    name: '张家口市全民健身中心',
    address: '张家口市桥东区胜利中路2号',
    openingHours: '07:30-22:00',
    phone: '0313-4038910',
    type: '综合体育馆',
    image: 'https://picsum.photos/400/200?random=12',
    province: '河北省',
    city: '张家口市',
    district: '桥东区',
    operator: '张家口市体育局',
    year: '2010',
    area: '28000'
  },
]


const VenueOpen: React.FC = () => {
  // 筛选状态
  const [city, setCity] = React.useState('全部')
  const [district, setDistrict] = React.useState('全部')
  const [venueType, setVenueType] = React.useState('全部场馆')
  const [searchText, setSearchText] = React.useState('')
  // 分页状态
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 12 // 每页12个

  // 市选择变化
  const handleCityChange = (value: string) => {
    setCity(value)
    setDistrict('全部') // 切换市时重置区
    setCurrentPage(1) // 切换筛选条件时重置到第一页
  }

  // 搜索逻辑
  const handleSearch = () => {
    console.log('搜索内容:', searchText)
    setCurrentPage(1) // 搜索时重置到第一页
  }

  // 分页处理
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 筛选场馆类型
  const filteredByType = venueData.filter(
    (venue) => venueType === '全部场馆' || venue.type === venueType
  )

  // 筛选城市
  const filteredByCity = filteredByType.filter(
    (venue) => city === '全部' || venue.city === city
  )

  // 筛选区
  const filteredByDistrict = filteredByCity.filter(
    (venue) => district === '全部' || venue.district === district
  )

  // 搜索筛选
  const filteredVenues = filteredByDistrict.filter((venue) =>
    venue.name.toLowerCase().includes(searchText.toLowerCase())
  )

  // 计算当前页数据
  const indexOfLastItem = currentPage * pageSize
  const indexOfFirstItem = indexOfLastItem - pageSize
  const currentVenues = filteredVenues.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredVenues.length / pageSize)

  // 获取所有可用的场馆类型
  const allVenueTypes = [
    '全部场馆',
    ...Array.from(new Set(venueData.map((v) => v.type)))
  ]

  // 获取所有可用的城市
  const allCities = [
    '全部',
    ...Array.from(new Set(venueData.map((v) => v.city)))
  ]

  return (
    <div className="venue-open-page">
      {/* 筛选栏 */}
      <div className="filter-bar">
        <div className="filter-item">
          <span className="filter-label">市：</span>
          <Select
            value={city}
            style={{ width: 120 }}
            onChange={handleCityChange}
          >
            {allCities.map((cityItem) => (
              <Option key={cityItem} value={cityItem}>
                {cityItem}
              </Option>
            ))}
          </Select>
        </div>

        <div className="filter-item">
          <span className="filter-label">区：</span>
          <Select
            value={district}
            style={{ width: 120 }}
            onChange={(val) => setDistrict(val)}
          >
            <Option value="全部">全部</Option>
            {city !== '全部' &&
              Array.from(
                new Set(
                  venueData
                    .filter((v) => v.city === city)
                    .map((v) => v.district)
                )
              ).map((districtItem) => (
                <Option key={districtItem} value={districtItem}>
                  {districtItem}
                </Option>
              ))}
          </Select>
        </div>

        <div className="filter-item">
          <span className="filter-label">场馆类型：</span>
          <Select
            value={venueType}
            style={{ width: 120 }}
            onChange={(val) => setVenueType(val)}
          >
            {allVenueTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </div>

        <div className="filter-item search-item">
          <Input
            placeholder="请输入场馆名称"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={handleSearch} className="search-btn">
            搜索
          </Button>
        </div>
      </div>

      {/* 场馆列表 */}
      <Row gutter={[24, 24]} className="venue-list">
        {currentVenues.map((venue) => (
          <Col xs={24} sm={12} md={8} lg={6} key={venue.id}>
            <Link href={`/resource/venue-detail/${venue.id}`} target="_blank">
              <Card
                hoverable
                className="venue-card"
                cover={
                  <img
                    alt={venue.name}
                    src={venue.image}
                    className="venue-card-image"
                  />
                }
              >
                <Tag color="blue">{venue.type}</Tag>
                <h3 className="venue-name">{venue.name}</h3>
                <div className="venue-info">
                  <div className="info-item">
                    <EnvironmentOutlined />
                    <span>{venue.address}</span>
                  </div>
                  <div className="info-item">
                    <ClockCircleOutlined />
                    <span>{venue.openingHours}</span>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredVenues.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            showQuickJumper
            showTotal={(total) => `共 ${total} 个场馆`}
          />
        </div>
      )}
    </div>
  )
}

export default VenueOpen