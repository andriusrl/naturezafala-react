import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../config/axios/api";
import { token } from "../../config/localStorage/localStorage";
import { setToken, setUserName } from "../../features/user/user-slice";
import { useDispatch } from "react-redux";

export default function Login() {

  const dispatch = useDispatch();

  type loginType = {
    username: string
    password: string
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginType>()


  const onSubmit: SubmitHandler<loginType> = (data) => {
    console.log(data)
    handleLogin(data)
  }

  // console.log(watch("username"))

  const handleLogin = async (data) => {
    const response = await api.post('/auth/login', data)

    // token.set(response.data.token)

    // dispatch(setToken(response.data.token))
    // dispatch(setUserName(response.data.token))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">Faça seu login</h2>
          <div className="mt-2">
            <input placeholder="E-mail" className="text-2xl pl-2 border border-slate-400 rounded-md" {...register("username", { required: true })} />
            {errors.username && <div className="w-fit mt-1 text-red-600">É necessário colocar o email</div>}
          </div>

          <div className="mt-2">
            <input placeholder="Senha" type="password" className="text-2xl pl-2 border border-slate-400 rounded-md" {...register("password", { required: true })} />
            {errors.password && <div className="w-fit mt-1 text-red-600">É necessário colocar a senha</div>}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button type="submit" className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl">Entrar</button>
        </div>
      </div>
    </form>
  );
}
