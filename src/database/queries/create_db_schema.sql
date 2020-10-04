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
	"currency_id" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id")
);
CREATE TABLE IF NOT EXISTS "markets" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" TEXT,
	"description" TEXT,
	"region" TEXT,
	"open_time" TEXT,
	"close_time" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "dividends" (
	"id" INTEGER NOT NULL UNIQUE,
	"date" TEXT,
	"exchange_rate" NUMERIC,
	"number_shares" INTEGER,
	"comission" NUMERIC,
	"company_id" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("company_id") REFERENCES "companies"
);
CREATE TABLE IF NOT EXISTS "companies" (
	"id" INTEGER NOT NULL UNIQUE,
	"name" INTEGER,
	"ticker" INTEGER,
	"description" INTEGER,
	"url" INTEGER,
	"market_id" INTEGER NOT NULL,
	"currency_id" INTEGER NOT NULL,
	"portfolio_id" INTEGER NOT NULL,
	"sector" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("portfolio_id") REFERENCES "portfolios" ("id"),
	FOREIGN KEY ("currency_id") REFERENCES "currencies" ("id"),
	FOREIGN KEY ("market_id") REFERENCES "markets" ("id")
);
CREATE TABLE IF NOT EXISTS "inflation" (
	"id" INTEGER NOT NULL UNIQUE,
	"number" INTEGER NOT NULL UNIQUE,
	"percentage" NUMERIC NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "rights" (
	"id" INTEGER NOT NULL UNIQUE,
	"rights_number" INTEGER,
	"price_right" NUMERIC,
	"comission" NUMERIC,
	"type" TEXT,
	"date" TEXT,
	"exchange_rate" INTEGER,
	"notes" TEXT,
	"company_id" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("company_id") REFERENCES "companies" ("id")
);
CREATE TABLE IF NOT EXISTS "shares" (
	"id" INTEGER NOT NULL UNIQUE,
	"shares_number" INTEGER,
	"price_share" NUMERIC,
	"comission" NUMERIC,
	"type" TEXT,
	"date" TEXT,
	"exchange_rate" NUMERIC,
	"company_id" INTEGER NOT NULL,
	"notes" TEXT,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("company_id") REFERENCES "companies" ("id")
);