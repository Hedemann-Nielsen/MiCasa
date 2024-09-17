import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";

export const LogoutButton = ({ handleLogout }) => {
	return (
		<div className={`${style.btnWrapper} ${globalStyle.btnWrapper}`}>
			<button onClick={handleLogout} className={globalStyle.styledBtn}>
				Log ud
			</button>
		</div>
	);
};
