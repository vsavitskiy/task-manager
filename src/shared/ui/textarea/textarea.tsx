import React from "react";

import styles from './textarea.module.scss';

interface TextareaProps extends Omit<React.ComponentPropsWithoutRef<"textarea">, 'onChange'> {
  label?: string;
  onChange?: (value: string) => void;
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  const {
    label,
    onChange = () => null,
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.currentTarget.value)
  }

  return (
    <div className={styles.textarea}>
      <label>
        <div>{label}</div>
        <textarea onChange={handleChange} {...rest} />
      </label>
    </div>
  )
}
