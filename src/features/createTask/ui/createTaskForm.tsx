import React from "react";
import { Input } from "../../../shared/ui/input";
import { InputProps } from "../../../shared/ui/input/input";

interface CreateTaskFormProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
  value?: string;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = (props) => {
  const {
    onChange = () => null,
    ...rest
  } = props;

  const handleChange = (value: string) => {
    onChange(value);
  }

  return (
    <div>
      <h3>Create a new task</h3>
      <Input
        name="taskName"
        label="Task name"
        onChange={handleChange}
        {...rest}
      />
    </div>
  )
}
