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
  createHotel: {
    loading: false,
    error: null,
  },
  updateHotel: {
    loading: false,
    error: null,
  },
  deleteHotel: {
    loading: false,
    error: null,
  },
  searchSuggestions: {
    data: [],
    loading: false,
    error: null,
  },
  searchHistories: {
    data: [],
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
    // createHotel
    createHotelHappening: (state, action) => {
      state.createHotel.loading = true;
    },
    createHotelFinish: (state, action) => {
      state.createHotel.loading = false;
    },
    createHotelRequest: (state, action) => {
      state.createHotel.loading = true;
      state.createHotel.error = null;
    },
    createHotelSuccess: (state, action) => {
      const { data } = action.payload;
      state.hotelList.data = [...state.hotelList.data, data];
      state.createHotel.loading = false;
    },
    createHotelFailure: (state, action) => {
      const { error } = action.payload;
      state.createHotel.loading = false;
      state.createHotel.error = error;
    },
    //updateHotel
    updateHotelHappening: (state, action) => {
      state.updateHotel.loading = true;
    },
    updateHotelFinish: (state, action) => {
      state.updateHotel.loading = false;
    },
    updateHotelRequest: (state, action) => {
      state.updateHotel.loading = true;
      state.updateHotel.error = null;
    },
    updateHotelSuccess: (state, action) => {
      const { data } = action.payload;
      state.updateHotel.loading = false;
    },
    updateHotelFailure: (state, action) => {
      const { error } = action.payload;
      state.updateHotel.loading = false;
      state.updateHotel.error = error;
    },
    //delete hotel
    deleteHotelFailure: (state, action) => {
      state.deleteHotel.loading = false;
    },
    deleteHotelRequest: (state, action) => {
      state.deleteHotel.loading = true;
      state.deleteHotel.error = null;
    },
    deleteHotelSuccess: (state, action) => {
      const { id } = action.payload;
      state.deleteHotel.loading = false;
      state.hotelList.data = state.hotelList.data.filter(
        (item) => item.id !== id
      );
      notification.success({ message: "Xóa khách sạn thành công!" });
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
    // createSearchHistory
    createSearchHistoryRequest: (state, action) => {
      state.searchHistory.loading = true;
      state.searchHistory.error = null;
    },
    createSearchHistorySuccess: (state, action) => {
      const { data } = action.payload;
      state.searchHistories.data.unshift(data);
      state.searchHistories.loading = false;
    },
    createSearchHistoryFailure: (state, action) => {
      const { error } = action.payload;
      state.searchHistories.loading = false;
      state.searchHistories.error = error;
    },
    // getSearchHistory
    getSearchHistoryRequest: (state, action) => {
      state.searchHistories.loading = true;
      state.searchHistories.error = null;
    },
    getSearchHistorySuccess: (state, action) => {
      const { data } = action.payload;
      state.searchHistories.data = data;
      state.searchHistories.loading = false;
    },
    getSearchHistoryFailure: (state, action) => {
      const { error } = action.payload;
      state.searchHistories.loading = false;
      state.searchHistories.error = error;
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
  // getSearchSuggestionRequest,
  // getSearchSuggestionFailure,
  // getSearchSuggestionSuccess,
  createSearchHistoryRequest,
  createSearchHistorySuccess,
  createSearchHistoryFailure,
  getSearchHistoryRequest,
  getSearchHistorySuccess,
  getSearchHistoryFailure,
  createHotelRequest,
  createHotelSuccess,
  createHotelFailure,
  createHotelHappening,
  createHotelFinish,
  updateHotelRequest,
  updateHotelSuccess,
  updateHotelFailure,
  updateHotelHappening,
  updateHotelFinish,
  deleteHotelFailure,
  deleteHotelRequest,
  deleteHotelSuccess,
} = hotelSlice.actions;

export default hotelSlice.reducer;
