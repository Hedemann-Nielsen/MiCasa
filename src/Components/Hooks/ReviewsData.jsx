import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useReviewsData = () => {
	const { supabase } = useSupabase();
	const [reviewsData, setReviewsData] = useState([]);

	useEffect(() => {
		const getReviewsData = async () => {
			try {
				if (supabase) {
					const { data, error } = await supabase
						.from("reviews") //henter fra tabellen estates
						.select("*");
					if (error) {
						console.error(
							"Fejl ved hentning af data fra Employees:",
							error.message
						);
					} else {
						setReviewsData(data);
					}
				}
			} catch (error) {
				console.error("Generel fejl:", error.message);
			}
		};

		getReviewsData();
	}, [supabase]);

	return reviewsData;
};
