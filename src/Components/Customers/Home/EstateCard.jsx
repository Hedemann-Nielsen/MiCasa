import style from "./EstateCard.module.scss";

export const EstateCard = ({
	image,
	address,
	city,
	zipcode,
	type,
	rooms,
	floorSpace,
	energyLabel,
	price,
}) => {
	const formattedPrice = price.toLocaleString("da-DK");

	return (
		<div className={style.card}>
			<figure>
				<img src={image} alt={address} />
				<figcaption>
					<div className={style.estateHighlights}>
						<div>
							<p className={style.address}>{address}</p>
							<p>
								{city} {zipcode}
							</p>
							<p>{type}</p>
							<p>
								{rooms} værelser, {floorSpace} m²
							</p>
						</div>
						<div className={style.energyLabel}>{energyLabel}</div>
					</div>
					<p className={style.estatePrice}>{formattedPrice} DKK</p>
				</figcaption>
			</figure>
		</div>
	);
};
