import { useDispatch, useSelector } from "react-redux";
import ControlPanel from "./Components/ControlPanel";
import { setCurrentFloor } from "./Redux/FloorSlice";
import StatusBoard from "./Components/StatusBoard";
import { RootState } from "./Redux/Store";
import { useEffect } from "react";

function App() {
	const currentFloor = useSelector((state: RootState) => state.currentFloor);
	const dispatch = useDispatch();

	useEffect(() => {
		// Testing floor change mechanic
		const testFloorChange = setInterval(() => {
			console.log(`Current Floor: ${currentFloor}`);

			// Use a callback function with dispatch to ensure the correct state value
			if (currentFloor < 10) {
				console.log("Increasing Floor Number");
				dispatch(setCurrentFloor(currentFloor + 1));
			} else {
				console.log("Decreasing Floor Number");
				dispatch(setCurrentFloor(0));
			}
		}, 20000);

		// Clear intervals to prevent memory leaks
		return () => {
			clearInterval(testFloorChange);
		};
	}, [currentFloor]);

	return (
		<div className="App">
			<StatusBoard /> {/* Contains Info About Floors */}
			<ControlPanel /> {/* Contains Controls */}
		</div>
	);
}

export default App;
