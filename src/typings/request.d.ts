import type { Canceler, Method, AxiosRequestConfig } from 'axios';

// 使用声明合并拓展AxiosRequestConfig类型定义
declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * 重复请求取消
     */
    repeatCancelConfig?: {

    };
    /**
     * 请求失败重试
     */
    requestTryConfig?: {

    }
  }
}