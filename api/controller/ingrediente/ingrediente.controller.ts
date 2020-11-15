import { Request, Response } from "express";
import { IngredienteDA } from "../../dataaccess/ingrediente/ingrediente.da";
import { RESPONSE } from "../../models/class/response";
import { TYPEHTMLCODE, TYPERESPONSECODE } from "../../models/enum/enum.commons";

export class IngredienteController{
    

    async buscarIngrediente(req: Request, res: Response){

        let txtIngrediente = req.params.txtIngrediente ? req.params.txtIngrediente : '';      

        const resp = await new IngredienteDA().buscarIngrediente(txtIngrediente);

        return res.status(TYPEHTMLCODE.ProcessOk).json(
            new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
        );
    }
    
    
}