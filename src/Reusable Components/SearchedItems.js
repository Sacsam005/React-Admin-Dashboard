import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchedItems = ({
  link,
  id,
  product,
  img,
  customer,
  date,
  price,
  status,
}) => {
  return (
    <>
      <Link to={link} style={{ textDecoration: "none", color: "unset" }}>
        <SearchedItemsDiv className="searched_items_wrapper">
          <div className="searched_items_description_div">
            <div className="searched_items_text_description">
              <p className="mb-0 customer_name" style={{ fontWeight: 700 }}>
                {customer}
              </p>
              <p className="mb-0 product_name">{product}</p>
              <p className="mb-0 product_status">{status}</p>
            </div>
            <div className="mb-0 searched_items_price_and_id_div">
              <p className="mb-0 items_price">${price}</p>
              <p className="mb-0 items_id">{id}</p>
              <p className="mb-0 date">{date}</p>
            </div>
          </div>
          <div className="searched_items_img_div">
            <img src={img} alt="Searched Items" />
          </div>
        </SearchedItemsDiv>
      </Link>
    </>
  );
};

const SearchedItemsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
  gap: 0.75rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  .searched_items_description_div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }
  .searched_items_price_and_id_div {
    align-self: flex-start;
  }
  .searched_items_img_div {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;

export default SearchedItems;
