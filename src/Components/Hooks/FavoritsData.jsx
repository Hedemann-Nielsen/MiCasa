import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useFavoritsData = (userId, estateId) => {
	const { supabase } = useSupabase();
	const [favoritsData, setFavoritsData] = useState([]);

	useEffect(() => {
		const getFavoritsData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("favorites") //henter fra tabellen estates
						.select("*")
						.eq("user_id", userId)
						.eq("estate_id", estateId);

					if (error) {
						console.error(
							"Fejl ved hentning af data fra Favorits:",
							error.message
						);
					} else {
						setFavoritsData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getFavoritsData();
	}, [supabase, userId, estateId]);

	return favoritsData;
};
