import React, { useState } from 'react';
import { Row, Col, Card, Typography, Menu, Button } from 'antd';
import { PlayCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './GuideDetail.scss';

const { Title, Text } = Typography;
const { Meta } = Card;

// 模拟视频数据
const allVideos = [
  {
    id: 1,
    title: '髋关节慢性疼痛的基本原理',
    category: 'hip',
    duration: '15:30',
    difficulty: '初级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.U2BOCi5hANNEwPtsannY1gHaEo?w=268&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  },
  {
    id: 2,
    title: '髋关节康复训练',
    category: 'hip',
    duration: '12:45',
    difficulty: '中级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.sIyo4x4DB4VvbVLso0C9CAHaEK?w=321&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 3,
    title: '肩关节康复训练',
    category: 'shoulder',
    duration: '18:20',
    difficulty: '初级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.A_E8lSDvDnhhbeOh_cMDEgHaEK?w=333&h=187&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 4,
    title: '肩部力量训练',
    category: 'shoulder',
    duration: '22:15',
    difficulty: '高级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.G1Y_WZTPz3MxpOHBxCOpjAHaFj?w=231&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 5,
    title: '膝关节保护训练',
    category: 'knee',
    duration: '14:50',
    difficulty: '初级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.DyB0q4X2pSqGKk1CLhY2xAHaEL?w=307&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  },
  {
    id: 6,
    title: '核心力量训练',
    category: 'core',
    duration: '20:30',
    difficulty: '中级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.SB1pIXpaQTIQCHHdf4oELQHaEK?w=329&h=185&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  },
  {
    id: 7,
    title: '背部拉伸训练',
    category: 'back',
    duration: '16:40',
    difficulty: '初级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.4FI66OSNUYEjk1-o7Q3kiwHaEK?w=282&h=180&c=7&r=0&o=5&dpr=2&pid=1.7'
  },
  {
    id: 8,
    title: '全身协调性训练',
    category: 'full-body',
    duration: '25:15',
    difficulty: '高级',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.SB1pIXpaQTIQCHHdf4oELQHaEK?w=329&h=185&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3'
  }
];

// 身体部位菜单
const bodyParts = [
  { key: 'all', label: '全部训练' },
  { key: 'hip', label: '髋关节训练' },
  { key: 'shoulder', label: '肩关节训练' },
  { key: 'knee', label: '膝关节训练' },
  { key: 'core', label: '核心训练' },
  { key: 'back', label: '背部训练' },
  { key: 'full-body', label: '全身训练' }
];

const GuideDetail: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 过滤视频数据
  const filteredVideos = selectedPart === 'all' 
    ? allVideos 
    : allVideos.filter(video => video.category === selectedPart);

  // 处理视频播放
  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  // 处理返回
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="guide-detail">
      {/* 页面头部 */}
      <div className="guide-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={handleBack}
          className="back-btn"
        >
          返回
        </Button>
        <Title level={2} className="page-title">科学健身指导</Title>
      </div>

      <div className="guide-content">
        <Row gutter={24}>
          {/* 左侧导航栏 */}
          <Col xs={24} sm={8} md={6} className="navigation-sidebar">
            <div className="sidebar-card">
              <Title level={4} className="sidebar-title">训练部位</Title>
              <Menu
                mode="inline"
                selectedKeys={[selectedPart]}
                onClick={({ key }) => setSelectedPart(key)}
                items={bodyParts}
                className="body-parts-menu"
              />
            </div>
          </Col>

          {/* 右侧内容区域 */}
          <Col xs={24} sm={16} md={18} className="video-content">
            <div className="content-header">
              <Title level={3}>
                {bodyParts.find(part => part.key === selectedPart)?.label}
              </Title>
              <Text type="secondary">
                共 {filteredVideos.length} 个训练视频
              </Text>
            </div>

            <div className="video-grid">
              <Row gutter={[16, 24]}>
                {filteredVideos.map((video) => (
                  <Col xs={8} sm={8} md={8} lg={8} xl={8} key={video.id}>
                    <Card
                      hoverable
                      className="video-card"
                      cover={
                        <div className="video-thumbnail">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="thumbnail-img"
                          />
                          <div className="play-overlay" onClick={() => handleVideoPlay(video)}>
                            <PlayCircleOutlined className="play-icon" />
                          </div>
                          <div className="video-duration">
                            {video.duration}
                          </div>
                        </div>
                      }
                    >
                      <Meta
                        title={
                          <Text strong ellipsis={{ tooltip: video.title }}>
                            {video.title}
                          </Text>
                        }
                        description={
                          <div className="video-info">
                            <span className={`difficulty-tag difficulty-${video.difficulty}`}>
                              {video.difficulty}
                            </span>
                            <span className="duration">{video.duration}</span>
                          </div>
                        }
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            {/* 空状态 */}
            {filteredVideos.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🎯</div>
                <Text type="secondary">暂无该部位的训练视频</Text>
              </div>
            )}
          </Col>
        </Row>
      </div>

      {/* 视频播放模态框 */}
      {isModalVisible && selectedVideo && (
        <div className="video-modal" onClick={() => setIsModalVisible(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <Title level={4}>{selectedVideo.title}</Title>
              <Button 
                type="text" 
                className="close-btn"
                onClick={() => setIsModalVisible(false)}
              >
                ✕
              </Button>
            </div>
            <div className="video-player">
              <video
                controls
                autoPlay
                style={{ width: '100%', height: 'auto' }}
              >
                <source src={selectedVideo.videoPath} type="video/mp4" />
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideDetail;