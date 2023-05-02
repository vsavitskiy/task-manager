import React from "react";
import { Avatar } from "../../../../shared/ui/avatar/avatar";

interface UserCardProps {
  name: string;
  avatarUrl?: string;
}

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { name, avatarUrl = 'https://i.pravatar.cc/300' } = props;
  const [firstName, lastName] = name.split(' ');

  return (
    <div>
      <Avatar src={avatarUrl} />
      {
        name
          ? <div>{firstName} {lastName.slice(0,1)}.</div>
          : null
      }
    </div>
  )
}
