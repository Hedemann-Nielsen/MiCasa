// Funktion til at formatere en dato fra timestampz ( eks 2024-08-21T16:39:21+00:00) til datoformat ( eks: 21. August 2024)

export const formatDate = (dateString) => {
	// opretter en dato baseret på inputtet
	const date = new Date(dateString);

	// array af alle måneder
	const months = [
		"Januar",
		"Februar",
		"Marts",
		"April",
		"Maj",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"December",
	];

	//henter datoen som er angivet fra inputtet i dag, måned som erstattes med navnet fra arrayet og året.
	return `${months[date.getMonth()]} ${date.getFullYear()}`;
};
