import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Button: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <button>
      {children}
    </button>
  )
}
