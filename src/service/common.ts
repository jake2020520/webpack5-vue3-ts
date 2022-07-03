import http from '@/utils/http';
/**
 * 获取登陆的用户信息
 */
export const getWeatherApi = () => {
  return http.get<HttpResponse<any>>('https://sc.anhuiry.com/coupon/getActivityList?v=6&b=8&p=2');
};
