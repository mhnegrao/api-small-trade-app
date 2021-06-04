import express, { Request, RequestHandler, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { ITask } from "../services/interfaces";

const prisma = new PrismaClient();

class AgendaController {
  async index(req: Request, res: Response) {
    const users = await prisma.agenda.findMany();

    res.status(200).json({ data: users });
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const task = await prisma.agenda.findUnique({
      where: { id: id },
    });
    try {
      if (!task) {
        return res
          .status(400)
          .json({ error: `ID ${req.params.id} não existe na base de dados` });
      }
      res.status(200).json(task);
    } catch (erro) {
      res
        .status(400)
        .json({ error: "Houve um erro ao tentar exibir compromisso" });
    }
  }

  async store(req: Request<ITask>, res: Response) {
    const taskToSave = req.body;

    try {
      const result = await prisma.agenda.create({ data: { ...taskToSave } });
      res.status(201).json({ message: result });
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ error: "Houve um erro ao tentar criar compromisso" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const taskData = await prisma.agenda.findUnique({
        where: { id: id },
      });
      req.body.updated_At = new Date();

      const taskUpdate = await prisma.agenda.update({
        where: { id: id },
        data: { ...req.body },
      });

      res.status(200).json(taskUpdate);
    } catch (error) {
      res
        .status(400)
        .json({ error: `ID ${req.params.id} não existe na base de dados` });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const taskData = await prisma.agenda.findUnique({
        where: { id: id },
      });
      console.log(id);
      if (!taskData) {
        return res
          .status(400)
          .json({ error: `ID ${req.params.id} não existe na base de dados` });
      }
      await prisma.agenda.delete({ where: { id: id } });
      res.status(200).json("Compromisso deletado com sucesso");
    } catch (error) {
      res.status(400).json({ error: `Houve um erro ao excluir compromisso` });
    }
  }
}

module.exports = new AgendaController();
