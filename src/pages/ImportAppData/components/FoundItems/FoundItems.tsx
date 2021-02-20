import React, { ReactElement } from "react";

interface ElementsFoundProps{
  sectorsCount: number;
  marketsCount: number;
  currenciesCount: number;
  portfoliosCount: number;
  companiesCount: number;
  sharesCount: number;
  rightsCount: number;
  dividendsCount: number;
  inflationsCount: number;
}

interface Props {
  elementsFound: ElementsFoundProps
}

export default function FoundItems({elementsFound}: Props): ReactElement {
  return (
    <div>
      Found:
      <ul>
        <li>{elementsFound.sectorsCount} sectors.</li>
        <li>{elementsFound.marketsCount} markets.</li>
        <li>{elementsFound.currenciesCount} currencies.</li>
        <li>{elementsFound.portfoliosCount} portfolios.</li>
        <li>{elementsFound.companiesCount} companies.</li>
        <li>{elementsFound.sharesCount} shares transactions.</li>
        <li>{elementsFound.rightsCount} rights transactions.</li>
        <li>{elementsFound.dividendsCount} dividends transactions.</li>
        <li>{elementsFound.inflationsCount} inflations.</li>
      </ul>
    </div>
  );
}
