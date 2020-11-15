import express = require("express");
import { errorsHandler } from "../../handlers/errors.handler";
import { CategoriaController } from "../../api/controller/categoria/categoria.controller";

const router = express.Router();
const controller = new CategoriaController();

router.get("/listar", errorsHandler.catchError(controller.listarCategoria));

export { router }