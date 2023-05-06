import React from 'react';
import { Logo } from "../../shared/ui/logo";
import { Divider } from "../../shared/ui/divider";
import Navigation, { type NavigationButton } from "./navigation";

import styles from './sidebar.module.scss';

import { ReactComponent as ButtonIcon } from "./icons/button.svg";

interface Props {

}

const NAVIGATION_BUTTONS_1: NavigationButton[] = [
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
];

const NAVIGATION_BUTTONS_2: NavigationButton[] = [
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
  { to: '/', icon: <ButtonIcon />},
];

const NAVIGATION_BUTTONS_3: NavigationButton[] = [
  { to: '/', icon: <ButtonIcon />},
];

export const Sidebar: React.FC<Props> = (props) => (
  <div className={styles.sidebar}>
    <Logo />
    <Navigation buttons={NAVIGATION_BUTTONS_1} />
    <Divider />
    <Navigation buttons={NAVIGATION_BUTTONS_2} />
    <Divider />
    <Navigation buttons={NAVIGATION_BUTTONS_3} />
  </div>
)
