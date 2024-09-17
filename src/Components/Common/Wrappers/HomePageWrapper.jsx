import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const HomePageWrapper = ({ title, children }) => {
	// Sætter page title
	document.title = title;

	return <section className={globalStyle.HomePageWrapper}>{children}</section>;
};
