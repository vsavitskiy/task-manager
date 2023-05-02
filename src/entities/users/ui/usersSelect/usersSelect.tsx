import React from "react";
import { selectUsers } from "../../model/selectors";
import { useAppSelector } from "../../../../app/hooks";
import { Select, SelectProps } from "../../../../shared/ui/select";

type OmittedProps = 'label' | 'name' | 'children';

export const UsersSelect: React.FC<Omit<SelectProps, OmittedProps>> = (props) => {
  const { value, onChange, ...rest } = props;
  const users = useAppSelector(selectUsers);

  return (
    <Select
      name="assignee"
      label="Assignee"
      value={String(value)}
      onChange={onChange}
      {...rest}
    >
      <option value="null">Select user</option>

      {users.map((user) => (
        <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
      ))}
    </Select>
  )
}
