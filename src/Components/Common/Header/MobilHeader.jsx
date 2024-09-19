import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade as Hamburger } from "hamburger-react";
import { MenuData } from "../../Static/MenuData.jsx";

import logo from "../../../assets/logo/Logo.png";
import style from "./MobilHeader.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import { useAuth } from "../../../Providers/AuthProvider.jsx";

export const MobilHeader = () => {
	const [isOpen, setOpen] = useState(false);
	const loginData = useAuth();
	const [userName, setUserName] = useState();

	useEffect(() => {
		if (loginData) {
			const user = loginData?.loginData?.user?.email.split("@")[0];
			setUserName(user);
		}
	}, [loginData]);
	const handleMenuClick = () => {
		setOpen(false);
	};
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
							<p className={style.user}>velkommen {userName}</p>
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
					</ul>
				</div>
			</section>
		</header>
	);
};
