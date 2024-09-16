import { useForm } from "react-hook-form";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";

export const CommentForm = ({
	selectedComment,
	handleFormSubmit,
	setIsModalOpen,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: selectedComment ? selectedComment.title : "",
			comment: selectedComment ? selectedComment.comment : "",
		},
	});

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className={globalStyle.ModalForm}>
			<h2 className={globalStyle.subtitle}>Ændre din kommentar</h2>
			<input
				className={`${globalStyle.inputCenter} ${
					errors.title ? globalStyle.errorInput : ""
				}`}
				type="text"
				placeholder="skriv ny title"
				{...register("title", { required: "Titel er påkrævet" })}
			/>
			{errors.title && (
				<span className={globalStyle.errorMessage}>{errors.title.message}</span>
			)}
			<input
				className={`${globalStyle.inputCenter} ${
					errors.comment ? globalStyle.errorInput : ""
				}`}
				type="text"
				placeholder="Skriv ny kommentar"
				{...register("comment", { required: "Kommentar er påkrævet" })}
			/>
			{errors.comment && (
				<span className={globalStyle.errorMessage}>
					{errors.comment.message}
				</span>
			)}
			<div className={style.buttonContainer}>
				<button className={globalStyle.styledButton} type="submit">
					Gem
				</button>
				<button
					className={globalStyle.styledButton}
					type="button"
					onClick={() => setIsModalOpen(false)}>
					Annuller
				</button>
			</div>
		</form>
	);
};
