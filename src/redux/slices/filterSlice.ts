import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
}
export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum; //"rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  numberOfPages: number;
  limit: number;
  sortType: Sort;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1, // запрошенная страница
  numberOfPages: 1, // всего страниц
  limit: 8,
  sortType: {
    name: "популярности (DESC)",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
};

type Filter = {
  categoryId: number;
  page: number;
  sort: Sort;
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setNumberOfPages(state, action: PayloadAction<number>) {
      state.numberOfPages = action.payload;
    },
    setFiltres(state, action: PayloadAction<Filter>) {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.page;
      state.sortType = action.payload.sort;
    },
  },
});
export const selectSort = (state: RootState) => state.filter.sortType;
export const selectFilter = (state: RootState) => state.filter;
export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setNumberOfPages,
  setFiltres,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
