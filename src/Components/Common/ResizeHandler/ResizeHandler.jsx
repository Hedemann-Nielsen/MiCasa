import { useEffect, useState } from "react";

// `useResizeHandler` er et React-hook, der holder styr på browserens bredde og opdaterer denne, hver gang vinduesstørrelsen ændres.

export const useResizeHandler = () => {
	const [windowsSize, setWindowSize] = useState(0);

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
			});
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return windowsSize;
};
