import { RatingStars } from "./StarRating/RatingStars.jsx";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import { useState } from "react";
import style from "./ReviewSection.module.scss";

export const ReviewSection = ({
	openReviewForm,
	closeReviewForm,
	isReviewFormVisible,
	handleMessage,
	reset,
	register,
	errors,
	message,
	loginData,
	handleRatingSelect,
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
				{loginData ? (
					<form onSubmit={handleMessage}>
						<div className={style.closeIcsonWrapper} onClick={closeReviewForm}>
							<IoCloseSharp />
						</div>
						<div className={style.inputWrapper}>
							<p>Din rating</p>
							<div className={style.stars}>
								<RatingStars onRatingSelect={handleRatingSelect} />{" "}
							</div>
						</div>
						<div className={style.inputWrapper}>
							<label htmlFor="name">Dit navn:</label>
							<input
								type="text"
								name="name"
								placeholder="Indtast dit navn"
								className={`${globalStyle.input} ${
									errors.name ? globalStyle.errorInput : ""
								}`}
								{...register("name", { required: "Navn er påkrævet" })}
							/>
						</div>
						<div className={style.errorMsgWrapper}>
							{errors.name && (
								<span className={globalStyle.errorMessage}>
									{errors.name.message}
								</span>
							)}
						</div>
						<div className={style.inputWrapper}>
							<label htmlFor="title">Overskrift:</label>
							<input
								type="text"
								name="title"
								placeholder="Indtast overskrift til anmeldse"
								className={`${globalStyle.input} ${
									errors.name ? globalStyle.errorInput : ""
								}`}
								{...register("title", { required: "Titel er påkrævet" })}
							/>
						</div>
						<div className={style.errorMsgWrapper}>
							{errors.title && (
								<span className={globalStyle.errorMessage}>
									{errors.title.message}
								</span>
							)}
						</div>
						<div className={style.inputWrapper}>
							<label htmlFor="comment">Anmeldse:</label>
							<textarea
								name="comment"
								placeholder="Skriv din anmeldse"
								className={`${globalStyle.input} ${
									errors.name ? globalStyle.errorInput : ""
								}`}
								{...register("comment", {
									required: "Anmeldse er påkrævet",
								})}></textarea>
						</div>
						<div className={style.errorMsgWrapper}>
							{errors.comment && (
								<span className={globalStyle.errorMessage}>
									{errors.comment.message}
								</span>
							)}
						</div>
						<div className={style.errorMsgWrapper}>
							{errors.message && (
								<span className={globalStyle.errorMessage}>
									{errors.message.message}
								</span>
							)}
						</div>
						<div className={globalStyle.btnWrapper}>
							<button className={globalStyle.styledBtn} onClick={handleMessage}>
								Send
							</button>
						</div>
					</form>
				) : (
					<section className={style.notLoggedIn}>
						<Link to="/login">
							Du skal være logget ind for at skrive en anmeldse. Gå til login.
						</Link>
					</section>
				)}
			</div>
		</section>
	);
};
