import { createSlice } from "@reduxjs/toolkit";

export const orderStatusSlice = createSlice({
  name: "OrderStatus",
  initialState: {
    value: "",
  },
  reducers: {
    sendOrderStatusData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { sendOrderStatusData } = orderStatusSlice.actions;
export default orderStatusSlice.reducer;
