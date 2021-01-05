export interface PortfolioFormFields {
  name: string;
  description: string;
  color: string;
  currencyId: number;
}

export interface Portfolio extends PortfolioFormFields {
  id: string;
}
