import "./Map.component.style.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from "react";
import MarkerIcon from "../../../assets/marker-icon.png";
import L from "leaflet";

const center = {
  lat: -30.0688247,
  lng: -51.1217022,
};

function getIcon(size) {
  return L.icon({
    iconUrl: MarkerIcon,
    iconSize: [size, size],
  });
}

function DraggableMarker({ setLocation, location }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(location ? location : center);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          setLocation(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={getIcon(34)}
    >
      {!location && (
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marcador está arrastável"
              : "Clique aqui para tornar o marcador arrastável"}
          </span>
        </Popup>
      )}
    </Marker>
  );
}

export function Map({ setLocation, location }) {
  const position = [-30.0688247, -51.1217022];

  return (
    <MapContainer
      center={location ? [location.lat, location.lng] : position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker setLocation={setLocation} location={location} />
    </MapContainer>
  );
}
