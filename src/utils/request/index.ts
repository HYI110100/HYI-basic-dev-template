import axios from 'axios';
import { mountRepeatCancel, uninstallRepeatCancel, repeatCancelConfig } from "@/utils/request/repeat";
import { requestTryConfig } from "@/utils/request/retry";

const instance = axios.create({
    baseURL: '/',
    timeout: 5000,
    repeatCancelConfig: { ...repeatCancelConfig },
    requestTryConfig: { ...requestTryConfig }
});
instance.interceptors.request.use((config) => {
    mountRepeatCancel(config)
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
    return Promise.reject(error);
});

export default instance;