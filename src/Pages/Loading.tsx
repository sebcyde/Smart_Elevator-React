import BarLoader from "react-spinners/BarLoader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Loading = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Navigation - Simulating loading of data etc
		const NavigateToLobby = setTimeout(
			() => navigate("/Smart_Elevator-React/lobby"),
			2000
		);

		// Clear timeouts to prevent memory leaks
		return () => {
			clearTimeout(NavigateToLobby);
		};
	}, []);

	return (
		<div className="LoadingContainer">
			<BarLoader
				color={"#023e8a"}
				width={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			<p>Entering Lobby...</p>
		</div>
	);
};

export default Loading;
