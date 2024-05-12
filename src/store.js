import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./redux/saga/index";
import hotelReducer from "./redux/slicers/hotel.slicer";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    hotel: hotelReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
