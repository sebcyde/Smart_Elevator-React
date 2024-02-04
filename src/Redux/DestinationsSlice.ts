import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Needed for floor loading animations
const initialState: number[] = [];

// To manually update elevator destination data
export const DestinationsSlice = createSlice({
	name: "Destinations",
	initialState,
	reducers: {
		addDestination: (state, action: PayloadAction<number>) => {
			return (state = [...state, action.payload]);
		},
		removeDestination: (state) => {
			if (state.length > 0) {
				return (state = state.slice(1));
			}
		},
	},
});

export const { addDestination, removeDestination } = DestinationsSlice.actions;
export default DestinationsSlice.reducer;
