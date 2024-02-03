import { AllElevatorConfig, SingleElevatorConfig } from "../Types";
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiArrowDown } from "@mdi/js";
import {
	getSingleElevatorPosition,
	requestElevatorConfig,
} from "../Functions/ElevatorControls";

type Props = {
	liftID: number;
	currentFloor: number;
};

const LiftComponent = ({ liftID, currentFloor }: Props) => {
	const [LiftInfo, setLiftInfo] = useState<SingleElevatorConfig | null>(null);
	const [Position, setPosition] = useState<number>(0);

	const GetLiftInformation = async () => {
		const allLiftsConfig: AllElevatorConfig = await requestElevatorConfig();
		const CurrentPosition: number = await getSingleElevatorPosition(liftID);
		const Floors: SingleElevatorConfig = allLiftsConfig.lifts[liftID];

		console.log(`\nLift ${liftID} Position: ${CurrentPosition}`);
		console.log(`Lift ${liftID} Floors: ${Floors.serviced_floors}\n`);

		setPosition(CurrentPosition);
		setLiftInfo(Floors);
	};

	useEffect(() => {
		GetLiftInformation();
	}, []);

	return (
		<div className="LiftContainer">
			<span className="LiftStatus">
				<p className="LiftLocation">{Position}</p>
				<Icon
					className="LiftDirection"
					color="red"
					path={mdiArrowDown}
					size={1}
				/>
			</span>
			<div className="Lift">
				<div className="Doors">
					<div className="DoorLeft"></div>
					<div className="DoorRight"></div>
				</div>
				{/* <div className="ControlPanel"><ControlPanel ID={liftID} /></div> */}
			</div>
			<h2 className="LiftName">Lift {liftID}</h2>
		</div>
	);
};

export default LiftComponent;
