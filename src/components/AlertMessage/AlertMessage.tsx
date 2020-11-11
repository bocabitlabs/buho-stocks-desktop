import { message } from "antd";
import React, { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IState {
  message?: string;
}

export default function AlertMessage(): ReactElement {
  const location = useLocation();
  const resultMessage = (location.state as IState)?.message;

  useEffect(() => {
    if (message) {
      const messageType = resultMessage;
      if (messageType === "portfolio-deleted") {
        message.success("Portfolio has been deleted.");
      }
    }
  }, [resultMessage]);

  return <div></div>;
}
