import { RequestTryConfig } from '@/typings/request';
import { InternalAxiosRequestConfig } from 'axios';
import request from '@/utils/request';

// 默认配置
export const requestTryConfig: RequestTryConfig = {
  state: 1,
  count: 3,
  interval: 1000,
  isTips: true,
};

export function startRequestTry(config: InternalAxiosRequestConfig) {
  if (config.requestTryConfig?.state === 0) return;
  if (config.requestTryConfig) config.requestTryConfig.count!--;
}
export function endRequestTry(error: { config: any }) {
  const { config } = error;
  if (config.requestTryConfig?.state === 0) return;

  if (config.requestTryConfig && config.requestTryConfig.count) {
    const backoff = new Promise<void>(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config?.interval || requestTryConfig.interval);
    });
    backoff.then(function () {
      request(config);
    });
  }
}
