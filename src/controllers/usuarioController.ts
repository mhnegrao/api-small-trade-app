import express, { Request, RequestHandler, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { IUser } from "../services/interfaces";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
class UsuarioController {
  async index(rreq: express.Request, res: express.Response) {
    const users = await prisma.user.findMany();

    res.status(200).json({ data: users });
  }
  async show(req: express.Request<IUser>, res: express.Response) {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    try {
      if (!user) {
        return res
          .status(400)
          .json({ error: `ID ${req.params.id} não existe na base de dados` });
      }
      res.status(200).json(user);
    } catch (erro) {
      res.status(400).json({ error: "Houve um erro ao tentar exibir usuário" });
    }
  }

  async store(req: Request<IUser>, res: Response) {
    const userToSave = req.body;
    const hashPass = await bcrypt.hash(userToSave.password, 10);
    const hasToken = (userToSave.password = hashPass);
    try {
      const result = await prisma.user.create({ data: { ...userToSave } });
      res.status(201).json({ message: result });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Houve um erro ao tentar criar o usuário" });
    }
  }

  async update(req: express.Request<IUser>, res: express.Response) {
    const id = req.body.id;
    try {
      const userData = await prisma.user.findUnique({
        where: { id: id },
      });
      req.body.updated_At = new Date();
      const userUpdate = await prisma.user.update({
        where: { id: id },
        data: { ...req.body },
      });

      res.status(200).json(userUpdate);
    } catch (error) {
      res
        .status(400)
        .json({ error: `ID ${req.params.id} não existe na base de dados` });
    }
  }
  async delete(req: express.Request, res: express.Response) {
    try {
      const { id } = req.params;
      const userData = await prisma.user.findUnique({
        where: { id: req.params.id },
      });
      if (!userData) {
        return res
          .status(400)
          .json({ error: `ID ${req.params.id} não existe na base de dados` });
      }
      const post = await prisma.user.delete({
        where: { id: id },
      });
      res.status(200).json("Usuário deletado com sucesso");
    } catch (error) {}
  }
}

module.exports = new UsuarioController();
