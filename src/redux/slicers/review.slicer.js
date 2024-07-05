import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewList: {
    data: [],
    loading: false,
    error: null,
    meta: {},
  },
  createReviewData: {
    loading: false,
    error: null,
  },
  deleteReviewData: {
    loading: false,
    error: null,
  },
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    // getReviewList
    getReviewListRequest: (state, action) => {
      state.reviewList.loading = true;
      state.reviewList.error = null;
    },
    getReviewListSuccess: (state, action) => {
      const { data } = action.payload;
      state.reviewList.data = data;
      state.reviewList.loading = false;
    },
    getReviewListFailure: (state, action) => {
      const { error } = action.payload;
      state.reviewList.loading = false;
      state.reviewList.error = error;
    },
    //createReview
    createReviewRequest: (state, action) => {
      state.createReviewData.loading = true;
      state.createReviewData.error = null;
    },
    createReviewSuccess: (state, action) => {
      state.createReviewData.loading = false;
    },
    createReviewFailure: (state, action) => {
      const { error } = action.payload;
      state.createReviewData.loading = false;
      state.createReviewData.error = error;
    },
    //deleteReview
    deleteReviewRequest: (state, action) => {
      state.deleteReviewData.loading = true;
      state.deleteReviewData.error = null;
    },
    deleteReviewSuccess: (state, action) => {
      const { id } = action.payload;
      state.deleteReviewData.loading = false;
      state.deleteReviewData.error = null;
      const index = state.reviewList.data.findIndex((item) => item.id === id);
      state.reviewList.data.splice(index, 1);
    },
    deleteReviewFailure: (state, action) => {
      const { error } = action.payload;
      state.deleteReviewData.loading = false;
      state.deleteReviewData.error = error;
    },
  },
});

export const {
  getReviewListRequest,
  getReviewListSuccess,
  getReviewListFailure,
  createReviewRequest,
  createReviewSuccess,
  createReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  deleteReviewFailure,
} = reviewSlice.actions;

export default reviewSlice.reducer;
