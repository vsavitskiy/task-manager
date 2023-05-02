import React from 'react';

import styles from './input.module.scss';

export interface InputProps extends Omit<React.ComponentPropsWithoutRef<"input">, 'onChange'> {
  name?: string;
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    label,
    onChange = () => null,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className={styles.input}>
      <label>
        <div>{label}</div>
        <input onChange={handleChange} {...rest} />
      </label>
    </div>
  )
}
