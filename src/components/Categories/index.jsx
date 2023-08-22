import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            key={uuidv4()}
            onClick={() => setActiveIndex(idx)}
            className={activeIndex === idx ? "active" : null}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
