import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import type { GoogleMapProps } from "@react-google-maps/api";
import LocationDot from "../../assets/images/location-dot-solid.svg";

interface Props {
  location: GoogleMapProps["center"];
}

export default function PropertyMap({ location }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBxWEpPYewtC2ceNcOMkffocrfaDisHXM0",
  });

  if (!isLoaded) return <div>Is Loading</div>;

  return (
    <GoogleMap
      zoom={14}
      center={location}
      mapContainerClassName="w-full aspect-property h-auto min-h-[20rem] rounded-big"
    >
      {location !== undefined && (
        <Marker
          position={location}
          onLoad={(marker) => {
            const customIcon = (opts: any) =>
              Object.assign(
                {
                  path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                  fillColor: "#032954",
                  fillOpacity: 1,
                  strokeColor: "#032954",
                  strokeWeight: 1,
                  scale: 0.08,
                },
                opts
              );

            marker.setIcon(
              customIcon({
                fillColor: "#032954",
                strokeColor: "#032954",
              })
            );
          }}
        />
      )}
    </GoogleMap>
  );
}
