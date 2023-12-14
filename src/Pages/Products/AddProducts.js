import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import ListInTable from "../../Reusable Components/DataTable";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { productListTableColumns } from "./ProductData";
import "../../Reusable Styling/AddItem.sass";

const AddProducts = () => {
  const [file, setFile] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productRows, setProductRows] = useState([]);
  const UUID = uuidv4();

  function handleSubmit(e) {
    e.preventDefault();

    // Check if price and quantity are numbers and within allowed ranges
    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      alert("Price and Quantity must be a number.");
      return;
    } else if (parsedPrice > 2000 || parsedQuantity > 20) {
      alert("Price cannot exceed 2000, and Quantity cannot exceed 20.");
      return;
    }

    // Check if all fields are filled in
    if (!file || !productName || !price || !brand || !model || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    // Create new product object with truncated fields if necessary
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const newProduct = {
        id: uuidv4(),
        productImg: reader.result,
        productName: productName.substring(0, 50),
        price: parsedPrice,
        brand: brand.substring(0, 20),
        model: model.substring(0, 20),
        quantity: parsedQuantity,
      };

      // Add new product to productRows and reset form fields
      setProductRows([...productRows, newProduct]);
      setFile("");
      setProductName("");
      setPrice("");
      setBrand("");
      setModel("");
      setQuantity("");
    };
  }

  function handleDelete(id) {
    setProductRows(productRows.filter((row) => row.id !== id));
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
            >
              <div className="view_btn">View</div>
            </Link>
            <div
              className="delete_btn"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "New Products | Admin Dashboard";
  }, []);

  return (
    <>
      <main className="dashboard_container_main">
        <Sidebar />
        <div className="dashboard_container_right_panel">
          <Navbar />
          <div className="add_item_title_div">
            <h6>Add products</h6>
          </div>
          <div className="add_item_container">
            <div className="add_user_item_div_wrapper">
              <div className="add_user_item_div">
                <div className="add_user_div_left">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : require("../../Img/no_img.png")
                    }
                    alt="Upload"
                  />
                </div>
                <div className="form_div">
                  <form onSubmit={handleSubmit}>
                    <div className="file_upload_div">
                      <label
                        htmlFor="file"
                        className="d-flex align-items-center"
                        style={{ color: "#20B2AA" }}
                      >
                        Upload Image:{" "}
                        <DriveFolderUploadOutlinedIcon className="icon mx-1" />
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="form_input_div">
                      <div className="form_input">
                        <label>Product</label>
                        <input
                          type="text"
                          value={productName}
                          placeholder="Macbook"
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Price</label>
                        <input
                          type="text"
                          value={price}
                          inputMode="numeric"
                          placeholder="2000 max (in USD)"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="form_input">
                        <label>Brand</label>
                        <input
                          value={brand}
                          type="mail"
                          placeholder="Apple"
                          onChange={(e) => setBrand(e.target.value)}
                          maxLength={20}
                        />
                      </div>
                      <div className="form_input">
                        <label>Model</label>
                        <input
                          type="text"
                          value={model}
                          placeholder="Mac14"
                          onChange={(e) => setModel(e.target.value)}
                          maxLength={20}
                        />
                      </div>
                      <div className="form_input">
                        <label>Quantitiy</label>
                        <input
                          value={quantity}
                          type="text"
                          inputMode="numeric"
                          placeholder="20 max"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="submit">Save</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="item_list_div">
              {productRows.length > 0 && (
                <>
                  <h6 className="px-2 mb-0 mt-2">List of products</h6>
                  <ListInTable
                    key={UUID}
                    rows={productRows}
                    columns={productListTableColumns.concat(actionColumn)}
                    height={400}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddProducts;
