// Community/components/CommunityFeed.tsx
import React, { useState, useRef, useEffect } from 'react'
import {
  Card,
  Avatar,
  Button,
  Input,
  Tag,
  Upload,
  Space,
  List,
  message,
  Divider,
  Badge,
  Drawer
} from 'antd'
import {
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  StarOutlined,
  StarFilled,
  UploadOutlined,
  CloseOutlined,
  SendOutlined
} from '@ant-design/icons'
import './CommunityFeed.scss'

const { TextArea } = Input

// 评论数据结构
interface Comment {
  id: number
  user: { name: string; avatar: string }
  content: string
  time: string
}

// 帖子数据结构
interface Post {
  id: number
  user: { name: string; avatar: string }
  content: string
  tags: string[]
  images: string[]
  videos?: string[]
  liked: boolean
  starred: boolean
  likes: number
  comments: Comment[]
  stars: number
  time: string
}


const CommunityFeed: React.FC = () => {
  // 状态管理
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: '张三', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1' },
      content: '今天练了胸肌，感觉状态爆棚！分享一下我的训练计划：平板卧推4组×12次，上斜哑铃卧推3组×15次，蝴蝶机夹胸3组×15次，绳索夹胸3组×20次。最后做了30分钟有氧，完美结束！',
      tags: ['胸肌', '力量训练'],
      images: ['https://picsum.photos/300/200'],
      liked: false,
      starred: false,
      likes: 12,
      comments: [
        {
          id: 101,
          user: { name: '健身达人', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=5' },
          content: '强度不错！可以试试超级组，效果更好',
          time: '40分钟前'
        }
      ],
      stars: 2,
      time: '1小时前'
    },
    {
      id: 2,
      user: { name: '李四', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4' },
      content: '来一组深蹲🔥🔥 今天挑战了新重量，感觉腿部力量增长明显！',
      tags: ['腿部', '耐力'],
      images: ['https://picsum.photos/300/201'],
      videos: ['https://www.w3schools.com/html/mov_bbb.mp4'],
      liked: true,
      starred: false,
      likes: 25,
      comments: [
        {
          id: 201,
          user: { name: '教练王', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=6' },
          content: '注意膝盖角度，不要超过脚尖太多',
          time: '昨天'
        }
      ],
      stars: 4,
      time: '昨天'
    }
  ])

  const [newContent, setNewContent] = useState('')
  const [newTags, setNewTags] = useState<string[]>([])
  const [uploadFiles, setUploadFiles] = useState<{url: string; type: 'image' | 'video'}[]>([])
  const [commentDrawerOpen, setCommentDrawerOpen] = useState(false)
  const [activeCommentPost, setActiveCommentPost] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)
  const [tagInputValue, setTagInputValue] = useState('')

  // 处理文件上传
  const handleFileChange = ({ file }: any) => {
    if (file.status === 'done') {
      // 实际项目中应使用上传后的URL
      const fileType = file.type.startsWith('image') ? 'image' : 'video'
      setUploadFiles(prev => [...prev, {
        url: URL.createObjectURL(file.originFileObj),
        type: fileType
      }])
      message.success('文件上传成功')
    } else if (file.status === 'error') {
      message.error('文件上传失败')
    }
  }

  // 移除上传的文件
  const removeUpload = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index))
  }

  // 添加标签
  const handleAddTag = () => {
    if (tagInputValue.trim() && !newTags.includes(tagInputValue.trim())) {
      setNewTags(prev => [...prev, tagInputValue.trim()])
      setTagInputValue('')
      setShowTagInput(false)
    }
  }

  // 发布帖子
  const handlePublish = () => {
    if (!newContent.trim() && uploadFiles.length === 0) {
      message.warning('请输入内容或上传媒体后发布')
      return
    }

    const newPost: Post = {
      id: Date.now(),
      user: { name: '测试用户', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=9' },
      content: newContent,
      tags: newTags,
      images: uploadFiles.filter(f => f.type === 'image').map(f => f.url),
      videos: uploadFiles.filter(f => f.type === 'video').map(f => f.url),
      liked: false,
      starred: false,
      likes: 0,
      comments: [],
      stars: 0,
      time: '刚刚'
    }

    setPosts(prev => [newPost, ...prev])
    // 重置表单
    setNewContent('')
    setNewTags([])
    setUploadFiles([])
    message.success('发布成功！')
  }

  // 点赞功能
  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  // 收藏功能
  const toggleStar = (id: number) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, starred: !post.starred, stars: post.starred ? post.stars - 1 : post.stars + 1 }
        : post
    ))
  }

  // 打开评论区抽屉
  const openComments = (id: number) => {
    setActiveCommentPost(id)
    setCommentDrawerOpen(true)
  }

  // 关闭评论区抽屉
  const closeComments = () => {
    setCommentDrawerOpen(false)
    setActiveCommentPost(null)
  }

  // 发布评论
  const handlePostComment = (postId: number) => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now(),
      user: { name: '测试用户', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=9' },
      content: newComment,
      time: '刚刚'
    }

    setPosts(prev => prev.map(post => 
      post.id === postId
        ? { ...post, comments: [...post.comments, newCommentObj] }
        : post
    ))
    setNewComment('')
  }

  // 获取当前激活的帖子
  const activePost = posts.find(post => post.id === activeCommentPost)

  return (
    <div className="community-feed-container">
      {/* 左侧：帖子列表区域 */}
      <div className="feed-main-content">
        {/* 发帖输入区 */}
        <Card className="post-editor">
          <TextArea
            rows={3}
            value={newContent}
            onChange={e => setNewContent(e.target.value)}
            placeholder="记录一下你的健身日常..."
          />
          
          {/* 上传预览区 */}
          {uploadFiles.length > 0 && (
            <div className="upload-preview">
              {uploadFiles.map((file, index) => (
                <div key={index} className="upload-item">
                  {file.type === 'image' ? (
                    <img src={file.url} alt="preview" />
                  ) : (
                    <video src={file.url} controls />
                  )}
                  <Button 
                    icon={<CloseOutlined />} 
                    size="small" 
                    onClick={() => removeUpload(index)}
                    className="remove-upload"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="post-editor-actions">
            <Space>
              <Upload 
                showUploadList={false} 
                beforeUpload={() => false}
                onChange={handleFileChange}
                accept="image/*,video/*"
              >
                <Button icon={<UploadOutlined />}>上传图片/视频</Button>
              </Upload>
              
              {showTagInput ? (
                <Space>
                  <Input
                    value={tagInputValue}
                    onChange={e => setTagInputValue(e.target.value)}
                    placeholder="输入标签"
                    onPressEnter={handleAddTag}
                    style={{ width: 120 }}
                  />
                  <Button onClick={handleAddTag}>添加</Button>
                </Space>
              ) : (
                <Button onClick={() => setShowTagInput(true)}>添加标签</Button>
              )}
            </Space>
            <Button type="primary" onClick={handlePublish}>发布</Button>
          </div>

          {/* 标签预览 */}
          {newTags.length > 0 && (
            <div className="post-editor-tags">
              {newTags.map(tag => (
                <Tag
                  key={tag}
                  closable
                  onClose={() => setNewTags(prev => prev.filter(t => t !== tag))}
                >
                  #{tag}
                </Tag>
              ))}
            </div>
          )}
        </Card>

        {/* 帖子列表 */}
        <div className="posts-list-container">
          <List
            dataSource={posts}
            renderItem={post => (
              <Card
                key={post.id}
                className="post-card"
                actions={[
                  <span onClick={() => toggleLike(post.id)} className="action-button">
                    {post.liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />} 
                    {post.likes}
                  </span>,
                  <span onClick={() => openComments(post.id)} className="action-button">
                    <MessageOutlined /> 
                    {post.comments.length}
                  </span>,
                  <span onClick={() => toggleStar(post.id)} className="action-button">
                    {post.starred ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />} 
                    {post.stars}
                  </span>
                ]}
              >
                <Card.Meta
                  avatar={<Avatar src={post.user.avatar} />}
                  title={`${post.user.name} · ${post.time}`}
                  description={
                    <div className="post-content">
                      <p>{post.content}</p>
                      
                      {/* 标签区域 */}
                      <div className="post-tags">
                        {post.tags.map(t => <Tag key={t} color="blue">#{t}</Tag>)}
                      </div>
                      
                      {/* 图片区域 */}
                      {post.images.length > 0 && (
                        <div className="post-images">
                          {post.images.map((img, i) => (
                            <img key={i} src={img} alt={`post-${post.id}-img-${i}`} />
                          ))}
                        </div>
                      )}
                      
                      {/* 视频区域 */}
                      {post.videos && post.videos.length > 0 && (
                        <div className="post-videos">
                          {post.videos.map((video, i) => (
                            <video 
                              key={i} 
                              src={video} 
                              controls 
                              className="post-video"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            )}
          />
        </div>
      </div>

      {/* 评论区抽屉 */}
      <Drawer
        title={`评论 (${activePost?.comments.length || 0})`}
        placement="right"
        onClose={closeComments}
        open={commentDrawerOpen}
        width={400}
        styles={{
          body: { 
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }
        }}
      >
        {activePost && (
          <div className="comment-drawer-content">
            {/* 帖子预览 */}
            <div className="comment-post-preview">
              <Card size="small">
                <Card.Meta
                  avatar={<Avatar src={activePost.user.avatar} />}
                  title={activePost.user.name}
                  description={
                    <div>
                      <p className="preview-content">{activePost.content.substring(0, 80)}...</p>
                      {activePost.tags.length > 0 && (
                        <div className="preview-tags">
                          {activePost.tags.slice(0, 2).map(t => (
                            <Tag key={t}>#{t}</Tag>
                          ))}
                          {activePost.tags.length > 2 && <Tag>+{activePost.tags.length - 2}</Tag>}
                        </div>
                      )}
                    </div>
                  }
                />
              </Card>
            </div>
            
            <Divider style={{ margin: '12px 0' }} />
            
            {/* 评论列表 */}
            <div className="comments-list">
              {activePost.comments.length > 0 ? (
                activePost.comments.map(comment => (
                  <div key={comment.id} className="comment-item">
                    <Avatar src={comment.user.avatar} size="small" />
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.user.name}</span>
                        <span className="comment-time">{comment.time}</span>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments">暂无评论，快来抢沙发吧~</div>
              )}
            </div>
            
            {/* 评论输入区 */}
            <div className="comment-input-area">
              <TextArea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="写下你的评论..."
                rows={3}
                style={{ marginBottom: 12 }}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />} 
                onClick={() => handlePostComment(activePost.id)}
                disabled={!newComment.trim()}
                block
              >
                发送评论
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default CommunityFeed