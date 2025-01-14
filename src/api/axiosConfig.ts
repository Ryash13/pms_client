import axios, {AxiosInstance} from 'axios'

const getAuthToken = (): string | null => {
    return localStorage.getItem("auth_token") || null;
}

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:9000/",
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api;