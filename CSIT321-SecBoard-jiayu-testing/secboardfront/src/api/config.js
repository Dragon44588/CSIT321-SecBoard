import axios from "axios";
import { ElMessage } from "element-plus";
// import { el } from "element-plus/es/locale";

const Service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	headers: {
		"Content-Type": "application/json;charset=utf-8",
	},
	timeout: 5000,
});

//Request interceptor
Service.interceptors.request.use((config) => {
	// config.headers.common["Authorization"] = window.sessionStorage.getItem("token") === null ? null : window.sessionStorage.getItem("token");
	config.headers.Authorization = window.sessionStorage.getItem("token");
	return config;
});

//Response interceptor
Service.interceptors.response.use((response) => {
	const res = response.data;
	if (res.status !== 201) {
		if (res.status === 200) {
			ElMessage({
				message: res.message,
				type: "success",
			});
			return res;
		} else {
			ElMessage.error(res.message || "SOMETHING WRONG");
			return res;
		}
	} else {
		return res;
	}
});

export default Service;
