import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout.jsx";

import { HomePage } from "../../Pages/HomePage.jsx";
import { FallbackPage } from "../../Pages/FallbackPag.jsx";
import { ContactPage } from "../../Pages/ContactPage.jsx";
import { LoginPage } from "../../Pages/LoginPage.jsx";

import { Login } from "../../Components/Customers/Login/Login.jsx";
import { CreateUser } from "../Customers/Login/CreateUser.jsx";

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
			// {
			// 	path: "/tickets",
			// 	children: [
			// 		{
			// 			index: true,
			// 			element: <TicketsPage />,
			// 		},
			// 		{
			// 			path: "/tickets/basket",
			// 			element: <BasketPage />,
			// 		},
			// 	],
			// },

			//nested router
			// {
			// 	path: "/lineup",
			// 	element: <LineupPage />,
			// 	children: [
			// 		{
			// 			index: true,
			// 			element: <Lineup />,
			// 		},
			// 		{
			// 			path: "/lineup/:stage_id",
			// 			element: <StageDetailsPage />,
			// 		},
			// 	],
			// },

			{
				path: "/login",
				element: <LoginPage />,
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

			// {
			// 	path: "/camps",
			// 	element: <CampsPage />,
			// },
			// {
			// 	path: "/info",
			// 	element: <InfoPage />,
			// },
			// {
			// 	path: "/program",
			// 	element: <ProgramPage />,
			// },
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
