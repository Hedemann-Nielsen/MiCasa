import { useState } from "react";

export const useClearMessageHandler = () => {
	const [errorMessage, setErrorMessage] = useState(""); // Erklæring af errorMessage state
	const [successMessage, setSuccessMessage] = useState(""); // Erklæring af successMessage state

	const clearMessages = () => {
		setTimeout(() => {
			setErrorMessage(""); // Tømmer errorMessage efter 5 sekunder
			setSuccessMessage(""); // Tømmer successMessage efter 5 sekunder
		}, 5000);
	};

	return {
		errorMessage,
		successMessage,
		setErrorMessage,
		setSuccessMessage,
		clearMessages,
	};
};
