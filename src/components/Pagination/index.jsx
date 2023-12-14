import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

export function Pagination({ numberPageServer, onChangePage }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={numberPageServer}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}
