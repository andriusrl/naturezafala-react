import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import api from "../../config/axios/api";

export default function MarkPoint() {
  const { pollutionTypeId } = useParams();

  console.log("pollutionTypeId", pollutionTypeId);

  const user = useAppSelector((state) => state.user);

  console.log("user markpoint", user);

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

    const response = await api.post("/point", {
      name: data.name,
      description: data.description,
      date: new Date(),
      latitude: user.lat,
      longitude: user.long,
      pollutionTypeId,
    });

    console.log("response", response.data);
  };

  // console.log(watch("email"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Marque um ponto:</h2>

          <div className="mt-2">
            <input
              placeholder="Nome para o ponto"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="w-fit mt-1 text-red-600">
                É necessário dar um nome de identificação
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              placeholder="Descrição do ponto"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
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
              <div className="mt-2">
                <input
                  placeholder="Latitude"
                  className="text-2xl pl-2 border border-slate-400 rounded-md"
                  {...register("latitude", { required: true })}
                />
                {errors.latitude && (
                  <div className="w-fit mt-1 text-red-600">
                    É colocar a latitude
                  </div>
                )}
              </div>

              <div className="mt-2">
                <input
                  placeholder="Longitude"
                  className="text-2xl pl-2 border border-slate-400 rounded-md"
                  {...register("longitude", { required: true })}
                />
                {errors.longitude && (
                  <div className="w-fit mt-1 text-red-600">
                    É colocar a longitude
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Criar ponto
          </button>
        </div>
      </div>
    </form>
  );
}
