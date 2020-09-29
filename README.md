# Buho Stocks

Application to manage a stocks portfolio for Buy & Hold investment.

![Continuous Integration](https://github.com/bocabitlabs/buho-stocks/workflows/Continuous%20Integration/badge.svg) [![codecov](https://codecov.io/gh/bocabitlabs/buho-stocks/branch/development/graph/badge.svg)](https://codecov.io/gh/bocabitlabs/buho-stocks)

## Technologies used

- React
- Typescript
- Ant Design

## Requirements

- Node 13
- Yarn 1.22
- Firebase project

## Development

If you want to participate on the project, please take a look at
the [CONTRIBUTING file](/docs/CONTRIBUTING.md) as it includes information about the branching and commit guideliness.

### 1. Install dependencies

#### Mac OS X

```bash
brew install node && brew install yarn
```

### 2. Create a Firebase project

1. Go to https://console.firebase.google.com/ and create a new project there.
2. Create a new "Web application"
3. Copy the values of the `firebaseConfig` variable.

### 3. Install the dependencies

```bash
yarn
```

### 4. Configure the application settings

```bash
cp utils/config.sample.tsx utils/config.tsx
```

Update the values of the `firebaseConfig` variable from the previous section.

### 3. Start the application

```bash
yarn start
```

### Testing

```bash
yarn test
```

## Links

- UI docs: https://ant.design/components/overview/

## Attributions

- Icons by [lavarmsg](https://www.vecteezy.com/members/lavarmsg)
