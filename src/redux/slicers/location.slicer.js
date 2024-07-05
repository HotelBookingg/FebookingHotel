import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cityList: {
    data: [],
    loading: false,
    error: "",
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // getCityList
    getCityListRequest: (state, action) => {
      state.cityList.loading = true;
      state.cityList.error = null;
    },
    getCityListSuccess: (state, action) => {
      const { data } = action.payload;
      state.cityList.loading = false;
      state.cityList.data = data;
    },
    getCityListFailure: (state, action) => {
      const { error } = action.payload;
      state.cityList.loading = false;
      state.cityList.error = error;
    },
  },
});

export const { getCityListRequest, getCityListSuccess, getCityListFailure } =
  locationSlice.actions;

export default locationSlice.reducer;
