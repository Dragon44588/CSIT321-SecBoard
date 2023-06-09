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
	return requestAPI.post({
		url: "/addPost",
		data,
	});
};

export default { loginApi, registerApi, getPostsApi, addPost, getMyPostsApi };
