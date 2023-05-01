import React from 'react';

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  value?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <input {...props} />
  )
}
