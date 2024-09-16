import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const LogoutButton = ({ handleLogout }) => {
	return (
		<div className={globalStyle.buttonContainer}>
			<button onClick={handleLogout} className={globalStyle.styledButton}>
				Log ud
			</button>
		</div>
	);
};
