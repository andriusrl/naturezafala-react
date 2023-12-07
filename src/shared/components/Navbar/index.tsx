import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { user as useStorage } from "../../../config/localStorage/localStorage";
import {
  setToken,
  setName,
  setMenuPollutionTypeStatus,
  setType,
} from "../../../features/user/user-slice";
import { useAppSelector } from "../../../hooks";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menu, setMenu] = useState(false);
  const [showLoginRegister, setLoginRegister] = useState(false);
  const [searchInput, setSearchInput] = useState(false);
  const [search, setSearch] = useState("");

  const user = useAppSelector((state) => state.user);

  console.log("user", user);

  const handleMenu = () => {
    setSearchInput(false);
    setMenu(!menu);
  };

  useEffect(() => {
    if (user.token !== null) {
      return setLoginRegister(false);
    }
    return setLoginRegister(true);
  }, [user.token]);

  const handleLogout = () => {
    useStorage.remove();
    dispatch(setToken(null));
    dispatch(setName(null));
    dispatch(setType(null));
    navigate(`/`);
    dispatch(setMenuPollutionTypeStatus(false));
  };

  console.log("user?.type");
  console.log(user?.type);

  return (
    <div className="mt-2">
      <div className={`flex font-extrabold h-full`}>
        {!searchInput && (
          <div
            className={`h-fit my-auto text-4xl ml-2 cursor-pointer`}
            onClick={() => {
              navigate("/");
              dispatch(setMenuPollutionTypeStatus(false));
            }}
          >
            <span className="text-[#0A5B0D]">Natureza</span>
            <span className="text-[#944B0A]">Fala</span>
          </div>
        )}
        {searchInput && (
          <div className="flex mx-2 w-full">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Digite sua pesquisa"
                className="py-2 px-2 border border-gray-300 rounded-md w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                onClick={() =>
                  search.length > 0 &&
                  navigate(`/ponto/procurar/${encodeURIComponent(search)}`)
                }
              >
                <BsSearch
                  className="my-auto w-fit  mr-3"
                  size={33}
                  color="#0A5B0D"
                />
              </div>
            </div>
            <GiHamburgerMenu
              className="my-auto w-fit"
              size={46}
              color="#944B0A"
              onClick={handleMenu}
            />
          </div>
        )}
        {!searchInput && (
          <div className="flex mx-2 w-full">
            <div className="relative w-full">
              <div
                className="absolute inset-y-0 right-0 flex items-center"
                onClick={() => setSearchInput(!searchInput)}
              >
                <BsSearch
                  className="my-auto w-fit  mr-3"
                  size={33}
                  color="#0A5B0D"
                />
              </div>
            </div>
            <GiHamburgerMenu
              className="my-auto w-fit"
              size={46}
              color="#944B0A"
              onClick={handleMenu}
            />
          </div>
        )}
      </div>
      <div
        className={`mb-2 flex flex-wrap justify-center items-center font-semibold ${
          menu ? "" : "hidden"
        }`}
      >
        <Link
          to="/"
          onClick={() => dispatch(setMenuPollutionTypeStatus(false))}
          className="bg-slate-200 rounded-lg p-2 flex-1/3"
        >
          Página inicial
        </Link>
        {user?.type !== 0 && user?.type !== null && (
          <>
            <div className="flex-1/3">
              <span className="mx-2">|</span>
              <span
                onClick={() => navigate("/meuspontos")}
                className="bg-slate-200 rounded-lg p-2 cursor-pointer"
              >
                Meus pontos
              </span>
            </div>

            <div className="flex-1/3">
              <span className="mx-2">|</span>
              <span
                onClick={() => navigate("/meusacessos")}
                className="bg-slate-200 rounded-lg p-2 cursor-pointer"
              >
                Meus acessos
              </span>
            </div>
          </>
        )}
        {showLoginRegister && (
          <>
            <span className="mx-2">|</span>
            <Link to="/entrar" className="bg-slate-200 rounded-lg p-2">
              Entrar
            </Link>
            <span className="mx-2">|</span>
            <Link to="/cadastrar" className="bg-slate-200 rounded-lg p-2">
              Cadastrar
            </Link>
          </>
        )}
        {user.type === 1 && !showLoginRegister && (
          <>
            <div className="flex-1/3">
              <span className="mx-2">|</span>
              <span
                onClick={() => navigate("/contas")}
                className="bg-slate-200 rounded-lg p-2 cursor-pointer"
              >
                Contas
              </span>
            </div>
          </>
        )}
        {(user?.type === 1 || user?.type === 2) && (
          <>
            <span className="mx-2 flex-1/3">|</span>
            <span
              onClick={() => navigate("/moderacao/imagem")}
              className="bg-slate-200 rounded-lg p-2 cursor-pointer"
            >
              Imagens
            </span>
            <span className="mx-2 flex-1/3">|</span>
            <span
              onClick={() => navigate("/moderacao/ponto")}
              className="bg-slate-200 rounded-lg p-2 cursor-pointer"
            >
              Pontos
            </span>
          </>
        )}
        {!showLoginRegister && (
          <>
            <span className="mx-2">|</span>
            <span
              onClick={handleLogout}
              className="bg-slate-200 rounded-lg p-2 cursor-pointer"
            >
              Sair
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
