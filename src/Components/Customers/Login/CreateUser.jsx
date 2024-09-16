import { useForm } from "react-hook-form";
import { useSupabase } from "../../../Providers/SupabaseProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";

export const CreateUser = () => {
	const { supabase } = useSupabase();
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	//tjekker om password og confirmPassword er det samme, hvis de er ens kan opret bruger køre
	const onSubmit = (data) => {
		const { password, confirmPassword, email } = data;
		if (password !== confirmPassword) {
			console.error("Passwords matcher ikke");
			return;
		}
		handleCreateUser({ password, email });
	};

	//opret bruger
	const handleCreateUser = async ({ password, email }) => {
		try {
			const { data, error } = await supabase.auth.signUp({
				password,
				email,
			});
			if (error) {
				setErrorMessage("Der opstod en fejl: " + error.message);
				console.error("Kunne ikke oprette bruger:", error);
			} else {
				console.log("Bruger oprettet:", data);
				sessionStorage.setItem("supabase.auth.token", JSON.stringify(data));
				navigate("/login", {
					state: {
						userCreatedMessage: "Brugeren blev oprettet, du kan nu logge ind.",
					},
				});
			}
		} catch (error) {
			setErrorMessage("Der opstod en fejl: " + error.message);
			console.error("Der opstod en fejl:", error);
		}
	};

	return (
		<PageWrapper title="Opret bruger">
			<form className={style.createUser} onSubmit={handleSubmit(onSubmit)}>
				<input
					className={globalStyle.input}
					type="email"
					placeholder="Email"
					{...register("email", { required: true })}
				/>
				{errors.email && (
					<span className={globalStyle.errorMessage}>
						Dette felt er påkrævet
					</span>
				)}

				<input
					className={globalStyle.input}
					type="password"
					placeholder="Password"
					{...register("password", { required: true })}
				/>
				{errors.password && (
					<span className={globalStyle.errorMessage}>
						Dette felt er påkrævet
					</span>
				)}
				<input
					className={globalStyle.input}
					type="password"
					placeholder="Bekræft Password"
					{...register("confirmPassword", { required: true })}
				/>
				{errors.password && (
					<span className={globalStyle.errorMessage}>
						Dette felt er påkrævet
					</span>
				)}
				<div>
					{errorMessage && (
						<span className={globalStyle.errorMessage}>{errorMessage}</span>
					)}
				</div>

				<button type="submit" className={globalStyle.styledButton}>
					Opret bruger
				</button>
			</form>
		</PageWrapper>
	);
};
