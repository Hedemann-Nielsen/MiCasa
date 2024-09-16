import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useState } from "react";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";
import { useSupabase } from "../../../Providers/SupabaseProvider";

export const NotLogedin = () => {
	const { supabase } = useSupabase();
	const { loginData, setLoginData } = useAuth();
	const location = useLocation();
	const [errorMessage, setErrorMessage] = useState(""); // State til error message

	const userCreatedMessage = location.state?.userCreatedMessage;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Asynkron funktion der håndterer login-processen
	const handleLogin = async ({ email, password }) => {
		// Forsøger at logge ind med den angivne email og adgangskode ved hjælp af Supabase
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		// Hvis der opstår en fejl under login, logges fejlen til konsollen
		if (error) {
			console.error("Error logging in:", error);

			//ændre fejlbeskeden hvis den indeholder"Invalid login credentials" til at være en meddelse på dansk
			if (error.message.includes("Invalid login credentials")) {
				setErrorMessage("Brugernavn eller password er ikke korrekt");
			} else {
				setErrorMessage(error.message);
			}

			clearMessages();
		} else {
			// Hvis login er succesfuldt, gemmes autentificeringstoken i sessionStorage og loginData opdateres med brugerdata
			sessionStorage.setItem("supabase.auth.token", JSON.stringify(data));
			setLoginData(data);
		}
	};

	return (
		<div className={style.loginWrapper}>
			{userCreatedMessage && (
				<div className={globalStyle.successMessage}>{userCreatedMessage}</div>
			)}
			<p>Indtast brugernavn og password for at logge ind.</p>
			{/* Når der klikkes på submit (login knappen) vil handleLogin blive kaldt */}
			<form className={style.form} onSubmit={handleSubmit(handleLogin)}>
				<input
					className={`${globalStyle.input} ${
						errors.email ? globalStyle.errorInput : ""
					}`}
					type="email"
					placeholder="e-mail"
					{...register("email", { required: "Email er påkrævet" })}
				/>
				{errors.email && (
					<span className={globalStyle.errorMessage}>
						{errors.email.message}
					</span>
				)}
				<input
					className={`${globalStyle.input} ${
						errors.password ? globalStyle.errorInput : ""
					}`}
					type="password"
					placeholder="password"
					{...register("password", { required: "Password er påkrævet" })}
				/>
				{errors.password && (
					<span className={globalStyle.errorMessage}>
						{errors.password.message}
					</span>
				)}
				{errorMessage && (
					<span className={globalStyle.errorMessage}>{errorMessage}</span>
				)}
				<div className={style.buttonContainer}>
					<button className={globalStyle.styledButton} type="submit">
						Login
					</button>
				</div>

				<div className={style.link}>
					{/* sender brugeren videre til en ny side  */}
					<Link to="/login/createUser">Opret mig som bruger</Link>
				</div>
			</form>
		</div>
	);
};
