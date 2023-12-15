// function handleClickOutsideNotification(event) {
//   const notificationContainer = document.querySelector(".notification_item");
//   notifications.forEach((notification) => {
//     if (notification && !notificationContainer.contains(event.target)) {
//       setReadNotification(true);
//     }
//   });
// }

// useEffect(() => {
//   document.addEventListener("click", handleClickOutsideNotification);
//   return () => {
//     document.removeEventListener("click", handleClickOutsideNotification);
//   };
// }, []);

// const menuContainerPanel = document.querySelector(
//   ".dashboard_container_left_panel"
// );
// const menuBtn = document.querySelector(".hamburger_menu_btn");
// useEffect(() => {
//   document.body.addEventListener("click", function (event) {
//     if (
//       menuContainerPanel &&
//       event.target !== menuBtn &&
//       !menuContainerPanel.contains(event.target)
//     ) {
//       menuContainerPanel.setAttribute("style", "display: none");
//     }
//   });
// });

//  <BrowserRouter>
//    <Routes>
//      <Route path="/">
//        <Route index element={<Home />} />
//             <Route path="login" element={<Login />} />
//        <Route index element={<Login />} />
//        <Route path="/login" element={<Login />} />
//        <Route path="/home" element={<Home />} />
//        <Route path="/logout" element={<Logout />} />
//        <Route path="users">
//          <Route index element={<Users />} />
//          <Route path="/users" element={<Users />} />
//          <Route path=":userId" element={<Orders />} />
//          <Route path="new" element={<AddUsers />} />
//        </Route>
//        <Route path="products">
//          <Route index element={<Products />} />
//          <Route path="/products" element={<Products />} />
//          <Route path=":productId" element={<Orders />} />
//          <Route path="new" element={<AddProducts />} />
//        </Route>
//      </Route>
//    </Routes>
//  </BrowserRouter>;

// function addRow(id) {
//   const itemRow = rows.find((row) => row.id === id);
//   setData({
//     ...data,
//     ...itemRow,
//   });
// }

// const [data, setData] = useState({});
// const [newRows, setNewRows] = useState([]);

// function handleSubmit(e) {
//   e.preventDefault();
//   console.log(data);

//   const isInputEmpty = inputs.find((input) => !data[input.id]);
//   if (isInputEmpty) {
//     alert(`Please fill ${isInputEmpty.label}`);
//     return;
//   }

//   const highestId = Math.max(...rows.map((row) => row.id));
//   const newRows = {
//     id: highestId + 1,
//     userName: data[1],
//     fullName: data[2],
//     email: data[3],
//     phone: data[4],
//   };

//   const updatedRows = [...rows, newRows];
//   setNewRows(updatedRows);
//   console.log(updatedRows);

//   // Clear input fields
//   setData({});
// }

// function handleInputChange(e) {
//   setData({
//     ...data,
//     [e.target.id]: e.target.value,
//   });
// }

// // Dark mode
// .dark_mode
//     background: $grayFont
//     color: $lightFontColor
//     // Resetting MUI Data table color for dark theme
//     .table, .data_grid, .card_div, .summary_card_div, .users_list_container p, .css-16c50h-MuiInputBase-root-MuiTablePagination-select , div.MuiTablePagination-actions > button, .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel, .MuiToolbar-root, .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon
//         color: $lightFontColor

// .blue_color_mode
//     background: #0B4E91
//     color: $lightFontColor
//     // Resetting MUI Data table color for blue theme
//     .table, .data_grid, .card_div, .summary_card_div, .users_list_container p, .css-16c50h-MuiInputBase-root-MuiTablePagination-select , div.MuiTablePagination-actions > button, .MuiToolbar-root, .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon
//         color: $lightFontColor

// const [userName, setUserName] = useState("");
// const [profilePic, setProfilePic] = useState(null);
// useEffect(() => {
//   const storedUserName = localStorage.getItem("userName");
//   setUserName(
//     `${storedUserName.charAt(0).toUpperCase() + storedUserName.substring(1)}`
//   );
//   const storedPic = localStorage.getItem("profilePic");
//   if (storedPic) {
//     setProfilePic(storedPic);
//   }
// }, [userName, profilePic]);
