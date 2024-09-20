import { NavLink } from "react-router-dom";
import { MenuData } from "../../Static/MenuData.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../../Modal/Modal.jsx";
import { useSupabase } from "../../../Providers/SupabaseProvider";
import { useAuth } from "../../../Providers/AuthProvider.jsx";

import { CiAt } from "react-icons/ci";

import style from "./Footer.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const Footer = () => {
	const { supabase } = useSupabase();
	const loginData = useAuth();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [message, setMessage] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	//sender data til newsletter_emails tabellen og tilføjer den indtastede e-mail
	const PostOnSubmit = async (data) => {
		const { error } = await supabase
			.from(`newsletter_emails`)
			.insert([{ email: data.email }]);

		//setter en besked, hvis der opstår en fejl.
		if (error) {
			setMessage(`fejl ved indesendelse af email:` + error.message);
			//hvis data blev sendt korrek til api åbner en modal med besked og formularen resettes
		} else {
			setMessage(`e-mail indsendt succesfuldt!`);
			openModal();
			reset();
		}
	};

	const openModal = () => {
		setModalIsOpen(true);
		console.log("modal is open");
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};
	return (
		<footer className={style.footer}>
			<h1>MiCasa</h1>
			<div className={style.footerContainer}>
				<section>
					<p>Øster Uttrupvej 5</p>
					<p>9000 Aalborg</p>
					<div className={style.ContactWrapper}>
						<p>Email: info@homelands.dk</p>
						<p>Telefon: +45 1122 3344</p>
					</div>
				</section>
				<nav>
					<ul>
						{MenuData &&
							MenuData.map((menu) => {
								return (
									<li key={menu.id}>
										<NavLink to={menu.url}>{menu.title}</NavLink>
									</li>
								);
							})}
						<li className={style.menuLink}>
							{loginData.loginData ? (
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive ? style.activeLink : ""
									}>
									Min side
								</NavLink>
							) : (
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive ? style.activeLink : ""
									}>
									Login
								</NavLink>
							)}
						</li>
					</ul>
				</nav>
				<section className={style.rightSection}>
					<h3>Få drømmehuset i din indbakke</h3>
					<p>
						Tilmeld dig til vores nyhedsbrev og få nye <br /> boliger sendt
						direkte til din indbakke
					</p>
					<form
						onSubmit={handleSubmit(PostOnSubmit)}
						className={style.newsLetterWrapper}>
						<div className={style.ciAtWrapper}>
							<CiAt className={style.ciAt} />
						</div>
						<input
							className={`${globalStyle.input} ${
								errors.email ? globalStyle.errorInput : ""
							}`}
							type="text"
							placeholder="Indtast din email"
							{...register("email", {
								required: true,
								pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
							})}
						/>
						<button type="submit">Tilmeld</button>
					</form>
					<div>
						{errors.email && errors.email.type === "required" && (
							<span className={globalStyle.errorMessage}>
								Dette felt skal udfyldes
							</span>
						)}
						{errors.email && errors.email.type === "pattern" && (
							<span className={globalStyle.errorMessage}>
								Du skal indtaste en gyldig email
							</span>
						)}
					</div>
					{/* modal indhold */}
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						className="Modal"
						overlayClassName="Overlay">
						<div className={globalStyle.modalContent}>
							<h2 className={globalStyle.title}>Tak for din tilmelding</h2>
							<p className={globalStyle.text}>Du er nu tilmeldt nyhedsbrevet</p>
							<span className={globalStyle.btnWrapper}>
								<button onClick={closeModal} className={globalStyle.styledBtn}>
									Luk
								</button>
							</span>
						</div>
					</Modal>
				</section>
			</div>
		</footer>
	);
};
