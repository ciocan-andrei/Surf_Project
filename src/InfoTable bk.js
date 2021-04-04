import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 100, align: "left" },
  {
    id: "latitude",
    label: "Latitude",
    minWidth: 80,
    align: "right",
  },
  {
    id: "longitude",
    label: "Longitude",
    minWidth: 80,
    align: "right",
  },
  { id: "country", label: "Country", minWidth: 170, align: "center" },
  {
    id: "probability",
    label: "Wind Probability",
    minWidth: 150,
    format: (value) => value + "%",
    align: "right",
  },
  { id: "month", label: "Season", minWidth: 170, align: "center" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

const InfoTable = ({ locations }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterByCountry, setFilterByCountry] = useState("");
  const [filterByWindProbability, setfilterByWindProbability] = useState("");
  const [rowsCounter, setRowsCounter] = useState(locations.length);

  const reorderData = (
    name,
    latitude,
    longitude,
    country,
    probability,
    month
  ) => {
    return { name, latitude, longitude, country, probability, month };
  };

  const filterRows = (rows) => {
    const newRows = rows
      .filter(
        (row) =>
          row.name.toLowerCase().indexOf(filterByCountry.toLowerCase()) > -1
      )
      .filter((row) =>
        row.probability.toString().startsWith(filterByWindProbability)
      );

    // setRowsCounter(newRows.length);
    return newRows;
  };

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
    <Paper className={classes.root}>
      <input
        type="text"
        style={{ margin: "0.5rem" }}
        onChange={(e) => setFilterByCountry(e.target.value)}
        placeholder="Country"
      />
      <input
        type="text"
        style={{ margin: "0.5rem" }}
        onChange={(e) => setfilterByWindProbability(e.target.value)}
        placeholder="Wind probability"
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRows(rows)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.latitude.concat(row.longitude)}
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
        rowsPerPageOptions={[10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        // className={rowsCounter <= 10 && "isFiltered"}
      />
    </Paper>
  );
};

export default InfoTable;
