const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const Jdenticon = require("jdenticon");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
class UserController {
  async RegisterUser(req, res) {
    const { name, password, email } = req.body;

    if (!name || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const png = Jdenticon.toPng(name, 200);
      const avatarName = `${name}_${Date.now()}.png`;
      const avatarPath = path.join(__dirname, "../uploads", avatarName);
      fs.writeFileSync(avatarPath, png);

      const user = await prisma.user.create({
        data: {
          username: name,
          passwordHash: hashedPassword,
          avatarUrl: `/static/${avatarPath}`, // поправил здесь, чтобы путь был относительный и правильный
          email: email,
        },
      });

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async LoginUser(req, res) {
    res.send("Login User");
  }
  async currentUser(req, res) {
    res.send("Current User");
  }
  async getUserId(req, res) {
    res.send("Get User by ID");
  }
  async updateUser(req, res) {
    res.send("Update User");
  }
}

module.exports = UserController;
