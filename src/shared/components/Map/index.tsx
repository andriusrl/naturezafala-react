import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";
import { Icon, divIcon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "URL", //icone personalizado para mostrar o tipo de poluição
  iconSize: [32, 32],
  // iconAnchor: [12, 41],
  // popupAnchor: [1, -34],
});

export default function Map() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

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
          setPermissionStatus("Permissão concedida");
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
          setPermissionStatus("Aguardando permissão do usuário");
        } else if (permission.state === "denied") {
          setPermissionStatus("Permissão negada");
        } else if (permission.state === "unavailable") {
          setPermissionStatus(
            "A API de geolocalização não está disponível no navegador"
          );
        }
      } catch (error) {
        console.error("Erro ao verificar a permissão:", error);
      }
    };

    checkPermission();
  }, []);

  return (
    <div>
      <div id="map">
        {latitude && longitude && (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100vh", width: "100wh" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* MARCADOR PERSONALIZADO */}
            {/* <Marker position={[latitude, longitude]} icon={greenIcon}>
              <Popup>
                Sua localização atual. <br /> Lat: {latitude}, Lng: {longitude}
              </Popup>
            </Marker> */}
            {/* NÃO APAGAR */}

            <Marker position={[latitude, longitude]}>
              <Popup>
                Sua localização atual 2. <br /> Lat: {latitude}, Lng:{longitude}
                {longitude}
              </Popup>
            </Marker>

            <Marker position={[-22.211874, -54.828174]}>
              <Popup>
                Sua localização atual 2. <br /> Lat: {-22.211874}, Lng:{" "}
                {-54.828174}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
}
