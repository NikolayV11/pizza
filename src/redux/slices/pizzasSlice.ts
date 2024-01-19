import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sort } from "./filterSlice";
// import { SliceSortType } from "./filterSlice";

// параметры пиццы
type ResultPizzas = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};
// пришло с сервера
type PizzaItem = {
  numberOfPages: number;
  result: ResultPizzas[];
  page: number;
};

// параметры для запросса на сервер
export type FetchPizzasArgs = {
  order: string;
  sortType: Sort;
  category: string;
  search: string;
  currentPage: number;
  limit: number;
};
//@ts-ignore
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",

  async (params: FetchPizzasArgs) => {
    const { order, sortType, category, search, currentPage, limit } = params;
    const sortby = sortType.sortProperty.replace("-", "");
    const { data } = await axios.get<PizzaItem>(
      `http://localhost:5500/data?p=${currentPage}&l=${limit}&${category}&sortby=${sortby}&orderBy=${order}${search}`,
    );
    return data;
  },
);

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: PizzaItem;
  status: Status; // "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
  items: { numberOfPages: 1, result: [], page: 1 },
  status: Status.LOADING, // loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem>) {
      state.items = action.payload;
      console.log(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder // fulfilled выполнено
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem>) => {
        state.status = Status.SUCCESS; //"success";
        state.items = action.payload;
      }) // pending в ожидании
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING; // "loading";
        state.items.result = [];
        state.items.numberOfPages = 1;
        state.items.page = 1;
      }) // rejected отклоненный
      .addCase(fetchPizzas.rejected, (state) => {
        console.log("error");
        state.status = Status.ERROR; // "error";
        state.items.result = [];
        state.items.numberOfPages = 1;
        state.items.page = 1;
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
