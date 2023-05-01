import React from "react";
import { Link } from "react-router-dom";
import { TASKS_ROUTE } from "../../../../pages/tasks";
import { Input } from "../../../../shared/ui/input";

export const SubheaderLeftComponent = () => (
  <div>
    <Link to={TASKS_ROUTE}>Back to Tasks</Link>
    <br />
    <Input value="Cleaning after every reservation"/>
  </div>
)
