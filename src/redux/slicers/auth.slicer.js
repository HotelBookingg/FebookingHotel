import { createSlice } from "@reduxjs/toolkit";

import { notification } from "antd";

const initialState = {
  userInfo: {
    data: {},
    loading: true,
    error: null,
  },
  userList: {
    data: [],
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
  registerData: {
    loading: false,
    error: null,
  },
  changePassword: {
    loading: false,
    error: null,
  },
  updateUserInfoData: {
    loading: false,
    error: null,
  },
  changeAvatarData: {
    loading: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login
    loginRequest: (state, action) => {
      state.loginData.loading = true;
      state.loginData.error = null;
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.loginData.loading = false;
      state.userInfo.loading = false;
    },
    loginFailure: (state, action) => {
      const { error } = action.payload;
      state.loginData.loading = false;
      state.loginData.error = error;
    },
    // register
    registerRequest: (state, action) => {
      state.registerData.loading = true;
      state.registerData.error = null;
    },
    registerSuccess: (state, action) => {
      state.registerData.loading = false;
    },
    registerFailure: (state, action) => {
      const { error } = action.payload;
      state.registerData.loading = false;
      state.registerData.error = error;
    },
    registerAndLoginRequest: (state, action) => {
      state.registerData.loading = true;
      state.registerData.error = null;
    },
    // logout
    logoutRequest: (state) => {
      state.userInfo.data = {};
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("preLoginPath");
    },
    // getUserInfo
    getUserInfoRequest: (state, action) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
    },
    getUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = error;
    },
    // Change password
    changePasswordRequest: (state, action) => {
      state.changePassword.loading = true;
      state.changePassword.error = null;
    },
    changePasswordSuccess: (state, action) => {
      state.changePassword.loading = false;
    },
    changePasswordFailure: (state, action) => {
      const { error } = action.payload;
      state.changePassword.loading = false;
      state.changePassword.error = error;
    },
    // updateUserInfo
    updateUserInfoRequest: (state, action) => {
      state.updateUserInfoData.loading = true;
      state.updateUserInfoData.error = null;
    },
    updateUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.updateUserInfoData.loading = false;
      notification.success({ message: "cập nhật thành công!" });
    },
    updateUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.updateUserInfoData.loading = false;
      state.updateUserInfoData.error = error;
    },
    // changeAvatar
    changeAvatarRequest: (state, action) => {
      state.changeAvatarData.loading = true;
      state.changeAvatarData.error = null;
    },
    changeAvatarSuccess: (state, action) => {
      const { avatar } = action.payload;
      state.changeAvatarData.loading = false;
      state.userInfo.data.avatar = avatar;
    },
    changeAvatarFailure: (state, action) => {
      const { error } = action.payload;
      state.changeAvatarData.loading = false;
      state.changeAvatarData.error = error;
    },
    // searchUser
    searchUserRequest: (state, action) => {
      state.userList.loading = true;
      state.userList.error = null;
    },
    searchUserSuccess: (state, action) => {
      const { data } = action.payload;
      state.userList.data = data;
      state.userList.loading = false;
    },
    searchUserFailure: (state, action) => {
      const { error } = action.payload;
      state.userList.loading = false;
      state.userList.error = error;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginLock,
  loginFailure,
  registerRequest,
  registerFailure,
  registerSuccess,
  registerAndLoginRequest,
  getUserInfoFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  logoutRequest,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFailure,
  searchUserRequest,
  searchUserSuccess,
  searchUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
