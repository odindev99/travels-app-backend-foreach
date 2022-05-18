const Travel = require("./travelsModel");
const calcKgCo2ByTranport = require("../../services/calcKgCo2");

exports.addTravel = async (req, res, next) => {
	try {
		//* En travelData se espera: startpoint, endpoint, transport, kilometres, workers, creatorName y roundtrip
		const travelData = req.body;
		const logedUser = req.user;

		const travelKgCo2 = calcKgCo2ByTranport(
			travelData.transport,
			travelData.kilometres,
			travelData.roundtrip
		);

		const newTravel = new Travel({
			...travelData,
			createdByUser: logedUser._id,
			kgco2: travelKgCo2,
		});

		logedUser.travels = [...logedUser.travels, newTravel._id];

		await Promise.all([newTravel.save(), logedUser.save()]);

		return res.status(201).json({
			message: "Exito agregando travel!",
			newTravel,
		});
	} catch (error) {
		next(error);
	}
};
