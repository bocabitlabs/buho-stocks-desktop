import { MarketItemProps } from "../../types/market";

const sampleMarkets: MarketItemProps[] = [
  {
    name: "AMS",
    description: "Amsterdam stock exchange (AMS)",
    region: "Netherlands",
    openTime: "08:00",
    closeTime: "16:40"
  },
  {
    name: "BME",
    description: "Spain stock exchange (BME)",
    region: "Spain",
    openTime: "08:00",
    closeTime: "16:30"
  },
  {
    name: "EPA",
    description: "Paris stock exchange",
    region: "France",
    openTime: "09:00",
    closeTime: "17:30"
  },
  {
    name: "NYSE",
    description: "New York stock exchange (NYSE)",
    region: "United States",
    openTime: "13:30",
    closeTime: "20:00"
  },
  {
    name: "LSE",
    description: "London stock exchange",
    region: "Great Britain",
    openTime: "08:00",
    closeTime: "16:30"
  },
  {
    name: "MTA",
    description: "Milan stock exchange",
    region: "Italy",
    openTime: "08:00",
    closeTime: "16:35"
  },
  {
    name: "NASDAQ",
    description: "United States stock exchange (NASDAQ)",
    region: "United States",
    openTime: "13:30",
    closeTime: "20:00"
  },
  {
    name: "SIX",
    description: "Swiss stock exchange",
    region: "Switzerland",
    openTime: "08:00",
    closeTime: "16:30"
  },
  {
    name: "TSE",
    description: "Tokyo stock exchange",
    region: "Japan",
    openTime: "00:00",
    closeTime: "06:00"
  },
  {
    name: "XETRA",
    description: "Frankfurt stock exchange",
    region: "Germany",
    openTime: "07:00",
    closeTime: "19:00"
  }
];

export default sampleMarkets;
