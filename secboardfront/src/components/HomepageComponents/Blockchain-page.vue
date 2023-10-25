<template>
	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Standard Chain</h1>
	</div>
	<div style="flex: 1">
		<div style="background-color: white; min-height: 500px; margin: 20px 20px 20px 50px; border-radius: 5px">
			<ul style="display: grid; grid-template-columns: repeat(3, minmax(350px, 35%)); grid-auto-rows: 350px">
				<li v-for="(pl, index) in postsList" :key="index" style="height: 300px; margin: 20px; background-color: #fdf2b3; border-radius: 5px">
					<div style="padding: 15px">
						<div>
							<strong style="font-weight: bold; font-size: 2em">{{ pl.blockNumber }}</strong>
						</div>
						<div style="margin-top: 5px">
							<span style="font-size: 0.76em">
								{{ pl }}
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<div style="height: 20%; display: flex; align-items: center">
		<h1 style="margin-left: 50px; font-size: 3em; font-weight: bold">Correction Chain</h1>
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
								{{ pl }}
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
var postsList = ref([]);

async function getBlockchain() {
	var blockchain = [];
	var blockNumber = 1;
	try {
		let response = await fetch("/files/database.JSON");
		let responsejson = await response.json();
		for (const i of responsejson["Main chain"]) {
			var block = [];
			var blockNumberString = String(blockNumber);
			block.push(blockNumberString);
			blockNumber = blockNumber + 1;
			if (i && i["Previous Hash"]) {
				block.push(i["Previous Hash"]);
				block.push(i["Data"]);
				block.push(i["Proof of work"]);
			} else {
				block.push("CORRECTED");
				block.push("CORRECTED");
				block.push("CORRECTED");
			}
			blockchain.push(block);
		}
		postsList.value = blockchain;
	} catch (err) {
		console.error("Error fetching and processing the blockchain:", err);
	}
	// return blockchain;
}
getBlockchain();
// postsList.value = await getBlockchain();

// console.log(postsList.value);
</script>

<style></style>
