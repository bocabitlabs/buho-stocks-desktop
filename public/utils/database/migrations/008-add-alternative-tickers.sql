-- Up
ALTER TABLE companies ADD COLUMN alternativeTickers TEXT;
-- Down
SELECT * FROM companies;