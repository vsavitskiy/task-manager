import React from "react";
import { useParams } from "react-router-dom";

export { SubheaderLeftComponent } from './ui/subheaderLeftComponent'
export { SubheaderRightComponent } from './ui/subheaderRightComponent'

export const Task: React.FC = (props) => {
  const { id } = useParams();

  return (
    <div>Task {id}</div>
  )
}
