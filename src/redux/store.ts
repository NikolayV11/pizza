import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizzas from "./slices/pizzasSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizzas },
});

// store.getState - Ворачивает фенкцию содержащию store с типоми из reducer:{}
// ReturnType - разкрывает функцию и достает все типы
// RootState - хранит объект с типами из store входящие в reducer:{}
export type RootState = ReturnType<typeof store.getState>;

// Получаем типы из store
export type AppDispatch = typeof store.dispatch;
// Передаём все полученные типы в useAppDispatch и получаем костомный useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
