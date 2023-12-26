import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { setCurrentPage } from "../../redux/slices/filterSlice";
// useDispatch - запись;
import { useSelector, useDispatch } from "react-redux";

export function Pagination() {
  const { currentPage, numberOfPages } = useSelector((state) => state.filter);
  // redux запись
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(Number(event.selected + 1)))}
      pageRangeDisplayed={4}
      pageCount={numberOfPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      initialPage={currentPage - 1}
    />
  );
}
