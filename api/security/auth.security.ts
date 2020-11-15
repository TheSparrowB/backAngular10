import { NextFunction, Request, Response } from "express";
import { decodeToken } from "../../services/tokens";
import { TYPEHTMLCODE } from '../models/enum/enum.commons';

const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
	if (req.headers["authorization"]) {
        const header = req.headers["authorization"].toString();
        const nombreToken = header.split(" ")[0];
        if (nombreToken !== process.env.WORD_TOKEN) {
            return res.status(TYPEHTMLCODE.Unauthorized).json({
                status: TYPEHTMLCODE.Unauthorized,
                message: "El token no es válido."
            })
        }

		const accessToken = header.split(" ")[1];
		decodeToken(accessToken)
			.then((data: any) => {
				res.locals.nidUsuario = data.nidUsuario;
                res.locals.dni = data.dni;
                res.locals.apellidoPaterno = data.apellidoPaterno;
                res.locals.apellidoMaterno = data.apellidoMaterno;
                res.locals.nombres = data.nombres;
                res.locals.email = data.email;
                res.locals.nidPersonal = data.nidPersonal;
                res.locals.nidControlAccesoWeb = data.nidControlAccesoWeb;
                res.locals.codigoZonal = data.codigoZonal;
                res.locals.nombreZonal = data.nombreZonal;

                return next();
			}).catch(error => {
                if (error.message.toLowerCase() === "token expired") {
                    return res.status(TYPEHTMLCODE.Unauthorized).json({
                        status: TYPEHTMLCODE.Unauthorized,
                        message: "El token ha expirado."
                    })
                } else {
                    return res.status(TYPEHTMLCODE.Unauthorized).json({
                        status: TYPEHTMLCODE.Unauthorized,
                        message: "El token es inválido."
                    })
                }

            })
	} else {
		return res.status(TYPEHTMLCODE.Unauthorized).json({
			status: TYPEHTMLCODE.Unauthorized,
			message: "El usuario no está autenticado."
		})
	}
}

const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
	if (!res.locals.nidControlAccesoWeb || res.locals.nidControlAccesoWeb == 0 ) {
		return res.status(TYPEHTMLCODE.Unauthorized).json({
			status: TYPEHTMLCODE.Unauthorized,
			message: "Usuario no autorizado (ID de acceso no válido)"
		})
	}
	return next();
}

export { checkAuthentication, checkAuthorization };
