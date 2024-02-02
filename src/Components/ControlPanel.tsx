import { useSelector } from "react-redux";
import {
	AllElevatorConfig,
	AllElevatorStatus,
	ServicedFloors,
	SingleLiftStatus,
} from "../Types";
import React, { useEffect, useState } from "react";
import { RootState } from "../Redux/Store";
import {
	requestElevatorConfig,
	requestElevatorStatus,
} from "../Functions/ElevatorControls";

const ControlPanel = () => {
	const currentFloor = useSelector((state: RootState) => state.currentFloor);
	const [Config, setConfig] = useState<AllElevatorConfig | null>(null);
	const [Status, setStatus] = useState<AllElevatorStatus | null>(null);
	const [LoadingPanel, setLoadingPanel] = useState<boolean>(true);

	const UpdatePanel = async () => {
		setLoadingPanel(true);
		const config = await requestElevatorConfig();
		const status = await requestElevatorStatus();
		console.log("Config: ", config);
		console.log("Status: ", status);

		console.log("Lift Type: ", typeof status?.lifts);
		setConfig(config);
		setStatus(status);
		setLoadingPanel(false);
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
					<h2>NOT Loading Panel</h2>
					<div className="CurrentFloorLifts">
						{/* {
                typeof Status?.lifts == Object ? {
                  return <p>
              } : {
                    Status?.lifts.filter((Lift: SingleLiftStatus) => { })}
              }
            } */}
					</div>

					{/* {ServicedFloors.map((Floor: number) => {
						return <button className="ElevatorButton">{Floor}</button>;
					})} */}
				</>
			)}
		</div>
	);
};

export default ControlPanel;
