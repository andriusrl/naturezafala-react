import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import { Icon } from "leaflet";
import PersonPng from "../../../assets/person.png";
import TrashPng from "../../../assets/trash.png";
import somPng from "../../../assets/som.png";
import api from "../../../config/axios/api";
import { useDispatch } from "react-redux";
import {
  setLat,
  setLatMark,
  setLong,
  setLongMark,
} from "../../../features/user/user-slice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks";

const customPersonIcon = new Icon({
  iconUrl: PersonPng, //icone personalizado para mostrar o tipo de poluição
  iconSize: [32, 32],
});

const customTrashIcon = new Icon({
  iconUrl: TrashPng, //icone personalizado para mostrar o tipo de poluição
  iconSize: [32, 32],
});

const customSomIcon = new Icon({
  iconUrl: TrashPng, //icone personalizado para mostrar o tipo de poluição
  iconSize: [32, 32],
});

export default function Map(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const user = useAppSelector((state) => state.user);

  const [markingPoints, setMarkingPoints] = useState<any[]>([]);

  const [permissionStatus, setPermissionStatus] = useState<boolean | null>(
    null
  );

  const getPoints = async (lat?: number, lng?: number) => {
    const response = await api.get(
      `/point/km/${lat?.toFixed(6) || user.lat}/${
        lng?.toFixed(6) || user.long
      }/20`
    );

    setMarkingPoints(response.data);
  };

  function MyComponent() {
    const map = useMapEvents({
      click: async (location) => {
        await dispatch(setLat(location.latlng.lat));
        await dispatch(setLong(location.latlng.lng));
        await dispatch(setLatMark(location.latlng.lat));
        await dispatch(setLongMark(location.latlng.lng));
        props.handleClickMark(location.latlng);
        return map.locate();
      },
      locationfound: (location) => {
        console.log("location found:", location);
      },
      moveend: (location) => {
        const center = map.getCenter();
        getPoints(center.lat, center.lng);
      },
    });
    return null;
  }

  useEffect(() => {
    props?.location?.lat
      ? getPoints(
          parseFloat(props?.location?.lat.replace(",", ".")),
          parseFloat(props?.location?.lng.replace(",", "."))
        )
      : getPoints();
  }, []);

  useEffect(() => {
    props?.lat === null && getPoints();
  }, [latitude, longitude]);

  if (latitude && longitude) {
    dispatch(setLat(latitude));
    dispatch(setLong(longitude));
  }

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permission = await navigator.permissions.query({
          name: "geolocation",
        });

        if (permission.state === "granted") {
          setPermissionStatus(true);
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
            },
            (error) => {
              console.error("Erro ao obter a localização:", error);
            }
          );
        } else if (permission.state === "prompt") {
          setPermissionStatus(null);
        } else if (permission.state === "denied") {
          setPermissionStatus(false);
        } else if (permission.state === "unavailable") {
          setPermissionStatus(null);
        }
      } catch (error) {
        console.error("Erro ao verificar a permissão:", error);
      }
    };

    checkPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      if (permission.state === "prompt") {
        // Apenas solicite permissão se estiver no estado "prompt"
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
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

  return (
    <div>
      <div id="map">
        {latitude && longitude && (
          <MapContainer
            center={
              parseFloat(props?.location?.lat.replace(",", "."))
                ? [
                    parseFloat(props?.location?.lat.replace(",", ".")),
                    parseFloat(props?.location?.lng.replace(",", ".")),
                  ]
                : [latitude, longitude]
            }
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "65vh", width: "100wh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARCADOR PERSONALIZADO */}
            <Marker position={[latitude, longitude]} icon={customPersonIcon}>
              <Popup>
                Sua localização atual. <br /> Lat: {latitude}, Lng: {longitude}
              </Popup>
            </Marker>
            {/* NÃO APAGAR */}

            {/* <Marker position={[latitude, longitude]}>
              <Popup>
                Sua localização atual 2. <br /> Lat: {latitude}, Lng:{longitude}
                {longitude}
              </Popup>
            </Marker> */}

            {markingPoints.map((point) => {
              return (
                <Marker
                  key={point.id}
                  position={[point.latitude, point.longitude]}
                  icon={
                    point.pollutionType === 5 ? customSomIcon : customTrashIcon
                  }
                >
                  <Popup>
                    {point.name},{point.description} <br />
                    {/* <a href={apiUrl + "/ponto/" + point.id}> */}
                    <button
                      onClick={() => navigate(`/ponto/${Number(point.id)}`)}
                      className="bg-slate-300 w-fit p-2 rounded-xl mx-auto"
                    >
                      fotos e informações
                    </button>
                    {/* </a> */}
                    {/* Lat:{point.latitude},
                    Lng:{point.longitude} */}
                  </Popup>
                </Marker>
              );
            })}

            <MyComponent />
          </MapContainer>
        )}
        {state?.previousSearch && (
          <div className="w-fit mx-auto">
            <button
              onClick={() => {
                if (state?.previousSearch)
                  return navigate(
                    `/ponto/procurar/${encodeURIComponent(
                      state?.previousSearch
                    )}`
                  );

                navigate("/");
              }}
              className="animate-pulse bg-slate-400 rounded-lg p-2 font-extrabold text-xl"
            >
              Voltar
            </button>
          </div>
        )}

        {latitude === null && (
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
      </div>
    </div>
  );
}
