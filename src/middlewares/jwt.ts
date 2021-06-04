import express from "express";

import jwt from "jsonwebtoken";
import { IUser } from "../services/interfaces";
import { promisify } from "util";
//const logger = require('../services/logger');

const jwtVerify = async (
  req: express.Request,
  res: express.Response,
  next: () => any
) => {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    return res.status(401).json({ error: "Token JWT não foi enviado" });
  }

  const parts = authHeader.split(" ");

  //@ts-ignore
  if (!parts.length === 2) {
    return res
      .status(401)
      .json({ error: "Valor enviado não está com 2 partes" });
  }

  const [scheme, token] = parts;
  //@ts-ignore
  if (!scheme === "Bearer") {
    return res.status(401).json({ error: "Primeira parte inválida" });
  }

  try {
    const tokenDecoded = await promisify(jwt.verify)(
      token,
      //@ts-ignore
      process.env.JWT_SECRET
    );

    //@ts-ignore
    req.userId = tokenDecoded.id;

    return next();
  } catch (e) {
    //logger.error(e);
    return res.status(401).json({ error: "Token JWT inválido" });
  }
};

module.exports = jwtVerify;
