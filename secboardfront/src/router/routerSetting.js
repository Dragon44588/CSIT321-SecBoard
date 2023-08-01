// import { createRouter, createWebHistory } from 'vue-router'

import { createRouter, createWebHistory } from "vue-router";
const loginPage = () => import("../components/LoginPage");
const registerPage = () => import("../components/RegisterPage");
const homePage = () => import("../components/HomePage");
const forgotPassword = () => import("../components/ForgotPassword.vue");
const resetPassword = () => import("../components/ResetPassword.vue");
const bulletinBoardComponent = () => import("../components/HomepageComponents/Bulletin_board.vue");
const myPostsComponent = () => import("../components/HomepageComponents/My_posts.vue");
const addNewPostComponent = () => import("../components/HomepageComponents/Add-new-post.vue");

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
			path: "/forgotpassword",
			name: "forgotpassword",
			component: forgotPassword,
		},
		{
			path: '/resetpassword/:email/:token',
			name: "resetpassword",
			component: resetPassword,
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
			],
		},
	],
});

export default router;
