import ReactModal from "react-modal";
import "../../App.scss";

ReactModal.setAppElement("#root"); // Sættes for at sikre, at skærmlæsere ikke ser hovedindholdet(indholdet bag modalen), mens modalen er åben.

export function NewsletterModal({ isOpen, onRequestClose, children }) {
	return (
		<ReactModal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="Modal"
			className="modal"
			overlayClassName="overlay">
			{children}
		</ReactModal>
	);
}
