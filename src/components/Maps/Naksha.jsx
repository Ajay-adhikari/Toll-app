import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import "leaflet/dist/leaflet.css";

const Naksha = () => {
  const taxiIcon = L.icon({
    iconUrl: "myIcon.png",
    iconSize: [70, 70],
  });
  

  return (
    <MapContainer   center={[28.355099,  79.417851]} zoom={7} style={{ width: "100%", height: "100vh" }}>
      <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <Marker position={[28.355099,  79.417851]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})} />

      <ClickHandler taxiIcon={taxiIcon} />
    </MapContainer>
  );
};

const ClickHandler = ({ taxiIcon }) => {
  const map = useMapEvent("click", (e) => {
    const newMarker = L.marker(e.latlng, ).addTo(map);
    L.Routing.control({
      show:false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      waypoints: [
        L.latLng(28.355099,  79.417851),
        L.latLng(e.latlng.lat, e.latlng.lng),
      ],
    })
      .on("routesfound", function (e) {
        const routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
          setTimeout(function () {
            newMarker.setLatLng([coord.lat, coord.lng]);
          }, 100 * index);
        });
      })
      .addTo(map);
  });

  return null;
};

export default Naksha;
