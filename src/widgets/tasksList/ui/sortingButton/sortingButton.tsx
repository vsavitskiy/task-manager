import React from 'react';
import cn from "classnames";

import { ReactComponent as SortingIcon } from "./icons/sorting.svg";

import styles from "./sortingButton.module.scss";

export interface SortingButtonProps {
  direction?: 'up' | 'down';
  state?: 'active' | 'inactive';
}

export const SortingButton: React.FC<SortingButtonProps> = (props) => {
  const {
    direction = 'down',
    state = 'inactive'
  } = props;

  return (
    <SortingIcon
      className={cn(
        styles.sortingArrow,
        styles[direction],
        styles[state]
      )}
      width="7"
      height="4"
    />
  );
}
