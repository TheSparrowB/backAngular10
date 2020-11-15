import { Application, Request, Response } from "express";
import express = require("express");
import http = require("http");
import bodyParser = require("body-parser");
import configMorgan = require("../config/morgan");
import { logger } from "../utils/log";
import { errorsHandler } from "../handlers/errors.handler";
import compression = require("compression");
import helmet = require("helmet");
import cors = require("cors");

let httpServer: http.Server;

import { router as PlatoRoutes } from "../routes/plato/plato.routes";
import { router as IngredienteRoutes } from "../routes/ingrediente/ingrediente.routes";
import { router as CategoriaRoutes } from "../routes/categoria/categoria.routes";

import { TYPERESPONSECODE } from "../api/models/enum/enum.commons";
import { RESPONSE } from "../api/models/class/response";

const initialize = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const app: Application = express();
    httpServer = http.createServer(app);

    app.use(compression());
    app.use(helmet());

    const corsOptions = {
      origin: function (origin, callback) {
        const domainsAllowed = process.env.DOMAINS_ALLOWED.split(",");

        if (domainsAllowed.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    };

    if (process.env.DOMAINS_ALLOWED != "*") app.use(cors(corsOptions));
    else app.use(cors());

    configMorgan.middlewares(app);
    app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
    app.use(bodyParser.json());

    app.get("/", (req: Request, res: Response) => {
      res.end("SI LEES ESTO, ERES BIEN JOTO Y TE LA COMES DOBLADA :V");
    });

    
    //ROUTES*************************************************************
    app.use("/plato", PlatoRoutes);
    app.use("/ingrediente", IngredienteRoutes);
    app.use("/categoria", CategoriaRoutes);


    app.use(function (req, res, next) {
      res
        .status(404)
        .json(
          new RESPONSE(
            TYPERESPONSECODE.ConError,
            null,
            "Esta ruta no existe."
          )
        );
    });

    app.use(errorsHandler.notFound);
    app.use(errorsHandler.general);

    httpServer
      .listen(process.env.PORT)
      .on("listening", () => {
        logger.info(`Web server listening on localhost:${process.env.PORT}`);
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const close = () => {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
};

export { initialize, close };
