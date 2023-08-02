<template>
	<div class="main-big">
		<div class="aside">
			<div style="height: 40px; margin-top: 40px; display: flex; justify-content: center; align-items: center">
				<div style="display: flex; align-items: center; width: 100%">
					<div style="width: 30px; margin-left: 20px; display: flex; justify-content: center; align-items: center">
						<img style="height: 20x; width: 20px" src="../../public/person-outline.svg" />
					</div>
					<div style="flex: 1; margin-left: 5px">
						<strong>{{ myname }}</strong>
					</div>
				</div>
			</div>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: center; align-items: center">
				<div @click="goAddNewPost" class="aside-new-post" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; width: 60%; height: 70%; border-radius: 10px; cursor: pointer">
					<strong>New post</strong>
				</div>
			</div>
			<div class="aside-board" @click="goBoard" style="height: 40px; margin-top: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer">
				<div style="display: flex; align-items: center; width: 100%">
					<div style="width: 30px; margin-left: 20px; display: flex; justify-content: center; align-items: center">
						<img style="height: 20x; width: 20px" src="../../public/reader-outline.svg" />
					</div>
					<div style="flex: 1; margin-left: 5px">
						<strong>Board</strong>
					</div>
				</div>
			</div>
			<div class="aside-my-posts" @click="goMyPosts" style="height: 40px; margin-top: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer">
				<div style="display: flex; align-items: center; width: 100%">
					<div style="width: 30px; margin-left: 20px; display: flex; justify-content: center; align-items: center">
						<img style="height: 20x; width: 20px" src="../../public/clipboard-outline.svg" />
					</div>
					<div style="flex: 1; margin-left: 5px">
						<strong>My posts</strong>
					</div>
				</div>
			</div>
			<div v-if="myname=='Admin'||myname=='Admin2'||myname=='Admin3'" @click="goMyRequests" class="aside-my-requests" style="height: 40px; margin-top: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer">
				<div style="display: flex; align-items: center; width: 100%">
					<div style="width: 30px; margin-left: 20px; display: flex; justify-content: center; align-items: center">
						<img style="height: 20x; width: 20px" src="../../public/my-requests.svg" />
					</div>
					<div style="flex: 1; margin-left: 5px">
						<strong>My Requests</strong>
					</div>
				</div>
			</div>
			<a href="https://github.com/Dragon44588/CSIT321-SecBoard/blob/main/database.JSON" target="_blank" style="text-decoration: none; color:white; background-color:white">
			<div @click="goDownloadBlockchain" class="aside-download-blockchain" style="height: 40px; margin-top: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer">
				<div style="display: flex; align-items: center; width: 100%">
					<div style="width: 30px; margin-left: 20px; display: flex; justify-content: center; align-items: center">
						<img style="height: 20x; width: 20px" src="../../public/download-outline.svg" />
					</div>
					<div style="flex: 1; margin-left: 5px">
						<strong>Download Blockchain</strong>
					</div>
				</div>
			</div>
			</a>
			<div @click="goLogOut" class="aside-log-out" style="height: 40px; margin-top: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer">
				<div style="display: flex; align-items: center; width: 100%">
					<div style="width: 30px; margin-left: 20px; display: flex; justify-content: center; align-items: center">
						<img style="height: 20x; width: 20px" src="../../public/log-out-outline.svg" />
					</div>
					<div style="flex: 1; margin-left: 5px">
						<strong>Log out</strong>
					</div>
				</div>
			</div>
		</div>
		<div class="content" style="display: flex; flex-direction: column">
			<router-view></router-view>
		</div>
	</div>
</template>

<script setup>
// import { reactive } from "vue";
// import api from "@/api/APIs";
import { useRouter } from "vue-router";
const router = useRouter();

const myname = window.sessionStorage.getItem("name");

function goBoard() {
	router.push({ path: "/home" });
}
function goMyPosts() {
	router.push({ path: "/home/my_posts" });
}
function goAddNewPost() {
	router.push({ path: "/home/add-new-post" });
}
function goMyRequests() {
	router.push({ path: "/home/my-requests" });
}
function goLogOut() {
	sessionStorage.clear();
	router.push({ path: "/" });
}

</script>

<style>
.main-big {
	/* height: 100vh; */
	min-height: 100vh;
	display: flex;
}
.aside {
	color: white;
	width: 15%;
	background-color: #0c3f51;
	/* display: flex;
	flex-direction: column; */
}
.content {
	flex: 1;
	background-color: #f7e4de;
}
.aside-new-post {
	background-color: #f7e4de;
}
.aside-new-post:hover {
	background-color: #f1c3c3;
}
.aside-board:hover {
	background-color: #082c39;
}
.aside-my-posts:hover {
	background-color: #082c39;
}
.aside-log-out:hover {
	background-color: #082c39;
}
.aside-download-blockchain:hover {
	background-color: #082c39;
}
.aside-my-requests:hover {
	background-color: #082c39;
}
</style>