import { useEffect, useState } from "react";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { useParams } from "react-router-dom";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";
import { useAuth } from "../../../Providers/AuthProvider";
import { useSupabase } from "../../../Providers/SupabaseProvider.jsx";
import { ContactCard } from "./ContactCard.jsx";
import { useFavoritsData } from "../../Hooks/FavoritsData.jsx";
import { PriceDetails } from "./PriceDetails.jsx";
import { PrimaryDetails } from "./PrimaryDetails.jsx";

import style from "./EstateDetails.module.scss";

export const EstateDetails = () => {
	const { estate_id } = useParams();
	const estateId = estate_id;
	const { loginData } = useAuth();
	const userId = loginData?.user?.id;
	const { supabase } = useSupabase();
	const estateData = useEstateData();
	const estateImages = useEstateImagesRelData();
	const favoritsData = useFavoritsData(userId, estateId);

	const [isLiked, setIsLiked] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [count, setCount] = useState();
	const estate = estateData.find((estate) => estate.id === parseInt(estate_id));

	//funktion der overvåger om der er en bruger der er logget ind.
	useEffect(() => {
		if (!userId) {
			setIsLiked(false); // Nulstil liked status når der ikke er nogen bruger logget in
		}
	}, [userId]);

	// Funktion der tjekker om den aktuelle bolig er liked fra brugeren
	useEffect(() => {
		if (favoritsData && estate) {
			//some returnere true eller false
			const isEstateLiked = favoritsData.some(
				(favorite) => favorite.estate_id === estate.id
			);
			setIsLiked(isEstateLiked);
		}
	}, [favoritsData, estate]);

	// Funktion til at håndtere klik på boligen
	const incrementClickCount = async () => {
		if (!estate || estate.num_clicks === undefined) {
			console.error("Estate is undefined or num_clicks is not available");
			return;
		}

		const clickCount = estate.num_clicks;
		let newCount = clickCount + 1;
		setCount(newCount);

		try {
			const { error } = await supabase
				.from("estates")
				.update({ num_clicks: newCount })
				.eq("id", estateId);

			if (error) {
				console.error("Fejl ved opdatering af klik:", error.message);
			}
		} catch (error) {
			console.error("Generel fejl:", error.message);
		}
	};

	useEffect(() => {
		if (estate && estateId) {
			incrementClickCount();
		}
	}, [estateId, estate]);

	// funktion til at indsætte eller slette data i databasen
	const handleLikeClick = async () => {
		if (loginData && supabase) {
			try {
				if (isLiked) {
					// Hvis boligen allerede er liket, slet den fra tabellen favorits
					const { data, error } = await supabase
						.from("favorites")
						.delete()
						.eq("estate_id", estate.id)
						.eq("user_id", loginData.user.id);

					if (error) {
						console.error("Error unliking estate:", error);
						setErrorMessage("Der opstod en fejl ved fjernelse af favorit.");
					} else {
						setIsLiked(false); // Opdater isLiked til false
					}
				} else {
					// Hvis boligen ikke er liket, indsæt den i tabellen favorits
					const { data, error } = await supabase
						.from("favorites")
						.insert([{ estate_id: estate.id, user_id: loginData.user.id }]);

					if (error) {
						console.error("Error liking estate:", error);
						setErrorMessage("Der opstod en fejl.");
					} else {
						setIsLiked(true); // Opdater isLiked til true
					}
				}
			} catch (error) {
				console.error("Error ved håndtering af favorit:", error);
			}
		} else {
			setErrorMessage(
				"Du skal være logget ind for at like boligen. Gå til login."
			);
		}
	};

	//funktion der tjekker om den aktuelle bolig eksistere i databasen
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

	return (
		<>
			<div className={style.imgWrapper}>
				<img src={getImageForEstate(estate.id)} alt={estate.address} />
			</div>
			<div className={style.line}></div>
			<PageWrapper title={`detaljer om ${estate.address}`}>
				<div className={style.estateDetails}>
					<PrimaryDetails
						estate={estate}
						handleLikeClick={handleLikeClick}
						errorMessage={errorMessage}
						formattedCashPrice={formattedCashPrice}
						formattedPayoutPrice={formattedCostPrice}
						formattedCostPriceWDigits={formattedCostPriceWDigits}
						isLiked={isLiked}
						estateImages={estateImages}
					/>

					<PriceDetails
						estate={estate}
						formattedCashPrice={formattedCashPrice}
						formattedPayoutPrice={formattedPayoutPrice}
						formattedBruttoPrice={formattedBruttoPrice}
						formattedNetPrice={formattedNetPrice}
						formattedCostPrice={formattedCostPrice}
					/>

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
