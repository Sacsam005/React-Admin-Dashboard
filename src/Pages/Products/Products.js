import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import ListInTable from "../../Reusable Components/DataTable";
import { productListTableRows, productListTableColumns } from "./ProductData";
import "../../App.sass";

const Products = () => {
  const { userName } = useContext(ProfileContext);

  useEffect(() => {
    document.title = "Products | Admin Dashboard";
  });

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="products_list_container">
            <div className="products_list_container_title">
              <h4
                className="p-2 mb-0"
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                }}
              >
                Products handled by Admin | {userName}
              </h4>
            </div>
            <ListInTable
              rows={productListTableRows}
              columns={productListTableColumns}
              height={400}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export const ProductListContainer = styled.div`
  /* Resetting MUI table color props */
  p,
  .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel,
  div.MuiTablePagination-actions > button button {
    color: inherit;
  }

  .MuiToolbar-root {
    color: inherit;
  }
  /* END */
`;

export default Products;
