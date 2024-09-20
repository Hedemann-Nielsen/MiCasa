import { Link } from "react-router-dom";
import style from "./MobilHeader.module.scss";

export const SearchQuery = ({ searchQuery, filteredEstates }) => {
	return (
		<div>
			{/* Viser det filtrerede søge data */}
			{searchQuery && (
				<div className={style.searchResults}>
					{filteredEstates.length > 0 ? (
						<ul>
							{filteredEstates.map((estate) => (
								<li key={estate.id} className={style.resultLine}>
									<Link to={`/til-salg/${estate.id}`}>{estate.address}</Link>
								</li>
							))}
						</ul>
					) : (
						<p>Ingen boliger matcher din søgning</p>
					)}
				</div>
			)}
		</div>
	);
};
