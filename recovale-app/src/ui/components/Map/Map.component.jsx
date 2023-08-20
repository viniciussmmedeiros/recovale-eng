import "./Map.component.style.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";

const center = {
  lat: 51.505,
  lng: -0.09,
};

function DraggableMarker({ setLocation, location }) {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(location ? location : center);
  // useEffect(() => {
  //   setLocation(position);
  // }, [position, setLocation]);

  console.log("position", position);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          console.log("setting stuff");
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
    >
      {!location && (
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      )}
    </Marker>
  );
}

export function Map({ setLocation, location }) {
  const position = [51.505, -0.09];
  console.log("la location", location);
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
      {/* <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <DraggableMarker setLocation={setLocation} location={location} />
    </MapContainer>
  );
}
