import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { EstateCard } from "../../EstateCards/EstateCard.jsx";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";
import { useReviewsData } from "../../Hooks/ReviewsData";
import { formatDate } from "../../Utils/DateUtils.jsx";
import { SlideShow } from "./SlideShow.jsx";
import { EmployeesCard } from "./EmployeesCard.jsx";
import { useEmployeesDatas } from "../../Hooks/EmployeesData.jsx";
import { ReviewSection } from "./ReviewSection.jsx";
import { useReviewsMessage } from "../../Hooks/ReviewMessageInsert.jsx";
import { useAuth } from "../../../Providers/AuthProvider.jsx";
import { Modal } from "../../Modal/Modal.jsx";

import style from "./Home.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const Home = () => {
	const [isReviewFormVisible, setReviewFormVisible] = useState(false);
	const estateData = useEstateData();
	const estateImages = useEstateImagesRelData();
	const reviewsData = useReviewsData();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const employeesData = useEmployeesDatas();
	const { insertReviewsMessage } = useReviewsMessage();
	const { loginData } = useAuth();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalMessage1, setModalMessage1] = useState("");
	const [modalMessage2, setModalMessage2] = useState("");
	const [modalMessage3, setModalMessage3] = useState("");
	const [userId, setUserId] = useState();

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

	useEffect(() => {
		if (loginData) {
			const userId = loginData.user.id;
			setUserId(userId);
		}
	}, [loginData]);

	//funktion der sender anmeldse til databasen
	const postReview = async (formData, userId) => {
		const combinedFormData = {
			...formData,
			user_id: userId,
		};
		console.log(combinedFormData);

		//sender data til databasen
		const response = await insertReviewsMessage(combinedFormData);
		if (response.success) {
			// console.log("anmeldse er sendt?");

			setModalMessage1(
				`
Tak for din anmeldse ${combinedFormData.name}.`
			);
			setModalMessage2(
				`Overskrift: ${combinedFormData.title}
anmeldse: ${combinedFormData.comment}
Du kan ændre din anmeldse, når du er logget ind via min side`
			);
			setModalMessage3(
				`Anmeldse: ${combinedFormData.comment}
Du kan ændre din anmeldse, når du er logget ind via min side`
			);

			setShowModal(true); // Åbn modalen
			reset();
			closeReviewForm();
		} else {
			setMessage(response.message);
		}
	};

	//funktion der åbner modal vindue
	const setShowModal = () => {
		setModalIsOpen(true);
		console.log("modal is open");
	};

	//funktion der lukker modal vindue
	const closeModal = () => {
		setModalIsOpen(false);
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
				handleMessage={handleSubmit((formData) => postReview(formData, userId))}
				reset={reset}
				register={register}
				errors={errors}
				// message={message}
				loginData={loginData}
			/>

			{/* modal indhold */}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className="Modal"
				overlayClassName="Overlay">
				<div className={globalStyle.modalContent}>
					<h2 className={globalStyle.title}>Tak for din anmeldelse</h2>
					<p className={globalStyle.text}> {modalMessage1}</p>
					<p className={globalStyle.text}> {modalMessage2}</p>
					<p className={globalStyle.text}> {modalMessage3}</p>
					<p className={globalStyle.text}>
						Du kan ændre din anmeldse, når du er logget ind via
						<Link to="/login"> min side </Link>
					</p>

					<span className={globalStyle.btnWrapper}>
						<button onClick={closeModal} className={globalStyle.styledBtn}>
							Luk
						</button>
					</span>
				</div>
			</Modal>

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
