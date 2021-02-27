-- Up
CREATE TABLE IF NOT EXISTS "transactionsLog" (
	"id" INTEGER NOT NULL UNIQUE,
  "type" TEXT NOT NULL,
	"message" TEXT NOT NULL,
	"creationDate" TEXT,
	"lastUpdateDate" TEXT,
  "portfolioId" INTEGER NOT NULL,
	PRIMARY KEY ("id" AUTOINCREMENT),
	FOREIGN KEY ("portfolioId") REFERENCES "portfolios" ("id") ON DELETE CASCADE
);
-- Down
DROP TABLE transactionsLog;