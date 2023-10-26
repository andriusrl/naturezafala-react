import React from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';

const Navbar = () => {
  return (
    <div className="h-14">
      <div className="flex font-extrabold h-full">
        <div className="h-fit my-auto text-4xl ml-2">
          <span className="text-[#0A5B0D]">Natureza</span>
          <span className="text-[#944B0A]">Fala</span>
        </div>
        <div className="flex ml-auto mr-2">
          <BsSearch className="my-auto w-fit  mr-3" size={33} />
          <GiHamburgerMenu className="my-auto w-fit" size={46} />
        </div>
      </div>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color="black">
        <path d="M2 6h20M2 12h20M2 18h20" />
      </svg> */}
      <nav className="hidden">
        <Link to="/">Página inicial</Link>
        <Link to="/entrar">Entrar</Link>
        <Link to="/cadastrar">Cadastrart</Link>
      </nav>
    </div>
  );
};

export default Navbar;
