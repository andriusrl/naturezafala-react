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

export default function Point() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [point, setPoint]: any = useState(undefined);
  const [images, setImages]: any = useState(undefined);
  const [comments, setComments]: any = useState(undefined);

  const [pageComments, setPageComments] = useState(1);

  const [updateStatus, setUpdateStatus] = useState(false);

  type loginType = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginType>();

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    console.log(data);
    console.log("registrado");

    // const response = await api.post("/point", {
    //   name: data.name,
    //   description: data.description,
    //   latitude: user.lat,
    //   longitude: user.long,
    //   pollution_type: pollutionTypeId,
    // });

    // console.log("response", response.data);
  };

  // console.log(watch("email"))

  const getPoint = async () => {
    const response = await api.get(`/point/${pointId}`);

    const dateString = new Date(response.data.date).toDateString();

    const data = new Date(dateString);

    const dateFormated = format(data, "dd/MM/yyyy", {
      locale: ptBR,
      useAdditionalDayOfYearTokens: true,
    });

    setPoint({ ...response.data, date: dateFormated });
  };

  const getImageByPoint = async () => {
    const response = await api.get(`/image/point/${pointId}`);

    setImages(response.data);
  };

  const getCommentByPoint = async () => {
    const response = await api.get(`/comment/point/${pointId}`);
    console.log("response find comments", response.data);

    setComments(
      response.data.map((comment: any) => {
        const dateString = new Date(comment.date).toDateString();

        const data = new Date(dateString);

        const dateFormated = format(data, "dd/MM/yyyy", {
          locale: ptBR,
          useAdditionalDayOfYearTokens: true,
        });
        return { comment: comment.comment, date: dateFormated };
      })
    );
  };

  useEffect(() => {
    getPoint();
    getImageByPoint();
    getCommentByPoint();
  }, []);

  return updateStatus ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Editando: {point.name}</h2>

          <div className="mt-2 w-fit mx-auto">
            <input
              placeholder="Nome para o ponto"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              value={point.name}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="w-fit mt-1 text-red-600">
                É necessário dar um nome de identificação
              </div>
            )}
          </div>

          <div className="mt-2 w-fit mx-auto">
            <input
              placeholder="Descrição do ponto"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              value={point.description}
              {...register("description", { required: true })}
            />
            {errors.description && (
              <div className="w-fit mt-1 text-red-600">
                É necessário uma descrição para o ponto
              </div>
            )}
          </div>

          {user.lat === null && user.long === null && (
            <div>
              <div className="mt-2 w-fit mx-auto">
                <input
                  placeholder="Latitude"
                  className="text-2xl pl-2 border border-slate-400 rounded-md"
                  value={point.latitude}
                  {...register("latitude", { required: true })}
                />
                {errors.latitude && (
                  <div className="w-fit mt-1 text-red-600">
                    Colocar a latitude
                  </div>
                )}
              </div>

              {/* <div className="mt-2 w-fit mx-auto">
                <input
                  placeholder="Longitude"
                  className="text-2xl pl-2 border border-slate-400 rounded-md"
                  value={point.longitude}
                  {...register("longitude", { required: true })}
                />
                {errors.longitude && (
                  <div className="w-fit mt-1 text-red-600">
                    Colocar a longitude
                  </div>
                )}
              </div> */}
            </div>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setUpdateStatus(false)}
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Salvar
          </button>
        </div>
      </div>
    </form>
  ) : (
    <div>
      {point && (
        <div className="p-2 mx-2 border">
          <div className="flex-col w-fit mx-auto">
            <h2 className="w-fit mx-auto text-3xl">{point.name}</h2>
          </div>
          <div className="">
            <p className="">{point.description}</p>
            <p className="w-fit mx-auto text-3xl">{point.date}</p>
          </div>
          <div className="">
            {/* <h2 className="w-fit mx-auto text-3xl">Fotos</h2> */}
            {images && (
              <Carousel>
                {images.map((image) => (
                  <div>
                    <img alt={image?.point?.name} src={image?.url} />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div>
            <div className="flex-col w-fit mx-auto">
              <h2 className="w-fit mx-auto text-3xl">Comentários</h2>
            </div>
            {comments &&
              comments.map((comment) => (
                <div className="flex border mt-1 p-1">
                  <p className="text-lg">{comment.comment}</p>
                  <p className="w-fit ml-auto">{comment.date}</p>
                </div>
              ))}
          </div>
          <div className="flex w-full mt-4">
            <ReactPaginate
              containerClassName="pagination"
              breakLabel="..."
              nextLabel="next >"
              // onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={123}
              // previousLabel="< previous"
              renderOnZeroPageCount={null}
            />
          </div>

          <div className="flex justify-center mt-2">
            <button
              // type="submit"
              onClick={() => navigate("/")}
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Voltar
            </button>
            <button
              onClick={() => setUpdateStatus(true)}
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
