import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
const initialState = {
  hotelList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  hotelDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    // getHotelList
    getHotelListRequest: (state, action) => {
      state.hotelList.loading = true;
      state.hotelList.error = null;
    },
    getHotelListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.hotelList.data = more ? [...state.hotelList.data, ...data] : data;
      state.hotelList.meta = meta;
      state.hotelList.loading = false;
    },
    getHotelListFailure: (state, action) => {
      const { error } = action.payload;
      state.hotelList.loading = false;
      state.hotelList.error = error;
    },
    // getHotelDetail
    getHotelDetailRequest: (state, action) => {
      state.hotelDetail.loading = true;
      state.hotelDetail.error = null;
    },
    getHotelDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.hotelDetail.data = data;
      state.hotelDetail.loading = false;
    },
    getHotelDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.hotelDetail.loading = false;
      state.hotelDetail.error = error;
    },
  },
});

export const {
  getHotelListRequest,
  getHotelDetailFailure,
  getHotelDetailSuccess,
  getHotelDetailRequest,
  getHotelListFailure,
  getHotelListSuccess,
} = hotelSlice.actions;

export default hotelSlice.reducer;
