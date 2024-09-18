import { useForm } from "react-hook-form";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./CommentForm.module.scss";

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
		//modal indhold til ændring af kommentar
		<form onSubmit={handleSubmit(handleFormSubmit)} className={style.ModalForm}>
			<h1 className={globalStyle.title}>Ændre din kommentar</h1>

			<p className={globalStyle.text}>Din nuverende kommentar</p>
			<h3 className={globalStyle.subtitle4}>
				{selectedComment?.title} <span>(overskrift kan ikke ændres)</span>
			</h3>
			<p>{selectedComment?.content}</p>
			<textarea
				className={`${style.inputCenter} ${
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
			<div className={`${style.btnWrapper} ${globalStyle.btnWrapper}`}>
				<button className={globalStyle.styledBtn} type="submit">
					Gem
				</button>
				<button
					className={`${style.cancelBtn} ${globalStyle.styledBtn}`}
					type="button"
					onClick={() => setIsModalOpen(false)}>
					Annuller
				</button>
			</div>
		</form>
	);
};
