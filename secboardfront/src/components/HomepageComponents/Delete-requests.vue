<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Delete Requests</h1>
	</div>

<div id="details" style="display:block">
	<div style="height: 50%; width: 45%; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:380px; top:150px; position:absolute; z-index: 1000">
		<div class="btn view-details-panel" style="display: flex; justify-content: left; align-items: top; color: #0c3f51; border-radius: 20px;">
			<strong style="font-size: 30px; color: #0C3F51; padding: 50px 40px; position:absolute">Post Title:</strong>
			<strong style="font-size: 25px; color: #000000; padding: 100px 40px; position:absolute" id="viewDetailsTitle"></strong>
			<strong style="font-size: 30px; color: #0C3F51; padding: 180px 40px; position:absolute">Post Content:</strong>
			<p style="text-align: left; font-size: 18px; color: #000000; padding: 230px 40px; position:absolute; width:50%; " id="viewDetailsContent"></p>
		</div>
	</div>

	<div style="position:absolute; z-index: 1001; left:930px; top:180px">
		<img @click="viewDetails" style="height: 8%; width: 8%; cursor:pointer" src="../../../public/black-cross.svg" />
	</div>
	
	<div style="height: 100%; width: 100%; position:absolute; background:#0C3F51; opacity: 0.5; z-index:999; top:0; left:0;">
	</div>
</div>

<li v-for="(dl, index) in deletionsList" :key="index">
	<table>
	<tr>
		<td>
			<h2 style="margin-left: 50px; font-size: 2em; font-weight: bold">Request Date - {{ dl.requestDate }}</h2>
		</td>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div class="btn accept" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
					<strong style="font-size: 20px; color: #ffffff">Accept</strong>
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div @click="viewDetails(dl)" class="btn view-details" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px; cursor: pointer">
					<strong style="font-size: 20px">View Details</strong>
				</div>
			</div>
		</td>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div class="btn reject" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
					<strong style="font-size: 20px; color: #ffffff">Reject</strong>
				</div>
			</div>
		</td>
	</tr>
	</table>
	<hr>
</li>
	
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@/api/APIs";
const mytoken = window.sessionStorage.getItem("token");

const deletionsList = ref();

const authForm = reactive({
	token: mytoken,
});

api.getDeleteRequest(authForm).then((res) => {
	console.log(res.deletion_requests);
	deletionsList.value = res.deletion_requests;
});

function viewDetails(dl) {
	document.getElementById("viewDetailsTitle").innerHTML = dl.originalTitle;
	document.getElementById("viewDetailsContent").innerHTML = dl.originalMessage;
	var x = document.getElementById("details");
	if (x.style.display == "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

</script>

<style scoped>
	table {
		width: 50%;
	}
	.btn {
		border: 1px solid black;
		background-color: white;
		color: black;
		padding: 14px 28px;
		font-size: 16px;
		cursor: pointer;
	}
	.view-details {
		background-color: #ffffff;
		border: 1px solid black;
		border-color: #0c3f51;
	}
	.view-details:hover {
		background-color: #ebebeb;
		border: 1px solid black;
		border-color: #0c3f51;
	}
	.accept {
		background-color: #41894B;
		border: 0px solid black;
		padding: 14px 80px;
		width: 70%;
	}
	.accept:hover {
		background-color: #326A3A;
	}
	.reject {
		background-color: #992C2C;
		border: 0px solid black;
		text-align: center;
		width: 70%;
	}
	.reject:hover {
		background-color: #872424;
	}
	hr {
		margin-top: 20px;
	}
	.view-details-panel {
		background-color: #F7E4DE;
		border: 0px solid black;
		border-color: #0c3f51;
		text-align: center;
		width: 70%;
		cursor: auto;
	}
</style>
