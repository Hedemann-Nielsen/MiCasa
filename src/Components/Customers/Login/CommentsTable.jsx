import globalStyle from "../../../Styles/GlobalStyles.module.scss";
import style from "./Login.module.scss";

export const CommentsTable = ({
	commentsData,
	handleEditComment,
	handleDeleteComment,
}) => {
	return (
		<table className={style.commentsTable}>
			<thead>
				<tr>
					<th>Title</th>
					<th>Dato</th>
					<th>Handling</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{commentsData.map((comment) => (
					<tr key={comment.id}>
						<td>{comment.title}</td>
						<td>{new Date(comment.created_at).toLocaleDateString()}</td>
						<td className={style.edit}>
							<button
								className={globalStyle.unstyledButton}
								onClick={() => handleEditComment(comment)}>
								rediger
							</button>
						</td>
						<td className={style.delete}>
							<button
								className={globalStyle.unstyledButton}
								onClick={() => handleDeleteComment(comment)}>
								slet
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
