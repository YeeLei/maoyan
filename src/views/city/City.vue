<template>
  <div class="city">
    <div class="city-container">
      <scroll :probeType="probeType"
              @scroll="scroll"
              ref="scroll">
        <div>
          <div class="local-city"
               ref="localCity">
            <div class="city-title">
              定位城市
            </div>
            <div class="city-list">
              <div class="location-city city-item"
                   @click="selectCity(localCity)">{{localCity.name}}</div>
            </div>
          </div>
          <div class="history-city"
               ref="historyCity">
            <div class="city-title">
              最近访问城市
            </div>
            <div class="city-list">
              <div class="city-item"
                   v-for="item in historyCityList"
                   :key="item.cityId"
                   @click="selectCity(item)">{{item.name}}</div>
            </div>
          </div>
          <div v-for="(item,index) in cityList"
               :key="item.prefix"
               ref="listGroup">
            <div class="hot-city"
                 ref="hotCity"
                 v-if="index === 0">
              <div class="city-title">
                热门城市
              </div>
              <div class="city-list">
                <div class="city-item"
                     v-for="(city,index) in item.cities"
                     :key="index"
                     @click="selectCity(city)">{{city.name}}</div>
              </div>
            </div>
            <div class="letter-city"
                 ref="letterCity"
                 v-else>
              <div class="city-title">
                {{item.prefix.toUpperCase()}}
              </div>
              <ul class="city-letter-list">
                <li class="city-letter-item"
                    v-for="(city,index) in item.cities"
                    :key="index"
                    @click="selectCity(city)">{{city.name}}</li>
              </ul>
            </div>
          </div>
        </div>
      </scroll>
    </div>
    <div class="shortcut-list"
         ref="shortcut"
         v-if="shortcutList.length > 0">
      <ul>
        <li class="item"
            v-for="(item,index) in shortcutList"
            :key="item.prefix"
            :class="{'current': currentIndex === index}"
            :data-index="index"
            @touchstart.stop.prevent="onShortcutTouchStart"
            @touchend.stop.prevent
            v-html="shortcutTitle(item)">
        </li>
      </ul>
    </div>
    <div class="list-fixed"
         ref="fixed"
         v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import scroll from '@/components/base/scroll/scroll.vue'

const TITLE_HEIGHT = 30
export default {
  components: { scroll },
  name: 'm-city',
  data () {
    return {
      currentIndex: 0,
      listHeight: [],
      probeType: 3,
      scrollY: 0,
      touch: {},
      diff: -1
    }
  },
  computed: {
    shortcutList () {
      const newarr = ['定位城市', '最近访问城市']
      const arr = this.cityList.map((group, index) => {
        if (index === 0) {
          group.prefix = '热门城市'
        }
        return group.prefix
      })
      return newarr.concat(arr)
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.shortcutList[this.currentIndex]
        ? this.shortcutList[this.currentIndex].toUpperCase()
        : ''
    },
    ...mapState({
      localCity: (state) => state.city.localCity,
      cityList: (state) => state.city.cityList,
      historyCityList: (state) => state.city.historyCityList
    })
  },
  async mounted () {
    await this.getCityListAsync()
    // 计算楼层高度
    this.calculateHight()
  },
  methods: {
    shortcutTitle (item) {
      if (item === '定位城市') {
        return '定位'
      } else if (item === '最近访问城市') {
        return '最近'
      } else if (item === '热门城市') {
        return '热门'
      } else {
        return item.toUpperCase()
      }
    },
    scroll (pos) {
      // 获取Y轴方向上的滚动距离
      this.scrollY = pos.y
    },
    // 计算每一层列表的高度，并保存到this.listHeight
    calculateHight () {
      // 获取所有的列表层
      const list = this.$refs.listGroup
      if (list) {
        let height = 0
        // 默认第一层高度为0
        this.listHeight.push(height)
        this.listHeight.push(this.$refs.localCity.clientHeight)
        this.listHeight.push(this.$refs.historyCity.clientHeight + this.$refs.localCity.clientHeight)
        height += this.$refs.historyCity.clientHeight + this.$refs.localCity.clientHeight
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    onShortcutTouchStart (e) {
      const touch = this.touch
      const anchorIndex = e.target.dataset.index
      touch.y1 = e.touches[0].pageY
      touch.anchorIndex = anchorIndex
      this.scrollTo(anchorIndex)
    },
    scrollTo (index) {
      if (isNaN(index)) {
        return
      }
      index = Math.max(0, Math.min(this.shortcutList.length - 1, index))
      this.scrollY = -this.listHeight[index]
      // 滚动到响应的位置
      if (index === 0) {
        this.$refs.scroll.scroll.scrollToElement(this.$refs.localCity, 0)
      } else if (index === 1) {
        this.$refs.scroll.scroll.scrollToElement(this.$refs.historyCity, 0)
      } else {
        this.$refs.scroll.scroll.scrollToElement(this.$refs.listGroup[index - 2], 0)
      }
    },
    selectCity (item) {
      this.changeCity(item)
      // 保存到本地
      localStorage.setItem('localCity', JSON.stringify(item))
      // 保存选择城市的历史记录
      let flag = false
      if (this.historyCityList.length !== 0) {
        for (const ele of this.historyCityList) {
          if (ele.name === item.name) {
            flag = true
            break
          }
        }
        if (!flag) {
          const arr = this.historyCityList.concat()
          arr.push(item)
          this.changeHistoryList(arr)
          localStorage.setItem('historyCity', JSON.stringify(arr))
        }
      } else {
        this.historyCityList.push(item)
        localStorage.setItem('historyCity', JSON.stringify(this.historyCityList))
      }

      this.$router.go(-1)
    },
    ...mapMutations(['changeCity', 'changeHistoryList']),
    ...mapActions(['getCityListAsync'])
  },
  watch: {
    // 监听Y轴方向上滚动的距离
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动,因为获取到的listHight多加了一层为0的列表,所以中间层为 listHeight.length - 1
      for (let i = 0; i < listHeight.length - 1; i++) {
        const height1 = listHeight[i]
        const height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          // console.log(i)
          this.diff = height2 + newY
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
    diff (newVal) {
      const fixedTop =
        newVal > 0 && newVal < TITLE_HEIGHT ? newVal - TITLE_HEIGHT : 0
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    },
    $route (to) {
      if (/^\/city/.test(to.path)) {
        this.getCityListAsync()
        this.$refs.scroll.scroll.scrollTo(0, 0)
      }
    }

  }
}

</script>
<style lang='scss' scoped>
@import "@/assets/scss/var.scss";
@import "@/assets/scss/mixin.scss";
.city {
  position: fixed;
  background-color: #ebebeb;
  font-size: $s-font;
  color: #333;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  .city-container {
    position: fixed;
    width: 100%;
    height: 100%;
    .city-title,
    .fixed-title {
      padding-left: 15px;
      line-height: 30px;
    }
    .city-list {
      background-color: #f5f5f5;
      padding-bottom: 8px;
      overflow: hidden;
      .location-city {
        width: auto;
        min-width: 30%;
      }
      .city-item {
        width: 28%;
        padding: 0 20px;
        float: left;
        height: 33px;
        margin-top: 15px;
        margin-left: 4%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        @include no-wrap();
      }
    }
    .letter-city {
      .city-letter-list {
        padding: 0 15px;
        background: #f5f5f5;
        .city-letter-item {
          width: 100%;
          height: 44px;
          line-height: 44px;
          border-bottom: 1px solid #c8c7cc;
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
  .shortcut-list {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 15px 0;
    border-radius: 10px;
    text-align: center;
    z-index: 1000;
    .item {
      width: 40px;
      padding: 3px;
      line-height: 16px;
      text-align: center;
      font-size: $xs-font;
      // &.current {
      //   color: $theme-color;
      // }
      &:nth-of-type(n + 4) {
        width: 20px;
        margin-left: 16px;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #ebebeb;
    .fixed-title {
      padding-left: 15px;
      line-height: 30px;
    }
  }
}
</style>
