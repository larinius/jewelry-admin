import axios from "axios";

export const axiosProvider = () => {
    const serviceToken = window.localStorage.getItem("serviceToken");

    const baseURL = process.env.REACT_APP_API_BASE;

    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${serviceToken}` },
    });

    axiosInstance.interceptors.request.use(async (req) => {
        if (serviceToken) {
            req.headers.Authorization = `Bearer ${serviceToken}`;
        }

        return req;
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            console.log(`Response error ${error.response?.status}`);
            return Promise.reject(error);
        },
    );

    return { axiosInstance };
};
