import { RootState } from "../Redux/Store";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const StatusBoard = () => {
	let CurrentFloor: number = useSelector(
		(state: RootState) => state.currentFloor
	);

	// useEffect(() => {}, [CurrentFloor]);

	return <div>Current Floor: {CurrentFloor}</div>;
};

export default StatusBoard;
