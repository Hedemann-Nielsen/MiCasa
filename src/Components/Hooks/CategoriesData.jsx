import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useCategories = () => {
	const { supabase } = useSupabase();
	const [categoriesData, setCategoriesData] = useState([]);

	useEffect(() => {
		const getCategoriesData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("categories") //henter fra tabellen categories
						.select("title"); // henter  title kolonnen
					if (error) {
						console.error(
							"Fejl ved hentning af data fra categoriesData:",
							error.message
						);
					} else {
						console.log(data);
						setCategoriesData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getCategoriesData();
	}, [supabase]);

	return categoriesData;
};
