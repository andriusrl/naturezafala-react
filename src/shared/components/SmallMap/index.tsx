import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-shadow.png";

export default function SmallMap(props) {
  return (
    <>
      <div id="map">
        {
          <MapContainer
            center={[props.location.lat, props.location.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "200px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[props.location.lat, props.location.lng]}>
              <Popup>Lugar marcado</Popup>
            </Marker>
          </MapContainer>
        }
      </div>
    </>
  );
}
