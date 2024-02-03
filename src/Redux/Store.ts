import { ChangingFloorSlice } from "./ChangingFloorSlice";
import { DestinationsSlice } from "./DestinationsSlice";
import { configureStore } from "@reduxjs/toolkit";
import { FloorSlice } from "./FloorSlice";

export const store = configureStore({
	reducer: {
		currentFloor: FloorSlice.reducer,
		changingFloor: ChangingFloorSlice.reducer,
		destinations: DestinationsSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
