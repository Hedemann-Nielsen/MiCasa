import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SupabaseProvider } from "./Providers/SupabaseProvider.jsx";
import { AuthProvider } from "./Providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SupabaseProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</SupabaseProvider>
	</React.StrictMode>
);
