import { PLATO_INSUMO } from "./plato-insumo.model";

export interface PLATO{
    
    nid_plato?: number;
    txt_plato?: string;
    num_rating?: number;
    nid_categoria?: number;
    imp_precio?: number;
    num_picor?: number;
    num_stock?: number;
    txt_imagen?: string;
    flg_activo?: number;

    txt_categoria?: string;
    listaIngrediente?: PLATO_INSUMO[];

}