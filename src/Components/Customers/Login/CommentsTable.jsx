import style from "./CommentsTable.module.scss";

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
				{commentsData &&
					commentsData.map((comment) => (
						<tr key={comment.id}>
							<td>{comment.title}</td>
							<td>{new Date(comment.created_at).toLocaleDateString()}</td>
							<td
								className={style.edit}
								onClick={() => handleEditComment(comment)}>
								rediger
							</td>
							<td
								className={style.delete}
								onClick={() => handleDeleteComment(comment)}>
								slet
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
};
