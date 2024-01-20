import { CartItem } from "../redux/slices/cartSlice";

export const getCartFromLS = () => {
  let price: number = 0;
  let count: number = 0;
  const items: CartItem[] = [];
  const data: CartItem[] = JSON.parse(localStorage.getItem("cart"));
  if (data) {
    for (let i = 0; i < data.length; i++) {
      count += data[i].count;
      price += data[i].price * data[i].count;
      items.push(data[i]);
    }
  }

  return { items, count, price };
};
