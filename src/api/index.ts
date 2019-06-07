import request from '@/utils/request'

export const health = () => {
  return request.get('/mock/5cc00b8791c8495bfb9dff88/web-client/health'); // 心跳测试 来自 easy mock
}

