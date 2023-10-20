<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">My Posts</h1>
	</div>
	<div style="flex: 1">
		<div style="background-color: white; min-height: 500px; margin: 20px 20px 20px 50px; border-radius: 5px">
			<ul style="display: grid; grid-template-columns: repeat(3, minmax(350px, 35%)); grid-auto-rows: 350px">
				<li v-for="(mpl, index) in myPostsList" :key="index" :style="{ backgroundColor: mpl.background_color }" style="height: 300px; margin: 20px; border-radius: 5px; padding: 10px 10px 100px 10px; overflow: hidden">
					<div style="display: flex; justify-content: flex-end">
						<div style="display: flex; justify-content: center">
							<div @click="requestEdit(mpl)" style="margin-right: 10px; color: rgb(77, 76, 76); cursor: pointer">
								<h4>Edit</h4>
							</div>
							<div style="cursor: pointer">
								<img @click="requestDelete(mpl)" style="height: 20px; width: 20px" src="../../../public/trash.svg" />
							</div>
						</div>
					</div>

					<p style="font-weight: bold; font-size: 2em">{{ mpl.title }}</p>
					<p>
						By: <strong>{{ mpl.user_name }}</strong> on <strong>{{ mpl.timestamp }}</strong>
					</p>

					<QuillEditor v-model:content="mpl.content.ops" theme="bubble" :options="editorOptions" />
				</li>
				<li @click="goAddNewPost" class="add-post-button" style="height: 300px; margin: 20px; border-radius: 5px; display: flex; justify-content: center; align-items: center; cursor: pointer">
					<div style="padding: 15px">
						<img style="height: 100px; width: 100px" src="../../../public/add-outline.svg" />
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/api/APIs";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

const router = useRouter();
const myPostsList = ref();
const postContent = ref();
const postTitle = ref();

const mytoken = window.sessionStorage.getItem("token");
const myname = window.sessionStorage.getItem("name");

const authForm = reactive({
	token: mytoken,
	name: myname,
});

const sendToDatabase = reactive({
	post_id: null,
	title: postTitle.value,
	content: postContent.value,
	token: mytoken,
	name: myname,
});

api.getMyPostsApi(authForm).then((res) => {
	myPostsList.value = res.myPosts;
});

function goAddNewPost() {
	router.push({ path: "/home/add-new-post" });
}

function requestDelete(mpl) {
	sendToDatabase.post_id = mpl.post_id;
	sendToDatabase.title = mpl.title;
	sendToDatabase.content = mpl.content;
	api.addDeleteRequest(sendToDatabase).then((res) => {
		if (res.status === 201) {
			ElMessage({
				message: "Done!",
				type: "success",
			});
			router.push({ path: "/home" });
		}
	});
}
function requestEdit(mpl) {
	window.sessionStorage.setItem("current_editing", JSON.stringify(mpl));
	router.push({ path: "/home/edit_post" });

	// sendToDatabase.post_id = mpl.post_id;
	// sendToDatabase.title = mpl.title;
	// sendToDatabase.content = mpl.content;
	// api.addEditRequest(sendToDatabase).then((res) => {
	// 	if (res.status === 201) {
	// 		ElMessage({
	// 			message: "Done!",
	// 			type: "success",
	// 		});
	// 		router.push({ path: "/home" });
	// 	}
	// });
}
const editorOptions = {
	readOnly: true,
	theme: "bubble",
};
</script>

<style scope>
.add-post-button {
	background-color: lightgrey;
}
.add-post-button:hover {
	background-color: rgb(143, 142, 142);
}
.btn {
	border: 1px solid black;
	background-color: white;
	color: black;
	padding: 14px 28px;
	font-size: 16px;
	cursor: pointer;
}
.delete {
	background-color: #992c2c;
	border: 0px solid black;
	text-align: center;
	width: 47%;
}
.delete:hover {
	background-color: #872424;
}
</style>
