import Vue from 'vue'
import VueRouter from 'vue-router'

const HomeIndex = () => import('../views/home/HomeIndex.vue')
const Detail = () => import('../views/detail/Detail.vue')
const City = () => import('../views/city/City.vue')
const NotFound = () => import('../views/404/NotFound.vue')
const Movies = () => import('../views/home/movies/Movies.vue')
const Video = () => import('../views/home/video/Video.vue')
const MiniVideo = () => import('../views/home/mini-video/MiniVideo.vue')
const Show = () => import('../views/home/show/Show.vue')
const Mine = () => import('../views/home/mine/Mine.vue')
const Hot = () => import('../views/home/movies/components/list/hot/MoviesHot.vue')
const Cinema = () => import('../views/home/movies/components/list/cinema/MoviesCinema.vue')
const Wait = () => import('../views/home/movies/components/list/wait/MoviesWait.vue')
const Classic = () => import('../views/home/movies/components/list/classic/MoviesClassic.vue')

Vue.use(VueRouter)

// 解决编程时导航重复点击的报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/detail/:id',
    component: Detail,
    props: true
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/home',
    component: HomeIndex,
    redirect: '/movies',
    children: [
      {
        path: '/movies',
        component: Movies,
        meta: {
          index: 11
        },
        children: [
          {
            path: '/',
            redirect: '/movies/hot'
          },
          {
            path: '/movies/hot',
            component: Hot,
            meta: {
              index: 0
            }
          },
          {
            path: '/movies/cinema',
            component: Cinema,
            meta: {
              index: 1
            }
          },
          {
            path: '/movies/wait',
            component: Wait,
            meta: {
              index: 2
            }
          },
          {
            path: '/movies/classic',
            component: Classic,
            meta: {
              index: 3
            }
          }
        ]
      },
      {
        path: '/video',
        component: Video,
        meta: {
          index: 12
        }
      },
      {
        path: '/mini-video',
        component: MiniVideo,
        meta: {
          index: 13
        }
      },
      {
        path: '/show',
        component: Show,
        meta: {
          index: 14
        }
      },
      {
        path: '/mine',
        component: Mine,
        meta: {
          index: 15
        }
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
