import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

// Initialise At Ground Floor
const initialState: string = "";

export const UpdateSlice = createSlice({
	name: "Update",
	initialState,
	reducers: {
		setUpdate: (state, action: PayloadAction<string>) => {
			return (state = action.payload);
		},
	},
});

export const { setUpdate } = UpdateSlice.actions;
export const getUpdate = (state: RootState) => state.Update;
export default UpdateSlice.reducer;
