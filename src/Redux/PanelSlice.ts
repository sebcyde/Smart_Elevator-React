import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

// Initialise At Ground Floor
const initialState: number = -1;

export const PanelSlice = createSlice({
	name: "CurrentPanel",
	initialState,
	reducers: {
		setCurrentPanel: (state, action: PayloadAction<number>) => {
			return (state = action.payload);
		},
	},
});

export const { setCurrentPanel } = PanelSlice.actions;
export const getCurrentPanel = (state: RootState) => state.currentPanel;
export default PanelSlice.reducer;
