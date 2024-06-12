import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { notification } from "antd";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loginLock,
  registerRequest,
  registerFailure,
  registerSuccess,
  registerAndLoginRequest,
  getUserInfoFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
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
} from "../slicers/auth.slicer";
function* loginSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put(loginSuccess({ data: result.data.user }));
  } catch (e) {
    yield put(loginFailure({ error: "Email hoặc mật khẩu không đúng!" }));
  }
}
function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:4000/register", data);
    yield callback();
    yield put(registerSuccess());
    yield notification.success({
      message: "Đăng ký thành công!",
    });
  } catch (e) {
    yield put(
      registerFailure({
        error:
          e.response.data === "Email already exists"
            ? "Email đã tồn tại"
            : "Lỗi",
      })
    );
  }
}
function* registerAndLoginSaga(action) {
  try {
    const { data } = action.payload;
    yield axios.post("http://localhost:4000/register", data);
    yield put(registerSuccess());
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield put(loginSuccess({ data: result.data.user }));
  } catch (e) {
    yield put(
      registerFailure({
        error:
          e.response.data === "Email already exists"
            ? "Email đã tồn tại"
            : "Lỗi",
      })
    );
  }
}
function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put(getUserInfoSuccess({ data: result.data }));
  } catch (e) {
    yield put(getUserInfoFailure({ error: "Lỗi" }));
  }
}
function* changePasswordSaga(action) {
  try {
    const { data, reset, userId } = action.payload;
    yield axios.post("http://localhost:4000/login", data);
    const result = yield axios.patch(`http://localhost:4000/users/${userId}`, {
      password: data.newPassword,
    });
    yield put(changePasswordSuccess({ data: result.data }));
    yield reset();
    notification.success({ message: "Thay đổi mật khẩu thành công" });
  } catch (e) {
    yield put(changePasswordFailure({ error: "Mật khẩu không đúng!" }));
  }
}
function* updateUserInfoSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, data);
    yield put(updateUserInfoSuccess({ data: result.data }));
  } catch (e) {
    yield put(updateUserInfoFailure({ error: "Lỗi" }));
  }
}

function* changeAvatarSaga(action) {
  try {
    const { id, avatar } = action.payload;
    yield axios.patch(`http://localhost:4000/users/${id}`, { avatar: avatar });
    yield put(changeAvatarSuccess({ avatar: avatar }));
  } catch (e) {
    yield put(changeAvatarFailure({ error: "Lỗi" }));
  }
}
function* searchUserSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/users`);
    yield put(searchUserSuccess({ data: result.data }));
  } catch (e) {
    yield put(searchUserFailure({ error: "Lỗi" }));
  }
}
export default function* authSaga() {
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(registerRequest, registerSaga);
  yield takeEvery(getUserInfoRequest, getUserInfoSaga);
  yield takeEvery(changePasswordRequest, changePasswordSaga);
  yield takeEvery(updateUserInfoRequest, updateUserInfoSaga);
  yield takeEvery(changeAvatarRequest, changeAvatarSaga);
  yield takeEvery(searchUserRequest, searchUserSaga);
  yield takeEvery(registerAndLoginRequest, registerAndLoginSaga);
}
