import { v4 as uuidv4 } from "uuid";

export default function Categories({ value, onChangeCategory }) {
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
            className={value === idx ? "active" : null}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
