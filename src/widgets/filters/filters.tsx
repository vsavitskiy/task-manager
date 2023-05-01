import React from "react";
import {Select} from "../../shared/ui/select";

export const Filters: React.FC = () => {
  return (
    <div>
      <Select name="assignee" label="Assignee">
        <option value="test1">Test 1</option>
        <option value="test2">Test 2</option>
        <option value="test3">Test 3</option>
      </Select>
    </div>
  )
}
