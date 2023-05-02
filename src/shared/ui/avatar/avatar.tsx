import React from "react";

import styles from './avatar.module.scss';

export interface AvatarProps extends React.ComponentPropsWithoutRef<"img"> {
  src: string
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  const { src, ...rest } = props;

  return (
    <div className={styles.avatar}>
      <img {...rest} className={styles.image} src={src} />
    </div>
  )
}
