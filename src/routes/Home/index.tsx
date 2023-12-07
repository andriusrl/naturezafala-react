import React, { useState } from "react";
import Map from "../../shared/components/Map";
import MarkPng from "../../assets/mark.png";
import { useEffect } from "react";
import api from "../../config/axios/api";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setLat,
  setLatMark,
  setLong,
  setLongMark,
  setMenuPollutionTypeStatus,
} from "../../features/user/user-slice";

export default function Home() {
  // const [menuMarkStatus, setMenuMarkStatus] = React.useState(false);
  const [pollutionTypeList, setPollutionTypeList] = useState();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkLogged = async () => {
    try {
      await api.get("/user/logged", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleMenuMarkPoint = async () => {
    const logged = await checkLogged();

    if (logged) {
      return dispatch(
        setMenuPollutionTypeStatus(!user.menuPollutionTypeStatus)
      );
    }
    alert("Você precisa estar logado para marcar um ponto");
    navigate("/entrar");
  };

  const handleMarkPoint = async (pollutionTypeId) => {
    dispatch(setMenuPollutionTypeStatus(false));
    navigate(`/marcarponto/${pollutionTypeId}`);
  };

  const getPollutionType = async () => {
    const response = await api.get("/pollutiontype");

    setPollutionTypeList(response.data);
  };

  useEffect(() => {
    getPollutionType();
    dispatch(setMenuPollutionTypeStatus(false));
    dispatch(setLatMark(null));
    dispatch(setLongMark(null));
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state === "granted") {
          // setPermissionStatus(true);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              dispatch(setLat(position.coords.latitude));
              dispatch(setLong(position.coords.longitude));
            },
            (error) => {
              console.error("Erro ao obter a localização:", error);
            }
          );
        }
      } catch (error) {
        console.error("Erro ao verificar a permissão:", error);
      }
    };

    checkPermission();
  }, []);

  console.log("user");
  console.log(user);

  const requestLocationPermission = async () => {
    try {
      console.log("requestLocationPermission");
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "prompt") {
        // Apenas solicite permissão se estiver no estado "prompt"
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            dispatch(setLat(position.coords.latitude));
            dispatch(setLong(position.coords.longitude));
            console.log("setado");
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
          }
        );
      }
    } catch (error) {
      console.error("Erro ao verificar a permissão:", error);
    }
  };

  console.log("home");
  console.log(latitude);
  console.log(longitude);

  return (
    <div>
      {!user?.long && (
        <div className="p-2 mx-2 border">
          <div>
            Para ver o mapa na sua localização é necessário permissão para
            acessar o local clique abaixo para permitir.
          </div>
          <div className="flex justify-center">
            <button
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
              onClick={requestLocationPermission}
            >
              Permitir Localização
            </button>
          </div>
        </div>
      )}
      {!user.menuPollutionTypeStatus && user?.long && (
        <Map
          location={{
            lat: String(user.lat).replace(".", ","),
            lng: String(user.long).replace(".", ","),
          }}
          handleClickMark={async () => {
            const logged = await checkLogged();

            if (logged) {
              return dispatch(
                setMenuPollutionTypeStatus(!user.menuPollutionTypeStatus)
              );
            }
            alert("Você precisa estar logado para marcar um ponto");
            navigate("/entrar");

            dispatch(setMenuPollutionTypeStatus(true));
          }}
        />
      )}

      {user.menuPollutionTypeStatus && pollutionTypeList && (
        <div className="space-y-4">
          <h1 className="w-fit mx-auto text-2xl font-bold text-gray-600">
            Selecione o tipo de poluição:
          </h1>
          {pollutionTypeList.map(
            (pollutionType: {
              id: number;
              name: string;
              description: string;
            }) => {
              return (
                <div
                  key={pollutionType.id}
                  onClick={() => {
                    handleMarkPoint(pollutionType.id);
                  }}
                  className="mx-auto h-12 bg-green-600 border border-slate-400 rounded-md w-72 flex cursor-pointer"
                >
                  <p className="h-fit w-fit m-auto text-[#944B0A] text-xl font-bold">
                    {pollutionType.name}
                  </p>
                </div>
              );
            }
          )}

          <div
            className="mx-auto h-12 bg-red-400 border border-slate-400 rounded-md w-72 flex cursor-pointer"
            onClick={() => {
              dispatch(setMenuPollutionTypeStatus(false));
            }}
          >
            <p className="h-fit w-fit m-auto text-[#944B0A] text-xl font-bold">
              Voltar para o mapa
            </p>
          </div>
        </div>
      )}

      {!user.menuPollutionTypeStatus && (
        <div className="fixed bottom-6 right-5 z-40 cursor-pointer">
          <img
            className="w-[60px] animate-pulse"
            src={MarkPng}
            onClick={handleMenuMarkPoint}
          />
        </div>
      )}
    </div>
  );
}
