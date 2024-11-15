import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProfileContext } from "../../App";
import { userRows, userColumns } from "../../MockData/UsersData";

import Sidebar from "../../layout/Sidebar/Sidebar";
import Navbar from "../../layout/Navbar/Navbar";
import ListInTable from "../../Components/DataTable/DataTable";

import "../../App.sass";

const Users = () => {
  const [rows, setRows] = useState(userRows);
  const { userName } = useContext(ProfileContext);

  function handleDelete(id) {
    setRows(rows.filter((row) => row.id !== id));
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      headerClassName: "custom_header",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cell_action_div">
            <Link
              to="/users"
              style={{ textDecoration: "none", color: "unset" }}
              className="view_btn"
            >
              View
            </Link>
            <div
              className="delete_btn"
              onClick={() => handleDelete(params.row.id)}
            >
              Remove User
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "Users | Admin Dashboard";
  });

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <UserTable className="users_list_container">
            <div className="users_list_container_title">
              <h4
                className="p-2 mb-0"
                style={{
                  fontWeight: 700,
                  margin: "0.5rem 0 0 0",
                  padding: "0 0.5rem",
                  color: "#20B2AA",
                }}
              >
                Users handled by Admin | {userName}
              </h4>
            </div>
            <ListInTable
              rows={rows}
              columns={userColumns.concat(actionColumn)}
              height={680}
            />
          </UserTable>
        </div>
      </main>
    </>
  );
};

export const UserTable = styled.div`
  z-index: 0;
  /* Resetting MUI table color props */
  p,
  div.MuiTablePagination-actions > button {
    color: inherit;
  }
  /* END */
`;

export default Users;
