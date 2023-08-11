<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Bulletin Board</h1>
	</div>
	<div style="flex: 1">
		<div style="background-color: white; min-height: 500px; margin: 20px 20px 20px 50px; border-radius: 5px">
			<ul style="display: grid; grid-template-columns: repeat(3, minmax(350px, 35%)); grid-auto-rows: 350px">
				<li v-for="(pl, index) in postsList" :key="index" style="height: 300px; margin: 20px; background-color: #fdf2b3; border-radius: 5px">
					<div style="padding: 15px">
						<div>
							<strong style="font-weight: bold; font-size: 2em">{{ pl.title }}</strong>
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
