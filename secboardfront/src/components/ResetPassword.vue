<template>
	<div class="container">
		<!-- <div class="loginBox">

		</div> -->
		<el-form :model="resetPasswordForm" class="resetPasswordForm" :rules="rules" ref="resetPasswordFromRef">
			<div style="height: 50px; margin-top: 50px; display: flex">
				<div>
					<img style="height: 50px; width: 50px" src="../../public/Logo_1.png" />
				</div>
				<div>
					<h1 style="font-size: 50px; font-weight: 900">SecBoard</h1>
				</div>
			</div>
            <br/>
			<h3> Please enter your new password:</h3>

			<strong style="margin-top: 20px">New password *</strong>
			<el-form-item prop="password" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="resetPasswordForm.password" type="password" show-password style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter password" color="#0D3A4A" />
			</el-form-item>

			<strong style="margin-top: 20px">Repeat new password *</strong>
			<el-form-item prop="checkPassword" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="resetPasswordForm.checkPassword" type="password" show-password style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter password again" color="#0D3A4A" />
			</el-form-item>

			<div @click="resetPasswordAction(resetPasswordFromRef)" style="border-radius: 10px; margin-top: 50px; display: flex; justify-content: center; align-items: center; background-color: #e6cec5; color: #0c3f51; height: 40px; cursor: pointer">
				<strong>Reset password</strong>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/api/APIs";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
const resetPasswordFromRef = ref();

const resetPasswordForm = reactive({
	token: "",
	email: "",
	password: "",
	checkPassword: "",
});

const rules = ref({
	password: [
		{
			required: true,
			message: "Password cannot be null",
			trigger: "blur",
		},
	],
	checkPassword: [
		{
			required: true,
			message: "Please enter your password again",
			trigger: "blur",
		},
	],
});

function resetPasswordAction() {
    
	resetPasswordFromRef.value.validate((valid) => {
		if (valid) {
			if (resetPasswordForm.password === resetPasswordForm.checkPassword) {
                const url = window.location.pathname.split('/');//Get Url and split it into site/email/token
                resetPasswordForm.email=url[2];
                resetPasswordForm.token=url[3];
				api.resetPassword(resetPasswordForm).then((res) => {
					if (res.status === 200) {
						router.push({ path: "/login" });
					}
				});
			} else {
				ElMessage.error("Repeat password doesn't match");
			}
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
.resetPasswordForm {
	height: 100%;
	width: 40%;
	display: flex;
	flex-direction: column;
	color: white;
}
</style>
