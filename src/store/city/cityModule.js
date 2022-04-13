import { getAreaListApi } from '@/service/api'

const LOCAT_CITYS = localStorage.getItem('localCity')
const HISTORY_CITYS = localStorage.getItem('historyCity')

const cityModule = {
  state: {
    localCity: LOCAT_CITYS ? JSON.parse(LOCAT_CITYS) : { name: '杭州' },
    historyCityList: HISTORY_CITYS ? JSON.parse(HISTORY_CITYS) : [],
    cityList: [] // 城市列表
  },
  mutations: {
    changeCity (state, payload) {
      state.localCity = payload
    },
    changeHistoryList (state, payload) {
      state.historyCityList = payload
    },
    // 城市列表
    getCityList (state, payload) {
      state.cityList = payload.result
    }
  },
  actions: {
    getCityListAsync ({ commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const res = await getAreaListApi()
        commit('getCityList', res)
        resolve()
      })
    }
  }
}
export default cityModule
