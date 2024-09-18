import { useClearMessageHandler } from "../../Utils/ClearMessages.jsx";
import { useSupabase } from "../../../Providers/SupabaseProvider.jsx";
import { useForm } from "react-hook-form";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";

export const ChangePassword = () => {
	const { supabase } = useSupabase();
	const {
		errorMessage,
		successMessage,
		setErrorMessage,
		setSuccessMessage,
		clearMessages,
	} = useClearMessageHandler();
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	// Funktion som håndtere ændring af password ved hjælp af supabase
	const handleChangePassword = async ({ newPassword, confirmNewPassword }) => {
		//hvis newPassword og confirmNewPassword ikke matcher, vises der et error besked
		if (newPassword !== confirmNewPassword) {
			setErrorMessage("Nyt password og bekræft password er ikke ens");
			return;
		}

		try {
			clearMessages();
			const { user, error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			// Hvis der opstår en fejl under opdatering af password vises en fejlbesked og fejlen logges i konsolen
			if (error) {
				setErrorMessage(error.message);
				console.error("Error changing password:", error);
				clearMessages();
			} else {
				//hvis passwordskiftet lykkedes sættes der et en succes besked og beskeden logges i konsolen med brugerens information.

				setSuccessMessage("Password er ændret");
				clearMessages();
				console.log("Password changed successfully for user:", user);
			}
			// Hvis der opstår en fejl i try-blokken, vises en fejlbesked og fejlen logges i konsollen		} catch (error) {
		} catch (error) {
			setErrorMessage(error.message); // Set error message
			clearMessages();
			console.error("Error changing password:", error.message);
		}
	};

	return (
		<div className={style.passwordWrapper}>
			<h2 className={globalStyle.title}>Skift Password</h2>
			{/* Når der trykkes på knappen (password) kaldes handleChangePassword funktionen */}
			<form
				className={style.form}
				onSubmit={handleSubmit(handleChangePassword)}>
				<input
					className={`${globalStyle.input} ${
						errors.confirmNewPassword ? globalStyle.errorInput : ""
					}`}
					type="password"
					placeholder="Nyt password"
					name="newPassword"
					{...register("newPassword", {
						required: "Nyt password er påkrævet",
						minLength: {
							value: 6,
							message: "Password skal være mindst 6 tegn langt",
						},
					})}
					autoComplete="newPassword"
				/>
				{errors.newPassword && (
					<span className={globalStyle.errorMessage}>
						{errors.newPassword.message}
					</span>
				)}
				<input
					className={`${globalStyle.input} ${
						errors.confirmNewPassword ? globalStyle.errorInput : ""
					}`}
					type="password"
					placeholder="Bekræft nyt password"
					name="confirmPassword"
					{...register("confirmNewPassword", {
						required: "Bekræft password er påkrævet",
						validate: (value) =>
							value === watch("newPassword") ||
							"Nyt password og bekræft password er ikke ens",
					})}
					autoComplete="confirmPassword"
				/>
				{errors.confirmNewPassword && (
					<span className={globalStyle.errorMessage}>
						{errors.confirmNewPassword.message}
					</span>
				)}
				{errorMessage && (
					<span className={globalStyle.errorMessage}>{errorMessage}</span>
				)}
				{successMessage && (
					<span className={globalStyle.successMessage}>{successMessage}</span>
				)}
				<div className={`${style.btnWrapper} ${globalStyle.btnWrapper}`}>
					<button className={globalStyle.styledBtn} type="submit">
						Skift Password
					</button>
				</div>
			</form>
		</div>
	);
};
