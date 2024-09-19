import style from "./EmployeesCard.module.scss";
import globalStyle from "../../../Styles/GlobalStyles.module.scss";

export const EmployeesCard = ({ employees }) => {
	return (
		<>
			{employees &&
				employees.map((employee) => {
					return (
						<figure className={style.employeesCard} key={employee.id}>
							<img src={employee.image_url} alt="" />
							<figcaption>
								<h3 className={globalStyle.subtitle3}>
									{employee.firstname} {employee.lastname}
								</h3>
								<p>{employee.position}</p>
								<div className={style.contactemployee}>
									<p>Email: {employee.email}</p>
									<p>Telefon: {employee.phone}</p>
								</div>
							</figcaption>
						</figure>
					);
				})}
		</>
	);
};
