import { MenuData } from "../../Static/MenuData.jsx";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useEstateData } from "../../Hooks/EstateData.jsx";

import logo from "../../../assets/logo/Logo.png";
import { FaSearch } from "react-icons/fa";

import style from "./Header.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const Header = () => {
	const [searchQuery, setSearchQuery] = useState(""); // State for the search query
	const estateData = useEstateData(); // Fetch estate data

	// Function det håndtere søge feltet
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Funktion der filtrere data fra fetchen baseret på forspørgslen
	const filteredEstates = estateData.filter((estate) => {
		const query = searchQuery.toLowerCase();

		// Konverter numeriske felter til strings for at matche søgeforespørgslen
		const price = estate.price?.toString() || "";
		const cost = estate.cost?.toString() || "";
		const payout = estate.payout?.toString() || "";
		const gross = estate.gross?.toString() || "";
		const net = estate.net?.toString() || "";
		const numRooms = estate.num_rooms?.toString() || "";

		return (
			estate.address.toLowerCase().includes(query) ||
			estate.cities?.name.toLowerCase().includes(query) ||
			estate.cities?.zipcode.toString().includes(query) ||
			estate.estate_types?.name.toLowerCase().includes(query) ||
			estate.energy_labels?.letter.toLowerCase().includes(query) ||
			price.includes(query) ||
			cost.includes(query) ||
			payout.includes(query) ||
			gross.includes(query) ||
			net.includes(query) ||
			numRooms.includes(query) ||
			estate.description.toLowerCase().includes(query)
		);
	});

	return (
		<>
			<header className={style.header}>
				<Link to="/home">
					<img src={logo} alt="logo" />
				</Link>
				<nav>
					<ul>
						{MenuData &&
							MenuData.map((menu) => {
								return (
									<li key={menu.id} className={style.menuLink}>
										<NavLink
											to={menu.url}
											className={({ isActive }) =>
												isActive ? style.activeLink : ""
											}>
											{menu.title}
										</NavLink>
									</li>
								);
							})}
						<div className={style.searchWrapper}>
							<div className={style.searchbarContent}>
								<input
									type="text"
									placeholder="indtast søgeord"
									className={style.input}
									value={searchQuery}
									onChange={handleSearchChange}
								/>
								<span className={style.faSearchWrapper}>
									<FaSearch className={style.FaSearch} />
								</span>
							</div>
							<div>
								{/* Viser det filtrerede søge data */}
								{searchQuery && (
									<div className={style.searchResults}>
										{filteredEstates.length > 0 ? (
											<ul>
												{filteredEstates.map((estate) => (
													<li key={estate.id} className={style.resultLine}>
														<Link to={`/til-salg/${estate.id}`}>
															{estate.address}, {estate.cities.name} -{" "}
															{estate.estate_types.name}
														</Link>
													</li>
												))}
											</ul>
										) : (
											<p>No results found.</p>
										)}
									</div>
								)}
							</div>
						</div>
					</ul>
				</nav>
			</header>
		</>
	);
};
