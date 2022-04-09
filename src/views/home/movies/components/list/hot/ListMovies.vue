<template>
  <div class="list-movie"
       ref="listmovie">
    <a href="#"
       class="list-item"
       v-for="(item,index) in movies"
       :key="index"
       @click="selectDetail(item.movieid)">
      <div class="inner">
        <div class="avatar">
          <div class="default-img">
            <img :src="item.img | formatUrl"
                 alt="">
          </div>
        </div>
        <div class="content">
          <div class="content-wrap">
            <div class="title-wrap">
              <div class="title">{{item.nm}}</div>
              <div class="version"
                   :class="item.version ? item.version : ''"></div>
            </div>
            <div class="detail">
              <div class="wantsee"
                   v-if="!item.preShow && item.sc !== 0">
                <span class="p-suffix">观众评</span>
                <span class="persion-num">{{item.sc}} </span>
              </div>
              <div class="wantsee"
                   v-else>
                <span class="persion-num">{{item.wish}} </span>
                <span class="p-suffix">人想看</span>
              </div>
              <div class="actor">
                主演:{{item.star}}
              </div>
              <div class="showinfo"
                   v-html="item.showInfo">
              </div>
            </div>
          </div>
          <div class="button">
            <div class="btn"
                 :class="item.preShow ? 'blue': 'red'">{{item.preShow ? '预售':'购票'}}</div>
          </div>
        </div>
      </div>
    </a>
    <div class="loading-container"
         v-show="loading">
      <loading></loading>
    </div>
    <div class="no-result-container"
         v-show="hasResult">
      <no-result></no-result>
    </div>
  </div>
</template>

<script>
import { getMoviesApi, getMoreMoviesApi } from '@/service/api'
import Loading from '@/components/base/loading/loading.vue'
import NoResult from '@/components/base/no-result/no-result.vue'
export default {
  data () {
    return {
      movies: [],
      count: 0, // 总数据条数
      size: 6, // 每次下拉更新的数量
      ids: [], // 所有电影的id的数组
      startIndex: 0, // 从第几项开始截取
      loading: false,
      hasResult: false
    }
  },
  mounted () {
    this.getMovies()
  },
  methods: {
    async getMovies () {
      const res = await getMoviesApi()
      this.movies = res.result
      this.ids = res.ids
      this.startIndex = res.result.length
    },
    loadMore () {
      if (this.movies.length === this.ids.length) {
        this.loading = false
        // console.log('没有数据了')
        this.hasResult = true
        this.$refs.listmovie.style.paddingBottom = 0
        return
      }
      this.loading = true
      setTimeout(async () => { // 延迟加载1秒，提高用户体验
        const ids = this.ids.slice(this.startIndex, this.startIndex + this.size).join(',')
        const res = await getMoreMoviesApi({ ids })
        // 更新数据
        this.movies = [...this.movies, ...res.result]
        this.startIndex = this.movies.length
        // 先等组件渲染完毕
        await this.$nextTick()
        this.loading = false
        // 重新刷新父组件的scroll
        this.$emit('refresh')
      }, 1000)
    },
    selectDetail (id) {
      this.$router.push({
        path: `/detail/${id}`
      })
    }
  },
  filters: {
    formatUrl (val) {
      return val.replace('w.h', '64.90')
    }
  },
  components: {
    Loading,
    NoResult
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.list-movie {
  padding-bottom: 30px;
  .list-item {
    display: block;
    overflow: hidden;
    padding-left: 15px;
    background: $white-color;
    .inner {
      position: relative;
      width: 100%;
      .avatar {
        position: relative;
        width: 64px;
        height: 95px;
        margin-top: 12px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        margin-left: 74px;
        padding: 12px 14px 12px 0;
        box-sizing: border-box;
        position: relative;
        @include border-bottom-1px($border-color);
        .content-wrap {
          max-width: 220px;
          .title-wrap {
            overflow: hidden;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title {
              font-size: $m-font;
              color: #333;
              font-weight: 700;
              padding-right: 5px;
              flex-shrink: 1;
              @include no-wrap();
            }
            .version {
              height: 14px;
              width: 17px;
              display: inline-block;
              flex: 0 0 auto;
              margin-right: 3px;
              margin-top: -2px;
              &.v2d.imax {
                width: 43px;
                background: url("../../../../../../assets/images/v2dimax.png")
                  no-repeat;
                background-size: contain;
              }
              &.v3d.imax {
                width: 43px;
                background: url("../../../../../../assets/images/v3d.png")
                  no-repeat;
                background-size: contain;
              }
            }
          }
          .detail {
            .wantsee {
              line-height: 16px;
              @include no-wrap();
              .persion-num {
                color: $color-person;
                font-size: $ms-font;
                font-weight: 600;
              }
              .p-suffix {
                font-size: $sm-font;
                display: inline-block;
                color: $gray-color;
              }
            }
            .actor,
            .showinfo {
              font-size: $sm-font;
              color: $gray-color;
              margin-top: 6px;
              line-height: 15px;
              @include no-wrap();
            }
          }
        }

        .button {
          position: absolute;
          font-size: $s-font;
          right: 14px;
          top: 0;
          bottom: 0;
          height: 27px;
          margin: auto;
          .btn {
            width: 54px;
            height: 28px;
            @include center();
            color: #fff;
            white-space: nowrap;
            font-size: $sm-font;
            font-weight: 500;
            cursor: pointer;
            border-radius: 13.5px;
            &.red {
              background-color: #f03d37;
            }
            &.blue {
              background-color: #3c9fe6;
            }
          }
        }
      }
    }
  }
  .no-result-container {
    margin-top: 10px;
  }
}
</style>
