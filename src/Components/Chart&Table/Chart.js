import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Legend,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../App.sass";

const Chart = ({ title, data, fillColor1, fillColor2, fillColor3 }) => {
  return (
    <>
      <ChartDiv className="chart_div">
        <div className="title">
          <h5 className="p-2 mb-0">Area Chart representation</h5>
          <p className="p-2 mb-0">{title}</p>
        </div>
        <ResponsiveContainer width="100%" aspect={3 / 1}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="chart_grid" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Total Orders"
              stackId="1"
              stroke="#027F89"
              fill={fillColor1}
            />
            <Area
              type="monotone"
              dataKey="Orders Delivered"
              stackId="1"
              stroke="#82ca9d"
              fill={fillColor2}
            />
            <Area
              type="monotone"
              dataKey="Orders Pending"
              stackId="1"
              stroke="#ffc658"
              fill={fillColor3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartDiv>
      <ChartDiv className="chart_div">
        <div className="title">
          <h5 className="p-2 mb-0">Bar Chart representation</h5>
          <p className="p-2 mb-0">{title}</p>
        </div>
        <ResponsiveContainer width="100%" aspect={3 / 1}>
          <BarChart width={500} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total Orders" fill={fillColor1} />
            <Bar dataKey="Orders Delivered" fill={fillColor2} />
            <Bar dataKey="Orders Pending" fill={fillColor3} />
          </BarChart>
        </ResponsiveContainer>
      </ChartDiv>
    </>
  );
};

const ChartDiv = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 0.5rem;
  align-self: center;

  .title {
    margin-bottom: 1rem;
  }

  h5 {
    font-weight: 700;
  }

  .chart_grid {
    stroke: rgb(228, 225, 225);
  }

  @media screen and (max-width: 500px) {
    .recharts-wrapper {
      max-width: 450px;
      height: 133.333px;
    }
  }
`;

export default Chart;
