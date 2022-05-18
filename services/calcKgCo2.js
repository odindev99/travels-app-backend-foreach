const calcKgCo2 = (kgCo2PerKm, kms, roundtrip) => {
	const roundTripNumb = roundtrip ? 2 : 1;

	return kgCo2PerKm * kms * roundTripNumb;
};

const calcKgCo2ByTranport = (transport, kms, roundtrip) => {
	let kgCo2PerKm;

	switch (transport) {
		case "metro":
			kgCo2PerKm = 0.033;
			break;
		case "auto":
			kgCo2PerKm = 0.21;
			break;
		case "camioneta":
			kgCo2PerKm = 0.249;
			break;
		case "motocicleta":
			kgCo2PerKm = 0.092;
			break;
		case "bus trasantiago":
			kgCo2PerKm = 0.039;
			break;
		case "bus privado":
			kgCo2PerKm = 0.012;
			break;
		case "avion nacional":
			kgCo2PerKm = 0.279;
			break;
		case "avion internacional":
			kgCo2PerKm = 0.179;
			break;
		case "caminando":
			kgCo2PerKm = 0;
			break;
	}

	return calcKgCo2(kgCo2PerKm, kms, roundtrip);
};

module.exports = calcKgCo2ByTranport;
