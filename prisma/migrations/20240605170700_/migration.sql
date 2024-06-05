/*
  Warnings:

  - The values [Componenet] on the enum `TaskType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskType_new" AS ENUM ('UIDesign', 'CodeRefactor', 'Animation', 'PageLayout', 'Styling', 'Component', 'APIRoute', 'DatabaseManagement', 'Testing', 'Deployment');
ALTER TABLE "Task" ALTER COLUMN "type" TYPE "TaskType_new" USING ("type"::text::"TaskType_new");
ALTER TYPE "TaskType" RENAME TO "TaskType_old";
ALTER TYPE "TaskType_new" RENAME TO "TaskType";
DROP TYPE "TaskType_old";
COMMIT;
