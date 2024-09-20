import { useEffect, useState } from "react";
import { useSupabase } from "../../Providers/SupabaseProvider";

export const useUserFavoritsData = ({ userId }) => {
	const { supabase } = useSupabase();
	const [userfavoritsData, setUserFavoritsData] = useState([]);

	const fetchFavorits = async () => {
		try {
			if (supabase) {
				const { data, error } = await supabase
					.from("favorites") //henter fra tabellen favorites
					.select("*, estates(address, id)") //hente alle kolonner samt address og id i tabellen estates som favorits har en relation til
					.eq("user_id", userId);

				if (error) {
					console.error(
						"Fejl ved hentning af data fra UserFavorits:",
						error.message
					);
				} else {
					setUserFavoritsData(data);
				}
			}
		} catch (error) {
			console.error("Generel fejl:", error.message);
		}
	};

	useEffect(() => {
		fetchFavorits(); // Hent data ved første render
	}, [supabase, userId]); // Tilføj userId som afhængighed

	return { userfavoritsData, fetchFavorits };
};
