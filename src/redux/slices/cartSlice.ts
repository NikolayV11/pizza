import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "./../../utils/getCartFromLocalStorage";
export type CartItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number;
  types: string;
  count: number;
};

// interface типизирует только объекты
export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  count: number;
}

const initialState: CartSliceState = {
  totalPrice: getCartFromLS().price,
  items: getCartFromLS().items,
  count: getCartFromLS().count,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem | any>) {
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
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload;
      });
      if (findItem) {
        findItem.count--;
      }

      if (findItem.count <= 0) {
        state.items = state.items.filter((obj) => {
          return obj.id !== action.payload;
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
    removeItem(state, action: PayloadAction<number>) {
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

export const selectCart = (state: RootState) => state.cart;
export function selectCartItemById(id: number) {
  return (state: RootState) => state.cart.items.find((obj) => obj.id === id);
}
// export const selectCartItemById=(id)=>(state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
// getCartFromLS();
export default cartSlice.reducer;
