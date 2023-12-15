// ------------------------------------------
// User data list
export const userListTableColumns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerClassName: "custom_header",
  },
  {
    field: "userImg",
    headerName: "Avatar",
    width: 100,
    headerClassName: "custom_header",
    renderCell: (params) => {
      return (
        <img
          className="cell_img"
          src={
            params.row.userImg ||
            "https://sachinsamal005.netlify.app/img/sachin-samal.png"
          }
          alt="avatar"
        />
      );
    },
  },
  {
    field: "userName",
    headerName: "Username",
    width: 150,
    headerClassName: "custom_header",
  },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 200,
    headerClassName: "custom_header",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    headerClassName: "custom_header",
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
    headerClassName: "custom_header",
  },
];

export const userListTableRows = [
  {
    id: 1,
    userName: "sammoralse26",
    fullName: "Sam Moralse",
    email: "samoralse26@gmail.com",
    phone: "+1 898-0987890",
  },
  {
    id: 2,
    userName: "harmomy67",
    fullName: "Harmony Dightk",
    email: "harmomy45@gmail.com",
    phone: "+1 898-0987890",
  },
  {
    id: 3,
    userName: "terruy45",
    fullName: "Terry Rigto",
    email: "terruy@gmail.com",
    phone: "+1 898-0987890",
  },
];
