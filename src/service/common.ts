import http from '@/utils/http';
/**
 * 获取登陆的用户信息
 */
export const getTodoApi = (id: number = 2) => {
  return http.get<HttpResponse<any>>(`https://jsonplaceholder.typicode.com/todos/${id}`);
};
