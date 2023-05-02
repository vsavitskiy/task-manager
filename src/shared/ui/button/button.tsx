import React, { ReactNode } from "react";
import cn from 'classnames';

import styles from './button.module.scss';

export type ButtonVariants = "default" | "primary" | "danger";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  variant?: ButtonVariants;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "default",
    ...rest
  } = props;

  return (
    <button
      className={cn(styles.button, styles[variant])}
      {...rest}
    >
      {children}
    </button>
  )
}
