import { RootState } from "../Redux/Store";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const StatusBoard = () => {
	let CurrentFloor: number = useSelector(
		(state: RootState) => state.currentFloor
	);

	return <div className="StatusBoard">Current Floor: {CurrentFloor}</div>;
};

export default StatusBoard;
