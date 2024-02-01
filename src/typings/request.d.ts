import type { Canceler, Method, AxiosRequestConfig } from 'axios';

// 重复请求取消
/**
 * 0 任意请求都取消上一个  
 * 1 页面（未带路由参数的路由地址）  
 * 2 请求方式  
 * 3 API  
 * 4 API + 页面（未带路由参数的路由地址）  
 * 5 API + 请求方式  
 * 6 API + 参数  
 * 7 API + 页面（未带路由参数的路由地址） + 请求方式  
 * 8 API + 页面（未带路由参数的路由地址） + 参数  
 * 9 API + 请求方式 + 参数  
 * 10 API + 页面（未带路由参数的路由地址） + 请求方式 + 参数  
 * */
export type RepeatCancelRange = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
export type RepeatCancelType = 'identical' | 'similar'
export interface RepeatCancelConfig {
  range: RepeatCancelRange,
  type?: RepeatCancelType
  state?: 0 | 1
}
// 失败请求尝试
export interface RequestTryConfig {

}

// 使用声明合并拓展AxiosRequestConfig类型定义
declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 重复请求取消
     */
    repeatCancelConfig?: RepeatCancelConfig;
    /**
     * 失败请求尝试
     */
    requestTryConfig?: RequestTryConfig
  }
}