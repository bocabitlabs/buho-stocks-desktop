import { Modal } from "antd";
import React, { ReactElement } from "react";

interface Props {
  companyId: string;
  currencySymbol: string;
  visible: boolean;
  setVisible: Function;
}

export default function StockPriceListModal({
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
      title="Stock prices"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      TODO
    </Modal>
  );
}
