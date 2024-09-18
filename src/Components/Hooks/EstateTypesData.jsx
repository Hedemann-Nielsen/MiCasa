import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useEstateTypeData = () => {
	const { supabase } = useSupabase();
	const [estateTypeData, setEstateTypeData] = useState([]);

	useEffect(() => {
		const getEstateTypeData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("estate_types") //henter fra tabellen estates
						.select("*");
					if (error) {
						console.error(
							"Fejl ved hentning af data fra Employees:",
							error.message
						);
					} else {
						setEstateTypeData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getEstateTypeData();
	}, [supabase]);

	return estateTypeData;
};
