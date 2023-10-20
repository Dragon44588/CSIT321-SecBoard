<template>
	<div style="flex: 1; display: flex; flex-direction: column">
		<div style="display: flex; justify-content: space-between; margin: 10px">
			<div @click="goCancelAddNewPost" style="height: 50px; width: 50px; cursor: pointer">
				<img src="../../../public/close-outline.svg" />
			</div>
			<div style="flex: 1; display: flex; justify-content: center; align-items: center; color: rgb(68, 68, 68)">
				<h1>MAKING POST</h1>
			</div>
			<div style="justify-content: flex-end; align-items: center; display: flex">
				<strong style="margin-right: 10px">Post Color</strong>
				<ul style="display: flex">
					<li v-for="(color, index) in post_color_list" :key="index">
						<div @click="current_post_color = color" style="margin-right: 10px; height: 30px; width: 30px; border-radius: 50%; cursor: pointer" :style="handle_post_color(color)"></div>
					</li>
				</ul>
			</div>
			<div @click="goSavePost" class="save-post-button" style="display: flex; justify-content: center; align-items: center; margin-right: 20px; border-radius: 5px; cursor: pointer">
				<strong style="width: 100px; color: white; font-size: 1.2em; font-weight: bold; border-radius: 5px; text-align: center">Save</strong>
			</div>
		</div>
		<div style="flex: 1; display: flex; flex-direction: column">
			<div style="height: 150px; padding: 30px">
				<input v-model="postTitle" placeholder="Title" style="height: 100%; width: 100%; border: none; outline: none; background-color: #f7e4de; font-size: 2.8em; font-weight: bold" />
			</div>

			<div style="flex: 1; padding: 30px">
				<p style="margin-bottom: 10px; color: rgb(80, 80, 80); font-size: 1.5em">Content</p>

				<QuillEditor style="height: 80%" v-model:content="rich_text" theme="snow" contentType="delta" :toolbar="customToolbarOptions" :options="editor_options" />
			</div>
		</div>
	</div>
</template>

<script setup>
import {  ref } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api/APIs";
import { useRouter } from "vue-router";
const router = useRouter();

const myToken = window.sessionStorage.getItem("token");
const myName = window.sessionStorage.getItem("name");

const post_color_list = ref(["lightgoldenrodyellow", "lightcoral", "lightcyan", "lightsalmon"]);
const current_post_color = ref(post_color_list.value[0]);

function handle_post_color(color) {
	return {
		backgroundColor: color,
		border: color === current_post_color.value ? "1px solid black" : "none",
	};
}

const postTitle = ref();
const postContent = ref();

/*const postForm = reactive({
	title: postTitle.value,
	content: postContent.value,
	post_color: current_post_color.value,
	token: myToken,
	name: myName,
	file: [],
	email: myEmail,
});*/
let postForm2 = new FormData();

function goSavePost() {
	if (rich_text.value === undefined) {
		ElMessage({
			message: "Title or Content cannot be empty",
			type: "warning",
		});
		return;
	}

	const text = rich_text.value.ops.map((op) => op.insert).join("");
	if (text === "") {
		ElMessage({
			message: "Title or Content cannot be empty",
			type: "warning",
		});
	} else {
		postForm.title = postTitle.value;
		postForm.content = rich_text.value;
		postForm.post_color = current_post_color.value;
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

import { QuillEditor, Quill } from "@vueup/vue-quill";
import ImageResize from "quill-image-resize-vue"; // Note, this doesn't use deconstruction
import { ImageDrop } from "quill-image-drop-module";
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const customToolbarOptions = [
	["bold", "italic", "underline", "strike"],
	["blockquote", "code-block"],
	[{ header: 1 }, { header: 2 }],
	[{ list: "ordered" }, { list: "bullet" }],
	[{ script: "sub" }, { script: "super" }],
	[{ indent: "-1" }, { indent: "+1" }],
	[{ direction: "rtl" }],
	[{ size: ["small", false, "large", "huge"] }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ color: [] }, { background: [] }],
	[{ font: [] }],
	[{ align: [] }],
	["link", "image", "video"], // Add image and video options
	["clean"],
];

const rich_text = ref(undefined);

const editor_options = {
	modules: {
		imageResize: {
			displaySize: true,
		},
		imageDrop: {},
	},
};
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
