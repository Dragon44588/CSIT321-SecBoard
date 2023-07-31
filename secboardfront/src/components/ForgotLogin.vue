<template> <!--the template tags are neccessary for building a page, -->
	<div class="container">
		<img style="height: 100px; width: 100px" src="../../public/Logo_2.png" />
	</div>
</template>

<script setup>
</script>

<style scoped>

el-form-item {
	height: 40px;
	width: 100%;
	border-radius: 10px
}

.input {
	color: #0D3A4A;
	border: 0;
	height: 100%;
	width: 100%;
	font-size: 20px;
}

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
