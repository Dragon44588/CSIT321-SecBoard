<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Bulletin Board</h1>
	</div>

	<div style="flex: 1">
		<div style="background-color: white; min-height: 500px; margin: 20px 20px 20px 50px; border-radius: 5px">
			<ul style="display: grid; grid-template-columns: repeat(3, minmax(350px, 35%)); grid-auto-rows: 350px">
				<li v-for="(pl, index) in postsList" :key="index" :style="{ backgroundColor: pl.background_color }" style="height: 300px; margin: 20px; border-radius: 5px; padding: 10px 10px 50px 10px; overflow: hidden">
					<p style="font-weight: bold; font-size: 1.5em">{{ pl.title }}</p>
					<p>
						By: <strong>{{ pl.user_name }}</strong> on <strong>{{ pl.timestamp }}</strong>
					</p>

					<QuillEditor v-model:content="pl.content.ops" theme="bubble" :options="editorOptions" />
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
///////////////////////////
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

///////////////////////////
const postsList = ref();
const authForm = reactive({
	token: mytoken,
});

api.getPostsApi(authForm).then((res) => {
	postsList.value = res.posts;
});

const editorOptions = {
	readOnly: true,
	theme: "bubble",
};
</script>

<style></style>
