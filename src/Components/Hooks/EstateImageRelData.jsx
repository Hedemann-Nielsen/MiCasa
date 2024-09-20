import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useEstateImageRelData = () => {
	const { supabase } = useSupabase();
	const [EstateImageRelData, setEstateImageRelData] = useState([]);

	useEffect(() => {
		const getEstateImageRelData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("estate_image_rel")
						.select("*, images(image_url)")
						.eq("is_primary", true);

					if (error) {
						console.error(
							"Fejl ved hentning af data fra Employees:",
							error.message
						);
					} else {
						setEstateImageRelData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getEstateImageRelData();
	}, [supabase]);

	return EstateImageRelData;
};
