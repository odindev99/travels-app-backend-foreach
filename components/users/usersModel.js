const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			default: "worker",
			enum: {
				values: ["worker", "admin"],
				message: "{VALUE} as role value is not supported",
			},
		},
		travels: [{ type: Schema.Types.ObjectId, ref: "Travel" }],
	},
	{ collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
