import { useState, useEffect } from "react";
import { useSupabase } from "../../../Providers/SupabaseProvider";
import { useAuth } from "../../../Providers/AuthProvider";
import { useCommentsData } from "../../Hooks/CommentsData";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { EditCommentModal } from "../../Modal/EditCommentModal";
import { NotLogedin } from "./NotLogedin";
import { ChangePassword } from "./ChangePassword";
import { useClearMessageHandler } from "../../Utils/ClearMessages";
import { CommentsTable } from "./CommentsTable";
import { LogoutButton } from "./LogoutButton";
import { CommentForm } from "./CommentForm";

import style from "./Login.module.scss";

export const Login = () => {
	const { supabase } = useSupabase();
	const { loginData, setLoginData } = useAuth();
	const [selectedComment, setSelectedComment] = useState(null); // State til valgte kommentar
	const [isModalOpen, setIsModalOpen] = useState(false); // State til at styre modalens synlighed
	const { commentsData, fetchComments } = useCommentsData({
		userId: loginData?.user?.id,
	});

	const { setErrorMessage, setSuccessMessage, clearMessages } =
		useClearMessageHandler();

	// Funktion til at redigere kommentar
	const handleEditComment = (comment) => {
		setSelectedComment(comment);
		setIsModalOpen(true);
	};

	// Post til at gemme det redigerede
	const PosthandleSave = async (updatedComment) => {
		try {
			const { data, error } = await supabase
				.from("user_comments")
				.update({
					title: updatedComment.title,
					comment: updatedComment.comment,
				})
				.eq("id", updatedComment.id);

			if (error) {
				setErrorMessage("Fejl ved opdatering af kommentaren");
				console.error("Error updating comment:", error);
			} else {
				setSuccessMessage("Kommentaren blev opdateret");
				clearMessages();
				setSelectedComment(null);
				setIsModalOpen(false);
				fetchComments();
			}
		} catch (error) {
			setErrorMessage("Fejl ved opdatering af kommentaren");
			console.error("Error updating comment:", error.message);
		}
	};

	// Funktion til at slette kommentar
	const handleDeleteComment = async (comment) => {
		try {
			const { data, error } = await supabase
				.from("user_comments")
				.delete()
				.eq("id", comment.id);
			if (error) {
				throw error;
			} else {
				setSuccessMessage("Kommentaren blev slettet");
				clearMessages();
				alert("Kommentaren er slettet");
				fetchComments();
			}
		} catch (error) {
			setErrorMessage("Fejl ved sletning af kommentar");
			console.error("Error deleting comment:", error);
		}
	};

	// Funktion som håndtere log ud ved hjælp af supabase
	const handleLogout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			setLoginData("");
			sessionStorage.removeItem("supabase.auth.token");
			if (error) throw error;
		} catch (error) {
			console.error("Error logging out:", error.message);
		}
	};

	useEffect(() => {
		document.title = loginData ? "Velkommen" : "Login";
	}, [loginData]);

	const handleFormSubmit = (data) => {
		PosthandleSave({
			...selectedComment,
			title: data.title,
			comment: data.comment,
		});
	};

	return (
		<>
			{!loginData ? (
				<PageWrapper title="Login">
					<NotLogedin />
				</PageWrapper>
			) : (
				<PageWrapper title="Min side">
					<div className={style.loginWrapper}>
						<h2 className={style.subtitle}>Mine kommentarer</h2>
						<CommentsTable
							commentsData={commentsData}
							handleEditComment={handleEditComment}
							handleDeleteComment={handleDeleteComment}
						/>
					</div>
					<LogoutButton handleLogout={handleLogout} />
					<ChangePassword />
					<EditCommentModal
						isOpen={isModalOpen}
						onRequestClose={() => setIsModalOpen(false)}>
						<CommentForm
							selectedComment={selectedComment}
							handleFormSubmit={handleFormSubmit}
							setIsModalOpen={setIsModalOpen}
						/>
					</EditCommentModal>
				</PageWrapper>
			)}
		</>
	);
};
