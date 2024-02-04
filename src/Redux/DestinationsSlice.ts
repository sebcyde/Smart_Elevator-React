import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Needed for floor loading animations
const initialState: number[] = [];

export const DestinationsSlice = createSlice({
	name: "Destinations",
	initialState,
	reducers: {
		addDestination: (state, action: PayloadAction<number>) => {
			console.log("Adding Destination: ", action.payload);
			return (state = [...state, action.payload]);
		},
		removeDestination: (state) => {
			if (state.length > 0) {
				console.log("Removing Destination: ", state[0]);
				return (state = state.slice(1));
			}
		},
	},
});

export const { addDestination, removeDestination } = DestinationsSlice.actions;
export default DestinationsSlice.reducer;
