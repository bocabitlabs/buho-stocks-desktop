-- Up
CREATE TABLE IF NOT EXISTS "currencies" (
	"id" INTEGER NOT NULL UNIQUE,
	"abbreviation" TEXT,
	"name" TEXT NOT NULL UNIQUE,
	"color" TEXT,
	"symbol" TEXT,
	"country" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	"description" TEXT,
	"color" TEXT,
	"currencyId" INTEGER NOT NULL,
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
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "sectors" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL UNIQUE,
	"color" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "inflations" (
	"id" INTEGER NOT NULL UNIQUE,
	"year" INTEGER NOT NULL UNIQUE,
	"percentage" NUMERIC NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "companies" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"ticker" INTEGER NOT NULL,
	"description" INTEGER,
	"url" INTEGER,
	"color" TEXT,
	"sectorId" INTEGER NOT NULL,
	"marketId" INTEGER NOT NULL,
	"currencyId" INTEGER NOT NULL,
	"portfolioId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("sectorId") REFERENCES "sectors" ("id"),
	FOREIGN KEY ("portfolioId") REFERENCES "portfolios" ("id"),
	FOREIGN KEY ("currencyId") REFERENCES "currencies" ("id"),
	FOREIGN KEY ("marketId") REFERENCES "markets" ("id")
);
CREATE TABLE IF NOT EXISTS "stockPrices" (
	"id" INTEGER NOT NULL UNIQUE,
	"operationDate" TEXT NOT NULL,
	"priceShare" NUMERIC NOT NULL,
	"companyId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies"
);
CREATE TABLE IF NOT EXISTS "dividends" (
	"id" INTEGER NOT NULL UNIQUE,
	"operationDate" TEXT NOT NULL,
	"priceShare" NUMERIC NOT NULL,
	"exchangeRate" NUMERIC NOT NULL,
	"color" TEXT,
	"sharesNumber" INTEGER NOT NULL,
	"commission" NUMERIC NOT NULL,
	"companyId" INTEGER NOT NULL,
	"notes" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies"
);
CREATE TABLE IF NOT EXISTS "rights" (
	"id" INTEGER NOT NULL UNIQUE,
	"rightsNumber" INTEGER NOT NULL,
	"priceRight" NUMERIC NOT NULL,
	"commission" NUMERIC NOT NULL,
	"color" TEXT,
	"type" TEXT NOT NULL,
	"operationDate" TEXT NOT NULL,
	"exchangeRate" INTEGER NOT NULL,
	"notes" TEXT,
	"companyId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ("id")
);
CREATE TABLE IF NOT EXISTS "shares" (
	"id" INTEGER NOT NULL UNIQUE,
	"sharesNumber" INTEGER NOT NULL,
	"priceShare" NUMERIC NOT NULL,
	"commission" NUMERIC NOT NULL,
	"color" TEXT,
	"type" TEXT NOT NULL,
	"operationDate" TEXT NOT NULL,
	"exchangeRate" NUMERIC NOT NULL,
	"companyId" INTEGER NOT NULL,
	"notes" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ("id")
);
CREATE TABLE IF NOT EXISTS "settings" (
	"id" INTEGER NOT NULL UNIQUE,
	"selectedPortfolio" TEXT,
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
DROP TABLE dividends;
DROP TABLE companies;
DROP TABLE inflation;
DROP TABLE shares;
DROP TABLE rights;
DROP TABLE shares;
DROP TABLE settings;
DROP TABLE stockPrices;