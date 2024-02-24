import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";
import appointmenStatusReducer from "./reducers/appointmenStatusReducer";
import orderStatusReducer from "./reducers/orderStatusReducer";
export default configureStore({
  reducer: {
    testCategory: categoryReducer,
    appointmentStatus: appointmenStatusReducer,
    OrderStatus: orderStatusReducer,
  },
});
