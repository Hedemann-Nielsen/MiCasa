import { useState } from "react";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { useEmployeesDatas } from "../../Hooks/EmployeesData";
import { useContactMessage } from "../../Hooks/ContactMessageInsert";
import { ContactMap } from "./ContactMap";
import { ContactForm } from "./ContactForm";

import globalStyle from "../../../Styles/Globalstyles.module.scss";
import style from "./Contact.module.scss";
import { useForm } from "react-hook-form";
import { MessageSentModal } from "../../Modal/MessageSentModal";

export const Contact = () => {
	const employees = useEmployeesDatas();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [message, setMessage] = useState("");
	const { updateContactMessage } = useContactMessage();
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalMessage1, setModalMessage1] = useState("");
	const [modalMessage2, setModalMessage2] = useState("");

	const handleSendMessage = async (formData) => {
		const response = await updateContactMessage(formData);

		if (response.success) {
			const selectedEmployee = employees.find(
				(e) => e.id === parseInt(formData.employee)
			);
			setModalMessage1(
				`
Din besked er sendt til ${selectedEmployee.firstname} ${selectedEmployee.lastname}.`
			);
			setModalMessage2(
				`Du vil modtage svar på ${formData.email} hurtigst muligt.`
			);
			setShowModal(true); // Åbn modalen
			reset();
		} else {
			setMessage(response.message);
		}
	};
	const setShowModal = () => {
		setModalIsOpen(true);
		console.log("modal is open");
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};
	return (
		<PageWrapper title="Kontakt os">
			<h1 className={globalStyle.title}>Kontakt</h1>
			<div className={style.contact}>
				<ContactForm
					employees={employees}
					handleSendMessage={handleSubmit(handleSendMessage)}
					reset={reset}
					register={register}
					errors={errors}
					message={message}
				/>
				<ContactMap />
			</div>
			{/* modal indhold */}
			<MessageSentModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className="Modal"
				overlayClassName="Overlay">
				<div className={globalStyle.modalContent}>
					<h2 className={globalStyle.title}>Tak for din besked</h2>
					<p className={globalStyle.text}> {modalMessage1}</p>
					<p className={globalStyle.text}> {modalMessage2}</p>

					<button onClick={closeModal} className={globalStyle.styledBtn}>
						Luk
					</button>
				</div>
			</MessageSentModal>
		</PageWrapper>
	);
};
