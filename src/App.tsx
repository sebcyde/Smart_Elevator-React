import { getLiftsForCurrentFloor } from "./Functions/ElevatorControls";
import { useDispatch, useSelector } from "react-redux";
import BottomStatus from "./Components/BottomStatus";
import ChangingFloors from "./Pages/ChangingFloors";
import StatusBoard from "./Components/StatusBoard";
import LiftComponent from "./Components/Lift";
import { useEffect, useState } from "react";
import { RootState } from "./Redux/Store";
import { AvailableLift } from "./Types";

function App() {
  const [CurrentFloorLifts, setCurrentFloorLifts] = useState<AvailableLift[]>();

  const currentPanel: number = useSelector(
    (state: RootState) => state.currentPanel
  );

  const destinationFloors: number[] = useSelector(
    (state: RootState) => state.destinations
  );

  const currentFloor: number = useSelector(
    (state: RootState) => state.currentFloor
  );

  const changingFloor: boolean = useSelector(
    (state: RootState) => state.changingFloor
  );

  const GetCurrentFloorStatus = async () => {
    const lifts: AvailableLift[] = await getLiftsForCurrentFloor(currentFloor);
    setCurrentFloorLifts(lifts);
  };

  useEffect(() => {
    // Get updated positions of all lifts on current floor
    GetCurrentFloorStatus();

    // Testing floor change mechanic
    // const testFloorChange = setInterval(() => {
    // 	console.log(`\nCurrent Floor in INTERVAL: ${currentFloor}`);

    // 	// Log the currentPanel value
    // 	console.log(`Current Panel: ${currentPanel}`);

    // 	console.log("Changing Floor");
    // 	// Dont change if user is selecting a floor!
    // 	if (currentPanel === -1) {
    // 		// Use a callback function with dispatch to ensure the correct state value
    // 		if (currentFloor < 10) {
    // 			dispatch(setCurrentFloor(currentFloor + 1));
    // 		} else {
    // 			dispatch(setCurrentFloor(0));
    // 		}
    // 	} else {
    // 		console.log("\n\nControl Panel Open\n\n");
    // 	}
    // }, 5000);

    // // Clear intervals to prevent memory leaks
    // return () => {
    // 	clearInterval(testFloorChange);
    // };
  }, [currentFloor, changingFloor, currentPanel]);

  return (
    <div className="App">
      {changingFloor || !CurrentFloorLifts ? (
        <ChangingFloors
          ChangeDirection={currentFloor > destinationFloors[0] ? "up" : "down"}
        />
      ) : (
        <>
          <StatusBoard /> {/* Contains Info About Current Floor */}
          <div className="Lobby">
            {CurrentFloorLifts?.map((Lift: AvailableLift) => {
              /* Single lift and its control panel */
              return (
                <LiftComponent
                  key={Lift.liftID}
                  currentFloor={currentFloor}
                  liftID={Lift.liftID}
                />
              );
            })}
          </div>
          <BottomStatus />
        </>
      )}
    </div>
  );
}

export default App;
