import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from './icons/logo.svg';
import { ROOT_ROUTE } from "../../../pages";

import styles from './logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <Link to={ROOT_ROUTE}>
        <LogoIcon />
      </Link>
    </div>
  );
};
