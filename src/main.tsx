import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./shared/App";
import Register from "./routes/Register";
import Login from "./routes/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import MarkPoint from "./routes/MarkPoint";
import Point from "./routes/Point";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cadastrar",
        element: <Register />,
      },
      {
        path: "/entrar",
        element: <Login />,
      },
      {
        path: "/ponto/:pointId",
        element: <Point />,
      },
      {
        path: "/marcarponto/:pollutionTypeId",
        element: <MarkPoint />,
      },
      {
        path: "/marcarponto",
        element: <MarkPoint />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
