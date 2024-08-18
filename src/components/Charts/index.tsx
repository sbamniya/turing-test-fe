import dynamic from "next/dynamic";
import React from "react";
import { LineChartType } from "./LineChart";

const LineChart = dynamic(() => import("./LineChart"), { ssr: false });

type ChartType = LineChartType & {
  type: "line";
};

const Charts: React.FC<ChartType> = ({ type, data, series = [] }) => {
  switch (type) {
    case "line":
      return <LineChart data={data} series={series} />;

    default:
      return null;
  }
};

export default Charts;
