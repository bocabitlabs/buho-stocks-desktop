-- Up
CREATE TABLE IF NOT EXISTS "currencies" (
	"id" INTEGER NOT NULL UNIQUE,
	"abbreviation" TEXT,
	"name" TEXT NOT NULL UNIQUE,
	"color" TEXT,
	"symbol" TEXT,
	"country" TEXT,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
INSERT INTO "currencies" (
		"id",
		"abbreviation",
		"name",
		"color",
		"symbol",
		"country"
	)
VALUES (
		'1',
		'EUR',
		'Euro',
		'#607d8b',
		'€',
		'European Union'
	),
	(
		'2',
		'USD',
		'US Dolar',
		'#607d8b',
		'$',
		'United States'
	),
	(
		'3',
		'CHF',
		'Swiss Franc',
		'#607d8b',
		'SFr.',
		'Switzerland'
	),
	(
		'4',
		'GBP',
		'GB Pound',
		'#607d8b',
		'£',
		'Great Britain'
	);
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	"description" TEXT,
	"color" TEXT,
	"currencyId" INTEGER NOT NULL,
	"hideClosedCompanies" INTEGER NOT NULL DEFAULT 0 CHECK(hideClosedCompanies IN (0, 1)),
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("currencyId") REFERENCES "currencies" ("id")
);
CREATE TABLE IF NOT EXISTS "markets" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	"description" TEXT,
	"color" TEXT,
	"region" TEXT,
	"openTime" TEXT,
	"closeTime" TEXT,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
INSERT INTO "markets" (
		"name",
		"description",
		"color",
		"region",
		"openTime",
		"closeTime"
	)
VALUES (
		'AMS',
		'Amsterdam stock exchange (AMS)',
		'#607d8b',
		'Netherlands',
		'08:00',
		'16:40'
	),
	(
		'BME',
		'Spain stock exchange (BME)',
		'#607d8b',
		'Spain',
		'08:00',
		'16:30'
	),
	(
		'EPA',
		'Paris stock exchange',
		'#607d8b',
		'France',
		'09:00',
		'17:30'
	),
	(
		'NYSE',
		'New York stock exchange (NYSE)',
		'#607d8b',
		'United States',
		'13:30',
		'20:00'
	),
	(
		'LSE',
		'London stock exchange',
		'#607d8b',
		'Great Britain',
		'08:00',
		'16:30'
	),
	(
		'MTA',
		'Milan stock exchange',
		'#607d8b',
		'Italy',
		'08:00',
		'16:35'
	),
	(
		'NASDAQ',
		'United States stock exchange (NASDAQ)',
		'#607d8b',
		'United States',
		'13:30',
		'20:00'
	),
	(
		'SIX',
		'Swiss stock exchange',
		'#607d8b',
		'Switzerland',
		'08:00',
		'16:30'
	),
	(
		'TSE',
		'Tokyo stock exchange',
		'#607d8b',
		'Japan',
		'00:00',
		'06:00'
	),
	(
		'XETRA',
		'Frankfurt stock exchange',
		'#607d8b',
		'Germany',
		'07:00',
		'19:00'
	);
CREATE TABLE IF NOT EXISTS "sectors" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	"color" TEXT,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
INSERT INTO "sectors" ("name", "color")
VALUES ('Construction', '#3f51b5'),
	('ETF', '#3f51b5'),
	('Automobiles', '#3f51b5'),
	('Biotechnology', '#3f51b5'),
	('Healthcare Facilities', '#3f51b5'),
	('Mining', '#3f51b5'),
	('Industrials', '#3f51b5'),
	('REIT', '#3f51b5'),
	('Consumer Cyclical', '#3f51b5'),
	('Consumer Defensive', '#3f51b5'),
	('Home Improvement Stores', '#3f51b5'),
	('Banks', '#3f51b5'),
	('Pharmaceutical Retailers', '#3f51b5'),
	('Insurance', '#3f51b5'),
	('Financial Services', '#3f51b5'),
	('Technology', '#3f51b5'),
	('Telecom Services', '#3f51b5'),
	('Integrated Freight & Logistics', '#3f51b5'),
	('Utilities', '#3f51b5');
CREATE TABLE IF NOT EXISTS "inflations" (
	"id" INTEGER NOT NULL UNIQUE,
	"year" INTEGER NOT NULL UNIQUE,
	"percentage" NUMERIC NOT NULL,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
INSERT INTO "inflations" ("year", "percentage")
VALUES ('2011', '3.2'),
	('2012', '2.45'),
	('2013', '1.41'),
	('2014', '-0.15'),
	('2015', '-0.5'),
	('2016', '-0.2'),
	('2017', '1.96'),
	('2018', '1.68'),
	('2019', '0.7'),
	('2020', '-0.3');
CREATE TABLE IF NOT EXISTS "companies" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"ticker" INTEGER NOT NULL,
	"description" INTEGER,
	"url" INTEGER,
	"color" TEXT,
	"broker" TEXT,
	"closed" INTEGER NOT NULL DEFAULT 0 CHECK(closed IN (0, 1)),
	"sectorId" INTEGER NOT NULL,
	"marketId" INTEGER NOT NULL,
	"currencyId" INTEGER NOT NULL,
	"portfolioId" INTEGER NOT NULL,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("sectorId") REFERENCES "sectors" ("id"),
	FOREIGN KEY ("portfolioId") REFERENCES "portfolios" ("id") ON DELETE CASCADE,
	FOREIGN KEY ("currencyId") REFERENCES "currencies" ("id"),
	FOREIGN KEY ("marketId") REFERENCES "markets" ("id")
);
CREATE TABLE IF NOT EXISTS "stockPrices" (
	"id" INTEGER NOT NULL UNIQUE,
	"transactionDate" TEXT NOT NULL,
	"price" NUMERIC NOT NULL,
	"companyId" INTEGER NOT NULL,
	"exchangeRate" NUMERIC NOT NULL,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "dividendsTransactions" (
	"id" INTEGER NOT NULL UNIQUE,
	"count" INTEGER NOT NULL,
	"price" NUMERIC NOT NULL,
	"commission" NUMERIC NOT NULL,
	"transactionDate" TEXT NOT NULL,
	"exchangeRate" NUMERIC NOT NULL,
	"color" TEXT,
	"companyId" INTEGER NOT NULL,
	"notes" TEXT,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "rightsTransactions" (
	"id" INTEGER NOT NULL UNIQUE,
	"count" INTEGER NOT NULL,
	"price" NUMERIC NOT NULL,
	"commission" NUMERIC NOT NULL,
	"color" TEXT,
	"type" TEXT NOT NULL,
	"transactionDate" TEXT NOT NULL,
	"exchangeRate" INTEGER NOT NULL,
	"notes" TEXT,
	"companyId" INTEGER NOT NULL,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "sharesTransactions" (
	"id" INTEGER NOT NULL UNIQUE,
	"count" INTEGER NOT NULL,
	"price" NUMERIC NOT NULL,
	"commission" NUMERIC NOT NULL,
	"color" TEXT,
	"type" TEXT NOT NULL,
	"transactionDate" TEXT NOT NULL,
	"exchangeRate" NUMERIC NOT NULL,
	"companyId" INTEGER NOT NULL,
	"notes" TEXT,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "settings" (
	"id" INTEGER NOT NULL UNIQUE,
	"selectedPortfolio" TEXT,
	"databasePath" TEXT,
	"language" TEXT,
	"defaultPortfolioSort" TEXT,
	"defaultPortfolioDisplayMode" TEXT,
	"defaultCompanySort" TEXT,
	"defaultCompanyDisplayMode" TEXT,
	"currentDatabaseVersion" INTEGER NOT NULL,
	"collapsed" INTEGER NOT NULL DEFAULT 0 CHECK(collapsed IN (0, 1)),
	PRIMARY KEY ("id" AUTOINCREMENT)
);
INSERT INTO "settings" ("id", "currentDatabaseVersion")
VALUES ('1', 1);
-- Down
DROP TABLE currencies;
DROP TABLE portfolios;
DROP TABLE markets;
DROP TABLE companies;
DROP TABLE inflation;
DROP TABLE dividendsTransactions;
DROP TABLE sharesTransactions;
DROP TABLE rightsTransactions;
DROP TABLE settings;
DROP TABLE stockPrices;