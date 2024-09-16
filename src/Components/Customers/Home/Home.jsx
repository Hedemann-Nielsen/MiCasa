import { EstateCard } from "./EstateCard.jsx";
import { SlideShow } from "./SlideShow.jsx";
import { useEstateDatas } from "../../Hooks/EstateData.jsx";
import { useEstateImagesRelData } from "../../Hooks/EstateImagesRelData.jsx";

import style from "./Home.module.scss";

export const Home = () => {
	const estateData = useEstateDatas();
	const estateImages = useEstateImagesRelData();

	//Funktion til at finde image relateret til hver estate
	const getImageForEstate = (estateId) => {
		const imageRel = estateImages.find((image) => image.estate_id === estateId);
		return imageRel?.images?.image_url || ""; // Return the image URL or an empty string if not found
	};

	return (
		<>
			<SlideShow />
			<hr className={style.line} />
			<section className={style.estateCard}>
				{estateData.slice(0, 3).map((estate) => (
					<EstateCard
						key={estate.id}
						image={getImageForEstate(estate.id)}
						address={estate.address}
						city={estate.cities.name}
						zipcode={estate.cities.zipcode}
						type={estate.estate_types.name} // For mere information om type, kan du tilføje en metode til at få type-navn
						rooms={estate.num_rooms}
						floorSpace={estate.floor_space}
						energyLabel={estate.energy_labels.letter} // For mere information om energimærke, kan du tilføje en metode til at få label-navn
						price={estate.price}
					/>
				))}
			</section>
		</>
	);
};
