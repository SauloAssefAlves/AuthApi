import { prisma } from "../utils/prisma";
import { Request, Response } from "express";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class AuthController {
  async autenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "User not found" });
    }

    const isValuePassword = await compare(password, user.password);

    if (!isValuePassword) {
      return res.json({ error: "Password invalid" });
    }

    //Criar um ENV para a chave do token secret MD5
    const token = sign({ id: user.id }, "secret", { expiresIn: "1d" });

    const { id, name } = user;

    return res.json({ user: { id, email, name }, token });
  }
}
