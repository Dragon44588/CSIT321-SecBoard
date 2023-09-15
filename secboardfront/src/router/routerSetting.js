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
const myRequestsComponent = () => import("../components/HomepageComponents/My-requests.vue");
const editRequestsComponent = () => import("../components/HomepageComponents/Edit-requests.vue");
const deleteRequestsComponent = () => import("../components/HomepageComponents/Delete-requests.vue");
const editPostCoponent = () => import("../components/HomepageComponents/Edit_A_Post.vue");

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
			path: "/resetpassword/:email/:token",
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
				{
					path: "my-requests",
					component: myRequestsComponent,
				},
				{
					path: "edit-requests",
					component: editRequestsComponent,
				},
				{
					path: "edit_post",
					component: editPostCoponent,
				},
				{
					path: "delete-requests",
					component: deleteRequestsComponent,
				},
			],
		},
	],
});

export default router;
