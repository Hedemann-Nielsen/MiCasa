import { useSupabase } from "../../Providers/SupabaseProvider";

export const useContactMessage = () => {
	const { supabase } = useSupabase();

	const updateContactMessage = async ({ name, email, employee, message }) => {
		try {
			const { data, error } = await supabase
				.from("contact_messages")
				.insert([{ name, email, employee_id: employee, message }])
				.select("* employees(firstname, lastname)");

			if (error) {
				return { success: false, message: error.message };
			}
			return { success: true, data };
		} catch (error) {
			console.error("Generel fejl:", error.message);
			return { success: false, message: error.message };
		}
	};

	return { updateContactMessage };
};
