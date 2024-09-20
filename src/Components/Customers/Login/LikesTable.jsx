import { Link } from "react-router-dom";
import style from "./LikesTable.module.scss";

export const LikesTable = ({ userfavoritsData, handleDeleteLike }) => {
	return (
		<table className={style.commentsTable}>
			<thead>
				<tr>
					<th>Adresse</th>
					<th>Dato</th>
					<th>Handling</th>
				</tr>
			</thead>
			<tbody>
				{userfavoritsData.map((favorit, index) => (
					<tr key={index}>
						<td>
							<Link to={`/til-salg/${favorit?.estate?.id}`}>
								{favorit.estates.address}
							</Link>
						</td>
						<td>{new Date(favorit.created_at).toLocaleDateString()}</td>

						<td
							className={style.delete}
							onClick={() => {
								console.log("favorit data", favorit);

								handleDeleteLike(favorit);
							}}>
							slet
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
