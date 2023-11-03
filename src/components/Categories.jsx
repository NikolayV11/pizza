import React from "react";
export function Categories() {
  const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

  const [activeIndex, setActiveIndex] = React.useState(0);

  function onClickCategory(item) {
    setActiveIndex(item);
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={activeIndex === index ? "active" : ""}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
