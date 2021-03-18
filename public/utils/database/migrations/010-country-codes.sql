-- Up
ALTER TABLE companies ADD COLUMN countryCode TEXT;
ALTER TABLE portfolios ADD COLUMN countryCode TEXT;
-- Down
SELECT * FROM companies;