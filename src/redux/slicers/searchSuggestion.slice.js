import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSHowSearchSuggestions: false,
};

export const searchHistorySlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    showSearchSuggestion: (state, action) => {
      state.isSHowSearchSuggestions = true;
    },
    hiddenSearchSuggestion: (state, action) => {
      state.isSHowSearchSuggestions = false;
    },
  },
});

export const { showSearchSuggestion, hiddenSearchSuggestion } =
  searchHistorySlice.actions;

export default searchHistorySlice.reducer;
