import express from "express";

export  class LoginController{
    index = (rreq: express.Request, res: express.Response) => {
        console.log("Exibe todos usuarios");
        res.send({ message: "Exibe todos usuarios" });
      };
      show = (req: express.Request, res: express.Response) => {
        console.log("Exibe un usuario");
        res.send({ message: "Exibe um usuario" });
      };
      store = (req: express.Request, res: express.Response) => {
        console.log("usuário Cadastrado");
        res.send({ message: "Usuário Cadstrado" });
      };
      update = (rreq: express.Request, res: express.Response) => {
        console.log("Usuário Atualizado");
        res.send({ message: "Usuário Atualizado" });
      };
      delete = (req: express.Request, res: express.Response) => {
        console.log("Usuário excluído");
        res.send({ message: "Usuário excluido" });
      };
}