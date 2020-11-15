import { INGREDIENTE } from "../../models/ingrediente.model";
import { Procedimientos } from "../helpers/procedimientos";
let connections = require('../../../services/database');

export class IngredienteDA{
    

    async buscarIngrediente(txtIngrediente: string){

        let sql = `SET @txtIngrediente=?; CALL ${Procedimientos.INGREDIENTE_LISTAR}(@txtIngrediente);`;
        let cnn = await connections.connection();

        let res = await cnn.query(sql, [txtIngrediente]);
        let resultado: INGREDIENTE[] = [];
        
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