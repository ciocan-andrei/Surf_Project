import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { BsSearch } from "react-icons/bs";

const columns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "left",
  },
  {
    id: "country",
    label: "Country",
    minWidth: 120,
    align: "left",
  },
  {
    id: "latitude",
    label: "Latitude",
    // minWidth: 80,
    align: "left",
  },
  {
    id: "longitude",
    label: "Longitude",
    // minWidth: 80,
    align: "left",
  },

  {
    id: "probability",
    label: "Wind Prob.",
    // minWidth: 150,
    format: (value) => value + "%",
    align: "left",
  },
  {
    id: "month",
    label: "When to go",
    //  minWidth: 170,
    align: "left",
  },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    height: 600,
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const InfoTable = ({ locations }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [filterTable, setFilterTable] = useState("");
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  useEffect(() => {
    setPage(0);
  }, [filterTable]);

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  const reorderData = (
    name,
    latitude,
    longitude,
    country,
    probability,
    month
  ) => {
    return { name, country, latitude, longitude, probability, month };
  };

  function filterLocations(rows) {
    return rows.filter((location) => {
      return (
        location.country
          .toLowerCase()
          .indexOf(filterTable.toLowerCase().trim()) > -1 ||
        location.name.toLowerCase().indexOf(filterTable.toLowerCase().trim()) >
          -1 ||
        location.month.toLowerCase().indexOf(filterTable.toLowerCase().trim()) >
          -1 ||
        location.probability.toString().startsWith(filterTable.trim())
      );
    });
  }

  const rows = locations.map((location) => {
    return reorderData(
      location.name,
      location.lat,
      location.long,
      location.country,
      location.probability,
      location.month
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={`${classes.root} table-container dashboard-item`}>
      <div className="search-table-box">
        <BsSearch />
        <input
          type="text"
          onChange={(e) => setFilterTable(e.target.value)}
          placeholder="Search"
          className="search-table"
        />
      </div>

      <TableContainer className={`${classes.container} table-container`}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    width: "17%",
                    padding: "0.5rem 0.3rem",
                    backgroundColor: "#EAF2F9",
                  }}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <span className={classes.visuallyHidden}>
                        {/* {order === "desc"
                          ? "sorted descending"
                          : "sorted asceding"} */}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(filterLocations(rows), getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.latitude.concat(row.longitude)}
                    className="table-row"
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ padding: "0.3rem" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default InfoTable;
