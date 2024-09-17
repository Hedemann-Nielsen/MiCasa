import { useState } from "react";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { useParams } from "react-router-dom";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";
import { useAuth } from "../../../Providers/AuthProvider";
import { useSupabase } from "../../../Providers/SupabaseProvider.jsx";
import { ContactCard } from "./ContactCard.jsx";
import { IconsModal } from "../../Modal/IconsModal.jsx";

import iconFloorPlan from "../../../assets/Icons/floorPlan.png";
import iconGallery from "../../../assets/Icons/gallery.png";
import iconLocation from "../../../assets/Icons/location.png";
import iconLike from "../../../assets/Icons/like.png";

import { IoCloseSharp } from "react-icons/io5";

import globalStyle from "../../../Styles/Globalstyles.module.scss";
import style from "./EstateDetails.module.scss";

export const EstateDetails = () => {
	const { estate_id } = useParams();
	const { user } = useAuth();
	const { supabase } = useSupabase();
	const estateData = useEstateData();
	const estateImages = useEstateImagesRelData();
	const [photomodalIsOpen, setPhotoModalIsOpen] = useState(false);
	const [floorPlanModalIsOpen, setFloorPlanModalIsOpen] = useState(false);
	const [locationModalIsOpen, setLocationModalIsOpen] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const estate = estateData.find((estate) => estate.id === parseInt(estate_id));

	const handleLikeClick = async () => {
		if (user && supabase) {
			try {
				// Insert the estate_id and user_id into the favorites table
				const { data, error } = await supabase
					.from("favorites")
					.insert([{ estate_id: estate.id, user_id: user.id }]);

				if (error) {
					console.error("Error liking estate:", error);
					setErrorMessage("Der opstod en fejl");
				} else {
					setIsLiked(true); // Set the state to reflect the like
				}
			} catch (error) {
				console.error("Error ved insætning af favorit:", error);
			}
		} else {
			setErrorMessage("Du skal være logget ind for at like boligen.");
		}
	};

	if (!estate) {
		return <span> Denne bolig findes ikke</span>;
	}

	// Kontrol for employees data inden det sendes videre
	const employeeFirstName = estate?.employees?.firstname ?? "Ukendt";
	const employeeLastName = estate?.employees?.lastname ?? "Ukendt";
	const employeeEmail = estate?.employees?.email ?? "Ikke tilgængelig";
	const employeePhone = estate?.employees?.phone ?? "Ikke tilgængelig";
	const employeePosition = estate?.employees?.position ?? "ikke tilgængelig";
	const employeeImage = estate?.employees?.image_url ?? "ikke tilgængelig";

	//Funktion til at finde image relateret til hver estate
	const getImageForEstate = (estateId) => {
		const imageRel = estateImages.find((image) => image.estate_id === estateId);
		return imageRel?.images?.image_url || ""; // Returnere billede eller en tom text streng
	};

	const formattedCashPrice = estate.price.toLocaleString("da-DK");
	const formattedPayoutPrice = estate.payout.toLocaleString("da-DK");
	const formattedCostPrice = estate.cost.toLocaleString("da-DK");
	const formattedCostPriceWDigits = estate.cost.toLocaleString("da-DK", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
	const formattedNetPrice = estate.net.toLocaleString("da-DK");
	const formattedBruttoPrice = estate.gross.toLocaleString("da-DK");

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
		<>
			<div className={style.imgWrapper}>
				<img src={getImageForEstate(estate.id)} alt={estate.address} />
			</div>
			<div className={style.line}></div>
			<PageWrapper title={`detaljer om bolig`}>
				<div className={style.estateDetails}>
					<section className={`${style.primaryDetails} ${globalStyle.flex}`}>
						<div className={`${style.addressContent}`}>
							<h1 className={globalStyle.title}>{estate.address}</h1>
							<p>
								{estate.cities.name} {estate.cities.zipcode}
							</p>
							<div className={globalStyle.flex}>
								<p>{estate.estate_types.name} </p>
								<p className={style.spacer}>|</p>
								<p>{estate.floor_space} m2 </p>
								<p className={style.spacer}>|</p>
								<p>{estate.num_rooms} vær</p>
							</div>
							<p>set x gang</p>
						</div>
						<div className={globalStyle.flex}>
							<div className={style.iconWrapper} onClick={OpenModalToPhoto}>
								<img src={iconGallery} />
							</div>

							<div className={style.iconWrapper} onClick={OpenModalToFloorPlan}>
								<img src={iconFloorPlan} />
							</div>
							<div className={style.iconWrapper} onClick={OpenModalToLocation}>
								<img src={iconLocation} />
							</div>

							<div className={style.iconWrapper} onClick={handleLikeClick}>
								<img src={iconLike} />
							</div>
							{/* Show error message if the user is not logged in */}
							{errorMessage && <p className={style.error}>{errorMessage}</p>}
						</div>

						{/* modal indhold til gallery icon*/}
						<IconsModal
							isOpen={photomodalIsOpen}
							onRequestClose={closePhotoModal}>
							<div className={globalStyle.iconModal}>
								<div
									className={globalStyle.closeIcsonWrapper}
									onClick={closePhotoModal}>
									<IoCloseSharp className={globalStyle.closeIcon} />
								</div>
								<img src={getImageForEstate(estate.id)} alt={estate.address} />
							</div>
						</IconsModal>

						{/* modal indhold til plantegning icon*/}
						<IconsModal
							isOpen={floorPlanModalIsOpen}
							onRequestClose={closeFloorPlanModal}>
							<div className={globalStyle.iconModal}>
								<div
									className={globalStyle.closeIcsonWrapper}
									onClick={closeFloorPlanModal}>
									<IoCloseSharp className={globalStyle.closeIcon} />
								</div>
								<img src={estate.floorplan} alt={estate.address} />
							</div>
						</IconsModal>

						{/* modal indhold til location*/}
						<IconsModal
							isOpen={locationModalIsOpen}
							onRequestClose={closeLocationModal}>
							<div className={globalStyle.iconModal}>
								<div
									className={globalStyle.closeIcsonWrapper}
									onClick={closeLocationModal}>
									<IoCloseSharp className={globalStyle.closeIcon} />
								</div>
								<iframe
									width="600"
									height="450"
									frameBorder="0"
									style={{ border: 0 }}
									src={mapsUrl}
									allowFullScreen
									aria-hidden="false"
									tabIndex="0"></iframe>
							</div>
						</IconsModal>

						<div className={style.estatePrices}>
							<p>
								Kontantpris: <span>{formattedCashPrice} </span>
							</p>
							<p>Udbetaling: {formattedPayoutPrice}</p>
							<p>Ejerudgift per måned: {formattedCostPriceWDigits}</p>
						</div>
					</section>
					<section className={style.secDetails}>
						<div className={style.detailsList}>
							<div>
								<p>sagsnr.</p>
								<p>Boligareal</p>
								<p>Grundareal</p>
								<p>Antal rum</p>
								<p>Antal plan</p>
							</div>
							<div>
								<p>{estate.id}</p>
								<p>{estate.floor_space} m2</p>
								<p>{estate.ground_space} m2</p>
								<p>{estate.num_rooms}</p>
								<p>{estate.num_floors}</p>
							</div>
						</div>
						<div className={style.detailsList}>
							<div>
								<p>Kælder.</p>
								<p>Byggeår</p>
								<p>Ombygget</p>
								<p>Energimærke</p>
								<p>Liggetid</p>
							</div>
							<div>
								<p>{estate.basement_space}</p>
								<p>{estate.year_construction} m2</p>
								<p>{estate.year_rebuilt} m2</p>
								<p>{estate.energy_labels.letter}</p>
								<p>{estate.created_at}</p>
							</div>
						</div>
						<div className={style.detailsList}>
							<div>
								<p>Kontantpris</p>
								<p>Udbetaling</p>
								<p>Brutto ex ejerudgift</p>
								<p>Netto ex. ejerudgift</p>
								<p>Ejerudgift</p>
							</div>
							<div>
								<p>{formattedCashPrice}</p>
								<p>{formattedPayoutPrice}</p>
								<p>{formattedBruttoPrice}</p>
								<p>{formattedNetPrice}</p>
								<p>{formattedCostPrice}</p>
							</div>
						</div>
					</section>
					<section className={style.highlights}>
						<p>{estate.description}</p>

						<div className={style.contactWrapper}>
							<ContactCard
								firstname={employeeFirstName}
								lastname={employeeLastName}
								email={employeeEmail}
								phone={employeePhone}
								position={employeePosition}
								image={employeeImage}
							/>
						</div>
					</section>
				</div>
			</PageWrapper>
		</>
	);
};
