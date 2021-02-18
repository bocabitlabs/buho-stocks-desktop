import { Form } from "antd";
import React, { ReactElement } from "react";
import PortfolioImportForm from "../PortfolioImportForm/PortfolioImportForm";

interface Props {
  portfolios: any[];
}

export default function PortfolioImporter({ portfolios }: Props): ReactElement {
  return (
    <div>
      {portfolios.map((portfolio, key) => (
        <PortfolioImportForm key={key} portfolio={portfolio}/>
      ))}
    </div>
  );
}
