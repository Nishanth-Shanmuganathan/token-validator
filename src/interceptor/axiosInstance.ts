import axios from 'axios';
import { NotificationTypes } from '../enums/notificationTypes';
import apiRoutes from '../routes/routeConstants/apiRoutes';
import Notification from '../shared/components/Notification';

const axiosInstance = axios.create({
    baseURL: apiRoutes.BASE_URL,
    timeout: 20000
})

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    config.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${token}`,
    };
    return config;
});


axiosInstance.interceptors.response.use(
    (response): any => {
        return {
            data: response?.data,
            message: response?.statusText || response.data["message"],
            status: response?.status,
        };
    },
    (error) => {
        const { response } = error;

        const errorMsg = response.data?.exception || response?.data?.error
        Notification({
            type: NotificationTypes.ERROR,
            message: errorMsg || "Something went wrong. Please try again",
        });

        return Promise.reject(error);
    }
);

export default axiosInstance