import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { MenuData } from "../../Static/MenuData.jsx";
import { useEstateData } from "../../Hooks/EstateData.jsx";
import { SearchQuery } from "./searchQuery.jsx";
import { useAuth } from "../../../Providers/AuthProvider.jsx";

import logo from "../../../assets/logo/Logo.webp";
import { FaSearch } from "react-icons/fa";

import style from "./MobilHeader.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const MobilHeader = () => {
	const loginData = useAuth();
	const estateData = useEstateData();
	const [isOpen, setOpen] = useState(false);
	const [userName, setUserName] = useState();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (loginData) {
			const user = loginData?.loginData?.user?.email.split("@")[0];
			setUserName(user);
		}
	}, [loginData]);
	const handleMenuClick = () => {
		setOpen(false);
	};

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
		<header className={style.mobilHeader}>
			<Link to="/home">
				<img src={logo} alt="logo" />
			</Link>
			{/* brugermenu fra react npm pakke */}

			<Hamburger
				toggled={isOpen}
				toggle={setOpen}
				rounded
				direction="right"
				color="#fff"
			/>

			<section
				className={`${style.navMobilMenu} ${isOpen && style.activeMobil}`}>
				<div>
					<span>
						<h1 className={`${style.title} ${globalStyle.title}`}>MiCasa</h1>
						<Hamburger
							toggled={isOpen}
							toggle={setOpen}
							rounded
							direction="right"
							color="#fff"
						/>
					</span>
					<ul>
						<li>
							{loginData.loginData ? (
								<p className={style.user}>velkommen {userName}</p>
							) : (
								<span></span>
							)}

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
						</li>
						{MenuData &&
							MenuData.map((menu) => {
								return (
									<li key={menu.id}>
										<NavLink
											to={menu.url}
											className={style.navText}
											onClick={handleMenuClick}>
											{menu.title}
										</NavLink>
									</li>
								);
							})}
						<li>
							{loginData.loginData ? (
								<NavLink
									to="/login"
									className={style.navText}
									onClick={handleMenuClick}>
									Min side
								</NavLink>
							) : (
								<NavLink
									to="/login"
									className={style.navText}
									onClick={handleMenuClick}>
									Login
								</NavLink>
							)}
						</li>
					</ul>
				</div>
			</section>
		</header>
	);
};
