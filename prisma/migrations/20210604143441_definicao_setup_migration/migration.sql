/*
  Warnings:

  - You are about to drop the column `email` on the `Agenda` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Agenda` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Agenda` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Lancamento` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Lancamento` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Lancamento` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Mensalidade` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Mensalidade` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Mensalidade` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Servico` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Servico` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Agenda` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `descricao` to the `Agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataLancamento` to the `Lancamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Lancamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observacao` to the `Lancamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPlancamento` to the `Lancamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Lancamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataVencimento` to the `Mensalidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoServico` to the `Mensalidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorParcela` to the `Mensalidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataPrevista` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataSolicitacao` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servico` to the `Servico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Agenda.email_unique";

-- DropIndex
DROP INDEX "Lancamento.email_unique";

-- DropIndex
DROP INDEX "Mensalidade.email_unique";

-- DropIndex
DROP INDEX "Servico.email_unique";

-- AlterTable
ALTER TABLE "Agenda" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "completed_At" TIMESTAMP(3),
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataTarefa" TIMESTAMP(3),
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "prioridade" TEXT,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "updated_At" TIMESTAMP(3),
ALTER COLUMN "id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Lancamento" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataLancamento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "observacao" TEXT NOT NULL,
ADD COLUMN     "tipoPlancamento" TEXT NOT NULL,
ADD COLUMN     "updated_At" TIMESTAMP(3),
ADD COLUMN     "valor" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Mensalidade" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataVencimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tipoServico" TEXT NOT NULL,
ADD COLUMN     "updated_At" TIMESTAMP(3),
ADD COLUMN     "valorParcela" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "cliente" TEXT NOT NULL,
ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataPagamento" TIMESTAMP(3),
ADD COLUMN     "dataPrevista" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dataSolicitacao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "finalizado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fone" TEXT,
ADD COLUMN     "observacao" TEXT,
ADD COLUMN     "pago" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "servico" TEXT NOT NULL,
ADD COLUMN     "tipoPagamento" TEXT,
ADD COLUMN     "update_At" TIMESTAMP(3),
ADD COLUMN     "valor" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "update_At" TIMESTAMP(3),
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Agenda.id_unique" ON "Agenda"("id");

-- AddForeignKey
ALTER TABLE "Servico" ADD FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mensalidade" ADD FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
