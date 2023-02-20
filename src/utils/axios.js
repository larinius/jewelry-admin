/**
 * axios setup to use mock service
 */

import axios from 'axios';

// const axiosServices = axios.create();

// // interceptor for http
// axiosServices.interceptors.response.use(
//     (response) => response,
//     (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
// );

// export default axiosServices;


const fetchClient = () => {
    const defaultOptions = {
        baseURL: process.env.REACT_APP_API_BASE_URL,
        method: "get",
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("serviceToken");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return instance;
};

const postClient = () => {
    const defaultOptions = {
        baseURL: process.env.REACT_APP_API_BASE_URL,
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("serviceToken");
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return instance;
};

export  {fetchClient, postClient};