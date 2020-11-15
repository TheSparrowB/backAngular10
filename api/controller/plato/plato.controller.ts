import { Request, Response } from "express";
import { PlatoDA } from "../../dataaccess/plato/plato.da";
import { PLATO } from "../../models";
import { RESPONSE } from "../../models/class/response";
import { TYPEHTMLCODE, TYPERESPONSECODE } from "../../models/enum/enum.commons";

export class PlatoController{

    async listarPlato(req: Request, res: Response){
        let nidCategoria = req.params.nidCategoria ? req.params.nidCategoria : '0';      

        const resp = await new PlatoDA().listarPlato(parseInt(nidCategoria));

        return res.status(TYPEHTMLCODE.ProcessOk).json(
            new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
        );
    }


    async obtenerPlato(req: Request, res: Response){
        let nidPlato = req.params.nidPlato;      

        const resp: PLATO = await new PlatoDA().obtenerPlato(parseInt(nidPlato));

        //LISTAMOS SUS INGREDIENTES
        if(resp){
            resp.listaIngrediente = await new PlatoDA().listarPlatoInsumo(resp.nid_plato);
        }

        return res.status(TYPEHTMLCODE.ProcessOk).json(
            new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
        );
    }


    async insertarPlato(req: Request, res: Response){
        let plato: PLATO = req.body;      

        const resp = await new PlatoDA().insertarPlato(plato);
        console.log(resp);

        //SI ES QUE EL REGISTRO FUE EXITOSO
        if(resp.nid_resultado == 1){

            //PROCEDEMOS REGISTRANDO LOS INGREDIENTES
            plato.listaIngrediente = plato.listaIngrediente ? plato.listaIngrediente : [];
            for(let ingrediente of plato.listaIngrediente){
                ingrediente.nid_plato = resp.nid_plato;
                const resIng = await new PlatoDA().insertarPlatoInsumo(ingrediente);
            }

            return res.status(TYPEHTMLCODE.ProcessOk).json(
                new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
            );
        }

        return res.status(TYPEHTMLCODE.InternalServerError).json(
            new RESPONSE(TYPERESPONSECODE.ConError, null, "Ha ocurrido un error con el registro de este nuevo plato.")
        );
    }


    async editarPlato(req: Request, res: Response){
        let plato: PLATO = req.body;      

        const resp = await new PlatoDA().editarPlato(plato);

        //SI ES QUE LA TRANSACCION FUE EXITOSA
        if(resp.nid_resultado == 1){
            return res.status(TYPEHTMLCODE.ProcessOk).json(
                new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
            );
        }

        return res.status(TYPEHTMLCODE.InternalServerError).json(
            new RESPONSE(TYPERESPONSECODE.ConError, null, "Ha ocurrido un error con el registro de este nuevo plato.")
        );
    }



    async eliminarPlato(req: Request, res: Response){
        let plato: PLATO = req.body;      

        const resp = await new PlatoDA().eliminarPlato(plato);

        //SI ES QUE LA TRANSACCION FUE EXITOSA
        if(resp.nid_resultado == 1){
            return res.status(TYPEHTMLCODE.ProcessOk).json(
                new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
            );
        }

        return res.status(TYPEHTMLCODE.InternalServerError).json(
            new RESPONSE(TYPERESPONSECODE.ConError, null, "Ha ocurrido un error con el registro de este nuevo plato.")
        );
    }

}