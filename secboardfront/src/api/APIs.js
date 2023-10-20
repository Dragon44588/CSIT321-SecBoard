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

const addDeleteRequest = (data) => {
	return requestAPI.post({
		url: "/addDeleteRequest",
		data,
	});
};
const addReportRequest = (data) => {
	return requestAPI.post({
		url: "/addReportRequest",
		data,
	})
}
const addEditRequest = (data) => {
	return requestAPI.post({
		url: "/addEditRequest",
		data,
	});
};

const forgotpassword = (data) => {
	return requestAPI.post({
		url: "/forgotpassword",
		data,
	});
};

const getDeleteRequest = (data) => {
	return requestAPI.post({
		url: "/getDeleteRequest",
		data,
	});
};

const getAllDeleteRequest = (data) => {
	return requestAPI.post({
		url: "/getAllDeleteRequest",
		data,
	});
};

const getReportRequest = (data) => {
	return requestAPI.post({
		url: "/getReportRequest",
		data,
	})
}

const getEditRequest = (data) => {
	return requestAPI.post({
		url: "/getEditRequest",
		data,
	});
};

const getAllEditRequest = (data) => {
	return requestAPI.post({
		url: "/getAllEditRequest",
		data,
	});
};

const handleDeleteRequest = (data) => {
	return requestAPI.post({
		url: "/handle_delete_request",
		data,
	});
};

const handleReportRequest = (data) => {
	return requestAPI.post({
		url: "/handleReportRequest",
		data,
	})
};

const handleEditRequest = (data) => {
	return requestAPI.post({
		url: "/handle_edit_request",
		data,
	});
};

const resetPassword = (data) => {
	return requestAPI.post({
		url: "/resetpassword",
		data,
	});
};

export default {loginApi, registerApi, forgotApi, getPostsApi, addPost, getMyPostsApi, addDeleteRequest,addReportRequest, addEditRequest, forgotpassword,
	resetPassword,getDeleteRequest,getReportRequest, getEditRequest, handleDeleteRequest,handleReportRequest, handleEditRequest, getAllDeleteRequest, getEditRequest, getAllEditRequest};
