import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useCommentsData = ({ userId }) => {
	const { supabase } = useSupabase();
	const [commentsData, setCommentsData] = useState([]);

	const fetchComments = async () => {
		try {
			if (supabase) {
				const { data, error } = await supabase
					.from("reviews") //henter fra tabellen reviews
					.select("*") // henter alle kolonner fra tabellen
					.eq("user_id", userId); // Filtrerer kommentarer for den aktuelle bruger

				if (error) {
					console.error(
						"Fejl ved hentning af data fra NewsData:",
						error.message
					);
				} else {
					setCommentsData(data);
				}
			}
		} catch (error) {
			console.error("Generel fejl:", error.message);
		}
	};

	useEffect(() => {
		fetchComments(); // Hent data ved første render
	}, [supabase, userId]); // Tilføj userId som afhængighed

	return { commentsData, fetchComments };
};
