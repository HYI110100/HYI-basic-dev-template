import axios, { CreateAxiosDefaults } from 'axios';
import { mountRepeatCancel, uninstallRepeatCancel, repeatCancelConfig } from "@/utils/request/repeat";
import { requestTryConfig, startRequestTry, endRequestTry } from "@/utils/request/retry";
export const axiosConfig: CreateAxiosDefaults = {
    baseURL: '/',
    timeout: 5000,
    repeatCancelConfig: { ...repeatCancelConfig },
    requestTryConfig: { ...requestTryConfig }
}
const instance = axios.create({ ...axiosConfig });

instance.interceptors.request.use((config) => {
    mountRepeatCancel(config)
    startRequestTry(config)
    return config;
}, (error) => {
    console.error(error);
})

instance.interceptors.response.use((response) => {
    uninstallRepeatCancel(response)
    const data = response.data
    if (data.code < 200 || data.code > 299) {
        return Promise.reject(response.data)
    }
    return Promise.resolve(response.data);
}, (error) => {
    const { config } = error
    endRequestTry(error)

    if (error.response?.data) return Promise.reject({ type: "error", msg: error.response.data.msg });
    if (error.message === "Network Error") {
        //message为"Network Error"代表断网了
        return Promise.reject({ type: "warning", msg: "网络连接已断开，请检查网络" });
    }
    if (error.message === `timeout of ${config?.timeout ?? axiosConfig.timeout}ms exceeded`) {
        //网太慢了，5秒内没有接收到数据，这里的${timeout}ms对应上方timeout设置的值
        return Promise.reject({ type: "warning", msg: "请求超时，请检查网络" });
    }
    return Promise.reject({ type: "error", msg: "出现错误，请稍后再试" });
    // return Promise.reject(error)
});

export default instance;