import React from "react";
import { Filters } from "../../widgets/filters";

export const TASKS_ROUTE = 'tasks'

export { SubheaderRightComponent } from './ui/subheaderRightComponent'

export const Tasks: React.FC = () => {
  return (
    <>
      <Filters />
    </>
  )
}
