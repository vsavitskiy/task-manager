import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FiltersState {
  assignee: string | null;
  starts_at: string | null;
  due_at: string | null;
}

export interface SetFilterAction {
  field: keyof FiltersState;
  value: any;
}

const initialState: FiltersState = {
  assignee: null,
  starts_at: null,
  due_at: null,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<SetFilterAction>) => {
      const { payload } = action;
      const { field, value } = payload;
      const filters: FiltersState = {
        ...state,
        [field]: value,
      }

      if (filters.assignee === 'null') {
        filters.assignee = null;
      }

      return filters
    }
  }
});

export const filtersReducer = filtersSlice.reducer;
export const filtersActions = filtersSlice.actions;



