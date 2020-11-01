CREATE TABLE IF NOT EXISTS "currencies" (
	"id" INTEGER NOT NULL UNIQUE,
	"abbreviation" TEXT,
	"name" TEXT,
	"symbol" TEXT,
	"country" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT,
	"description" TEXT,
	"currencyId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("currencyId") REFERENCES "currencies" ("id")
);
CREATE TABLE IF NOT EXISTS "markets" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT,
	"description" TEXT,
	"region" TEXT,
	"openTime" TEXT,
	"closeTime" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "dividends" (
	"id" INTEGER NOT NULL UNIQUE,
	"date" TEXT,
	"exchangeRate" NUMERIC,
	"numberShares" INTEGER,
	"comission" NUMERIC,
	"companyId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies"
);
CREATE TABLE IF NOT EXISTS "companies" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT,
	"ticker" INTEGER,
	"description" INTEGER,
	"url" INTEGER,
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
CREATE TABLE IF NOT EXISTS "sectors" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "inflation" (
	"id" INTEGER NOT NULL UNIQUE,
	"number" INTEGER NOT NULL UNIQUE,
	"percentage" NUMERIC NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "rights" (
	"id" INTEGER NOT NULL UNIQUE,
	"rightsNumber" INTEGER,
	"priceRight" NUMERIC,
	"comission" NUMERIC,
	"type" TEXT,
	"date" TEXT,
	"exchangeRate" INTEGER,
	"notes" TEXT,
	"companyId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ("id")
);
CREATE TABLE IF NOT EXISTS "shares" (
	"id" INTEGER NOT NULL UNIQUE,
	"sharesNumber" INTEGER,
	"priceShare" NUMERIC,
	"comission" NUMERIC,
	"type" TEXT,
	"date" TEXT,
	"exchangeRate" NUMERIC,
	"companyId" INTEGER NOT NULL,
	"notes" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("companyId") REFERENCES "companies" ("id")
);

CREATE TABLE IF NOT EXISTS "settings" (
	"id" INTEGER NOT NULL UNIQUE,
	"selectedPortfolio" TEXT,
	"collapsed" INTEGER NOT NULL DEFAULT 0 CHECK(collapsed IN (0,1)),
	PRIMARY KEY ("id" AUTOINCREMENT)
);