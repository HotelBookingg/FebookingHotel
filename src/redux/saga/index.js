import { fork } from "redux-saga/effects";
import hotelSaga from "./hotel.saga";
export default function* rootSaga() {
  yield fork(hotelSaga);
}
