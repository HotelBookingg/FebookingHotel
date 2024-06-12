import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./redux/saga/index";
import hotelReducer from "./redux/slicers/hotel.slicer";
import authReducer from "./redux/slicers/auth.slicer";
import billReducer from "./redux/slicers/bill.slicer";
import searchSuggestionReducer from "./redux/slicers/searchSuggestion.slice";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    search: searchSuggestionReducer,
    bill: billReducer,
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
