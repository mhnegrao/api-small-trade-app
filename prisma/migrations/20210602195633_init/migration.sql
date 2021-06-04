-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" UUID NOT NULL,
    "idUser" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Lancamento" (
    "id" UUID NOT NULL,
    "idUser" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Agenda" (
    "id" UUID NOT NULL,
    "idUser" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "Mensalidade" (
    "id" UUID NOT NULL,
    "idUser" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Servico.email_unique" ON "Servico"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lancamento.email_unique" ON "Lancamento"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agenda.email_unique" ON "Agenda"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mensalidade.email_unique" ON "Mensalidade"("email");
