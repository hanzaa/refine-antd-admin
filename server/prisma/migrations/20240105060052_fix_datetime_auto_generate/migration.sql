-- AlterTable
ALTER TABLE "account" ALTER COLUMN "date_created" SET DEFAULT TO_CHAR(NOW() :: DATE, 'YYYY-MM-DD'),
ALTER COLUMN "date_created" SET DATA TYPE TEXT,
ALTER COLUMN "time_created" SET DEFAULT TO_CHAR(NOW() :: TIME, 'HH24:MI:SS'),
ALTER COLUMN "time_created" SET DATA TYPE TEXT;
