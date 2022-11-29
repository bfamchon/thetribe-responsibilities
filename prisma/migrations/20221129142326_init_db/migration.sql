-- CreateTable
CREATE TABLE "Responsibility" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "referentId" TEXT NOT NULL,
    "lastAffectDate" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Responsibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Responsibility" ADD CONSTRAINT "Responsibility_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsibility" ADD CONSTRAINT "Responsibility_referentId_fkey" FOREIGN KEY ("referentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
