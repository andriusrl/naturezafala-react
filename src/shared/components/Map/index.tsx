import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import { Icon, divIcon } from "leaflet";
import TrashPng from "../../../assets/lata-de-lixo.png";


const customIcon = new Icon({
  iconUrl: TrashPng, //icone personalizado para mostrar o tipo de poluição
  iconSize: [32, 32]
});

enum typePollution {
  trash,
  bush,
  nouise,
  air,
}

const markingPoints = [
  {
    id: 1,
    name: "lixo na rua",
    description: "lixo na rua com mau cheiro e etc................",
    latitude: -22.211874,
    longitude: -54.828174,
  },
  {
    id: 2,
    name: "lixo na rua",
    description: "lixo na rua com mau cheiro e etc................",
    latitude: -22.213652,
    longitude: -54.829611,
  },
  {
    id: 3,
    name: "lixo na rua",
    description: "lixo na rua com mau cheiro e etc................",
    latitude: -22.213652,
    longitude: -54.829611,
  },
  {
    id: 4,
    name: "lixo na rua",
    description: "lixo na rua com mau cheiro e etc................",
    latitude: -22.217721,
    longitude: -54.83458,
  },
  {
    id: 5,
    name: "lixo na rua",
    description: "lixo na rua com mau cheiro e etc................",
    latitude: -22.211296,
    longitude: -54.831716,
  },
  {
    id: 6,
    name: "lixo na rua",
    description: "lixo na rua com mau cheiro e etc................",
    latitude: -22.211874,
    longitude: -54.828174,
  },
];

export default function Map() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<boolean | null>(
    null
  );

  console.log(latitude);
  console.log(longitude);
  console.log(permissionStatus);

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

            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "65vh", width: "100wh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARCADOR PERSONALIZADO */}
            <Marker position={[latitude, longitude]} icon={customIcon}>
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
            </Marker>

            {markingPoints.map((point) => {
              return (
                <Marker
                  key={point.id}
                  position={[point.latitude, point.longitude]}
                >
                  <Popup>
                    {point.name},{point.description} <br /> Lat:{" "}
                    {point.latitude}, Lng:
                    {point.longitude}
                    {-54.828174}
                  </Popup>
                </Marker>
              );
            })} */}
          </MapContainer>
        )}
        {latitude === null && <div className="p-2 mx-2 border">
          <div>Para ver o mapa na sua localização é necessário permissão para acessar o local clique abaixo para permitir</div>
          <div className="flex justify-center">
            <button className="bg-slate-400 rounded-lg p-2 font-extrabold text-xl" onClick={requestLocationPermission}>Permitir Localização</button>
          </div>
        </div>}
      </div>
    </div>
  );
}
