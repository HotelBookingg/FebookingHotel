import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  getBillListRequest,
  getBillListSuccess,
  getBillListFailure,
  billHotelRequest,
  billHotelSuccess,
  billHotelFailure,
  updateBillRequest,
  updateBillSuccess,
  updateBillFailure,
  cancelBillRequest,
  cancelBillSuccess,
  cancelBillFailure,
  confirmPayRequest,
  confirmPaySuccess,
  confirmPayFailure,
  getBillRequest,
  getBillSuccess,
  getBillFailure,
} from "../slicers/bill.slicer";

function* getBillSaga(action) {
  try {
    const { billId } = action.payload;
    const result = yield axios.get("http://localhost:4000/bills", {
      params: {
        billId: billId,
        isDelete: false,
        _expand: "hotel",
      },
    });
    yield put(getBillSuccess({ data: result.data[0] }));
  } catch (e) {
    yield put(getBillFailure({ error: "Lỗi" }));
  }
}

function* getBillListSaga(action) {
  try {
    const { userId, page, limit, more, searchKey } = action.payload;
    let result;
    if (userId) {
      result = yield axios.get("http://localhost:4000/orders", {
        params: {
          _embed: "orderDetails",
          userId: userId,
          _sort: "createdAt",
          _order: "desc",
          _page: page,
          _limit: limit,
        },
      });
    } else {
      result = yield axios.get("http://localhost:4000/orders", {
        params: {
          _embed: "orderDetails",
          isDelete: false,
          _sort: "createdAt",
          _order: "desc",
          ...(searchKey && { q: searchKey }),
        },
      });
    }

    yield put(
      getBillListSuccess({
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
    yield put(getBillListFailure({ error: "Lỗi" }));
  }
}
function* billHotelSaga(action) {
  try {
    const { billHotelData, callback } = action.payload;
    const orderResult = yield axios.post(
      "http://localhost:4000/bills",
      billHotelData
    );
    yield put(
      billHotelSuccess({
        data: {
          ...billHotelData,
        },
      })
    );
    yield callback();
  } catch (e) {
    yield put(billHotelFailure({ error: "Lỗi" }));
  }
}
function* updateBillSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/orders/${id}`, {
      status: "confirm",
    });
    yield put(updateBillSuccess({ data: result.data }));
    yield put(getBillListRequest({}));
  } catch (e) {
    yield put(updateBillFailure({ error: "Lỗi" }));
  }
}
function* cancelBillSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/orders/${id}`, {
      status: "cancel",
      isDelete: true,
    });
    yield put(cancelBillSuccess({ data: result.data }));
    yield put(getBillListRequest({}));
  } catch (e) {
    yield put(cancelBillFailure({ error: "Lỗi" }));
  }
}
function* confirmPaySaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/orders/${id}`, {
      status: "complete",
      isDelete: true,
    });
    yield put(confirmPaySuccess({ data: result.data }));
    yield put(getBillListRequest({}));
  } catch (e) {
    yield put(confirmPayFailure({ error: "Lỗi" }));
  }
}
export default function* billSaga() {
  yield takeEvery(getBillListRequest, getBillListSaga);
  yield takeEvery(billHotelRequest, billHotelSaga);
  yield takeEvery(updateBillRequest, updateBillSaga);
  yield takeEvery(cancelBillRequest, cancelBillSaga);
  yield takeEvery(confirmPayRequest, confirmPaySaga);
  yield takeEvery(getBillRequest, getBillSaga);
}
