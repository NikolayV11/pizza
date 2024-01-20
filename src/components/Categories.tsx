import * as React from "react";
import { useWhyDidYouUpdate } from "ahooks";
const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};
export function Categories({ value, onChangeCategory }: CategoriesProps) {
  useWhyDidYouUpdate("Categories", { value, onChangeCategory });
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
