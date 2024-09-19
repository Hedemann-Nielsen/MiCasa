import { useState, useEffect } from "react";
import { useSupabase } from "../../../Providers/SupabaseProvider";
import { useAuth } from "../../../Providers/AuthProvider";
import { useCommentsData } from "../../Hooks/CommentsData";
import { PageWrapper } from "../../Common/Wrappers/PageWrapper";
import { Modal } from "../../Modal/Modal";
import { NotLogedin } from "./NotLogedin";
import { ChangePassword } from "./ChangePassword";
import { useClearMessageHandler } from "../../Utils/ClearMessages";

import { CommentsTable } from "./CommentsTable";
import { LogoutButton } from "./LogoutButton";
import { CommentForm } from "./CommentForm";
import { LikesTable } from "./LikesTable";

import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";

export const Login = () => {
	const { supabase } = useSupabase();
	const { loginData, setLoginData } = useAuth();
	const [selectedComment, setSelectedComment] = useState(null); // State til valgte kommentar
	const [isModalOpen, setIsModalOpen] = useState(false); // State til at styre modalens synlighed
	const [user, setUser] = useState();
	const { commentsData, fetchComments } = useCommentsData({
		userId: loginData?.user?.id,
	});

	useEffect(() => {
		if (loginData?.user) {
			const userName = loginData.user.email.split("@")[0];
			setUser(userName);
		}
	}, [loginData]);

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
				.from("reviews")
				.update({
					title: updatedComment.title,
					content: updatedComment.comment,
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
	const handleDeleteComment = async (review) => {
		try {
			const { data, error } = await supabase
				.from("reviews")
				.delete()
				.eq("id", review.id);
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
				<PageWrapper>
					<NotLogedin />
				</PageWrapper>
			) : (
				<PageWrapper>
					<h1 className={globalStyle.title}>Din side</h1>
					<section className={style.mySite}>
						<div className={style.leftSite}>
							<div className={style.loginWrapper}>
								<h2 className={style.subtitle}>
									Administration af anmeldelser
								</h2>
								<CommentsTable
									commentsData={commentsData}
									handleEditComment={handleEditComment}
									handleDeleteComment={handleDeleteComment}
								/>
								<h2 className={style.subtitle}>Administration af likes</h2>
								<LikesTable />
							</div>
						</div>
						<div className={style.rightSite}>
							<p className={style.logedInuser}>
								Du er logget in som <span>{user}</span>
							</p>
							<LogoutButton handleLogout={handleLogout} />
							<ChangePassword />
						</div>
					</section>
					<Modal
						isOpen={isModalOpen}
						onRequestClose={() => setIsModalOpen(false)}>
						<CommentForm
							selectedComment={selectedComment}
							handleFormSubmit={handleFormSubmit}
							setIsModalOpen={setIsModalOpen}
						/>
					</Modal>
				</PageWrapper>
			)}
		</>
	);
};
