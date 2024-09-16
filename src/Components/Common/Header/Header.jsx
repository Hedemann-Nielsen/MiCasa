import { MenuData } from "../../Static/MenuData.jsx";
import { NavLink, Link } from "react-router-dom";

import logo from "../../../assets/logo/Logo.png";
import { FaSearch } from "react-icons/fa";

import style from "./Header.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const Header = () => {
	return (
		<header className={style.header}>
			<Link to="/home">
				<img src={logo} alt="logo" />
			</Link>
			<nav>
				<ul>
					{MenuData &&
						MenuData.map((menu) => {
							return (
								<li key={menu.id}>
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
					<li className={style.searchWrapper}>
						<input
							type="text"
							placeholder="indtast søgeord"
							// className={globalStyle.input}
						/>
						<div className={style.FaSearchWrapper}>
							<FaSearch className={style.FaSearch} />
						</div>
					</li>
				</ul>
			</nav>
		</header>
	);
};
