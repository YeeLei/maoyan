import { getMovieDetailApi } from '@/service/api'
const detailModule = {
  state: {
    detailInfo: {} // 电影详情数据
  },
  mutations: {
    changeDetailInfo (state, payload) {
      state.detailInfo = payload.result
    },
    clearDetailInfo (state) {
      state.detailInfo = {}
    }
  },
  actions: {
    async getDetailInfoAsync ({ commit }, payload) {
      const res = await getMovieDetailApi({ id: payload.id })
      commit('changeDetailInfo', res)
    }
  }
}
export default detailModule
