import React, { useEffect, useState } from "react";
import style from "./CookieBanner.module.scss";
import globalStyle from "../..//Styles/GlobalStyles.module.scss";

//cookieBanner uden google analytics. Vises hvis brugeren ikke har taget stilling tidligere. Brugeren kan acceptere eller afvise cookies, valget gemmes i localStorage

export const CookieBanner = () => {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem("cookies")) {
			setShowBanner(true);
		}
	}, []);

	const cookieOK = () => {
		localStorage.setItem("cookies", true);
		setShowBanner(false);
	};

	const cookieDeny = () => {
		localStorage.setItem("cookies", false);
		setShowBanner(false);
	};

	return (
		<>
			{showBanner && (
				<div className={style.bannerWrapper}>
					<section className={style.banner}>
						<h3>Cookie Meddelelse:</h3>
						<p>
							Vi bruger cookies til at tilpasse indhold og annoncer, tilbyde en
							hurtigere og bedre tingængelig side. Er det okay med dig?
						</p>
						<button onClick={cookieOK} className={globalStyle.styledButton}>
							Ja
						</button>
						<button onClick={cookieDeny} className={globalStyle.styledButton}>
							Nej
						</button>
					</section>
				</div>
			)}
		</>
	);
};
