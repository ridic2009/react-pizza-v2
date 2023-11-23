import { Func0 } from "@reduxjs/toolkit";
import { ReactElement } from "react";
import { v4 as uuidv4 } from "uuid";

type CategoriesProps = {
  value: number,
  onChangeCategory: (index: number) => void
}

export default function Categories({ value, onChangeCategory }: CategoriesProps): ReactElement {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            key={uuidv4()}
            onClick={() => onChangeCategory(idx)}
            className={value === idx ? "active" : undefined}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
