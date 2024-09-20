import style from "./RatingStars.module.scss";
import { IoStar } from "react-icons/io5";

// Funktion til at generere stjerner baseret på vurderingen for hver enekelt kommentar
export const generateStars = (numStars) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		stars.push(
			<span
				key={i}
				className={i <= numStars ? style.filledStar : style.emptyStar}>
				<IoStar />
			</span>
		);
	}
	return stars;
};
