import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
const { reducer, actions } = createSlice({
  name: "scheduleReducer",
  initialState,
  reducers: {
    addData: (state, action) => {
      return [...state, action.payload];
    },
    deleteData: (state, action) => {
      return state.filter((item) => {
        if (item.id !== action.payload) {
          return item;
        }
      });
    },
    editData: (state, action) => {
      console.log(action.payload);
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
  },
});
export default reducer;
export { actions };
