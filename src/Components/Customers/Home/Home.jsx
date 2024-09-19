import { useState } from "react";
import { EstateCard } from "../../EstateCards/EstateCard.jsx";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";
import { useReviewsData } from "../../Hooks/ReviewsData";
import { formatDate } from "../../Utils/DateUtils.jsx";
import { SlideShow } from "./SlideShow.jsx";

import style from "./Home.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import { EmployeesCard } from "./EmployeesCard.jsx";
import { useEmployeesDatas } from "../../Hooks/EmployeesData.jsx";
import { ReviewSection } from "./ReviewSection.jsx";

export const Home = () => {
	const [isReviewFormVisible, setReviewFormVisible] = useState(false);
	const estateData = useEstateData();
	const estateImages = useEstateImagesRelData();
	const reviewsData = useReviewsData();
	const employeesData = useEmployeesDatas();

	//Funktion til at flytte rundt på pladserne af dataen i arrayet
	const shuffleArray = (array) => {
		return array.sort(() => Math.random() - 0.5);
	};

	//Funktion til at finde image relateret til hver estate
	const getImageForEstate = (estateId) => {
		const imageRel = estateImages.find((image) => image.estate_id === estateId);
		return imageRel?.images?.image_url || ""; // Returnere billede eller en tom text streng
	};

	//Tag de 3 første efter der er byttet rundt på pladserne  i shuffleArray for at vise 3 boliger
	const shuffledEstates = shuffleArray([...estateData]).slice(0, 3);

	//Tag den 1 første efter der er byttet rundt på pladserne i shuffleArray for at vise kommentaren
	const shuffledReviews = shuffleArray([...reviewsData]).slice(0, 1);

	//funktion der åbner formular til anmeldse
	const openReviewForm = (e) => {
		e.preventDefault();
		setReviewFormVisible(!isReviewFormVisible);
	};
	//funktion der lukker formular til anmeldse
	const closeReviewForm = (e) => {
		e.preventDefault();
		setReviewFormVisible(false);
	};

	//funktion der sender anmeldse til databasen
	const handleSendMessage = async (formData) => {
		const response = await updateContactMessage(formData);

		if (response.success) {
			const selectedEmployee = employees.find(
				(e) => e.id === parseInt(formData.employee)
			);
			setModalMessage1(
				`
Din besked er sendt til ${selectedEmployee.firstname} ${selectedEmployee.lastname}.`
			);
			setModalMessage2(
				`Du vil modtage svar på ${formData.email} hurtigst muligt.`
			);
			setShowModal(true); // Åbn modalen
			reset();
		} else {
			setMessage(response.message);
		}
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
			<ReviewSection
				openReviewForm={openReviewForm}
				closeReviewForm={closeReviewForm}
				isReviewFormVisible={isReviewFormVisible}
			/>

			{/* ansatte */}
			<section className={style.emloyeesWrapper}>
				<h1 className={globalStyle.title}>Møn vores ansatte</h1>
				<div className={style.staffSection}>
					<EmployeesCard employees={employeesData} />
				</div>
			</section>
		</div>
	);
};
