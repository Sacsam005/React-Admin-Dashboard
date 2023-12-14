import React from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const SummaryCard = ({
  summaryTitle,
  summaryPercentage,
  summaryDescriptionTitle,
  summaryTotal,
  summaryDescriptionText,
  summaryStartTime,
  summaryStartTotal,
  summaryEndTime,
  summaryEndTotal,
}) => {
  return (
    <>
      <SummaryCardDiv className="summary_card_div">
        <div className="summary_card_div_top">
          <h4 className="title">{summaryTitle}</h4>
          <MoreVertIcon fontSize="small" />
        </div>
        <div className="summary_card_div_bottom">
          <div className="summary_card_circular_progressbar">
            <CircularProgressbar
              value={summaryPercentage}
              text={`${summaryPercentage}%`}
              strokeWidth={7}
              styles={buildStyles({
                textColor: "#20B2AA",
                fontWeight: "900",
                pathColor: "#20B2AA",
                trailColor: "gold",
                strokeLinecap: "butt",
              })}
            />
          </div>
          <div className="summary_card_description">
            <h5>{summaryDescriptionTitle}</h5>
            <p className="amount mb-0">{`${summaryTotal}`}</p>
            <p className="mb-0" style={{ fontSize: "12px" }}>
              {summaryDescriptionText}
            </p>
          </div>
          <div className="summary_card_summary">
            <div className="summary_item">
              <div className="summary_item_title">
                <h6>{summaryStartTime}</h6>
              </div>
              <div className="summary_item_result negative">
                <KeyboardArrowDownIcon fontSize="small" />
                <p className="resultAmount mb-0">{summaryStartTotal}</p>
              </div>
            </div>
            <div className="summary_item">
              <div className="summary_item_title">
                <h6>{summaryEndTime}</h6>
              </div>
              <div className="summary_item_result positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <p className="resultAmount mb-0">{summaryEndTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </SummaryCardDiv>
    </>
  );
};

const SummaryCardDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 0.5rem;
  color: #777;
  margin: 0 0.25rem;
  height: max-content;
  flex: 1;

  @media screen and (max-width: 992px) {
    .summary_card_div {
      min-height: 370px;
      max-width: 100%;
      min-width: 360px;
      color: inherit;
    }
  }

  .summary_card_div_top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .summary_card_div_bottom {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .summary_card_circular_progressbar {
    width: 100px;
    height: 100px;
  }

  .summary_card_description {
    text-align: center;
  }

  .title {
    font-weight: 700;
  }

  .amount {
    font-size: 2rem;
    font-weight: 900;
    color: #20b2aa;
  }

  .summary_card_summary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .summary_item {
    text-align: center;
  }

  .summary_item_result {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
`;

export default SummaryCard;
