import ReactPaginate from "react-paginate";

import styles from "./pagination.module.scss";
import { ReactElement } from "react";

type PaginationProps = {
  onChangePage: (arg: number) => void
}

export default function Pagination({ onChangePage }: PaginationProps): ReactElement {
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
