export interface MarketFormProps {
  name: string;
  description: string;
  region: string;
  color: string;
  openTime: string;
  closeTime: string;
}

export interface Market extends MarketFormProps{
  id: string;
}