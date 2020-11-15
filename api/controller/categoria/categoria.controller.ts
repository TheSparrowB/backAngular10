import { Request, Response } from "express";
import { CategoriaDA } from "../../dataaccess/categoria/categoria.da";
import { RESPONSE } from "../../models/class/response";
import { TYPEHTMLCODE, TYPERESPONSECODE } from "../../models/enum/enum.commons";

export class CategoriaController{
    
    async listarCategoria(req: Request, res: Response){
        const resp = await new CategoriaDA().listarCategoria();

        return res.status(TYPEHTMLCODE.ProcessOk).json(
            new RESPONSE(TYPERESPONSECODE.SinError, resp, "Ok")
        );
    }

}