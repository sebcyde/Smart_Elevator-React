import BarLoader from "react-spinners/BarLoader";
import React from "react";

type Props = {
	ChangeDirection: string;
};

const ChangingFloors = ({ ChangeDirection }: Props) => {
	return (
		<div className="ChangingFloorContainer">
			<BarLoader
				color={"#023e8a"}
				width={150}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
			<p> {ChangeDirection === "up" ? "Going Up" : "Going Down"}</p>
		</div>
	);
};

export default ChangingFloors;
