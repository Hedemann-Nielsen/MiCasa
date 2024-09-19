import { useState } from "react";
import { Link } from "react-router-dom";
import { ModalForPhoto, ModalForFloorPlan, ModalForLocation } from "../Modals";
import dayjs from "dayjs";

import iconFloorPlan from "../../../../assets/Icons/floorPlan.png";
import iconGallery from "../../../../assets/Icons/gallery.png";
import iconLocation from "../../../../assets/Icons/location.png";
import iconLike from "../../../../assets/Icons/like.png";

import globalStyle from "../../../../Styles/Globalstyles.module.scss";
import style from "../EstateDetails.module.scss";

export const PrimaryDetails = ({
	estate,
	handleLikeClick,
	errorMessage,
	formattedCashPrice,
	formattedPayoutPrice,
	formattedCostPriceWDigits,
	isLiked,
	estateImages,
}) => {
	const [photomodalIsOpen, setPhotoModalIsOpen] = useState(false);
	const [floorPlanModalIsOpen, setFloorPlanModalIsOpen] = useState(false);
	const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);

	// Kombiner adresse, by og postnummer til en enkelt streng
	const fullAddress = `${estate.address}, ${estate.cities.zipcode} ${estate.cities.name}`;

	// URL til Google Maps med indkodet adresse
	const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
		fullAddress
	)}&output=embed`;

	//modal styting til photo icon
	const OpenModalToPhoto = () => {
		openPhotoModal();
	};
	const openPhotoModal = () => {
		setPhotoModalIsOpen(true);
	};
	const closePhotoModal = () => {
		setPhotoModalIsOpen(false);
	};

	//modal styting til floor plan icon
	const OpenModalToFloorPlan = () => {
		openFloorPlanModal();
	};
	const openFloorPlanModal = () => {
		setFloorPlanModalIsOpen(true);
	};
	const closeFloorPlanModal = () => {
		setFloorPlanModalIsOpen(false);
	};

	//modal styting til lokation icon
	const OpenModalToLocation = () => {
		openLocationModal();
	};
	const openLocationModal = () => {
		setLocationModalIsOpen(true);
	};
	const closeLocationModal = () => {
		setLocationModalIsOpen(false);
	};
	return (
		<section className={style.primaryDetails}>
			<div className={style.addressContent}>
				<h1 className={globalStyle.title}>{estate.address}</h1>
				<p>
					{estate.cities.zipcode} {estate.cities.name}
				</p>
				<div className={style.estateType}>
					<p>{estate.estate_types.name} </p>
					<p className={style.spacer}>|</p>
					<p>{estate.floor_space} m2 </p>
					<p className={style.spacer}>|</p>
					<p>{estate.num_rooms} vær</p>
				</div>
				<p>set {estate.num_clicks} gange</p>
			</div>
			<div className={style.icons}>
				<div className={style.iconContent}>
					<div className={style.iconWrapper} onClick={OpenModalToPhoto}>
						<img src={iconGallery} />
					</div>

					<div className={style.iconWrapper} onClick={OpenModalToFloorPlan}>
						<img src={iconFloorPlan} />
					</div>
					<div className={style.iconWrapper} onClick={OpenModalToLocation}>
						<img src={iconLocation} />
					</div>

					<div
						className={`${style.iconWrapper} ${isLiked ? style.liked : ""}`}
						onClick={handleLikeClick}>
						<img src={iconLike} />
					</div>
				</div>
				{/* Vis error besked hvis brugeren ikker er logget ind*/}
				<div
					className={`${style.errorMessage} ${errorMessage ? style.show : ""}`}>
					{errorMessage && (
						<p className={style.error}>
							<Link to="/login">{errorMessage}</Link>
						</p>
					)}
				</div>
			</div>

			<div className={style.estatePrices}>
				<p>
					Kontantpris: <span>{formattedCashPrice} </span>
				</p>
				<p>Udbetaling: {formattedPayoutPrice}</p>
				<p>Ejerudgift per måned: {formattedCostPriceWDigits}</p>
			</div>
			{/* modal indhold til photo icon*/}
			<ModalForPhoto
				photomodalIsOpen={photomodalIsOpen}
				closePhotoModal={closePhotoModal}
				imageUrl={
					estateImages.find((img) => img.estate_id === estate.id)?.images
						?.image_url || ""
				}
				estateAddress={estate.address}
			/>
			{/* modal indhold til plantegning icon*/}
			<ModalForFloorPlan
				isOpen={floorPlanModalIsOpen}
				closeModal={closeFloorPlanModal}
				floorPlanUrl={estate.floorplan}
				estateAddress={estate.address}
			/>

			{/* modal indhold til location*/}
			<ModalForLocation
				isOpen={locationModalIsOpen}
				closeModal={closeLocationModal}
				mapsUrl={mapsUrl}
			/>
		</section>
	);
};
