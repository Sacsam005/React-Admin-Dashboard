import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import "../../Reusable Styling/Table.sass";

const TransactionDataTable = ({ onRowClick, tableRows }) => {
  const theme = useTheme();

  const tableCellNamesForTransaction = [
    "Tracking ID",
    "Product",
    "Customer",
    "Date",
    "Price",
    "Payment Method",
    "Status",
  ];

  return (
    <div
      component={Paper}
      className="table"
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        "& th, & td": {
          fontSize: theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
        },
        mt: 2,
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="Table">
        <TableHead>
          <TableRow>
            {tableCellNamesForTransaction.map((name, i) => (
              <TableCell
                className="table_cell"
                sx={{ p: 1 }}
                key={i}
                style={{ color: "#20B2AA" }}
              >
                {name}{" "}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows &&
            tableRows.map((row) => (
              <TableRow key={row.id} onClick={() => onRowClick(row.id)}>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.id}{" "}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  <div className="cell_wrapper">
                    <img src={row.img} alt="Table" className="cell_img" />
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.customer}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.date}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  ${row.price}
                </TableCell>
                <TableCell className="table_cell" sx={{ p: 1 }}>
                  {row.method}
                </TableCell>
                <TableCell sx={{ p: 1 }}>
                  <span
                    className={`status ${
                      row.status && row.status.toLowerCase()
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Passing onRowClick as an empty default function
TransactionDataTable.defaultProps = {
  onRowClick: () => {},
};

TransactionDataTable.propTypes = {
  onRowClick: PropTypes.func,
};

export default TransactionDataTable;
