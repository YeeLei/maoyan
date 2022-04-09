// 请求封装
const BASE_URL = 'http://www.pudge.wang:3080/api'

const http = {
  get (url, params) {
    if (params && Object.prototype.toString.call(params) === '[object Object]') {
      const arr = Object.keys(params)
      url += '?' + arr.map(item => item + '=' + params[item]).join('&')
    }
    return fetch(BASE_URL + url)
      .then(res => res.json())
      .then(res => {
        if (res.status === 0) {
          return res
        }
      })
  },
  post (url, data) {
    return fetch(BASE_URL + url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((res) => {
        if (res.status === 0) {
          return res
        }
      })
  }
}

export default http
