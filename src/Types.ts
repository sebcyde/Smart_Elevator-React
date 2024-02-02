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
		0: {
			floor: number;
			destinations: number[];
		};
		1: {
			floor: number;
			destinations: number[];
		};
	};
};

// GET - /api/lift/config/
export type AllElevatorConfig = {
	lifts: {
		0: SingleLiftStatus;
		1: SingleLiftStatus;
	};
};

export type SingleLiftStatus = {
	serviced_floors: number[];
};
