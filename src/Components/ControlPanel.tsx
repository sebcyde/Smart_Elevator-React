import { useSelector } from "react-redux";
import {
	AllElevatorConfig,
	AllElevatorStatus,
	ServicedFloors,
	SingleElevatorConfig,
	SingleElevatorStatus,
} from "../Types";
import React, { useEffect, useState } from "react";
import { RootState } from "../Redux/Store";
import {
	requestElevatorConfig,
	requestElevatorStatus,
} from "../Functions/ElevatorControls";

type Props = {
	ID: number;
	liftFloors: SingleElevatorConfig;
};

const ControlPanel = () => {
	const currentFloor = useSelector((state: RootState) => state.currentFloor);
	const [Config, setConfig] = useState<AllElevatorConfig | null>(null);
	const [Status, setStatus] = useState<AllElevatorStatus | null>(null);
	const [Lifts, setLifts] = useState<AvailableLift[] | null>(null);
	const [LoadingPanel, setLoadingPanel] = useState<boolean>(true);

	const UpdatePanel = async () => {
		setLoadingPanel(true);
		console.log(`\nCurrent Floor: ${currentFloor}`);
		const config = await requestElevatorConfig();
		const status = await requestElevatorStatus();
		console.log("Config: ", config);
		console.log("Status: ", status);

		console.log("Lift Type: ", typeof status?.lifts);

		setConfig(config);
		setStatus(status);
		GetLiftsFromConfig();
		setLoadingPanel(false);
	};

	const GetLiftsFromConfig = () => {
		if (Config) {
			// Keys are numbers not strings so need a bit of magic type coercion here
			let LiftIDs: number[] = Object.keys(Config.lifts).map(Number);
			let availableLifts: {
				liftID: number;
				liftFloors: SingleElevatorConfig;
			}[] = [];

			/* To filter the lifts that can be accessed from the current floor,
			we need to iterate "lifts", but since "lifts" is an object not an array we can use a traditional for loop */
			for (let i = 0; i < LiftIDs.length; i++) {
				console.log(
					`Lift ${LiftIDs[i]} Floors: ${Config.lifts[i].serviced_floors}`
				);
				if (Config.lifts[i].serviced_floors.includes(currentFloor)) {
					availableLifts.push({
						liftID: LiftIDs[i],
						liftFloors: Config.lifts[i],
					});
				}
			}

			console.log(availableLifts);
			setLifts(availableLifts);
		}
	};

	useEffect(() => {
		UpdatePanel();
	}, [currentFloor]);

	return (
		<div className="ControlPanel">
			{LoadingPanel ? (
				<h2>Loading Panel</h2>
			) : (
				<>
					<h3>Callable Lifts from this floor:</h3>
					<div className="CurrentFloorLifts">
						{Lifts?.map((Lift: AvailableLift) => {
							return (
								<div className="Lift">
									<p>Lift: {Lift.liftID}</p>
									{/* <p>{Lift.liftFloors.serviced_floors}</p> */}
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default ControlPanel;
