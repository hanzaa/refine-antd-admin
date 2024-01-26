/*
  Warnings:

  - The `time_created` column on the `account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `date_created` on table `account` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "account" ALTER COLUMN "date_created" SET NOT NULL,
ALTER COLUMN "date_created" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date_created" SET DATA TYPE TIMESTAMP(3),
DROP COLUMN "time_created",
ADD COLUMN     "time_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
