# Buho-Stocks

<img src="logo.png" align="right"
     alt="Buho-Stocks logo" height="100">

Multi platform (and offline) desktop application to manage and track a stocks portfolio for [Buy & Hold investment](https://en.wikipedia.org/wiki/Buy_and_hold) purposes.


**Master**: ![Continuous Integration](https://github.com/bocabitlabs/buho-stocks/workflows/Continuous%20Integration/badge.svg) [![codecov](https://codecov.io/gh/bocabitlabs/buho-stocks/branch/master/graph/badge.svg)](https://codecov.io/gh/bocabitlabs/buho-stocks)

**Development**: ![Continuous Integration](https://github.com/bocabitlabs/buho-stocks/workflows/Continuous%20Integration/badge.svg?branch=development) [![codecov](https://codecov.io/gh/bocabitlabs/buho-stocks/branch/development/graph/badge.svg)](https://codecov.io/gh/bocabitlabs/buho-stocks)

<hr/>

## 🎁 Features

- Unlimited portfolios.
- Unlimited companies per portfolio.
- Handle stock transactions, dividends and rights.
- Multiple currencies, exchange rates (from ECB) and sectors.
- <del>Support for inflation.</del>
- Import CSV files from Interactive Brokers and ING (Spain).
- Export app data to CSV.
- Fetch stock prices and exchange rates from a external source.
- Graphs

## 🔧 Install

> ⬇️ New versions are published on the [Releases Page](https://github.com/bocabitlabs/buho-stocks/releases).

You can download them from there and run them on your system.

Please, be aware that since I'm developing it on Mac OS X (Currently Big Sur) this is the only "really tested" environment.

## 🧑‍💻 Development

### Technologies used

- React
- Electron
- Typescript
- Ant Design (UI)

### Dev. Requirements

- Node 13
- Yarn 1.22

### How to contribute

If you want to participate on the project, please take a look at
the [CONTRIBUTING file](/docs/CONTRIBUTING.md) as it includes information about the branching and commit guideliness.

##### 1. Install dependencies

###### Mac OS X

```bash
brew install node && brew install yarn
```

##### 2. Install the node dependencies

```bash
yarn
```

##### 3. Configure the application settings

> Only required if the application will be distributed on Github.

```bash
cp src/utils/config.sample.tsx src/utils/config.tsx
```

##### 4. Start the application

```bash
yarn dev
```

##### Testing

```bash
yarn test
```

##### Publishing

```bash
yarn publish
```

## 🛣 Paths

- Application's data (Mac): `~/Library/Application Support/buho-stocks`
- Logs (Mac): `~/Library/Logs/Buho-Stocks/main.log`

## 🔗 Links

- UI docs: https://ant.design/components/overview/
- ECB: https://sdw.ecb.europa.eu/quickview.do?SERIES_KEY=120.EXR.D.CHF.EUR.SP00.A
- Graphs: https://nivo.rocks/

## 🙏 Attributions

- Icons by [lavarmsg](https://www.vecteezy.com/members/lavarmsg)

## 📝 License

[GPL 3](LICENSE)

