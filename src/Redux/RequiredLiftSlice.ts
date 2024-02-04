import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Needed for floor loading animations
const initialState: number = 0;

export const RequiredLiftSlice = createSlice({
	name: "RequiredLift",
	initialState,
	reducers: {
		setRequiredLift: (state, action: PayloadAction<number>) => {
			return (state = action.payload);
		},
	},
});

export const { setRequiredLift } = RequiredLiftSlice.actions;
export default RequiredLiftSlice.reducer;
