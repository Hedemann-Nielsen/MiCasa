import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { EstateCard } from "../../EstateCards/EstateCard.jsx";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";

import globalStyle from "../../../Styles/Globalstyles.module.scss";
import style from "./Estates.module.scss";

export const Estates = () => {
	const estateData = useEstateData();
	const estateImages = useEstateImagesRelData();

	//Funktion til at finde image relateret til hver estate
	const getImageForEstate = (estateId) => {
		const imageRel = estateImages.find((image) => image.estate_id === estateId);
		return imageRel?.images?.image_url || ""; // Return the image URL or an empty string if not found
	};

	return (
		<PageWrapper title={"til salg"}>
			<div className={style.estateWrapper}>
				<h1 className={globalStyle.title}>Boliger til salg</h1>
				<div className={style.selectWrapper}>
					<select name="" id="">
						<option value="">Villa</option>
						<option value="">Ejerlejlighed</option>
						<option value="">Andelsbolig</option>
					</select>

					<select name="" id="">
						<option value="">pris - stigende</option>
						<option value="">pris - faldende</option>
						<option value="">Antal kvatratmeter</option>
						<option value="">Liggetid</option>
					</select>
				</div>
				<section className={style.estateCard}>
					{estateData &&
						estateData.map((estate) => (
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
			</div>
		</PageWrapper>
	);
};
