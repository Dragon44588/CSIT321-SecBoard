<template>
	<div class="container">
		<!-- <div class="loginBox">

		</div> -->
		<el-form :model="registerForm" class="registerForm" :rules="rules" ref="regiserFromRef">
			<div style="height: 50px; margin-top: 50px; display: flex">
				<div>
					<img style="height: 50px; width: 50px" src="../../public/Logo_1.png" />
				</div>
				<div>
					<h1 style="font-size: 50px; font-weight: 900">SecBoard</h1>
				</div>
			</div>
			<h3>Discover, Connect, Create</h3>

			<strong style="margin-top: 180px">Name *</strong>
			<el-form-item prop="name" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="registerForm.name" style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter name" color="#0D3A4A" />
			</el-form-item>

			<strong style="margin-top: 20px">Email address *</strong>
			<el-form-item prop="email" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="registerForm.email" style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter email" color="#0D3A4A" />
			</el-form-item>

			<strong style="margin-top: 20px">Password *</strong>
			<el-form-item prop="password" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="registerForm.password" type="password" show-password style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter password" color="#0D3A4A" />
			</el-form-item>

			<strong style="margin-top: 20px">Repeat password *</strong>
			<el-form-item prop="checkPassword" style="height: 40px; width: 100%; border-radius: 10px">
				<el-input v-model="registerForm.checkPassword" type="password" show-password style="border: 0; height: 100%; width: 100%; font-size: 20px" placeholder="enter password again" color="#0D3A4A" />
			</el-form-item>

			<el-form-item prop="agree" style="height: 40px; width: 100%; border-radius: 10px">
				<el-checkbox-group v-model="registerForm.agree">
					<el-checkbox label="I agree with Terms and Conditions and Privacy Policy" />
				</el-checkbox-group>
			</el-form-item>

			<div @click="registerAction(regiserFromRef)" style="border-radius: 10px; margin-top: 50px; display: flex; justify-content: center; align-items: center; background-color: #e6cec5; color: #0c3f51; height: 40px; cursor: pointer">
				<strong>Get started!</strong>
			</div>

			<div style="text-align: center; margin-top: 20px">
				<strong>Already have an account? <a href="/login" style="color: white">Log in</a> </strong>
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
const regiserFromRef = ref();

const registerForm = reactive({
	name: "",
	email: "",
	password: "",
	checkPassword: "",
	agree: [],
});

// const validatePass = (rule, value, callback) => {
// 	if (registerForm.password === "") {
// 		callback(new Error("Please input the password"));
// 	} else {
// 		if (registerForm.checkPass !== "") {
// 			if (!registerForm.value) return;
// 			registerForm.value.validateField("checkPassword", () => null);
// 		}
// 		callback();
// 	}
// };
// const validatePass2 = (rule, value, callback) => {
// 	if (registerForm.checkPassword === "") {
// 		callback(new Error("Please input the password again"));
// 	} else if (registerForm.checkPassword !== registerForm.password) {
// 		callback(new Error("Two inputs don't match!"));
// 	} else {
// 		callback();
// 	}
// };

const rules = ref({
	name: [
		{
			required: true,
			message: "Name cannot be null",
			trigger: "blur",
		},
	],
	email: [
		{
			required: true,
			message: "Email cannot be null",
			trigger: "blur",
		},
	],
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
	agree: [
		{
			type: "array",
			required: true,
			message: "You need to agree it",
			trigger: "change",
		},
	],
});

function registerAction() {
	regiserFromRef.value.validate((valid) => {
		if (valid) {
			if (registerForm.password === registerForm.checkPassword) {
				api.registerApi(registerForm).then((res) => {
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
.registerForm {
	height: 100%;
	width: 40%;
	display: flex;
	flex-direction: column;
	color: white;
}
</style>
