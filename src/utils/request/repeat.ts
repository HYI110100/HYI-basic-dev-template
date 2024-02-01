import { RepeatCancelConfig, RepeatCancelRange } from '@/typings/request';
import axios, { AxiosResponse, Canceler, InternalAxiosRequestConfig, Method } from 'axios';
const CancelToken = axios.CancelToken;
// 保存每次请求的取消方法
const repeatMap: Map<string, Canceler> = new Map();

// 根据不同range 的将请求转key
interface RequestKeys {
    routerPath: string;
    method: Method | 'method';
    url: string;
    params: string;
}
const requestToKey: Record<RepeatCancelRange, (keys: RequestKeys) => string> = {
    0: (keys) => '*',
    1: (keys) => keys.routerPath,
    2: (keys) => keys.method,
    3: (keys) => keys.url,
    4: (keys) => [keys.url, keys.routerPath].join('&'),
    5: (keys) => [keys.url, keys.method].join('&'),
    6: (keys) => [keys.url, new URLSearchParams(keys.params)].join('&'),
    7: (keys) => [keys.url, keys.routerPath, keys.method].join('&'),
    8: (keys) => [keys.url, keys.routerPath, new URLSearchParams(keys.params)].join('&'),
    9: (keys) => [keys.url, keys.method, new URLSearchParams(keys.params)].join('&'),
    10: (keys) => [keys.url, keys.routerPath, keys.method, new URLSearchParams(keys.params)].join('&'),
}
function getRequestKeys(config: InternalAxiosRequestConfig): RequestKeys {
    const urls = config.url?.split('?')!
    return {
        routerPath: window.location.pathname,
        method: (config.method as Method) || ('method' as const),
        url: urls[0],
        params: urls[1]
    }
}
function generateRequestKeys(config: InternalAxiosRequestConfig) {
    const keys = getRequestKeys(config)
    return requestToKey[config.repeatCancelConfig!.range]?.(keys) || requestToKey[repeatCancelConfig.range](keys)
}
// 默认配置
export const repeatCancelConfig: RepeatCancelConfig = {
    range: 9,
    type: 'identical',
    state: 1
}
export function mountRepeatCancel(config: InternalAxiosRequestConfig) {
    if (config.repeatCancelConfig?.state === 0) return
    const key = generateRequestKeys(config)
    let repeatArr: [string, Canceler][] = []
    if (config.repeatCancelConfig?.range === 0) {
        repeatArr = Array.from(repeatMap.entries())
    }
    if (config.repeatCancelConfig?.range) {
        repeatArr = Array.from(repeatMap.entries()).filter(item => {
            if (config.repeatCancelConfig?.type === 'identical') {
                return item[0] === key
            } else {
                return item[0].includes(key)
            }
        })
    }
    repeatArr.forEach((item) => {
        item[1]()
        repeatMap.delete(item[0])
    })
    config.cancelToken = new CancelToken(function executor(cancel) {
        repeatMap.set(key, cancel);
    });
}

export function uninstallRepeatCancel(response: AxiosResponse) {
    if (response.config.repeatCancelConfig?.state === 0) return
    const key = generateRequestKeys(response.config)
    repeatMap.delete(key)
}