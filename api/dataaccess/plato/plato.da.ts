import { PLATO_INSUMO } from "../../models";
import { PLATO } from "../../models/plato.model";
import { Procedimientos } from "../helpers/procedimientos";
let connections = require('../../../services/database');

export class PlatoDA{
    
    async listarPlato(nidCategoria: number){
        let sql = `SET @nidCategoria=?; CALL ${Procedimientos.PLATO_LISTAR}(@nidCategoria);`;
        let cnn = await connections.connection();

        let res = await cnn.query(sql, [nidCategoria]);
        let resultado: PLATO[] = [];
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado;
    }



    async obtenerPlato(nidPlato: number){
        let sql = `SET @nidPlato=?; CALL ${Procedimientos.PLATO_OBTENER}(@nidPlato);`;
        let cnn = await connections.connection();

        let res = await cnn.query(sql, [nidPlato]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }




    async insertarPlato(plato: PLATO){
        let sql = `SET @txtPlato=?; SET @numRating=?; SET @nidCategoria=?; SET @impPrecio=?; SET @numPicor=?; SET @numStock=?; SET @txtImagen=?;
        CALL ${Procedimientos.PLATO_INSERTAR}(@txtPlato, @numRating, @nidCategoria, @impPrecio, @numPicor, @numStock, @txtImagen);`;

        let cnn = await connections.connection();

        let res = await cnn.query(sql, [plato.txt_plato, plato.num_rating, plato.nid_categoria, plato.imp_precio, plato.num_picor, plato.num_stock, plato.txt_imagen]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }



    async editarPlato(plato: PLATO){
        let sql = `SET @nidPlato=?; SET @txtPlato=?; SET @numRating=?; SET @nidCategoria=?; SET @impPrecio=?; SET @numPicor=?; SET @numStock=?; SET @txtImagen=?;
        CALL ${Procedimientos.PLATO_EDITAR}(@nidPlato, @txtPlato, @numRating, @nidCategoria, @impPrecio, @numPicor, @numStock, @txtImagen);`;

        let cnn = await connections.connection();

        let res = await cnn.query(sql, [plato.nid_plato, plato.txt_plato, plato.num_rating, plato.nid_categoria, plato.imp_precio, plato.num_picor, plato.num_stock, plato.txt_imagen]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }


    async eliminarPlato(plato: PLATO){
        let sql = `SET @nidPlato=?; CALL ${Procedimientos.PLATO_ELIMINAR}(@nidPlato);`;

        let cnn = await connections.connection();

        let res = await cnn.query(sql, [plato.nid_plato]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }



    async listarPlatoInsumo(nidPlato: number){
        let sql = `SET @nidPlato=?; CALL ${Procedimientos.PLATO_INSUMO_LISTAR}(@nidPlato);`;
        let cnn = await connections.connection();

        let res = await cnn.query(sql, [nidPlato]);
        let resultado: PLATO_INSUMO[] = [];
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado;
    }



    async insertarPlatoInsumo(plato: PLATO_INSUMO){
        let sql = `SET @nidPlato=?; SET @nidIngrediente=?; SET @numCantidad=?; SET @txtNota=?; 
        CALL ${Procedimientos.PLATO_INSUMO_INSERTAR}(@nidPlato, @nidIngrediente, @numCantidad, @txtNota);`;

        let cnn = await connections.connection();

        let res = await cnn.query(sql, [plato.nid_plato, plato.nid_ingrediente, plato.num_cantidad, plato.txt_nota]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }



    async editarPlatoInsumo(plato: PLATO_INSUMO){
        let sql = `SET @nidPlato=?; SET @nidIngrediente=?; SET @numCantidad=?; SET @txtNota=?; 
        CALL ${Procedimientos.PLATO_INSUMO_EDITAR}(@nidPlato, @nidIngrediente, @numCantidad, @txtNota);`;

        let cnn = await connections.connection();

        let res = await cnn.query(sql, [plato.nid_plato, plato.nid_ingrediente, plato.num_cantidad, plato.txt_nota]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }



    async eliminarPlatoInsumo(plato: PLATO_INSUMO){
        let sql = `SET @nidPlato=?; SET @nidIngrediente=?;
        CALL ${Procedimientos.PLATO_INSUMO_ELIMINAR}(@nidPlato, @nidIngrediente);`;

        let cnn = await connections.connection();

        let res = await cnn.query(sql, [plato.nid_plato, plato.nid_ingrediente]);
        let resultado: any;
        
        for(const obj of res){
            if(obj.constructor == Array){
                resultado = JSON.parse(JSON.stringify(obj));
                break;
            }
        }
        
        await cnn.release();
        return resultado ? (resultado[0] ? resultado[0] : null) : null;
    }


}