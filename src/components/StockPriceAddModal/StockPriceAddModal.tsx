import { Modal } from "antd";
import React, { ReactElement } from "react";
import StockPriceAddForm from "../StockPriceAddForm/StockPriceAddForm";

interface Props {
  companyId: string;
  currencySymbol: string;
  visible: boolean;
  setVisible: Function;
}

export default function StockPriceAddModal({
  companyId,
  currencySymbol,
  visible,
  setVisible
}: Props): ReactElement {
  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  return (
    <Modal
      title="Add a stock price"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <StockPriceAddForm
        companyId={companyId}
        currencySymbol={currencySymbol}
        onSuccess={handleOk}
      />
    </Modal>
  );
}
