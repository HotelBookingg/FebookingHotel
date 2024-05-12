import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getHotelListRequest,
  getHotelDetailFailure,
  getHotelDetailSuccess,
  getHotelDetailRequest,
  getHotelListFailure,
  getHotelListSuccess,
} from "../slicers/hotel.slicer";

function* getHotelListSaga(action) {
  try {
    const { page, limit, more } = action.payload;
    const result = yield axios.get("http://localhost:4000/hotels", {
      params: {
        isDelete: false,
        _page: page,
        _limit: limit,
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
export default function* hotelSaga() {
  yield takeEvery(getHotelListRequest, getHotelListSaga);
  yield takeEvery(getHotelDetailRequest, getHotelDetailSaga);
}
