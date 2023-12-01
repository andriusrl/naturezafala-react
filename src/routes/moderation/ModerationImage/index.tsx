import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import api from "../../../config/axios/api";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";

export default function ModerationImage() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const [image, setImage]: any = useState(undefined);

  const handleActivate = async (status) => {
    console.log("handleActivate");
    console.log(status);

    await api.patch(
      `/image/`,
      { status, id: Number(imageId) },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    getImage();
  };

  const getImage = async () => {
    const response = await api.get(`/image/${Number(imageId)}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    console.log("response GET IMAGE");
    console.log(response.data);

    setImage(response.data);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div>
      <div className="p-2 mx-2 border">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">
            Visualizando imagem: {image?.id}
          </h2>
          <div className="">
            {image?.url && <img src={image.url} className="object-cover" />}
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate("/moderacao/imagem")}
            className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>

          <div className="mx-3 my-auto"> | </div>

          {!image?.status ? (
            <button
              onClick={() => handleActivate(true)}
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Ativar Imagem
            </button>
          ) : (
            <button
              onClick={() => handleActivate(false)}
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Desativar Imagem
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
