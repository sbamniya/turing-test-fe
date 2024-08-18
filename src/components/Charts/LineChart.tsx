"use client";

import dayjs from "dayjs";
import React from "react";
import {
  Line,
  ResponsiveContainer,
  LineChart as RLineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CurveType } from "recharts/types/shape/Curve";

type Series = { key: string; type: CurveType; stroke: string };

export type DataType = {
  x: string;
  read: number;
  write: number;
};

export type LineChartType = { data: DataType[]; series: Series[] };

const LineChart: React.FC<LineChartType> = ({ data, series }) => {
  return (
    <ResponsiveContainer width="100%">
      <RLineChart data={data}>
        {series.map(({ key, stroke, type }, index) => (
          <Line
            key={`${key}-${index}`}
            type={type}
            dataKey={key}
            stroke={stroke}
            dot={false}
          />
        ))}
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
      </RLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
