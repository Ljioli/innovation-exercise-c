import { RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
const Login = lazy(() => import('@/pages/Login/login'))
const Register = lazy(() => import('@/pages/Login/register'))
const Layout = lazy(() => import('@/pages/Layout'))
const News = lazy(() => import('@/pages/News'))
const NewsDetail = lazy(() => import('@/pages/News/newsDetail'))
const Index = lazy(() => import('@/pages/Index'))
const Notice = lazy(() => import('@/pages/Notice'))
const NoticeDetail = lazy(() => import('@/pages/Notice/noticeDetail'))
const VenueOpen = lazy(() => import('@/pages/Resource/venueOpen'))
const VenueVisualization = lazy(() => import('@/pages/Resource/venueVisualization'))
const VenueDetail = lazy(() => import('@/pages/Resource/venueDetail'))
// const FitnessCommunity = lazy(() => import('@/pages/Community/fitnessCommunity'))
const IntelligentQA = lazy(() => import('@/pages/Qa/intelligentQA'))
const KnowledgeGraph = lazy(() => import('@/pages/KnowledgeGraph/knowledgeGraph'))
const ExerciseGuide = lazy(() => import('@/pages/Index/components/components/GuideDetail'))



const User = lazy(() => import('@/pages/User'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={'加载中'}>
            <Index />
          </Suspense>
        )
      },
      {
        path: 'exercise-guide',
        element: (
          <Suspense fallback={'加载中'}>
            <ExerciseGuide />
          </Suspense>
        )
      },
      {
        path: 'news',
        children: [
          {
            path: 'politics',
            element: (
              <Suspense fallback={'加载中'}>
                <News />
              </Suspense>
            )
          },
          {
            path: 'sports',
            element: (
              <Suspense fallback={'加载中'}>
                <News />
              </Suspense>
            )
          },
          {
            path: 'politics/:id',
            element: (
              <Suspense fallback={'加载中'}>
                <NewsDetail />
              </Suspense>
            )
          },
          {
            path: 'sports/:id',
            element: (
              <Suspense fallback={'加载中'}>
                <NewsDetail />
              </Suspense>
            )
          }
        ]
      },
      {
        path: 'government',
        children: [
          {
            path: 'policy',
            element: (
              <Suspense fallback={'加载中'}>
                <Notice />
              </Suspense>
            )
          },
          {
            path: 'inform',
            element: (
              <Suspense fallback={'加载中'}>
                <Notice />
              </Suspense>
            )
          },
          {
            path: 'policy/:id',
            element: (
              <Suspense fallback={'加载中'}>
                <NoticeDetail />
              </Suspense>
            )
          },
          {
            path: 'inform/:id',
            element: (
              <Suspense fallback={'加载中'}>
                <NoticeDetail />
              </Suspense>
            )
          }
        ]
      },
      {
        path: 'resource',
        children: [
          {
            path: 'venue-open',
            element: (
              <Suspense fallback={'加载中'}>
                <VenueOpen />
              </Suspense>
            )
          },
          {
            path: `venue-detail/:id`,
            element: (
              <Suspense fallback={'加载中'}>
                <VenueDetail />
              </Suspense>
            )
          },
          {
            path: 'score-visualization',
            element: (
              <Suspense fallback={'加载中'}>
                <VenueVisualization />
              </Suspense>
            )
          }
        ]
      },
      // {
      //   path: 'community',
      //   element: (
      //     <Suspense fallback={'加载中'}>
      //       <FitnessCommunity />
      //     </Suspense>
      //   )
      // },
      {
        path: 'qa',
        element: (
          <Suspense fallback={'加载中'}>
            <IntelligentQA />
          </Suspense>
        )
      },
      {
        path: 'knowledge-graph',
        element: (
          <Suspense fallback={'加载中'}>
            <KnowledgeGraph />
          </Suspense>
        )
      },
      {
        path: 'user',
        element: (
          <Suspense fallback={'加载中'}>
            <User />
          </Suspense>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]

export default routes
