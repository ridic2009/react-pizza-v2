import ReactPaginate from "react-paginate";

import styles from './pagination.module.scss'

export default function Pagination() {
    return (
        <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={event => console.log(event)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    )
}