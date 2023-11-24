import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../config/axios/api";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

export default function ImageAdd() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const [images, setImages]: any = useState(undefined);

  const [selectedImage, setSelectedImage]: null | string = useState(null);

  console.log("selectedImage");
  console.log(selectedImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    console.log("file");
    console.log(file);
    if (file) {
      // Aqui você pode fazer algo com o arquivo selecionado, por exemplo, exibir a imagem no estado.
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  console.log("comment pointId");
  console.log(pointId);

  const handleUploadImage = async () => {
    const blobPromise = await fetch(selectedImage).then((r) => r.blob());

    const formData = new FormData();

    formData.append("file", blobPromise);

    await api.post(`/image/${pointId}`, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    getImageByPoint();
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const getImageByPoint = async () => {
    const response = await api.get(`/image/point/${Number(pointId)}`);

    setImages(response.data);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    handleUploadImage()
  };

  useEffect(() => {
    getImageByPoint();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2 mx-2 border flex-col">
        <div className="flex-col w-fit mx-auto">
          <h2 className="w-fit mx-auto text-3xl">imagens</h2>
        </div>
        <div>
          {images?.length > 0 ? (
            <Carousel>
              {images.map((image) => (
                <div>
                  <img alt={image?.point?.name} src={image?.url} />
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex-col w-fit mx-auto">Nenhuma imagem</div>
          )}
        </div>
        <div className="w-full flex-col justify-center">
          <div>
            <input
              type="file"
              accept="image/*" // Aceita apenas arquivos de imagem
              onChange={handleImageChange}
            />

            {selectedImage && (
              <div>
                <p>Imagem selecionada:</p>
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
          </div>
          <button className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl">
            Adicionar imagem
          </button>
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate(`/ponto/${Number(pointId)}`)}
            className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
          >
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
}
