const mongoose = require("mongoose");
const { Schema } = mongoose;

const TravelSchema = new Schema(
	{
		startpoint: {
			type: String,
			required: true,
			trim: true,
		},
		endpoint: {
			type: String,
			required: true,
			trim: true,
		},
		transport: {
			type: String,
			enum: {
				values: [
					"metro",
					"auto",
					"camioneta",
					"motocicleta",
					"bus trasantiago",
					"bus privado",
					"avion nacional",
					"avion internacional",
					"caminando",
				],
				message: "{VALUE} as transport value is not supported",
			},
			required: true,
		},
		kilometres: {
			type: Number,
			required: true,
		},
		workers: {
			type: String,
			required: true,
		},
		creatorName: {
			type: String,
			required: true,
		},
		roundtrip: {
			type: Boolean,
			required: true,
		},
		createdByUser: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		kgco2: {
			type: Number,
			required: true
		}
	},
	{ collection: "travels", timestamps: true }
);

module.exports = mongoose.model("Travel", TravelSchema);
