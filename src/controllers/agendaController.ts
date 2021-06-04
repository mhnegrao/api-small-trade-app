import { Prisma,PrismaClient } from "@prisma/client";
import express from "express";
//@ts-ignore
import { ITask } from "src/services/interfaces";


const prisma = new PrismaClient();
class AgendaController {
  async index(rreq: express.Request, res: express.Response) {
    console.log("Exibe todos agendas");
    res.send({ message: "Exibe todos agendas" });
  }
  async show(req: express.Request, res: express.Response) {
    console.log("Exibe un agenda");
    res.send({ message: "Exibe um agenda" });
  }
  async store(req: express.Request<string,ITask>, res: express.Response) {

    const { id,
      idUser,
      titulo,
      descricaong,
      dataTarefa,
      prioridade,
      completed,
      completed_At,
      created_At,} = req.body

     
    
      // const result = await prisma.user.create({
      //   data: {
      //     name,
      //     email,
          
      //   },
      // })
    //   res.json(result)

    console.log("Agenda Cadastrado");
    res.send({ message: "Agenda Cadastrada" });
  }
  async update(rreq: express.Request, res: express.Response) {
    console.log("Agenda Atualizado");
    res.send({ message: "Agenda Atualizado" });
  }
  async delete(req: express.Request, res: express.Response) {
    console.log("Agenda excluído");
    res.send({ message: "Usuário excluido" });
  }
}
module.exports = new AgendaController();
