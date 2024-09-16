import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout.jsx";

import { HomePage } from "../../Pages/HomePage.jsx";
import { FallbackPage } from "../../Pages/FallbackPag.jsx";
import { ContactPage } from "../../Pages/ContactPage.jsx";
import { SearchPage } from "../../Pages/SearchPage.jsx";

import { Login } from "../../Components/Customers/Login/Login.jsx";
import { CreateUser } from "../Customers/Login/CreateUser.jsx";
import { Estates } from "../Customers/Estates/Estates.jsx";
import { EstateDetails } from "../Customers/Estates/EstateDetails.jsx";

export const routes = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/home",
				element: <HomePage />,
			},
			//nested router
			{
				path: "/til-salg",

				children: [
					{
						index: true,
						element: <Estates />,
					},
					{
						path: "/til-salg/:estate_id",
						element: <EstateDetails />,
					},
				],
			},
			//nested router
			{
				path: "/login",
				// element: <LoginPage />,
				children: [
					{
						index: true,
						element: <Login />,
					},
					{
						path: "/login/createUser",
						element: <CreateUser />,
					},
				],
			},

			{
				path: "/search",
				element: <SearchPage />,
			},

			{
				path: "/contact",
				element: <ContactPage />,
			},
			{
				path: "*",
				element: <FallbackPage />,
			},
		],
	},
]);
