import { Outlet, useLocation } from "react-router-dom";
import { CookieBanner } from "../CookieBanner/CookieBanner.jsx";
import { Footer } from "../Common/Footer/Footer.jsx";
import { Header } from "../Common/Header/Header.jsx";
// import { SupNavigation } from "../Common/SupNavigation/SupNavigation.jsx";
// import { MobileSupNavigation } from "../Common/SupNavigation/MobileSupNavigation.jsx";
import { InnerWrapper } from "../Common/Wrappers/InnerWrapper.jsx";
import { useResizeHandler } from "../Common/ResizeHandler/ResizeHandler.jsx";

export const Layout = () => {
	const { width } = useResizeHandler();
	// console.log(width);

	return (
		<>
			<Header />
			{/* tjekker om viduetsstørrelse er under 768px, hvis den er det vises mobil	navigation, hvis den er over vises default subnavigatio  */}
			{/* {width <= 768 ? <MobileSupNavigation /> : <SupNavigation />} */}
			<InnerWrapper>
				<Outlet />
			</InnerWrapper>
			{/* cookie banneret vises kun på siden, hvis der ikke er registreret om cookies må gemmes eller ej i localStorage */}
			<CookieBanner />
			<Footer />
		</>
	);
};
