export type CurrentFloor = number;

export type ServicedFloors = number[];

// POST - /api/lift/request/
export type ElevatorRequestPayload = {
	from_floor: number;
	to_floor: number;
};

// Response from above
export type ElevatorRequestResponse = {
	lift: number;
};

// GET - /api/lift/status/
export type AllElevatorStatus = {
	lifts: {
		[key: number]: SingleElevatorStatus;
	};
};

export type SingleElevatorStatus = {
	floor: number;
	destinations: number[];
};

// GET - /api/lift/config/
export type AllElevatorConfig = {
	lifts: {
		[key: number]: SingleElevatorConfig;
	};
};

export type SingleElevatorConfig = {
	serviced_floors: number[];
};

export type AvailableLift = {
	liftID: number;
	liftFloors: SingleElevatorConfig;
};
