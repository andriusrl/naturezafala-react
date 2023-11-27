import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import api from "../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

export default function Accounts() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [users, setUsers]: any = useState(undefined);
  const [search, setSearch]: any = useState("");

  const [page, setPage] = useState(1);

  console.log("page", page);

  const getUser = async (currentPage = 1) => {
    const response = await api.get(`/user?page=${currentPage}&limit=${12}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setUsers({
      items: response.data.items.map((userItem: any) => {
        const dateString = new Date(userItem.birthDate).toDateString();

        const data = new Date(dateString);

        const dateFormated = format(data, "dd/MM/yyyy", {
          locale: ptBR,
          useAdditionalDayOfYearTokens: true,
        });
        return { ...userItem, birthDate: dateFormated };
      }),
      meta: response.data.meta,
    });
  };

  const getUserSearch = async (currentPage = 1) => {
    const response = await api.post(
      `/user/search?page=${currentPage}&limit=${12}`,
      { text: search },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    console.log("response", response.data);

    setUsers({
      items: response.data.items.map((userItem: any) => {
        const dateString = new Date(userItem.birthDate).toDateString();

        const data = new Date(dateString);

        const dateFormated = format(data, "dd/MM/yyyy", {
          locale: ptBR,
          useAdditionalDayOfYearTokens: true,
        });
        return { ...userItem, birthDate: dateFormated };
      }),
      meta: response.data.meta,
    });
  };

  const handlePage = async (value) => {
    await setPage(value.selected + 1);

    search.length > 0
      ? getUserSearch(value.selected + 1)
      : getUser(value.selected + 1);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getUserSearch();
  }, [search]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Usuários</h2>
        </div>
        <input
          type="text"
          placeholder="Pesquise um nome"
          className="border w-full p-2 text-lg"
          value={search}
          onChange={handleSearch}
        />
        <div>
          {users &&
            users.items.map((userItem) => (
              <div className="flex border mt-1 p-1" key={userItem.id}>
                <p className="text-lg">{userItem.name}</p>
                <p className="w-fit ml-auto mr-2">{userItem.birthDate}</p>
                <button
                  className="bg-[#944B0A] rounded-lg p-2"
                  onClick={() => navigate(`/conta/${userItem.id}`)}
                >
                  Editar
                </button>
              </div>
            ))}
        </div>
        <div className="mt-4 w-fit mx-auto">
          <ReactPaginate
            containerClassName="pagination"
            breakLabel="..."
            nextLabel=" >"
            onPageChange={handlePage}
            pageRangeDisplayed={2}
            pageCount={users?.meta?.totalPages}
            previousLabel="<div "
            renderOnZeroPageCount={null}
          />
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate("/")}
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}
