const express = require("express");
const userController = require("../controllers/user");

const Router = express.Router();
Router.post("/api/register", userController.register );
Router.post("/api/login", userController.login );
module.exports = Router;
