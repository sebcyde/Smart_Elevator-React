import { ChangingFloorSlice } from "./ChangingFloorSlice";
import { RequiredLiftSlice } from "./RequiredLiftSlice";
import { DestinationsSlice } from "./DestinationsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { UpdateSlice } from "./UpdateSlice";
import { FloorSlice } from "./FloorSlice";
import { PanelSlice } from "./PanelSlice";

export const store = configureStore({
	reducer: {
		RequiredLift: RequiredLiftSlice.reducer,
		currentFloor: FloorSlice.reducer,
		changingFloor: ChangingFloorSlice.reducer,
		destinations: DestinationsSlice.reducer,
		currentPanel: PanelSlice.reducer,
		Update: UpdateSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
