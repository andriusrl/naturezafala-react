import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import api from "../../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ReactPaginate from "react-paginate";
import convertDate from "../../../shared/helpers/dateConverter";

export default function ModerationImages() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [images, setImages]: any = useState(undefined);
  const [search, setSearch]: any = useState("");

  const [page, setPage] = useState(1);

  const getImages = async (currentPage = 1) => {
    const response = await api.get(`/image?page=${currentPage}&limit=${12}`);

    console.log("getImagens", response.data);

    setImages(response.data);
    // setPoints({ ...response.data, date: dateFormated });
  };

  const getImageSearch = async (currentPage = 1) => {
    const response = await api.post(
      `/image/search?page=${currentPage}&limit=${12}`,
      { text: search },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    console.log("response", response.data);

    setImages({
      items: response.data.items,
      meta: response.data.meta,
    });
  };

  const handlePage = async (value) => {
    await setPage(value.selected + 1);

    search.length > 0
      ? getImageSearch(value.selected + 1)
      : getImages(value.selected + 1);
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getImageSearch();
  }, [search]);

  useEffect(() => {
    getImages();
  }, []);

  console.log("images", images);

  return (
    <div>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Todos as Imagens</h2>
        </div>
        <input
          type="text"
          placeholder="Pesquise um ponto"
          className="border w-full p-2 text-lg"
          value={search}
          onChange={handleSearch}
        />
        <div className=""></div>
        <div>
          {images &&
            images.items.map((imageItem) => (
              <div className="border mt-1 p-1">
                <div className="flex">
                  <div className="w-52 h-[52]">
                    <img src={imageItem.url} className="object-cover" />
                  </div>

                  <button
                    onClick={() => navigate(`/moderacao/imagem/${imageItem.id}`)}
                    className="p-2 ml-auto bg-slate-400 rounded-lg p-2 font-bold text-xl"
                  >
                    Visualizar
                  </button>
                </div>
                <div className="flex">
                  {/* <p className="w-fit h-fit my-auto font-semibold">
                    {convertDate(imageItem.date)}
                  </p> */}
                  <p className="w-fit h-fit my-auto ml-auto mr-2 font-semibold">
                    {imageItem.status ? "Ativo" : "Inativo"}
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
            pageCount={images?.meta?.totalPages}
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
