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
} = hotelSlice.actions;

export default hotelSlice.reducer;
