const { defineConfig } = require('@vue/cli-service')
const waitRatedData = require('./src/mock/wait-rated.json')
const waitMoviesData = require('./src/mock/wait-movies.json')
const waitMoviesListData = require('./src/mock/wait-movies-list.json')
const classicMoviesListData = require('./src/mock/classic-movies.json')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    onBeforeSetupMiddleware (devServer) {
      devServer.app.get('/api/wait/ratedlist', (req, res) => {
        res.json(waitRatedData)
      })
      devServer.app.get('/api/wait/movieslist', (req, res) => {
        res.json(waitMoviesData)
      })
      devServer.app.post('/api/wait/movieslist/more', (req, res) => {
        // 创建空字符叠加数据片段
        let data = ''
        // 处理结果
        let result = []
        // 2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
          // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
          data += chunk
        })
        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        // 注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {
          // （1）.对url进行解码（url会对中文进行编码）
          data = decodeURI(data)
          // console.log(data)
          /** post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 */
          // （2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
          // querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
          // const dataObject = querystring.parse(data)
          // console.log(JSON.parse(data).ids.split(','))
          // console.log(waitMoviesListData.coming)
          const ids = JSON.parse(data).ids.split(',')
          const arr = waitMoviesListData.coming
          result = []
          ids.forEach((id) => {
            arr.forEach(item => {
              // eslint-disable-next-line eqeqeq
              if (item.id == id) {
                result.push(item)
              }
            })
          })
          const obj = {
            status: 0,
            result
          }
          // console.log(obj)
          res.json(obj)
        })
      })
      devServer.app.get('/api/classic/movieslist', (req, res) => {
        res.json(classicMoviesListData)
      })
    }
  }
})
