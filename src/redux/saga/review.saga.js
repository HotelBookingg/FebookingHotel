import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
} from "../../redux/slicers/review.slicer";

function* getReviewListSaga(action) {
  try {
    const { hotelId, limit } = action.payload;
    const result = yield axios.get("http://localhost:4000/reviews", {
      params: {
        ...(limit && { _limit: limit }),
        _expand: "user",
        _sort: "id",
        _order: "desc",
        ...(hotelId && { hotelId: hotelId }),
      },
    });
    yield put(getReviewListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getReviewListFailure({ error: "Lỗi" }));
  }
}
function* createReviewListSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/reviews", data);
    yield callback();
    yield put(getReviewListRequest({ productId: data.productId }));
    yield put(createReviewSuccess({ data: result.data }));
  } catch (e) {
    yield put(createReviewFailure("Đã có lỗi xảy ra!"));
  }
}
function* deleteReviewSaga(action) {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:4000/reviews/${id}`);
    yield put(deleteReviewSuccess({ id: id }));
  } catch (e) {
    yield put(deleteReviewFailure("Đã có lỗi xảy ra!"));
  }
}

export default function* ReviewSaga() {
  yield takeEvery(getReviewListRequest, getReviewListSaga);
  yield takeEvery(createReviewRequest, createReviewListSaga);
  yield takeEvery(deleteReviewRequest, deleteReviewSaga);
}
