import style from "../ContactCard.module.scss";
import globalStyle from "../../../../Styles/Globalstyles.module.scss";

export const ContactCard = ({
	firstname,
	lastname,
	email,
	phone,
	position,
	image,
}) => {
	return (
		<section className={style.contactCard}>
			<h2 className={globalStyle.subtitle2}>Kontakt</h2>

			<img src={image} alt={`${firstname} ${lastname}`} />
			<p className={style.employeeName}>
				{firstname} {lastname}
			</p>
			<p>{position}</p>
			<p>Mobil: {phone}</p>
			<p>Email: {email}</p>
		</section>
	);
};
