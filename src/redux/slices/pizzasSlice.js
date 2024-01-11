import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",

  async (params) => {
    const { order, sortby, category, search, currentPage, limit } = params;
    const { data } = await axios.get(
      `http://localhost:5500/data?p=${currentPage}&l=${limit}&${category}&sortby=${sortby}&orderBy=${order}${search}`,
    );
    console.log(data);
    return data;
  },
);

const initialState = {
  items: { numberOfPages: 1, result: [], page: 1 },
  status: "loading", // loading | success | error
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder // fulfilled выполнено
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      }) // pending в ожидании
      .addCase(fetchPizzas.pending, (state, action) => {
        state.status = "loading";
        state.items.result = [];
        state.items.numberOfPages = 1;
        state.items.page = 1;
      }) // rejected отклоненный
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.log("error");
        state.status = "error";
        state.items.result = [];
        state.items.numberOfPages = 1;
        state.items.page = 1;
      });
  },
});

export const selectPizzaData = (state) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
