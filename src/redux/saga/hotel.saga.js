import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getHotelListRequest,
  getHotelDetailFailure,
  getHotelDetailSuccess,
  getHotelDetailRequest,
  getHotelListFailure,
  getHotelListSuccess,
  createSearchHistoryRequest,
  createSearchHistorySuccess,
  createSearchHistoryFailure,
  getSearchHistoryRequest,
  getSearchHistorySuccess,
  getSearchHistoryFailure,
  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  updateHotelRequest,
  updateHotelSuccess,
  updateHotelFailure,
  deleteHotelFailure,
  deleteHotelRequest,
  deleteHotelSuccess,
} from "../slicers/hotel.slicer";

function* getHotelListSaga(action) {
  try {
    const { page, limit, more, searchKey, rooms, addressId } = action.payload;
    const result = yield axios.get("http://localhost:4000/hotels", {
      params: {
        isDelete: false,
        _page: page,
        _limit: limit,
        city: addressId,
        q: searchKey,
        ...(rooms && { _embed: "rooms" }),
      },
    });

    yield put(
      getHotelListSuccess({
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more,
      })
    );
  } catch (e) {
    yield put(getHotelListFailure({ error: "Lỗi" }));
  }
}
function* getHotelDetailSaga(action) {
  try {
    const { id, rooms } = action.payload;
    const result = yield axios.get(`http://localhost:4000/hotels/${id}`, {
      params: {
        isDelete: false,
        ...(rooms && { _embed: "rooms" }),
      },
    });
    yield put(
      getHotelDetailSuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(getHotelDetailFailure({ error: "Lỗi" }));
  }
}
function* createHotelSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`http://localhost:4000/hotels`, data);
    yield put(createHotelSuccess({ data: result.data }));
  } catch (e) {
    yield put(createHotelFailure({ error: "Lỗi" }));
  }
}
function* updateHotelSaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/hotels/${data.id}`,
      data
    );
    yield put(updateHotelSuccess({ data: result.data }));
  } catch (e) {
    yield put(updateHotelFailure({ error: "Lỗi" }));
  }
}
function* deleteHotelSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.patch(`http://localhost:4000/hotels/${id}`, {
      isDelete: true,
    });
    yield put(deleteHotelSuccess({ id: id }));
  } catch (e) {
    yield put(updateHotelFailure({ error: "Lỗi" }));
  }
}
function* getSearchHistorySaga(action) {
  try {
    const { limit, userId } = action.payload;
    const result = yield axios.get(`http://localhost:4000/hotels`, {
      params: {
        _limit: limit,
        _sort: "createdAt",
        _order: "desc",
        isDelete: false,
        userId: userId,
      },
    });

    yield put(
      getSearchHistorySuccess({
        data: result.data,
      })
    );
  } catch (e) {
    yield put(getSearchHistoryFailure({ error: "Lỗi" }));
  }
}
export default function* hotelSaga() {
  yield takeEvery(getHotelListRequest, getHotelListSaga);
  yield takeEvery(getHotelDetailRequest, getHotelDetailSaga);
  yield takeEvery(createHotelRequest, createHotelSaga);
  yield takeEvery(updateHotelRequest, updateHotelSaga);
  yield takeEvery(deleteHotelRequest, deleteHotelSaga);
}
