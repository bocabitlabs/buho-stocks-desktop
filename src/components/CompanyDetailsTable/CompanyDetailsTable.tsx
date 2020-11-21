import React, { ReactElement, useContext } from "react";
import { DividendsContext } from "../../contexts/dividends";
import { SharesContext } from "../../contexts/shares";

interface IProps {
  portfolioId: string;
  companyId: string;
}

export default function CompanyDetailsTable({
  portfolioId,
  companyId
}: IProps) {

  const { shares } = useContext(SharesContext);
  const { dividends } = useContext(DividendsContext);

  return <div></div>;
}
