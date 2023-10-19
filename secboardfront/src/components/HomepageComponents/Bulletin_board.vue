<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Bulletin Board</h1>
	</div>
	<div style="flex: 1">
		<div style="background-color: white; min-height: 500px; margin: 20px 20px 20px 50px; border-radius: 5px">
			<ul style="display: grid; grid-template-columns: repeat(3, minmax(350px, 35%)); grid-auto-rows: 350px">
				<li v-for="(pl, index) in postsList" :key="index"
					style="height: 300px; margin: 20px; background-color: #fdf2b3; border-radius: 5px">
					<div style="padding: 15px">
						<div>
							<strong style="font-weight: bold; font-size: 2em">{{ pl.title }}</strong>
							<v-spacer />
							<span style="float:right">
								<strong><a href="" @click="requestReport(pl)" style="color: red">Report</a> </strong>
							</span>
						</div>
						<div style="margin-top: 5px">
							<span style="font-size: 1.1em">
								{{ pl.content }}
							</span>

						</div>
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
const mytoken = window.sessionStorage.getItem("token");

const postsList = ref();
const authForm = reactive({
	token: mytoken,
});
api.getPostsApi(authForm).then((res) => {
	console.log(res.posts);
	postsList.value = res.posts;
});

const myname = window.sessionStorage.getItem("name");

const sendToDatabase = reactive({
	post_id: null,
	title: 'na',
	content: 'na',
	token: mytoken,
	name: myname,
});

function requestReport(pl) {

	sendToDatabase.post_id = pl.post_id;
	console.log("poo:"+pl.post_id);
	sendToDatabase.title = pl.title;
	sendToDatabase.content = pl.content;
	if (sendToDatabase.title !== 'na') {
		api.addReportRequest(sendToDatabase).then((res) => {
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
</script>

<style></style>
