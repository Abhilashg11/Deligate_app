/*
  Warnings:

  - A unique constraint covering the columns `[name,role]` on the table `CompetencyType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[staffId,competencyTypeId]` on the table `StaffCompetency` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompetencyType_name_role_key" ON "CompetencyType"("name", "role");

-- CreateIndex
CREATE UNIQUE INDEX "StaffCompetency_staffId_competencyTypeId_key" ON "StaffCompetency"("staffId", "competencyTypeId");
