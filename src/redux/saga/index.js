import { fork } from "redux-saga/effects";
import hotelSaga from "./hotel.saga";
import authSaga from "./auth.saga";
import billSaga from "./bill.saga";
import roomSaga from "./room.saga";
import reviewSaga from "./review.saga";
import locationSaga from "./location.saga";

export default function* rootSaga() {
  yield fork(hotelSaga);
  yield fork(authSaga);
  yield fork(billSaga);
  yield fork(roomSaga);
  yield fork(reviewSaga);
  yield fork(locationSaga);
}
