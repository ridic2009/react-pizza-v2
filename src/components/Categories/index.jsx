import { useState } from "react";

export default function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ];

  const [activeIndex, setActiveIndex] = useState();

  const onChangeCategory = index => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => onChangeCategory(idx)}
            className={activeIndex === idx ? "active" : null}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
