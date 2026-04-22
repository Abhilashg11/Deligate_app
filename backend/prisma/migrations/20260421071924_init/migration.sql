-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetencyType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "CompetencyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffCompetency" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "competencyTypeId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffCompetency_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffCompetency" ADD CONSTRAINT "StaffCompetency_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffCompetency" ADD CONSTRAINT "StaffCompetency_competencyTypeId_fkey" FOREIGN KEY ("competencyTypeId") REFERENCES "CompetencyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
