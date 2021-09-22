import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

interface ElementsFoundProps {
  sectorsCount: number;
  marketsCount: number;
  currenciesCount: number;
  portfoliosCount: number;
  companiesCount: number;
  sharesCount: number;
  rightsCount: number;
  dividendsCount: number;
  stockPricesCount: number;
}

interface Props {
  elementsFound: ElementsFoundProps;
}

export default function FoundItems({ elementsFound }: Props): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      Found:
      <ul>
        <li>{elementsFound.sectorsCount} {t("sectors")}.</li>
        <li>{elementsFound.marketsCount} {t("markets")}.</li>
        <li>{elementsFound.currenciesCount} {t("currencies")}.</li>
        <li>{elementsFound.portfoliosCount} {t("portfolios")}.</li>
        <li>{elementsFound.companiesCount} {t("companies")}.</li>
        <li>{elementsFound.sharesCount} {t("shares transactions")}.</li>
        <li>{elementsFound.rightsCount} {t("rights transactions")}.</li>
        <li>{elementsFound.dividendsCount} {t("dividends transactions")}.</li>
        <li>{elementsFound.stockPricesCount} {t("stock prices")}.</li>
      </ul>
    </div>
  );
}
