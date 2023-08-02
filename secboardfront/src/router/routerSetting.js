// import { createRouter, createWebHistory } from 'vue-router'

import { createRouter, createWebHistory } from "vue-router";
const loginPage = () => import("../components/LoginPage");
const registerPage = () => import("../components/RegisterPage");
const homePage = () => import("../components/HomePage");
const forgotLogin = () => import("../components/ForgotLogin.vue");
const bulletinBoardComponent = () => import("../components/HomepageComponents/Bulletin_board.vue");
const myPostsComponent = () => import("../components/HomepageComponents/My_posts.vue");
const addNewPostComponent = () => import("../components/HomepageComponents/Add-new-post.vue");
const myRequestsComponent = () => import("../components/HomepageComponents/My-requests.vue");

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			redirect: "login",
		},
		{
			path: "/login",
			name: "login",
			component: loginPage,
		},
		{
			path: "/register",
			name: "register",
			component: registerPage,
		},
		{
			path: "/forgot",
			name: "forgot",
			component: forgotLogin,
		},
		{
			path: "/home",
			name: "home",
			component: homePage,
			children: [
				{
					path: "",
					component: bulletinBoardComponent,
				},
				{
					path: "my_posts",
					component: myPostsComponent,
				},
				{
					path: "add-new-post",
					component: addNewPostComponent,
				},
				{
					path: "my-requests",
					component: myRequestsComponent,
				},
			],
		},
	],
});

export default router;