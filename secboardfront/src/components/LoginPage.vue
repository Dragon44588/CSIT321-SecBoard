<template>
	<div class="container">
		<!-- <div class="loginBox">

		</div> -->
		<el-form :model="loginForm" class="loginForm" :rules="rules" ref="loginFromRef">
			<h1 style="font-size: 50px; margin-top: 50px">Log in</h1>
			<h3>Enter your details to continue</h3>

			<strong style="margin-top: 180px">Email address *</strong>
			<el-form-item prop="email" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="loginForm.email" style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="example@gmail.com" color="#0D3A4A" />
			</el-form-item>

			<strong style="margin-top: 20px">Password *</strong>
			<el-form-item prop="password" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="loginForm.password" type="password" style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter password" color="#0D3A4A" />
			</el-form-item>

			<div style="display: flex; justify-content: flex-end; margin-top: 10px">
				<strong> <a href="/forgotpassword?" style="color:white">Forgot password?</a></strong>
			</div>

			<div @click="loginAction" style="border-radius: 10px; margin-top: 30px; display: flex; justify-content: center; align-items: center; background-color: #e6cec5; color: #0c3f51; height: 40px; cursor: pointer">
				<strong>Log in</strong>
			</div>
			<div style="text-align: center; margin-top: 20px">
				<strong>Do not have an account? <a href="/register" style="color: white">Sign up</a> </strong>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/api/APIs";
import { useRouter } from "vue-router";
const router = useRouter();
const loginFromRef = ref();

const loginForm = reactive({
	email: "",
	password: "",
});
const rules = ref({
	email: [
		{
			required: true,
			message: "Please enter your email address",
			trigger: "blur",
		},
	],
	password: [
		{
			required: true,
			message: "Please enter your Password",
			trigger: "blur",
		},
	],
});
function loginAction() {
	loginFromRef.value.validate((valid) => {
		if (valid) {
			api.loginApi(loginForm).then((res) => {
				if (res.status === 200) {
					window.sessionStorage.setItem("token", res.token);
					window.sessionStorage.setItem("email", loginForm.email);
					window.sessionStorage.setItem("name", res.name);
					router.push({ path: "/home" });
				}
			});
		} else {
			return;
		}
	});
}
</script>

<style scoped>
.container {
	width: 100%;
	height: 100vh;
	background-color: #0c3f51;
	display: flex;
	justify-content: center;
	align-items: center;
}
/* .loginBox {
	height: 100%;
	width: 40%;
	display: flex;
	flex-direction: column;
	color: white;
} */
.loginForm {
	height: 100%;
	width: 40%;
	display: flex;
	flex-direction: column;
	color: white;
}
</style>
