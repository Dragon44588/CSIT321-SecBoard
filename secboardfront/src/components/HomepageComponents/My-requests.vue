<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Edit Requests</h1>
	</div>
	<table>
	<tr>
		<td>
			<h2 style="margin-left: 50px; font-size: 2em; font-weight: bold">Request Date - </h2>
		</td>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div class="btn requested" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
					<strong style="font-size: 20px; color: #ffffff">Requested</strong>
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div @click="showDetails" class="btn view-details" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px; cursor: pointer">
					<strong style="font-size: 20px">View Details</strong>
				</div>
			</div>
		</td>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div @click="showDetails" class="btn votes-received" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
					<strong style="font-size: 20px">Votes Received - 1</strong>
				</div>
			</div>
		</td>
	</tr>
	</table>
	<hr>


	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Delete Requests</h1>
	</div>
	<table>
	<tr>
		<td>
			<h2 style="margin-left: 50px; font-size: 2em; font-weight: bold">Request Date - </h2>
		</td>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div class="btn requested" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
					<strong style="font-size: 20px; color: #ffffff">Requested</strong>
				</div>
			</div>
		</td>
	</tr>
	<tr>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div @click="showDetails" class="btn view-details" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px; cursor: pointer">
					<strong style="font-size: 20px">View Details</strong>
				</div>
			</div>
		</td>
		<td>
			<div style="height: 40px; margin-top: 20px; display: flex; justify-content: left; align-items: left; left:50px; position:relative">
				<div @click="showDetails" class="btn votes-received" style="display: flex; justify-content: center; align-items: center; color: #0c3f51; border-radius: 10px;">
					<strong style="font-size: 20px">Votes Received - 1</strong>
				</div>
			</div>
		</td>
	</tr>
	</table>
	<hr>
	
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
	.requested {
		background-color: #e5bb2d;
		border: 0px solid black;
		padding: 14px 80px;
		width: 70%;
	}
	.votes-received {
		background-color: #f1c3c3;
		border: 1px solid black;
		border-color: #0c3f51;
		text-align: center;
		width: 70%;
	}
	hr {
		margin-top: 20px;
	}
</style>
