-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "model_name" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Car_model_name_key" ON "Car"("model_name");
