-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(64),
    "email" VARCHAR(64),
    "password" TEXT,
    "role" VARCHAR(16),
    "date_created" DATE DEFAULT CURRENT_DATE,
    "time_created" TIME(6) DEFAULT CURRENT_TIME,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");

