import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import api from "../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

export default function PointModeration() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [points, setPoints]: any = useState(undefined);

  const [page, setPage] = useState(1);

  const getPoints = async (currentPage = 1) => {
    const response = await api.get(`/point?page=${currentPage}&limit=${12}`);

    console.log("getPoints", response.data);

    setPoints(response.data);
    // setPoints({ ...response.data, date: dateFormated });
  };

  const convertDate = (date) => {
    const dateString = new Date(date).toDateString();

    const data = new Date(dateString);

    const dateFormated = format(data, "dd/MM/yyyy", {
      locale: ptBR,
      useAdditionalDayOfYearTokens: true,
    });
    return dateFormated;
  };

  const handlePage = async (value) => {
    await setPage(value.selected + 1);
    getPoints(value.selected + 1);
  };

  useEffect(() => {
    getPoints();
  }, []);

  console.log("points", points);

  return (
    <div>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Todos os pontos</h2>
        </div>
        {/* <div className="">
          <p className="">{point.description}</p>
          <p className="w-fit mx-auto text-3xl">{point.date}</p>
        </div> */}
        <div className=""></div>
        <div>
          {points &&
            points.items.map((pointItem) => (
              <div className="flex border mt-1 p-1">
                <p className="text-lg">{pointItem.name}</p>
                <p className="w-fit ml-auto">{pointItem.status }</p>
                <p className="w-fit ml-auto">{convertDate(pointItem.date)}</p>
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
            pageCount={points?.meta?.totalPages}
            previousLabel="< "
            renderOnZeroPageCount={null}
          />
        </div>
        {/* <div className="w-full">
          <button
            onClick={() => navigate(`/comentar/${Number(pointId)}`)}
            className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Comentar
          </button>
        </div> */}

        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate("/")}
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>
          {/* <button
            onClick={() => setUpdateStatus(true)}
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Editar
          </button> */}
        </div>
      </div>
    </div>
  );
}
