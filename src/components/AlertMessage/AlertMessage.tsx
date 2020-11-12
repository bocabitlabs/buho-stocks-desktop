import { message } from "antd";
import React, { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MessageProps {
  type: "error" | "success";
  text: string;
}

interface IState {
  message?: MessageProps;
}

export default function AlertMessage(): ReactElement {
  const location = useLocation();
  const resultMessage = (location.state as IState)?.message;

  useEffect(() => {
    if (resultMessage) {
      const messageType = resultMessage.type;
      const messageText = resultMessage.text;
      if (messageType === "success") {
        message.success(messageText);
      } else if (messageType === "error") {
        message.success(messageText);
      }
    }
  }, [resultMessage]);

  return <></>;
}
