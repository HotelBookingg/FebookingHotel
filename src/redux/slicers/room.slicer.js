import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
const initialState = {
  roomDetail: {
    data: {},
    loading: false,
    error: null,
  },
  updateRoom: {
    loading: false,
    error: null,
  },
  createRoom: {
    loading: false,
    error: null,
  },
};

export const roomSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    // getRoomDetail
    getRoomDetailRequest: (state, action) => {
      state.roomDetail.loading = true;
      state.roomDetail.error = null;
    },
    getRoomDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomDetail.data = data;
      state.roomDetail.loading = false;
    },
    getRoomDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.roomDetail.loading = false;
      state.roomDetail.error = error;
    },
    // updateRoom
    updateRoomRequest: (state, action) => {
      state.updateRoom.loading = true;
      state.updateRoom.error = null;
    },
    updateRoomSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomDetail.data = data;
      state.updateRoom.loading = false;
    },
    updateRoomFailure: (state, action) => {
      const { error } = action.payload;
      state.updateRoom.loading = false;
      state.updateRoom.error = error;
    },
    //create Room
    createRoomRequest: (state, action) => {
      state.createRoom.loading = true;
      state.createRoom.error = null;
    },
    createRoomSuccess: (state, action) => {
      state.createRoom.loading = false;
      notification.success({ message: "Thêm phòng thành công!" });
    },
    createRoomFailure: (state, action) => {
      const { error } = action.payload;
      state.createRoom.loading = false;
      state.createRoom.error = error;
    },
  },
});

export const {
  getRoomDetailFailure,
  getRoomDetailSuccess,
  getRoomDetailRequest,
  updateRoomRequest,
  updateRoomSuccess,
  updateRoomFailure,
  createRoomRequest,
  createRoomSuccess,
  createRoomFailure,
} = roomSlice.actions;

export default roomSlice.reducer;
