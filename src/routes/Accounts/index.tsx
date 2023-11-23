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

export default function Accounts() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [point, setPoint]: any = useState(undefined);
  const [images, setImages]: any = useState(undefined);
  const [users, setUsers]: any = useState(undefined);

  const [page, setPage] = useState(1);

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

  console.log("page", page);

  const getUser = async (currentPage = 1) => {
    console.log("getUser", page);
    const response = await api.get(`/user?page=${currentPage}&limit=${12}`);

    console.log("response find users");
    console.log(response.data);

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

  console.log("users", users);

  const handlePage = async (value) => {
    await setPage(value.selected + 1);
    getUser(value.selected + 1);
  };

  useEffect(() => {
    getUser();
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
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Usuários</h2>
        </div>
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
