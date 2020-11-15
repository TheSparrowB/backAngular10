import { CATEGORIA } from "../../models/categoria.model";
import { Procedimientos } from "../helpers/procedimientos";
let connections = require('../../../services/database');

export class CategoriaDA{
    
    async listarCategoria(){

        let sql = `CALL ${Procedimientos.CATEGORIA_LISTAR}();`;
        let cnn = await connections.connection();

        let res = await cnn.query(sql);
        let resultado: CATEGORIA[] = [];
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado;
    }

}