import React, { ReactNode } from "react";
import { Searchbar } from "../../features/searchbar";

import styles from './header.module.css';

export interface HeaderProps {
  subheaderLeftComponent?: ReactNode;
  subheaderRightComponent?: ReactNode;
  title?: string;
}

export const Header: React.FC<HeaderProps> = (props) => {
  const {
    subheaderLeftComponent,
    subheaderRightComponent,
    title
  } = props;

  const LeftComponent = subheaderLeftComponent || title || null;
  const RightComponent = subheaderRightComponent || null;

  return (
    <div className={styles.header}>
      <div className={styles.general}>
        <Searchbar />
      </div>

      <div className={styles.leftSide}>
        { LeftComponent }
      </div>

      <div className={styles.rightSide}>
        { RightComponent }
      </div>
    </div>
  )
}
