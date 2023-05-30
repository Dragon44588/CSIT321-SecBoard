<template>
	<div class="container">
		<!-- <div class="loginBox">

		</div> -->
		<el-form :model="forgotForm" class="forgotForm" :rules="rules" ref="forgotFromRef">
			<h1 style="font-size: 50px; margin-top: 50px">Forgot Password</h1>
			<h3>Enter your email to reset password</h3>

			<strong style="margin-top: 180px">Email address: *</strong>
			<el-form-item prop="email" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="forgotForm.email" style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="example@gmail.com" color="#0D3A4A" />
			</el-form-item>
            <div @click="forgotAction" style="border-radius: 10px; margin-top: 30px; display: flex; justify-content: center; align-items: center; background-color: #e6cec5; color: #0c3f51; height: 40px; cursor: pointer">
				<strong>Reset Password</strong>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
//import api from "@/api/APIs";
//import { useRouter } from "vue-router";
//const router = useRouter();
const forgotFromRef = ref();

const forgotForm = reactive({
	email: "",
});
const rules = ref({
	email: [
		{
			required: true,
			message: "Please enter your email address",
			trigger: "blur",
		},
	]
});/*
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
}*/
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
.forgotForm {
	height: 100%;
	width: 40%;
	display: flex;
	flex-direction: column;
	color: white;
}
</style>
