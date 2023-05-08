import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  search_query: string;
  modal_opened: boolean;
}

const initialState: SearchState = {
  search_query: '',
  modal_opened: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setValue: (state: SearchState, action: PayloadAction<string>) => {
      state.search_query = action.payload;
    },
    toggleModal: (state: SearchState) => {
      state.modal_opened = !state.modal_opened;
    }
  }
});

export const searchReducer = searchSlice.reducer;
export const searchActions = searchSlice.actions;



