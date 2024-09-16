import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useEstateDatas = () => {
	const { supabase } = useSupabase();
	const [estateData, setEstateData] = useState([]);

	useEffect(() => {
		const getEstateData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("estates") //henter fra tabellen estates
						.select(
							"*, cities(name, zipcode), estate_types(name), energy_labels(letter)"
						);
					if (error) {
						console.error(
							"Fejl ved hentning af data fra Employees:",
							error.message
						);
					} else {
						setEstateData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getEstateData();
	}, [supabase]);

	return estateData;
};
