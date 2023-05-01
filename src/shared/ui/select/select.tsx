import React, { ReactNode } from "react";

export interface SelectProps extends React.ComponentPropsWithoutRef<"select"> {
  children: ReactNode | ReactNode[];
  label: string;
}

export const Select: React.FC<SelectProps> = (props) => {
  const { children, name = "select", label } = props;

  return (
    <div>
      {
        label
          ? <label htmlFor={name}></label>
          : null
      }
      <select name={name} {...props}>
        {children}
      </select>
    </div>
  )
}
