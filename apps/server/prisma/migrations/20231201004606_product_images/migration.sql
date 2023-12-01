/*
  Warnings:

  - Added the required column `imageId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "imageId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
