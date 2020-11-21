import { Tag } from "antd";
import React from "react";

export const buySellFormatter = (value: string) => {
  console.log("Calling buySellFormatter")
  let color = "green";
  if (value === "SELL") {
    color = "volcano";
  }
  return (
    <Tag color={color} key={value}>
      {value}
    </Tag>
  );
};
