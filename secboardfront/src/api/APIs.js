import requestAPI from "@/api/request";

const loginApi = (data) => {
	return requestAPI.post({
		url: "/login",
		data,
	});
};

const registerApi = (data) => {
	return requestAPI.post({
		url: "/register",
		data,
	});
};

const forgotApi = (data) => {
	return forgotApi.post({
		url: "/forgot",
		data,
	});
};

const getPostsApi = (data) => {
	return requestAPI.post({
		url: "/getPosts",
		data,
	});
};

const getMyPostsApi = (data) => {
	return requestAPI.post({
		url: "/getMyPosts",
		data,
	});
};

const addPost = (data) => {
	return requestAPI.post2({
		url: "/addPost",
		data,
	});
};

const forgotpassword = (data) => {
	return requestAPI.post({
		url: "/forgotpassword",
		data,
	});
};

const resetPassword = (data) => {
	return requestAPI.post({
		url: "/resetpassword",
		data,
	});
};

export default { loginApi, registerApi, forgotApi, getPostsApi, addPost, getMyPostsApi, forgotpassword,resetPassword};
