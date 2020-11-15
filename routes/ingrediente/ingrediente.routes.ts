import express = require("express");
import { errorsHandler } from "../../handlers/errors.handler";
import { IngredienteController } from "../../api/controller/ingrediente/ingrediente.controller";

const router = express.Router();
const controller = new IngredienteController();

router.get("/buscar/", errorsHandler.catchError(controller.buscarIngrediente));
router.get("/buscar/:txtIngrediente", errorsHandler.catchError(controller.buscarIngrediente));

export { router }