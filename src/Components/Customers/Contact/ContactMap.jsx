import style from "./Contact.module.scss";

export const ContactMap = () => {
	return (
		<div className={style.cart}>
			<iframe
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2170.2112684775025!2d9.964887876742258!3d57.04792317359095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464932b6a2b7696b%3A0x861634f2bf524040!2s%C3%98ster%20Uttrup%20Vej%201%2C%209000%20Aalborg!5e0!3m2!1sda!2sdk!4v1724315316643!5m2!1sda!2sdk"
				width="100%"
				height="100%"></iframe>
		</div>
	);
};
