import React, { useState, useEffect } from "react";
import {
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import TransactionDataTable from "../../Components/Chart&Table/TransactionDataTable";
import OrderSummary from "../../Reusable Components/OrderSummary";
import { transactionTableData } from "../../Components/Chart&Table/TransactionData";
import "../../Reusable Styling/Table.sass";

const Sales = () => {
  const theme = useTheme();
  const [selectedRowId, setSelectedRowId] = useState(
    transactionTableData[0]?.id
  );
  const selectedRow = transactionTableData.find(
    (row) => row.id === selectedRowId
  );

  const handleRowClick = (id) => {
    setSelectedRowId(id);
  };

  useEffect(() => {
    document.title = "All Orders | Admin Dashboard";
  });

  const totalBalance = transactionTableData.reduce(
    (acc, curr) => acc + curr.price,
    0
  );

  const totalPendingOrder = transactionTableData.filter((data) => {
    return data.status === "Pending";
  }).length;

  const totalDeliveredOrder = transactionTableData.filter((data) => {
    return data.status === "Delivered";
  }).length;

  const totalCashPaymentOrder = transactionTableData.filter((data) => {
    return data.method.includes("Cash");
  }).length;

  const totalOnlinePaymentOrder = transactionTableData.filter((data) => {
    return data.method.includes("Online");
  }).length;

  const tableHeaders = [
    "Total Balance",
    "Total Sales",
    "Total Quantity",
    "Total Delivered",
    "Total Pending",
    "Cash Payment",
    "Online payment",
  ];

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <OrderSummary selectedRow={selectedRow} />
          <TransactionDataTable
            tableRows={transactionTableData}
            onRowClick={handleRowClick}
          />
          <div
            component={Paper}
            className="table"
            sx={{
              pl: { sm: 1 },
              pr: { xs: 1, sm: 1 },
              "& th, & td": {
                fontSize:
                  theme.breakpoints.values.sm < 600 ? "12px" : "inherit",
              },
              mt: 2,
            }}
          >
            <Table
              className="mt-4"
              sx={{ minWidth: 650 }}
              aria-label="Table"
              style={{ fontSize: "11.5px" }}
            >
              <TableHead>
                <TableRow>
                  {tableHeaders.map((name, i) => (
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
                <TableRow>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    ${totalBalance}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {transactionTableData.length}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalPendingOrder}
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalDeliveredOrder} - Delivered
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalPendingOrder} - Pending
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalCashPaymentOrder} - Cash On Delivery
                  </TableCell>
                  <TableCell className="table_cell" sx={{ p: 1 }}>
                    {totalOnlinePaymentOrder} - Online payment
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sales;
