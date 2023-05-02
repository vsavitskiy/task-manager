import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import styles from './datepicker.module.scss';

export interface DatePickerProps extends ReactDatePickerProps {
  name: string;
  label?: string;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { label, name, ...rest } = props;

  return (
    <div className={styles.datepicker}>
      <label htmlFor={name}>
        <div>{label}</div>
      </label>

      <ReactDatePicker
        id={name}
        shouldCloseOnSelect
        {...rest}
      />
    </div>
  )
}
