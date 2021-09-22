import { Modal } from "antd";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import StockPriceList from "../StockPriceList/StockPriceList";

interface Props {
  currencySymbol: string;
  visible: boolean;
  setVisible: Function;
}

export default function StockPriceListModal({
  currencySymbol,
  visible,
  setVisible
}: Props): ReactElement {

  const { t } = useTranslation();

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  return (
    <Modal
      title={t("Stock prices")}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
    >
      <StockPriceList currencySymbol={currencySymbol} />
    </Modal>
  );
}
