import {
	AllElevatorConfig,
	AllElevatorStatus,
	ElevatorRequestPayload,
	ElevatorRequestResponse,
} from "../Types";
import {
	ElevatorConfigEndpoint,
	ElevatorRequestEndpoint,
	ElevatorStatusEndpoint,
} from "./ApiEndpoints";
import axios from "axios";

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

// GET Request - Returns current positions of all elevators
export const requestElevatorStatus = async (): Promise<AllElevatorStatus> => {
	try {
		const response = await axios.get(ElevatorStatusEndpoint);

		// Return elevators status object
		return response.data;
	} catch (error) {
		// Handle errors gracefully

		console.error("Error fetching elevator status:", error);
		throw error;
	}
};

// GET Request - Returns current positions of all elevators
export const requestElevatorConfig = async (): Promise<AllElevatorConfig> => {
	try {
		const response = await axios.get(ElevatorConfigEndpoint);

		// Handle the response data as needed
		return response.data;
	} catch (error) {
		// Handle errors gracefully
		console.error("Error fetching elevator configuration:", error);
		throw error;
	}
};
