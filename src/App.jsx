import { RouterProvider } from "react-router-dom";
import { routes } from "./Components/Routes/Routes";

import "./App.css";

function App() {
	return (
		<>
			{/* Bruges til CreateBrowserRouyter uden loader */}
			<RouterProvider router={routes} />;
			{/* Bruges til CreateBrowserRouter med Loader */}
			{/* <div>{loading ? <Loader /> : <RouterProvider router={routes} />}</div>; */}
		</>
	);
}

export default App;
