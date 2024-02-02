import ControlPanel from "./Components/ControlPanel";
import StatusBoard from "./Components/StatusBoard";
import { useState } from "react";

function App() {
	const [CurrentFloor, setCurrentFloor] = useState<number>(1);

	return (
		<div>
			<StatusBoard />
			{/* <ControlPanel /> */}
		</div>
	);
}

export default App;
