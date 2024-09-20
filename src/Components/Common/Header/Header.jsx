import { MenuData } from "../../Static/MenuData.jsx";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { useAuth } from "../../../Providers/AuthProvider.jsx";
import { SearchQuery } from "./searchQuery.jsx";

import logo from "../../../assets/logo/Logo.png";
import { FaSearch } from "react-icons/fa";

import style from "./Header.module.scss";

export const Header = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const estateData = useEstateData();
	const loginData = useAuth();
	const [userName, setUserName] = useState();

	useEffect(() => {
		if (loginData) {
			const user = loginData?.loginData?.user?.email.split("@")[0];
			setUserName(user);
		}
	}, [loginData]);

	// Function det håndtere søge feltet og opdatere med den aktuelle værdi
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// Funktion der filtrere data fra fetchen baseret på forspørgslen
	const filteredEstates = estateData.filter((estate) => {
		//starter med at ændre alt til små bogstaver, for at kunne matche søøgningen
		const query = searchQuery.toLowerCase();

		//går igennem disse felter og checker om der er et match med værdien fra søgefeltet og returnere dataen til
		return (
			estate.address.toLowerCase().includes(query) ||
			estate.cities?.name.toLowerCase().includes(query) ||
			estate.cities?.zipcode.toString().includes(query) ||
			estate.description.toLowerCase().includes(query)
		);
	});

	return (
		<>
			<header className={style.header}>
				<Link to="/home">
					<img src={logo} alt="logo" />
				</Link>
				<div className={style.headerRight}>
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
							<li className={style.menuLink}>
								{loginData ? (
									<NavLink
										to="/login"
										className={({ isActive }) =>
											isActive ? style.activeLink : ""
										}>
										Min side
									</NavLink>
								) : (
									<NavLink
										to="/login"
										className={({ isActive }) =>
											isActive ? style.activeLink : ""
										}>
										Login
									</NavLink>
								)}
							</li>

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
								<SearchQuery
									searchQuery={searchQuery}
									estateData={estateData}
									filteredEstates={filteredEstates}
								/>
							</div>
						</ul>
					</nav>
					<div className={style.loginName}>
						{loginData ? <p>Du er logget ind som: {userName}</p> : ""}
					</div>
				</div>
			</header>
		</>
	);
};
