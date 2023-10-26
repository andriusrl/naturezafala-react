import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsSearch } from 'react-icons/bs';

const Navbar = () => {
  const [menu, setMenu] = useState(false)
  const handleMenu = () => setMenu(!menu)

  return (
    <div className="">
      <div className={`flex font-extrabold h-full`}>
        <div className={`h-fit my-auto text-4xl ml-2`}>
          <span className="text-[#0A5B0D]">Natureza</span>
          <span className="text-[#944B0A]">Fala</span>
        </div>
        <div className="flex ml-auto mr-2">
          <BsSearch className="my-auto w-fit  mr-3" size={33} color="#0A5B0D" />
          <GiHamburgerMenu className="my-auto w-fit" size={46} color="#944B0A" onClick={handleMenu} />
        </div>
      </div>
      <div className={`mb-2 flex justify-center items-center font-semibold ${menu ? "" : "hidden"}`}>
        <Link to="/" className="bg-slate-200 rounded-lg p-2">Página inicial</Link>
        <span className="mx-2">|</span>
        <Link to="/entrar" className="bg-slate-200 rounded-lg p-2">Entrar</Link>
        <span className="mx-2">|</span>
        <Link to="/cadastrar" className="bg-slate-200 rounded-lg p-2">Cadastrar</Link>
      </div>
    </div>
  );
};

export default Navbar;
