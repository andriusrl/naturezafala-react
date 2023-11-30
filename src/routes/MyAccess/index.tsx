import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import api from "../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactPaginate from "react-paginate";
import convertDate from "../../shared/helpers/dateConverter";

const ACCESS_HELPER = [
  "LOGOU",
  "VISUALIZOU",
  "ADICIONOU",
  "ATUALIZOU",
  "DELETOU",
];
export default function MyAccess() {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [access, setAccess]: any = useState(undefined);

  const [page, setPage] = useState(1);

  const getAccess = async (currentPage = 1) => {
    try {
      const response = await api.get(
        `/access/myaccess?page=${currentPage}&limit=${12}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setAccess({
        items: response.data.items,
        meta: response.data.meta,
      });
    } catch (err) {
      alert("É necessário estar logado para acessar essa página");
      navigate("/entrar");
    }
  };

  const handlePage = async (value) => {
    await setPage(value.selected + 1);

    getAccess(value.selected + 1);
  };

  useEffect(() => {
    getAccess();
  }, []);

  return (
    <div>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Meus acessos:</h2>
        </div>
        <div className=""></div>
        <div>
          {access &&
            access.items.map((accessItem) => (
              <div key={accessItem.id} className="border mt-1 p-1">
                <div className="flex px-2">
                  <p className="text-lg font-bold h-fit my-auto">
                    {ACCESS_HELPER[accessItem.action - 1]}
                  </p>

                  <p className="text-lg font-bold h-fit my-auto ml-auto mr-[10%]">
                    {accessItem.description}
                  </p>

                  <p className="w-fit h-fit my-auto font-semibold">
                    {convertDate(accessItem.date)}
                  </p>
                </div>
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
            pageCount={access?.meta?.totalPages}
            previousLabel="< "
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
