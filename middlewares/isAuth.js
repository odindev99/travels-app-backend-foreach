const jwt = require("jsonwebtoken");
const User = require("../components/users/usersModel");
const throwError = require("../services/throwError");

module.exports = async (req, res, next) => {
	const authHeader = req.get("Authorization");
	try {
		if (!authHeader) {
			throwError("Usuario no autenticado!", 401)
		}

		const token = req.get("Authorization").split(" ")[1];
		const jwtSecret = process.env.JWT_SECRET;

		const decodedToken = jwt.verify(token, jwtSecret, (err, decoded) => {
			if (err) {
				err.status = 401;
				err.message =
					"Token de autenticacion expirado o invalido, por favor vuelve a iniciar sesión!";
				throw err;
			}

			return decoded;
		});

		const logedUser = await User.findOne({ _id: decodedToken.userId });

		if (!logedUser) {
			throwError(
				`No existe un usuario con estas credenciales, por favor intenta de nuevo!`,
				404
			);
		}

		req.user = logedUser;

		next();
	} catch (error) {
		next(error);
	}
};
