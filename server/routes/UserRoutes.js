const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/useControllers.js");
const AuthenticateToken = require("../Middleware/Auth.js");

const userController = new UserController();

const uploadsDestination = "./uploads/";

const storage = multer.diskStorage({
  destination: uploadsDestination,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.post("/register", userController.RegisterUser);
router.post("/login", userController.LoginUser);
router.get("/current", AuthenticateToken, userController.currentUser);
router.get("/user/:id", AuthenticateToken, userController.getUserId);
router.put("/user/:id", AuthenticateToken, userController.updateUser);

module.exports = router;
