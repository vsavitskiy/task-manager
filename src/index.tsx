import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import { DefaultLayout } from "./shared/layouts";
import { Root } from "./pages";
import { Tasks } from "./pages/tasks";
import { Task } from "./pages/tasks/[id]";

import {
  SubheaderRightComponent as TasksPageSubheaderRightComponent
} from "./pages/tasks";

import {
  SubheaderLeftComponent as TaskPageSubheaderLeftComponent,
  SubheaderRightComponent as TaskPageSubheaderRightComponent
} from "./pages/tasks/[id]";

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<DefaultLayout />}>
      <Route index element={<Root />} />
      <Route
        path="tasks"
        element={<Tasks />}
        handle={{
          headerProps: {
            title: 'Tasks',
            subheaderRightComponent: <TasksPageSubheaderRightComponent/>,
          }
        }}
      />

      <Route
        path="tasks/:id"
        element={<Task />}
        handle={{
          headerProps: {
            subheaderLeftComponent: <TaskPageSubheaderLeftComponent />,
            subheaderRightComponent: <TaskPageSubheaderRightComponent />
          }
        }}
      />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
