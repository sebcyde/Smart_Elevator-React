import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

const BottomStatus = () => {
	const Update: string = useSelector((state: RootState) => state.Update);
	return <div className="BottomStatusContainer">{Update}</div>;
};

export default BottomStatus;
