import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../config/axios/api";

export default function AccountUpdate() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userForm, setUserForm]: any = useState(undefined);

  console.log("account update", userId);

  type UpdateUserType = {
    name: string | null;
    email: string | null;
    password: string | null;
    birthDate: Date | null;
    fone: number | null;
    cpf: string | null;
    status: boolean | null;
  };

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<UpdateUserType>({
  //   defaultValues: {
  //     name: userForm?.name,
  //     email: userForm?.email,
  //     password: userForm?.password,
  //     birthDate:
  //       userForm?.birth_date &&
  //       new Date(userForm?.birth_date)?.toISOString()?.slice(0, 10),
  //     fone: userForm?.fone,
  //     cpf: userForm?.cpf,
  //     status: userForm?.status,
  //   },
  // });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues: {
      name: userForm?.name,
      email: userForm?.email,
      password: userForm?.password,
      birthDate:
        userForm?.birthDate &&
        new Date(userForm?.birthDate)?.toISOString()?.slice(0, 10),
      fone: userForm?.fone,
      cpf: userForm?.cpf,
      status: userForm?.status,
    },
  });

  const handleUpdateUser = async (data) => {
    console.log("data handle update user", data);

    // const filteredData = Object.fromEntries(
    //   Object.entries(data).filter(([key, value]) => value !== null)
    // );

    await api.patch("/user", {
      id: Number(userId),
      ...data,
    });
    getUser();
    alert("Usuario atualizado com sucesso");
  };

  const onSubmit: SubmitHandler<UpdateUserType> = (data) => {
    handleUpdateUser(data);
  };

  const getUser = async () => {
    const response = await api.get(`/user/${Number(userId)}`);

    console.log("response get user");
    console.log(response.data);

    await setUserForm(response.data);

    reset({
      name: response.data.name,
      email: response.data.email,
      password: response.data.password,
      birthDate:
        response.data.birthDate &&
        new Date(response.data.birthDate)?.toISOString()?.slice(0, 10),
      fone: response.data.fone,
      cpf: response.data.cpf,
      status: response.data.status,
    });
  };

  console.log("userForm");
  console.log(userForm);

  useEffect(() => {
    getUser();
  }, []);

  userForm?.birthDate &&
    console.log(new Date(userForm?.birthDate)?.toISOString()?.slice(0, 10));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {userForm && (
        <div className="p-2 mx-2 border">
          <div className="flex-col w-fit mx-auto">
            <h2 className="w-fit mx-auto text-3xl">Atualizando usuario</h2>

            <div className="mt-2">
              <input
                placeholder="Nome completo"
                className="text-2xl pl-2 border border-slate-400 rounded-md"
                {...register("name")}
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
                {...register("email")}
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
                className="text-2xl pl-2 border border-slate-400 rounded-md"
                {...register("birthDate")}
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
                {...register("fone")}
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
                {...register("cpf")}
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
                {...register("password")}
              />
              {errors.password && (
                <div className="w-fit mt-1 text-red-600">
                  É necessário colocar a senha
                </div>
              )}
            </div>

            <div className="mt-2">
              Status:
              <input
                type="checkbox"
                className="text-2xl pl-2 border border-slate-400 rounded-md"
                {...register("status")}
              />
              {userForm?.status ? "Ativo" : "Inativo"}
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={() => navigate("/contas")}
              className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Voltar
            </button>

            <div className="mx-3 my-auto" > | </div>
            
            <button
              type="submit"
              className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
