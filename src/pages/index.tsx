import React from "react";
import { Link } from "react-router-dom";
import { TASKS_ROUTE } from "./tasks";

interface Props {

}

export const Root: React.FC<Props> = () => {
  return (
    <div>
      <div>Root</div>
      <Link to={TASKS_ROUTE}>Tasks</Link>
    </div>
  )
}
