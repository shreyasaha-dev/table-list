import { combineReducers, configureStore } from "@reduxjs/toolkit";
import scheduleReducer from "./ScheduleReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const rootReducer = combineReducers({
  createData: scheduleReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["createData"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
