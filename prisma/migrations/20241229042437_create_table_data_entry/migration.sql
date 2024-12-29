-- CreateTable
CREATE TABLE "DataEntry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "jsonContent" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataEntry_pkey" PRIMARY KEY ("id")
);
