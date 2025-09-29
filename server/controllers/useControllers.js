const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();
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

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async LoginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      res.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
        token: token,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async getUserId(req, res) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
          reviews: {
            include: {
              book: {
                include: {
                  author: true,
                  categories: true,
                },
              },
            },
          },
          favorites: {
            include: {
              book: {
                include: {
                  author: true,
                  categories: true,
                  _count: {
                    select: { reviews: true, favorites: true },
                  },
                },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      const response = {
        id: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt,
        reviews: user.reviews,
        favoriteBooks: user.favorites.map((fav) => fav.book), // извлекаем книги из favorites
      };

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    let filePath;

    if (req.file && req.file.path) {
      filePath = req.file.path;
    }

    if (id != req.user.id) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    try {
      if (email) {
        const existingUser = await prisma.user.findFirst({
          where: { email: email },
        });

        if (existingUser && existingUser.id != id) {
          return res
            .status(400)
            .json({ message: "Пользователь с таким email уже существует" });
        }
      }

      const updatedData = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          username: name,
          email: email,
          avatarUrl: filePath ? `/static/${filePath}` : undefined,
        },
      });

      res.json(updatedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async currentUser(req, res) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        include: {
          reviews: {
            include: {
              book: {
                include: {
                  author: true,
                  categories: true,
                },
              },
            },
          },
          favorites: {
            include: {
              book: {
                include: {
                  author: true,
                  categories: true,
                  _count: {
                    select: { reviews: true, favorites: true },
                  },
                },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }

  async test(req, res) {
    res.send("Ok");
  }
}

module.exports = UserController;
