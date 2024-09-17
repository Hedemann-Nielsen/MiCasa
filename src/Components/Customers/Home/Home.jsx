import { useState } from "react";
import { EstateCard } from "../../EstateCards/EstateCard.jsx";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";
import { useReviewsData } from "../../Hooks/ReviewsData";
import { formatDate } from "../../Utils/DateUtils.jsx";
import { SlideShow } from "./SlideShow.jsx";

import { IoCloseSharp } from "react-icons/io5";

import style from "./Home.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const Home = () => {
	const [isReviewFormVisible, setReviewFormVisible] = useState(false);
	const estateData = useEstateData();
	const estateImages = useEstateImagesRelData();
	const reviewsData = useReviewsData();

	//Funktion til at flytte rundt på pladserne af dataen i arrayet
	const shuffleArray = (array) => {
		return array.sort(() => Math.random() - 0.5);
	};

	//Funktion til at finde image relateret til hver estate
	const getImageForEstate = (estateId) => {
		const imageRel = estateImages.find((image) => image.estate_id === estateId);
		return imageRel?.images?.image_url || ""; // Returnere billede eller en tom text streng
	};

	//Tag de 3 første efter der er byttet rundt på pladserne  i shuffleArray
	const shuffledEstates = shuffleArray([...estateData]).slice(0, 3);

	const shuffledReviews = shuffleArray([...reviewsData]).slice(0, 1);

	const openReviewForm = (e) => {
		e.preventDefault();
		setReviewFormVisible(!isReviewFormVisible);
	};
	const closeReviewForm = (e) => {
		e.preventDefault();
		setReviewFormVisible(false);
	};

	return (
		<div className={style.contentWrapper}>
			<div className={style.slideShowWrapper}>
				<SlideShow />
				<span className={style.line}></span>
			</div>
			<section className={style.estateCard}>
				{shuffledEstates.map((estate) => (
					<EstateCard
						id={estate.id}
						key={estate.id}
						image={getImageForEstate(estate.id)}
						address={estate.address}
						city={estate.cities.name}
						zipcode={estate.cities.zipcode}
						type={estate.estate_types.name}
						rooms={estate.num_rooms}
						floorSpace={estate.floor_space}
						energyLabel={estate.energy_labels.letter}
						price={estate.price}
					/>
				))}
			</section>

			{/* reviews */}
			{shuffledReviews.map((review) => (
				<section className={style.review} key={review.id}>
					<h1 className={globalStyle.title}>Det siger vores kunder</h1>
					<div className={style.reviewContent}>
						<article className={style.article}>
							<h2>{review.title}...</h2>
							<p>“{review.content}”</p>
							<p className={style.date}>
								{review.name}, {formatDate(review.created_at)}
							</p>
						</article>
					</div>
				</section>
			))}

			{/* skriv en anmeldse */}
			<section className={style.writeReview}>
				<button className={style.reviewBtn} onClick={openReviewForm}>
					Skriv en anmeldelse
				</button>
				<div
					className={`${style.writeReviewContent} ${
						isReviewFormVisible ? style.show : ""
					}`}>
					<form>
						<div className={style.closeIcsonWrapper} onClick={closeReviewForm}>
							<IoCloseSharp />
						</div>
						<div className={style.inputWrapper}>
							<label htmlFor="name">Dit navn:</label>
							<input type="text" placeholder="Indtast dit navn" />
						</div>
						<div className={style.inputWrapper}>
							<label htmlFor="email">Din email::</label>
							<input type="email" placeholder="Indtast din email" />
						</div>
						<div className={style.inputWrapper}>
							<label htmlFor="comment">Kommentar:</label>
							<textarea
								name="comment"
								placeholder="Skriv en kommentar"></textarea>
						</div>
						<div className={globalStyle.btnWrapper}>
							<button className={globalStyle.styledBtn}>Send</button>
						</div>
					</form>
				</div>
			</section>

			{/* ansatte */}
			<section className={style.employees}>
				<h1 className={globalStyle.title}>Mød vores ansatte</h1>
			</section>
		</div>
	);
};
