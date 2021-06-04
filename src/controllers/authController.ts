import { prisma } from "@prisma/client";
import express from "express";
import { IUser } from "../services/interfaces";

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const userModel = require("../controllers/usuarioController");
const mailConfig = require("../config/mail");
const logger = require("../services/logger");

class AuthController {
  async login(req: express.Request<IUser>, res: express.Response) {
    const { email, password } = req.body;
    //@ts-ignore
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const correctLogin = await bcrypt.compare(password, user.password);

    if (!correctLogin) {
      return res.status(401).json({ error: "E-mail ou senha incorretos" });
    }

    const { _id: id } = user;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ token });
  }

  async changePassword(req: express.Request<IUser>, res: express.Response) {
    const { email, password, newPassword } = req.body;
    //@ts-ignore
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Houve um problema para trocar a senha" });
    }

    const correctLogin = await bcrypt.compare(password, user.password);

    if (!correctLogin) {
      return res
        .status(401)
        .json({ error: "Houve um problema para trocar a senha" });
    }

    const hashPass = await bcrypt.hash(newPassword, 10);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, { password: hashPass });

    return res.status(201).json({ msg: "Senha foi atualizada com sucesso!" });
  }

  async createResetToken(req: express.Request<IUser>, res: express.Response) {
    const { email } = req.body;

    //@ts-ignore
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Houve um problema para resetar a senha!" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15); // getters and setters

    const tokenExpires = String(now);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, { token, tokenExpires });

    await mailConfig.sendMail({
      to: email,
      from: "no-reply@smalltrade.com",
      subject: "Token para resetar senha",
      template: "resetLink",
      text: `Token: ${token}`,
      context: {
        user: user.name,
        token,
        message: "Token expira em 15 minutos",
      },
    });

    // enviar e-mail com o link gerado

    return res.status(201).json({ msg: "E-mail enviado com sucesso!" });
  }

  async resetPassword(req: express.Request<IUser>, res: express.Response) {
    const { email, token, newPassword } = req.body;

    //@ts-ignore
    const user = await prisma.user.findUnique({ where: { email: email } });
    // const user = await userModel
    //   .findOne({ email })
    //   .select("tokenExpires password token");

    if (!user) {
      return res
        .status(401)
        .json({ error: "Houve um problema para resetar a senha!" });
    }

    const now = new Date();

    if (now > user.tokenExpires) {
      return res.status(401).json({ error: "Token expirado!" });
    }

    if (token !== user.token) {
      return res.status(401).json({ error: "Token errado!" });
    }

    const hashPass = await bcrypt.hash(newPassword, 10);

    const { _id: id } = user;

    await userModel.findByIdAndUpdate(id, {
      password: hashPass,
      token: "",
      tokenExpires: "",
    });

    return res.status(201).json({ msg: "Senha resetada com sucesso!" });

    // enviar e-mail para o usuário dizendo que sua senha foi trocada com sucesso!
  }
}

module.exports = new AuthController();
