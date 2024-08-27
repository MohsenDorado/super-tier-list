-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "person" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "withdrawled" BOOLEAN DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
