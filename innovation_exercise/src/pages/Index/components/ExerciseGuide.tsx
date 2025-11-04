// ExerciseGuide.tsx
import React, { useState } from 'react';
import { Card, Col, Row, Typography, Button } from 'antd';
import { DribbbleSquareOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TotalTitle from './components/TotalTitle';
import './ExerciseGuide.scss';

const { Title, Text } = Typography;
const { Meta } = Card;

const videoData = [
  {
    id: 1,
    title: '髋关节慢性疼痛的基本原理',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.U2BOCi5hANNEwPtsannY1gHaEo?w=268&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3',
    duration: '15:30',
    difficulty: '初级'
  },
  {
    id: 2,
    title: '大众全身健身操',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.sIyo4x4DB4VvbVLso0C9CAHaEK?w=321&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
    duration: '12:45',
    difficulty: '中级'
  },
  {
    id: 3,
    title: '健身器材使用指南（一）',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.4FI66OSNUYEjk1-o7Q3kiwHaEK?w=282&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
    duration: '18:20',
    difficulty: '初级'
  },
  {
    id: 4,
    title: '训练动作及其要点',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.SB1pIXpaQTIQCHHdf4oELQHaEK?w=329&h=185&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3',
    duration: '22:15',
    difficulty: '高级'
  },
  {
    id: 5,
    title: '髋关节慢性伤病运动处方',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.DyB0q4X2pSqGKk1CLhY2xAHaEL?w=307&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3',
    duration: '14:50',
    difficulty: '初级'
  },
  {
    id: 6,
    title: '训练动作视频演示',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.A_E8lSDvDnhhbeOh_cMDEgHaEK?w=333&h=187&c=7&r=0&o=5&dpr=2&pid=1.7',
    duration: '20:30',
    difficulty: '中级'
  },
  {
    id: 7,
    title: '肩关节疼痛的致病因素',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.G1Y_WZTPz3MxpOHBxCOpjAHaFj?w=231&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
    duration: '16:40',
    difficulty: '初级'
  },
  {
    id: 8,
    title: '健身器材使用指南（二）',
    videoPath: require('@/assets/video/huqiu.MP4'),
    thumbnail: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.G1Y_WZTPz3MxpOHBxCOpjAHaFj?w=231&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
    duration: '25:15',
    difficulty: '高级'
  }
];

const ExerciseGuide: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // 处理视频播放
  const handleVideoPlay = (video: any) => {
    setSelectedVideo(video);
    setIsModalVisible(true);
  };

  return (
    <div className="exercise-guide">
      <TotalTitle
        titleText="科学健身指导"
        linkPath="/exercise-guide"
        icon={<DribbbleSquareOutlined />}
      />

      <div className="video">
        <div className="video-grid">
          <Row gutter={[16, 24]}>
            {videoData.map((video) => (
              <Col xs={24} sm={12} md={6} lg={6} xl={6} key={video.id}>
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

export default ExerciseGuide;