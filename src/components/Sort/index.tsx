import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useSelector, useDispatch } from "react-redux";
import { onChangeSort } from "../../redux/slices/filterSlice";
import { useEffect } from "react";
import { useRef } from "react";

type SortItem = {
  name: string;
  sortMethod: string
}

export const sortList: SortItem[] = [
  { name: "популярности", sortMethod: "rating" },
  { name: "цене", sortMethod: "price" },
  { name: "алфавиту", sortMethod: "title" },
  { name: "ещё какой-нибудь хуйне", sortMethod: "title" },
  { name: "и ещё", sortMethod: "title" }
];

export default function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(state => state.filter.sort);
  const sortRef = useRef()

  const [isOpen, setIsOpen] = useState(false);

  const onClickSort = sort => {
    dispatch(onChangeSort(sort));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', handleClick)

    // При unmount
    return () => document.body.removeEventListener('click', handleClick)
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          transform={isOpen ? "rotate(0)" : "rotate(180)"}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map(obj => (
              <li
                onClick={() => onClickSort(obj)}
                className={
                  sort.sortMethod === obj.sort && sort.name === obj.name
                    ? "active"
                    : null
                }
                key={uuidv4()}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
