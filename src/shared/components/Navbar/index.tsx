import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Página inicial</Link>
      <Link to="/entrar">Entrar</Link>
      <Link to="/cadastrar">Cadastrart</Link>
    </nav>
  );
};

export default Navbar;
