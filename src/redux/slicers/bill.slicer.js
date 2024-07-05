import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

const initialState = {
  billList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  bill: {
    data: {},
    meta: {},
    loading: false,
    error: null,
  },
  billHotelData: {
    loading: false,
    error: null,
  },
  updateBillData: {
    loading: false,
    error: null,
  },
  cancelBillData: {
    loading: false,
    error: null,
  },
  confirmPayData: {
    loading: false,
    error: null,
  },
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    // getBillList
    getBillListRequest: (state, action) => {
      state.billList.loading = true;
      state.billList.error = null;
    },
    getBillListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.billList.data = data;
      state.billList.meta = meta;
      state.billList.loading = false;
    },
    getBillListFailure: (state, action) => {
      const { error } = action.payload;
      state.billList.loading = false;
      state.billList.error = error;
    },
    // getBill
    getBillRequest: (state, action) => {
      state.bill.loading = true;
      state.bill.error = null;
    },
    getBillSuccess: (state, action) => {
      const { data } = action.payload;
      state.bill.data = data;
      state.bill.loading = false;
    },
    getBillFailure: (state, action) => {
      const { error } = action.payload;
      state.bill.loading = false;
      state.bill.error = error;
    },
    //billHotel
    billHotelRequest: (state, action) => {
      state.billHotelData.loading = true;
      state.billHotelData.error = null;
    },
    billHotelSuccess: (state, action) => {
      state.billHotelData.loading = false;
      state.billHotelData.error = null;
    },
    billHotelFailure: (state, action) => {
      const { error } = action.payload;
      state.billHotelData.loading = false;
      state.billHotelData.error = error;
    },
    //updateBill
    updateBillRequest: (state) => {
      state.updateBillData.loading = true;
      state.updateBillData.error = null;
    },
    updateBillSuccess: (state, action) => {
      state.updateBillData.loading = false;
      notification.success({ message: "Đã xác nhận thanh toán!" });
    },
    updateBillFailure: (state, action) => {
      const { error } = action.payload;
      state.updateBillData.loading = false;
      state.updateBillData.error = error;
    },
    //cancelBill
    cancelBillRequest: (state) => {
      state.cancelBillData.loading = true;
      state.cancelBillData.error = null;
    },
    cancelBillSuccess: (state, action) => {
      state.cancelBillData.loading = false;
      notification.success({ message: "Hủy phòng thành công" });
    },
    cancelBillFailure: (state, action) => {
      const { error } = action.payload;
      state.cancelBillData.loading = false;
      state.cancelBillData.error = error;
    },
    //confirmPay
    confirmPayRequest: (state) => {
      state.confirmPayData.loading = true;
      state.confirmPayData.error = null;
    },
    confirmPaySuccess: (state, action) => {
      state.confirmPayData.loading = false;
      notification.success({ message: "Hoàn tất hóa đơn!" });
    },
    confirmPayFailure: (state, action) => {
      const { error } = action.payload;
      state.confirmPayData.loading = false;
      state.confirmPayData.error = error;
    },
  },
});

export const {
  getBillListRequest,
  getBillListSuccess,
  getBillListFailure,
  getBillRequest,
  getBillSuccess,
  getBillFailure,
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
} = billSlice.actions;

export default billSlice.reducer;
