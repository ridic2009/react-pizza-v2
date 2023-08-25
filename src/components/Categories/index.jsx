import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../App";

export default function Categories() {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
  ];


  const { activeIndex, filterByCategory } = useContext(AppContext);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, idx) => (
          <li
            key={uuidv4()}
            onClick={() => filterByCategory(idx, item)}
            className={activeIndex === idx ? "active" : null}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
