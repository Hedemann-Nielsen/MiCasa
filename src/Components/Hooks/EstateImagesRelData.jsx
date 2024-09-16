import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useEstateImagesRelData = () => {
	const { supabase } = useSupabase();
	const [estateImagesRelData, setEstateImagesRelData] = useState([]);

	useEffect(() => {
		const getEstateImagesRelData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("estate_image_rel")
						.select("*, images(image_url)");
					if (error) {
						console.error(
							"Fejl ved hentning af data fra Employees:",
							error.message
						);
					} else {
						setEstateImagesRelData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getEstateImagesRelData();
	}, [supabase]);

	return estateImagesRelData;
};
