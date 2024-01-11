import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalPrice: 0,
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      const summaCount = state.items.reduce((sum, items) => {
        return (sum += items.count);
      }, 0);

      const sumPrice = state.items.reduce((sum, item) => {
        return (sum += item.count * item.price);
      }, 0);
      state.totalPrice = sumPrice;
      state.count = summaCount;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (findItem) {
        findItem.count--;
      }

      if (findItem.count <= 0) {
        state.items = state.items.filter((obj) => {
          return obj.id !== action.payload.id;
        });
      }

      const summaCount = state.items.reduce((sum, items) => {
        return (sum += items.count);
      }, 0);

      const sumPrice = state.items.reduce((sum, item) => {
        return (sum += item.count * item.price);
      }, 0);
      state.totalPrice = sumPrice;
      state.count = summaCount;
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => {
        return obj.id !== action.payload;
      });
      const summaCount = state.items.reduce((sum, items) => {
        return (sum += items.count);
      }, 0);

      const sumPrice = state.items.reduce((sum, item) => {
        return (sum += item.count * item.price);
      }, 0);
      state.totalPrice = sumPrice;
      state.count = summaCount;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.count = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export function selectCartItemById(id) {
  return (state) => state.cart.items.find((obj) => obj.id === id);
}
// export const selectCartItemById=(id)=>(state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
