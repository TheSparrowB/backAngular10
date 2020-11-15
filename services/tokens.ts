import jwtoken = require("jsonwebtoken");

const decodeToken = async token => {
	let decode: any = await jwtoken.verify(token, process.env.KEY_SECRET_TOKEN)
	return ({
		nidUsuario: decode.nidusr,
        dni: decode.dni,
        apellidoPaterno: decode.apepat,
        apellidoMaterno: decode.apemat,
        nombres: decode.nombres,
        email: decode.email,
        nidPersonal: decode.nidper,
        nidControlAccesoWeb: decode.nidctrl,
        codigoZonal: decode.codzonal,
        nombreZonal: decode.nomzonal
	})
}

export { decodeToken };
