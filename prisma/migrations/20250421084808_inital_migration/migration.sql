-- CreateTable
CREATE TABLE "oma_User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "oma_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oma_UserContact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,

    CONSTRAINT "oma_UserContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oma_Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,

    CONSTRAINT "oma_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oma_Message" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "fromUserId" VARCHAR(255) NOT NULL,
    "toUserId" VARCHAR(255) NOT NULL,

    CONSTRAINT "oma_Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oma_User_username_key" ON "oma_User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "oma_UserContact_userId_contactId_key" ON "oma_UserContact"("userId", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "oma_Image_userId_key" ON "oma_Image"("userId");

-- AddForeignKey
ALTER TABLE "oma_UserContact" ADD CONSTRAINT "oma_UserContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "oma_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oma_UserContact" ADD CONSTRAINT "oma_UserContact_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "oma_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oma_Image" ADD CONSTRAINT "oma_Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "oma_User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oma_Message" ADD CONSTRAINT "oma_Message_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "oma_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oma_Message" ADD CONSTRAINT "oma_Message_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "oma_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
