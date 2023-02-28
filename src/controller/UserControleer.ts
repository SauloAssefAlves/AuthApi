import { prisma } from "../utils/prisma";
import { Request, Response } from "express";
import { hash } from "bcryptjs";

export class UserController {
  async delete(req: Request, res: Response) {
    const { email } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (!userExists) {
      return res.json({ error: "User not found" });
    }

    await prisma.user.delete({ where: { email } });
    return res.json({ response: `User ${email} deleted` });
  }

  async index(req: Request, res: Response) {
    const users = await prisma.user.findMany();
    return res.json({ users });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.json({ error: "User exists" });
    }
    const hash_password = await hash(password, 8);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      },
    });

    return res.json({ user });
  }
}
