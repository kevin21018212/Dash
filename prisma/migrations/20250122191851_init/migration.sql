/*
  Warnings:

  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "State" AS ENUM ('BACKLOG', 'IN_PROGRESS', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_project_id_fkey";

-- DropForeignKey
ALTER TABLE "Feature" DROP CONSTRAINT "Feature_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_feature_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_user_id_fkey";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "TaskSize";

-- DropEnum
DROP TYPE "TaskStatus";

-- DropEnum
DROP TYPE "TaskType";

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "tags" VARCHAR(250)[],
    "state" "State" NOT NULL,
    "image" TEXT,
    "completionPercentage" INTEGER,
    "reviewScore" INTEGER,
    "timesCompleted" INTEGER,
    "isOneHundredPct" BOOLEAN,
    "isCasual" BOOLEAN,
    "platform" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "tags" VARCHAR(250)[],
    "state" "State" NOT NULL,
    "image" TEXT,
    "completionPercentage" INTEGER,
    "reviewScore" INTEGER,
    "timesCompleted" INTEGER,
    "watchOn" TEXT,
    "runtimeMinutes" INTEGER,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TV" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "tags" VARCHAR(250)[],
    "state" "State" NOT NULL,
    "image" TEXT,
    "completionPercentage" INTEGER,
    "reviewScore" INTEGER,
    "timesCompleted" INTEGER,
    "watchOn" TEXT,
    "seasons" INTEGER,

    CONSTRAINT "TV_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "tags" VARCHAR(250)[],
    "state" "State" NOT NULL,
    "image" TEXT,
    "completionPercentage" INTEGER,
    "reviewScore" INTEGER,
    "timesCompleted" INTEGER,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Music" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "genre" TEXT,
    "tags" VARCHAR(250)[],
    "state" "State" NOT NULL,
    "image" TEXT,
    "completionPercentage" INTEGER,
    "reviewScore" INTEGER,
    "timesCompleted" INTEGER,

    CONSTRAINT "Music_pkey" PRIMARY KEY ("id")
);
