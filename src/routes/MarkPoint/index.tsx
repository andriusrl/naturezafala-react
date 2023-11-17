import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function MarkPoint() {

  const { pointId } = useParams();

  console.log('userId', pointId)

  type loginType = {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginType>()


  const onSubmit: SubmitHandler<loginType> = (data) => {


    console.log(data)
    console.log('registrado')

  }

  // console.log(watch("email"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Marque um ponto:</h2>

          <div className="mt-2">
            <input placeholder="Nome para o ponto" className="text-2xl pl-2 border border-slate-400 rounded-md" {...register("name", { required: true })} />
            {errors.name && <div className="w-fit mt-1 text-red-600">É necessário dar um nome de identificação</div>}
          </div>

          <div className="mt-2">
            <input placeholder="Descrição do ponto" className="text-2xl pl-2 border border-slate-400 rounded-md" {...register("description", { required: true })} />
            {errors.description && <div className="w-fit mt-1 text-red-600">É necessário uma descrição para o ponto</div>}
          </div>

          <div className="mt-2">
            <input placeholder="Latitude" className="text-2xl pl-2 border border-slate-400 rounded-md" {...register("latitude", { required: true })} />
            {errors.latitude && <div className="w-fit mt-1 text-red-600">É colocar a latitude</div>}
          </div>

          <div className="mt-2">
            <input placeholder="Longitude" className="text-2xl pl-2 border border-slate-400 rounded-md" {...register("longitude", { required: true })} />
            {errors.longitude && <div className="w-fit mt-1 text-red-600">É colocar a longitude</div>}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button type="submit" className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl">Criar ponto</button>
        </div>
      </div>
    </form>
  );
}
