// 请求封装
// http.js用来做请求封装的

const BASE_URL = 'http://www.pudge.wang:3080/api'

const http = {
  get (url, params) {
    if (params) {
      const arr = Object.keys(params)
      const arr2 = arr.map((item) => item + '=' + params[item])
      const str = arr2.join('&')
      url += '?' + str
    }

    return fetch(BASE_URL + url)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 0) {
          return res
        }
      })
  },
  // 一般来说，post请求习惯用data表示参数的形参，get请求习惯使用params
  post (url, data) {
    // console.log(data);
    return fetch(BASE_URL + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 0) {
          return res
        }
      })
  }
}

export default http
