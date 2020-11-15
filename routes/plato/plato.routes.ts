import express = require("express");
import { errorsHandler } from "../../handlers/errors.handler";
import { PlatoController } from "../../api/controller/plato/plato.controller";

const router = express.Router();
const controller = new PlatoController();

router.get("/listar", errorsHandler.catchError(controller.listarPlato));
router.get("/listar/:nidCategoria", errorsHandler.catchError(controller.listarPlato));
router.get("/obtener/:nidPlato", errorsHandler.catchError(controller.obtenerPlato));

router.post("/insertar", errorsHandler.catchError(controller.insertarPlato));
router.post("/editar", errorsHandler.catchError(controller.editarPlato));
router.post("/eliminar", errorsHandler.catchError(controller.eliminarPlato));

export { router }