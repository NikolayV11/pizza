import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1, // запрошенная страница
  numberOfPages: 1, // всего страниц
  limit: 6,
  sortType: {
    name: "популярности (DESC)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setNumberOfPages(state, action) {
      state.numberOfPages = action.payload;
      console.log("action.payload", action.payload);
    },
    setFiltres(state, action) {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.page;
      state.sortType = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setNumberOfPages, setFiltres } =
  filterSlice.actions;

export default filterSlice.reducer;
