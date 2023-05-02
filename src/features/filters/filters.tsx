import React from "react";
import { DatePicker } from "../../shared/ui/datepicker";
import { UsersSelect } from "../../entities/users/ui/usersSelect";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFilters } from "./model/selectors";
import { filtersActions, SetFilterAction } from "./model/slice";

import styles from './filters.module.scss';
import {parseISO} from "date-fns";

export const Filters: React.FC = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleChange = (field: string, value: any) => {
    dispatch(filtersActions.setFilters({field, value} as SetFilterAction))
  }

  return (
    <div className={styles.filters}>
      <UsersSelect
        value={String(filters.assignee)}
        onChange={(value) => handleChange('assignee', value)}
      />

      <DatePicker
        name="startingDate"
        label="Starting date"
        selected={filters.starts_at ? parseISO(filters.starts_at) : null}
        onChange={(date) => handleChange('starts_at', date?.toISOString())}
      />
      <DatePicker
        name="dueDate"
        label="Due date"
        selected={filters.due_at ? parseISO(filters.due_at) : null}
        onChange={(date) => handleChange('due_at', date?.toISOString())}
      />
    </div>
  )
}
