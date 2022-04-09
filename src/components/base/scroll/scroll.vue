<template>
  <div ref="wrapper"
       id="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'm-scroll',
  props: {
    probeType: {
      // 滚动的具体时机
      type: Number,
      default: 0
    },
    scrollX: {
      // 横向滚动
      type: Boolean,
      default: false
    },
    scrollY: {
      // 纵向滚动
      type: Boolean,
      default: true
    },
    click: {
      // 默认会阻止浏览器的原生 click 事件
      type: Boolean,
      default: true
    },
    observeDOM: {
      // 当DOM元素发生变化时，将会触发scroll的refresh 方法
      type: Boolean,
      default: true
    },
    pullUpLoad: {
      // 是否开启下拉刷新
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this._initScroll()
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      // 初始化BScroll
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        scrollY: this.scrollY,
        observeDOM: this.observeDOM,
        pullUpLoad: {
          threshold: 30
        }
      })

      // 如果传入probeType > 0，则emit一个scroll事件
      if (this.probeType > 0) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 如果传入下拉加载事件，则emit一个下拉加载事件
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp () {
      this.scroll.finishPullUp()
    }
  }
}

</script>
<style lang='scss' scoped>
#wrapper {
  height: 100%;
}
</style>
