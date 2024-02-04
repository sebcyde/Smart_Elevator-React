import { mdiArrowDown } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Arrow from "../Assets/Arrow.png";
import ManOne from "../Assets/ManOne.png";
import {
  getSingleElevatorPosition,
  requestElevatorStatus,
} from "../Functions/ElevatorControls";
import { setCurrentFloor } from "../Redux/FloorSlice";
import { setRequiredLift } from "../Redux/RequiredLiftSlice";
import { RootState } from "../Redux/Store";
import { setUpdate } from "../Redux/UpdateSlice";
import { AllElevatorStatus } from "../Types";
import ControlPanel from "./ControlPanel";

type Props = {
  liftID: number;
  currentFloor: number;
};

const LiftComponent = ({ liftID, currentFloor }: Props) => {
  const requiredLift: number = useSelector(
    (state: RootState) => state.RequiredLift
  );
  const [destinations, setdestinations] = useState<number[]>([]);
  const [ShowArrow, setShowArrow] = useState<boolean>(false);
  const [Position, setPosition] = useState<number>(0);
  const [Open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const GetLiftInformation = async () => {
    const CurrentPosition: number = await getSingleElevatorPosition(liftID);
    const CurrentStatus: AllElevatorStatus = await requestElevatorStatus();

    setdestinations(CurrentStatus.lifts[liftID].destinations);
    setPosition(CurrentPosition);

    // if the lift is at the current floor open the doors so user can get in
    if (CurrentPosition == currentFloor) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const changeFloor = () => {
    // Enter an open elevator and go to its next destination
    if (Open) {
      dispatch(setCurrentFloor(destinations[0]));

      // Reset required lift to default - helps prevent bottom display being overwritten
      dispatch(setRequiredLift(-1));

      // Update bottom action tracker display
      dispatch(
        setUpdate(
          `Last Action: Took the lift from floor ${Position} ${
            Position > destinations[0] ? "down" : "up"
          } to floor ${destinations[0]}`
        )
      );

      setShowArrow(false);
    }
  };

  useEffect(() => {
    GetLiftInformation();
  }, [currentFloor]);

  useEffect(() => {
    // Executes when a floor is chosen on a control panel
    // If not the default requiredLift state, tell user how to get to chosen destination and show arrow
    if (requiredLift != -1) {
      dispatch(setUpdate(`To get to that floor, use Lift: ${requiredLift}`));
    }
    setShowArrow(true);
  }, [requiredLift]);

  return (
    <div className="LiftContainer">
      <div className={`LiftInner ${Open ? "open" : ""}`}>
        <span
          className={`LiftStatus ${
            destinations[0] > Position ? "GoingUp" : "GoingDown"
          }`}
        >
          {/* Current location of the lift */}
          <p className={`LiftLocation`}>{Position}</p>
          {/* Points to the direction of the lifts next stop */}
          <Icon
            className={"LiftDirection"}
            color="red"
            path={mdiArrowDown}
            size={1}
          />
        </span>
        <div className="Lift" onClick={changeFloor}>
          <div className="Doors">
            <div className="DoorLeft"></div>
            <div className="DoorRight"></div>
          </div>
          <div className="ManContainer">
            <img src={ManOne} />
          </div>
        </div>
        {/* Required Lift Arrow */}
        {requiredLift == liftID && ShowArrow ? (
          <div className="ArrowContainer">
            <img src={Arrow} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="CallButtonContainer">
        <ControlPanel ID={liftID} />
      </div>
    </div>
  );
};

export default LiftComponent;
