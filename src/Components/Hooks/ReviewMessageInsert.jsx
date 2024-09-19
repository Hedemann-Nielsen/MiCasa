import { useSupabase } from "../../Providers/SupabaseProvider";

export const useReviewsMessage = () => {
	const { supabase } = useSupabase();

	const insertReviewsMessage = async ({ name, title, comment, user_id }) => {
		try {
			const { data, error } = await supabase
				.from("reviews")
				.insert([
					{
						title,
						content: comment,
						name,
						user_id,
						is_active: true,
					},
				])
				.select("*");

			if (error) {
				console.error("Fejl ved sending af data til Reviews:", error.message);
				return { success: false, message: error.message };
			} else {
				console.log("data blev sendt til databasen fra reviews:", data);
				return { success: true, data };
			}
		} catch (error) {
			console.error("Generel fejl:", error.message);
			return { success: false, message: error.message };
		}
	};

	return { insertReviewsMessage };
};
