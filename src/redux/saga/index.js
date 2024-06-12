import { fork } from "redux-saga/effects";
import hotelSaga from "./hotel.saga";
import authSaga from "./auth.saga";
import billSaga from "./bill.saga";
export default function* rootSaga() {
  yield fork(hotelSaga);
  yield fork(authSaga);
  yield fork(billSaga);
}
