import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";
import { ReactElement } from "react";

export default function Pagination({ onChangePage }: {onChangePage: Function}): ReactElement {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
