import React, { ReactNode } from "react";

import styles from './select.module.scss';

export interface SelectProps extends Omit<React.ComponentPropsWithoutRef<"select">, 'onChange'> {
  children: ReactNode | ReactNode[];
  label: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = (props) => {
  const {
    children,
    label,
    onChange = () => null,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  }

  return (
    <div className={styles.select}>
      <label>
        <div>{label}</div>
        <select onChange={handleChange} {...rest}>
          {children}
        </select>
      </label>
    </div>
  )
}
