import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Needed for floor loading animations
const initialState: boolean = false;

export const ChangingFloorSlice = createSlice({
	name: "ChangingFloor",
	initialState,
	reducers: {
		setChangingFloor: (state, action: PayloadAction<boolean>) => {
			return (state = action.payload);
		},
	},
});

export const { setChangingFloor } = ChangingFloorSlice.actions;
export default ChangingFloorSlice.reducer;
