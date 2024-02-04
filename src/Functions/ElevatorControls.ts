import {
	AllElevatorConfig,
	AllElevatorStatus,
	AvailableLift,
	ElevatorRequestPayload,
	ElevatorRequestResponse,
	SingleElevatorStatus,
} from "../Types";
import {
	ElevatorConfigEndpoint,
	ElevatorRequestEndpoint,
	ElevatorStatusEndpoint,
} from "./ApiEndpoints";
import axios from "axios";

//TESTING
import fakeConfig from "../FakeData/ElevatorConfig.json";
import fakeStatus from "../FakeData/ElevatorStatus.json";

// Request the current destination of an elevator
// Example - "take me from floor 1 to 10" -> "Use lift 3"
export const requestElevatorDestination = async ({
	from_floor,
	to_floor,
}: ElevatorRequestPayload): Promise<ElevatorRequestResponse> => {
	try {
		const response = await axios.post(ElevatorRequestEndpoint, {
			from_floor: from_floor,
			to_floor: to_floor,
		});

		// Returns which elevator(s) to use
		// Example response: {“lift”:4}
		return response.data;
	} catch (error) {
		// Handle errors gracefully
		console.error("Error requesting elevator destination:", error);
		throw error;
	}
};

// GET Request - Returns current positions and destination of all elevators
export const requestElevatorStatus = async (): Promise<AllElevatorStatus> => {
	try {
		return fakeStatus;

		// Return elevators status object
		// const response = await axios.get(ElevatorStatusEndpoint);
		// return response.data;
	} catch (error) {
		console.error("Error fetching elevator status:", error);
		throw error;
	}
};

// GET Request - Returns serviceable floors of all elevators
export const requestElevatorConfig = async (): Promise<AllElevatorConfig> => {
	try {
		console.log("Retrieving Elevator Config.");
		return fakeConfig;

		// const response = await axios.get(ElevatorConfigEndpoint);

		// Handle the response data as needed
		// return response.data;
	} catch (error) {
		console.error("Error fetching elevator configuration:", error);
		throw error;
	}
};

// Get the filtered list of lifts for the current floor
export const getLiftsForCurrentFloor = async (
	CurrentFloor: number
): Promise<AvailableLift[]> => {
	let liftConfig: AllElevatorConfig = await requestElevatorConfig();

	// Keys are numbers not strings so need a bit of magic type coercion here
	let LiftIDs: number[] = Object.keys(liftConfig.lifts).map(Number);
	let availableLifts: AvailableLift[] = [];

	/* To filter the lifts that can be accessed from the current floor,
  we need to iterate "lifts", but since "lifts" is an object not an array we can use a traditional for loop */
	for (let i = 0; i < LiftIDs.length; i++) {
		if (liftConfig.lifts[i].serviced_floors.includes(CurrentFloor)) {
			availableLifts.push({
				liftID: LiftIDs[i],
				liftFloors: liftConfig.lifts[i],
			});
		}
	}

	console.log(availableLifts);
	return availableLifts;
};

// Get the current position of a single elevator
export const getSingleElevatorPosition = async (
	ID: number
): Promise<number> => {
	const status = await requestElevatorStatus();
	return status.lifts[ID].floor;
};

export const changeFloors = async () => {
	
};
