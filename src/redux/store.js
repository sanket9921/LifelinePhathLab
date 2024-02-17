import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";

export default configureStore({
  reducer: {
    testCategory: categoryReducer,
  },
});
