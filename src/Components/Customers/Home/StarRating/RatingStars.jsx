import { useState } from "react";
import { IoStar } from "react-icons/io5";
import style from "./RatingStars.module.scss";

export const RatingStars = ({ onRatingSelect }) => {
	// State til den valgte vurdering og den midlertidige vurdering ved hover
	const [selectedRating, setSelectedRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);

	// Funktionen til at håndtere hover (farv stjerner op til den hoverede stjerne)
	const handleMouseOver = (rating) => {
		setHoverRating(rating);
	};

	// Funktion til at nulstille hover-effekten, når man flytter musen væk
	const handleMouseOut = () => {
		setHoverRating(0);
	};

	// Funktion til at låse vurderingen ved klik
	const handleClick = (rating) => {
		setSelectedRating(rating);
		onRatingSelect(rating); // Send vurderingen til det overordnede komponent
	};

	return (
		<div className={style.starContainer}>
			{[1, 2, 3, 4, 5].map((star) => (
				<span
					key={star}
					className={
						(hoverRating || selectedRating) >= star
							? style.filledStar
							: style.emptyStar
					}
					onMouseOver={() => handleMouseOver(star)}
					onMouseOut={handleMouseOut}
					onClick={() => handleClick(star)}>
					<IoStar />
				</span>
			))}
		</div>
	);
};
