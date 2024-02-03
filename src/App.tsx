import { getLiftsForCurrentFloor } from "./Functions/ElevatorControls";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFloor } from "./Redux/FloorSlice";
import ChangingFloors from "./Pages/ChangingFloors";
import StatusBoard from "./Components/StatusBoard";
import LiftComponent from "./Components/Lift";
import { useEffect, useState } from "react";
import { RootState } from "./Redux/Store";
import { AvailableLift } from "./Types";

function App() {
	const [CurrentFloorLifts, setCurrentFloorLifts] = useState<AvailableLift[]>();

	const destinationFloors: number[] = useSelector(
		(state: RootState) => state.destinations
	);

	const currentFloor: number = useSelector(
		(state: RootState) => state.currentFloor
	);

	const changingFloor: boolean = useSelector(
		(state: RootState) => state.changingFloor
	);

	const dispatch = useDispatch();

	const GetCurrentFloorStatus = async () => {
		const lifts: AvailableLift[] = await getLiftsForCurrentFloor(currentFloor);
		setCurrentFloorLifts(lifts);
	};

	useEffect(() => {
		GetCurrentFloorStatus();

		// Testing floor change mechanic
		const testFloorChange = setInterval(() => {
			console.log(`\nCurrent Floor: ${currentFloor}`);

			// Use a callback function with dispatch to ensure the correct state value
			if (currentFloor < 10) {
				dispatch(setCurrentFloor(currentFloor + 1));
			} else {
				dispatch(setCurrentFloor(0));
			}
		}, 5000);

		// Clear intervals to prevent memory leaks
		return () => {
			clearInterval(testFloorChange);
		};
	}, [currentFloor, changingFloor]);

	return (
		<div className="App">
			{changingFloor || !CurrentFloorLifts ? (
				<ChangingFloors
					ChangeDirection={currentFloor > destinationFloors[0] ? "up" : "down"}
				/>
			) : (
				<>
					<StatusBoard /> {/* Contains Info About Floors */}
					<div className="Lobby">
						{CurrentFloorLifts?.map((Lift: AvailableLift) => {
							/* Single lift and its control panel */
							return (
								<LiftComponent
									currentFloor={currentFloor}
									liftID={Lift.liftID}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
