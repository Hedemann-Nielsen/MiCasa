import React, { useState } from "react";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { EstateCard } from "../EstateCards/EstateCard.jsx";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useEstateImageRelData } from "../../Hooks/EstateImageRelData.jsx";
import { useEstateTypeData } from "../../Hooks/EstateTypesData.jsx";

import globalStyle from "../../../Styles/Globalstyles.module.scss";
import style from "./Estates.module.scss";

export const Estates = () => {
	const estateData = useEstateData();
	const estateImages = useEstateImageRelData();
	const estateType = useEstateTypeData();
	const [selectedType, setSelectedType] = useState();
	const [selectedSort, setSelectedSort] = useState("");

	// Funktion til at finde image relateret til hver estate
	const getImageForEstate = (estateId) => {
		const imageRel = estateImages.find((image) => image.estate_id === estateId);
		return imageRel?.images?.image_url || ""; //Returnere img url eller en tom streng hvis der ikke var et billede
	};

	// Funktion til håndtering af sortering
	const handleSortChange = (e) => {
		const sortValue = e.target.value;
		setSelectedSort(sortValue);
	};

	// Funktion til håndtering af valg af ejendomstype
	const handleTypeChange = (e) => {
		setSelectedType(e.target.value); // Opdaterer den valgte type
	};

	// Kombineret filtrerings- og sorteringsfunktion
	const getFilteredAndSortedEstates = () => {
		let filtered = [...estateData];

		// Filtrer ejendomme baseret på den valgte type
		if (selectedType) {
			filtered = filtered.filter(
				(estate) => estate.estate_types.id === parseInt(selectedType)
			);
		}

		// Sorter de filtrerede ejendomme
		switch (selectedSort) {
			case "price-asc":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-desc":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "floor_space":
				filtered.sort((a, b) => b.floor_space - a.floor_space);
				break;
			case "listed_time":
				filtered.sort(
					(a, b) => new Date(b.created_at) - new Date(a.created_at)
				);
				break;
			default:
				break;
		}

		return filtered;
	};

	const estatesToDisplay = getFilteredAndSortedEstates();

	return (
		<PageWrapper title={"Til salg"}>
			<div className={style.estateWrapper}>
				<h1 className={globalStyle.title}>Boliger til salg</h1>
				<div className={style.selectWrapper}>
					{/* Sorteringsmulighed */}
					<select
						name="estateType"
						id="estateType"
						value={selectedType}
						onChange={handleTypeChange}>
						<option value="" disabled>
							Sorter
						</option>
						{estateType &&
							estateType.map((type, index) => {
								return (
									<React.Fragment key={index}>
										<option value={type.id}>{type.name}</option>
									</React.Fragment>
								);
							})}
					</select>

					<select
						name=""
						id=""
						value={selectedSort}
						onChange={handleSortChange}>
						<option value="" disabled>
							Filtrer
						</option>
						<option value="price-asc">Pris - stigende</option>
						<option value="price-desc">Pris - faldende</option>
						<option value="floor_space">Antal kvadratmeter</option>
						<option value="listed_time">Liggetid</option>
					</select>
				</div>
				<section className={style.estateCard}>
					{/* Viser de filtrerede og sorterede ejendomme */}
					{estatesToDisplay && estatesToDisplay.length > 0 ? (
						estatesToDisplay.map((estate) => (
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
						))
					) : (
						// Hvis der ikke er et match, vises dette
						<p>Der er ingen boliger, der matcher din søgning</p>
					)}
				</section>
			</div>
		</PageWrapper>
	);
};
