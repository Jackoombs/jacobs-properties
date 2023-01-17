import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useRef } from "react";
import LocationDot from "../../assets/images/location-dot-solid.svg";

interface Props {
  location: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  markers: (google.maps.LatLng | google.maps.LatLngLiteral | undefined)[];
  zoom?: number;
  children?: JSX.Element;
  state?: google.maps.LatLng | google.maps.LatLngLiteral | undefined;
  setState?: React.Dispatch<
    React.SetStateAction<
      google.maps.LatLng | google.maps.LatLngLiteral | undefined
    >
  >;
}

export default function PropertyMap({
  location,
  markers,
  zoom = 14,
  children,
  state,
  setState,
}: Props) {
  const currentMarker = useRef<any>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_KEY,
  });
  if (!isLoaded) return <div>Is Loading</div>;

  const handleClick = (
    e: google.maps.MapMouseEvent,
    marker: google.maps.LatLng | google.maps.LatLngLiteral | undefined
  ) => {
    currentMarker.current = e.domEvent.currentTarget;
    setState ? setState(marker) : undefined;
  };

  return (
    <div className="bg-gray-200 lg:relative">
      <GoogleMap
        zoom={zoom}
        center={location}
        mapContainerClassName="w-full aspect-property h-auto min-h-[12rem] rounded-big"
        options={{ gestureHandling: "greedy" }}
        mapContainerStyle={{
          filter: state !== undefined ? "grayscale(90%)" : "",
        }}
        onMouseDown={() => (setState ? setState(undefined) : undefined)}
        onZoomChanged={() => (setState ? setState(undefined) : undefined)}
      >
        {markers.map(
          (marker, index) =>
            marker !== undefined && (
              <Marker
                key={index}
                onClick={(e) => handleClick(e, marker)}
                position={marker}
                onLoad={(marker) => {
                  const customIcon = (opts: any) =>
                    Object.assign(
                      {
                        path: "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z",
                        fillColor: "#032954",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2.5,
                        scale: 0.08,
                      },
                      opts
                    );

                  marker.setIcon(
                    customIcon({
                      fillColor: "#032954",
                      strokeColor: "#ffffff",
                    })
                  );
                }}
              />
            )
        )}
      </GoogleMap>
      {children}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: "10",
          width: "100%",
        }}
      >
        {currentMarker.current && state !== undefined && (
          <div
            className="absolute z-10 bg-primary-100"
            style={{
              WebkitMask: `url(${LocationDot}) no-repeat center`,
              mask: `url(${LocationDot}) no-repeat center`,
              top: currentMarker.current.style.top,
              left: currentMarker.current.style.left,
              height: currentMarker.current.style.height,
              width: currentMarker.current.style.width,
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
