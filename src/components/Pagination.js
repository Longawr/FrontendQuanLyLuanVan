import { useEffect, useState } from "react";

/*
<div className='card-footer'>
    <Pagination
        totalRecords={totalItems}
        pageLimit={5}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
    ></Pagination>
</div>
*/

export const Pagination = (props) => {
  const { totalRecords, pageLimit, pageSize } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalRecords / pageSize);

  const startPageIndex = Math.max(currentPage - pageLimit, 1);
  const endPageIndex = Math.min(currentPage + pageLimit, totalPages);

  function range(from, to, step = 1) {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  }
  const pages = range(startPageIndex, endPageIndex);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    props.onPageChanged(pageNumber);
  };
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handleClick(currentPage - 1)}
          >
            Trước
          </button>
        </li>
        {pages.map((page, index) => {
          return (
            <li
              key={index}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button onClick={() => handleClick(page)} className="page-link">
                {page}
              </button>
            </li>
          );
        })}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={() => handleClick(totalPages)}>
            Sau
          </button>
        </li>
      </ul>
    </nav>
  );
};
