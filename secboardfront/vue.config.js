const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: true,
	filenameHashing: true,
	productionSourceMap: false,
});

module.exports = {
	productionSourceMap: false,
};

module.exports = {
	devServer: {
		proxy: {
			"/api": {
				//target: "http://10.12.172.99:3210",
				target: "http://10.0.0.118:8080/",
				changeOrigin: true,
				pathRewrite: {
					"^/api": "api",
				},
			},
		},
	},
};
