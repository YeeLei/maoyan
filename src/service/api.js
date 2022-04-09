// 统一管理项目的所有接口
import http from './http'

// 最受欢迎列表接口
export const getRatedApi = () => http.get('/rated/list')
// 首页电影接口
export const getMoviesApi = () => http.get('/movies/list')
// 首页下拉加载更多接口
export const getMoreMoviesApi = (data) => http.post('/movies/more', data)
// 首页电影详情接口
export const getMovieDetail = (data) => http.post('/movies/detail', data)
