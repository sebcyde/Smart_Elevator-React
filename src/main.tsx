import { createBrowserRouter, RouterProvider } from "react-router-dom";
const rootElement = document.getElementById("root");
import Loading from "./Pages/Loading.tsx";
import { store } from "./Redux/Store.ts";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./Styles/All.scss";
import React from "react";

const router = createBrowserRouter([
	{
		path: "/Smart_Elevator-React/",
		element: <App />,
	},
	{
		path: "/Smart_Elevator-React/loading",
		element: <Loading />,
	},
]);

// new
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</React.StrictMode>
	);
}
