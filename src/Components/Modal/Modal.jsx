import ReactModal from "react-modal";
import globalStyles from "../../Styles/GlobalStyles.module.scss";

ReactModal.setAppElement("#root"); // Sættes for at sikre, at skærmlæsere ikke ser hovedindholdet(indholdet bag modalen), mens modalen er åben.

export function Modal({ isOpen, onRequestClose, children }) {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Modal"
			className={globalStyles.modal}
			overlayClassName={globalStyles.overlay}>
			{children}
		</ReactModal>
	);
}
