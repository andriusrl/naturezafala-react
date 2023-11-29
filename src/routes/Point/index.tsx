import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import api from "../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ptBR } from "date-fns/locale";
import { format, set } from "date-fns";
import ReactPaginate from "react-paginate";

export default function Point() {
  const { pointId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;

  console.log("state", state);

  const user = useAppSelector((state) => state.user);

  const [point, setPoint]: any = useState(undefined);
  const [images, setImages]: any = useState(undefined);
  const [comments, setComments]: any = useState(undefined);
  const [vote, setVote] = useState({
    true: 0,
    false: 0,
    vote: undefined,
  });

  console.log("point");
  console.log(point);

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
    const response = await api.get(`/point/${Number(pointId)}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    const dateString = new Date(response.data.date).toDateString();

    const data = new Date(dateString);

    const dateFormated = format(data, "dd/MM/yyyy", {
      locale: ptBR,
      useAdditionalDayOfYearTokens: true,
    });

    setPoint({ ...response.data, date: dateFormated });
  };

  const getCommentByPoint = async () => {
    const response = await api.get(
      `/comment/point/${Number(pointId)}?page=${pageComments}&limit=${12}`
    );

    setComments({
      items: response.data.items.map((comment: any) => {
        const dateString = new Date(comment.date).toDateString();

        const data = new Date(dateString);

        const dateFormated = format(data, "dd/MM/yyyy", {
          locale: ptBR,
          useAdditionalDayOfYearTokens: true,
        });
        return { comment: comment.comment, date: dateFormated };
      }),
      meta: response.data.meta,
    });
  };

  const getVoteByPoint = async () => {
    const response = await api.get(`/pointvote/point/${Number(pointId)}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    setVote({
      true: response.data.true,
      false: response.data.false,
      vote: response.data.vote,
    });
  };

  const getImageByPoint = async () => {
    const response = await api.get(`/image/point/${Number(pointId)}`);

    setImages(response.data);
  };

  const handleVote = async (vote) => {
    console.log("handleVote", vote);
    try {
      await api.post(
        `/pointvote/${pointId}`,
        {
          vote,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      getPoint();
      getVoteByPoint();

      alert(
        `Você votou que o ponto ${
          vote ? "foi solucionado" : "não foi solucionado"
        }`
      );
    } catch (err) {
      alert("É necessário estar logado para votar");
      navigate("/entrar");
    }
  };

  const handlePageComment = (value) => {
    setPageComments(value.selected);
    getCommentByPoint();
  };

  console.log("vote");
  console.log(vote);

  useEffect(() => {
    getPoint();
    getImageByPoint();
    getCommentByPoint();
    getVoteByPoint();
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

          <div className="mx-3 my-auto"> | </div>

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
            <h2 className="w-fit mx-auto text-3xl">{point.name}</h2>(
            {point.date})
          </div>
          <div className="">
            <p className="text-2xl">{point.description}</p>
          </div>
          <div className="">
            {/* <h2 className="w-fit mx-auto text-3xl">Fotos</h2> */}
            {images?.length > 0 ? (
              <Carousel>
                {images.map((image) => (
                  <div>
                    <img alt={image?.point?.name} src={image?.url} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <div className="flex-col w-fit mx-auto">
                <div className="w-fit mx-auto">Nenhuma imagem</div>
                <button
                  onClick={() => navigate(`/ponto/imagem/${pointId}`)}
                  className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
                >
                  Adicionar imagem
                </button>
              </div>
            )}
          </div>
          <div className="text-xl my-4">
            <div>
              <div>
                <span className="text-blue-600 font-bold">{vote.true}</span>{" "}
                Marcaram que foi solucionado.
              </div>
              <div>
                <span className="text-red-600 font-bold">{vote.false}</span>{" "}
                Marcaram que não foi solucionado.
              </div>
            </div>
            Você também pode marcar abaixo:
            <div className="flex justify-between">
              <button
                onClick={() => handleVote(true)}
                className={`${
                  vote.vote ? "bg-slate-400" : "bg-slate-200"
                } rounded-lg p-2 font-extrabold text-xl`}
              >
                Solucionado
              </button>

              <button
                onClick={() => handleVote(false)}
                className={`${
                  vote.vote !== undefined
                    ? !vote.vote
                      ? "bg-slate-400"
                      : "bg-slate-200"
                    : "bg-slate-200"
                } rounded-lg p-2 font-extrabold text-xl`}
              >
                Não Solucionado
              </button>
            </div>
          </div>
          <div>
            <div className="flex-col w-fit mx-auto">
              <h2 className="w-fit mx-auto text-3xl font-semibold">
                Comentários
              </h2>
            </div>
            {comments?.items?.length > 0 ? (
              comments.items.map((comment) => (
                <div className="flex border mt-1 p-1">
                  <p className="text-lg">{comment.comment}</p>
                  <p className="w-fit ml-auto">{comment.date}</p>
                </div>
              ))
            ) : (
              <div className="w-fit mx-auto text-xl">Nenhum comentário</div>
            )}
          </div>
          <div className="mt-4 w-fit mx-auto">
            <ReactPaginate
              containerClassName="pagination"
              breakLabel="..."
              nextLabel=" >"
              onPageChange={handlePageComment}
              pageRangeDisplayed={2}
              pageCount={comments?.meta?.totalPages}
              previousLabel="< "
              renderOnZeroPageCount={null}
            />
          </div>
          <div className="w-fit mx-auto">
            <button
              onClick={() => navigate(`/comentar/${Number(pointId)}`)}
              className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Comentar
            </button>
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={() => {
                if (state?.previousSearch)
                  return navigate(
                    `/ponto/procurar/${encodeURIComponent(
                      state?.previousSearch
                    )}`
                  );

                if (state?.returnMyPoints) return navigate("/meuspontos");

                navigate("/");
              }}
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Voltar
            </button>
            {point?.user && (
              <button
                onClick={() => setUpdateStatus(true)}
                className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
