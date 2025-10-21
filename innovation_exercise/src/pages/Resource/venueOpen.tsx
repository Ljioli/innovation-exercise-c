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
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'

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
  operator?: string
  year?: string
  area?: string
}

// 模拟场馆数据
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
    operator: '河北省体育局',
    year: '2005',
    area: '25000'
  },
  {
    id: 2,
    name: '高邑县公共体育馆',
    address: '河北省石家庄市高邑县高邑镇乡镇北关村太行路152号',
    openingHours: '全天开放',
    phone: '0311-86688888',
    type: '户外健身区',
    image: 'https://js365.org.cn/oss/js365/js365/upload/20220624/02dcf9ebd3124dbea6c12190a8558371.jpg',
    province: '河北省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2010',
    area: '8000'
  },
  {
    id: 3,
    name: '石家庄市新华区文体中心体育综合馆',
    address: '河北省石家庄市新华区北苑街道钟旺路15号',
    openingHours: '08:00-21:00',
    phone: '010-84375088',
    type: '综合体育馆',
    image: 'https://js365.org.cn/oss/js365/js365/upload/20220620/13117c9a27f940fb9095307d386a8be6.jpg',
    province: '河北省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 4,
    name: '石家庄市鹿泉区篮球馆',
    address: '河北省石家庄市鹿泉区获鹿镇乡乡镇向阳大街街213号',
    openingHours: '07:30-22:00',
    phone: '021-64385200',
    type: '综合体育馆',
    image: 'https://js365.org.cn/oss/js365/js365/upload/20220621/e76e1aa77d184d6bbaa643c4d32b2192.jpg',
    province: '河北省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 5,
    name: '石家庄市中山体育馆',
    address: '河北省石家庄市桥西区维明街道自强路117号',
    openingHours: '06:30-22:30',
    phone: '020-85678900',
    type: '体育中心',
    image: 'https://www.js365.org.cn/oss/js365/upload/20240725/fc5c888aeb514a94884f49f631d50ff9.jpg',
    province: '河北省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 6,
    name: '赞皇县体育馆',
    address: '河北省石家庄市赞皇县西龙门乡镇布古庄村二中南邻',
    openingHours: '07:00-22:00',
    phone: '0755-86308888',
    type: '体育中心',
    image: 'https://js365.org.cn/oss/js365/upload/2021/05/13/85baf517-0e5d-41ad-aaa2-8ad4a87cde17.jpg',
    province: '广东省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2011',
    area: '307000'
  },
  {
    id: 7,
    name: '新乐市体育馆',
    address: '河北省石家庄市新乐市长寿街道育才街街8号',
    openingHours: '08:00-21:30',
    phone: '028-86616566',
    type: '体育场',
    image: 'https://www.js365.org.cn/oss/js365/upload/20240723/ec4d3d79f31b44438170cf922be31781.jpg',
    province: '河北省',
    city: '石家庄市',
    operator: '石家庄市市政管理处',
    year: '2005',
    area: '25000'
  },
  {
    id: 8,
    name: '石家庄市鹿泉区篮球馆',
    address: '河北省石家庄市鹿泉区获鹿镇乡乡镇向阳大街街213号',
    openingHours: '07:30-22:00',
    phone: '027-84750000',
    type: '体育中心',
    image: 'https://js365.org.cn/oss/js365/upload/2021/04/30/e25f5112-02e2-4f62-a3f0-4a7914a528c7.jpg',
    province: '湖北省',
    city: '武汉市',
    operator: '武汉市体育局',
    year: '2002',
    area: '158000'
  },
  {
    id: 9,
    name: '南京奥体中心',
    address: '南京市建邺区江东中路222号',
    openingHours: '08:00-21:00',
    phone: '025-86690000',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=9',
    province: '江苏省',
    city: '南京市',
    operator: '南京市体育局',
    year: '2005',
    area: '400000'
  },
  {
    id: 10,
    name: '杭州体育馆',
    address: '杭州市下城区体育场路210号',
    openingHours: '07:00-22:00',
    phone: '0571-85153999',
    type: '体育馆',
    image: 'https://picsum.photos/400/200?random=10',
    province: '浙江省',
    city: '杭州市',
    operator: '杭州市体育局',
    year: '1966',
    area: '73000'
  },
  {
    id: 11,
    name: '重庆奥体中心',
    address: '重庆市九龙坡区谢陈路1号',
    openingHours: '08:00-21:30',
    phone: '023-68668888',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=11',
    province: '重庆市',
    city: '重庆市',
    operator: '重庆市体育局',
    year: '2004',
    area: '135000'
  },
  {
    id: 12,
    name: '青岛体育中心',
    address: '青岛市崂山区银川东路3号',
    openingHours: '07:30-22:00',
    phone: '0532-88611111',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=12',
    province: '山东省',
    city: '青岛市',
    operator: '青岛市体育局',
    year: '2009',
    area: '280000'
  },
  {
    id: 13,
    name: '西安城市体育馆',
    address: '西安市未央区凤城八路168号',
    openingHours: '08:00-21:00',
    phone: '029-86402222',
    type: '体育馆',
    image: 'https://picsum.photos/400/200?random=13',
    province: '陕西省',
    city: '西安市',
    operator: '西安市体育局',
    year: '2017',
    area: '88000'
  },
  {
    id: 14,
    name: '沈阳奥体中心',
    address: '沈阳市浑南区营盘西街10号',
    openingHours: '07:30-21:30',
    phone: '024-24822222',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=14',
    province: '辽宁省',
    city: '沈阳市',
    operator: '沈阳市体育局',
    year: '2007',
    area: '258000'
  },
  {
    id: 15,
    name: '哈尔滨国际会展体育中心',
    address: '哈尔滨市南岗区红旗大街301号',
    openingHours: '08:00-21:00',
    phone: '0451-82273333',
    type: '体育中心',
    image: 'https://picsum.photos/400/200?random=15',
    province: '黑龙江省',
    city: '哈尔滨市',
    operator: '哈尔滨市体育局',
    year: '2004',
    area: '330000'
  }
]

const VenueOpen: React.FC = () => {
  // 筛选状态
  const [province, setProvince] = React.useState('全部')
  const [city, setCity] = React.useState('全部')
  const [venueType, setVenueType] = React.useState('全部场馆')
  const [searchText, setSearchText] = React.useState('')
  // 分页状态
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 12 // 每页12个

  // 省选择变化
  const handleProvinceChange = (value: string) => {
    setProvince(value)
    setCity('全部') // 切换省时重置市
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

  // 筛选省份
  const filteredByProvince = filteredByType.filter(
    (venue) => province === '全部' || venue.province === province
  )

  // 筛选城市
  const filteredByCity = filteredByProvince.filter(
    (venue) => city === '全部' || venue.city === city
  )

  // 搜索筛选
  const filteredVenues = filteredByCity.filter((venue) =>
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

  return (
    <div className="venue-open-page">
      {/* 筛选栏 */}
      <div className="filter-bar">
        <div className="filter-item">
          <span className="filter-label">省：</span>
          <Select
            value={province}
            style={{ width: 120 }}
            onChange={handleProvinceChange}
          >
            <Option value="全部">全部</Option>
            {Array.from(new Set(venueData.map((v) => v.province))).map(
              (prov) => (
                <Option key={prov} value={prov}>
                  {prov}
                </Option>
              )
            )}
          </Select>
        </div>

        <div className="filter-item">
          <span className="filter-label">市：</span>
          <Select
            value={city}
            style={{ width: 120 }}
            onChange={(val) => setCity(val)}
          >
            <Option value="全部">全部</Option>
            {province !== '全部' &&
              Array.from(
                new Set(
                  venueData
                    .filter((v) => v.province === province)
                    .map((v) => v.city)
                )
              ).map((city) => (
                <Option key={city} value={city}>
                  {city}
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
