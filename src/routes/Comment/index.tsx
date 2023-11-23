import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../config/axios/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Comment() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  console.log("comment pointId", pointId);

  type CommentType = {
    comment: string;
  };

  const handleComment = async (data) => {
    console.log("data handle comment", data);
    await api.post("/comment", {
      comment: data.comment,
      point: Number(pointId),
    });

    navigate(`/ponto/${Number(pointId)}`);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CommentType>();

  const onSubmit: SubmitHandler<CommentType> = (data) => {
    handleComment(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Escreva um comentario</h2>
          <div className="mt-2">
            <input
              placeholder="Comentário"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("comment", { required: true })}
            />
            {errors.comment && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar um comentario
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate(`/ponto/${Number(pointId)}`)}
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
}
