import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Fallback.module.scss";

export const Fallback = () => {
	return (
		<div className={style.container}>
			<div className={style.background}>
				<h1>404</h1>
			</div>
			<div className={style.textWrapper}>
				<h2>Nothing to see here</h2>
				<p>
					Page you are trying to open does not exist. You may have mistyped the
					address, or the page has been moved to another URL.
					<p>If you think this is an error contact support.</p>
				</p>
				<div>
					<button className={globalStyle.styledButton}>
						Take me back to home page
					</button>
				</div>
			</div>
		</div>
	);
};
