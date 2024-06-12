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
} from "../slicers/hotel.slicer";

function* getHotelListSaga(action) {
  try {
    const { page, limit, more, searchKey } = action.payload;
    const result = yield axios.get("http://localhost:4000/hotels", {
      params: {
        isDelete: false,
        _page: page,
        _limit: limit,
        q: searchKey,
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
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/hotels/${id}`, {
      params: {
        isDelete: false,
        _embed: "images",
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
function* createSearchHistorySaga(action) {
  try {
    const { data } = action.payload;
    const result = yield axios.post(`http://localhost:4000/hotels`, data);
    yield put(createSearchHistorySuccess({ data: result.data }));
  } catch (e) {
    yield put(createSearchHistoryFailure({ error: "Lỗi" }));
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
}
