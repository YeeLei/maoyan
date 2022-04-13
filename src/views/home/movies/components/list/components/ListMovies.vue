<template>
  <div class="list-movie"
       v-if="data.length > 0">
    <a class="list-item"
       v-for="(item,index) in data"
       :key="index"
       @click="selectDetail(item.movieid)">
      <div class="inner">
        <div class="group-date"
             v-if="item.comingTitle && $route.path==='/wait'"
             v-html="item.comingTitle"></div>
        <div class="avatar">
          <div class="default-img">
            <img :src="item.img | formatUrl"
                 @load="imageLoad">
          </div>
        </div>
        <div class="content"
             :class="borderBottom">
          <div class="content-wrap">
            <div class="title-wrap">
              <div class="title">{{item.nm}}</div>
              <div class="version"
                   :class="item.version ? item.version : ''"></div>
            </div>
            <div class="detail">
              <div class="wantsee"
                   v-if="$route.path!=='/movies/classic'">
                <div class="wantsee"
                     v-if="item.sc !== 0">
                  <span class="p-suffix">观众评</span>
                  <span class="persion-num">{{item.sc}} </span>
                </div>
                <div class="wantsee"
                     v-else>
                  <span class="persion-num">{{item.wish}} </span>
                  <span class="p-suffix">人想看</span>
                </div>
              </div>
              <div class="actor"
                   v-else>
                <span class="persion-num">{{item.enm}} </span>
              </div>
              <div class="actor">
                主演:{{item.star}}
              </div>
              <div class="showinfo"
                   v-if="$route.path==='/hot'">
                {{item.showInfo || item.rt + '上映'}}
              </div>
              <!-- 上映时间 -->
              <div class="showinfo"
                   v-else>
                {{item.rt === '' ?'' :item.rt +'上映'}}
              </div>
            </div>
          </div>
          <div class="button">
            <div class="btn"
                 v-if="$route.path==='/movies/hot'"
                 :class="item.preShow ? 'blue':'red'">{{item.preShow ? '预售':'购票'}}</div>
            <div class="btn"
                 v-else
                 :class="item.showStateButton ? 'blue':'yellow'">{{item.preShow ? '预售':'想看'}}</div>
          </div>
        </div>
      </div>
    </a>
    <div class="loading-container"
         v-if="loading">
      <loading></loading>
    </div>
    <div class="no-result-container"
         v-else>
      <no-result></no-result>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/base/loading/loading.vue'
import NoResult from '@/components/base/no-result/no-result.vue'

export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    hasResult: {
      type: Boolean,
      default: false
    },
    showInfo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    borderBottom () {
      if (this.$route.path !== '/classic') {
        return 'border-bottom'
      } else {
        return ''
      }
    }
  },
  methods: {
    imageLoad () {
      this.$emit('imageLoad')
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
  .list-item {
    display: block;
    overflow: hidden;
    padding-left: 15px;
    background: $white-color;
    .inner {
      position: relative;
      width: 100%;
      .group-date {
        padding-top: 10px;
        font-size: $s-font;
        color: #333;
      }
      .avatar {
        position: relative;
        width: 64px;
        height: 90px;
        margin-top: 12px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        margin-left: 74px;
        padding: 18px 14px 12px 0;
        box-sizing: border-box;
        position: relative;
        &.border-bottom {
          @include border-bottom-1px($border-color);
        }
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
            &.yellow {
              background-color: #faaf00;
            }
          }
          .grade {
            font-size: $ms-font;
            color: $color-person;
          }
          .score {
            font-size: $xxs-font;
            color: #999;
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
