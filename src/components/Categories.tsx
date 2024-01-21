import * as React from "react";
const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

type CategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};
const Categories = React.memo(({ value, onChangeCategory }: CategoriesProps) => {
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
});
export default Categories;
