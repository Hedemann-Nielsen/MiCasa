import { createClient } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

const supabaseContext = createContext();

let supabase;

export const SupabaseProvider = ({ children }) => {
	const [client, setClient] = useState(null);

	const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
	const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

	if (!supabase) {
		supabase = createClient(supabaseUrl, supabaseKey);
	}

	useEffect(() => {
		setClient(supabase);
	}, []);

	return (
		<supabaseContext.Provider value={{ supabase: client }}>
			{children}
		</supabaseContext.Provider>
	);
};

export const useSupabase = () => useContext(supabaseContext);
