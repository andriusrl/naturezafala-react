import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import api from "../../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ReactPaginate from "react-paginate";
import convertDate from "../../../shared/helpers/dateConverter";
import { set } from "date-fns";

export default function ModerationImages() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [images, setImages]: any = useState(undefined);
  const [search, setSearch]: any = useState("");
  const [filterStatus, setFilterStatus]: any = useState(undefined);

  console.log('filterStatus')
  console.log(filterStatus)

  const [page, setPage] = useState(1);

  const getImageSearch = async (currentPage = 1) => {
    console.log('getImageSearch')
    const response = await api.post(
      `/image?page=${currentPage}&limit=${12}${filterStatus !== undefined ? `&status=${filterStatus === true ? "ativo" : "inativo"}` : ""}`,
      { text: search },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    console.log('response.data')
    console.log(response.data)

    setImages({
      items: response.data.items,
      meta: response.data.meta,
    });
  };

  console.log('novo teste image')
  console.log(images)

  const handlePage = async (value) => {
    await setPage(value.selected + 1);

    search.length > 0
      && getImageSearch(value.selected + 1);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    console.log('use do test')
    getImageSearch();
  }, [search, filterStatus]);

  useEffect(() => {
    getImageSearch();
  }, []);

  return (
    <div>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Todos as Imagens</h2>
        </div>
        <input
          type="text"
          placeholder="Pesquise uma imagem"
          className="border w-full p-2 text-lg"
          value={search}
          onChange={handleSearch}
        />
        <div className="flex justify-center mt-2">
          <div className="my-auto mr-2">Filtro:</div>
          <button
            onClick={() => setFilterStatus(filterStatus === true ? undefined : true)}
            className={`${filterStatus === true ? "bg-slate-400" : "bg-slate-200"}  rounded-lg p-2 font-extrabold text-xl mr-2`}
          >
            Ativo
          </button>
          <button
            onClick={() => setFilterStatus(filterStatus === true ? undefined : false)}
            className={`${filterStatus === false ? "bg-slate-400" : "bg-slate-200"}  rounded-lg p-2 font-extrabold text-xl mr-2`}
          >
            Inativo
          </button>
        </div>
        <div>
          {images &&
            images.items.map((imageItem) => (
              <div className="border mt-1 p-1">
                <div className="flex justify-between">
                  <div className="my-auto">
                    <img
                      src={imageItem.url}
                      className="w-24 h-24 object-cover"
                    />
                  </div>

                  <div className="my-auto">
                    <p className="w-fit h-fit my-auto font-semibold">
                      {imageItem.status ? (
                        <span className="text-blue-700">Ativo</span>
                      ) : (
                        <span className="text-red-600">Inativo</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/moderacao/imagem/${imageItem.id}`)
                    }
                    className="p-2 bg-slate-400 rounded-lg p-2 font-bold text-xl"
                  >
                    Visualizar
                  </button>
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
            pageCount={images?.meta?.totalPages}
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
