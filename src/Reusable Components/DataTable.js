import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

const ListInTable = ({ rows, columns, height }) => {
  return (
    <>
      <DataTable
        className="data_table_div"
        style={{ height: `${height}px`, width: "100%" }}
      >
        <DataGrid
          className="data_grid"
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </DataTable>
    </>
  );
};

const DataTable = styled.div`
  padding: 0.5rem;
  font-size: 14px;

  .data_grid {
    color: inerit;
  }

  .data_table_button_div {
    display: flex;
    justify-content: space-between;
  }

  .data_table_link {
    text-decoration: none;
    background-color: #027f89;
    padding: 0.5rem;
    cursor: pointer;
  }

  .custom_header {
    color: #20b2aa;
  }

  p {
    margin-bottom: 0;
  }

  .cell_img_div {
    display: flex;
    align-items: center;
  }

  .cell_img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 0.2rem;
  }

  .active {
    background-color: rgba(0, 128, 0, 0.4);
  }

  .pending {
    background-color: #ffdd9e;
    color: crimson;
  }

  .passive {
    background-color: rgba(255, 0, 0, 0.2);
    color: red;
  }

  .cell_action_div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export default ListInTable;
