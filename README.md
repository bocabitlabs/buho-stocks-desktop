# Buho Stocks

Application to manage a stocks portfolio for Buy & Hold investment.

**Master**: ![Continuous Integration](https://github.com/bocabitlabs/buho-stocks/workflows/Continuous%20Integration/badge.svg) [![codecov](https://codecov.io/gh/bocabitlabs/buho-stocks/branch/master/graph/badge.svg)](https://codecov.io/gh/bocabitlabs/buho-stocks)

**Development**: ![Continuous Integration](https://github.com/bocabitlabs/buho-stocks/workflows/Continuous%20Integration/badge.svg?branch=development) [![codecov](https://codecov.io/gh/bocabitlabs/buho-stocks/branch/development/graph/badge.svg)](https://codecov.io/gh/bocabitlabs/buho-stocks)

## 🎁 Features

- Unlimited portfolios.
- Unlimited companies per portfolio.
- Handle stock transactions, dividends and rights.
- Multiple currencies, exchange rates and sectors.
- Support for inflation.
- Import CSV files from Interactive Brokers and ING (Spain.)

## Technologies used

- React
- Electron
- Typescript
- Ant Design

## Requirements

- Node 13
- Yarn 1.22
- Mac OS Big Sur (Developed on)

## Development

If you want to participate on the project, please take a look at
the [CONTRIBUTING file](/docs/CONTRIBUTING.md) as it includes information about the branching and commit guideliness.

### 1. Install dependencies

#### Mac OS X

```bash
brew install node && brew install yarn
```

### 2. Install the node dependencies

```bash
yarn
```

### 3. Configure the application settings

> Only if the application will be distributed on Github.

```bash
cp utils/config.sample.tsx utils/config.tsx
```

### 4. Start the application

```bash
yarn dev
```

### Testing

```bash
yarn test
```

## Paths

- Application data (Mac): ~/Library/Application Support/buho-stocks
- Logs (Mac): ~/Library/Logs/Buho-Stocks/main.log

## Links

- UI docs: https://ant.design/components/overview/
- ECB: https://sdw.ecb.europa.eu/quickview.do?SERIES_KEY=120.EXR.D.CHF.EUR.SP00.A

## Attributions

- Icons by [lavarmsg](https://www.vecteezy.com/members/lavarmsg)

