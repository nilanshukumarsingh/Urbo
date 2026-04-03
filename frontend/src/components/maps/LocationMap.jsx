import { GoogleMap, Marker } from "@react-google-maps/api";
import { MapContainer, TileLayer, Marker as LeafletMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const LocationMap = ({ center, zoom = 14, markers = [], onMarkerClick, className = "h-[400px] w-full" }) => {
  const isKeyValid = GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== "Your Google Maps API Key";
  
  if (!isKeyValid) {
    const defaultCenter = center || { lat: 28.6139, lng: 77.2090 };
    return (
      <div className={className}>
        <MapContainer center={[defaultCenter.lat, defaultCenter.lng]} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 0 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, index) => (
            <LeafletMarker 
              key={index} 
              position={[marker.lat, marker.lng]}
              eventHandlers={{ click: () => onMarkerClick?.(marker) }}
            >
              {marker.title && <Popup>{marker.title}</Popup>}
            </LeafletMarker>
          ))}
        </MapContainer>
      </div>
    );
  }

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  return (
    <div className={className}>
      <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={zoom} options={mapOptions}>
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title} onClick={() => onMarkerClick?.(marker)} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default LocationMap;
