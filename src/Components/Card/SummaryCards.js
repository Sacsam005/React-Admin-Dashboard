import React from "react";
import SummaryCard from "../../Reusable Components/SummaryCard";
import { generateRandomTotal } from "../../Reusable Components/Function";

const SummaryCards = () => {
  return (
    <>
      <SummaryCard
        summaryTitle="Total Revenue"
        summaryPercentage={generateRandomTotal(100000).percentageCalculator}
        summaryDescriptionTitle="Total sales in 4 weeks"
        summaryTotal={`$${generateRandomTotal(100000).formattedRandomTotal}`}
        summaryDescriptionText="Previous transactions processing. Last payments may not be
              included."
        summaryStartTime="Last Week"
        summaryStartTotal={`$${
          generateRandomTotal(10000).formattedRandomTotal
        }`}
        summaryEndTime="Last Month"
        summaryEndTotal={`$${generateRandomTotal(100000).formattedRandomTotal}`}
      />
      <SummaryCard
        summaryTitle="Products Sold"
        summaryPercentage={generateRandomTotal(10000).percentageCalculator}
        summaryDescriptionTitle="Total products sold in 4 weeks"
        summaryTotal={generateRandomTotal(10000).formattedRandomTotal}
        summaryDescriptionText="Previous transactions processing. Latest product quantity may not be
              included."
        summaryStartTime="Last Week"
        summaryStartTotal={generateRandomTotal(1000).formattedRandomTotal}
        summaryEndTime="Last Month"
        summaryEndTotal={generateRandomTotal(10000).formattedRandomTotal}
      />
      <SummaryCard
        summaryTitle="New Users"
        summaryPercentage={generateRandomTotal(1000).percentageCalculator}
        summaryDescriptionTitle="New users in 4 weeks"
        summaryTotal={generateRandomTotal(1000).formattedRandomTotal}
        summaryDescriptionText="Previous transactions processing. Recently added users may not be
              included."
        summaryStartTime="Last Week"
        summaryStartTotal={generateRandomTotal(100).formattedRandomTotal}
        summaryEndTime="Last Month"
        summaryEndTotal={generateRandomTotal(1000).formattedRandomTotal}
      />
    </>
  );
};

export default SummaryCards;
