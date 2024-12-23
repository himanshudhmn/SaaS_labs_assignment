import React, { useEffect, useState } from "react";
import classes from "./Table.module.css";
import { API_URL } from "../utils/constants";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const fetchTableData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    setTableData(data);
  };

  const slicedTableData = tableData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };
  useEffect(() => {
    fetchTableData();
  }, [rowsPerPage]);
  return (
    tableData && (
      <div className={classes.tableContainer}>
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr>
              <th className={`${classes.tableHeadRow} ${classes.customWidth}`}>
                S.No.
              </th>
              <th className={classes.tableHeadRow}>Percentage funded</th>
              <th className={classes.tableHeadRow}>Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {slicedTableData.map((row) => (
              <tr key={row.id}>
                <td className={classes.tableHeadRow}>
                  {row?.["s.no"] + 1 + "."}
                </td>
                <td className={classes.tableHeadRow}>
                  {row?.["percentage.funded"]}
                </td>
                <td className={classes.tableHeadRow}>{row?.["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={classes.paginationContainer}>
          <div className={classes.perPageContainer}>
            <span>Rows per page : </span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className={classes.rowsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div>
            <button
              onClick={handlePrevious}
              className={classes.button}
              disabled={page === 0}
              style={{
                backgroundColor: page === 0 ? "#e0e0e0" : "#1769aa",
                color: page === 0 ? "#a0a0a0" : "#fff",
              }}
            >
              Previous
            </button>
            <span className={classes.totalPages}>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              className={classes.button}
              disabled={page == totalPages - 1}
              style={{
                backgroundColor:
                  page === totalPages - 1 ? "#e0e0e0" : "#1769aa",
                color: page === totalPages - 1 ? "#a0a0a0" : "#fff",
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Table;
