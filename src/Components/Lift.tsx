import {
	requestElevatorStatus,
	getSingleElevatorPosition,
} from "../Functions/ElevatorControls";
import { AllElevatorStatus } from "../Types";
import { useEffect, useState } from "react";
import { RootState } from "../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import ControlPanel from "./ControlPanel";
import ManOne from "../Assets/ManOne.png";
import { mdiArrowDown } from "@mdi/js";
import Arrow from "../Assets/Arrow.png";
import Icon from "@mdi/react";
import { setCurrentFloor } from "../Redux/FloorSlice";
import { setUpdate } from "../Redux/UpdateSlice";

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

		console.log(`Lift ${liftID}: ${CurrentStatus.lifts[liftID].destinations}`);
		console.log(`\nLift ${liftID} Position: ${CurrentPosition}`);
		setdestinations(CurrentStatus.lifts[liftID].destinations);
		setPosition(CurrentPosition);

		// if the lift is at the current floor open the doors
		if (CurrentPosition == currentFloor) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	};

	const changeFloor = () => {
		// Enter an open elevator and go to its next destination
		if (Open) {
			console.log("Changing Floors!");
			dispatch(setCurrentFloor(destinations[0]));
			dispatch(
				setUpdate(
					`Last Action: Took the lift from floor ${Position} ${
						Position > destinations[0] ? "down" : "up"
					} to floor ${destinations[0]}`
				)
			);
		}
	};

	useEffect(() => {
		GetLiftInformation();
	}, [currentFloor]);

	useEffect(() => {
		console.log(`requiredLift: ${requiredLift}`);
		// remove?
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
					<p className={`LiftLocation`}>{Position}</p>
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
			</div>
			<div className="CallButtonContainer">
				<ControlPanel ID={liftID} />
			</div>

			{/* Required Lift Arrow */}
			{/* {requiredLift == liftID ? (
				<div className="ArrowContainer">
					<img src={Arrow} />
				</div>
			) : (
				""
			)} */}
		</div>
	);
};

export default LiftComponent;
