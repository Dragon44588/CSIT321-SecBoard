import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/global.css";
import router from "../src/router/routerSetting";

const app = createApp(App);

router.beforeEach((to, from, next) => {
	if (to.name === "login") {
		sessionStorage.clear();
		next();
	} else {
		if (to.name === "register") {
			next();
		}else if(to.name==="forgotpassword"){
			next();
		} else {
			if (sessionStorage.getItem("token") !== undefined && sessionStorage.getItem("token") !== null && sessionStorage.getItem("token") !== null) {
				next();
			} else {
				next({ name: "login" });
			}
		}
	}
	// 	// if (to.name !== "login") {
	// 	// 	// if (to.name === "home") {
	// 	// 	// 	if (sessionStorage.getItem("token")) {
	// 	// 	// 		next();
	// 	// 	// 	} else {
	// 	// 	// 		next({ name: "login" });
	// 	// 	// 	}
	// 	// 	// }
	// 	// 	// if (to.name === "register") {
	// 	// 	// 	next();
	// 	// 	// }
	// 	// 	if (sessionStorage.getItem("token")) {
	// 	// 		next();
	// 	// 	}
	// 	// } else {
	// 	// 	// if (sessionStorage.getItem("token")) {
	// 	// 	// 	next({ name: "home" });
	// 	// 	// } else {
	// 	// 	// 	sessionStorage.clear();
	// 	// 	// 	next();
	// 	// 	// }
	// 	// }
});

app.use(ElementPlus).use(router).mount("#app");
