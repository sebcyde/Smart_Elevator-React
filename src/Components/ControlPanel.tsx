import { AllElevatorConfig, AllElevatorStatus } from "../Types";
import {
	requestElevatorConfig,
	requestElevatorStatus,
} from "../Functions/ElevatorControls";
import { useState, useEffect } from "react";
import { RootState } from "../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPanel } from "../Redux/PanelSlice";

type Props = {
	ID: number;
};

const ControlPanel = ({ ID }: Props) => {
	const currentPanel = useSelector((state: RootState) => state.currentPanel);
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
			// setshowPanel(true);
		} catch (error) {
			console.error("Error fetching elevator configuration:", error);
			alert("Error fetching elevator configuration");
		} finally {
			// Ensure loading state is reset regardless of success or error
			setloadingPanel(false);
		}
	};

	const ChooseDestination = async (Destination: number) => {
		try {
			// let response: ElevatorRequestResponse = await requestElevatorDestination({
			// 	from_floor: currentFloor,
			// 	to_floor: Destination,
			// });
			// dispatch(setRequiredLift(response.lift));
			dispatch(setCurrentPanel(-1));
		} catch (error) {
			console.error("Error sending destination POST request:", error);
			alert("Error sending destination POST request");
		} finally {
			// Ensure loading state is reset regardless of success or error
			setloadingPanel(false);
		}
	};

	useEffect(() => {
		console.log(`currentPanel: ${currentPanel}`);
	}, [currentPanel]);

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
			{currentPanel === ID ? <ControlModal /> : ""}
		</div>
	);
};

export default ControlPanel;
