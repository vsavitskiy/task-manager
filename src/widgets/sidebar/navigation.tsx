import React, { ReactNode } from 'react';
import { Link } from "react-router-dom";

import styles from './navigation.module.scss';

export interface NavigationButton {
  icon: ReactNode;
  to: string;
}

export interface NavigationProps {
  buttons: NavigationButton[];
}

const Navigation: React.FC<NavigationProps> = (props) => {
  return (
    <div className={styles.navigation}>
      {
        props.buttons.map(({ to, icon }: NavigationButton, index) => (
          <Link key={index} to={to}>
            {icon}
          </Link>
        ))
      }
    </div>
  );
};

export default Navigation;
