import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useEmployeesDatas = () => {
	const { supabase } = useSupabase();
	const [employeesData, setEmployeesData] = useState([]);

	useEffect(() => {
		const getEmployeesData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("employees") //henter fra tabellen employees
						.select("*"); // henter alle kolonnen
					if (error) {
						console.error(
							"Fejl ved hentning af data fra Employees:",
							error.message
						);
					} else {
						setEmployeesData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getEmployeesData();
	}, [supabase]);

	return employeesData;
};
