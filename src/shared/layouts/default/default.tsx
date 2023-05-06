// TODO: remove
// @ts-nocheck
import React from "react";
import { Outlet, useMatches } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Header } from "../../../widgets/header";
import { Sidebar } from "../../../widgets/sidebar";

import "react-toastify/dist/ReactToastify.css";
import styles from './default.module.scss';

export const Default: React.FC = () => {
  const matches = useMatches();

  const [headerProps] = matches
    .filter((match) => Boolean(match.handle?.headerProps))
    .map((match) => match.handle.headerProps);

  return (
    <>
      <header className={styles.header}>
        <Header
          title={headerProps?.title}
          subheaderLeftComponent={headerProps?.subheaderLeftComponent}
          subheaderRightComponent={headerProps?.subheaderRightComponent}
        />
      </header>
      <main className={styles.main}>
        <aside className={styles.aside}>
          <Sidebar />
        </aside>
        <section className={styles.mainContent}>
          <Outlet />
        </section>
      </main>
      <ToastContainer />
    </>
  )
}
