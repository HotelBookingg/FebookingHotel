import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getRoomDetailFailure,
  getRoomDetailSuccess,
  getRoomDetailRequest,
  updateRoomRequest,
  updateRoomSuccess,
  updateRoomFailure,
  createRoomRequest,
  createRoomSuccess,
  createRoomFailure,
} from "../slicers/room.slicer";

function* getRoomDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/rooms/${id}`, {
      params: {
        isDelete: false,
        _expand: "hotel",
      },
    });
    yield put(
      getRoomDetailSuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(getRoomDetailFailure({ error: "Lỗi" }));
  }
}
function* updateRoomSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/rooms/${data.id}`,
      data
    );
    yield put(
      updateRoomSuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(updateRoomFailure({ error: "Lỗi" }));
  }
}
function* createRoomSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`http://localhost:4000/rooms`, data);
    yield put(createRoomSuccess({ data: result.data }));
  } catch (e) {
    yield put(createRoomFailure({ error: "Lỗi" }));
  }
}
export default function* roomSaga() {
  yield takeEvery(getRoomDetailRequest, getRoomDetailSaga);
  yield takeEvery(updateRoomRequest, updateRoomSaga);
  yield takeEvery(createRoomRequest, createRoomSaga);
}
