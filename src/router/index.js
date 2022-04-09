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
    component: Detail
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
        redirect: '/hot',
        meta: {
          index: 11
        },
        children: [
          {
            path: '/hot',
            component: Hot,
            meta: {
              index: 0
            }
          },
          {
            path: '/cinema',
            component: Cinema,
            meta: {
              index: 1
            }
          },
          {
            path: '/wait',
            component: Wait,
            meta: {
              index: 2
            }
          },
          {
            path: '/classic',
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
  routes
})

export default router
