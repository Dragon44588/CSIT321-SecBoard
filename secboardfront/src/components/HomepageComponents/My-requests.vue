<template>
	<div v-if="showPopup_Edit">
		<View_Detail_Delete_Popup style="display: none" />
		<div style="display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(108, 108, 108, 0.5); z-index: 9999">
			<div style="height: 400px; width: 500px; background-color: white; border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; padding: 20px 30px 30px 30px">
				<div style="width: 100%; display: flex; justify-content: flex-end">
					<img @click="showPopup_Edit = false" style="height: 50px; width: 50px; cursor: pointer" src="../../../public/close-outline.svg" />
				</div>
				<div style="width: 100%; overflow: auto">
					<h1 style="color: #136583">Original Post</h1>
					<h2>{{ edit_popup.title }}</h2>
					<h3>{{ edit_popup.content }}</h3>

					<h1 style="color: #136583; margin-top: 20px; border-top: 1px solid gray; padding-top: 20px">Edited Post</h1>
					<h2>{{ edit_popup.title }}</h2>
					<h3>{{ edit_popup.content }} <span style="color: red">new added/edited text shown in red</span></h3>
				</div>
			</div>
		</div>
	</div>

	<div v-if="showPopup_Delete" style="display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(108, 108, 108, 0.5); z-index: 9999">
		<div style="height: 400px; width: 500px; background-color: white; border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; padding: 20px 30px 30px 30px">
			<div style="width: 100%; display: flex; justify-content: flex-end">
				<img @click="showPopup_Delete = false" style="height: 50px; width: 50px; cursor: pointer" src="../../../public/close-outline.svg" />
			</div>
			<div style="width: 100%; overflow: auto">
				<h1 style="color: #136583">Post Title:</h1>
				<h2>{{ delete_popup.originalTitle }}</h2>

				<h1 style="color: #136583; margin-top: 20px">Post Content:</h1>
				<h3>{{ delete_popup.originalMessage }}</h3>
			</div>
		</div>
	</div>

	<div style="height: 100%; display: flex; flex-direction: column; align-items: center">
		<div style="width: 90%">
			<h1 style="margin: 30px 0 50px 0; font-size: 2.5em; font-weight: 900">Edit Requests</h1>
			<ul>
				<li v-for="(post, index) in postsList" :key="index" style="border-bottom: 1px solid gray; padding-bottom: 10px; display: flex; justify-content: center">
					<div style="flex: 1; display: flex; justify-content: space-between">
						<div>
							<h3>Request Date - {{ post.timestamp }}</h3>
							<h4 @click="get_edit_popup_content(index)" class="view_detail_button_css" style="margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; width: max-content; border-radius: 10px; cursor: pointer">View Details</h4>
						</div>

						<div style="min-width: 200px">
							<h3 style="background-color: rgb(221, 221, 2); margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">Requested</h3>
							<h4 style="background-color: #e6cec5; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center">Votes Receivied: 1</h4>
						</div>
					</div>
				</li>

				<li style="border-bottom: 1px solid gray; margin-top: 20px; padding-bottom: 10px; display: flex; justify-content: center">
					<div style="flex: 1; display: flex; justify-content: space-between">
						<div>
							<h3>Request Date - 05/05/2023</h3>
							<h4 style="background-color: white; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; width: max-content; border-radius: 10px">View Details</h4>
						</div>

						<div style="min-width: 200px">
							<h3 style="background-color: green; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">Accepted</h3>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<div style="width: 90%; margin-top: 50px; margin-bottom: 20px">
			<h1 style="margin: 30px 0 50px 0; font-size: 2.5em; font-weight: 900">Delete Requests</h1>
			<ul>
				<li v-for="(post, index) in deleteReuqestsList" :key="index" style="border-bottom: 1px solid gray; padding-bottom: 10px; display: flex; justify-content: center">
					<div style="flex: 1; display: flex; justify-content: space-between">
						<div>
							<h3>Request Date - {{ post.requestDate }}</h3>
							<h4 @click="get_delete_popup_content(index)" class="view_detail_button_css" style="margin-top: 10px; cursor: pointer; border: 1px solid gray; padding: 5px 10px 5px 10px; width: max-content; border-radius: 10px">View Details</h4>
						</div>

						<!-- <div style="min-width: 200px">
							<h3 style="background-color: rgb(221, 221, 2); margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">Requested</h3>
							<h4 style="background-color: #e6cec5; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center">Votes Receivied: 1</h4>
						</div> -->

						<div style="min-width: 200px">
							<h3 style="background-color: green; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">Accepted</h3>
						</div>
					</div>
				</li>

				<li style="border-bottom: 1px solid gray; margin-top: 20px; padding-bottom: 10px; display: flex; justify-content: center">
					<div style="flex: 1; display: flex; justify-content: space-between">
						<div>
							<h3>Request Date - 05/05/2023</h3>
							<h4 style="background-color: white; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; width: max-content; border-radius: 10px">View Details</h4>
						</div>

						<div style="min-width: 200px">
							<h3 style="background-color: red; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">Rejected</h3>
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
const deleteReuqestsList = ref();

const showPopup_Edit = ref(false);
const edit_popup = ref();

const showPopup_Delete = ref(false);
const delete_popup = ref();

function get_edit_popup_content(index) {
	showPopup_Edit.value = true;
	edit_popup.value = postsList.value[index];
}

function get_delete_popup_content(index) {
	showPopup_Delete.value = true;
	delete_popup.value = deleteReuqestsList.value[index];
}

const authForm = reactive({
	token: mytoken,
});
api.getPostsApi(authForm).then((res) => {
	console.log(res.posts);
	postsList.value = res.posts;
});
api.getDeleteRequest(authForm).then((res) => {
	console.log("Im Delete Request List", res.deletion_requests);
	deleteReuqestsList.value = res.deletion_requests;
});
</script>

<style scoped>
.view_detail_button_css {
	background-color: white;
}
.view_detail_button_css:hover {
	background-color: rgb(174, 174, 174);
}
</style>
