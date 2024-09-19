import { IoCloseSharp } from "react-icons/io5";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./ReviewSection.module.scss";

export const ReviewSection = ({
	openReviewForm,
	closeReviewForm,
	isReviewFormVisible,
}) => {
	return (
		<section className={style.writeReview}>
			<button
				className={`${style.reviewBtn} ${
					isReviewFormVisible ? style.active : ""
				}`}
				onClick={openReviewForm}>
				Skriv en anmeldelse
			</button>
			<div
				className={`${style.writeReviewContent} ${
					isReviewFormVisible ? style.show : ""
				}`}>
				<form>
					<div className={style.closeIcsonWrapper} onClick={closeReviewForm}>
						<IoCloseSharp />
					</div>
					<div className={style.inputWrapper}>
						<label htmlFor="name">Dit navn:</label>
						<input type="text" placeholder="Indtast dit navn" />
					</div>
					<div className={style.inputWrapper}>
						<label htmlFor="email">Din email::</label>
						<input type="email" placeholder="Indtast din email" />
					</div>
					<div className={style.inputWrapper}>
						<label htmlFor="comment">Kommentar:</label>
						<textarea
							name="comment"
							placeholder="Skriv en kommentar"></textarea>
					</div>
					<div className={globalStyle.btnWrapper}>
						<button className={globalStyle.styledBtn}>Send</button>
					</div>
				</form>
			</div>
		</section>
	);
};
