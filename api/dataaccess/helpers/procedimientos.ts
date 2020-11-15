export enum Procedimientos{

    //#region CATEGORIA
        CATEGORIA_LISTAR = "sp_listar_categoria",
    //#endregion CATEGORIA

    //#region INGREDIENTE
        INGREDIENTE_LISTAR = "sp_listar_ingrediente",
    //#endregion INGREDIENTE

    //#region PLATO
        PLATO_LISTAR = "sp_listar_plato",
        PLATO_OBTENER = "sp_obtener_plato",
        PLATO_INSERTAR = "sp_insertar_plato",
        PLATO_EDITAR = "sp_editar_plato",
        PLATO_ELIMINAR = "sp_eliminar_plato",
        PLATO_INSUMO_LISTAR = "sp_listar_plato_insumo",
        PLATO_INSUMO_INSERTAR = "sp_insertar_plato_insumo",
        PLATO_INSUMO_EDITAR = "sp_editar_plato_insumo",
        PLATO_INSUMO_ELIMINAR = "sp_eliminar_plato_insumo",
    //#endregion PLATO

}