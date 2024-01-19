import * as React from "react";

// redux (useSelector)- чтение, (useDispatch) - запись
import { useSelector, useDispatch } from "react-redux";

// Slice Методы для изминений записи в Slice файле cartSlice.js
import { CartItem, addItem, selectCartItemById } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const typeName: string[] = ["тонкое", "традиционное"];

type PizzaBlockProps = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};
export function PizzaBlock({ id, title, price, imageUrl, sizes, types }: PizzaBlockProps) {
  const cartItems = useSelector(selectCartItemById(id));
  const addedCount = cartItems ? cartItems.count : 0;
  const dispatch = useDispatch();

  const [activeType, setActiveType] = React.useState<number>(types[0]);

  const [activeSizes, setActiveSizes] = React.useState<number>(0);
  console.log(types, "types");
  function onClickAdd() {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      types: typeName[activeType],
      sizes: sizes[activeSizes],
      count: 0,
    };

    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={
              imageUrl ||
              "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
            }
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types.map((item) => {
              return (
                <li
                  key={item}
                  onClick={() => {
                    setActiveType(item);
                  }}
                  className={activeType === item ? "active" : ""}>
                  {typeName[item]}
                </li>
              );
            })}
          </ul>
          <ul>
            {sizes.map((item, index) => {
              return (
                <li
                  key={item}
                  onClick={() => setActiveSizes(index)}
                  className={activeSizes === index ? "active" : ""}>
                  {item} см.
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price || 4} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg ">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
