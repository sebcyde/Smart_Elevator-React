import { createBrowserRouter, RouterProvider } from "react-router-dom";
const rootElement = document.getElementById("root");
import Loading from "./Pages/Loading.tsx";
import { store } from "./Redux/Store.tsx";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./Styles/All.scss";
import React from "react";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/smart/lobby",
		element: <App />,
	},
	{
		path: "/gwr-top-trumps/loading",
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
