const User = require("./usersModel");
const Travel = require("../travels/travelsModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const throwError = require("../../services/throwError");

//* Controlador para registro de usuario
exports.singin = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		//# se valida que no existan usuarios con el email enviado
		const existingEmail =
			(await User.countDocuments({ email })) === 0 ? false : true;

		if (existingEmail) {
			throwError("Alredy exist a user with this email!", 406);
		}

		//# Se encripta la contraseña 
		const encryptPassword = await bcrypt.hash(password, 10);

		//# Se guarda el usuario en la db
		const newUser = new User({
			email,
			password: encryptPassword,
		});

		await newUser.save();

		res.status(201).json({
			message: "Usuario creado, por favor inicie sesion!",
		});
	} catch (error) {
		next(error);
	}
};

//* Login Controller
exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const existUser = await User.findOne({ email });

		if (!existUser) {
			throwError("Doesn't exist a user with this email", 401);
		}

		const rightPassword = await bcrypt.compare(password, existUser.password);

		if (!rightPassword) {
			throwError("Wrong password try again", 401);
		}

		const jwtSecret = process.env.JWT_SECRET;

		const { role, _id } = existUser;

		const token = jwt.sign(
			{
				userId: _id,
				role,
			},
			jwtSecret,
			{ expiresIn: "12h" }
		);

		res.status(202).json({
			message: "Login exitoso!",
			user: {
				email,
				id: _id,
				role,
			},
			token,
		});
	} catch (error) {
		next(error);
	}
};

exports.getTravels = async (req, res, next) => {
	try {
		const user = req.user;

		if (user.role !== "admin") {
			const userWithTravels = await req.user.populate({
				path: "travels",
			});

			const { travels } = userWithTravels;

			const userTravels = travels.map((travel) => travel._doc);

			return res.status(200).json({
				message: "Exito obteniendo viajes de usuario",
				travels: userTravels,
			});
		}

		const allTravels = await Travel.find();

		return res.status(200).json({
			message: "Exito obteniendo viajes",
			travels: allTravels,
		});
	} catch (error) {
		next(error);
	}
};
