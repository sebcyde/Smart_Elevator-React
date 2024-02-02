import { configureStore } from "@reduxjs/toolkit";
import { FloorSlice } from "./FloorSlice";

export const store = configureStore({
	reducer: {
		currentFloor: FloorSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
