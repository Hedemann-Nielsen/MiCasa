import ReactModal from "react-modal";
import "../../Styles/GlobalStyles.module.scss";

ReactModal.setAppElement("#root"); // Sættes for at sikre, at skærmlæsere ikke ser hovedindholdet(indholdet bag modalen), mens modalen er åben.

export function EditCommentModal({ isOpen, onRequestClose, children }) {
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
