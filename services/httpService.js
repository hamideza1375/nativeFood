import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";
import localStorage from "@react-native-async-storage/async-storage"


const sum = (async () => {
    const token = await localStorage.getItem("token");
    if (token) axios.defaults.headers.common["Authorization"] = token;
})()



axios.interceptors.response.use(null, error => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
    if (!expectedErrors) {
        console.log(error);
        alert("مشکلی از سمت سرور رخ داده است.");
    }

    return Promise.reject(error);
});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};
