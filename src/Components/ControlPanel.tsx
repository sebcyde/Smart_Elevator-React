import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestElevatorConfig,
  requestElevatorDestination,
  requestElevatorStatus,
} from "../Functions/ElevatorControls";
import { setCurrentPanel } from "../Redux/PanelSlice";
import { setRequiredLift } from "../Redux/RequiredLiftSlice";
import { RootState } from "../Redux/Store";
import { setUpdate } from "../Redux/UpdateSlice";
import {
  AllElevatorConfig,
  AllElevatorStatus,
  ElevatorRequestResponse,
} from "../Types";

type Props = {
  ID: number;
};

const ControlPanel = ({ ID }: Props) => {
  const currentPanel = useSelector((state: RootState) => state.currentPanel);
  const currentFloor = useSelector((state: RootState) => state.currentFloor);

  const [AvailableFloors, setAvailableFloors] = useState<number[]>([]);
  const [loadingPanel, setloadingPanel] = useState<boolean>(false);
  const [Destinations, setDestinations] = useState<number[]>([]);
  const dispatch = useDispatch();

  const OpenPanel = async () => {
    // Check if the panel is already open
    if (currentPanel === ID) {
      return;
    }

    setloadingPanel(true);
    try {
      const config: AllElevatorConfig = await requestElevatorConfig();
      const status: AllElevatorStatus = await requestElevatorStatus();

      // to show all possible destinations
      setAvailableFloors(config.lifts[ID].serviced_floors);

      // To show previously set destinations
      setDestinations(status.lifts[ID].destinations);

      // show panel once data is loaded
      dispatch(setCurrentPanel(ID));
    } catch (error) {
      console.error("Error sending destination POST request:", error);
      alert("Error fetching elevator configuration. Check console");
    } finally {
      // Ensure loading state is reset regardless of success or error
      setloadingPanel(false);
    }
  };

  const ChooseDestination = async (Destination: number) => {
    // Update bottom activity bar
    dispatch(setUpdate(`Chosen Destination: Floor ${Destination}`));

    try {
      let response: ElevatorRequestResponse = await requestElevatorDestination({
        from_floor: currentFloor,
        to_floor: Destination,
      });
      dispatch(setRequiredLift(response.lift));

      // Hide panel display
      dispatch(setCurrentPanel(-1));
    } catch (error) {
      console.error("Error sending destination POST request:", error);
      alert("Error sending destination POST request. Check console");
    } finally {
      // Ensure loading state is reset regardless of success or error
      setloadingPanel(false);
    }
  };

  const ControlModal = () => {
    return (
      <div className="ControlPanel">
        <h2 className="LiftName">Lift {ID}</h2>
        <p>Choose a destination</p>
        <div className="AllFloorsContainer">
          {AvailableFloors.map((Floor: number) => {
            return (
              <span key={Floor} className="FloorContainer">
                {Floor}:
                <button
                  className={Destinations.includes(Floor) ? "highlight" : ""}
                  key={Floor}
                  onClick={() => {
                    ChooseDestination(Floor);
                  }}
                ></button>
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="CallLiftButton" onClick={OpenPanel}>
      {currentPanel === ID && !loadingPanel ? <ControlModal /> : ""}
    </div>
  );
};

export default ControlPanel;
