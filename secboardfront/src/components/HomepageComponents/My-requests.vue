<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Edit Requests</h1>
	</div>

	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Delete Requests</h1>
	</div>
	
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/api/APIs";
const mytoken = window.sessionStorage.getItem("token");

const postsList = ref();

const authForm = reactive({
	token: mytoken,
});
api.getPostsApi(authForm).then((res) => {
	console.log(res.posts);
	postsList.value = res.posts;
});
</script>

<style></style>
