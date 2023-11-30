import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../config/axios/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  type loginType = {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    fone: number;
    cpf: string;
    confirmPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Senhas não conferem");
    }

    const userBody = {
      name: data.name,
      email: data.email,
      password: data.password,
      birthDate: data.birthDate,
      fone: data.fone,
      cpf: data.cpf,
    };

    try {
      await api.post("/user", userBody);

      alert("Usuário cadastrado com sucesso");

      navigate("/");
    } catch (error) {
      if (error.response.data.message === "user_un_cpf")
        return alert("CPF já cadastrado");
      if (error.response.data.message === "user_un_email")
        return alert("E-mail já cadastrado");
    }
  };

  // console.log(watch("email"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Faça seu registro</h2>

          <div className="mt-2">
            <input
              placeholder="Nome completo"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar o nome
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              placeholder="E-mail"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar o email
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              type="date"
              placeholder="Data de nascimento"
              className="w-full text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("birthDate", { required: true })}
            />
            {errors.birthDate && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar a data de nascimento
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              maxLength={12}
              placeholder="Telefone"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("fone", { required: true })}
            />
            {errors.fone && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar o telefone
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              maxLength={11}
              placeholder="CPF"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("cpf", { required: true })}
            />
            {errors.cpf && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar o cpf
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              maxLength={30}
              placeholder="Senha"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <div className="w-fit mt-1 text-red-600">
                É necessário colocar a senha
              </div>
            )}
          </div>

          <div className="mt-2">
            <input
              maxLength={30}
              placeholder="Confirme a senha"
              className="text-2xl pl-2 border border-slate-400 rounded-md"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <div className="w-fit mt-1 text-red-600">
                É necessário confirmar a senha
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
}
