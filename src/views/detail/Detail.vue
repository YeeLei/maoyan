<template>
  <scroll class="detail"
          ref="scroll">
    <div class="movie-detail">
      <home-logo />
      <div class="movie-inner"
           v-if="detailInfo.backgroundColor">
        <div class="movie-content"
             :style="'background:'+detailInfo.backgroundColor">
          <div class="crumbs-nav">
            <a href="/">猫眼电影 > <span v-html="detailInfo.nm"></span></a>
          </div>
          <div class="movie-top-info">
            <div class="movie-cover">
              <a href="#">
                <img :src="detailInfo.img | filterCover"
                     alt=""
                     class="poster">
                <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/poster-play.png"
                     alt=""
                     class="poster-play">
              </a>
            </div>
            <div class="movie-desc"
                 v-if="detailInfo.nm">
              <div class="movie-desc-top">
                <div class="movie-title">
                  <h1 v-html="detailInfo.nm"></h1>
                </div>
                <div class="movie-name"
                     v-html="detailInfo.filmAlias"></div>
                <div class="movie-other-info">
                  <div class="movie-type">
                    <div class="movie-cat"
                         v-html="detailInfo.cat">
                    </div>
                    <div class="movie-tag">
                      <img :src="detailInfo.ver === '2D'?'https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/movie-tag-2DIMAX.png':''"
                           alt="">
                    </div>
                  </div>
                  <div class="movie-actors">
                    <a href="#"
                       v-for="(name,index) in detailInfo.star.split(',')"
                       :key="name">
                      {{name}} <span v-if="index !== detailInfo.star.split(',').length-1">/</span>
                    </a>
                  </div>
                  <div class="movie-showtime">
                    <span>{{detailInfo.pubDesc}} / {{detailInfo.dur}}分钟</span>
                  </div>
                </div>
              </div>
              <div class="btns">
                <button>
                  <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/want-to-watch.png"
                       alt="">
                  <span>想看</span>
                </button>
                <button>
                  <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/want-to-watch.png"
                       alt="">
                  <span>看过</span>
                </button>
              </div>
            </div>
          </div>
          <div class="related-info"
               v-if="detailInfo.wish">
            <div class="related-top"
                 v-if="detailInfo.sc">
              <div class="left">
                <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/logo-new.png"
                     alt="">
                <span>猫眼购票评分</span>
              </div>
              <div class="right">
                <div class="num">
                  <countTo :startVal="0"
                           :endVal="detailInfo.wish"
                           :duration="1000">
                  </countTo>
                  <span>人想看</span>
                </div>
                <div class="num watched">
                  <countTo :startVal="0"
                           :endVal="detailInfo.watched"
                           :duration="1000">
                  </countTo>
                  <span>人看过</span>
                </div>
                <a href="#"
                   class="iconfont icon-youjiantou"></a>
              </div>
            </div>
            <div class="related-middle">
              <div class="section-left"
                   v-if="detailInfo.sc">
                <div class="left">
                  <span class="score">{{detailInfo.sc}}</span>
                  <div class="people-grade">
                    <countTo :startVal="0"
                             :endVal="detailInfo.snum"
                             :duration="1000">
                    </countTo>
                    &nbsp;<span>人评</span>
                  </div>
                </div>
                <div class="right">
                  <a v-for="(i,index1) in 5"
                     :key="index1">
                    <div class="stars-percent-bar">
                      <div class="stars">
                        <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/white-star.png"
                             alt=""
                             v-for="(i,index2) in (6-i)"
                             :key="index2">
                      </div>
                      <div class="bar">
                        <div class="precent"
                             :style="setPrecent(index1)"
                             ref="precent"></div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div class="section-left"
                   v-else>
                <div class="grade">
                  <countTo :startVal="0"
                           :endVal="detailInfo.wish"
                           :duration="1000"
                           style="color:#ffb400">
                  </countTo>
                  <span>人想看</span>
                </div>
              </div>
              <!-- <div class="section-right-top"
                   v-if="detailInfo.sc">
                <div class="top-box">
                  <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/top1-reputation.png"
                       alt="">
                  <div class="rank">
                    <span class="top">TOP</span>
                    <span class="rank-num">1</span>
                  </div>
                  <div class="desc">
                    <div class="first-word">2022年14周</div>
                    <div class="second-word">中国大陆票房榜</div>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
          <div class="introduction"
               v-if="detailInfo.dra">
            <div class="title">
              <span>简介</span>
              <div>
                <button :class="draOpen ? 'close': 'open'"
                        @click="draOpen=!draOpen"> {{draOpen?'收起':'展开'}}
                  <img src="https://s0.meituan.net/bs/myfe/canary/file/asgard/images/movie/arrow-right.png"
                       alt="">
                </button>
              </div>
            </div>
            <div class="content">
              <p id="introduction-content"
                 class="normal-line"
                 :class="draOpen?'':'line-clamp'"
                 v-html="detailInfo.dra">
              </p>
            </div>
          </div>
          <div class="video"
               v-if="detailInfo.videoImg">
            <div class="title">
              <span>视频推荐</span>
            </div>
            <div class="video">
              <a>
                <video :src="detailInfo.videourl"
                       controls
                       :poster="detailInfo.videoImg">
                </video>
              </a>
            </div>
          </div>
          <div class="photos"
               v-if="detailInfo.photos">
            <div class="title">
              <span>剧照</span>
              <div><button class="open">全部{{detailInfo.photos.length}}张 <span class="iconfont icon-youjiantou"></span></button></div>
            </div>
            <div class="photos-list">
              <scroll :scrollX="true">
                <ul>
                  <li v-for="photo in detailInfo.photos"
                      :key="photo">
                    <a href="#">
                      <img :src="photo | filterCover"
                           alt="">
                    </a>
                  </li>
                </ul>
              </scroll>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import HomeLogo from '@/views/home/components/logo/HomeLogo.vue'
import Scroll from '@/components/base/scroll/scroll.vue'
import countTo from 'vue-count-to'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'm-detail',
  components: {
    HomeLogo,
    Scroll,
    countTo
  },
  props: ['id'],
  data () {
    return {
      draOpen: false,
      play: false
    }
  },
  computed: {
    ...mapState({
      detailInfo: (state) => state.detail.detailInfo
    })
  },
  filters: {
    filterCover (val) {
      return val.replace('w.h', '')
    }
  },
  methods: {
    ...mapMutations(['clearDetailInfo']),
    ...mapActions(['getDetailInfoAsync']),
    setPrecent (index) {
      this.$nextTick(() => {
        if (this.detailInfo.distributions[index]) {
          this.$refs.precent[index].style.width = this.detailInfo.distributions[index].proportion + '%'
        } else {
          return ''
        }
      })
    }
  },
  created () {
    this.getDetailInfoAsync({ id: this.id })
  },
  watch: {
    $route (to) {
      if (!/^\/detail/.test(to.path)) {
        this.clearDetailInfo()
      } else {
        this.getDetailInfoAsync({ id: this.id })
        this.$refs.scroll.scroll.scrollTo(0, 0)
      }
    }
  }
}

</script>
<style lang='scss' scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .movie-detail {
    .movie-content {
      position: relative;
      padding: 21px 16px;
      color: #fff;
      .crumbs-nav {
        margin-bottom: 15px;
        font-size: $s-font;
        a {
          color: #ccc;
        }
      }
      .movie-top-info {
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        .movie-cover {
          position: relative;
          float: left;
          width: 100px;
          height: 138px;
          flex-shrink: 0;
          .poster {
            width: 100%;
            height: 138px;
          }
          .poster-play {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 30px;
            width: 30px;
          }
        }
        .movie-desc {
          padding-left: 5px;
          margin-left: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          .movie-desc-top {
            padding-top: 5px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .movie-title {
              max-width: 206px;
              font-size: $xl-font;
              font-weight: 700;
              height: 32px;
              h1 {
                max-width: 200px;
                @include no-wrap();
              }
            }
            .movie-name {
              font-size: $xs-font;
              opacity: 0.6;
              @include no-wrap();
              line-height: 16px;
            }
            .movie-other-info {
              line-height: 16px;
              .movie-type {
                font-size: $xs-font;
                display: flex;
                align-items: center;
                .movie-cat,
                .movie-tag {
                  opacity: 0.6;
                }
                .movie-tag {
                  border-radius: 2px;
                  margin-left: 4px;
                  vertical-align: text-bottom;
                  img {
                    margin-top: 2px;
                    height: 14px;
                  }
                }
              }
              .movie-actors {
                opacity: 0.6;
                font-size: $xs-font;
                @include no-wrap();
                a {
                  color: $white-color;
                }
              }
              .movie-showtime {
                opacity: 0.6;
                font-size: $xs-font;
              }
            }
          }
          .btns {
            display: flex;
            justify-content: space-between;
            button {
              @include center();
              background: hsla(0, 0%, 100%, 0.35);
              box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
              border-radius: 4px;
              font-size: $s-font;
              width: 47.61904762%;
              height: 30px;
              color: $white-color;
              border: none;
              margin-top: 2px;
              img {
                width: 14px;
                height: 14px;
                margin-right: 6px;
              }
            }
          }
        }
      }
      .related-info {
        background-color: rgba(0, 0, 0, 0.18);
        border-radius: 8px;
        margin-top: 15px;
        padding: 9px 10px 10px 0;
        .related-top {
          @include center();
          justify-content: space-between;
          font-family: PingFangSC-Regular;
          padding-left: 10px;
          .left {
            font-size: $xs-font;
            @include center();
            justify-content: flex-start;
            font-weight: 400;
            img {
              width: 16px;
              height: 16px;
              margin-right: 4px;
            }
          }
          .right {
            @include center();
            justify-content: flex-end;
            font-size: $xs-font;
            margin-right: 2px;
            .num {
              opacity: 0.6;
              font-size: $xs-font;
              &.watched {
                margin-left: 13px;
              }
            }
            .iconfont {
              color: $gray-color;
            }
          }
        }
        .related-middle {
          @include center();
          padding: 11px 0 3px;
          .section-left {
            @include center();
            .left {
              @include center();
              flex-direction: column;
              align-items: flex-end;
              margin-right: 4px;
              .score {
                font-weight: 600;
                font-family: MaoYanHeiTi-H-H;
                font-size: 26px;
                color: #ffb400;
                line-height: 26px;
                letter-spacing: 0;
                text-align: center;
                margin-bottom: 4px;
              }
              .people-grade {
                font-weight: 400;
                opacity: 0.6;
                font-family: PingFangSC-Regular;
                font-size: $xl-font;
                display: flex;
                word-break: keep-all;
                color: hsla(0, 0%, 100%, 0.4);
                letter-spacing: 0;
                text-align: center;
                line-height: 10px;
                zoom: 0.5;
              }
            }
            .right {
              .stars-percent-bar {
                display: flex;
                align-items: center;
                margin-bottom: 3px;
                .stars {
                  @include center();
                  justify-content: flex-end;
                  width: 35px;
                  img {
                    height: 5px;
                    width: 5px;
                    margin-left: 1.5px;
                    opacity: 0.4;
                  }
                }
                .bar {
                  width: 71px;
                  height: 4px;
                  background-color: hsla(0, 0%, 100%, 0.06);
                  border-radius: 1px;
                  margin-left: 4px;
                  .precent {
                    width: 0;
                    height: 100%;
                    background: hsla(0, 0%, 100%, 0.3);
                    border-radius: 1px;
                    transition: width 1.5s;
                  }
                }
              }
            }
            .grade {
              margin-top: -11px;
              span {
                color: rgb(255, 180, 0);
                font-weight: 700;
                font-size: $xl-font;
                &:last-child {
                  color: #fff;
                  font-size: $xs-font;
                }
              }
            }
          }
          .section-right-top {
            margin-left: 10px;
            .top-box {
              width: 120px;
              height: 44px;
              background-image: linear-gradient(
                270deg,
                rgba(0, 0, 0, 0.04),
                rgba(226, 177, 117, 0.11)
              );
              border-radius: 6px;
              padding: 4px;
              position: relative;
              border: 1px solid #b49c70;
              img {
                width: 29px;
                height: 36px;
              }
              .rank {
                position: absolute;
                left: 4px;
                top: 9px;
                display: flex;
                flex-direction: column;
                font-family: PingFangSC-Medium;
                width: 29px;
                height: 36px;
                .top {
                  font-size: $l-font;
                  line-height: 10px;
                  font-weight: 600;
                  text-shadow: 0 1px 4px #8e5d25;
                  font-family: PingFangSC-Semibold;
                  color: rgba(255, 229, 150, 0.7);
                  letter-spacing: 0;
                  transform: scale(0.5);
                  width: 19px;
                  transform-origin: 50%;
                }
                .rank-num {
                  font-size: $ms-font;
                  line-height: 13px;
                  font-family: MaoYanHeiTi-H-H;
                  color: #ffe186;
                  letter-spacing: 0;
                  text-align: center;
                  margin-top: 3px;
                }
              }
              .desc {
                position: absolute;
                left: 38px;
                top: 8px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                white-space: nowrap;
                width: 85px;
                .first-word {
                  font-weight: 400;
                  font-family: PingFangSC-Regular;
                  opacity: 0.7;
                  font-size: $xl-font;
                  color: #ffeec1;
                  letter-spacing: 0;
                  height: 13px;
                  line-height: 13px;
                  transform: scale(0.5);
                  transform-origin: 0;
                }
                .second-word {
                  font-weight: 500;
                  font-family: PingFangSC-Medium;
                  color: #fff4bd;
                  letter-spacing: 0;
                  line-height: 14px;
                  height: 14px;
                  text-shadow: 0 1px 3px rgb(166 97 48 / 50%);
                  font-size: $xxl-font;
                  transform: scale(0.5);
                  transform-origin: 0;
                }
              }
            }
          }
        }
      }
      .introduction,
      .video,
      .photos {
        .title {
          @include center();
          justify-content: space-between;
          span {
            font-size: $ms-font;
          }
          div {
            flex: 1;
            button {
              width: 100%;
              text-align: right;
              font-size: $xs-font;
              opacity: 0.6;
              color: $white-color;
              border: none;
              margin: 0;
              padding: 0;
              outline: none;
              background-color: transparent;
              .iconfont {
                font-size: $sm-font;
              }
              &.open img {
                transform: rotate(90deg);
              }
              &.close img {
                transform: rotate(-90deg);
              }
              img {
                width: 5px;
                height: 8px;
                margin-left: 6px;
              }
            }
          }
        }
      }
      .introduction {
        position: relative;
        padding: 16px 0 0;
        .content {
          font-size: $ms-font;
          line-height: 26px;
          overflow: hidden;
          p {
            margin: 7px 0;
            text-align: justify;
            &.normal-line {
              word-wrap: break-word;
              word-break: break-all;
            }
            &.line-clamp {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
      .video {
        margin-top: 11px;
        a {
          position: relative;
          @include center();
          video {
            width: 94%;
            height: 180px;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
      .photos {
        .photos-list {
          overflow: hidden;
          margin-top: 11px;
          ul {
            display: inline-block;
            white-space: nowrap;
            li {
              display: inline-block;
              overflow: hidden;
              margin-left: 10px;
              &:first-child {
                margin-left: 0;
              }
              img {
                width: 140px;
                height: 93px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
