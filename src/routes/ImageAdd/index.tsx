import React, { useEffect, useState } from "react";
import api from "../../config/axios/api";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { useAppSelector } from "../../hooks";

export default function ImageAdd() {
  const { pointId } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);

  const [images, setImages]: any = useState(undefined);

  const [selectedImage, setSelectedImage]: null | string = useState(null);

  console.log("selectedImage");
  console.log(selectedImage);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUploadImage = async () => {
    const blobPromise = await fetch(selectedImage).then((r) => r.blob());

    const formData = new FormData();

    formData.append("file", blobPromise);

    await api.post(`/image/${pointId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });

    getImageByPoint();
  };

  const handleDeleteImage = async (imageId) => {
    await api.delete(`/image/${imageId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.token}`,
      },
    });

    getImageByPoint();
  };

  const getImageByPoint = async () => {
    const response = await api.get(`/image/point/${Number(pointId)}`);

    setImages(response.data);
  };

  useEffect(() => {
    getImageByPoint();
  }, []);

  return (
    <div>
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
                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-opacity-50 bg-red-500 text-white p-3"
                  >
                    <p className="bg-opacity-100">Excluir imagem</p>
                  </button>
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
          {/* <button className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl">
            Adicionar imagem
          </button> */}
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={() => navigate(`/ponto/${Number(pointId)}`)}
            className="bg-slate-400 mr-2 rounded-lg p-2 font-extrabold text-xl"
          >
            Voltar
          </button>
          <button
            onClick={()=>handleUploadImage()}
            className="bg-slate-400 ml-2 rounded-lg p-2 font-extrabold text-xl"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
