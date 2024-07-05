import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getCityListRequest,
  getCityListSuccess,
  getCityListFailure,
} from "../slicers/location.slicer";

function* getCityListSaga(action) {
  try {
    const result = yield axios.get("http://localhost:4000/cities");
    yield put(getCityListSuccess({ data: result.data }));
  } catch (e) {
    yield put(getCityListFailure({ error: "Lỗi" }));
  }
}

export default function* LocationSaga() {
  yield takeEvery(getCityListRequest, getCityListSaga);
}
