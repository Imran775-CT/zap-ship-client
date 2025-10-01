import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
});

const UseAxiosSecure = () => {
    const { user } = useAuth();

    axiosSecure.interceptors.request.use(
        (config) => {
            if (user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosSecure; // ⬅️ এটা return করতে হবে
};

export default UseAxiosSecure;
