import * as React from "react";
import { StatisticProps } from "./types";

export const StatisticItem: React.FC<StatisticProps> = ({ count, label }) => (
  <div className="flex flex-col self-stretch my-auto">
    <div className="text-3xl">{count}</div>
    <div className="text-lg">{label}</div>
  </div>
);