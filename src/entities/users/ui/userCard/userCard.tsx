import React from "react";
import { Avatar } from "../../../../shared/ui/avatar/avatar";
import {useAppSelector} from "../../../../app/hooks";
import { usersSelectors } from "../..";

interface UserCardProps {
  id: string;
}

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { id } = props;
  const user = useAppSelector(usersSelectors.selectUserById(id));
  const avatarUrl = 'https://i.pravatar.cc/300';

  if (!user) {
    return null;
  }

  return (
    <div>
      <Avatar src={avatarUrl} />
      <div>{user.first_name} {user.last_name.slice(0,1)}.</div>
    </div>
  )
}
