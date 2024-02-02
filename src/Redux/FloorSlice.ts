import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";
import { CurrentFloor } from "../Types";

// Initialise At Ground Floor
const initialState: CurrentFloor = 0;

export const FloorSlice = createSlice({
	name: "CurrentFloor",
	initialState,
	reducers: {
		setCurrentFloor: (state, action: PayloadAction<number>) => {
			return (state = action.payload);
		},
	},
});

export const { setCurrentFloor } = FloorSlice.actions;
export const getCurrentFloor = (state: RootState) => state.currentFloor;
export default FloorSlice.reducer;
