// TODO: remove
// @ts-nocheck
import React from "react";
import { Outlet, useMatches } from "react-router-dom";
import { Header } from "../../widgets/header";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const Default: React.FC = () => {
  const matches = useMatches();

  const [headerProps] = matches
    .filter((match) => Boolean(match.handle?.headerProps))
    .map((match) => match.handle.headerProps);

  return (
    <>
      <Header
        title={headerProps?.title}
        showBackButton={headerProps?.showBackButton}
        subheaderLeftComponent={headerProps?.subheaderLeftComponent}
        subheaderRightComponent={headerProps?.subheaderRightComponent}
      />
      <main>
        <Outlet />
      </main>
      <ToastContainer />
    </>
  )
}
