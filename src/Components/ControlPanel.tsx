import { ServicedFloors } from "../Types";
import React from "react";

type Props = {
	ServicedFloors: ServicedFloors;
};

const ControlPanel = ({ ServicedFloors }: Props) => {
	return (
		<div className="ControlPanel">
			{ServicedFloors.map((Floor: number) => {
				return <button className="ElevatorButton">{Floor}</button>;
			})}
		</div>
	);
};

export default ControlPanel;
