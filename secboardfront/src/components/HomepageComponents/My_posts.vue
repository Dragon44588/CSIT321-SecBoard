<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">My Posts</h1>
	</div>
	<div style="flex: 1">
		<div style="background-color: white; min-height: 500px; margin: 20px 20px 20px 50px; border-radius: 5px">
			<ul style="display: grid; grid-template-columns: repeat(3, minmax(350px, 35%)); grid-auto-rows: 350px">
				<li v-for="(mpl, index) in myPostsList" :key="index" style="height: 300px; margin: 20px; background-color: #fdf2b3; border-radius: 5px">
					<div style="padding: 15px">
						<div>
							<strong style="font-weight: bold; font-size: 2em">{{ mpl.title }}</strong>
						</div>
						<div style="margin-top: 5px; height: 20px">
							<span style="font-size: 1.1em">
								{{ mpl.content }}
							</span>
						</div>
					</div>
					<div @click="requestDelete(mpl)" style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:240px; top:140px; position:relative">
						<div class="btn delete" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
							<strong style="font-size: 20px; color: #ffffff">Request Deletion</strong>
						</div>
					</div>
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
	title: postTitle.value,
	content: postContent.value,
	token: mytoken,
	name: myname,
});

api.getMyPostsApi(authForm).then((res) => {
	console.log(res);
	myPostsList.value = res.myPosts;
});

function goAddNewPost() {
	router.push({ path: "/home/add-new-post" });
}

function requestDelete(mpl) {
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
	background-color: #992C2C;
	border: 0px solid black;
	text-align: center;
	width: 47%;
}
.delete:hover {
	background-color: #872424;
}
</style>
