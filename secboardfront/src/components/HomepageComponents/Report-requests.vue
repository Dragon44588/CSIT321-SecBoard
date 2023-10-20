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
	<div v-if="showPopup_report" style="display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(108, 108, 108, 0.5); z-index: 9999">
		<div style="height: 400px; width: 500px; background-color: white; border-radius: 20px; display: flex; flex-direction: column; overflow: hidden; padding: 20px 30px 30px 30px">
			<div style="width: 100%; display: flex; justify-content: flex-end">
				<img @click="showPopup_report = false" style="height: 50px; width: 50px; cursor: pointer" src="../../../public/close-outline.svg" />
			</div>
			<div style="width: 100%; overflow: auto">
				<h1 style="color: #136583">Post Title:</h1>
				<h2>{{ report_popup.originalTitle }}</h2>

				<h1 style="color: #136583; margin-top: 20px">Post Content:</h1>
				<!-- <h3>{{ report_popup.originalMessage }}</h3> -->
				<QuillEditor v-model:content="report_popup.originalMessage.ops" theme="bubble" :options="editorOptions" />
			</div>
		</div>
	</div>
	<div style="height: 100%; display: flex; flex-direction: column; align-items: center">
		<div style="width: 90%; margin-top: 50px; margin-bottom: 20px">
			<h1 style="margin: 30px 0 50px 0; font-size: 2.5em; font-weight: 900">Report Requests</h1>
			<ul>
				<li v-for="(post, index) in reportReuqestsList" :key="index" style="border-bottom: 1px solid gray; padding-bottom: 10px; display: flex; justify-content: center">
					<div style="flex: 1; display: flex; justify-content: space-between">
						<div>
							<h3>Request Date - {{ post.requestDate }}</h3>
							<h4 @click="get_report_popup_content(index)" class="view_detail_button_css" style="margin-top: 10px; cursor: pointer; border: 1px solid gray; padding: 5px 10px 5px 10px; width: max-content; border-radius: 10px">View Details</h4>
						</div>

						<!-- <div style="min-width: 200px">
							<h3 style="background-color: rgb(221, 221, 2); margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">Requested</h3>
							<h4 style="background-color: #e6cec5; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center">Votes Receivied: 1</h4>
						</div> -->

						<div style="min-width: 200px">
							<div v-if="post.did_u_vote === ''">
								<h3 @click="handleReportRequest(post, 1)" style="background-color: green; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white; cursor: pointer">Accept</h3>
								<h3 @click="handleReportRequest(post, 0)" style="background-color: red; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white; cursor: pointer">Reject</h3>
							</div>

							<div v-else>
								<h3 :style="{ backgroundColor: post.did_u_vote === 'voted_yes' ? 'green' : 'red' }" style="margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center; color: white">{{ post.did_u_vote === "voted_yes" ? "Accepted" : "Rejected" }}</h3>
							</div>

							<div style="background-color: #e6cec5; margin-top: 10px; border: 1px solid gray; padding: 5px 10px 5px 10px; border-radius: 10px; text-align: center">
								<h4>Current Votes</h4>
								<h4>Yes: {{ post.yes_votes }} || No: {{ post.no_votes }}</h4>
							</div>
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
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
const mytoken = window.sessionStorage.getItem("token");

const reportReuqestsList = ref();
const showPopup_report = ref(false);
const report_popup = ref();

const authForm = reactive({
	token: mytoken,
});

api.getReportRequest(authForm).then((res) => {
	reportReuqestsList.value = res.report_requests;
});

function get_report_popup_content(index) {
	showPopup_report.value = true;
	report_popup.value = reportReuqestsList.value[index];
}

const handle_report_request_form = reactive({
	token: mytoken,
	post_id: null,
	yes_or_no: null,
});

function handleReportRequest(post, yes_or_no) {
	handle_report_request_form.post_id = post.post_id;
	handle_report_request_form.yes_or_no = yes_or_no;
	api.handleReportRequest(handle_report_request_form).then((res) => {
		if (res.status === 200) {
			console.log("handled a report request");
			api.getDeleteRequest(authForm).then((res) => {
				reportReuqestsList.value = res.report_requests;
			});
		}
	});
}
</script>

<style scoped>
.view_detail_button_css {
	background-color: white;
}
.view_detail_button_css:hover {
	background-color: rgb(174, 174, 174);
}
</style>
