import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import api from "../../config/axios/api";

export default function Point() {
  const { pointId } = useParams();

  const user = useAppSelector((state) => state.user);

  const [point, setPoint]: any = useState(undefined);
  const [images, setImages]: any = useState(undefined);

  console.log("pointId", pointId);

  console.log("user point", user);

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
    // console.log("response find one point", response.data);

    setPoint(response.data);
  };

  const getImageByPoint = async () => {
    const response = await api.get(`/image/point/${pointId}`);
    console.log("response find images", response.data);

    setImages(response.data);
  };

  useEffect(() => {
    getPoint();
    getImageByPoint();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {point && (
        <div className="p-2 mx-2 border">
          <div className="flex-col w-fit mx-auto">
            <h2 className="w-fit mx-auto text-3xl">{point.name}</h2>
          </div>
          <div className="flex-col w-fit mx-auto">
            <p className="w-fit mx-auto text-3xl">{point.description}</p>
            <p className="w-fit mx-auto text-3xl">{point.date}</p>
          </div>
          <div className="flex-col w-fit mx-auto">
            <h2 className="w-fit mx-auto text-3xl">Fotos</h2>
            {images &&
              images.map((image) => (
                <div>
                  <img alt={image?.point?.name} src={image?.url} />
                </div>
              ))}
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Salvar ponto
            </button>
          </div>
        </div>
      )}
    </form>
  );
}