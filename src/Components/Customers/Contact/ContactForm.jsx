import { FaStarOfLife } from "react-icons/fa";

import globalStyle from "../../../Styles/Globalstyles.module.scss";
import style from "./Contact.module.scss";

export const ContactForm = ({
	employees,
	handleSendMessage,
	register,
	errors,
	message,
}) => {
	return (
		<form className={style.form} onSubmit={handleSendMessage}>
			<div className={style.inputWrapper}>
				<label htmlFor="name">
					Navn:
					<span className={style.requiredStar}>
						<FaStarOfLife />
					</span>
				</label>
				<input
					type="text"
					name="name"
					placeholder="Indtast dit navn"
					className={`${globalStyle.input} ${
						errors.name ? globalStyle.errorInput : ""
					}`}
					{...register("name", { required: "Navn er påkrævet" })}
					autoComplete="name"
				/>
			</div>
			{errors.name && (
				<span className={globalStyle.errorMessage}>{errors.name.message}</span>
			)}

			<div className={style.inputWrapper}>
				<label htmlFor="email">
					Email:
					<span className={style.requiredStar}>
						<FaStarOfLife />
					</span>
				</label>
				<input
					type="email"
					placeholder="Indtast din email"
					className={`${globalStyle.input} ${
						errors.email ? globalStyle.errorInput : ""
					}`}
					{...register("email", {
						required: "Email er påkrævet",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Ugyldig emailadresse",
						},
					})}
					autoComplete="email"
				/>
			</div>
			{errors.email && (
				<span className={globalStyle.errorMessage}>{errors.email.message}</span>
			)}

			<div className={style.inputWrapper}>
				<label htmlFor="employee">
					Medarbejder:
					<span className={style.requiredStar}>
						<FaStarOfLife />
					</span>
				</label>
				<select
					name="employees"
					defaultValue="1"
					{...register("employee", {
						required: "Du skal vælge en medarbejder",
					})}>
					<option value="" selected disabled>
						Vælg en medarbejder
					</option>
					{employees.map((employee) => (
						<option value={employee.id} key={employee.id}>
							{employee.firstname} {employee.lastname}
						</option>
					))}
				</select>
			</div>
			{errors.employee && (
				<span className={globalStyle.errorMessage}>
					{errors.employee.message}
				</span>
			)}

			<div className={style.inputWrapper}>
				<label htmlFor="message">
					Besked:
					<span className={style.requiredStar}>
						<FaStarOfLife />
					</span>
				</label>
				<textarea
					placeholder="Skriv en besked"
					name="message"
					className={`${globalStyle.input} ${
						errors.message ? globalStyle.errorInput : ""
					}`}
					{...register("message", { required: "Besked er påkrævet" })}
					autoComplete="message"
				/>
			</div>
			{errors.message && (
				<span className={globalStyle.errorMessage}>
					{errors.message.message}
				</span>
			)}

			<div className={globalStyle.btnWrapper}>
				<button type="submit" className={globalStyle.styledBtn}>
					Send
				</button>
			</div>

			{message && <p className={globalStyle.message}>{message}</p>}
		</form>
	);
};
