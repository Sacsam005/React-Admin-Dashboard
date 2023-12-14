import React, { useContext } from "react";
import styled from "styled-components";
import { ProfileContext } from "../App";

const OrderSummary = ({ selectedRow }) => {
  const { userName, profilePic } = useContext(ProfileContext);

  return (
    <>
      <OrderInfoDiv className="order_info_div">
        <div className="admin_content_div">
          <div className="admin_item">
            <div className="admin_img_div">
              <img
                src={
                  profilePic
                    ? `${profilePic}`
                    : "https://sachinsamal.netlify.app/img/sachin-samal.png"
                }
                alt="Admin Profile"
                className="admin_img"
              />
            </div>
            <div className="admin_detail_div">
              <div className="admin_detail_wrapper">
                <h4 className="admin_title_text mb-0 mt-1">{userName}</h4>
                <p className="admin_info_text mb-0">
                  <span>Email: </span>
                  {userName}@gmail.com
                </p>
                <p className="admin_info_text mb-0">
                  <span>Phone no: </span> +1 877-9086758
                </p>
                <p className="admin_info_text mb-0">
                  <span>Address: </span> Elton St. 234 Garden Yd, NewYork
                </p>
                <p className="admin_info_text mb-0">
                  <span>Counrty: </span> US
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="customer_content_div w-100">
          <div className="customer_item">
            <div className="customer_detail_wrapper">
              <h5 className="customer_title_text mb-0">
                <span>Customer: </span>
                {selectedRow?.customer}
              </h5>
              <p className="customer_info_text mb-0">
                <span>Product: </span>
                {selectedRow?.product}
              </p>
              <p className="customer_info_text mb-0">
                <span>Delivery: </span>
                {selectedRow?.date}
              </p>
              <p className="customer_info_text mb-0">
                <span>Price: </span>${selectedRow?.amount}
              </p>
              <p className="customer_info_text mb-0">
                <span>Payment method: </span>
                {selectedRow?.method}
              </p>
              <p className="customer_info_text mb-0">
                <span>Delivery status: </span>
                <span
                  className={`status ${selectedRow?.status.toLowerCase()} text-dark`}
                >
                  {selectedRow?.status}
                </span>
              </p>
            </div>
            <div className="customer_img_div">
              <img
                src={selectedRow?.img}
                alt="Product"
                className="customer_img"
              />
            </div>
          </div>
        </div>
      </OrderInfoDiv>
    </>
  );
};

export const OrderInfoDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 30px 0px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }

  span {
    font-weight: 700;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .admin_content_div {
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .admin_item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .customer_content_div {
    padding: 0.5rem;
    margin: 0 auto;
    max-width: 100%;
    width: 500px;
  }

  .customer_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;
    @media (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media screen and (max-width: 500px) {
    .customer_detail_wrapper {
      order: 2;
    }
  }
`;

export default OrderSummary;
