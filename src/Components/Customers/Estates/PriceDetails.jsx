import dayjs from "dayjs";

console.log({ dayjs });

import style from "./EstateDetails.module.scss";

export const PriceDetails = ({
	estate,
	formattedCashPrice,
	formattedPayoutPrice,
	formattedBruttoPrice,
	formattedNetPrice,
	formattedCostPrice,
}) => {
	// Beregn liggetid
	const calculateDaysOnMarket = (createdAt) => {
		// Konverter createdAt til dayjs objekt
		const createdDate = dayjs(createdAt);
		// Få den nuværende dato
		const today = dayjs();
		// Beregn forskellen i dage
		return today.diff(createdDate, "day");
	};

	return (
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
					<p>{calculateDaysOnMarket(estate.created_at)} dage</p>
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
	);
};
