<template>
	<div style="flex: 1; display: flex; flex-direction: column">
		<div style="display: flex; justify-content: space-between; margin: 10px">
			<div @click="goCancelAddNewPost" style="height: 50px; width: 50px; cursor: pointer">
				<img src="../../../public/close-outline.svg" />
			</div>
			<div @click="goSavePost" class="save-post-button" style="display: flex; justify-content: center; align-items: center; margin-right: 20px; border-radius: 5px; cursor: pointer">
				<strong style="width: 100px; color: white; font-size: 1.2em; font-weight: bold; border-radius: 5px; text-align: center">Save</strong>
			</div>
		</div>

		<div style="flex: 1; display: flex; flex-direction: column">
			<div style="height: 150px; padding: 30px"><input v-model="postTitle" placeholder="Title" style="height: 100%; width: 100%; border: none; outline: none; background-color: #f7e4de; font-size: 2.8em; font-weight: bold" /></div>
			<div style="flex: 1; padding: 0 30px 30px 30px">
				<textarea v-model="postContent" placeholder="Content" style="resize: none; height: 100%; width: 100%; background-color: #f7e4de; border: none; outline: none; font-size: 1.8em"></textarea>
			</div>
			<!-- <textarea placeholder="New note" style="resize: none; height: 100%; width: 100%; background-color: #f7e4de; border: none; outline: none; padding: 50px; font-size: 2.3em"></textarea> -->
		</div>
		<div style="position: relative; height: 80px; display: flex; border-top: 1px solid gray">
			<div class="currently-not-available">
				<strong>Changing font style is currently not available</strong>
			</div>
			<div style="flex: 1; display: flex; justify-content: center; align-items: center">
				<strong style="margin-right: 20px; font-weight: 900">B</strong>
				<span style="margin-right: 20px; text-decoration: underline">U</span>
				<span>/</span>
			</div>

			<div style="flex: 1; display: flex; justify-content: center; align-items: center">
				<strong style="margin-right: 20px">H1</strong>
				<strong style="margin-right: 20px">H2</strong>
				<strong style="margin-right: 20px">H3</strong>
			</div>

			<div style="flex: 1; display: flex; justify-content: center; align-items: center">
				<div style="margin-right: 20px; height: 30px; width: 30px; border-radius: 50%; background-color: lightcoral"></div>
				<div style="margin-right: 20px; height: 30px; width: 30px; border-radius: 50%; background-color: lightcyan"></div>
				<div style="margin-right: 20px; height: 30px; width: 30px; border-radius: 50%; background-color: lightgoldenrodyellow"></div>
				<div style="margin-right: 20px; height: 30px; width: 30px; border-radius: 50%; background-color: lightsalmon"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api/APIs";
import { useRouter } from "vue-router";
const router = useRouter();


const myToken = window.sessionStorage.getItem("token");
const myName = window.sessionStorage.getItem("name");

const postTitle = ref();
const postContent = ref();
const postForm = reactive({
	title: postTitle.value,
	content: postContent.value,
	token: myToken,
	name: myName,
});
function goSavePost() {
	if (postTitle.value === "" || postTitle.value === undefined || postContent.value === "" || postContent.value === undefined) {
		ElMessage({
			message: "Title or Content cannot be empty",
			type: "warning",
		});
	} else {
		postForm.title = postTitle.value;
		postForm.content = postContent.value;
		api.addPost(postForm).then((res) => {
			if (res.status === 201) {
				ElMessage({
					message: "Done!",
					type: "success",
				});
				router.push({ path: "/home" });
			}
		});
	}
}
function goCancelAddNewPost() {
	router.push({ path: "/home/my_posts" });
}
</script>

<style>
.save-post-button {
	background-color: #0c3f51;
}
.save-post-button:hover {
	background-color: #072733;
}
.currently-not-available {
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-size: 2em;
	position: absolute;
	height: 100%;
	width: 100%;
	background-color: rgba(80, 78, 78, 0.573);
}
</style>
