import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <h1>Footer</h1>
    </>
  );
}

export default App;
