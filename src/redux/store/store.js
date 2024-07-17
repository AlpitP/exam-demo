import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import apiSlice from "../slices/apiSlice";
import formReducer from "../slices/formSlice";
import studentSlice from "../slices/studentSlice";
import teacherSlice from "../slices/teacherSlice";
import userSlice from "../slices/userSlice";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["teacher", "student"],
};

const rootReducer = combineReducers({
  formData: formReducer,
  api: apiSlice,
  user: userSlice,
  teacher: teacherSlice,
  student: studentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
